'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { FeatureDelers } from './feature-dealers';
import { FeaturedDealerData } from './Data';
import { DealerInPakistan } from './dealer-in-pakistan';
const Dealer = () => {
  return (
    <div className={styles.main_dealer}>
      <FeatureDelers props={FeaturedDealerData}/>

      <DealerInPakistan/>
    </div>
   );
 };

export default Dealer;

