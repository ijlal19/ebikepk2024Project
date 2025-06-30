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
    const city = getCityFromId(product?.add?.cityId, CityArr); 
    const cityName = city && city?.length > 0 ?  city[0].city_name : ""
    return {
      title: product?.add?.title + ' for sale in '+  cityName + ' | ebike.pk',
      description: product?.add?.description,
      openGraph: {
        title:  product?.add?.title,
        description: product?.add?.description,
        images: [product?.add?.images[0]],
      },
    }
  }


export default async function UsedBike({ params }: Props) {
    const { id } = params
    const bikeDetail = await getSinglebikesDetail(id)
    return (  
      <UsedBikeCompDetail _bikeDetail={bikeDetail} />
    )
}