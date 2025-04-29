import * as React from 'react';
import NewBikeDetailsComp from "@/ebikeWeb/pageLayouts/new-bike-detail/index"
import { Metadata } from 'next'
import {getnewBikedetailsData } from '@/ebikeWeb/functions/globalFuntions';

type Props = {
  params: { slug3: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug3 } = params;
  const responsedetails: any = await getnewBikedetailsData(slug3);

  const metaTitle = responsedetails?.length > 0 ? responsedetails[0]?.bike?.meta_title : "";
  const metaDescription = responsedetails?.length > 0 ? responsedetails[0]?.bike?.meta_description : "";

  return {
    title: metaTitle ? `${metaTitle} | ebike.pk` : "ebike.pk",
    description: metaDescription ? `${metaDescription} | ebike.pk` : "New Bikes for sale in pakistan | ebike.pk",
    openGraph: {
      title: metaTitle ? `${metaTitle} | ebike.pk` : "ebike.pk",
      description: metaDescription ? `${metaDescription} | ebike.pk` : "New Bikes for sale in pakistan | ebike.pk",
    },
  };
}



// ⭐ Notice we added { params } here
export default async function NewBikeDetail({ params }: Props) {
  const { slug3 } = params;
  const responsedetails: any = await getnewBikedetailsData(slug3);

  return (
    <NewBikeDetailsComp _responsedetails={responsedetails} />
  );
}
