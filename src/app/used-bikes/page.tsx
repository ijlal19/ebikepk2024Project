import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";
import { resolveClassifiedShareImage, SITE_URL, slugify } from '@/app/metadata-utils';
import UsedBikesPageContent from './UsedBikesPageContent';

const usedBikeTitle = "Used Bikes for Sale in Pakistan | Second Hand Bikes | ebike.pk";
const usedBikeDescription = "Find used bikes for sale in Pakistan. Compare second hand motorcycle prices, photos, model years, engine capacity and locations on ebike.pk.";
const usedBikeCanonical = `${SITE_URL}/used-bikes`;
const usedBikeOgImage = `${SITE_URL}/ebikelogo.png`;
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
  { label: "Used bikes in Islamabad", href: "/used-bikes/bike-by-city/islamabad/3" },
  { label: "Used bikes in Rawalpindi", href: "/used-bikes/bike-by-city/rawalpindi/8" },
  { label: "Used bikes in Faisalabad", href: "/used-bikes/bike-by-city/faisalabad/6" },
  { label: "Honda used bikes", href: "/used-bikes/bike-by-brand/honda/1" },
  { label: "Suzuki used bikes", href: "/used-bikes/bike-by-brand/suzuki/6" },
  { label: "Yamaha used bikes", href: "/used-bikes/bike-by-brand/yamaha/7" },
  { label: "United used bikes", href: "/used-bikes/bike-by-brand/united/8" },
  { label: "Road Prince used bikes", href: "/used-bikes/bike-by-brand/road_prince/19" },
  { label: "70cc used bikes", href: "/used-bikes/bike-by-cc/70/1" },
  { label: "100cc used bikes", href: "/used-bikes/bike-by-cc/100/1" },
  { label: "125cc used bikes", href: "/used-bikes/bike-by-cc/125/1" },
  { label: "150cc used bikes", href: "/used-bikes/bike-by-cc/150/1" },
  { label: "200cc used bikes", href: "/used-bikes/bike-by-cc/200/1" },
  { label: "Sell a used bike", href: "/used-bikes/sell-used-bike" }
];
const usedBikeQualityRequest = {
  approved_only: true,
  exclude_sold: true,
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
  },
  {
    question: "How can I find used bikes in my city?",
    answer: "Use the city links on this page or the listing filters to browse used bikes by city and compare nearby seller listings."
  },
  {
    question: "Can I search used bikes by engine capacity?",
    answer: "Yes, use the CC filter or the engine-capacity links to browse available used bikes by engine size."
  }
];

type UsedBikeSearchParams = { page?: string | string[] };

function getPageNumber(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue) return { page: 1, isInvalid: false, isExplicit: false };

  const page = Number(rawValue);
  return {
    page,
    isInvalid: !Number.isInteger(page) || page < 1,
    isExplicit: true,
  };
}

function getUsedBikePageUrl(page: number) {
  return page > 1 ? `${usedBikeCanonical}?page=${page}` : usedBikeCanonical;
}

export const dynamic = "force-dynamic";

function hasQualityUsedBikeData(bike: any) {
  const price = Number(bike?.price);
  return bike?.price !== undefined && bike?.price !== null && Number.isFinite(price) && price >= 0 && Array.isArray(bike?.images) && bike.images.some(Boolean) && !bike?.is_sold;
}

function normalizeUsedBikeResponse(response: any) {
  return {
    ...(response || {}),
    data: Array.isArray(response?.data) ? response.data.filter(hasQualityUsedBikeData) : []
  };
}

export async function generateMetadata(
  { searchParams }: { searchParams?: Promise<UsedBikeSearchParams> | UsedBikeSearchParams }
): Promise<Metadata> {
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const requestedPage = getPageNumber(resolvedSearchParams?.page);
  const page = requestedPage.isInvalid ? 1 : requestedPage.page;
  const pageTitle = page > 1 ? `${usedBikeTitle.split(" | ")[0]} - Page ${page} | ebike.pk` : usedBikeTitle;
  const canonicalUrl = getUsedBikePageUrl(page);
 
  return {
    title: pageTitle,
    description: usedBikeDescription,
    keywords: [
      "used bikes in Pakistan",
      "used bike for sale in Pakistan",
      "used motorcycle for sale in pakistan",
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
      canonical: canonicalUrl,
    },
    robots: {
      index: !requestedPage.isInvalid,
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
      title: pageTitle,
      description: usedBikeDescription,
      url: canonicalUrl,
      siteName: "ebike.pk",
      images: [
        {
          url: usedBikeOgImage,
          width: 666,
          height: 375,
          alt: "Used bikes for sale in Pakistan"
        }
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: usedBikeDescription,
      images: [usedBikeOgImage],
    }
  }
}

function buildUsedBikeListJsonLd(usedBikes: any, page: number) {
  const bikes = Array.isArray(usedBikes?.data) ? usedBikes.data.filter(hasQualityUsedBikeData).slice(0, 12) : [];
  const canonicalUrl = getUsedBikePageUrl(page);
  const pageTitle = page > 1 ? `${usedBikeTitle.split(" | ")[0]} - Page ${page} | ebike.pk` : usedBikeTitle;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: usedBikeDescription,
        inLanguage: "en-PK",
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        mainEntity: {
          "@id": `${canonicalUrl}#itemlist`
        },
        about: [
          "used bike for sale in Pakistan",
          "used motorcycle for sale in pakistan",
          "used bikes in Pakistan",
          "second hand motorcycles",
          "motorcycle classifieds"
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
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
            item: canonicalUrl
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#itemlist`,
        name: "Latest used bike ads for sale in Pakistan",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: bikes.length,
        itemListElement: bikes.map((bike: any, index: number) => {
          const bikeUrl = `${SITE_URL}/used-bikes/${slugify(bike?.title)}/${bike?.id}`;
          const price = Number(bike?.price);

          return {
            "@type": "ListItem",
            position: ((page - 1) * 12) + index + 1,
            url: bikeUrl,
            item: {
              "@type": "WebPage",
              "@id": `${bikeUrl}#webpage`,
              name: bike?.title || "Used Bike for Sale",
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
        "@id": `${canonicalUrl}#faq`,
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

export default async function AllUsedBikes(
  { searchParams }: { searchParams?: Promise<UsedBikeSearchParams> | UsedBikeSearchParams }
) {
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const requestedPage = getPageNumber(resolvedSearchParams?.page);

  if (requestedPage.isInvalid || (requestedPage.isExplicit && requestedPage.page === 1)) {
    redirect(usedBikeCanonical);
  }

  let obj = {
    adslimit: 12,
    page: requestedPage.page,
    ...usedBikeQualityRequest
  }
  let allUsedBike = normalizeUsedBikeResponse(await getCustomBikeAd(obj));

  if (Number(allUsedBike?.pages) > 0 && requestedPage.page > Number(allUsedBike.pages)) {
    notFound();
  }

  return (
    <UsedBikesPageContent
      allUsedBike={allUsedBike}
      jsonLd={buildUsedBikeListJsonLd(allUsedBike, requestedPage.page)}
      listingHeading="Used Bikes for Sale in Pakistan"
      listingSubheading="Second hand Honda, Yamaha, Suzuki & more"
      seoHeading="Used Bike for Sale in Pakistan on ebike.pk"
      seoIntro="This page is focused on buyers searching for a used bike for sale in Pakistan. Browse active second hand motorcycle listings with price, city, model year, engine CC, photos and seller details so you can compare options before making a call."
      seoSections={usedBikeSeoSections}
      seoLinks={usedBikeSeoLinks}
      faqs={usedBikeFaqs}
      hideSidebar
      hidePriceTable
    />
  )
}
