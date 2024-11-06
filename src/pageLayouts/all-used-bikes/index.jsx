'use client'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import { getAllbikesDetail } from "@/functions/globalFuntions"
import { Apps, FormatListBulleted } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import Filters from '@/sharedComponents/filters'

const AllUsedBike = () => {
    const isMobile = useMediaQuery('(max-width:991px)')
    const [allBikesArr, setAllBikesArr] = useState([])
    const [pageNo, setPageNo] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        fetchBikeInfo(pageNo)
    }, [])

    async function fetchBikeInfo(_pageNo) {
        let curentFetchPage = _pageNo + 1
        setPageNo(curentFetchPage)
        setIsLoading(true)
        let res = await getAllbikesDetail(curentFetchPage)
        setIsLoading(false)
        setAllBikesArr(res)
        // console.log(res)
        window.scrollTo(0, 0)
        console.log('res', res)
    }

    function goToDetailPage(val) {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        router.push(`/used-bikes/${urlTitle}/${val.id}`)
    }

    return (
        <Box className={styles.main}>
            <Box className={styles.usedBike_headingBpx}>
            <Typography className=
            {styles.headinh_sale}>Bike For Slae In Pakistan</Typography>
            <Typography className={styles.path_text}>Home<span style={{paddingLeft:5,paddingRight:5}}>/</span>Used<span style={{paddingLeft:5,paddingRight:5}}>/</span>Bike For Slae In Pakistan</Typography>
            </Box>
            <Box className={styles.all_bike_main}>
                
                <Filters 
                    setLoader={setIsLoading} 
                    updateData={setAllBikesArr}
                    fetchBikeInfo={fetchBikeInfo}
                />

                <div className={styles.main_box}>
                    <div className={styles.navigation}>
                        <div className={styles.text_container}>
                            <span className={styles.bike_text}> Used Bikes </span>
                        </div>
                        <div className={styles.swap_button_container}>
                            <span> <Apps className={styles.swap_icon} /> </span>
                            <span> <FormatListBulleted className={styles.swap_icon} /> </span>
                        </div>
                    </div>

                    <div className={styles.card_box}>
                        {allBikesArr.length > 0 && allBikesArr.map((val, ind) => {
                            return (
                                <Grid container className={styles.long_card} key={ind} onClick={() => { goToDetailPage(val) }}>
                                    
                                    <Grid item xs={isMobile ? 12 : 3.5} className={styles.bike_image}>
                                        {val.images && val.images.length > 0 ? <img src={val.images[0]} alt={'a'} className={styles.card_image} /> : ""}
                                    </Grid>

                                    <Grid item xs={isMobile ? 12 : 8} className={styles.card_info}>
                                        
                                        <Typography className={styles.titleandPrice}>
                                            <Typography className={styles.card_title}> {val.title} </Typography>
                                            <Typography className={styles.card_price_mobile}>PKR {val.price}</Typography>
                                        </Typography>
                                        
                                        <Typography className={styles.card_location}> {val?.city?.city_name} </Typography>
                                        
                                        <Typography className={styles.bike_details}>
                                            {val?.year?.year}<span style={{paddingLeft:10,paddingRight:7}}>|</span>3122km<span style={{paddingLeft:10,paddingRight:7}}>|</span>4 Stroke
                                        </Typography>
                                        
                                        {/* <Typography className={styles.price_section}>
                                           Cell: 0{val.mobileNumber}
                                        </Typography> */}
                                    </Grid>
                                    
                                    <Grid item className={styles.price_section_desktop}>
                                        <span> PKR {val.price}  </span>
                                    </Grid>

                                </Grid>
                            )
                        })}
                    </div>

                    <div className={styles.viewMoreBtnContainer} >
                        <button onClick={() => { fetchBikeInfo(pageNo) }} className={`${styles.viewMoreBtn} ${isLoading ? styles.viewMoreBtnDisabled : ""}`} > View More </button>
                    </div>
                </div>

                <Box className={styles.add_area}>
                    ads area
                </Box>
            </Box>
        </Box>
    )
}

export default AllUsedBike; 