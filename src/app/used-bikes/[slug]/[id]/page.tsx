import * as React from 'react';
import UsedBikeCompDetail from "@/ebikeWeb/pageLayouts/used-bike/index"
import Head  from 'next/head';
import { Metadata } from 'next'
import { getSinglebikesDetail, getCityFromId } from "@/ebikeWeb/functions/globalFuntions"
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData"

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    const product = await getSinglebikesDetail(id)

    return {
      title: product?.add?.title + ' for sale in '+ getCityFromId(product?.add?.cityId, CityArr)  + ' | ebike.pk',
      description: product?.add?.description,
      openGraph: {
        title:  product?.add?.title,
        description: product?.add?.description,
        images: [product?.add?.images[0]],
      },
    }
  }
  

export default function UsedBike() {
    return (  
      <UsedBikeCompDetail />
    )
}