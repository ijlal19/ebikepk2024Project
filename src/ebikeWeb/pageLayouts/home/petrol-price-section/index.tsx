import React from "react";
import styles from './index.module.scss';
import { Link, useMediaQuery } from "@mui/material";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const Petrol_Price_Section = () => {
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
                    Data?.map((e: any, i: any) => {
                        return (
                            <div className={styles.price_div} key={i} >
                                {e?.type}
                                <p className={styles.price}>{e?.price}</p>
                            </div>
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