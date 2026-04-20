"use client"
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import BlogCategoryCard from "./card";
import { NewMoreBlogCard } from "../new_item_card";
import { useMediaQuery } from "@mui/material";
import { MotorCycle_News_Card } from "../NewSectionM/card";
import AdSense from "../googleAdsense/adsense";

const Blog_Category_Comp = (props:any) => {
    const [blogData, setBlogData] = useState(props.data);
    const isMoble = useMediaQuery('(max-width:768px)')
    const visibleBlogs = blogData.slice(0, isMoble ? 4 : 6);

  useEffect(() => {
    if (props.heading === "More Blogs") {
      const shuffled = [...props.data].slice(0,50).sort(() => Math.random() - 0.5);
      setBlogData(shuffled);
    } else {
      setBlogData(props.data);
    }
  }, [props.data, props.heading]);
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.shortblogheading}>{props.heading} <span className={styles.underline}></span></p>
                </div>
                <div className={styles.card_section}>
                    {
                        visibleBlogs.flatMap((e:any,i:any)=>{
                            const card = (
                                <div key={`card-${i}`} className={styles.card_div}>
                                    <MotorCycle_News_Card props={e}/>
                                </div>
                            );

                            const shouldShowAd = props.showAds && (i + 1) % 3 === 0 && i !== visibleBlogs.length - 1;

                            if (!shouldShowAd) {
                                return [card];
                            }

                            return [
                                card,
                                <div key={`ad-${i}`} className={styles.card_div}>
                                    <AdSense
                                        client="ca-pub-5167970563180610"
                                        slot="9214599249"
                                    />
                                </div>
                            ];
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Blog_Category_Comp
