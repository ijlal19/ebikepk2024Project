import Index from '@/ebikeWeb/pageLayouts/home'
import * as React from 'react';
import type { Metadata } from 'next'
import { DEFAULT_SHARE_IMAGE, SITE_URL } from './metadata-utils';

const currentYear = new Date().getFullYear();
const homeTitle = `ebike.pk - Buy & Sell New, Used & Electric Bikes in Pakistan | Latest Bike Prices ${currentYear}`;
const homeDescription = "Explore new bikes, used bike ads, electric bikes, bike prices, specifications, reviews, dealers, mechanics, and motorcycle news in Pakistan on ebike.pk.";
const canonicalUrl = `${SITE_URL}/`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: homeTitle,
    description: homeDescription,
    keywords: [
      "electric bikes in Pakistan",
      "new bike price in Pakistan",
      "used bikes in Pakistan",
      "bike prices Pakistan",
      "ebike Pakistan",
      "electric scooter Pakistan",
      "okla electric bike Pakistan",
      "revoo electric bike Pakistan",
      "crown electric bike Pakistan",
      "jolta electric bike Pakistan",
      "buy and sell bikes Pakistan",
      "motorcycle prices Pakistan",
      "Honda bike price",
      "Yamaha bike price",
      "Suzuki bike price",
      "bike dealers in Pakistan"
    ],
    alternates: {
      canonical: canonicalUrl,
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
    category: "automotive",
    openGraph: {
      title: homeTitle,
      description: homeDescription,
      url: canonicalUrl,
      siteName: "ebike.pk",
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: "ebike.pk homepage"
        }
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: homeDescription,
      images: [DEFAULT_SHARE_IMAGE],
    }
  };
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: "ebike.pk",
        description: homeDescription,
        inLanguage: "en-PK",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?keyword={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${canonicalUrl}#organization`,
        name: "ebike.pk",
        url: canonicalUrl,
        logo: DEFAULT_SHARE_IMAGE,
        image: DEFAULT_SHARE_IMAGE
      },
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: homeTitle,
        description: homeDescription,
        isPartOf: {
          "@id": `${canonicalUrl}#website`
        },
        about: [
          "new bikes in Pakistan",
          "used bikes in Pakistan",
          "electric bikes in Pakistan"
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Index/>
    </>
  );
}
