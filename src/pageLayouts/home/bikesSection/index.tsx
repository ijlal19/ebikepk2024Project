'use client'
import styles from './index.module.scss'
import { Box } from '@mui/material';
import Data from './Data';
import SwiperCarousels from '@/sharedComponents/swiperSlider/index';

function BikesSection() {
    return (
        <Box className={styles.bike_sec_main}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={Data}/>
        </Box>
    )
}
export default BikesSection;