'use client'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import './Section4.scss'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { Data } from "./Data"

const Section4 = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Box className='section4_main'>
      <Container className='container'>
        <Box className='Section4-heading'>
          <Typography className='heading'>New Bike Brands</Typography>
          <Button variant='contained' className='btn'>View Brands</Button>
        </Box>
        <br />

        <Swiper 
          // spaceBetween={50} 
          // slidesPerView={5} 
          onSlideChange={() => console.log('slide change')} 
          onSwiper={(swiper) => console.log(swiper)} 
          // modules={[Navigation, Pagination]}
          loop={false}
          simulateTouch={true}
          breakpoints={{
            1: {
                slidesPerView: 2.5,
                spaceBetween: 10,
                initialSlide: 0,
                // freeMode: {
                //   enabled: true,
                //   sticky: false
                // }
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 25,
              slidesPerGroup:5
            },
            }}
        >
        {
          Data.map((brand, ind) => {
            return(
              <SwiperSlide key={ind}>
                  <div>
                    <img src={brand.img_url} />
                  </div>
              </SwiperSlide>
            )
          })
        }
        </Swiper>

        {/* <Carousel responsive={responsive} className='carousel-item'>
          <Grid container className='Grid'>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Hi-Speed"><img src={HiSpeed} alt="Hi-Speed"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Kawasaki"><img src={Kawasaki} alt="Kawasaki"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Crown"><img src={crown} alt="Crown"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Honda"><img src={Honda} alt="Honda"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Unique"><img src={unique} alt="Unique"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Benelli"><img src={Benelli} alt="Benelli"  className='images'/></abbr></Grid>
          </Grid>
          <Grid container className='Grid'>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="ZXMCO"><img src={ZXMCO} alt="ZXMCO"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Yamaha"><img src={Yamaha} alt="Yamaha"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="BMW"><img src={BMW} alt="BMW"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Road-Prince"><img src={Roadprince} alt="Road-Prince"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Unique"><img src={unique} alt="Unique"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Hero"><img src={hero} alt="Hero"  className='images'/></abbr></Grid>
          </Grid>
        </Carousel> */}
        
      </Container>
    </Box>
  )
}
export default Section4