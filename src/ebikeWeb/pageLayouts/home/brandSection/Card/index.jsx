'use client'
import React from 'react'
import styles from './index.module.scss'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { cloudinaryLoader } from '@/genericFunctions/geneFunc'

const BrandCard = ({data}) => {
  const Router = useRouter()

  function goToBrand(brand) {
    Router.push(brand.url)
  }

  return (
          <Box className={styles.card_main} onClick={()=>goToBrand(data)} >
            <img src={cloudinaryLoader(data.img_url , 400 ,'auto')} alt={data.title} className={styles.card_image}/>
            <Typography className={styles.card_title}>{data.title}</Typography>
          </Box>
  )
}

export default BrandCard