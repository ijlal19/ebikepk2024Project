import React from 'react';
import { Navigation, FreeMode } from 'swiper/modules';
import styles from './index.module.scss';
import ItemCard from '@/sharedComponents/itemCard/index';
import { Container } from '@mui/material';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import FeatureCard from '@/sharedComponents/FeatureCard';

interface IProps {
    sliderName?: string;
    sliderData?: any; 
    from: string;
    currentpage:any
}

const SwiperCarousels: React.FC<IProps> = ({ sliderName, sliderData, from, currentpage}:any) => {
    return (
        <Container className={`${styles.swiper_card_container} slider_swiper `}>
            <Swiper
                modules={[Navigation, FreeMode]}
                navigation={true}
                className={styles.swiper}
                initialSlide={sliderName == 'featurSection' ? 1 : 0}
                loop={sliderName == 'featurSection' ? false : true}
                slidesPerView={1}
                centeredSlides={sliderName == 'featurSection' ? true : false }
                breakpoints={{
                    1: {
                        slidesPerView: sliderName == 'featurSection' ? 1.3 : 2,
                        spaceBetween: sliderName == 'featurSection' ?  15 : 5,
                        freeMode: {
                            enabled: true,
                            sticky: false,
                        },
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                    },
                }}
                simulateTouch={true}
            >
                {sliderData?.length > 0 &&
                    sliderData.map((data:any, i:any) => {
                        return(
                            <SwiperSlide key={i} className={styles.slider_card}>
                                {sliderName == 'featurSection' ?
                                    <FeatureCard 
                                        data={data}
                                    /> 
                                    :
                                    <ItemCard 
                                        data={data} 
                                        from={from} 
                                        currentpage={currentpage} 
                                    />
                                }
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
         </Container>
    );
};

export default SwiperCarousels;
