import Index from '@/ebikeWeb/pageLayouts/home'
import * as React from 'react';
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {

    return {
      // title: "Pakistan's Ist Exclusive Motorcycle Portal",
      title: "ebike.pk – Buy & Sell New & Used Bikes in Pakistan | Latest Bike Prices 2025",
      description: "Get Complete Details about Bikes / Motorcycles, New Bikes, Bike Parts, Used Bikes, Forum, & Motorcycle News / Videos in Pakistan. Post Ad for FREE",
      // description: "Get Complete Details about Bikes / Motorcycles, New Bikes, Bike Parts, Used Bikes, Forum, & Motorcycle News / Videos in Pakistan. Post Ad for FREE",
      openGraph: {
        title: "ebike.pk – Buy & Sell New & Used Bikes in Pakistan | Latest Bike Prices 2025",
        description: "Get Complete Details about Bikes / Motorcycles, New Bikes, Bike Parts, Used Bikes, Forum, & Motorcycle News / Videos in Pakistan. Post Ad for FREE",
      },
    }
  }

export default function Home() {
  return (
    <Index/>
  );
}