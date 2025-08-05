'use client'
import React from "react";
import { useEffect } from "react";
import styles from './index.module.scss';
import { Used_bike_card } from "@/ebike-panel/ebike-panel-sharedComponent/all-panel-cards";
import { useRouter } from "next/navigation";
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";

const Main_DashBoard = () => {
    const router = useRouter()
    useEffect(() => {
        checkAuthAndRedirect(router , '/ebike-panel/dashboard' )
    }, []);
    return (
        <div className={styles.main}>
            {/* {
                !IsLoading ? */}
                            <Used_bike_card />
                            {/* : */}
                    {/* <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={IsLoading} />
                        </div>
                    </div>} */}
        </div>
    )
}

export default Main_DashBoard