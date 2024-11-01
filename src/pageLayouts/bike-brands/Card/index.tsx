'use client'
import React from 'react'
import styles from './index.module.scss'
import { Box, Link, Typography } from '@mui/material'
// import Link from 'next/link';
const BikesBrandCard = ({ data }: any) => {
  return (
      <Box className={styles.card_main}>
        <Box className={styles.card_image}>
        <img src={data.logoUrl} alt={data.brandName} className={styles.image} />
        </Box>
       <Link href='' className={styles.link_text}><Typography >{data.brandName}</Typography></Link>
      </Box>
  );
};


export default BikesBrandCard