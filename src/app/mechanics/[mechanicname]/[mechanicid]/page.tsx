import * as React from 'react';
import MechanicsDetails from '@/ebikeWeb/pageLayouts/mechanic-details';
import { Metadata } from 'next'
import { getSimilarMechanics, getSingleMechanicsDetails } from '@/ebikeWeb/functions/globalFuntions';

type Props = {
    params: { mechanicid: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mechanicid } = params
    const data = await getSimilarMechanics(mechanicid)
    return {
      title: data?.shop_name +' | '+ data?.bike_brand?.brandName + " Bike Mechanic in " + data?.city?.city_name + " | ebike.pk",
      description: data?.bike_brand && data?.bike_brand?.brandName + " Bike Dealer in " + data?.city?.city_name + " | " + data?.address + " | ebike.pk",
      openGraph: {
        title: data?.shop_name +' | '+ data?.bike_brand?.brandName + " Bike Mechanic in " + data?.city?.city_name + " | ebike.pk",
        description: data?.bike_brand && data?.bike_brand?.brandName + " Bike Dealer in " + data?.city?.city_name + " | " + data?.address + " | ebike.pk",
      },
    }
  }

export default function MechanicDetails() { 
    return (
        <MechanicsDetails/>
    )
}