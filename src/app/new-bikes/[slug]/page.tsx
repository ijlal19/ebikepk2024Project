import * as React from 'react';
import AllNewBikeComp from "@/ebikeWeb/pageLayouts/all-new-bikes/index"
import { Metadata } from 'next'
import {getnewBikeData } from '@/ebikeWeb/functions/globalFuntions';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params } : Props): Promise<Metadata> {
  const { slug } = params
  const data = await getnewBikeData({ brand: slug })

  return {
    title: data[0]?.bike_brand?.brandName?.charAt(0)?.toUpperCase() + data[0]?.bike_brand?.brandName?.slice(1) + ' New Bikes in Pakistan  | ebike.pk',
    description: data[0]?.bike_brand?.meta_description,
    openGraph: {
      title: data[0]?.bike_brand?.brandName?.charAt(0)?.toUpperCase() + data[0]?.bike_brand?.brandName?.slice(1) + ' New Bikes in Pakistan  | ebike.pk',
      description: data[0]?.bike_brand?.meta_description,
    }
  }
}

// if (data[0] && data[0].bike_brand && data[0].bike_brand.meta_title) {
//   this._seo.setMetaTitle(data[0].bike_brand.meta_title);
// }
// //  else {
// //   this._seo.setMetaTitle(data[0].bike_brand.brandName + " New bikes in Pakistan");
// // }
// if (data[0] && data[0].bike_brand && data[0].bike_brand.meta_description) {
//   this._seo.setMetaDescription(data[0].bike_brand.meta_description);
// }
// // else if (data && data[0].bike_brand.description) {
// //   this._seo.setMetaDescription(data[0].bike_brand.description.slice(0, 300));
// // }
// if (data[0] && data[0].bike_brand) {
//   this._seo.updateTitle(data[0].bike_brand.brandName.charAt(0).toUpperCase() + data[0].bike_brand.brandName.slice(1) + ' New Bikes in Pakistan  | ebike.pk');
// }

export default function AllNewBikes() {
    return (
        <AllNewBikeComp /> 
    )
}