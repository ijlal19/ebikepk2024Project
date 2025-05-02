'use client'
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { FeatureMechanics } from './feature-mechanics';
import { MechanicsInPakistan } from './mechanic-in-pakistan';
import { getAllMechanics, getFeaturedMechanics } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';

type MechanicComp = {
  featuredMechanic: any;
  mechanic: any;
};

const Mechanic = ({ featuredMechanic, mechanic }: MechanicComp) => {
  const [allMechanics, setAllMechanics]: any = useState([])
  const [featuredMechanics, setFeaturedMechanics]: any = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
            {featuredMechanics.length > 0 ? <FeatureMechanics featuredmechanics={featuredMechanics} /> : ""}
            {allMechanics.length > 0 ? <MechanicsInPakistan mechanics={allMechanics} /> : ""}
            {featuredMechanic.length == 0 && allMechanics.length == 0 ? <p className={styles.noData} >No Mechanic Data Found</p> : "" }
          </>
      }
    </div>
  );
};

export default Mechanic;