"use client"
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from './index.module.scss';
import 'swiper/swiper-bundle.css';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';

const Banner = () => {

    const sliderData = [
       'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,h_400,w_auto,q_auto,f_auto,dpr_auto/v1565247355/ebike-graphics/banners/Untitled-1.jpg' ,
  'https://res.cloudinary.com/duiuzkifx/image/upload/c_scale,h_400,w_auto,q_auto,f_auto,dpr_auto/v1592637714/staticFiles/shop_asujgk.jpg']

    return (
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
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 25
                    },
                }}
            >
                {sliderData.length > 0 &&
                    sliderData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img className={styles.brand_img} src={cloudinaryLoader(item , 400 , 'auto')} alt="banner.image" />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default Banner;