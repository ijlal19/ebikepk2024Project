'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import data from './data';
import { NewBikeCard } from '../../new_item_card';

const NewBike_left = () => {

    return (
        <div className={styles.new_bike_main}>

            <p className={styles.heading}> New Bikes </p>
            
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
                {data?.map((item: any, i: number) => (
                    <SwiperSlide key={i}>
                        <NewBikeCard props={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
export default NewBike_left;