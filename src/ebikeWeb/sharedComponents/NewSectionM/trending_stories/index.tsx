"use client";
import React from "react";
import styles from './index.module.scss';

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
    }
]

const Treanding_Stories = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {
                    Data?.map((e: any, i: any) => {
                        return (
                            <div className={styles.card_main} key={i}>
                                <img src={e?.img_url} alt={e?.title} className={styles.image} />
                                <p className={styles.title}>{e?.title}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Treanding_Stories