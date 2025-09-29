import * as React from 'react';
import Dealer from '@/ebikeWeb/pageLayouts/dealers/index';
import { Metadata } from 'next'
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'New Bike Showroom / Dealer in Pakistan | ebike.pk',
    description: 'New bike showroom or motorcycle dealers in Pakistan. Get complete details of motorcycle dealers in Pakistan or searching information about the best ones is just a one click procedure on ebike.pk.',
    openGraph: {
      title: 'New Bike Showroom / Dealer in Pakistan | ebike.pk',
      description: 'New bike showroom or motorcycle dealers in Pakistan. Get complete details of motorcycle dealers in Pakistan or searching information about the best ones is just a one click procedure on ebike.pk.',
    },
  }
}

export default async function Dealers() {

  let dealer = await getAllDealer()
  let featuredDelaer = await getFeaturedDealer()

  let approvedDealers = dealer?.filter((d: any) => d.is_approved === true);

  return (
    <>
      <Dealer
        featuredDelaer={featuredDelaer}
        delaer={approvedDealers}
      />
    </>
  )
}