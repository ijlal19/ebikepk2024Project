'use client'
import BannerSection from './bannerSection/index'
import FeatureSection from './featureSection/index'
import NewBikesSection from './newbikesSection/index'
import BrandSection from './brandSection/index'
import Explore from './exploresection/index'
import UsedBikesSection from './usedbikeSection/index'
import BlogSection from './blogSection/index'
import MobileBanner from './mobileBanner/index'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { isLoginUser } from "@/genericFunctions/geneFunc";
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'

import blogData from './blogSection/Data'
import youTubeData from './ourVideos/Data'
import usedBikeData from './usedbikeSection/Data'
import trendingData from './newbikesSection/TrendingData'
import featuredData from './newbikesSection/Data'
import GoGreen from './go-green'
import Treanding_Stories from '@/ebikeWeb/sharedComponents/NewSectionM/trending_stories'
import { List_Card, MotorCycle_News_Card } from '@/ebikeWeb/sharedComponents/NewSectionM/card'

function Index() {

  const [homeData, setHomeData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    getHomeData()
  },[])

  async function getHomeData() {

    // const gistUrl = "https://gist.githubusercontent.com/AbdulAhadHaroon/59c8b850de1090bcd563da31c9492426/raw/6c3f058f8f96c7da649a19757996501ba3a35401/gistfile1.json";
    const gistUrl =  "https://gist.githubusercontent.com/AbdulAhadHaroon/59c8b850de1090bcd563da31c9492426/raw/72079447d17e9189938c831c0c1215457497766b/gistfile1.json"
    // setIsLoading(true)
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
        setIsLoading(false)
        console.log('res qq', data)
      })
      .catch((err) => {
        setIsLoading(false)
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
        <h1 style={{ textAlign:"center", fontSize:"20px", margin:"20px auto" }}> Pakistan’s #1 Marketplace for New & Used Bikes</h1>
        <NewBikesSection featuredData={homeData.homeFeaturedBike} trendingData={homeData.homeTrendingBike} />
        <FeatureSection />
        <UsedBikesSection usedBikeData={homeData.homeUsedBike} />
        <GoGreen />
        <BrandSection />
        <Explore />
        <BlogSection blogData={homeData.homeBlogs} />

        <details>
          <summary style={{display:"none"}}></summary>
          <section>
            <h1> Pakistan’s #1 Marketplace for New & Used Bikes</h1>
            <p>
              Ebike.pk is Pakistan’s most reliable and user-friendly online platform for buying and selling new bikes, used bikes, and electric bikes. Our website is designed to give buyers and sellers a fast, safe, and convenient experience, making the entire process smooth and hassle-free.

              If you’re looking for a new bike, Ebike.pk offers all the popular brands including Honda, Yamaha, Suzuki, Super Power, Road Prince, United, and many others. You can explore updated bike prices, compare models, check specifications, and find the best options according to your budget and needs.

              For used bike buyers, we provide verified listings where sellers upload clear images, mileage details, condition reports, and price demands. This helps buyers get a real understanding of the bike’s condition and current market value without visiting multiple showrooms.

              Ebike.pk also features a wide collection of electric bikes, offering eco-friendly and cost-efficient alternatives for daily commuting. With rising fuel prices, electric bikes are becoming a popular choice in Pakistan, and our platform helps you explore the latest EV models with complete details.

              Our goal is to make bike buying and selling in Pakistan simple, transparent, and accessible for everyone. New ads are added daily, giving users fresh listings to choose from. Whether you want to buy your next bike or sell your current one, Ebike.pk makes the process quick and easy.

              Selling your bike is completely free—just upload pictures, add important details, and your ad goes live instantly. Thousands of buyers visit our website every day, increasing your chances of a quick sale.

              Visit Ebike.pk today and experience a smarter way to buy and sell bikes across Pakistan.
            </p>
          </section>
        </details>

      </>
  )
}

export default Index
      // <Treanding_Stories />
      // <MotorCycle_News_Card />
      // <List_Card />