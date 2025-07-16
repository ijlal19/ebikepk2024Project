import * as React from 'react';
import BikePriceComp from '@/ebikeWeb/pageLayouts/new-bikes-price/index';
import { Metadata } from 'next';
import { getBrandFromId } from '@/ebikeWeb/functions/globalFuntions';
import { BrandArr } from '@/ebikeWeb/constants/globalData';


type Props = {
    params: { brand: string }
}

let BrandName = ''
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { brand } = params
    const Id = brand
    const getBrandName = getBrandFromId(Id , BrandArr)
    BrandName  = getBrandName[0].brandName

    return {
      title: `${BrandName.charAt(0).toUpperCase()+BrandName.slice(1)} Bike Price in Pakistan 2025`,
      description: `${BrandName} Bike Price in Pakistan 2025. Find ${BrandName} Latest Motocycle Prices on ebike.pk`,
        openGraph: {
          title: `${BrandName.charAt(0).toUpperCase()+BrandName.slice(1)} Bike Price in Pakistan 2025`,
          description: `${BrandName} Bike Price in Pakistan 2025. Find ${BrandName} Latest Motocycle Prices on ebike.pk`,
        },
    }
  }



export default function AboutUs() {
    return (
        <BikePriceComp /> 
    )
}