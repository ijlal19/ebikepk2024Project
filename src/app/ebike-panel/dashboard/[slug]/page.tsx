import Dashboard_page from "@/ebike-panel/ebike-panel-Pages/card_list_dashboard"
import SideBar from "@/ebike-panel/ebike-panel-sharedComponent/SideBar"
import Head from "next/head"

const Dashboard_slug = () => {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Ebike Panel Dashboard </title>
    </Head>
    return (
        <div>
            {/* <SideBar /> */}
            <Dashboard_page />
        </div>
    )
}
export default Dashboard_slug