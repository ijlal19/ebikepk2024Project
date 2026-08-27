import * as React from 'react';
import Dealer from '@/ebikeWeb/pageLayouts/dealers/index';
import { Metadata } from 'next'
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from '@/app/metadata-utils';

const dealerTitle = 'Motorcycle Dealers in Pakistan | Bike Showrooms | ebike.pk';
const dealerDescription = 'Find motorcycle dealers and bike showrooms in Pakistan on ebike.pk. Browse authorized and multi-brand dealers with contact details, brands, locations and featured dealer listings.';
const dealerCanonical = `${SITE_URL}/dealers`;
const dealerKeywords = [
  'motorcycle dealers in Pakistan',
  'bike showrooms in Pakistan',
  'authorized bike dealers Pakistan',
  'Honda bike dealers Pakistan',
  'Suzuki bike dealers Pakistan',
  'Yamaha bike dealers Pakistan',
];

const dealerSeoTags = [
  'motorcycle dealers in Pakistan',
  'bike showrooms Pakistan',
  'authorized bike dealers',
  'new bike dealers near me',
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: dealerTitle,
    description: dealerDescription,
    keywords: dealerKeywords,
    alternates: {
      canonical: dealerCanonical,
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
    openGraph: {
      title: dealerTitle,
      description: dealerDescription,
      url: dealerCanonical,
      siteName: 'ebike.pk',
      type: 'website',
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: 'ebike.pk motorcycle dealers',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dealerTitle,
      description: dealerDescription,
      images: [DEFAULT_SHARE_IMAGE],
    },
  }
}

export default async function Dealers() {

  const [dealer, featuredDelaer] = await Promise.all([
    getAllDealer(),
    getFeaturedDealer(),
  ]);

  let approvedDealers = Array.isArray(dealer) ? dealer.filter((d: any) => d.is_approved === true) : [];
  let approvedFeaturedDealers = Array.isArray(featuredDelaer) ? featuredDelaer.filter((d: any) => d.is_approved === true) : [];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${dealerCanonical}#webpage`,
      url: dealerCanonical,
      name: dealerTitle,
      description: dealerDescription,
      isPartOf: {
        '@type': 'WebSite',
        name: 'ebike.pk',
        url: SITE_URL,
      },
      about: [
        'motorcycle dealers in Pakistan',
        'bike showrooms',
        'new bike dealers',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${dealerCanonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Dealers',
          item: dealerCanonical,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${dealerCanonical}#itemlist`,
      name: 'Motorcycle dealers in Pakistan',
      numberOfItems: approvedDealers.length,
      itemListElement: approvedDealers.slice(0, 24).map((dealerInfo: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: dealerInfo?.dealerName || dealerInfo?.name || 'Bike Dealer',
        url: `${SITE_URL}/dealers`,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Dealer
        featuredDelaer={approvedFeaturedDealers}
        delaer={approvedDealers}
        seoHeading="Motorcycle Dealers in Pakistan"
        seoIntro="Browse motorcycle dealers and bike showrooms in Pakistan with brand information, featured listings, contact details and locations. Compare authorized and multi-brand dealers on ebike.pk before you visit a showroom."
        seoTags={dealerSeoTags}
      />
    </>
  )
}
