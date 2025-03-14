'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useRouter } from 'next/navigation'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { getAllFeaturedBike,  getMyAds, MarkBikeAsSold } from '@/ebikeWeb/functions/globalFuntions'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'
import {isLoginUser} from "@/genericFunctions/geneFunc";
import ImgCard from '@/ebikeWeb/sharedComponents/itemCard'
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider'

const MyAddComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [MyAdsData, setMyAdsData] = useState([])
    const [customer, setCustomer]  = useState<any>('not_login')


    const router = useRouter()

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        console.log('_isLoginUser.info', _isLoginUser.info)
        if(_isLoginUser?.login) {
            setCustomer(_isLoginUser.info)
            getAllMyAds(_isLoginUser.info.id)
            return
        }
        else {
            setCustomer("not_login")
            router.push('/')
        }
    }, [])

    async function getAllMyAds(uid:any) {
        setIsLoading(true)
        let res = await getMyAds(uid);
        if (res?.length > 0) {
            setMyAdsData(res)
            setIsLoading(false)
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 1000);
            console.log('res', res)
            return
        }
        else {
            setMyAdsData([])
            setIsLoading(false)
        }
    }

    async function soldMark(bike:any) {
        var data = {
          is_sold : true
        }

        let res = await  MarkBikeAsSold(bike.id, data);
          if( res.adData && res.adData.is_sold == true ){
            alert('Ad sold out successfully')
          }else if( res.adData && res.adData.is_sold == false){
            alert('Your bike does not mark as sold')
          }else{
            alert(''+res.info)
          }
      }

    return (
        <Box className={styles.add_main}>
            < Box className={styles.slider_main}>
            <Typography className={styles.heading}>
                My-Adds
            </Typography>
            {
                !isLoading ?
                    <>
                        <SwiperCarousels sliderName='myAdsSwiper' sliderData={MyAdsData} from='myAdsComp' currentpage="" onBtnClick={soldMark} />
                    </>
                    :
                    <div className={styles.load_main}>
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
          </div>
            }
            </Box>
        </Box >
    )
}
export default MyAddComponent