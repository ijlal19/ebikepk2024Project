import * as React from 'react';
import DealerDetails from '@/ebikeWeb/pageLayouts/dealer-details/index'; 
import { Metadata } from 'next'
import { getSingleDealerDetails } from "@/ebikeWeb/functions/globalFuntions"

type Props = {
    params: { dealerid: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { dealerid } = params
    const data = await getSingleDealerDetails(dealerid)
    return {
      title: data?.shop_name +' | '+ data?.bike_brand?.brandName + " Bike Dealer in " + data?.city?.city_name + " | ebike.pk",
      description: data.bike_brand && data.bike_brand.brandName + " Bike Dealer in " + data.city.city_name + " | " + data.address + " | ebike.pk",
      openGraph: {
        title: data?.shop_name +' | '+ data?.bike_brand?.brandName + " Bike Dealer in " + data?.city?.city_name + " | ebike.pk",
        description: data?.bike_brand && data?.bike_brand?.brandName + " Bike Dealer in " + data?.city?.city_name + " | " + data?.address + " | ebike.pk",
        images: [ data?.bike_brand?.logoUrl],
      },
    }
  }

export default function DealersDetails() { 
    return (
        <DealerDetails/>
    )
}