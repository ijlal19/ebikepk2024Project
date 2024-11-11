'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
// import { FeatureDelers } from './feature-dealers';
import { FeaturedDealerData } from './Data';
import { FeatureMechanics } from './feature-mechanics';
import { MechanicsInPakistan } from './mechanic-in-pakistan';
// import { DealerInPakistan } from './dealer-in-pakistan';
const Mechanic = () => {
  return (
    <div className={styles.main_dealer}>
      <FeatureMechanics props={FeaturedDealerData}/>

      <MechanicsInPakistan/>
    </div>
   );
 };

export default Mechanic;