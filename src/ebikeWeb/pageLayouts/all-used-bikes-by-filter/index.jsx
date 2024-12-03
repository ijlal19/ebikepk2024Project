'use client'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import { getBikesBySpecificFilter, priceWithCommas, getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions"
import { Apps, FormatListBulleted } from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation'
import Filters from '@/ebikeWeb/sharedComponents/filters'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData"

const AllUsedBikeByFilter = () => {
    const isMobile = useMediaQuery('(max-width:991px)')
    const [allBikesArr, setAllBikesArr] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [heading, setHeading] = useState('')
    const [getAdFrom, setGetAdFrom] = useState(-10)
    const [isGridSelected, setIsGridSelected] = useState(false)

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        fetchBikeInfo()
    }, [])

    async function fetchBikeInfo() {
        setGetAdFrom(getAdFrom + 10)
        let from = params.slug
        setIsLoading(true)

        if (from?.indexOf('year') > -1) {
            let id = params.id1
            let res = await getBikesBySpecificFilter('year', id, getAdFrom + 10)
            setHeading('Used Bike For Year ' + params.id)
            console.log(res)
            setAllBikesArr(res)
            window.scrollTo(0, 0)
        }
        else if (from?.indexOf('cc') > -1) {
            let id = params.id
            let res = await getBikesBySpecificFilter('cc', id, getAdFrom + 10)
            setHeading('Used Bike By ' + params.id + ' CC')
            setAllBikesArr(res)
            window.scrollTo(0, 0)
        }
        else if (from?.indexOf('city') > -1) {
            let id = params.id1
            let res = await getBikesBySpecificFilter('city', id, getAdFrom + 10)
            setHeading('Used Bike For Sale in ' + params.id?.toUpperCase())
            setAllBikesArr(res)
            window.scrollTo(0, 0)
        }

        setIsLoading(false)
        window.scrollTo(0, 0)

    }


    function goToDetailPage(val) {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        router.push(`/used-bikes/${urlTitle}/${val.id}`)
    }

    function longCard(val, ind) {
        let brand = getBrandFromId(val?.brandId, BrandArr)
        let city = getCityFromId(val?.cityId, CityArr)
        return (
            <Grid container className={styles.long_card} key={ind} onClick={() => { goToDetailPage(val) }}>

                <Grid item xs={isMobile ? 12 : 3.5} className={styles.bike_image_box}>
                    {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt={'a'} /> : ""}
                </Grid>

                <Grid item xs={isMobile ? 12 : 8} className={styles.card_info}>

                    <Typography className={styles.card_title}> {val?.title} </Typography>

                    <Typography className={styles.card_location}> {val?.city?.city_name} </Typography>

                    <Typography className={styles.bike_details}>
                        {val?.year?.year}
                        <span className={styles.verticl_line}> | </span>
                        <span> {brand && brand?.length > 0 && brand[0].brandName} </span>
                        <span className={styles.verticl_line}> | </span>
                        <span className={styles.verticl_line}> {city && city?.length > 0 && city[0].city_name} </span>
                    </Typography>

                    <Typography className={styles.card_price_mobile}>PKR {priceWithCommas(val?.price)}</Typography>

                </Grid>

                <Grid item className={styles.price_section_desktop}>
                    <span> PKR {priceWithCommas(val?.price)}  </span>
                </Grid>

            </Grid>
        )
    }

    function GridCard(val, ind) {
        let brand = getBrandFromId(val?.brandId, BrandArr)
        let city = getCityFromId(val?.cityId, CityArr)
        return (
            <Grid container className={styles.grid_card} key={ind} onClick={() => { goToDetailPage(val) }}>

                <Grid item className={styles.grid_image_box}>
                    {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt={'a'} /> : ""}
                </Grid>

                <Grid item className={styles.grid_card_info}>

                    <Typography className={styles.grid_card_title}> {val?.title} </Typography>

                    <Typography className={styles.grid_card_location}> {val?.city?.city_name} </Typography>

                    <Typography className={styles.grid_card_price}>PKR {priceWithCommas(val?.price)}</Typography>

                    <Typography className={styles.grid_bike_details}>
                        {val?.year?.year}
                        <span className={styles.grid_verticl_line}> | </span>
                        <span> {brand && brand?.length > 0 && brand[0].brandName} </span>
                        <span className={styles.grid_verticl_line}> | </span>
                        <span className={styles.grid_verticl_line}> {city && city?.length > 0 && city[0].city_name} </span>
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box className={styles.main}>
            {
                !isLoading ?

                    <Box className={styles.all_bike_main}>

                        <div className={styles.main_box}>

                            <h5 className={styles.heading}> {heading}</h5>

                            <div className={styles.navigation}>
                                <div className={styles.text_container}>
                                    <span className={styles.bike_text}> Used Bikes </span>
                                </div>
                                <div className={styles.swap_button_container}>
                                    <span> <Apps className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
                                    <span> <FormatListBulleted className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
                                </div>
                            </div>

                            <div className={`${isGridSelected ? styles.grid_bike_list : ""} ${!isGridSelected ? styles.bike_ad_list : ""} `}>
                                {allBikesArr.length > 0 && allBikesArr.map((val, ind) => {
                                    return (
                                        isGridSelected ? GridCard(val, ind) : longCard(val, ind)
                                    )
                                })}
                            </div>

                            <div className={styles.viewMoreBtnContainer} >
                                <button onClick={() => { fetchBikeInfo() }} className={`${styles.viewMoreBtn} ${isLoading ? styles.viewMoreBtnDisabled : ""}`} > View More </button>
                            </div>

                        </div>

                        <Box className={styles.add_area}>

                        </Box>
                    </Box>
                    : 
                    <div>
                        <Loader isLoading={isLoading} />
                    </div>
            }
        </Box>
    )
}

export default AllUsedBikeByFilter; 