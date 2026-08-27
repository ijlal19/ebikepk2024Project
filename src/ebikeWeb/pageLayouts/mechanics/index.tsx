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
  seoHeading?: string;
  seoIntro?: string;
  seoTags?: string[];
};

const Mechanic = ({ featuredMechanic, mechanic, seoHeading, seoIntro, seoTags = [] }: MechanicComp) => {

  const [allMechanics, setAllMechanics]: any = useState(Array.isArray(mechanic) ? mechanic : [])
  const [featuredMechanics, setFeaturedMechanics]: any = useState(Array.isArray(featuredMechanic) ? featuredMechanic : [])
  const [isLoading, setIsLoading] = useState(!(featuredMechanic?.length > 0 || mechanic?.length > 0))
  const [selectedType, setSelectedType] = useState<"all" | 1 | 2>("all")

  const hasInitialData = featuredMechanic?.length > 0 || mechanic?.length > 0;

  useEffect(() => {
    if (hasInitialData) {
      setIsLoading(false)
      return
    }

    async function fetchInfo() {
      const res1: any = await getFeaturedMechanics()
      if (res1?.length > 0) {
        setFeaturedMechanics(res1)
      } else {
        setFeaturedMechanics([])
      }

      const res2: any = await getAllMechanics()
      if (res2?.length > 0) {
        setAllMechanics(res2)
      } else {
        setAllMechanics([])
      }

      setIsLoading(false)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 1000);
    }

    fetchInfo()
  }, [hasInitialData])

  return (
    <div className={styles.main_dealer}>
      {seoHeading ? (
        <section className={styles.seo_header}>
          <h1 className={styles.seo_heading}>{seoHeading}</h1>
          {seoIntro ? <p className={styles.seo_intro}>{seoIntro}</p> : null}
          {seoTags.length > 0 ? (
            <ul className={styles.seo_tags} aria-label="Related mechanic searches">
              {seoTags.slice(0, 7).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
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
