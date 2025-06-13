'use client'
import { New_bike_card, Used_bike_card } from "@/ebike-panel/ebike-panel-sharedComponent/all-bikes-card"
import Panel_header from "@/ebike-panel/ebike-panel-sharedComponent/panel-header"
import { useParams } from "next/navigation"
import styles from './index.module.scss';
import AddNewBikeForm from "@/ebike-panel/ebike-panel-sharedComponent/Add-new-bike";

const Dashboard_page = () => {
    const { slug } = useParams()

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
    }

    return (
        <div className={styles.main}>
            <Panel_header />
            {SetComponent(slug)}
        </div>
    )
}
export default Dashboard_page