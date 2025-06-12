'use client'
import { New_bike_card, Used_bike_card } from "@/ebike-pannel/ebike-pannel-sharedComponent/all-bikes-card"
import Panel_header from "@/ebike-pannel/ebike-pannel-sharedComponent/panel-header"
import { useParams } from "next/navigation"
import styles from './index.module.scss';

const Dashboard_page = () => {
    const { slug } = useParams()

    const SetComponent = (route: any) => {
        if (route == "view-classified-ads") {
            return <div className={styles.card_section}><Used_bike_card /></div>
        }
        else if(route == 'all-new-bikes') {
            return <div className={styles.card_section}><New_bike_card /></div>
        }
        // else if (route == "edit")
    }

    return (
        <div className={styles.main}>
            <Panel_header />
            {SetComponent(slug)}
        </div>
    )
}
export default Dashboard_page