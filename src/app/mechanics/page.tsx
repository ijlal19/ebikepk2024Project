import * as React from 'react';
import Mechanic from '@/ebikeWeb/pageLayouts/mechanics';
import { Metadata } from 'next'
import { getAllMechanics, getFeaturedMechanics } from '@/ebikeWeb/functions/globalFuntions';
import { DEFAULT_SHARE_IMAGE, SITE_URL } from '@/app/metadata-utils';

const mechanicTitle = 'Bike Mechanics in Pakistan | Motorcycle Workshops | ebike.pk';
const mechanicDescription = 'Find bike mechanics and motorcycle workshops in Pakistan on ebike.pk. Browse repair shops, service providers, featured mechanics, contact details and workshop locations.';
const mechanicCanonical = `${SITE_URL}/mechanics`;
const mechanicKeywords = [
  'bike mechanics in Pakistan',
  'motorcycle workshop Pakistan',
  'motorbike mechanic near me',
  'bike repair shop Pakistan',
  'motorcycle service center Pakistan',
];

const mechanicSeoTags = [
  'bike mechanics in Pakistan',
  'motorcycle workshops Pakistan',
  'bike repair shops near me',
  'motorcycle service centers',
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: mechanicTitle,
    description: mechanicDescription,
    keywords: mechanicKeywords,
    alternates: {
      canonical: mechanicCanonical,
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
      title: mechanicTitle,
      description: mechanicDescription,
      url: mechanicCanonical,
      siteName: 'ebike.pk',
      type: 'website',
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: 'ebike.pk bike mechanics',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: mechanicTitle,
      description: mechanicDescription,
      images: [DEFAULT_SHARE_IMAGE],
    },
  }
}

export default async function Mechanics() {
  const [mechanics, featureMechincs] = await Promise.all([
    getAllMechanics(),
    getFeaturedMechanics(),
  ]);
  let approvedMechanics = Array.isArray(mechanics) ? mechanics.filter((d: any) => d.is_approved === true) : [];
  let approvedFeaturedMechanics = Array.isArray(featureMechincs) ? featureMechincs.filter((d: any) => d.is_approved === true) : [];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${mechanicCanonical}#webpage`,
      url: mechanicCanonical,
      name: mechanicTitle,
      description: mechanicDescription,
      isPartOf: {
        '@type': 'WebSite',
        name: 'ebike.pk',
        url: SITE_URL,
      },
      about: [
        'bike mechanics in Pakistan',
        'motorcycle workshops',
        'bike repair shops',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${mechanicCanonical}#breadcrumb`,
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
          name: 'Mechanics',
          item: mechanicCanonical,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${mechanicCanonical}#itemlist`,
      name: 'Bike mechanics in Pakistan',
      numberOfItems: approvedMechanics.length,
      itemListElement: approvedMechanics.slice(0, 24).map((mechanicInfo: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: mechanicInfo?.mechanicName || mechanicInfo?.name || 'Bike Mechanic',
        url: `${SITE_URL}/mechanics`,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Mechanic
        featuredMechanic={approvedFeaturedMechanics}
        mechanic={approvedMechanics}
        seoHeading="Bike Mechanics in Pakistan"
        seoIntro="Browse bike mechanics and motorcycle workshops in Pakistan with service details, featured listings, contact information and workshop locations. Find repair shops and service providers on ebike.pk before booking a visit."
        seoTags={mechanicSeoTags}
      />
    </>
  )
}
