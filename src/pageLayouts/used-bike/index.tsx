"use client"
import React, { useState, useEffect } from 'react'
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { getSinglebikesDetail, numericOnly, getBrandFromId, getCityFromId, getYearFromId} from "@/functions/globalFuntions"
import Router from 'next/router'
import Data from './data'
import { CityArr, BrandArr, YearArr } from "@/constants/globalData"
import { useRouter } from 'next/navigation'
import SwiperCarousels from '@/sharedComponents/swiperSlider/index';

export default function UsedBike() {

  const [bikeDetail, setBikeDetail] : any = useState({})
  const [similarBikeArr, setSimilarBikeArr] : any = useState([])
  const [isLoading, setIsLoading]  = useState(false)
  const [showPhoneNo, setShowPhoneNo] = useState(false)

  const router = useRouter()

  useEffect(() => {
      fetchBikeInfo()
  }, [])

  async function fetchBikeInfo() {
    let path = location.pathname
    
    if(path.indexOf('/') > -1) {
      let pathArr = path.split('/')
      let adsId = pathArr[pathArr.length - 1]
      
      if(numericOnly(adsId)) {
        let res = await getSinglebikesDetail(adsId);
        if(res) {
          setBikeDetail(res.add)
          setSimilarBikeArr(res.bikes)
          setShowPhoneNo(false)
          console.log('res', res)
        }
      }
      else {
        // Router.push('/')
        setBikeDetail(Data.add)
        setSimilarBikeArr(Data.bikes)
      }
    }
  }

  let bikeBrand = getBrandFromId(bikeDetail.brandId, BrandArr)
  let bikeCity = getCityFromId(bikeDetail.cityId, CityArr)
  let bikeYear = getYearFromId(bikeDetail.yearId, YearArr)

  // console.log('bikeYear', bikeYear, bikeDetail.yearId, YearArr)
  // console.log('bikeCity', bikeCity, bikeDetail.cityId, CityArr)
  // console.log('bikeBrand', bikeBrand, bikeDetail.brandId, BrandArr)

  return (
    <div className={styles.main_body}>
    <main className={`${styles.main_container} used_bike_detail_pg`}>
      
      <div className={styles.container_one}>
        
        <h1 className={styles.title}> {bikeDetail.title}  </h1>
        
        <Swiper 
          spaceBetween={50} 
          slidesPerView={1} 
          onSlideChange={() => console.log('slide change')} 
          onSwiper={(swiper) => console.log(swiper)} 
          modules={[Navigation, FreeMode]}
          navigation={true}
          initialSlide={0}
          loop={true}
          className='usedbikeDetailSwiper'
        >
          {
            bikeDetail.images && bikeDetail.images.length > 0 && 
            bikeDetail.images.map((imgUrl:any, ind:any) => {
              return(
                <SwiperSlide key={imgUrl}>
                  <img src={imgUrl} alt="Random Image 1"  className={styles.slider_img}/>
                </SwiperSlide>
              )
            })
          }
         
        </Swiper>
  

        <table width="100%" className={styles.info_content}>
            <tbody>
              <tr>
                <td>
                  <p className={styles.info_field}> Model </p>
                  <p className={styles.info_field}> { bikeYear && bikeYear?.length > 0 && bikeYear[0].year } </p>
                </td>
                <td>
                  <p className={styles.info_field}> Brand </p>
                  <p className={styles.info_field}> { bikeBrand && bikeBrand.length > 0 && bikeBrand[0].brandName } </p>
                </td>
                <td>
                  <p className={styles.info_field}> Bike CC </p>
                  <p className={styles.info_field}> { bikeDetail.cc } CC </p>
                </td>
              </tr>
            </tbody>
        </table> 

        <table width="100%" className={styles.info_content}>
            <tbody>
              <tr>
                <td className={styles.info_field_two}> Location </td>
                <td className={styles.info_field_two}> { bikeCity && bikeCity.length > 0 && bikeCity[0].city_name } </td>
                
                <td className={styles.info_field_two}>Posted On</td>
                <td className={styles.info_field_two}> { '' + bikeDetail?.createdAt?.slice(0, 10) } </td>
              </tr>
              <tr>
                <td className={styles.info_field_two}>Body Type</td>
                <td className={styles.info_field_two}>Standard</td>
                <td className={styles.info_field_two}>Ad ID </td>
                <td className={styles.info_field_two}>585746</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.seller_comments}>
            <h6 className={styles.bike_dec_title} > Bike Description </h6>
            <p className={styles.seller_comments_desc} dangerouslySetInnerHTML={{ __html: bikeDetail.description }} ></p>
          </div>
      </div>
     
    <div>
        <div className={styles.container_two}>
          <h2 className={styles.price_text} > PKR { bikeDetail.price } </h2>
          <hr/>
          <p className={styles.sellerName}> Seller Name: { bikeDetail.sellerName } </p>
          <hr/>
          {!showPhoneNo ? 
          <p className={styles.seller_ph_text} onClick={() => setShowPhoneNo(true) }> Show Phone No </p> :
          <span className={styles.seller_ph_no} > { bikeDetail.mobileNumber } </span>
          }
        </div>
    
        <div className={styles.container_four}>
          <div className={styles.transaction}>
            <h1 className={styles.tranc_text}>Instructions for Seller & Buyer</h1>
            <ol>
              <li> ebike.pk is not responsible for the authenticity/clearance of any motorcycle or its documents.</li>
              <li> Kindly Verify Motorcycle Papers and get the Clearance from RELEVANT AUTHORITY OF YOUR PROVINCE before finalizing the deal. </li>
              <li> Meet Safe Place for Finalizing your deal. </li>
            </ol>
          </div>
        </div>
      </div>

    </main>
    
    <div className={styles.similarBikeDiv}>
      <h6 className={styles.similar_heading}> Similar Bikes </h6>
      <SwiperCarousels  sliderName='similarBikeSwiper' sliderData={similarBikeArr} from='n'/>
    </div>
    
    </div>
  );
}