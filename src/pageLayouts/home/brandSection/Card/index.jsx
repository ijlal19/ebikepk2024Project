'use client'
import React from 'react'
import styles from './index.module.scss'
import { Box, Typography } from '@mui/material'
const BrandCard = ({data}) => {
  return (
    <Box className={styles.card_main}>
        <img src={data.img_url} alt={data.title} className={styles.card_image}/>
        <Typography className={styles.card_title}>{data.title}</Typography>
    </Box>
)
}

export default BrandCard