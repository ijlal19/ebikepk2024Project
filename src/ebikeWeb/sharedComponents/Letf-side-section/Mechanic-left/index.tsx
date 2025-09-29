'use client';
import { getAllMechanics } from "@/ebikeWeb/functions/globalFuntions";
import {  Mechainc_Cards } from "../../new_item_card";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import styles from './index.module.scss';
import "swiper/css/navigation";
import "swiper/css";

const MechaniLeft = () => {
    const [AllMechanics, setAllMechanics] = useState([]);

    useEffect(() => {
        fetchMechanics()
    }, [])

    const fetchMechanics = async () => {
        let res = await getAllMechanics()
        let approvedMechanics = res.filter((d: any) => d.is_approved === true);
        const finalObj = approvedMechanics
            .slice(0, 30)
            .map((item: any) => ({ item, sortKey: Math.random() }))
            .sort((a: any, b: any) => a.sortKey - b.sortKey)
            .map(({ item }: any) => item);
        if (finalObj?.length > 0) {
            setAllMechanics(finalObj)
        }
        else {
            setAllMechanics([])
        }
    }
    return (
        <div className={styles.main}>
            <p className={styles.heading}>Mechanics</p>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={0}
                loop={true}
                slidesPerView={3}
                slidesPerGroup={1}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                    },
                    768: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                    },
                }}
            >
                {AllMechanics.slice(0, 10)?.map((item: any, i: number) => {
                    return (
                        <SwiperSlide key={i}>
                            <Mechainc_Cards props={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default MechaniLeft;