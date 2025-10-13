'use client';
import React from "react";
import styles from './index.module.scss';
import { Avatar } from "@mui/material";

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

const MotorCycle_News_Card = ()=>{
    return(
    <div className={styles.main}>
        <img src='https://cdn-fastly.motorcycle.com/media/2025/10/10/17381/s-2026-honda-cb1000f-first-look-gallery.jpg?size=594x374' alt="" className={styles.image} />
        <p className={styles.title}>Dirt Riding Fundamentals: Common Mistakes & New Rider Tips</p>
        <button className={styles.button}>View Gallery</button>
    </div>
    )
}

const List_Card = () => {
    return(
        <div className={styles.list_main}>
            {
                Data?.map((e:any, i:any) => {
                    return(
                        <div className={styles.card_main} key={i}>
                            <img src={e?.img_url} alt="" className={styles.image} />
                            <p className={styles.title}>{e?.title.slice(0,30)}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export {MotorCycle_News_Card , List_Card}