import Index from '@/ebikeWeb/pageLayouts/home'
import * as React from 'react';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "ebike.pk – Buy & Sell New & Used Bikes in Pakistan | Latest Bike Prices 2025",
  description: "Get Complete Details about Bikes / Motorcycles, New Bikes, Bike Parts, Used Bikes, Forum, & Motorcycle News / Videos in Pakistan. Post Ad for FREE",

  openGraph: {
    title: "ebike.pk – Buy & Sell New & Used Bikes in Pakistan | Latest Bike Prices 2025",
    description: "Get Complete Details about Bikes / Motorcycles, New Bikes, Bike Parts, Used Bikes, Forum, & Motorcycle News / Videos in Pakistan. Post Ad for FREE",
    url: "https://www.ebike.pk/",
    siteName: "ebike.pk",
    type: "website",
  },

  alternates: {
    canonical: "https://www.ebike.pk/",
  }
};

export default function Home() {
  return (
    <Index/>
  );
}