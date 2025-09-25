"use client"
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import BlogCategoryCard from "./card";
import { NewMoreBlogCard } from "../new_item_card";
import { useMediaQuery } from "@mui/material";

const Blog_Category_Comp = (props:any) => {
    const [blogData, setBlogData] = useState(props.data);
    const isMoble = useMediaQuery('(max-width:768px)')

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
                        blogData.slice(0,isMoble ? 4 : 8).map((e:any,i:any)=>{
                            return(
                                <div key={i} className={styles.card_div}>
                                    {/* <BlogCategoryCard props={e}/> */}
                                    <NewMoreBlogCard props={e}/>
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