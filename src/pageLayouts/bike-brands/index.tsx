"use client"
import React, { useState, useEffect } from 'react'
import Data from './data'
import { Box, Grid, useMediaQuery } from '@mui/material';
import styles from './index.module.scss'
import BikesBrandCard from './Card/index'
export default function NewBikeBrand() {
 const isMobile = useMediaQuery('(max-width:768px;')
  return (
    <Box className={styles.bikes_brand_main}>
       {
                Data.map((e:any,i:any)=>{
                  return(
                    <Box className={styles.brand_image_box} key={i}>
                      <BikesBrandCard key={i} data={e}/>
                    </Box>
                  )
                })
              }
    </Box>
  );
}