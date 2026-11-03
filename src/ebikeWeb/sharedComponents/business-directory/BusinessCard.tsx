'use client';

import Link from 'next/link';
import { ArrowForward, BuildOutlined, LocationOnOutlined, PhoneOutlined, StorefrontOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';
import { getMechanicTypeLabel } from '@/constants/mechanicType';
import { brandLabel, Business, businessHref, BusinessKind, phoneNumber } from './utils';
import styles from './index.module.scss';

export function BusinessLogo({ business, kind }: { business: Business; kind: BusinessKind }) {
  const [failedUrl, setFailedUrl] = useState('');
  const url = business.bike_brand?.logoUrl || '';
  return <div className={styles.logo}>
    {url && failedUrl !== url
      ? <img src={cloudinaryLoader(url.replace(/^http:/, 'https:'), 200, 'auto')} alt={`${brandLabel(business.bike_brand?.brandName) || business.shop_name} logo`} loading="lazy" onError={() => setFailedUrl(url)} />
      : kind === 'dealer' ? <StorefrontOutlined /> : <BuildOutlined />}
  </div>;
}

export default function BusinessCard({ business, kind, featured = false }: { business: Business; kind: BusinessKind; featured?: boolean }) {
  const phone = phoneNumber(business.phone);
  return <article className={`${styles.businessCard} ${featured ? styles.featuredCard : ''}`}>
    <div className={styles.cardTop}><BusinessLogo business={business} kind={kind} /><div className={styles.cardTags}>{featured && <span className={styles.featuredBadge}>Featured</span>}<span>{brandLabel(business.bike_brand?.brandName) || (kind === 'dealer' ? 'Bike showroom' : 'Bike workshop')}</span></div></div>
    <span className={styles.businessType}>{getMechanicTypeLabel(business.mechanic_type, kind)}</span>
    <h3><Link href={businessHref(business, kind)}>{business.shop_name || (kind === 'dealer' ? 'Bike dealer' : 'Bike mechanic')}</Link></h3>
    {business.city?.city_name && <p className={styles.cardCity}><LocationOnOutlined />{business.city.city_name}</p>}
    <p className={styles.cardAddress}>{business.address || 'Contact this business for its address.'}</p>
    <div className={styles.cardActions}>{phone ? <a className={styles.callLink} href={`tel:${phone}`} aria-label={`Call ${business.shop_name}`}><PhoneOutlined />Call now</a> : <span className={styles.noPhone}>Phone not listed</span>}<Link className={styles.profileLink} href={businessHref(business, kind)}>View details <ArrowForward /></Link></div>
  </article>;
}
