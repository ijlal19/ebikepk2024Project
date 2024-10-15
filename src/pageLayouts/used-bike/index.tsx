"use client"
import React, { useState, useEffect } from 'react'
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { getSinglebikesDetail, numericOnly, getBrandFromId, getCityFromId, getYearFromId} from "@/functions/globalFuntions"
import Router from 'next/router'
import Data from './data'
import { CityArr, BrandArr, YearArr } from "@/constants/globalData"


export default function UsedBike() {

  const [bikeDetail, setBikeDetail] : any = useState({})
  const [similarBikeArr, setSimilarBikeArr] : any = useState([])
  const [isLoading, setIsLoading]  = useState(false)
  const [showPhoneNo, setShowPhoneNo] = useState(false)

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

  console.log('bikeYear', bikeYear, bikeDetail.yearId, YearArr)
  console.log('bikeCity', bikeCity, bikeDetail.cityId, CityArr)
  console.log('bikeBrand', bikeBrand, bikeDetail.brandId, BrandArr)

  return (
    <main className={`${styles.main_container} used_bike_detail_pg`}>
      <div className={styles.container_one}>
        
        <h1 className={styles.title}> {bikeDetail.title}  </h1>
        
        <Swiper 
          spaceBetween={50} 
          slidesPerView={1} 
          onSlideChange={() => console.log('slide change')} 
          onSwiper={(swiper) => console.log(swiper)} 
          modules={[Navigation, Pagination]}
        >
          {
            bikeDetail.images && bikeDetail.images.length > 0 && 
            bikeDetail.images.map((imgUrl:any, ind:any) => {
              return(
                <SwiperSlide key={imgUrl}>
                  <img src={imgUrl} alt="Random Image 1" style={{ width: "100%" }}/>
                </SwiperSlide>
              )
            })
          }
         
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
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
                  <p className={styles.info_field}> CC </p>
                  <p className={styles.info_field}> { bikeDetail.cc } </p>
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
    {/* <div className={styles.container_three}>
        <div className={styles.owner_detail_head}>
          <h1 className={styles.details_heading} >Seller Details</h1>
          <div className={styles.owner_name}>
          <small>Ahmed</small>
          <small>Member Since Mar 05, 2020</small>
          <div className={styles.icons}>
            <span className={styles.contact} ></span>
            <span className={styles.message}></span>
            <span className={styles.facebook}></span>
          </div>
          <p>See if your friends know this seller</p>
          <span>Connect with facebook</span>
          </div>
        </div>
      </div> */}
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
  );
}