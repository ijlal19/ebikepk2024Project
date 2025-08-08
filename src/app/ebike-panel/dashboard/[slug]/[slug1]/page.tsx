import DashBoard_form from "@/ebike-panel/ebike-panel-Pages/dashboard_form"
import SideBar from "@/ebike-panel/ebike-panel-sharedComponent/SideBar"
import Head from "next/head"


const Dashborad = () => {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Ebike Panel Edit </title>
    </Head>
    return (
        <div >
            {/* <SideBar /> */}
            <DashBoard_form />
        </div>
    )
}
export default Dashborad