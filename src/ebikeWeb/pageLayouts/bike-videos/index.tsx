'use client';
import React from "react";
import styles from './index.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import Data from "./data";
import { NewVideoCard } from "@/ebikeWeb/sharedComponents/new_item_card";

const Bike_Videos = () => {
    return (
        <div className={styles.main}> 
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.heading}>Bike Videos</p>
                    <form className={styles.input_box}>
                        <input
                            type="text"
                            value=""
                            // onChange={onChange}
                            placeholder="Search"
                            className={styles.input} />
                        <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                    </form>
                </div>
                <div className={styles.card_section}>
                    {
                        Data?.length > 0 ?
                            Data.map((item: any, index: any) => (
                                <div key={index} className={styles.card}>
                                    <NewVideoCard props={item} />
                                </div>
                            )) : <p className={styles.no_data}>No Data Found</p>
                    }
                </div>
            </div>
        </div>
    )
}
export default Bike_Videos