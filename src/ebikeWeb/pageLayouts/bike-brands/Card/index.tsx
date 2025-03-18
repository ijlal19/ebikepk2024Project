'use client'
import { Box } from '@mui/material';
import { useRouter , useParams} from 'next/navigation';
import styles from './index.module.scss';
import React from 'react';

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
      </Box>
  );
};


export default BikesBrandCard