'use client'
import { useRouter, useParams } from 'next/navigation';
import { Box, Link } from '@mui/material';
import styles from './index.module.scss';
import React from 'react';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';

const BikesBrandCard = ({ data }: any) => {
  const router = useRouter()
  const params = useParams()

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const hrefLink = currentPath.includes('new-bike-price')
    ? `new-bike-price/${data?.id}`
    : `new-bikes/${data?.brandName}`;

  return (
        <Box className={styles.card_main}>
      <Link  href={hrefLink}
        rel="noopener noreferrer" 
        className={styles.card_image}>
          <img src={cloudinaryLoader(data.logoUrl , 400 , 'auto')} alt={data.brandName} className={styles.image} />
      </Link>
    </Box>
  );
};

export default BikesBrandCard