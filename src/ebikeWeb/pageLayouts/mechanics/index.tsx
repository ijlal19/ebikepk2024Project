'use client'
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { FeatureMechanics } from './feature-mechanics';
import { MechanicsInPakistan } from './mechanic-in-pakistan';
import { getAllMechanics, getFeaturedMechanics } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { getMechanicTypeFilterOptions, matchesMechanicType } from '@/constants/mechanicType';

type MechanicComp = {
  featuredMechanic: any;
  mechanic: any;
};

const Mechanic = ({ featuredMechanic, mechanic }: MechanicComp) => {

  const [allMechanics, setAllMechanics]: any = useState([])
  const [featuredMechanics, setFeaturedMechanics]: any = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<"all" | 1 | 2>("all")

  useEffect(() => {
    fetchInfo()
  }, [])

  async function fetchInfo() {

    let res1: any = null
    let res2: any = null

    if (featuredMechanic?.length > 0) {
      setFeaturedMechanics(featuredMechanic)
    }
    else {
      res1 = await getFeaturedMechanics()
      if (res1?.length > 0) {
        setFeaturedMechanics(res1)
      }
      else {
        setFeaturedMechanics([])
      }
    }

    if (mechanic?.length > 0) {
      setAllMechanics(mechanic)
    }
    else {
      res2 = await getAllMechanics()
      if (res2?.length > 0) {
        setAllMechanics(res2)
      }
      else {
        setAllMechanics([])
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
              <span className={styles.filter_label}>Mechanic Type</span>
              <div className={styles.filter_tabs}>
                {getMechanicTypeFilterOptions("mechanic").map((option) => {
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
            {featuredMechanics.filter((item: any) => matchesMechanicType(item, selectedType)).length > 0 ? <FeatureMechanics featuredmechanics={featuredMechanics.filter((item: any) => matchesMechanicType(item, selectedType))} selectedType={selectedType} /> : ""}
            {allMechanics.filter((item: any) => matchesMechanicType(item, selectedType)).length > 0 ? <MechanicsInPakistan mechanics={allMechanics.filter((item: any) => matchesMechanicType(item, selectedType))} selectedType={selectedType} /> : ""}
            {featuredMechanics.filter((item: any) => matchesMechanicType(item, selectedType)).length == 0 && allMechanics.filter((item: any) => matchesMechanicType(item, selectedType)).length == 0 ? <p className={styles.noData} >No Mechanic Data Found</p> : "" }
          </>
      }
    </div>
  );
};

export default Mechanic;
