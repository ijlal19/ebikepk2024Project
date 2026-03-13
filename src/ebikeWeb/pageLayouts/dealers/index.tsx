'use client';
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions";
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { DealerInPakistan } from './dealer-in-pakistan';
import { FeatureDelers } from './feature-dealers';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getMechanicTypeFilterOptions, matchesMechanicType } from '@/constants/mechanicType';

type DealerComp = {
  featuredDelaer: any;
  delaer: any;
};

const Dealer = ({featuredDelaer, delaer}:DealerComp) => {

  const [allDealers, setAllDealers] = useState([])
  const [featuredDealers, setFeaturedDealers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<"all" | 1 | 2>("all")

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
    setTimeout(() => {
         window.scrollTo(0, 0)
       }, 1000);
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
            <div className={styles.filter_bar}>
              <span className={styles.filter_label}>Dealer Type</span>
              <div className={styles.filter_tabs}>
                {getMechanicTypeFilterOptions("dealer").map((option) => {
                  const isActive = selectedType === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedType(option.value)}
                      className={`${styles.filter_tab} ${isActive ? styles.filter_tab_active : ""}`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {featuredDealers.filter((item: any) => matchesMechanicType(item, selectedType)).length > 0 ? <FeatureDelers featuredDealers={featuredDealers.filter((item: any) => matchesMechanicType(item, selectedType))} selectedType={selectedType} /> : "" }
            {allDealers.filter((item: any) => matchesMechanicType(item, selectedType)).length > 0 ? <DealerInPakistan dealers={allDealers.filter((item: any) => matchesMechanicType(item, selectedType))} selectedType={selectedType} /> : "" }
            { featuredDealers.filter((item: any) => matchesMechanicType(item, selectedType)).length == 0 &&  allDealers.filter((item: any) => matchesMechanicType(item, selectedType)).length == 0 ? <p className={styles.noData} > No Dealer Data Found </p> : "" }
          </>
      }
    </div>
  );
};

export default Dealer;
