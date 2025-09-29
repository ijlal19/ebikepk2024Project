'use client';
import { getAllDealer } from "@/ebikeWeb/functions/globalFuntions";
import { Dealers_Cards } from "../../new_item_card";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import styles from './index.module.scss';
import "swiper/css/navigation";
import "swiper/css";

const DealerLeft = () => {
    const [AllDealers, setAllDealers] = useState([]);

    useEffect(() => {
        fetchDealers()
    }, [])

    const fetchDealers = async () => {
        let res = await getAllDealer()
        let approvedDealers = res.filter((d: any) => d.is_approved === true);
        const finalObj = approvedDealers
            .slice(0, 30)
            .map((item: any) => ({ item, sortKey: Math.random() }))
            .sort((a: any, b: any) => a.sortKey - b.sortKey)
            .map(({ item }: any) => item);
        if (finalObj?.length > 0) {
            setAllDealers(finalObj)
        }
        else {
            setAllDealers([])
        }
    }
    return (
        <div className={styles.main}>
            <p className={styles.heading}>Dealers</p>
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
                {AllDealers.slice(0, 10)?.map((item: any, i: number) => {
                    return (
                        <SwiperSlide key={i}>
                            <Dealers_Cards props={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default DealerLeft;