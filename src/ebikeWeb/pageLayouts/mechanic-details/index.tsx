'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import { useMediaQuery } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { getSimilarMechanics, getSingleMechanicsDetails } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';

const MechanicsDetails = () => {
  
  const [MechanicsDetails, setMechanicsDetails]:any = useState([])
  const [similarMechanics, setSimilarMechanics]:any = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const params = useParams()
  const router = useRouter()
  
  useEffect(() => {
    fetchInfo() 
  },[])
  
  async function fetchInfo() {
    if(params.mechanicid) {
      setIsLoading(true)
      let res = await getSingleMechanicsDetails(params.mechanicid)
      setMechanicsDetails(res)
      if(res.brand_id) {
        let res1 = await getSimilarMechanics(res.brand_id)
        setSimilarMechanics(res1.dealers)
        setIsLoading(false)
        window.scrollTo(0, 0)
      }
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
    <>
     {
      !isLoading ?
      <>
        {
    MechanicsDetails ? 
    <div className={styles.dealer_detail_main}>
      <div className={styles.container}>
        <div className={styles.first_detail_card_box}>
          <div className={styles.main_crad}>
            <div className={styles.image_box}>
              <img src={MechanicsDetails?.bike_brand?.logoUrl} alt="" className={styles.image} />
            </div>
            <div className={styles.main_card_details}>
              <p className={styles.shop_name}>{MechanicsDetails?.shop_name}</p>
              <p className={styles.address}><BadgeIcon
              className={styles.icon}/>Mechanic in - {MechanicsDetails?.address?.slice(36)}</p>
              <p className={styles.full_address}><LocationOnIcon
              className={styles.icon}/>{MechanicsDetails?.address}</p>
              <p className={styles.phone}><PhoneIcon
              className={styles.icon}/>{MechanicsDetails?.phone}</p>
            </div>
          </div>
        </div>

        
        <div className={styles.more_dealers}>
          <div className={styles.similar_dealer_heading_box}>
            <p className={styles.heading}>Similar Mechanics</p>
            <p onClick={()=> router.push('/dealers') } className={styles.view_all_dealers}>View All Dealers</p>
          </div>
          <div className={styles.more_dealers_card}>
            {
           isMobile ? 
           <>{
            similarMechanics?.length > 0 ?similarMechanics.map((e:any,i:any)=>{
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
            }): <></>
           }:
           </>  :
             similarMechanics?.length > 0 ? similarMechanics.slice(0,3).map((e:any,i:any)=>{
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
              }): "" 
            }
          </div>
        </div>
      </div>
    </div>:<></>
    }
    </>
    :
    <div className={styles.load_div}>
          <Loader isLoading={isLoading} />
        </div>
    }
    </>

  );
};

export default MechanicsDetails;