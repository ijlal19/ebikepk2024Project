'use client'
import { AllPages_Card, Blog_Card, Dealer_Card, Mechanic_Card, New_bike_card, Used_bike_card } from "@/ebike-panel/ebike-panel-sharedComponent/all-panel-cards"
import { AddNewBikeForm, AddBlogForm, AddNewElectricBikeForm, AddPageForm } from "@/ebike-panel/ebike-panel-sharedComponent/Add-new-forms";
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { useParams, useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useEffect } from "react";

const Dashboard_page = () => {

    const { slug } = useParams()
    const router = useRouter()
    
    useEffect(() => {
        const pathname = window.location.pathname
        checkAuthAndRedirect(router , pathname)
    }, [])

    const SetComponent = (route: any) => {
        if (route == "view-classified-ads") {
            return <Used_bike_card />
        }
        else if (route == 'all-new-bikes') {
            return <New_bike_card />
        }
        else if (route == "add-new-bike") {
            return <AddNewBikeForm />
        }
        else if (route == "add-electric-bike") {
            return <AddNewElectricBikeForm />
        }
        else if (route == "blog-list") {
            return <Blog_Card />
        }
        else if (route == "create-blog-post") {
            return <AddBlogForm />
        }
        else if (route == "all-dealers") {
            return <Dealer_Card />
        }
        else if (route == "all-mechanics") {
            return <Mechanic_Card />
        }
        else if(route == "all-pages"){
            return <AllPages_Card />
        }
        else if(route == "add-new-page"){
            return <AddPageForm />
        }
    }

    return (
        <div className={styles.main}>
            {SetComponent(slug)}
        </div>
    )
}
export default Dashboard_page