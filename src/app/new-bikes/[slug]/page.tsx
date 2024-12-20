import * as React from 'react';
import AllNewBikeComp from "@/ebikeWeb/pageLayouts/all-new-bikes/index"
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'New Bikes in Pakistan, Get Motorcycle Specs and Features | ebike.pk',
      description: 'New Bikes in Pakistan 2020. Get your self updated with new bikes and motorcycle reviews, specs, prices, featues, videos and news on ebike.pk',
      openGraph: {
        title: 'New Bikes in Pakistan, Get Motorcycle Specs and Features | ebike.pk',
        description: 'New Bikes in Pakistan 2020. Get your self updated with new bikes and motorcycle reviews, specs, prices, featues, videos and news on ebike.pk',
      },
    }
}

export default function AllNewBikes() {
    return (
        <AllNewBikeComp /> 
    )
}