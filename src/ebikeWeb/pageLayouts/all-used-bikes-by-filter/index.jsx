'use client'
import { getBikesBySpecificFilter, getBrandFromId, getCityFromId, getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData";
import { Box, Grid, Link, Pagination, Typography, useMediaQuery } from '@mui/material';
import BrandFilter from "@/ebikeWeb/sharedComponents/brand_filter";
import { Apps, FormatListBulleted } from '@mui/icons-material';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { priceWithCommas } from '@/genericFunctions/geneFunc';
import Filters from '@/ebikeWeb/sharedComponents/filters';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

const AllUsedBikeByFilter = () => {
    const isMobile = useMediaQuery('(max-width:991px)');
    const IsMobile2 = useMediaQuery('(max-width:768px)');
    const [allBikesArr, setAllBikesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [heading, setHeading] = useState('');
    const [getAdFrom, setGetAdFrom] = useState(-10);
    const [isGridSelected, setIsGridSelected] = useState(false);
    const [filterShow, setFilterShow] = useState(false)

    const [totalPage, setTotalPage] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        fetchBikeInfo()
        if (params.slug == "bike-by-brand") {
            setFilterShow(true)
        }
        else {
            setFilterShow(false)
        }
    }, [])

    const capitalizeFirstWord = (str) => {
        return str.replace(/^\s*\w/, (match) => match.toUpperCase());
    };

    const handlePaginationChange = async (event, page) => {
        fetchBikeInfo(page)
    }

    async function fetchBikeInfo(_page) {

        setGetAdFrom(getAdFrom + 10)
        let from = params.slug
        setIsLoading(true)

        if (from?.indexOf('year') > -1) {
            let id = params?.id1
            let Obj = {
                years_filter: [id],
                page:_page,
                adslimit:12
            }
            let res = await getCustomBikeAd(Obj)

            if (res?.data?.length > 0) {
                setCurrentPage(res?.currentPage)
                setAllBikesArr(res?.data)
                setTotalPage(res?.pages)
                setHeading('Used Bike For Year ' + params.id)
                console.log("data", res)
            }
            else {
                setCurrentPage(res?.data?.currentPage)
                setAllBikesArr([])
                setTotalPage(0)
            }
        }

        else if (from?.indexOf('cc') > -1) {
            let id = params.id
            let Obj = {
                cc: [id],
                page: _page,
                adslimit: 12
            }

            let res = await getCustomBikeAd(Obj)
            console.log("data" , res)

            if (res?.data?.length > 0) {
                setHeading('Used Bike By ' + capitalizeFirstWord(params.id) + "CC")
                setCurrentPage(res?.currentPage)
                setAllBikesArr(res?.data)
                setTotalPage(res?.pages)
            }
            else {
                setCurrentPage(res?.data?.currentPage)
                setAllBikesArr([])
                setTotalPage(0)
            }
        }

        else if (from?.indexOf('brand-and-city') > -1) {
          let BrandId = params.id
          let CityId = params.id1
            let Obj = {
                city_filter: [CityId],
                brand_filter: [BrandId],
                page: _page,
                adslimit: 12
            }

            let res = await getCustomBikeAd(Obj)
            console.log("data" , res)

            if (res?.data?.length > 0) {
                setHeading('Used Bike By ' + capitalizeFirstWord(res?.data[0]?.bike_brand?.brandName) + " in " + capitalizeFirstWord(res?.data[0]?.city?.city_name))
                setCurrentPage(res?.currentPage)
                setAllBikesArr(res?.data)
                setTotalPage(res?.pages)
            }
            else {
                setCurrentPage(res?.data?.currentPage)
                setAllBikesArr([])
                setTotalPage(0)
            }
        }

        else if (from?.indexOf('city') > -1) {
          let id = params.id1
            let Obj = {
                city_filter: [id],
                page: _page,
                adslimit: 12
            }

            let res = await getCustomBikeAd(Obj)

            if (res?.data?.length > 0) {
                setHeading('Used Bike For Sale in ' + capitalizeFirstWord(params.id))
                setCurrentPage(res?.currentPage)
                setAllBikesArr(res?.data)
                setTotalPage(res?.pages)
            }
            else {
                setCurrentPage(res?.data?.currentPage)
                setAllBikesArr([])
                setTotalPage(0)
            }
        }

        else if (from?.indexOf('brand') > -1) {
            let id = params.id1
            let Obj = {
                brand_filter: [id],
                page: _page,
                adslimit: 12
            }

            let res = await getCustomBikeAd(Obj)

            if (res?.data?.length > 0) {
                setHeading('Used Bike By ' + capitalizeFirstWord(params.id))
                setCurrentPage(res?.currentPage)
                setAllBikesArr(res?.data)
                setTotalPage(res?.pages)
            }
            else {
                setCurrentPage(res?.data?.currentPage)
                setAllBikesArr([])
                setTotalPage(0)
            }
        }

        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);

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
            <>
                {ind % 4 == 0 ?
                    <div className={styles.banner}>
                        <img className={styles.baner_image} src={isMobile ? "https://res.cloudinary.com/dulfy2uxn/image/upload/v1608021415/Youtube%20Ad%20banners/ebike_banner_Black_1_syhm9t.jpg" : "https://res.cloudinary.com/dzfd4phly/image/upload/v1734594565/Artboard_271x-100_1_af7qlo.jpg"} />
                    </div> : ""}

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
            </>
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
            <h5 className={styles.heading1}> {heading}</h5>
            {
                !isLoading ?
                    <Grid container className={styles.grid_container}>

                        <Grid item xs={IsMobile2 ? 12 : 2.5} className={styles.filter_grid} >
                            {
                                filterShow ?
                                    <BrandFilter /> : ""
                            }
                        </Grid>

                        <Grid item xs={IsMobile2 ? 12 : 7.5} className={styles.cards_grid} >
                            <h5 className={styles.heading2}> {heading}</h5>

                            <Box className={styles.all_bike_main}>
                                <div className={styles.main_box}>

                                    {/* <h5 className={styles.heading}> {heading}</h5> */}

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

                                    {/* <div className={styles.viewMoreBtnContainer} >
                                        <button onClick={() => { fetchBikeInfo() }} className={`${styles.viewMoreBtn} ${isLoading ? styles.viewMoreBtnDisabled : ""}`} > View More </button>
                                    </div> */}

                                    {allBikesArr?.length > 0 ?
                                        <Box className={styles.used_bike_list_pagination}>
                                            <Pagination
                                                count={totalPage}
                                                onChange={handlePaginationChange}
                                                page={currentPage}
                                            />
                                        </Box>
                                        : ""}

                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={IsMobile2 ? 12 : 2} className={styles.add_area}>
                            <Box className={styles.add_box}>
                                <Link href="https://youtube.com/ebikepk" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="https://res.cloudinary.com/dulfy2uxn/image/upload/v1608620216/Animated_Banner_Gif_3_txcj9p.gif"
                                        alt="eBike YouTube Banner"
                                        className={styles.add_image} />
                                </Link>
                                <Link href="/forum" rel="noopener noreferrer">
                                    <img
                                        src="https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg
                                            "
                                        alt="/forum"
                                        className={styles.add_image} />
                                </Link>
                                <Link href="/blog" rel="noopener noreferrer">
                                    <img
                                        src="https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg                                            "
                                        alt="/forum"
                                        className={styles.add_image} />
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>

                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    )
}

export default AllUsedBikeByFilter;