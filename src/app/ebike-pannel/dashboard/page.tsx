import Main_DashBoard from "@/ebike-pannel/ebike-pannel-Pages/main_dashboard";
import SideBar from "@/ebike-pannel/ebike-pannel-sharedComponent/SideBar";
import Head from "next/head";

const DashBoard = () => {
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Ebike Panel Dashboard </title>
    </Head>
    return (
        <div style={{ display: 'flex' }}>
            <SideBar />
            <Main_DashBoard />
        </div>
    )
}
export default DashBoard