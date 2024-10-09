'use client'
import React from 'react'
import styles from './index.module.scss'
import { Box, Typography } from '@mui/material'
const BikesBrandCard = ({data}) => {
  return (
          <Box className={styles.card_main}>
          <img src={data.logoUrl} alt={data.brandName} className={styles.card_image}/>
          </Box>
)
}

export default BikesBrandCard