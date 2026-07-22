import * as React from 'react';
import { Metadata } from 'next';
import AllUsedBikeComp from "@/ebikeWeb/pageLayouts/all-used-bikes/index";
import { getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";
import { DEFAULT_SHARE_IMAGE, resolveClassifiedShareImage, SITE_URL, slugify } from '@/app/metadata-utils';

const usedBikeSaleTitle = "Used Bike for Sale in Pakistan | ebike.pk";
const usedBikeSaleDescription = "Find used bike for sale in Pakistan on ebike.pk. Browse second hand motorcycles with prices, photos, city, model year, engine CC and seller details.";
const usedBikeSaleCanonical = `${SITE_URL}/used-bike-for-sale-in-pakistan`;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: usedBikeSaleTitle,
    description: usedBikeSaleDescription,
    keywords: [
      "used bike for sale in Pakistan",
      "used bikes for sale in Pakistan",
      "second hand bike for sale Pakistan",
      "buy used bike Pakistan",
      "used motorcycle for sale Pakistan"
    ],
    alternates: {
      canonical: usedBikeSaleCanonical,
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
      title: usedBikeSaleTitle,
      description: usedBikeSaleDescription,
      url: usedBikeSaleCanonical,
      siteName: "ebike.pk",
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: "Used bike for sale in Pakistan"
        }
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: usedBikeSaleTitle,
      description: usedBikeSaleDescription,
      images: [DEFAULT_SHARE_IMAGE],
    }
  };
}

function buildUsedBikeSaleListJsonLd(usedBikes: any) {
  const bikes = Array.isArray(usedBikes?.data) ? usedBikes.data.slice(0, 12) : [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${usedBikeSaleCanonical}#webpage`,
        url: usedBikeSaleCanonical,
        name: usedBikeSaleTitle,
        description: usedBikeSaleDescription,
        inLanguage: "en-PK",
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        about: [
          "used bike for sale in Pakistan",
          "second hand motorcycles",
          "motorcycle classifieds"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${usedBikeSaleCanonical}#breadcrumb`,
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
            name: "Used Bike for Sale in Pakistan",
            item: usedBikeSaleCanonical
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${usedBikeSaleCanonical}#itemlist`,
        name: "Latest used bike ads for sale in Pakistan",
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
              name: bike?.title || "Used Bike",
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
          };
        })
      }
    ]
  };
}

export default async function UsedBikeForSaleInPakistan() {
  const allUsedBike = await getCustomBikeAd({ adslimit: 12 });
  const allFeaturedBike = await getCustomBikeAd({ isFeatured: true, adslimit: 20 });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildUsedBikeSaleListJsonLd(allUsedBike)) }}
      />
      <AllUsedBikeComp
        _allFeaturedBike={allFeaturedBike}
        _allUsedBike={allUsedBike}
      />
    </>
  );
}
