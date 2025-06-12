import Forum_details from "@/ebikeForum/forumPages/threads_detail"
import Home from "@/ebikeForum/forumPages/threads"
import Header from "@/ebikeForum/forumSharedComponent/header"
import Allforums from "@/ebikeForum/forumPages/threads"
import Head from "next/head"

const forums_details = () => {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Forum Detail </title>
    </Head>
    return (
        <>
            <Header />
            <Allforums />
        </>
    )
}

export default forums_details