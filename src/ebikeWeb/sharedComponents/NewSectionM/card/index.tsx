'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { Avatar, Link } from "@mui/material";
import { add3Dots, BlogShuffle, cloudinaryLoader } from "@/genericFunctions/geneFunc";
import { getAllBlog } from "@/ebikeWeb/functions/globalFuntions";

let Data = [
    {
        title: "Coming Soon: The New Kawasaki KLE",
        img_url: "https://cdn-fastly.motorcycle.com/media/2025/10/01/15583/coming-soon-the-new-kawasaki-kle.jpg?size=594x374&nocrop=1",
        id: 1,
    },
    {
        title: "2026 MV Agusta Brutale 950 to Debut at EICMA",
        img_url: "https://cdn-fastly.motorcycle.com/media/2025/10/02/13362/2026-mv-agusta-brutale-950-to-debut-at-eicma.jpg?size=594x374&nocrop=1",
        id: 2,
    },
    {
        title: "Dirt Riding Fundamentals: Common Mistakes & New Rider Tips",
        img_url: "https://cdn-fastly.motorcycle.com/media/2025/09/09/18258/dirt-riding-fundamentals-common-mistakes-new-rider-tips.jpg?size=594x374&nocrop=1",
        id: 3,
    },
    {
        title: "Dirt Riding Fundamentals: Common Mistakes & New Rider Tips",
        img_url: "https://cdn-fastly.motorcycle.com/media/2025/09/09/18258/dirt-riding-fundamentals-common-mistakes-new-rider-tips.jpg?size=594x374&nocrop=1",
        id: 3,
    },
    {
        title: "Dirt Riding Fundamentals: Common Mistakes & New Rider Tips",
        img_url: "https://cdn-fastly.motorcycle.com/media/2025/09/09/18258/dirt-riding-fundamentals-common-mistakes-new-rider-tips.jpg?size=594x374&nocrop=1",
        id: 3,
    },
    {
        title: "Dirt Riding Fundamentals: Common Mistakes & New Rider Tips",
        img_url: "https://cdn-fastly.motorcycle.com/media/2025/09/09/18258/dirt-riding-fundamentals-common-mistakes-new-rider-tips.jpg?size=594x374&nocrop=1",
        id: 3,
    },
    {
        title: "Dirt Riding Fundamentals: Common Mistakes & New Rider Tips",
        // img_url: "https://cdn-fastly.motorcycle.com/media/2025/09/09/18258/dirt-riding-fundamentals-common-mistakes-new-rider-tips.jpg?size=594x374&nocrop=1",
        img_url: "https://cdn-fastly.motorcycle.com/media/2025/10/10/17381/s-2026-honda-cb1000f-first-look-gallery.jpg?size=594x374",
        id: 3,
    },
]

const MotorCycle_News_Card = ({props}:any) => {
    console.log("hello1" , props)
    const getRoute = (blogInfo: any) => {
        var title = blogInfo?.blogTitle;
        title = title?.replace(/\s+/g, '-');
        var lowerTitle = title?.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        return `/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`
    }
    return (
        <div className={styles.main}>
            <img src={cloudinaryLoader(props?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto')} alt="" className={styles.image} />
            <Link href={getRoute(props)} className={styles.title}>{add3Dots(props?.blogTitle , 50)}</Link>
            <Link href={getRoute(props)} className={styles.button}>View Detail</Link>
        </div>
    ) 
}

const List_Card = ({ props }: any) => {
     const [AllBlog, setBlogData] = useState<any>([]);
        useEffect(() => {
            fetchAllBlog()
        }, [])
    
        const fetchAllBlog = async () => {
            let res = await getAllBlog()
            const resAdvice = BlogShuffle(res)
            setBlogData(resAdvice)
        }

    const getRoute = (blogInfo: any) => {
        var title = blogInfo?.blogTitle;
        title = title?.replace(/\s+/g, '-');
        var lowerTitle = title?.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        return `/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`
    }

    return (
        <div className={styles.list_main}>
            <p className={styles.heading}>Popular Articles</p>
            {
                AllBlog?.slice(0, 6).map((e: any, i: any) => {
                    return (
                        <div className={styles.card_main} key={i}>
                            <img src={cloudinaryLoader(e?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto')} alt="" className={styles.image} />
                            <Link href={getRoute(e)} className={styles.title}>{add3Dots(e.blogTitle, 30)}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export { MotorCycle_News_Card, List_Card }