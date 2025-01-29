"use client"
import React, { useState, useEffect } from 'react'
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { getSinglebikesDetail, numericOnly, getBrandFromId, getCityFromId, getYearFromId, priceWithCommas} from "@/ebikeWeb/functions/globalFuntions"
import Data from './data'
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData"
import { useRouter } from 'next/navigation'
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider/index';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'

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
        setIsLoading(true)
        let res = await getSinglebikesDetail(adsId);
        setIsLoading(false)
        if(res) {
          if(res.add) { 
            if(res?.add?.mobileNumber && res?.add?.mobileNumber?.charAt(0) != "0"){
              res.add.mobileNumber = '0' + res.add.mobileNumber
            }
            setBikeDetail(res.add)
          }
          else {
            
          }
          setSimilarBikeArr(res.bikes)
          setShowPhoneNo(false)
         setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
        }
      }
      else {
        setBikeDetail(Data.add)
        setSimilarBikeArr(Data.bikes)
      }
    }
  }

  let bikeBrand = getBrandFromId(bikeDetail?.brandId, BrandArr)
  let bikeCity = getCityFromId(bikeDetail?.cityId, CityArr)
  let bikeYear = getYearFromId(bikeDetail?.yearId, YearArr)

  return (
    !isLoading && bikeDetail  ? 
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
              bikeDetail.images && bikeDetail.images.length > 0 ? 
              bikeDetail.images.map((imgUrl:any, ind:any) => {
                return(
                  <SwiperSlide key={imgUrl}>
                    <img src={imgUrl} alt={bikeDetail?.title}  className={styles.slider_img}/>
                  </SwiperSlide>
                )
              }):
              <SwiperSlide key=''>
              <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'  alt={bikeDetail?.title}  className={styles.slider_img}/>
            </SwiperSlide>
            }
          </Swiper>
    

          <table width="100%" className={styles.info_content}>
              <tbody>
                <tr>
                  <td>
                    <p className={styles.info_field}> <b> Model </b> </p>
                    <p className={styles.info_field}> { bikeYear && bikeYear?.length > 0 && bikeYear[0].year } </p>
                  </td>
                  <td>
                    <p className={styles.info_field}> <b> Brand </b> </p>
                    <p className={styles.info_field}> { bikeBrand && bikeBrand.length > 0 && bikeBrand[0].brandName } </p>
                  </td>
                  <td>
                    <p className={styles.info_field}> <b> Bike CC  </b> </p>
                    <p className={styles.info_field}> { bikeDetail.cc }</p>
                  </td>
                </tr>
              </tbody>
          </table> 

          <table width="100%" className={styles.info_content}>
              <tbody>
                <tr>
                  <td className={styles.info_field_two}> <b> Location </b> </td>
                  <td className={styles.info_field_two}> { bikeCity && bikeCity.length > 0 && bikeCity[0].city_name } </td>
                  
                  <td className={styles.info_field_two}> <b> Posted On </b> </td>
                  <td className={styles.info_field_two}> { '' + bikeDetail?.createdAt?.slice(0, 10) } </td>
                </tr>
                <tr>
                  <td className={styles.info_field_two}> <b> Body Type </b> </td>
                  <td className={styles.info_field_two}>Standard</td>
                  <td className={styles.info_field_two}> <b> Ad ID </b>  </td>
                  <td className={styles.info_field_two}> { bikeDetail?.id } </td>
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
            <h2 className={styles.price_text} > PKR { priceWithCommas(bikeDetail.price) } </h2>
            <hr/>
            <p className={styles.sellerName}> Seller Name: { bikeDetail.sellerName } </p>
            <hr/>
            {!showPhoneNo ? 
            <p className={styles.seller_ph_text} onClick={() => setShowPhoneNo(true) }> Show Phone No </p> :
            <span className={styles.seller_ph_no} > { bikeDetail.mobileNumber.slice(
              0,4)}-{bikeDetail.mobileNumber.slice(4)} </span>
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
        <SwiperCarousels  sliderName='similarBikeSwiper' sliderData={similarBikeArr} from='usedBikeComp' currentpage="used_bike" onBtnClick={()=>{}} />
      </div>
    </div> :
   <div className={styles.load_main}>
   <div className={styles.load_div}>
     <Loader isLoading={isLoading} />
   </div>
   </div>
  );
}