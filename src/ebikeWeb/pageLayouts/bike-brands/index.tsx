"use client"
import React, { useState, useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss'
import BikesBrandCard from './Card/index'
import { getbrandData } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
export default function NewBikeBrand() {

  const [allBrandArr, setAllBrandArr] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchBrandInfo()
  }, [])
  
  async function fetchBrandInfo() {
    setIsLoading(true)
    let res = await getbrandData()
    setAllBrandArr(res)
    setIsLoading(false)
   setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
  }

  return (
    <Box className={styles.bikes_brand_main}>
      {!isLoading ? 
      <>
      <Box className={styles.bikes_brand_container}>
        <Typography className={styles.heading}>New Bikes By Make</Typography>
        {
          allBrandArr?.map((e: any, i: any) => {
            return (
              <Box className={styles.brand_image_box} key={i} >
                <BikesBrandCard key={i} data={e} />
              </Box>
            )
          })
        }
      </Box>
      </>:
      <div className={styles.load_main}>
      <div className={styles.load_div}>
        <Loader isLoading={isLoading} />
      </div>
      </div>
}
    </Box>
  );
}