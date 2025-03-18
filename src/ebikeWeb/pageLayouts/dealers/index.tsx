'use client';
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions";
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { DealerInPakistan } from './dealer-in-pakistan';
import { FeatureDelers } from './feature-dealers';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const Dealer = () => {

  const [allDealers, setAllDealers] = useState([])
  const [featuredDealers, setFeaturedDealers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchInfo()
  }, [])

  async function fetchInfo() {
    setIsLoading(true)
    let res = await getAllDealer()
    setAllDealers(res)
    if(!res){
      setIsLoading(true)
    }
    else{
      let res1 = await getFeaturedDealer()
      setFeaturedDealers(res1)
      setIsLoading(false)
     setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
    }
  }

  return (
    <div className={styles.main_dealer}>
      {
        isLoading ?
         <>
          {<div className={styles.load_main}>
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
          </div>}
         </>
          : 
          <>
            <FeatureDelers featuredDealers={featuredDealers}/>
            <DealerInPakistan dealers={allDealers}  />
          </>
      }
    </div>
  );
};

export default Dealer;

