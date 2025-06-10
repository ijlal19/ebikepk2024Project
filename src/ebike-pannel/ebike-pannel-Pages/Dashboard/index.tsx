'use client'
import { getBrandFromId, getCityFromId, getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";
import { BrandArr, CityArr } from "@/ebikeWeb/constants/globalData";
import { priceWithCommas } from "@/genericFunctions/geneFunc";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './index.module.scss';
import { Used_bike_card } from "@/ebike-pannel/ebike-pannel-sharedComponent/all-bikes-card";
import Pannel_header from "@/ebike-pannel/ebike-pannel-sharedComponent/pannel-header";

const Main_DashBoard = () => {
    const [IsLoading, setIsLoading] = useState(false);

    return (
        <div className={styles.main}>
            <Pannel_header />
            {
                !IsLoading ?
                    <div>
                        <div className={styles.card_section} >
                            <Used_bike_card />
                        </div>
                    </div> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={IsLoading} />
                        </div>
                    </div>}
        </div>
    )
}

export default Main_DashBoard