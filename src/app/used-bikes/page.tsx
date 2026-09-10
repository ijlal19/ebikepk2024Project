import { Metadata } from 'next'
import { getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";
import { DEFAULT_SHARE_IMAGE, resolveClassifiedShareImage, SITE_URL, slugify } from '@/app/metadata-utils';
import UsedBikesPageContent from './UsedBikesPageContent';

const usedBikeTitle = "Used Bike for Sale in Pakistan | Second Hand Bikes | ebike.pk";
const usedBikeDescription = "Find a used bike for sale in Pakistan with prices, photos, city, model year, engine CC and seller contact information on ebike.pk.";
const usedBikeCanonical = `${SITE_URL}/used-bikes`;
const usedBikeSeoTags = [
  "used bike for sale in Pakistan",
  "second hand bikes in Pakistan",
  "buy used bike in Pakistan",
  "used motorcycle for sale Pakistan",
  "used Honda bike for sale",
  "used Yamaha bike for sale",
  "used Suzuki bike for sale"
];
const usedBikeSeoSections = [
  {
    heading: "Find the right used bike before you call",
    body: "A good used bike search starts with the details buyers actually compare: asking price, model year, registration city, engine CC, photos, condition and seller information. This page brings active used motorcycle ads together so buyers can shortlist options before contacting a seller."
  },
  {
    heading: "Compare second hand bike prices in Pakistan",
    body: "Used bike prices in Pakistan vary by brand, condition, mileage, documents, registration city and demand. ebike.pk helps buyers compare Honda, Yamaha, Suzuki, United, Road Prince, Super Power and other second hand bikes in one place."
  },
  {
    heading: "Search used bikes by city, brand, year and CC",
    body: "Buyers can filter used bike listings by major Pakistani cities, popular motorcycle brands, model year and engine capacity. This makes it easier to find a nearby bike, inspect it in person and negotiate with the seller."
  },
  {
    heading: "Sell your used bike to active buyers",
    body: "Sellers can post a used bike ad with clear photos, correct price, bike condition, registration details and contact number so serious buyers looking for a used bike for sale in Pakistan can reach them quickly."
  }
];
const usedBikeSeoLinks = [
  { label: "Used bikes in Karachi", href: "/used-bikes/bike-by-city/karachi/1" },
  { label: "Used bikes in Lahore", href: "/used-bikes/bike-by-city/lahore/2" },
  { label: "Honda used bikes", href: "/used-bikes/bike-by-brand/honda/1" },
  { label: "Sell a used bike", href: "/used-bikes/sell-used-bike" }
];
const usedBikeQualityRequest = {
  approved_only: true,
  exclude_sold: true,
  min_price: 1,
  require_image: true,
  sort_by: "quality",
  sort_order: "desc"
};
const usedBikeFaqs = [
  {
    question: "Where can I find a used bike for sale in Pakistan?",
    answer: "You can browse used bike ads on ebike.pk and compare motorcycles by price, city, model year, brand, engine CC, photos and seller details."
  },
  {
    question: "What should I check before buying a second hand bike?",
    answer: "Before buying a second hand bike, compare market price, inspect condition, check registration documents, verify engine and chassis details and meet the seller in a safe location."
  },
  {
    question: "Can I sell my used bike on ebike.pk?",
    answer: "Yes, sellers can post a used bike ad with photos, price, condition, registration details and contact information to reach buyers looking for motorcycles in Pakistan."
  }
];

export const dynamic = "force-dynamic";

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

export async function generateMetadata(): Promise<Metadata> {
 
  return {
    title: usedBikeTitle,
    description: usedBikeDescription,
    keywords: [
      "used bikes in Pakistan",
      "used bike for sale in Pakistan",
      "used motorcycles for sale",
      "second hand bikes Pakistan",
      "second hand bikes in Pakistan",
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
  const bikes = Array.isArray(usedBikes?.data) ? usedBikes.data.filter(hasQualityUsedBikeData).slice(0, 12) : [];

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
        mainEntity: {
          "@id": `${usedBikeCanonical}#itemlist`
        },
        about: [
          "used bike for sale in Pakistan",
          "used bikes in Pakistan",
          "second hand motorcycles",
          "motorcycle classifieds"
        ],
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/used-bikes?query={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
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
              "@type": "WebPage",
              "@id": `${bikeUrl}#webpage`,
              name: bike?.meta_title || bike?.title || "Used Bike for Sale",
              url: bikeUrl,
              image: resolveClassifiedShareImage(bike?.images),
              description: [
                bike?.title,
                Number.isFinite(price) && price > 0 ? `Asking price PKR ${price}` : "",
                bike?.location ? `Location ${bike.location}` : ""
              ].filter(Boolean).join(". "),
              about: "Used motorcycle classified ad"
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
    page: 1,
    ...usedBikeQualityRequest
  }
  let allUsedBike = normalizeUsedBikeResponse(await getCustomBikeAd(obj));

  let featureObject = {
    isFeatured: true,
    adslimit: 20,
    ...usedBikeQualityRequest
  }
  let allFeaturedBike = normalizeUsedBikeResponse(await getCustomBikeAd(featureObject));

  return (
    <UsedBikesPageContent
      allFeaturedBike={allFeaturedBike}
      allUsedBike={allUsedBike}
      jsonLd={buildUsedBikeListJsonLd(allUsedBike)}
      seoTags={usedBikeSeoTags}
      pageTitle="Used Bike for Sale in Pakistan"
      pageDescription="Browse active used bike ads in Pakistan with prices, photos, model year, city, engine CC and seller details. Compare second hand motorcycles from Honda, Yamaha, Suzuki and other brands before you contact the seller."
      listingHeading="Used Bike for Sale in Pakistan"
      listingSubheading="Second hand Honda, Yamaha, Suzuki & more"
      seoHeading="Used Bike for Sale in Pakistan on ebike.pk"
      seoIntro="This page is focused on buyers searching for a used bike for sale in Pakistan. Browse active second hand motorcycle listings with price, city, model year, engine CC, photos and seller details so you can compare options before making a call."
      seoSections={usedBikeSeoSections}
      seoLinks={usedBikeSeoLinks}
      hideSidebar
      hidePriceTable
    />
  )
}
