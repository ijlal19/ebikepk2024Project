'use client';
import { getSimilarDealers, getSingleDealerDetails } from "@/ebikeWeb/functions/globalFuntions";
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter, useParams } from 'next/navigation';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';

const DealerDetails = () => {
  const [dealersDetails, setDealerDetails]: any = useState([])
  const [similarDealers, setSimilarDealers]: any = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    fetchInfo()
  }, [])

  async function fetchInfo() {
    if (params.dealerid) {
      setIsLoading(true)
      let res = await getSingleDealerDetails(params.dealerid)
      console.log("data", res)
      if (res) {
        if (res?.phone && res?.phone?.charAt(0) != '0') {
          res.phone = '0' + res.phone
        }
        setDealerDetails(res)
      }

      if (res.brand_id) {
        let res1 = await getSimilarDealers(res.brand_id)
        if (res1) {
          res1?.dealers?.map((e: any, i: any) => {
            if (e?.phone?.charAt(0) != '0') {
              e.phone = '0' + e.phone
            }
            setSimilarDealers(res1.dealers)
          })
        }
        setIsLoading(false)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
      }
    }
  }

  function goToDetailPage(bike: any) {
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
            {dealersDetails ?
              <div className={styles.dealer_detail_main}>
                <div className={styles.container}>
                  <div className={styles.first_detail_card_box}>
                    <div className={styles.main_crad}>
                      <div className={styles.image_box}>
                        <img src={cloudinaryLoader(dealersDetails?.bike_brand?.logoUrl, 100, "auto") } alt="" className={styles.image} />
                      </div>
                      <div className={styles.main_card_details}>
                        <p className={styles.shop_name}>{dealersDetails?.shop_name}</p>
                        <p className={styles.address}><BadgeIcon
                          className={styles.icon} />Dealer in - {dealersDetails?.city?.city_name}</p>
                        <p className={styles.full_address}><LocationOnIcon
                          className={styles.icon} />{dealersDetails?.address}</p>
                        <p className={styles.phone}><PhoneIcon
                          className={styles.icon} />{dealersDetails?.phone?.slice(0, 4)}-{dealersDetails?.phone?.slice(4)}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.more_dealers}>
                    <div className={styles.similar_dealer_heading_box}>
                      <p className={styles.heading}>Similar Dealers</p>
                      <p onClick={() => router.push('/dealers')} className={styles.view_all_dealers}>View All Dealers</p>
                    </div>
                    <div className={styles.more_dealers_card}>
                      {
                        isMobile ?
                          <>
                            {
                              similarDealers?.length > 0 ? similarDealers.map((e: any, i: any) => {
                                return (
                                  <div className={styles.more_dealer_card_main} key={i}>
                                    <div className={styles.more_dealer_image}>
                                      <img src={cloudinaryLoader(e.bike_brand.logoUrl, 100, "auto")} alt="" className={styles.image} />
                                    </div>
                                    <div className={styles.detail_box_card}>
                                      <p className={styles.shop_name}>{e.shop_name}</p>
                                      <p className={styles.phone}>{e?.phone?.slice(0, 4)}-{e?.phone?.slice(4)}</p>
                                      <button onClick={() => goToDetailPage(e)} className={styles.btn}>View Details</button>
                                    </div>
                                  </div>
                                )
                              }) : <></>
                            } :
                          </> :
                          similarDealers?.length > 0 ? similarDealers.slice(0, 3).map((e: any, i: any) => {
                            return (
                              <div className={styles.more_dealer_card_main} key={i}>
                                <div className={styles.more_dealer_image}>
                                  <img src={cloudinaryLoader(e.bike_brand.logoUrl, 100, "auto")} alt="" className={styles.image} />
                                </div>
                                <div className={styles.detail_box_card}>
                                  <p className={styles.shop_name}>{e.shop_name}</p>
                                  <p className={styles.phone}>{e?.phone?.slice(0, 4)}-{e?.phone?.slice(4)}</p>
                                  <button onClick={() => goToDetailPage(e)} className={styles.btn}>View Details</button>
                                </div>
                              </div>
                            )
                          }) : ""
                      }
                    </div>
                  </div>
                </div>
              </div> :
              <></>
            }</>
          :
          <div className={styles.load_main}>
            <div className={styles.load_div}>
              <Loader isLoading={isLoading} />
            </div>
          </div>
      }
    </>
  );
};

export default DealerDetails;

