import * as React from 'react';
import NewBikeDetailsComp from "@/ebikeWeb/pageLayouts/new-bike-detail/index"
import { Metadata } from 'next'
import {getnewBikedetailsData } from '@/ebikeWeb/functions/globalFuntions';

type Props = {
  params: { slug3: string }
}

export async function generateMetadata({ params } : Props): Promise<Metadata> {
  const { slug3 } = params
  const responsedetails:any = await getnewBikedetailsData(slug3)

  return {
    title:  responsedetails?.length > 0 ? responsedetails[0].bike?.meta_title + ' | ebike.pk' : "",
    description: responsedetails?.length > 0 ? responsedetails[0]?.bike?.meta_description + ' | ebike.pk' : "",
    openGraph: {
        title:  responsedetails?.length > 0 ? responsedetails.bike?.meta_title + ' | ebike.pk' : "",
        description: responsedetails?.length > 0 ? responsedetails?.bike?.meta_description + ' | ebike.pk' : "",
    }
  }
}


export default function NewBikeDetail() {
    return (
        <NewBikeDetailsComp /> 
    )
}