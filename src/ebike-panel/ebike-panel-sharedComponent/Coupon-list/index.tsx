'use client';
import React, { useState } from "react";
import styles from './index.module.scss';
import { New_header } from "../panel-header";

const CouponCode  = () =>{
    const [isLoading , setIsloading] = useState(false)



    return(
        <div className={styles.main}>
            <New_header />
            {
                !isLoading ? 
                <div>
                    form

                </div>:
                <div></div>
            }
        </div>
    )
}

export default CouponCode