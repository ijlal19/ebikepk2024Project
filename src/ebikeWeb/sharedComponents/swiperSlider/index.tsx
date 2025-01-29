import React from 'react';
import { Navigation, FreeMode } from 'swiper/modules';
import styles from './index.module.scss';
import ItemCard from '@/ebikeWeb/sharedComponents/itemCard/index';
import { Container } from '@mui/material';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import FeatureCard from '@/ebikeWeb/sharedComponents/FeatureCard';

interface IProps {
    sliderName?: string;
    sliderData?: any; 
    from: string;
    currentpage:any
    onBtnClick: any
}

const SwiperCarousels: React.FC<IProps> = ({ sliderName, sliderData, from, currentpage, onBtnClick}:any) => {
    return (
        <Container className={`${styles.swiper_card_container} slider_swiper `}>
            <Swiper
                modules={[Navigation, FreeMode]}
                navigation={true}
                className={styles.swiper}
                initialSlide={sliderName == 'featurSectionHomeSlider' ? 1 : 0}
                loop={sliderName == 'featurSectionHomeSlider' ? false : true}
                slidesPerView={1}
                centeredSlides={sliderName == 'featurSectionHomeSlider' ? true : false }
                breakpoints={{
                    1: {
                        slidesPerView: sliderName == 'featurSectionHomeSlider' ? 1.3 : 2,
                        spaceBetween: sliderName == 'featurSectionHomeSlider' ?  15 : 5,
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
                                {sliderName == 'featurSectionHomeSlider' ?
                                    <FeatureCard 
                                        data={data}
                                    /> 
                                    :
                                    <ItemCard 
                                        data={data} 
                                        from={from} 
                                        currentpage={currentpage} 
                                        onBtnClick={onBtnClick}
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
