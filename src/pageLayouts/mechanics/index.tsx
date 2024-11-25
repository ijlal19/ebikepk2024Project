'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
// import { FeatureDelers } from './feature-dealers';
import { FeaturedDealerData } from './Data';
import { FeatureMechanics } from './feature-mechanics';
import { MechanicsInPakistan } from './mechanic-in-pakistan';
import { getAllMechanics, getFeaturedMechanics } from '@/functions/globalFuntions';
// import { DealerInPakistan } from './dealer-in-pakistan';
const Mechanic = () => {
  const [allMechanics, setAllMechanics]:any = useState([])
  const [featuredMechanics, setFeaturedMechanics]:any = useState([])

  useEffect(() => {
    fetchInfo() 
  },[])

  async function fetchInfo() {
    let res = await getAllMechanics()
    setAllMechanics(res)

    let res1 = await getFeaturedMechanics()
    setFeaturedMechanics(res1)
  }
  return (
    <div className={styles.main_dealer}>
      <FeatureMechanics featuredmechanics={featuredMechanics}/>

      <MechanicsInPakistan mechanics={allMechanics}/>
    </div>
   );
 };

export default Mechanic;