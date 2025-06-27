import EbikePanel from "@/ebike-panel/ebike-panel-sharedComponent/ebike-panel-select-route"
import Head from "next/head"
import * as React from 'react';


const ebike_panel_main = ()=>{
     <Head>
            <meta name="robots" content="noindex, nofollow" />
            <title> Ebike Panel</title>
        </Head>
    return(
        <EbikePanel />
    )
}
export default ebike_panel_main