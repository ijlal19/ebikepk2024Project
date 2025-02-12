import * as React from 'react';
import MechanicsDetails from '@/ebikeWeb/pageLayouts/mechanic-details';
import { Metadata } from 'next'
import { getSimilarMechanics, getSingleMechanicsDetails, capitalizeFirstWord } from '@/ebikeWeb/functions/globalFuntions';
import Head from 'next/head';
import Script from 'next/script';

type Props = {
    params: { mechanicid: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mechanicid } = params
    const data = await getSimilarMechanics(mechanicid)
    return {
      title: capitalizeFirstWord(data?.shop_name) +' | '+ capitalizeFirstWord(data?.bike_brand?.brandName) + " Bike Mechanic in " + capitalizeFirstWord(data?.city?.city_name) + " | ebike.pk",
      description: data?.bike_brand && capitalizeFirstWord(data?.bike_brand?.brandName) + " Bike Dealer in " + capitalizeFirstWord(data?.city?.city_name) + " | " + data?.address + " | ebike.pk",
      openGraph: {
        title:  capitalizeFirstWord(data?.shop_name) +' | '+ capitalizeFirstWord(data?.bike_brand?.brandName) + " Bike Mechanic in " + capitalizeFirstWord(data?.city?.city_name) + " | ebike.pk",
        description: data?.bike_brand && capitalizeFirstWord(data?.bike_brand?.brandName) + " Bike Dealer in " + capitalizeFirstWord(data?.city?.city_name) + " | " + data?.address + " | ebike.pk",
      },
    }
  }

export default function MechanicDetails() { 
    return (
      <>

      {/* <link
        rel="preload"
        href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
        as="script"
        crossOrigin="anonymous" // Add this
      /> */}
        
          <Script
            strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
            crossOrigin="anonymous"
          ></Script>
        
        <MechanicsDetails/>
        </>
    )
}