import * as React from 'react';
import Dealer from '@/ebikeWeb/pageLayouts/dealers/index';
import { Metadata } from 'next'
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions";
import Head from 'next/head';

export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'New Bike Showroom / Dealer in Pakistan | ebike.pk',
      description: 'New bike showroom or motorcycle dealers in Pakistan. Get complete details of motorcycle dealers in Pakistan or searching information about the best ones is just a one click procedure on ebike.pk.',
      openGraph: {
        title:  'New Bike Showroom / Dealer in Pakistan | ebike.pk',
        description: 'New bike showroom or motorcycle dealers in Pakistan. Get complete details of motorcycle dealers in Pakistan or searching information about the best ones is just a one click procedure on ebike.pk.',
      },
    }
  }

export default async function Dealers() { 
  <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Dealers </title>
    </Head>
  let delaer = await getAllDealer() 
  let featuredDelaer = await getFeaturedDealer() 

  return (
      <>
        <Dealer 
          featuredDelaer={featuredDelaer} 
          delaer={delaer}
        />
      </>
    )
}