'use client'
import { checkAuthAndRedirect, getbrandData } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { Used_bike_card } from "@/ebike-panel/ebike-panel-sharedComponent/all-panel-cards";
import { useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useEffect } from "react";
import React from "react";

const Main_DashBoard = () => {
    const router = useRouter()
    useEffect(() => {
        fetchAllBrand()
        checkAuthAndRedirect(router, '/ebike-panel/dashboard')
    }, []);

    const fetchAllBrand = async () => {
        const res = await getbrandData()
    }

    return (
        <div className={styles.main}>
            <Used_bike_card />
        </div>
    )
}

export default Main_DashBoard;