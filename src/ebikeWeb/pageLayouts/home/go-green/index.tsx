import React from "react";
import styles from './index.module.scss';
import { Link } from "@mui/material";

const GoGreen = () => {

    return (
        <div className={styles.main}>
            <div className={styles.container}>
            <div className={styles.box1}>
                <img src="https://imgd.aeplcdn.com/0x0/cw/fuel/svg/electric.svg" alt="image" className={styles.image} />
                <div className={styles.text_box}>
                    <p className={styles.text1}>Go Green, Go Electric.</p>
                    <p className={styles.text2}>40+ electric bikes and scooters</p>
                </div>
            </div>
            <div className={styles.box2}>
                <Link href={'/new-bikes?tab=2'} className={styles.btn}>Electric Bike</Link>
                <Link href={'/new-bikes?tab=2'} className={styles.btn}>Electric Scooter</Link>
            </div>
            </div>
        </div>
    )
}
export default GoGreen;