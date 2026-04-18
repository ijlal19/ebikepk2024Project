import * as React from 'react';
import type { Metadata } from 'next';
import BrandComp from "@/ebikeWeb/pageLayouts/bike-brands/index";
import fallbackBrands from '@/ebikeWeb/pageLayouts/bike-brands/data';
import Gconfig from 'globalconfig';
import { DEFAULT_SHARE_IMAGE, SITE_URL, stripHtml } from '@/app/metadata-utils';

export const revalidate = 3600;

type SearchParams = {
  tab?: string;
};

type Brand = {
  id?: number;
  brandName?: string;
  description?: string;
  meta_description?: string;
  focus_keyword?: string;
  logoUrl?: string;
};

const blockedBrands = new Set(['sport', 'sports', 'china', 'eagle']);

function isElectricBrand(brand: Brand) {
  return brand?.focus_keyword?.toLowerCase().includes('electric-bike') ?? false;
}

function isVisibleBrand(brand: Brand) {
  const normalizedName = brand?.brandName?.trim().toLowerCase() ?? '';
  return Boolean(normalizedName) && !blockedBrands.has(normalizedName);
}

function getFilteredBrands(brands: Brand[], electricOnly = false) {
  return brands.filter((brand) => {
    if (!isVisibleBrand(brand)) {
      return false;
    }

    return electricOnly ? isElectricBrand(brand) : !isElectricBrand(brand);
  });
}

async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(`${Gconfig.ebikeApi}brand/get-brand`, {
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`Unable to load brands: ${response.status}`);
    }

    const brands = await response.json();
    return Array.isArray(brands) && brands.length > 0 ? brands : fallbackBrands;
  } catch (error) {
    console.error('Failed to fetch new bike brands for SEO', error);
    return fallbackBrands;
  }
}

function buildSeoContent(brands: Brand[], electricOnly = false) {
  const filteredBrands = getFilteredBrands(brands, electricOnly);
  const pageLabel = electricOnly ? 'Electric Bikes' : 'New Bikes';
  const categoryLabel = electricOnly ? 'electric bikes' : 'motorcycles';
  const canonicalUrl = electricOnly ? `${SITE_URL}/new-bikes?tab=2` : `${SITE_URL}/new-bikes`;
  const topBrands = filteredBrands
    .slice(0, 6)
    .map((brand) => brand.brandName)
    .filter(Boolean)
    .map((brand) => String(brand));
  const brandKeywords = filteredBrands
    .slice(0, 10)
    .flatMap((brand) => [brand.brandName, brand.focus_keyword])
    .filter(Boolean)
    .map((keyword) => String(keyword));
  const descriptionSource = filteredBrands
    .map((brand) => brand.meta_description || brand.description)
    .find(Boolean);
  const fallbackDescription = electricOnly
    ? `Browse ${filteredBrands.length} electric bike brands in Pakistan, compare the latest e-bike models, and explore pricing, reviews, and specifications on ebike.pk.`
    : `Browse ${filteredBrands.length} new bike brands in Pakistan, compare the latest motorcycle models, and explore prices, reviews, and specifications on ebike.pk.`;

  return {
    filteredBrands,
    canonicalUrl,
    title: electricOnly
      ? `Electric Bikes in Pakistan by Brand | Latest eBike Models | ebike.pk`
      : `New Bikes in Pakistan by Brand | Latest Motorcycle Models | ebike.pk`,
    description: stripHtml(descriptionSource) || fallbackDescription,
    keywords: [
      electricOnly ? 'electric bikes in Pakistan' : 'new bikes in Pakistan',
      electricOnly ? 'electric bike brands Pakistan' : 'motorcycle brands Pakistan',
      'bike prices in Pakistan',
      'latest bike models Pakistan',
      'ebike.pk',
      ...brandKeywords,
    ],
    pageLabel,
    categoryLabel,
    topBrands,
  };
}

export async function generateMetadata(
  { searchParams }: { searchParams?: Promise<SearchParams> | SearchParams }
): Promise<Metadata> {
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const electricOnly = resolvedSearchParams?.tab === '2';
  const brands = await getBrands();
  const seo = buildSeoContent(brands, electricOnly);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: 'automotive',
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      siteName: 'ebike.pk',
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: seo.pageLabel,
        }
      ],
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [DEFAULT_SHARE_IMAGE],
    }
  };
}

function buildNewBikesJsonLd(brands: Brand[], electricOnly = false) {
  const seo = buildSeoContent(brands, electricOnly);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${seo.canonicalUrl}#webpage`,
        url: seo.canonicalUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: "en-PK",
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        about: [
          `${seo.categoryLabel} in Pakistan`,
          `${seo.pageLabel.toLowerCase()} by brand`,
          ...seo.topBrands
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${seo.canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "New Bikes",
            item: `${SITE_URL}/new-bikes`
          },
          ...(electricOnly ? [
            {
              "@type": "ListItem",
              position: 3,
              name: "Electric Bikes",
              item: seo.canonicalUrl
            }
          ] : [])
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${seo.canonicalUrl}#itemlist`,
        name: `${seo.pageLabel} brands in Pakistan`,
        numberOfItems: seo.filteredBrands.length,
        itemListElement: seo.filteredBrands.slice(0, 24).map((brand, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/new-bikes/${brand.brandName}`,
          name: brand.brandName
        }))
      }
    ]
  };
}

export default async function NewBikeBrandPage(
  { searchParams }: { searchParams?: Promise<SearchParams> | SearchParams }
) {
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const electricOnly = resolvedSearchParams?.tab === '2';
  const brands = await getBrands();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildNewBikesJsonLd(brands, electricOnly)) }}
      />
      <BrandComp initialBrands={brands} />
    </>
  );
}
