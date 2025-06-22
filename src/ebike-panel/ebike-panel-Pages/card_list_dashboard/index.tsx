'use client'
import { Blog_Card, New_bike_card, Used_bike_card } from "@/ebike-panel/ebike-panel-sharedComponent/all-bikes-card"
import Panel_header from "@/ebike-panel/ebike-panel-sharedComponent/panel-header"
import { useParams, useRouter } from "next/navigation"
import styles from './index.module.scss';
import {AddNewBikeForm , AddBogForm} from "@/ebike-panel/ebike-panel-sharedComponent/Add-new-bike";
import { useEffect } from "react";
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";

const Dashboard_page = () => {
    const { slug } = useParams()
    const router = useRouter()
    useEffect(()=>{
        checkAuthAndRedirect(router)
    },[])

    const SetComponent = (route: any) => {
        if (route == "view-classified-ads") {
            return <div className={styles.card_section}><Used_bike_card /></div>
        }
        else if(route == 'all-new-bikes') {
            return <div className={styles.card_section}><New_bike_card /></div>
        }
        else if (route  == "add-new-bike"){
            return <div className={styles.card_section}><AddNewBikeForm /></div>
        }
        else if (route  == "blog-list"){
            return <div className={styles.card_section}><Blog_Card /></div>
        }
        // else if (route  == "create-blog-post"){
        //     return <div className={styles.card_section}><AddBogForm /></div>
        // }
    }

    return (
        <div className={styles.main}>
            <Panel_header />
            {SetComponent(slug)}
        </div>
    )
}
export default Dashboard_page