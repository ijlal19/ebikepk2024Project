import Main_DashBoard from "@/ebike-panel/ebike-panel-Pages/main_dashboard";
import * as React from 'react';
import Head from "next/head";

const MainDashBoard   = ()  =>{
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Ebike Panel Dashboard </title>
    </Head>
    return (
        <div  >
            {/* <SideBar /> */}
            <Main_DashBoard />
        </div>
    )
}
export default MainDashBoard