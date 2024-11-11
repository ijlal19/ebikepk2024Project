'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
// import { DealerDetailData ,moreDealers} from './Data'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import { useMediaQuery } from '@mui/material';
import { DealerDetailData, moreDealers } from '../dealer-details/Data';

const MechanicsDetails = () => {
  const isMobile = useMediaQuery('(max-width:562px)')
  return (

    <div className={styles.dealer_detail_main}>
      <div className={styles.container}>
        <div className={styles.first_detail_card_box}>
          <div className={styles.main_crad}>
            <div className={styles.image_box}>
              <img src={DealerDetailData.bike_brand.logoUrl} alt="" className={styles.image} />
            </div>
            <div className={styles.main_card_details}>
              <p className={styles.shop_name}>{DealerDetailData.shop_name}</p>
              <p className={styles.address}><BadgeIcon
              className={styles.icon}/>Mechanic in - {DealerDetailData.address.slice(36)}</p>
              <p className={styles.full_address}><LocationOnIcon
              className={styles.icon}/>{DealerDetailData.address}</p>
              <p className={styles.phone}><PhoneIcon
              className={styles.icon}/>{DealerDetailData.phone}</p>
            </div>
          </div>
        </div>
        <div className={styles.more_dealers}>
          <div className={styles.similar_dealer_heading_box}>
            <p className={styles.heading}>Similar Mechanics</p>
            <p className={styles.view_all_dealers}>View All Dealers</p>
          </div>
          <div className={styles.more_dealers_card}>
            {
           isMobile ?   moreDealers.dealers.map((e:any,i:any)=>{
                return(
                  <div className={styles.more_dealer_card_main} key={i}>
                    <div className={styles.more_dealer_image}>
                      <img src={e.bike_brand.logoUrl} alt=""  className={styles.image}/>
                    </div>
                    <div className={styles.detail_box_card}>
                      <p className={styles.shop_name}>{e.shop_name}</p>
                      <p className={styles.phone}>{e.phone}</p>
                      <button className={styles.btn}>View Details</button>
                    </div>
                  </div>
                )
              }):
             moreDealers.dealers.slice(0,3).map((e:any,i:any)=>{
                return(
                  <div className={styles.more_dealer_card_main} key={i}>
                    <div className={styles.more_dealer_image}>
                      <img src={e.bike_brand.logoUrl} alt=""  className={styles.image}/>
                    </div>
                    <div className={styles.detail_box_card}>
                      <p className={styles.shop_name}>{e.shop_name}</p>
                      <p className={styles.phone}>{e.phone}</p>
                      <button className={styles.btn}>View Details</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicsDetails;