'use client'
import { Box, Button, Container, Typography } from '@mui/material'
import styles from './index.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import BrandSwiper from '@/sharedComponents/brandSwiper/index'
import { Data } from "./Data"


const BrandSection = () => {
  

  return (
    <Box className={styles.brandsection_main}>
      <Container className={styles.brandsection_container}>
        <Box className={styles.brandsection_title_box}>
          <Typography className={styles.brandsection_title}>New Bike Brands</Typography>
          <Button className={styles.brandsection_btn}>View Brands</Button>
        </Box>
        <br />

        <BrandSwiper sliderData={Data} from="home" />
      
      </Container>
    </Box>
  )
}
export default BrandSection