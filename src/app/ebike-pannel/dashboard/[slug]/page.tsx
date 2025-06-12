import Dashboard_page from "@/ebike-pannel/ebike-pannel-Pages/card_list_dashboard"
import SideBar from "@/ebike-pannel/ebike-pannel-sharedComponent/SideBar"
import Head from "next/head"

const Dashboard_slug = () => {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Ebike Panel Dashboard </title>
    </Head>
    return (
        <div style={{ display: 'flex' }}>
            <SideBar />
            <Dashboard_page />
        </div>
    )
}
export default Dashboard_slug