import React from 'react';
import { Navigation, FreeMode } from 'swiper/modules';
import styles from './index.module.scss';
import ItemCard from '@/sharedComponents/itemCard/index';
import { Container } from '@mui/material';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IProps {
    sliderName?: string;
    sliderData?: any; 
    from: string;
}

const SwiperCarousels: React.FC<IProps> = ({ sliderName, sliderData, from }) => {
    return (
        <Container className={`${styles.swiper_card_container} slider_swiper `}>
            <Swiper
                modules={[Navigation, FreeMode]}
                navigation={true}
                className={styles.swiper}
                initialSlide={0}
                loop={true}
                slidesPerView={1}
                breakpoints={{
                    1: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                        freeMode: {
                            enabled: true,
                            sticky: false,
                        },
                    },
                    768: {
                        slidesPerView:  3,
                        slidesPerGroup: 1,
                    },
                }}
                simulateTouch={true}
            >
                {sliderData?.length > 0 &&
                    sliderData.map((e:any, i:any) => (
                        <SwiperSlide key={i} className={styles.slider_card}>
                            <ItemCard data={e} from={from} />
                        </SwiperSlide>
                    ))}
            </Swiper>
         </Container>
    );
};

export default SwiperCarousels;
