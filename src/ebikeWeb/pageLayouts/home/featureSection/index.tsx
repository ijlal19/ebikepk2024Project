'use client'
import { Box, Container, Grid, Typography } from '@mui/material';
import styles from './index.module.scss';
// import Card from './Card/index';
import { SendToMobile } from '@mui/icons-material';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider';
import FeatureCard from '@/ebikeWeb/sharedComponents/FeatureCard';

const Section2 = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const feautureArray=[
    {
              heading:'Post Free Add',
              txt1:'Post your Bike Add Free in Easy Steps',
              txt2:'Post your Bike Video Picture and ADD For Free',
              txt3:'Sell Your Bike at the Best Price',
              button:'Post Bike Add',
              url:"/used-bikes/sell-used-bike/",
              isLoginreq:false
    },
    {
              heading:'Register Dealer',
              txt1:'Register your Motorcycle showroom',
              txt2:'Get more business Leads from ebike.pk users',
              txt3:'Enhance your business revenue',
              button:'Register Dealer',
              url:"/dealers/register",
              isLoginreq:false
    },
    {
              heading:'Register Mechanic',
              txt1:'Register your Motorcycle in workshop',
              txt2:'Get more business Leads from ebike.pk users',
              txt3:'Enhance your business revenue',
              button:'Register Mechanic',
              url:"/mechanics/register",
              isLoginreq:false
    }
  ]

  return (
    <Box className={styles.featuer_main}>
      
      <Container>

        <Typography className={styles.featuer_title} >
          Sell Your Bike on ebike.pk <span className={styles.titleShow}> and Get a Best Price of your bike </span>
        </Typography>
        
        <Grid 
          container 
          spacing={2} 
          className={styles.featuer_container}
        >
          {
            isMobile ? 
            <SwiperCarousels 
              from='' 
              sliderName='featurSectionHomeSlider' 
              sliderData={feautureArray} 
              currentpage="" 
              onBtnClick={()=>{}} 
            /> 
            :
            (feautureArray.map((data:any ,i:any) => {
              return(
                <FeatureCard data={data} key={i}/>
              )
            }))
          }
        </Grid>

      </Container>
    </Box>
  );
};

export default Section2;









