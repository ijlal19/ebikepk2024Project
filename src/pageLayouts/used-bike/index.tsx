"use client"
import React, { useState, useEffect } from 'react'
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { getSinglebikesDetail, numericOnly } from "@/functions/globalFuntions"
import Router from 'next/router'
import Data from './data'


export default function UsedBike() {

  const [bikeDetail, setBikeDetail] : any = useState({})
  const [similarBikeArr, setSimilarBikeArr] : any = useState([])
  const [isLoading, setIsLoading]  = useState(false)
 
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
                <td><p className={styles.info_field}>  </p></td>
                <td><p className={styles.info_field}>4,900 km</p></td>
                <td><p className={styles.info_field}>4 Stroke</p></td>
              </tr>
            </tbody>
        </table> 

        <table width="100%" className={styles.info_content}>
            <tbody>
              <tr>
                <td className={styles.info_field_two}>Register in</td>
                <td className={styles.info_field_two}>Punjab</td>
                <td className={styles.info_field_two}>Last update:</td>
                <td className={styles.info_field_two}>Aug 28, 2024</td>
              </tr>
              <tr>
                <td className={styles.info_field_two}>Body Type</td>
                <td className={styles.info_field_two}>Standard</td>
                <td className={styles.info_field_two}>Ad ref #</td>
                <td className={styles.info_field_two}>585746</td>
              </tr>
            </tbody>
          </table>

          <h2 className={styles.feature_heading} >Bike Features</h2>
          <div className={styles.feature_class}>
            {/* <h2>Bike Features</h2> */}
            <span>Anti theft lock</span>
            <span>Disc brake</span>
            <span>led light</span>
            <p>Wind sheild</p>
            </div>
            <div className={styles.seller_comments}>
            <h3>Sellers Comments</h3>
            <p>Honda CB 125F 2023 model Total genion.</p>
            <p>Mention PakWheels.com when calling Seller to get a good deal</p>
          </div>
      </div>
     
    <div>
    <div className={styles.container_two}>
      <h2 className={styles.price_text} >PKR 3.35 lacs</h2>
      <hr/>
      <div className={styles.num_button}>
        <span className={styles.num_text} >1234564</span>
        <small className="block">show phone number</small>
      </div>
      <div className={styles.send_message}>Send message</div>
    </div>
    <div className={styles.container_three}>
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
      </div>
      <div className={styles.container_four}>
        <div className={styles.transaction}>
          <h1 className={styles.tranc_text}>Safety tips for transaction</h1>
          <ol>
            <li>Use a safe location to meet seller</li>
            <li>Avoid cash transactions</li>
            <li>Beware of unrealistic offers</li>
            <p>Learn More</p>
          </ol>
        </div>
      </div>
      <div className={styles.container_five}>
      <div className={styles.notify}>Notify As Sold</div>
      <div className={styles.report}>Report this Ad</div>
      </div>
      </div>
    </main>
  );
}