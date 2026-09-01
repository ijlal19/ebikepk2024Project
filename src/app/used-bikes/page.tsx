// 'use client'
import * as React from 'react';
import AllUsedBikeComp from "@/ebikeWeb/pageLayouts/all-used-bikes/index";
import { Metadata } from 'next'
import { getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";
import { DEFAULT_SHARE_IMAGE, resolveClassifiedShareImage, SITE_URL, slugify } from '@/app/metadata-utils';
import SeoContentBlock from '@/app/components/SeoContentBlock';

const usedBikeTitle = "Used Bikes for Sale in Pakistan | ebike.pk";
const usedBikeDescription = "Browse used bikes and motorcycles for sale in Pakistan. Compare Honda, Yamaha, Suzuki and other second hand bikes by price, city, model year and engine CC.";
const usedBikeCanonical = `${SITE_URL}/used-bikes`;
const usedBikeSeoTags = [
  "Used Bikes for Sale in Pakistan",
  "used bike prices Pakistan",
  "used bike ads Pakistan",
  "second hand motorcycles in Pakistan",
  "Honda used bikes Pakistan",
  "Yamaha used bikes Pakistan",
  "Suzuki used bikes Pakistan"
];
const usedBikeFaqs = [
  {
    question: "How can I find used bikes for sale in Pakistan on ebike.pk?",
    answer: "You can browse used bike ads on ebike.pk and compare motorcycles by price, city, model year, brand, engine CC, photos and seller details."
  },
  {
    question: "Which used bike brands are listed on ebike.pk?",
    answer: "ebike.pk lists second hand motorcycles from popular brands including Honda, Yamaha, Suzuki, United, Road Prince, Super Power and other bike makers available in Pakistan."
  },
  {
    question: "Can I sell my used bike on ebike.pk?",
    answer: "Yes, sellers can post a used bike ad with photos, price, condition, registration details and contact information to reach buyers looking for motorcycles in Pakistan."
  }
];

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
 
  return {
    title: usedBikeTitle,
    description: usedBikeDescription,
    keywords: [
      "used bikes in Pakistan",
      "used motorcycles for sale",
      "second hand bikes Pakistan",
      "Honda used bikes",
      "Yamaha used bikes",
      "Suzuki used bikes",
      "used bikes Karachi",
      "used bikes Lahore",
      "buy used bike Pakistan"
    ],
    alternates: {
      canonical: usedBikeCanonical,
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
      title: usedBikeTitle,
      description: usedBikeDescription,
      url: usedBikeCanonical,
      siteName: "ebike.pk",
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: "Used bikes for sale in Pakistan"
        }
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: usedBikeTitle,
      description: usedBikeDescription,
      images: [DEFAULT_SHARE_IMAGE],
    }
  }
}

function buildUsedBikeListJsonLd(usedBikes: any) {
  const bikes = Array.isArray(usedBikes?.data) ? usedBikes.data.slice(0, 12) : [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${usedBikeCanonical}#webpage`,
        url: usedBikeCanonical,
        name: usedBikeTitle,
        description: usedBikeDescription,
        inLanguage: "en-PK",
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        about: [
          "used bikes in Pakistan",
          "second hand motorcycles",
          "motorcycle classifieds"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${usedBikeCanonical}#breadcrumb`,
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
            name: "Used Bikes",
            item: usedBikeCanonical
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${usedBikeCanonical}#itemlist`,
        name: "Latest used bikes for sale in Pakistan",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: bikes.length,
        itemListElement: bikes.map((bike: any, index: number) => {
          const bikeUrl = `${SITE_URL}/used-bikes/${slugify(bike?.title)}/${bike?.id}`;
          const price = Number(bike?.price);

          return {
            "@type": "ListItem",
            position: index + 1,
            url: bikeUrl,
            item: {
              "@type": "Product",
              name: bike?.meta_title || bike?.title || "Used Bike",
              url: bikeUrl,
              image: resolveClassifiedShareImage(bike?.images),
              category: "Used motorcycle",
              offers: {
                "@type": "Offer",
                priceCurrency: "PKR",
                ...(Number.isFinite(price) ? { price } : {}),
                availability: bike?.is_sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
                itemCondition: "https://schema.org/UsedCondition",
                url: bikeUrl
              }
            }
          }
        })
      },
      {
        "@type": "FAQPage",
        "@id": `${usedBikeCanonical}#faq`,
        mainEntity: usedBikeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };
}

export default async function AllUsedBikes() {

  let obj = {
    adslimit: 12,
  }
  let allUsedBike = await getCustomBikeAd(obj);

  let featureObject = {
    isFeatured: true,
    adslimit: 20
  }
  let allFeaturedBike = await getCustomBikeAd(featureObject);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildUsedBikeListJsonLd(allUsedBike)) }}
      />
      <SeoContentBlock
        title="Used Bikes for Sale in Pakistan"
        description="Browse used bikes for sale in Pakistan with updated prices, photos, model year details and seller information. Compare second hand motorcycle ads on ebike.pk before you contact the seller."
        tags={usedBikeSeoTags}
        headingLevel="h1"
      />
      <AllUsedBikeComp
        _allFeaturedBike={allFeaturedBike}
        _allUsedBike={allUsedBike}
      />
    </>
  )
}
