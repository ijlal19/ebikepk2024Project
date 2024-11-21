'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { FeatureDelers } from './feature-dealers';
import { FeaturedDealerData } from './Data';
import { DealerInPakistan } from './dealer-in-pakistan';
import { getFeaturedDealer, getAllDealer } from "@/functions/globalFuntions"

const Dealer = () => {

  const [allDealers, setAllDealers]:any = useState([])
  const [featuredDealers, setFeaturedDealers]:any = useState([])

  useEffect(() => {
    fetchInfo() 
  },[])

  async function fetchInfo() {
    let res = await getAllDealer()
    setAllDealers(res)
    console.log(res)

    let res1 = await getFeaturedDealer()
    setFeaturedDealers(res1)
    console.log(res1)
  }

  return (
    <div className={styles.main_dealer}>
      <FeatureDelers featuredDealers={featuredDealers}/>
      <DealerInPakistan dealers={allDealers}  />
    </div>
   );
 };

export default Dealer;

