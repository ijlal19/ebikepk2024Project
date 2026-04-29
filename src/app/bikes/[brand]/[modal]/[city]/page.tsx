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

function getFilterRequest(params: Props['params']) {
  const filters = getBikeFilterIds(params);
  const modalSlug = getBikeFilterSlug(params.modal);
  const modalSearch = modalSlug !== ALL_FILTER_VALUE && !filters.year
    ? formatFilterLabel(params.modal)
    : '';

  return {
    page: 1,
    adslimit: 12,
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

function getFilterSeo(params: Props['params']) {
  const brand = formatFilterLabel(params.brand);
  const modal = formatFilterLabel(params.modal);
  const city = formatFilterLabel(params.city);
  const modelYear = modal && /^\d{4}$/.test(modal) ? modal : '';
  const modelName = modal && !modelYear ? modal : '';
  const canonical = `${SITE_URL}/bikes/${getBikeFilterSlug(params.brand)}/${getBikeFilterSlug(params.modal)}/${getBikeFilterSlug(params.city)}`;
  const bikeLabel = [brand, modelName || modelYear].filter(Boolean).join(' ');
  const locationLabel = city ? `in ${city}` : 'in Pakistan';
  const heading = `${bikeLabel ? `${bikeLabel} Used Bikes` : 'Used Bikes'} for Sale ${locationLabel}`;
  const title = `${bikeLabel ? `${bikeLabel} Used Bikes` : 'Used Bikes'} for Sale ${locationLabel} | ebike.pk`;
  const description = trimText(
    `Find ${bikeLabel ? `${bikeLabel} used bikes` : 'used bikes'} for sale ${locationLabel} on ebike.pk. Browse URL-filtered motorcycle listings with prices, photos, model year, city and seller details.`,
    170
  );
  const keywords = [
    bikeLabel ? `${bikeLabel} used bikes` : 'used bikes in Pakistan',
    bikeLabel && city ? `${bikeLabel} bikes for sale in ${city}` : '',
    brand ? `${brand} used bikes` : '',
    modelName ? `${modelName} used bikes` : '',
    modelYear ? `${modelYear} bikes for sale` : '',
    city ? `used bikes in ${city}` : '',
    brand && modelName ? `${brand} ${modelName} for sale` : '',
    brand && modelYear ? `${brand} ${modelYear} model used bike` : '',
    'second hand bikes Pakistan',
    'motorcycles for sale Pakistan',
    'ebike.pk'
  ].filter(Boolean) as string[];

  return {
    brand,
    modelYear,
    modelName,
    city,
    canonical,
    heading,
    title,
    description,
    keywords,
    locationLabel,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seo = getFilterSeo(params);
  const filteredBikes = await getCustomBikeAd(getFilterRequest(params));
  const firstBike = Array.isArray(filteredBikes?.data) ? filteredBikes.data[0] : null;
  const shareImage = firstBike?.images ? resolveClassifiedShareImage(firstBike.images) : DEFAULT_SHARE_IMAGE;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
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
  const bikes = Array.isArray(usedBikes?.data) ? usedBikes.data.slice(0, 12) : [];
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
        ],
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
              '@type': 'Product',
              name: bike?.title || seo.heading,
              url: bikeUrl,
              image: resolveClassifiedShareImage(bike?.images),
              category: 'Used motorcycle',
              ...(seo.brand ? { brand: { '@type': 'Brand', name: seo.brand } } : {}),
              offers: {
                '@type': 'Offer',
                priceCurrency: 'PKR',
                ...(Number.isFinite(price) ? { price } : {}),
                availability: bike?.is_sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/UsedCondition',
                url: bikeUrl,
              },
            },
          };
        }),
      },
    ],
  };
}

export default async function BikesByFilter({ params }: Props) {
  const filterRequest = getFilterRequest(params);
  const allUsedBike = await getCustomBikeAd(filterRequest);
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
      />
    </>
  );
}
