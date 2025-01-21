import * as React from 'react';
import PrivacyPolicyComp from "@/ebikeWeb/pageLayouts/privacy-policy/index"
import Head from 'next/head';

export default function PrivacyPolicy() {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Privacy Policy </title>
    </Head>
    return (
        <PrivacyPolicyComp />
    )
}