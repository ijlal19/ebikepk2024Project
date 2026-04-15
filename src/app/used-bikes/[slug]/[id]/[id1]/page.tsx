import * as React from 'react';
import AllUsedBikeFilter from "@/ebikeWeb/pageLayouts/all-used-bikes-by-filter/index"
import { Metadata } from 'next'
import { getCityFromId , getBrandFromId, getYearFromId, getCustomBikeAd} from "@/ebikeWeb/functions/globalFuntions"
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData"
import { DEFAULT_SHARE_IMAGE, formatTitleText, resolveClassifiedShareImage, SITE_URL, slugify } from '@/app/metadata-utils';

type Props = {
  params: { id: string, slug: string, id1:string }
}

function getFilterSeo(params: Props["params"]) {
  const { id, slug, id1 } = params;
  const brand = getBrandFromId(id1, BrandArr);
  const city = getCityFromId(id1, CityArr);
  const year = getYearFromId(id1, YearArr);
  const brandCityBrand = getBrandFromId(id, BrandArr);
  const brandCityCity = getCityFromId(id1, CityArr);
  const brandName = brand?.[0]?.brandName ? formatTitleText(brand[0].brandName) : formatTitleText(id);
  const cityName = city?.[0]?.city_name ? formatTitleText(city[0].city_name) : formatTitleText(id);
  const yearName = year?.[0]?.year || id || id1;
  const brandAndCityBrandName = brandCityBrand?.[0]?.brandName ? formatTitleText(brandCityBrand[0].brandName) : formatTitleText(slug.replace(/used-bikes-in-.*/, ""));
  const brandAndCityCityName = brandCityCity?.[0]?.city_name ? formatTitleText(brandCityCity[0].city_name) : formatTitleText(slug.replace(/.*-in-/, "").replace("-city", ""));

  let title = "Used Bikes for Sale in Pakistan | ebike.pk";
  let description = "Find used bikes and second hand motorcycles for sale in Pakistan. Filter listings by brand, city, model year, engine CC and price on ebike.pk.";
  let heading = "Used Bikes";
  let keywords = ["used bikes in Pakistan", "second hand motorcycles", "used motorcycles for sale"];

  if (slug?.indexOf("year") > -1) {
    heading = `${yearName} Model Used Bikes`;
    title = `${yearName} Model Used Bikes for Sale in Pakistan | ebike.pk`;
    description = `Browse ${yearName} model used bikes and motorcycles for sale in Pakistan with photos, prices, seller details and city-wise listings.`;
    keywords = [`${yearName} used bikes`, `${yearName} model motorcycles`, "used bikes in Pakistan"];
  } else if (slug?.indexOf("cc") > -1) {
    heading = `${id}cc Used Bikes`;
    title = `${id}cc Used Bikes for Sale in Pakistan | ebike.pk`;
    description = `Find ${id}cc used bikes and second hand motorcycles for sale in Pakistan. Compare prices, photos, cities and seller details.`;
    keywords = [`${id}cc used bikes`, `${id}cc motorcycles Pakistan`, "used bikes by CC"];
  } else if ((slug?.indexOf("used-bike") > -1 && slug?.indexOf("city") > -1) || slug?.indexOf("brand-and-city") > -1) {
    heading = `${brandAndCityBrandName} Used Bikes in ${brandAndCityCityName}`;
    title = `${brandAndCityBrandName} Used Bikes for Sale in ${brandAndCityCityName} | ebike.pk`;
    description = `Browse ${brandAndCityBrandName} used bikes and motorcycles for sale in ${brandAndCityCityName}. Compare prices, photos, model years and seller details.`;
    keywords = [`${brandAndCityBrandName} used bikes ${brandAndCityCityName}`, `used bikes in ${brandAndCityCityName}`, `${brandAndCityBrandName} motorcycles Pakistan`];
  } else if (slug?.indexOf("city") > -1) {
    heading = `Used Bikes in ${cityName}`;
    title = `Used Bikes for Sale in ${cityName} | ebike.pk`;
    description = `Find used bikes and second hand motorcycles for sale in ${cityName}. Compare Honda, Yamaha, Suzuki and other brands by price and model year.`;
    keywords = [`used bikes in ${cityName}`, `second hand bikes ${cityName}`, "used motorcycles Pakistan"];
  } else if (slug?.indexOf("brand") > -1) {
    heading = `${brandName} Used Bikes`;
    title = `${brandName} Used Bikes for Sale in Pakistan | ebike.pk`;
    description = `Browse ${brandName} used bikes and motorcycles for sale in Pakistan with prices, photos, model years, city and seller details.`;
    keywords = [`${brandName} used bikes`, `${brandName} motorcycles Pakistan`, "used bikes by brand"];
  }

  const canonical = `${SITE_URL}/used-bikes/${slug}/${id}/${id1}`;

  return {
    title,
    description,
    heading,
    keywords,
    canonical,
  };
}

function getFilterRequest(params: Props["params"]) {
  const { id, slug, id1 } = params;
  const baseRequest = {
    page: 1,
    adslimit: 12,
  };

  if (slug?.indexOf("year") > -1) {
    return { ...baseRequest, years_filter: [id1] };
  }

  if (slug?.indexOf("cc") > -1) {
    return { ...baseRequest, cc: [id] };
  }

  if ((slug?.indexOf("used-bike") > -1 && slug?.indexOf("city") > -1) || slug?.indexOf("brand-and-city") > -1) {
    return { ...baseRequest, brand_filter: [id], city_filter: [id1] };
  }

  if (slug?.indexOf("city") > -1) {
    return { ...baseRequest, city_filter: [id1] };
  }

  if (slug?.indexOf("brand") > -1) {
    return { ...baseRequest, brand_filter: [id1] };
  }

  return baseRequest;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, description, keywords, canonical } = getFilterSeo(params);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
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
      title,
      description,
      url: canonical,
      siteName: "ebike.pk",
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: title
        }
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_SHARE_IMAGE],
    }
  }
}

function buildFilteredUsedBikeJsonLd(params: Props["params"], usedBikes: any) {
  const { title, description, heading, canonical } = getFilterSeo(params);
  const bikes = Array.isArray(usedBikes?.data) ? usedBikes.data.slice(0, 12) : [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "en-PK",
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        about: heading
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
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
            item: `${SITE_URL}/used-bikes`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: heading,
            item: canonical
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#itemlist`,
        name: heading,
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
          }
        })
      }
    ]
  };
}

export default async function UsedBike({ params }: Props) {
    const usedBikes = await getCustomBikeAd(getFilterRequest(params));

    return (  
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFilteredUsedBikeJsonLd(params, usedBikes)) }}
        />
        <AllUsedBikeFilter />
      </>
    )
}
