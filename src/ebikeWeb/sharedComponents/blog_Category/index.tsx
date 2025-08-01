"use client"
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import BlogCategoryCard from "./card";

const Blog_Category_Comp = (props:any) => {
    const [blogData, setBlogData] = useState(props.data);

  useEffect(() => {
    if (props.heading === "More Blogs") {
      const shuffled = [...props.data].sort(() => Math.random() - 0.5);
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
                        blogData.slice(0,8).map((e:any,i:any)=>{
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