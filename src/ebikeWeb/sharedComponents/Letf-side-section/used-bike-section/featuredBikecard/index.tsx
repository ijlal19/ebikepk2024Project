'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// import data from './data';
// import { NewBikeCard } from '../../new_item_card';
import { getCustomBikeAd } from '@/ebikeWeb/functions/globalFuntions';
import { UsedBikeCard } from '@/ebikeWeb/sharedComponents/new_item_card';
import Data from '../../new-bike-section/data';

const Featrued_Usedbike_left = () => {
    const [AllBikes, setAllBikes] = useState<any>([]);
    useEffect(() => {
        fetchAllUsedBike()
    }, [])

    const fetchAllUsedBike = async () => {
        let res = null;

        let obj = {
            isFeatured: true,
            adslimit: 10
        }

        if (res == null) {
            res = await getCustomBikeAd(obj);
            if(res && res?.data?.length > 0 ){
                setAllBikes(res?.data);
            }
        }
    }

    return (
        <div className={styles.new_bike_main}>
            <p className={styles.heading}>Featured Bikes</p>
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
                {AllBikes?.map((item: any, i: number) => (
                    <SwiperSlide key={i}>
                        <UsedBikeCard props={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
export default Featrued_Usedbike_left;