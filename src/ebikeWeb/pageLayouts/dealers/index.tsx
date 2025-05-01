'use client';
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions";
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { DealerInPakistan } from './dealer-in-pakistan';
import { FeatureDelers } from './feature-dealers';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

type DealerComp = {
  featuredDelaer: any;
  delaer: any;
};

const Dealer = ({featuredDelaer, delaer}:DealerComp) => {

  const [allDealers, setAllDealers] = useState([])
  const [featuredDealers, setFeaturedDealers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInfo()
  }, [])

  async function fetchInfo() {
    
    let res1:any = null
    let res2:any = null

    if(featuredDelaer?.length > 0) {
      setFeaturedDealers(featuredDelaer)
    }
    else {
      res1 = await getFeaturedDealer()
      if(res1?.length > 0) {
        setFeaturedDealers(res1)
      }
      else {
        setFeaturedDealers([])
      }
    }
  
    if(delaer?.length > 0) {
      setAllDealers(delaer)
    }
    else {
      res2 = await getAllDealer()
      if(res2?.length > 0) {
        setAllDealers(res2)
      }
      else {
        setAllDealers([])
      }
    }

    setIsLoading(false)

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
            {featuredDealers?.length > 0 ? <FeatureDelers featuredDealers={featuredDealers}/> : "" }
            {allDealers?.length > 0 ? <DealerInPakistan dealers={allDealers}  /> : "" }
            { featuredDealers?.length == 0 &&  allDealers?.length == 0 ? <p> No Dealer Data Found </p> : "" }
          </>
      }
    </div>
  );
};

export default Dealer;

