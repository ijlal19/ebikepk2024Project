import * as React from 'react';
import AllUsedBikeComp from "@/pageLayouts/all-used-bikes/index"
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {

    return {
      title: 'Used Bikes for Sale in Pakistan | ebike.pk',
      description: 'Used bikes for sale in Pakistan. Find old model bikes and second hand motorcycles for sale in Pakistan. The best used bikes for sale in Karachi and Lahore.',
      openGraph: {
        title:  'Used Bikes for Sale in Pakistan | ebike.pk',
        description: 'Used bikes for sale in Pakistan. Find old model bikes and second hand motorcycles for sale in Pakistan. The best used bikes for sale in Karachi and Lahore.',
      },
    }
  }

export default function AboutUs() {
    return (
        <AllUsedBikeComp /> 
    )
}