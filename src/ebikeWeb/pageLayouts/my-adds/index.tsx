'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useRouter } from 'next/navigation'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { getAllFeaturedBike, isLoginUser } from '@/ebikeWeb/functions/globalFuntions'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'
import ImgCard from '@/ebikeWeb/sharedComponents/itemCard'
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider'
const MyAddComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [featuredData, setFeaturedData] = useState([])
    const [customer, setCustomer]  = useState<any>('not_login')


    const router = useRouter()

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if(_isLoginUser?.login) {
            setCustomer(_isLoginUser.info)
            fetchFeaturedBike()
            return
        }
        else {
            setCustomer("not_login")
            router.push('/')
        }
    }, [])

    async function fetchFeaturedBike() {
        setIsLoading(true)
        let res = await getAllFeaturedBike();
        if (res?.length > 0) {
            setFeaturedData(res)
            setIsLoading(false)
            window.scrollTo(0, 0)
            console.log('res', res)
            return
        }
        else {
            setFeaturedData([])
            setIsLoading(true)
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
                        {[featuredData]?.slice(0,2).map((data: any, index: any) => {
                            return (
                                    <SwiperCarousels key={index}  sliderName='bikesSectionSwiper' sliderData={data} from='newBikeComp' currentpage="" />
                                )
                            })
                        }
                    </>
                    :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
            </Box>
        </Box >
    )
}
export default MyAddComponent