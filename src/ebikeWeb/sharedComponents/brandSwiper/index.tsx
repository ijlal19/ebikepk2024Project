import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation , FreeMode} from 'swiper/modules';
import styles from './index.module.scss';
import { Box, Container } from '@mui/material'
import 'swiper/swiper-bundle.css';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';
interface IProps {
    from?: any;
    sliderData?: any;
}

const SwiperCarousels: React.FC<IProps> = ({from, sliderData}) => {

  return (
    <Container className={`${styles.swiper_brand_card_conatainer} swiper_card_brand`}>
        <Swiper
            modules={[Navigation, FreeMode]}
            navigation={true}
            className={`${styles.swiper}`}
            initialSlide={0}
            loop={true}
            onSlideChange={(e) => { }}
            slidesPerView={1}
            breakpoints={{
                1: {
                    slidesPerView:  3,
                    spaceBetween: 10,
                    initialSlide: 0,
                        freeMode: {
                            enabled: true,
                            sticky: false
                        }
                },
                768: {
                    slidesPerView: 6,
                    spaceBetween: 25,
                    slidesPerGroup: 6
                },
            }}
            simulateTouch={true}
        >
            {sliderData?.length > 0 &&
                sliderData?.map((item: any, index: any) => {
                return (
                    <SwiperSlide key={index}>
                        <img className={styles.brand_img} src={cloudinaryLoader(item.img_url , 400 , 'auto')} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    </Container>
  )
};
export default SwiperCarousels;
