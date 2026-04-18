import * as React from 'react';
import type { Metadata } from 'next';
import AllNewBikeComp from "@/ebikeWeb/pageLayouts/all-new-bikes/index";
import { getnewBikeData } from '@/ebikeWeb/functions/globalFuntions';
import { DEFAULT_SHARE_IMAGE, SITE_URL, formatTitleText, stripHtml, toSecureUrl, trimText } from '@/app/metadata-utils';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';

export const revalidate = 3600;

type Props = {
  params: { slug: string }
}

type BrandBike = {
  id?: number | string;
  title?: string;
  price?: number | string;
  bikeUrl?: string;
  brandId?: number | string;
  img_url?: string;
  bike_brand?: {
    brandName?: string;
    meta_title?: string;
    meta_description?: string;
    description?: string;
    focus_keyword?: string;
    logoUrl?: string;
  };
};

async function getBrandBikes(slug: string): Promise<BrandBike[]> {
  const data = await getnewBikeData({ brand: slug });
  return Array.isArray(data) ? data : [];
}

function getBrandSeo(data: BrandBike[], slug: string) {
  const firstBike = data[0];
  const brand = firstBike?.bike_brand;
  const brandName = formatTitleText(brand?.brandName || slug);
  const canonicalUrl = `${SITE_URL}/new-bikes/${slug}`;
  const plainDescription = stripHtml(brand?.description || '');
  const description = trimText(
    brand?.meta_description || plainDescription || `${brandName} new bikes in Pakistan. Compare latest models, prices, features and reviews on ebike.pk.`,
    170
  );
  const title = brand?.meta_title
    ? `${brand.meta_title}${brand.meta_title.includes('ebike.pk') ? '' : ' | ebike.pk'}`
    : `${brandName} New Bikes in Pakistan | Latest Models & Prices | ebike.pk`;
  const image = brand?.logoUrl
    ? toSecureUrl(cloudinaryLoader(toSecureUrl(brand.logoUrl), 1200, 'auto'))
    : DEFAULT_SHARE_IMAGE;
  const keywords = [
    `${brandName} new bikes in Pakistan`,
    `${brandName} bike price in Pakistan`,
    `${brandName} motorcycles Pakistan`,
    brand?.focus_keyword,
    `${brandName} latest models`,
    `${brandName} reviews`,
    'new bikes in Pakistan',
    'ebike.pk'
  ].filter(Boolean) as string[];

  return {
    brandName,
    canonicalUrl,
    description,
    title,
    image,
    keywords,
    modelCount: data.length,
    plainDescription,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const data = await getBrandBikes(slug);
  const seo = getBrandSeo(data, slug);

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
          url: seo.image,
          width: 1200,
          height: 630,
          alt: `${seo.brandName} new bikes in Pakistan`
        }
      ],
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    }
  };
}

function buildBrandJsonLd(data: BrandBike[], slug: string) {
  const seo = getBrandSeo(data, slug);

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
          `${seo.brandName} bikes in Pakistan`,
          `${seo.brandName} bike prices`,
          `${seo.brandName} bike specifications`
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
          {
            "@type": "ListItem",
            position: 3,
            name: seo.brandName,
            item: seo.canonicalUrl
          }
        ]
      },
      {
        "@type": "Brand",
        "@id": `${seo.canonicalUrl}#brand`,
        name: seo.brandName,
        url: seo.canonicalUrl,
        logo: seo.image,
        description: seo.description
      },
      {
        "@type": "ItemList",
        "@id": `${seo.canonicalUrl}#itemlist`,
        name: `${seo.brandName} new bike models in Pakistan`,
        numberOfItems: data.length,
        itemListElement: data.slice(0, 24).map((bike, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/new-bikes/${slug}/${bike?.bikeUrl}/${bike?.id}`,
          name: bike?.title || `${seo.brandName} Bike`,
          item: {
            "@type": "Product",
            name: bike?.title || `${seo.brandName} Bike`,
            url: `${SITE_URL}/new-bikes/${slug}/${bike?.bikeUrl}/${bike?.id}`,
            image: seo.image,
            brand: seo.brandName,
            offers: {
              "@type": "Offer",
              priceCurrency: "PKR",
              ...(Number.isFinite(Number(bike?.price)) ? { price: Number(bike?.price) } : {}),
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/new-bikes/${slug}/${bike?.bikeUrl}/${bike?.id}`
            }
          }
        }))
      }
    ]
  };
}

export default async function AllNewBikes({ params }: Props) {
  const data = await getBrandBikes(params.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBrandJsonLd(data, params.slug)) }}
      />
      <AllNewBikeComp initialBrandData={data} />
    </>
  )
}
