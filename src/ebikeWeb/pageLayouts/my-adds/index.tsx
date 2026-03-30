'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useRouter } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { getMyAds, MarkBikeAsSold } from '@/ebikeWeb/functions/globalFuntions'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'
import {isLoginUser} from "@/genericFunctions/geneFunc";
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider'

const MyAddComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleteRequestLoading, setIsDeleteRequestLoading] = useState(false)
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
    }, [router])

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

    async function handleDeleteAccountRequest() {
        try {
            setIsDeleteRequestLoading(true)

            const response = await fetch('/api/delete-account-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: customer?.id
                })
            })

            const result = await response.json()

            if (!response.ok || !result?.success) {
                throw new Error(result?.message || 'Unable to submit delete account request')
            }

            alert('We have received your account deletion request. We will process it within 7 working days.')
        } catch (error) {
            console.error('Delete account request failed', error)
            alert('Unable to submit delete account request right now. Please try again later.')
        } finally {
            setIsDeleteRequestLoading(false)
        }
    }

    return (
        <Box className={styles.add_main}>
            < Box className={styles.slider_main}>
            <Typography className={styles.heading}>
                My Ads
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
            {customer !== 'not_login' && (
                <Box className={styles.delete_account_wrapper}>
                    <Button
                        className={styles.delete_account_btn}
                        variant="contained"
                        onClick={handleDeleteAccountRequest}
                        disabled={isDeleteRequestLoading}
                    >
                        {isDeleteRequestLoading ? 'Sending...' : 'Delete my account'}
                    </Button>
                </Box>
            )}
            </Box>
        </Box >
    )
}
export default MyAddComponent
