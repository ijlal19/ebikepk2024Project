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
          <div className={styles.card_main} onClick={()=>goToBrand(data)} >
            <div className={styles.image_box}>
            <img src={cloudinaryLoader(data.logoUrl , 1000 ,'auto')} alt={data.title} className={styles.card_image}/>
            </div>
            <p className={styles.card_title}>{data.brandName}</p>
          </div>
  )
}

export default BrandCard