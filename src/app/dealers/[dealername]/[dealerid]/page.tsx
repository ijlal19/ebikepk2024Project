import * as React from 'react';
import DealerDetails from '@/ebikeWeb/pageLayouts/dealer-details/index'; 
import { Metadata } from 'next'
import {  capitalizeFirstWord } from "@/genericFunctions/geneFunc"
import { getSingleDealerDetails } from "@/ebikeWeb/functions/globalFuntions"
import Head from 'next/head';
import Script from 'next/script';

type Props = {
    params: { dealerid: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { dealerid } = params
    const data = await getSingleDealerDetails(dealerid)
    return {
      title: capitalizeFirstWord(data?.shop_name) +' | '+ capitalizeFirstWord(data?.bike_brand?.brandName) + " Bike Dealer in " + data?.city?.city_name + " | ebike.pk",
      description: data.bike_brand && capitalizeFirstWord(data.bike_brand.brandName) + " Bike Dealer in " + capitalizeFirstWord(data.city.city_name) + " | " + data.address + " | ebike.pk",
      openGraph: {
        title: capitalizeFirstWord(data?.shop_name) +' | '+ capitalizeFirstWord(data?.bike_brand?.brandName) + " Bike Dealer in " + capitalizeFirstWord(data?.city?.city_name) + " | ebike.pk",
        description: data?.bike_brand && data?.bike_brand?.brandName + " Bike Dealer in " + data?.city?.city_name + " | " + data?.address + " | ebike.pk",
        images: [ data?.bike_brand?.logoUrl],
      },
    }
  }

export default function DealersDetails() { 
    return (
      <> 
        <DealerDetails/>
      </>  
    )
}