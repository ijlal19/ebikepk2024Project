import * as React from 'react';
import AboutUsComp from "@/ebikeWeb/pageLayouts/about-us/index";
import { Metadata } from 'next';
import { getPageById } from '@/ebikeWeb/functions/globalFuntions';

export async function generateMetadata(): Promise<Metadata> {
    const PageId = 14
    const getAbout_Page =await getPageById(PageId)
    return {
      title: `${getAbout_Page?.page?.meta_title}`,
      description: `${getAbout_Page?.page?.meta_description}`,
        openGraph: {
          title: `${getAbout_Page?.page?.title}`,
          description: `${getAbout_Page?.page?.meta_description}`,
        },
    }
  }

export default function AboutUs() {
    return (
        <AboutUsComp/> 
    )
}