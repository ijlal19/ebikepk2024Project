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
import { useEffect } from 'react'
import style from './index.module.scss'

const Index = () => {
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <>
     <BannerSection />
     <MobileBanner />
     <NewBikesSection/>
     <FeatureSection />
     <UsedBikesSection/>
     <BrandSection/>
     <Explore/>
     <BlogSection/>
     <Ourvideos/>
    </>
  )
}

export default Index