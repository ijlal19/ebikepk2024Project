import Forum_details from "@/ebikeForum/forumPages/threads_detail"
import Head from "next/head"

const threads = () => {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Threads </title>
    </Head>
    return (
        <>
            <Forum_details />
        </>
    )
}
export default threads