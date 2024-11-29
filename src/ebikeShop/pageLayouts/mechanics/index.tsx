'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { FeatureMechanics } from './feature-mechanics';
import { MechanicsInPakistan } from './mechanic-in-pakistan';
import { getAllMechanics, getFeaturedMechanics } from '@/functions/globalFuntions';
import Loader from '@/sharedComponents/loader/loader';
const Mechanic = () => {
  const [allMechanics, setAllMechanics]:any = useState([])
  const [featuredMechanics, setFeaturedMechanics]:any = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchInfo() 
  },[])

  async function fetchInfo() {
    setIsLoading(true)
    let res = await getAllMechanics()
    setAllMechanics(res)
    if(!res){
      setIsLoading(true)
    }
    else{
      let res1 = await getFeaturedMechanics()
      setFeaturedMechanics(res1)
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
            <FeatureMechanics featuredmechanics={featuredMechanics}/>
            <MechanicsInPakistan mechanics={allMechanics}/>
          </>
      }
    </div>
   );
 };

export default Mechanic;