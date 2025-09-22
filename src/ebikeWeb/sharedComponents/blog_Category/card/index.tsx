import React from "react";
import styles from './index.module.scss';
import { add3Dots, cloudinaryLoader } from "@/genericFunctions/geneFunc";
import { Link, useMediaQuery } from "@mui/material";

const BlogCategoryCard = ({ props }: any) => {
    const IsMobile  = useMediaQuery('(max-width:768px)')
    const getRoute = (blogInfo: any) => {
        var title = blogInfo.blogTitle;
        title = title.replace(/\s+/g, '-');
        var lowerTitle = title.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        return (`/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`);
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