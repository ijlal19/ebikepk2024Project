'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { FeatureDelers } from './feature-dealers';
import { FeaturedDealerData } from './Data';
import { DealerInPakistan } from './dealer-in-pakistan';
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions"
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';

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
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className={styles.main_dealer}>
      {
        isLoading ?
         <>
          {<div>
          <Loader isLoading={isLoading} />
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

