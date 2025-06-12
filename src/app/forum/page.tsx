import * as React from 'react';
import Home from '@/ebikeForum/forumPages/home';
import Header from '@/ebikeForum/forumSharedComponent/header';
import Head from 'next/head';
export default function forum() {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Forum </title>
    </Head>
    return (
        <>
            <Header />
            <Home />
        </>
    )
}