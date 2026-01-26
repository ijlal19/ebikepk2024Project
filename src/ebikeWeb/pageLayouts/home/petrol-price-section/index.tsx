'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { Link, useMediaQuery } from "@mui/material";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { GetAllSetting } from "@/ebike-panel/ebike-panel-Function/globalfunction";

const Petrol_Price_Section = () => {
    const [settingData, setSettingData] = useState<any>([]);
    const isMobile = useMediaQuery("(max-width:768px)");

    const Data = [
        {
            type: "Petrol (Super)",
            price: "PKR 253.17"
        },
        {
            type: "Hi Speed Diesel",
            price: "PKR 257.08"
        }
    ]

    useEffect(() => {
        fetchAllSetting()
    }, [])

    const fetchAllSetting = async () => {
        const res = await GetAllSetting(
        )
        if (res && res?.data) {
            setSettingData(res?.data)
        }
        console.log("test", res)
    }

    return (
        <div className={styles.main} style={{ display: isMobile ? "flex" : "none" }}>
            <div className={styles.container}>
                <div className={styles.heading_div}>
                    <div className={styles.heading}>
                        <button className={styles.icon} ><LocalGasStationIcon /></button>
                        <p className={styles.text}>Current Fuel Prices</p>
                    </div>
                </div>
                <div className={styles.type_div}>
                    Type <span>Price Per Liter</span>
                </div>
                {
                    settingData?.map((e: any, i: any) => {
                        if (e?.name !== "petrol_price_key") return

                        let prices: { petrol?: number; diesel?: number } = {};

                        try {
                            prices = typeof e.value === "string" ? JSON.parse(e.value) : e.value;
                        } catch (err) {
                            console.error("Invalid JSON", err);
                            return null;
                        }

                        return (
                            <>
                                <div className={styles.price_div} key={i} >
                                    Petrol {e?.value?.JSON?.petrol}
                                    <p className={styles.price}>Rs {prices.petrol}</p>
                                </div>
                                <div className={styles.price_div}  >
                                    Diesel {e?.value?.JSON?.petrol}
                                    <p className={styles.price}>Rs {prices.diesel}</p>
                                </div>
                            </>
                        )
                    })
                }
                <div className={styles.powerd_div}>
                    Powered By: <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1734597859/ebike_icon_design-16-Dec2024_ke1dfi.png" alt="ebiek.pk" className={styles.image} />
                </div>
            </div>
        </div>
    )
}

export default Petrol_Price_Section;