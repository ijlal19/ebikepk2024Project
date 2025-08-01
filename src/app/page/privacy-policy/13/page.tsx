import * as React from 'react';
import PrivacyPolicyComp from "@/ebikeWeb/pageLayouts/privacy-policy/index"
import Head from 'next/head';
import { Metadata } from 'next';
import { getPageById } from '@/ebike-panel/ebike-panel-Function/globalfunction';

export async function generateMetadata(): Promise<Metadata> {
    const PageId = 13
    const getprivacy_policy_Page =await getPageById(PageId)
    return {
      title: `${getprivacy_policy_Page?.page?.meta_title || getprivacy_policy_Page?.page?.title}`,
      description: `${getprivacy_policy_Page?.page?.meta_description}`,
        openGraph: {
          title: `${getprivacy_policy_Page?.page?.title}`,
          description: `${getprivacy_policy_Page?.page?.meta_description}`,
        },
    }
  }


export default function PrivacyPolicy() {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Privacy Policy </title>
    </Head>
    return (
        <PrivacyPolicyComp />
    )
}