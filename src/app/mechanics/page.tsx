import * as React from 'react';
import Mechanic  from '@/ebikeWeb/pageLayouts/mechanics';
import { Metadata } from 'next'
import Head from 'next/head';
import Script from 'next/script';
import { getAllMechanics, getFeaturedMechanics } from '@/ebikeWeb/functions/globalFuntions';

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

export default async function Mechanics() { 
    let mechanics = await getAllMechanics() 
    let featureMechincs = await getFeaturedMechanics() 
    return (
      <>
        <Mechanic 
         featuredMechanic={featureMechincs} 
         mechanic={mechanics}
        />
      </>
    )
}