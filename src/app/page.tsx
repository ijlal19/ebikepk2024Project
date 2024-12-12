import Index from '@/ebikeWeb/pageLayouts/home'
import * as React from 'react';
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {

    return {
      title: "Pakistan's Ist Exclusive Motorcycle Portal",
      description: "Get Complete Details about Bikes / Motorcycles, New Bikes, Bike Parts, Used Bikes, Forum, & Motorcycle News / Videos in Pakistan. Post Ad for FREE",
      openGraph: {
        title: "Pakistan's Ist Exclusive Motorcycle Portal",
        description: "Get Complete Details about Bikes / Motorcycles, New Bikes, Bike Parts, Used Bikes, Forum, & Motorcycle News / Videos in Pakistan. Post Ad for FREE",
      },
    }
  }

export default function Home() {
  return (
    <Index/>
  );
}