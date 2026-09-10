import * as React from 'react';
import UsedBikeCompDetail from "@/ebikeWeb/pageLayouts/used-bike/index"
import { Metadata } from 'next'
import { getSinglebikesDetail, getCityFromId, getBrandFromId, getYearFromId } from "@/ebikeWeb/functions/globalFuntions"
import { BrandArr, CityArr, YearArr } from "@/ebikeWeb/constants/globalData"
import { resolveClassifiedShareImage, SITE_URL, stripHtml, trimText } from '@/app/metadata-utils';

type Props = {
    params: { slug: string, id: string }
}

export const dynamic = "force-dynamic";

function getDetailSeo(product: any, params: Props["params"]) {
    const add = product?.add;
    const city = getCityFromId(add?.cityId, CityArr);
    const brand = getBrandFromId(add?.brandId, BrandArr);
    const year = getYearFromId(add?.yearId, YearArr);
    const cityName = city && city?.length > 0 ? city[0].city_name : "";
    const brandName = brand && brand?.length > 0 ? brand[0].brandName?.replaceAll("_", " ") : "";
    const yearName = year && year?.length > 0 ? year[0].year : "";
    const titleParts = [
        add?.title || "Used Bike",
        cityName ? `for Sale in ${cityName}` : "for Sale in Pakistan"
    ];
    const metaTitle = add?.meta_title?.trim();
    const title = metaTitle || `${titleParts.join(" ")} | ebike.pk`;
    const fallbackDescription = [
        add?.title,
        brandName ? `${brandName} motorcycle` : "used motorcycle",
        yearName ? `${yearName} model` : "",
        add?.cc ? `${add.cc}cc` : "",
        cityName ? `available in ${cityName}` : "available in Pakistan",
        add?.price ? `for PKR ${add.price}` : ""
    ].filter(Boolean).join(", ");
    const description = trimText(add?.description || fallbackDescription, 165);
    const image = resolveClassifiedShareImage(add?.images);
    const url = `${SITE_URL}/used-bikes/${params.slug}/${params.id}`;

    return {
        add,
        cityName,
        brandName,
        yearName,
        title,
        description,
        image,
        url,
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getSinglebikesDetail(params.id)
    const { add, cityName, brandName, title, description, image, url } = getDetailSeo(product, params);

    return {
      title,
      description,
      keywords: [
        add?.title,
        brandName ? `${brandName} used bike` : "",
        cityName ? `used bikes in ${cityName}` : "used bikes in Pakistan",
        "second hand motorcycle",
        "used motorcycle for sale Pakistan"
      ].filter(Boolean) as string[],
      alternates: {
        canonical: url
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
        url,
        siteName: "ebike.pk",
        type: "article",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: product?.add?.title || "Used Bike Ad"
          }
        ],
        locale: "en_PK",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image]
      }
    }
  }

function buildUsedBikeDetailJsonLd(product: any, params: Props["params"]) {
    const { add, cityName, brandName, yearName, title, description, image, url } = getDetailSeo(product, params);
    const price = Number(add?.price);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                url,
                name: add?.title || "Used Bike",
                description: stripHtml(description),
                inLanguage: "en-PK",
                isPartOf: {
                    "@id": `${SITE_URL}/#website`
                },
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: image
                },
                about: {
                    "@type": "Thing",
                    name: add?.title || "Used bike classified ad",
                    description: [
                        brandName ? `${brandName} used motorcycle` : "Used motorcycle",
                        yearName ? `${yearName} model` : "",
                        add?.cc ? `${add.cc}cc` : "",
                        cityName ? `available in ${cityName}` : "available in Pakistan",
                        Number.isFinite(price) && price > 0 ? `asking price PKR ${price}` : ""
                    ].filter(Boolean).join(", "),
                    image,
                    additionalProperty: [
                        add?.id ? { "@type": "PropertyValue", name: "Classified ad ID", value: String(add.id) } : null,
                        yearName ? { "@type": "PropertyValue", name: "Model year", value: String(yearName) } : null,
                        add?.cc ? { "@type": "PropertyValue", name: "Engine capacity", value: `${add.cc}cc` } : null,
                        cityName ? { "@type": "PropertyValue", name: "City", value: cityName } : null,
                        brandName ? { "@type": "PropertyValue", name: "Brand", value: brandName } : null,
                        add?.sellerName ? { "@type": "PropertyValue", name: "Seller", value: add.sellerName } : null
                    ].filter(Boolean)
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
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
                        name: add?.title || title,
                        item: url
                    }
                ]
            }
        ]
    };
}


export default async function UsedBike({ params }: Props) {
    const { id } = params
    const bikeDetail = await getSinglebikesDetail(id)
    return (  
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildUsedBikeDetailJsonLd(bikeDetail, params)) }}
        />
        <UsedBikeCompDetail _bikeDetail={bikeDetail} />
      </>
    )
}
