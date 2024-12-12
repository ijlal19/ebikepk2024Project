'use client'
import BannerSection from './bannerSection/index'
import FeatureSection from './featureSection/index'
import NewBikesSection from './newbikesSection/index'
import BrandSection from './brandSection/index'
import Explore from './exploresection/index'
import UsedBikesSection from './usedbikeSection/index'
import BlogSection from './blogSection/index'
import Ourvideos from './ourVideos/index'
import MobileBanner from './mobileBanner/index'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import {  isLoginUser } from '@/ebikeWeb/functions/globalFuntions'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'

import blogData from './blogSection/Data'
import youTubeData from './ourVideos/Data'
import usedBikeData from './usedbikeSection/Data'
import trendingData from './newbikesSection/TrendingData'
import featuredData from './newbikesSection/Data'


const Index = () => {

  const [homeData, setHomeData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(()=>{
    getHomeData()
  },[])

  async function getHomeData() {
    const gistUrl = "https://gist.githubusercontent.com/AbdulAhadHaroon/59c8b850de1090bcd563da31c9492426/raw/6c3f058f8f96c7da649a19757996501ba3a35401/gistfile1.json";
    setIsLoading(true)
    fetch(gistUrl).then((res) => {
      setIsLoading(false)
      if (!res.ok) {
        let obj = {
          "homeFeaturedBike": featuredData,
          "homeTrendingBike": trendingData,
          "homeUsedBike": usedBikeData,
          "homeYoutubeVideos": youTubeData,
          "homeBlogs": blogData
        }
        setHomeData(obj)
        return
      };
    
      return res.json();
    })
    .then((data) => {
        window.scrollTo(0, 0)
        setHomeData(data)
        console.log('res qq', data)
    })
    .catch((err) => {
      let obj = {
        "homeFeaturedBike": featuredData,
        "homeTrendingBike": trendingData,
        "homeUsedBike": usedBikeData,
        "homeYoutubeVideos": youTubeData,
        "homeBlogs": blogData
      }
      setHomeData(obj)
    });
  }

  return (
    isLoading ?
    <div className={styles.load_div}>
      <Loader isLoading={isLoading} />
    </div> :
    <>
     <BannerSection />
     <MobileBanner />
     <NewBikesSection featuredData={homeData.homeFeaturedBike} trendingData={homeData.homeTrendingBike} />
     <FeatureSection />
     <UsedBikesSection usedBikeData={homeData.homeUsedBike} />
     <BrandSection/>
     <Explore/>
     <BlogSection blogData={homeData.homeBlogs} />
     <Ourvideos/>
    </>
  )
}

export default Index