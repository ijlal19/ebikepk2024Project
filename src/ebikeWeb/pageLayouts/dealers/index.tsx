'use client';
import { getFeaturedDealer, getAllDealer } from "@/ebikeWeb/functions/globalFuntions";
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { DealerInPakistan } from './dealer-in-pakistan';
import { FeatureDelers } from './feature-dealers';
import { useMemo, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getMechanicTypeFilterOptions, matchesMechanicType } from '@/constants/mechanicType';

type DealerComp = {
  featuredDelaer: any;
  delaer: any;
  seoHeading?: string;
  seoIntro?: string;
  seoTags?: string[];
};

const Dealer = ({ featuredDelaer, delaer, seoHeading, seoIntro, seoTags = [] }: DealerComp) => {

  const [allDealers, setAllDealers] = useState<any[]>(Array.isArray(delaer) ? delaer : [])
  const [featuredDealers, setFeaturedDealers] = useState<any[]>(Array.isArray(featuredDelaer) ? featuredDelaer : [])
  const [isLoading, setIsLoading] = useState(!(featuredDelaer?.length > 0 || delaer?.length > 0))
  const [selectedType, setSelectedType] = useState<"all" | 1 | 2>("all")
  const [selectedBrand, setSelectedBrand] = useState("all")

  const normalizeBrand = (brandName?: string) => (brandName || "").trim().toLowerCase()

  const formatBrandName = (brandName: string) => {
    return brandName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const topBrands = useMemo(() => {
    const brandMap = new Map<string, { name: string; count: number }>()
    const dealerMap = new Map<string | number, any>()

    allDealers.forEach((dealer: any, index) => dealerMap.set(dealer?.id || `all-${index}`, dealer))
    featuredDealers.forEach((dealer: any, index) => dealerMap.set(dealer?.id || `featured-${index}`, dealer))

    Array.from(dealerMap.values())
      .filter((dealer: any) => matchesMechanicType(dealer, selectedType))
      .forEach((dealer: any) => {
        const brandName = dealer?.bike_brand?.brandName
        const brandKey = normalizeBrand(brandName)
        if (!brandKey) return

        const current = brandMap.get(brandKey)
        brandMap.set(brandKey, {
          name: brandName,
          count: current ? current.count + 1 : 1,
        })
      })

    const sortedBrands = Array.from(brandMap.entries())
      .sort((a, b) => b[1].count - a[1].count || a[1].name.localeCompare(b[1].name))
      .slice(0, 5)
      .map(([key, value]) => ({ key, label: formatBrandName(value.name) }))

    if (brandMap.has("suzuki") && !sortedBrands.some((brand) => brand.key === "suzuki")) {
      sortedBrands.push({ key: "suzuki", label: "Suzuki" })
    }

    return sortedBrands
  }, [allDealers, featuredDealers, selectedType])

  const applyTypeFilter = (type: "all" | 1 | 2) => {
    setSelectedType(type)
    setSelectedBrand("all")
  }

  const filterDealers = (dealers: any[]) => {
    return dealers.filter((item: any) => {
      const matchesType = matchesMechanicType(item, selectedType)
      const matchesBrand = selectedBrand === "all" || normalizeBrand(item?.bike_brand?.brandName) === selectedBrand

      return matchesType && matchesBrand
    })
  }

  const hasInitialData = featuredDelaer?.length > 0 || delaer?.length > 0;

  useEffect(() => {
    if (hasInitialData) {
      setIsLoading(false)
      return
    }

    async function fetchInfo() {
      const res1: any = await getFeaturedDealer()
      if (res1?.length > 0) {
        setFeaturedDealers(res1)
      } else {
        setFeaturedDealers([])
      }

      const res2: any = await getAllDealer()
      if (res2?.length > 0) {
        setAllDealers(res2)
      } else {
        setAllDealers([])
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
            <ul className={styles.seo_tags} aria-label="Related dealer searches">
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
              <span className={styles.filter_label}>Dealer Type</span>
              <div className={styles.filter_tabs}>
                {getMechanicTypeFilterOptions("dealer").map((option) => {
                  const isActive = selectedType === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => applyTypeFilter(option.value)}
                      className={`${styles.filter_tab} ${isActive ? styles.filter_tab_active : ""}`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {topBrands.length > 0 ? (
              <div className={styles.filter_bar}>
                <span className={styles.filter_label}>Top Bike Brands</span>
                <div className={`${styles.filter_tabs} ${styles.brand_tabs}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedBrand("all")}
                    className={`${styles.filter_tab} ${selectedBrand === "all" ? styles.filter_tab_active : ""}`}
                  >
                    All Brands
                  </button>
                  {topBrands.map((brand) => (
                    <button
                      key={brand.key}
                      type="button"
                      onClick={() => setSelectedBrand(brand.key)}
                      className={`${styles.filter_tab} ${selectedBrand === brand.key ? styles.filter_tab_active : ""}`}
                    >
                      {brand.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : ""}
            {filterDealers(featuredDealers).length > 0 ? <FeatureDelers featuredDealers={filterDealers(featuredDealers)} selectedType={selectedType} /> : "" }
            {filterDealers(allDealers).length > 0 ? <DealerInPakistan dealers={filterDealers(allDealers)} selectedType={selectedType} /> : "" }
            { filterDealers(featuredDealers).length == 0 &&  filterDealers(allDealers).length == 0 ? <p className={styles.noData} > No Dealer Data Found </p> : "" }
          </>
      }
    </div>
  );
};

export default Dealer;
