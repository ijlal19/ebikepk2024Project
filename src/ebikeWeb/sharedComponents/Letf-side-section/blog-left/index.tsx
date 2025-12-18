'use client';
import { getAllBlog } from '@/ebikeWeb/functions/globalFuntions';
import { NewMoreBlogCard } from '@/ebikeWeb/sharedComponents/new_item_card';
import { BlogShuffle } from '@/genericFunctions/geneFunc';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from './index.module.scss';
import "swiper/css/navigation";
import "swiper/css";

const Blog_left = () => {
    const [AllBlog, setBlogData] = useState<any>([]);
    const [ID, setId] = useState<any>('');
    useEffect(() => {
        fetchAllBlog()
    }, [])

    const fetchAllBlog = async () => {
        let res = await getAllBlog()
        const resAdvice = BlogShuffle(res)
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        const third = segments[3];
        setBlogData(resAdvice)
        setId(third)
    }

    return (
        <div className={styles.new_bike_main}>
            <p className={styles.heading}>More Blogs</p>
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
                {AllBlog?.map((item: any, i: number) => {
                    if (item?.id == ID) { return null }
                    return (
                        <SwiperSlide key={i}>
                            <NewMoreBlogCard props={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
export default Blog_left;