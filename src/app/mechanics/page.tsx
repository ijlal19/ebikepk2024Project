import * as React from 'react';
import Mechanic  from '@/ebikeWeb/pageLayouts/mechanics';
import { Metadata } from 'next'
import Head from 'next/head';

export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'Motorcycle Workshop / Bike Mechanic in Pakistan | ebike.pk',
      description: 'Motorcycle Workshop or Motorbike mechanic in Pakistan. Get complete details of motorcycle workshop in Pakistan is just a one click procedure on ebike.pk.',
      openGraph: {
        title: 'Motorcycle Workshop / Bike Mechanic in Pakistan | ebike.pk',
        description: 'Motorcycle Workshop or Motorbike mechanic in Pakistan. Get complete details of motorcycle workshop in Pakistan is just a one click procedure on ebike.pk.',
      },
    }
}
export default function Mechanics() { 
    return (
      <>
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <Mechanic/>
      </>
    )
}