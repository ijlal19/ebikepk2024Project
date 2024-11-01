"use client"
import React, { useState, useEffect } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss'
import BikesBrandCard from './Card/index'
import { getbrandData } from '@/functions/globalFuntions';
export default function NewBikeBrand() {

  const [allBrandArr, setAllBrandArr] = useState([])

  useEffect(() => {
    fetchBrandInfo()
  }, [])
  async function fetchBrandInfo() {
    let res = await getbrandData()
    setAllBrandArr(res)
  }

  return (
    <Box className={styles.bikes_brand_main}>
      <Box className={styles.bikes_brand_container}>
        <Typography className={styles.heading}>New Bikes By Make</Typography>
        {
          allBrandArr.map((e: any, i: any) => {
            return (
              <Box className={styles.brand_image_box} key={i}>
                <BikesBrandCard key={i} data={e} />
              </Box>
            )
          })
        }
      </Box>
    </Box>
  );
}