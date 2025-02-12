import * as React from 'react';
import Dealer from '@/ebikeWeb/pageLayouts/dealers/index';
import { Metadata } from 'next'
import Head from 'next/head';
import Script from 'next/script';

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

export default function Dealers() { 
    return (
      <>
        <link
          rel="preload"
          href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
          as="script"
          crossOrigin="anonymous" // Add this
        />
        <Script
         strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
          crossOrigin="anonymous"
        ></Script>
      
        <Dealer/>
        </>
    )
}