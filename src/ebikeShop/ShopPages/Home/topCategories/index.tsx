import React, { useEffect, useState } from 'react';
import { getShopMainCategory } from '@/ebikeShop/Shopfunctions/globalFuntions';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { Box, Grid, useMediaQuery } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from './index.module.scss';


const TopCategories = () => {

    const isMobile = useMediaQuery("(max-width:769px)");

    const sliderData = [
        {
            id: 1,
            img_url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1592628433/staticFiles/10_wnqxwp.jpg"
        },
        {
            id: 2,
            img_url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1592646355/staticFiles/8_nvtgfq.jpg"
        },
        {
            id: 3,
            img_url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1592628433/staticFiles/9_fflcti.jpg"
        },
        {
            id: 4,
            img_url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1592628433/staticFiles/7_mamkaj.jpg"
        }
    ];

    return (

        <div className={styles.main}>

            <div className={styles.ebikelink}>

                <a href="/" className={styles.link_box} rel="noopener noreferrer">
                    <span className={styles.icon}>
                        <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_fit,dpr_auto,f_auto,q_auto,w_40/v1546239194/ebike-graphics/logos/logo-small.png" alt="" className={styles.image} />
                    </span>
                    <p className={styles.text}>Visit ebike.pk</p>
                </a>

                <a href="https://www.youtube.com/@ebikepk" className={styles.link_box} target="_blank" rel="noopener noreferrer">
                    <span className={styles.icon}>
                        <YouTubeIcon className={styles.icons} sx={{ color: "red" }} />
                    </span>
                    <p className={styles.text}>Visit on YouTube</p>
                </a>

                <a href="/forum" className={styles.link_box} rel="noopener noreferrer">
                    <span className={styles.icon}>
                        <ForumRoundedIcon className={styles.icons} sx={{ color: "green" }} />
                    </span>
                    <p className={styles.text}>Visit Forums</p>
                </a>

                <a href="https://www.facebook.com/ebikepk" className={styles.link_box} target="_blank" rel="noopener noreferrer">
                    <span className={styles.icon}>
                        <FacebookRoundedIcon className={styles.icons} sx={{ color: "blue" }} />
                    </span>
                    <p className={styles.text}>Visit Facebook</p>
                </a>

                <a href="/blog" className={styles.link_box} rel="noopener noreferrer">
                    <span className={styles.icon}>
                        <ForumRoundedIcon className={styles.icons} sx={{ color: "purple" }} />
                    </span>
                    <p className={styles.text}>Visit Blogs</p>
                </a>

            </div>

            <p className={styles.heading}>
                TOP CATEGORIES
            </p>

            <div className={`${styles.swiper_brand_card_conatainer} swiper_card_brand`}>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={true}
                    className={styles.swiper}
                    loop={true}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    simulateTouch={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            spaceBetween: 25
                        },
                    }}>

                    {sliderData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Grid container className={styles.top_categories_grid}>

                                <Grid item xs={12} className={styles.grid}>
                                    <Box className={styles.grid_card}>
                                        {/* <a href=""> */}
                                        <img src={item.img_url} alt="" className={styles.image} />
                                        {/* </a> */}
                                    </Box>
                                </Grid>

                            </Grid>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            <div className={styles.add}>
                <a href="https://www.youtube.com/@ebikepk" target='blank'>
                    <img src="https://res.cloudinary.com/duiuzkifx/image/upload/v1592568914/staticFiles/7_Ebikeshop_3rd_Banner_Approved_tw5f0h.jpg" alt="Add_Image" className={styles.add_image} />
                </a>
            </div>

        </div>

    )
}

export default TopCategories





