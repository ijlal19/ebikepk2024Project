'use client'
import Link from 'next/link';
import styles from './index.module.scss';
import React from 'react';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';

const BikesBrandCard = ({ data }: any) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const hrefLink = currentPath.includes('new-bike-price')
    ? `/new-bike-price/${data?.id}`
    : `/new-bikes/${data?.brandName}`;
  const brandLabel = data?.brandName?.replaceAll('_', ' ');

  return (
    <Link href={hrefLink} className={styles.card_main}>
      <span className={styles.logoFrame}>
        <img src={cloudinaryLoader(data.logoUrl, 400, 'auto')} alt={brandLabel} className={styles.image} />
      </span>
      <span className={styles.brandName}>{brandLabel}</span>
    </Link>
  );
};

export default BikesBrandCard
