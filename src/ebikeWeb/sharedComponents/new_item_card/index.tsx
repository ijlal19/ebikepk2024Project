import React from 'react';
import styles from './index.module.scss';
import { Link, useMediaQuery } from '@mui/material';
import { add3Dots } from '@/genericFunctions/geneFunc';

const NewCard = ({ props }: any) => {
    const isMobile = useMediaQuery('(max-width:768px)')
    const getBlogUrl = (blogInfo: any) => {
        let title = blogInfo.blogTitle.replace(/\s+/g, '-').toLowerCase();
        return `/blog/${blogInfo.blog_category.name.toLowerCase()}/${title}/${blogInfo.id}`;
    };
    return (
        <div className={styles.main}>
            <div className={styles.container}>
            <div className={styles.image_box} 
            // style={{
            //     background: `url(${props?.featuredImage?.split(' #$# ')[0]?.trim()})`,
            //     backgroundPosition: 'center',
            //     backgroundRepeat: 'no-repeat',
            //     backgroundSize: '100% auto'
            // }} 
            >
                <img src={props?.featuredImage?.split(' #$# ')[0]?.trim()} alt="" className={styles.image} />
            </div>
            <div className={styles.content}>
                <p className={styles.title}>{add3Dots(props?.blogTitle , isMobile? 25 : 60)}</p>
                <p className={styles.author}>By <span className={styles.name}>{props?.authorname}</span></p>
                <p className={styles.description}>{add3Dots(props?.meta_description, isMobile?80 : 120)}</p>
                <Link href={getBlogUrl(props)} className={styles.link}>
                    {/* <button className={styles.btn}> */}
                    View Detail
                    {/* </button> */}
                </Link>
            </div>
            </div>
        </div>
    )
}
export default NewCard