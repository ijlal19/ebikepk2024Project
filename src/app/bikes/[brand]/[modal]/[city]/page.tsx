import * as React from 'react';
import { Metadata } from 'next';
import UrlFilteredUsedBikes from '@/ebikeWeb/pageLayouts/url-filtered-used-bikes';
import BikeFilterBar from '@/ebikeWeb/sharedComponents/bikeFilterBar';
import { getCustomBikeAd } from '@/ebikeWeb/functions/globalFuntions';
import { ALL_FILTER_VALUE, getBikeFilterIds, getBikeFilterSlug } from '@/ebikeWeb/utils/bikeFilterRoute';
import { DEFAULT_SHARE_IMAGE, resolveClassifiedShareImage, SITE_URL, slugify, stripHtml, trimText } from '@/app/metadata-utils';

type Props = {
  params: {
    brand: string;
    modal: string;
    city: string;
  };
};

export const dynamic = 'force-dynamic';

const usedBikeQualityRequest = {
  approved_only: true,
  exclude_sold: true,
  min_price: 1,
  require_image: true,
  sort_by: 'quality',
  sort_order: 'desc',
};

function isAllUsedBikeFilter(params: Props['params']) {
  return (
    getBikeFilterSlug(params.brand) === ALL_FILTER_VALUE &&
    getBikeFilterSlug(params.modal) === ALL_FILTER_VALUE &&
    getBikeFilterSlug(params.city) === ALL_FILTER_VALUE
  );
}

function hasQualityUsedBikeData(bike: any) {
  const price = Number(bike?.price);
  return Number.isFinite(price) && price > 0 && Array.isArray(bike?.images) && bike.images.some(Boolean) && !bike?.is_sold;
}

function normalizeUsedBikeResponse(response: any) {
  return {
    ...(response || {}),
    data: Array.isArray(response?.data) ? response.data.filter(hasQualityUsedBikeData) : []
  };
}

function getFilterRequest(params: Props['params']) {
  const filters = getBikeFilterIds(params);
  const modalSlug = getBikeFilterSlug(params.modal);
  const modalSearch = modalSlug !== ALL_FILTER_VALUE && !filters.year
    ? formatFilterLabel(params.modal)
    : '';

  return {
    page: 1,
    adslimit: 12,
    ...usedBikeQualityRequest,
    brand_filter: filters.brand ? [filters.brand] : [],
    city_filter: filters.city ? [filters.city] : [],
    years_filter: filters.year ? [filters.year] : [],
    ...(modalSearch ? { search: modalSearch } : {}),
  };
}

function formatFilterLabel(value: string) {
  const cleanValue = getBikeFilterSlug(value);
  return cleanValue === ALL_FILTER_VALUE
    ? ''
    : cleanValue.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function uniqueSeoList(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function getFilterSeo(params: Props['params']) {
  const brand = formatFilterLabel(params.brand);
  const modal = formatFilterLabel(params.modal);
  const city = formatFilterLabel(params.city);
  const cityLabel = city || 'Pakistan';
  const modelYear = modal && /^\d{4}$/.test(modal) ? modal : '';
  const modelName = modal && !modelYear ? modal : '';
  const canonical = isAllUsedBikeFilter(params)
    ? `${SITE_URL}/used-bikes`
    : `${SITE_URL}/bikes/${getBikeFilterSlug(params.brand)}/${getBikeFilterSlug(params.modal)}/${getBikeFilterSlug(params.city)}`;
  const bikeLabel = [brand, modelName || modelYear].filter(Boolean).join(' ');
  const locationLabel = `in ${cityLabel}`;
  const heading = `${bikeLabel ? `${bikeLabel} Used Bikes` : 'Used Bikes'} for Sale ${locationLabel}`;
  const title = `${bikeLabel ? `${bikeLabel} Used Bikes` : 'Used Bikes'} for Sale ${locationLabel} | Prices & Ads | ebike.pk`;
  const intro = trimText(
    `Browse ${bikeLabel ? `${bikeLabel} used bikes` : 'used bikes'} for sale ${locationLabel} with updated prices, photos, model year details and seller information. Compare second hand motorcycle ads on ebike.pk before you contact the seller.`,
    220
  );
  const description = trimText(
    `Find ${bikeLabel ? `${bikeLabel} used bikes` : 'used bikes'} for sale ${locationLabel} on ebike.pk. Compare prices, photos, model year, city and seller details for second hand motorcycles.`,
    170
  );
  const seoTags = uniqueSeoList([
    heading,
    bikeLabel ? `${bikeLabel} price ${city || 'Pakistan'}` : `used bike prices ${city || 'Pakistan'}`,
    bikeLabel ? `${bikeLabel} ads ${city || 'Pakistan'}` : `used bike ads ${city || 'Pakistan'}`,
    brand && modelYear && city ? `${brand} ${modelYear} bikes in ${city}` : '',
    brand && city ? `${brand} bikes in ${city}` : '',
    modelYear && city ? `${modelYear} model bikes in ${city}` : '',
    city ? `second hand motorcycles in ${city}` : 'second hand motorcycles in Pakistan',
  ]);
  const keywords = uniqueSeoList([
    bikeLabel ? `${bikeLabel} used bikes` : 'used bikes in Pakistan',
    bikeLabel && city ? `${bikeLabel} bikes for sale in ${city}` : '',
    brand ? `${brand} used bikes` : '',
    modelName ? `${modelName} used bikes` : '',
    modelYear ? `${modelYear} bikes for sale` : '',
    city ? `used bikes in ${city}` : '',
    brand && modelName ? `${brand} ${modelName} for sale` : '',
    brand && modelYear ? `${brand} ${modelYear} model used bike` : '',
    brand && modelYear && city ? `${brand} ${modelYear} used bikes in ${city}` : '',
    brand && city ? `${brand} second hand bikes ${city}` : '',
    city ? `bike price in ${city}` : 'bike price in Pakistan',
    city ? `used motorcycle ads ${city}` : 'used motorcycle ads Pakistan',
    'second hand bikes Pakistan',
    'motorcycles for sale Pakistan',
    'ebike.pk'
  ]);

  return {
    brand,
    modelYear,
    modelName,
    city,
    canonical,
    heading,
    title,
    intro,
    description,
    keywords,
    seoTags,
    locationLabel,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seo = getFilterSeo(params);
  const filteredBikes = normalizeUsedBikeResponse(await getCustomBikeAd(getFilterRequest(params)));
  const firstBike = Array.isArray(filteredBikes?.data) ? filteredBikes.data[0] : null;
  const shareImage = firstBike?.images ? resolveClassifiedShareImage(firstBike.images) : DEFAULT_SHARE_IMAGE;
  const isDuplicateAllUsedBikesPage = isAllUsedBikeFilter(params);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    robots: {
      index: !isDuplicateAllUsedBikesPage,
      follow: true,
      googleBot: {
        index: !isDuplicateAllUsedBikesPage,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: 'automotive',
    authors: [{ name: 'ebike.pk' }],
    publisher: 'ebike.pk',
    applicationName: 'ebike.pk',
    metadataBase: new URL(SITE_URL),
    other: {
      'content-language': 'en-PK',
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: 'ebike.pk',
      type: 'website',
      locale: 'en_PK',
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [shareImage],
    },
  };
}

function buildFilterJsonLd(params: Props['params'], usedBikes: any) {
  const seo = getFilterSeo(params);
  const bikes = Array.isArray(usedBikes?.data) ? usedBikes.data.filter(hasQualityUsedBikeData).slice(0, 12) : [];
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Used Bikes',
      item: `${SITE_URL}/used-bikes`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: stripHtml(seo.title.replace(' | ebike.pk', '')),
      item: seo.canonical,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: 'en-PK',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: [
          seo.brand ? `${seo.brand} used bikes` : 'used bikes in Pakistan',
          seo.modelYear ? `${seo.modelYear} model bikes` : 'second hand motorcycles',
          seo.modelName ? `${seo.modelName} used bikes` : 'used motorcycle listings',
          seo.city ? `used bikes in ${seo.city}` : 'motorcycles for sale in Pakistan',
          ...seo.seoTags,
        ],
        keywords: seo.keywords.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${seo.canonical}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      {
        '@type': 'ItemList',
        '@id': `${seo.canonical}#itemlist`,
        name: seo.heading,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: bikes.length,
        itemListElement: bikes.map((bike: any, index: number) => {
          const bikeUrl = `${SITE_URL}/used-bikes/${slugify(bike?.title)}/${bike?.id}`;
          const price = Number(bike?.price);

          return {
            '@type': 'ListItem',
            position: index + 1,
            url: bikeUrl,
            item: {
              '@type': 'WebPage',
              '@id': `${bikeUrl}#webpage`,
              name: bike?.meta_title || bike?.title || seo.heading,
              url: bikeUrl,
              image: resolveClassifiedShareImage(bike?.images),
              description: [
                bike?.title,
                Number.isFinite(price) && price > 0 ? `Asking price PKR ${price}` : "",
                seo.city ? `Location ${seo.city}` : ""
              ].filter(Boolean).join(". "),
              about: "Used motorcycle classified ad"
            },
          };
        }),
      },
    ],
  };
}

export default async function BikesByFilter({ params }: Props) {
  const filterRequest = getFilterRequest(params);
  const allUsedBike = normalizeUsedBikeResponse(await getCustomBikeAd(filterRequest));
  const seo = getFilterSeo(params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFilterJsonLd(params, allUsedBike)) }}
      />
      <BikeFilterBar
        initialBrand={params.brand}
        initialModal={params.modal}
        initialCity={params.city}
        variant="page"
      />
      <UrlFilteredUsedBikes
        _allUsedBike={allUsedBike}
        filterRequest={filterRequest}
        heading={stripHtml(seo.heading)}
        seoIntro={stripHtml(seo.intro)}
        seoTags={seo.seoTags}
      />
    </>
  );
}
