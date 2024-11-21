'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { DealerDetailData ,moreDealers} from './Data'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import { useMediaQuery } from '@mui/material';
import { getSimilarDealers, getSingleDealerDetails } from "@/functions/globalFuntions"
import { useRouter, useParams } from 'next/navigation'

const DealerDetails = () => {
  const [dealersDetails, setDealerDetails]:any = useState([])
  const [similarDealers, setSimilarDealers]:any = useState([])

  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    fetchInfo() 
  },[])

  async function fetchInfo() {

    if(params.dealerid) {
      let res = await getSingleDealerDetails(params.dealerid)
      setDealerDetails(res)
      if(res.brand_id) {
        let res1 = await getSimilarDealers(res.brand_id)
        setSimilarDealers(res1.dealers)
        console.log(res1)
      }
      console.log(res)
    }
  }

  function goToDetailPage(bike:any) {
    var shop_name = bike.shop_name;
    shop_name = shop_name.replace(/\s+/g, '-');
    var lowerTitle = shop_name.toLowerCase();
    router.push(`/dealers/${lowerTitle}/${bike.id}`)
}


  const isMobile = useMediaQuery('(max-width:562px)')
  return (
    dealersDetails ?  
    <div className={styles.dealer_detail_main}>
      <div className={styles.container}>
        <div className={styles.first_detail_card_box}>
          <div className={styles.main_crad}>
            <div className={styles.image_box}>
              <img src={dealersDetails?.bike_brand?.logoUrl} alt="" className={styles.image} />
            </div>
            <div className={styles.main_card_details}>
              <p className={styles.shop_name}>{dealersDetails?.shop_name}</p>
              <p className={styles.address}><BadgeIcon
              className={styles.icon}/>Dealer in - {dealersDetails?.address?.slice(36)}</p>
              <p className={styles.full_address}><LocationOnIcon
              className={styles.icon}/>{dealersDetails?.address}</p>
              <p className={styles.phone}><PhoneIcon
              className={styles.icon}/>{dealersDetails?.phone}</p>
            </div>
          </div>
        </div>
        <div className={styles.more_dealers}>
          <div className={styles.similar_dealer_heading_box}>
            <p className={styles.heading}>Similar Dealers</p>
            <p onClick={()=> router.push('/dealers') }  className={styles.view_all_dealers}>View All Dealers</p>
          </div>
          <div className={styles.more_dealers_card}>
          {
           isMobile ? 
           <>
           {  
            similarDealers?.length > 0 ? similarDealers.map((e:any,i:any)=>{
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
              }): <></>
            } :
            </> :
              similarDealers?.length > 0 ? similarDealers.slice(0,3).map((e:any,i:any) => {
                return(
                  <div className={styles.more_dealer_card_main} key={i}>
                    <div className={styles.more_dealer_image}>
                      <img src={e.bike_brand.logoUrl} alt=""  className={styles.image}/>
                    </div>
                    <div className={styles.detail_box_card}>
                      <p className={styles.shop_name}>{e.shop_name}</p>
                      <p className={styles.phone}>{e.phone}</p>
                      <button onClick={()=> goToDetailPage(e)} className={styles.btn}>View Details</button>
                    </div>
                  </div>
                )
              }) : "" 
            }
          </div>
        </div>
      </div>
    </div> : <></>
  );
};

export default DealerDetails;

