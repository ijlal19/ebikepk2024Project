import React from "react";
import styles from './index.module.scss';
import { add3Dots } from "@/genericFunctions/geneFunc";

const BlogCategoryCard = ({ props }: any) => {
    return (
        <div className={styles.card_main}>
            <div className={styles.image_box}>
                <img src={props.imgeUrl} alt="" className={styles.image} />
            </div>
            <div className={styles.cardDetail}>
                <p className={styles.title}>{add3Dots(props.title, 50)}</p>
                <p className={styles.date}>{props.authorname} - {props.date}</p>
            </div>
        </div>
    )
}
export default BlogCategoryCard