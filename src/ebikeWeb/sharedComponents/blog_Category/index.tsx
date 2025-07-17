"use client"
import React from "react";
import styles from './index.module.scss';
import BlogCategoryCard from "./card";

const Blog_Category_Comp = (props:any) => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.shortblogheading}>{props.heading} <span className={styles.underline}></span></p>
                </div>
                <div className={styles.card_section}>
                    {
                        props.data.map((e:any,i:any)=>{
                            return(
                                <div key={i} className={styles.card_div}>
                                    <BlogCategoryCard props={e}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Blog_Category_Comp