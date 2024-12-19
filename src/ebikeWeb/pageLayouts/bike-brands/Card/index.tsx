'use client'
import React from 'react'
import styles from './index.module.scss'
import { Box, Link, Typography } from '@mui/material'
import { useRouter , useParams} from 'next/navigation';
const BikesBrandCard = ({ data }: any) => {
  const router = useRouter()
  const params = useParams()

  const handleNavigate =(id:any, brandName:any)=>{
    if(window?.location?.pathname.indexOf('new-bike-price') > -1) {
      router.push(`new-bike-price/${id}`)
    }
    else  {
      router.push(`new-bikes/${brandName}`)
    }
  }
 
  return (
      <Box className={styles.card_main}>
        <Box className={styles.card_image} onClick={() => handleNavigate(data.id, data.brandName)}>
        <img src={data.logoUrl} alt={data.brandName} className={styles.image} />
        </Box>
       {/* <Typography className={styles.link_text}  onClick={() => handleNavigate(data.id, data.brandName)}><Typography >{data.brandName}</Typography></Typography> */}
      </Box>
  );
};


export default BikesBrandCard