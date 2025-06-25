import * as React from 'react';
import AllUsedBikeComp from "@/ebikeWeb/pageLayouts/all-used-bikes/index";
import { Metadata } from 'next'
import { getBrandFromId, getCityFromId, getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";

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

export default async function AllUsedBikes() {

  let obj = {
    adslimit: 12,
    // page: 1
  }
  let allUsedBike = await getCustomBikeAd(obj);

  let featureObject = {
    isFeatured: true,
    // random: true,
    adslimit: 20
  }
  let allFeaturedBike = await getCustomBikeAd(featureObject);

  return (
    <AllUsedBikeComp
      _allFeaturedBike={allFeaturedBike}
      _allUsedBike={allUsedBike}
    />
  )
}