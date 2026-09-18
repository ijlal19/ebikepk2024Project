import React from "react";
import styles from './index.module.scss';
import { add3Dots, cloudinaryLoader } from "@/genericFunctions/geneFunc";
import { Link, useMediaQuery } from "@mui/material";
import { buildBlogPath } from "@/app/metadata-utils";

const BlogCategoryCard = ({ props }: any) => {
    const IsMobile  = useMediaQuery('(max-width:768px)')
    const getRoute = (blogInfo: any) => {
        return buildBlogPath(blogInfo);
    }
    return (
        <div className={styles.card_main}>
            <div className={styles.image_box}>
                <img src={cloudinaryLoader(props.featuredImage?.split(' #$# ')[0]?.trim() , 400 , 'auto')} alt="" className={styles.image} />
            </div>
            <div className={styles.cardDetail}>
                <Link href={getRoute(props)} sx={{textDecoration:'none' , color:'#000000'}}>
                    <p className={styles.title}>{add3Dots(props.blogTitle, IsMobile? 35 :50)}</p>
                </Link>
                <p className={styles.date}>{props.authorname} - {props.createdAt.slice(0, 10)}</p>
            </div>
        </div>
    )
}
export default BlogCategoryCard
