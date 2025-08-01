import * as React from 'react';
import TermsCondition from "@/ebikeWeb/pageLayouts/terms-and-conditions/index"
import Head from 'next/head';
import { Metadata } from 'next';
import { getPageById } from '@/ebikeWeb/functions/globalFuntions';

export async function generateMetadata(): Promise<Metadata> {
    const PageId = 25
    const getTerm_Page =await getPageById(PageId)
    return {
      title: `${getTerm_Page?.page?.meta_title || getTerm_Page?.page?.title}`,
      description: `${getTerm_Page?.page?.meta_description}`,
        openGraph: {
          title: `${getTerm_Page?.page?.title}`,
          description: `${getTerm_Page?.page?.meta_description}`,
        },
    }
  }

export default function Profile() {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Terms and Conditions </title>
    </Head>
    return (
        <TermsCondition/>
    )
}