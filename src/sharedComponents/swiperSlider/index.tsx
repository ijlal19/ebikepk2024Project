import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation , FreeMode} from 'swiper/modules';
import styles from './index.module.scss';
import ItemCard from '@/sharedComponents/itemCard/index'
import { Box, Container } from '@mui/material'
import 'swiper/swiper-bundle.css';
interface IProps {
    sliderName?: any;
    sliderData?: any;
}

const SwiperCarousels: React.FC<IProps> = ({sliderName, sliderData}) => {

  return (
    <Container className={`${styles.swiper_card_conatainer} swiper_card_con`}>
        <Swiper
            modules={[Navigation,FreeMode]}
            navigation={true}
            className={`${styles.swiper}`}
            initialSlide={0}
            loop={true}
            onSlideChange={(e) => { }}
            slidesPerView={1}
            breakpoints={{
                1: {
                    slidesPerView:  2,
                    spaceBetween: 5,
                    initialSlide: 0,
                        freeMode: {
                            enabled: true,
                            sticky: false
                        }
                },
                768: {
                    slidesPerView: 3,
                    // spaceBetween: 25,
                    slidesPerGroup: 1
                },
            }}
            simulateTouch={true}

        >
            {sliderData?.length > 0 &&
                sliderData?.map((item: any, index: any) => {
                return (
                    <SwiperSlide key={index} className={styles.slider_card}>
                        <ItemCard data={item} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    </Container>
  )
};
export default SwiperCarousels;
