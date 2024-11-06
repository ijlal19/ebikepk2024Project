import * as React from 'react';
import UsedBikeCompDetail from "@/pageLayouts/used-bike/index"
import Head  from 'next/head';
import { Metadata } from 'next'
import { getSinglebikesDetail, getCityFromId } from "@/functions/globalFuntions"
import { CityArr, BrandArr, YearArr } from "@/constants/globalData"

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    
    console.log('usedId', id)
    const product = await getSinglebikesDetail(id)
    console.log('usedId', product)

    return {
      title: product?.add?.title + ' for sale in '+ getCityFromId(product?.add?.cityId, CityArr)  + ' | ebike.pk',
      description: product?.add?.description,
      openGraph: {
        title:  product?.add?.title,
        images: [product?.add?.images[0]],
      },
    }
  }
  

export default function UsedBike() {
    
    return (
        <>
        <Head>
            <></>
            {/* <meta property="og:image" content={Gconfig.productImageUrl + productInfo?.images[0]?.product_image_url + "?profile=b"} />
            <title>{page_title}</title>
            <meta name="description" content={"Shop the " + (productInfo.vendor.toLowerCase() != "fashionpass" ? productInfo.vendor : '') + " " + titleCaptilize + (productInfo.external_color != null ? ' in ' + colorCaptilize : '')}></meta>
            <script type="application/ld+json">{JSON.stringify(productScript)}</script> */}
        </Head>
        <UsedBikeCompDetail />
        </>
    )
}