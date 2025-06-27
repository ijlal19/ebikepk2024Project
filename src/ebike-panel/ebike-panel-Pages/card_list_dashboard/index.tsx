'use client'
import { Blog_Card, New_bike_card, Used_bike_card } from "@/ebike-panel/ebike-panel-sharedComponent/all-bikes-card"
import { AddNewBikeForm, AddBlogForm } from "@/ebike-panel/ebike-panel-sharedComponent/Add-new-forms";
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import Panel_header from "@/ebike-panel/ebike-panel-sharedComponent/panel-header";
import { useParams, useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useEffect } from "react";

const Dashboard_page = () => {

    const { slug } = useParams()
    const router = useRouter()
        const pathname = window.location.pathname

    useEffect(() => {
        checkAuthAndRedirect(router , pathname)
    }, [])

    const SetComponent = (route: any) => {
        if (route == "view-classified-ads") {
            // return <div className={styles.card_section}> <Used_bike_card /> </div>
            return <Used_bike_card />
        }
        else if (route == 'all-new-bikes') {
            // return <div className={styles.card_section}><New_bike_card /></div>
            return <New_bike_card />
        }
        else if (route == "add-new-bike") {
            return <AddNewBikeForm />
        }
        else if (route == "blog-list") {
            return <Blog_Card />
        }
        else if (route == "create-blog-post") {
            return <AddBlogForm />
        }
    }

    return (
        <div className={styles.main}>
            {/* <Panel_header /> */}
            {SetComponent(slug)}
        </div>
    )
}
export default Dashboard_page