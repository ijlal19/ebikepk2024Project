'use client'
import { getAllbikesDetail, getAllFeaturedBike, getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions";
import { Box, Button, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import UsedBikesSection from '@/ebikeWeb/pageLayouts/home/usedbikeSection/index';
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData";
import ItemCard from '@/ebikeWeb/sharedComponents/itemCard/index';
import { Apps, FormatListBulleted } from '@mui/icons-material';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { priceWithCommas } from '@/genericFunctions/geneFunc';
import Filters from '@/ebikeWeb/sharedComponents/filters';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const AllUsedBike = () => {
    const isMobile = useMediaQuery('(max-width:991px)');
    const isMobile2 = useMediaQuery('(max-width:766px)');
    const [allBikesArr, setAllBikesArr] = useState([]);
    const [pageNo, setPageNo] = useState(-12);
    const [isLoading, setIsLoading] = useState(false);
    const [featuredData, setFeaturedData] = useState([]);
    const [isGridSelected, setIsGridSelected] = useState(false);
    const [showfilter, setshowfilter] = useState(false);


    const router = useRouter()

    useEffect(() => {
        fetchBikeInfo(pageNo)
        fetchFeaturedBike()
    }, [])

    async function fetchBikeInfo(_pageNo) {
        let curentFetchPage = _pageNo + 12
        setPageNo(curentFetchPage)
        setIsLoading(true)
        let res = await getAllbikesDetail(curentFetchPage)
        setAllBikesArr(res)
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }

    async function fetchFeaturedBike() {
        let res = await getAllFeaturedBike();
        if (res?.length > 0) {
            setFeaturedData(res)
        }
        else {
            setFeaturedData([])
        }
    }

    function goToDetailPage(val) {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        router.push(`/used-bikes/${urlTitle}/${val.id}`)
    }


    function longCard(val, ind) {
        let brand = getBrandFromId(val?.brandId, BrandArr)
        let city = getCityFromId(val?.cityId, CityArr)
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        let href = `/used-bikes/${urlTitle}/${val.id}`


        return (
            <>

                {ind % 4 == 0 ?
                    <div className={styles.banner}>
                        <img className={styles.baner_image} src={isMobile ? "https://res.cloudinary.com/dulfy2uxn/image/upload/v1608021415/Youtube%20Ad%20banners/ebike_banner_Black_1_syhm9t.jpg" : "https://res.cloudinary.com/dzfd4phly/image/upload/v1734594565/Artboard_271x-100_1_af7qlo.jpg"} />
                    </div> : ""}


                <Grid container key={ind} className={styles.long_card} onClick={() => { goToDetailPage(val) }}>
                    {/* <Link
                    href={href}
                    rel="noopener noreferrer"
                    key={ind}
                    className={styles.long_card_link}
                    // sx={{textDecoration:"none"}}
                > */}
                    <Grid item xs={isMobile ? 12 : 3.5} className={styles.bike_image_box}>
                        {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt="" /> : <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png" alt="" />}
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
                        <span> PKR {priceWithCommas(val?.price)}</span>
                    </Grid>

                </Grid>
                {/* </Link> */}
            </>

        )
    }

    function GridCard(val, ind) {
        let brand = getBrandFromId(val?.brandId, BrandArr)
        let city = getCityFromId(val?.cityId, CityArr)
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        let href = `/used-bikes/${urlTitle}/${val.id}`

        return (
            <Link
                href={href}
                key={ind}
                className={styles.grid_card}
                sx={{ textDecoration: "none" }}
            >
                <Grid container onClick={() => { goToDetailPage(val) }}>

                    <Grid item className={styles.grid_image_box}>
                        {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt="" /> : <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png" alt="" />}
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
            </Link>
        )
    }

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }
    return (
        <Box className={styles.main}>
            {
                !isLoading ?
                    <>
                        {
                            isMobile2 ? <Button disableRipple onClick={filtershow} className={styles.filter_button}>Filters</Button> : ''
                        }

                        <Box className={styles.usedBike_headingBpx}>
                            <Typography className={styles.headinh_sale}>Bike For Sale In Pakistan</Typography>
                            <Typography className={styles.path_text}> Home <span style={{ paddingLeft: 5, paddingRight: 5 }}>/</span>Used<span style={{ paddingLeft: 5, paddingRight: 5 }}>/</span>Bike For Sale In Pakistan</Typography>
                        </Box>

                        <UsedBikesSection from='featuredBike' featuredData={featuredData} />

                        <Box className={styles.all_bike_main}>
                            {
                                isMobile2 ?
                                    showfilter ? <Filters
                                        setLoader={setIsLoading}
                                        updateData={setAllBikesArr}
                                        fetchBikeInfo={fetchBikeInfo}
                                    /> : '' :
                                    <Filters
                                        setLoader={setIsLoading}
                                        updateData={setAllBikesArr}
                                        fetchBikeInfo={fetchBikeInfo}
                                    />
                            }
                            <div className={styles.main_box}>
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
                                    {allBikesArr?.length > 0 && allBikesArr.map((val, ind) => {
                                        return (
                                            isGridSelected ? GridCard(val, ind) : longCard(val, ind)
                                        )
                                    })}
                                </div>


                                <div className={styles.viewMoreBtnContainer} >
                                    <button onClick={() => { fetchBikeInfo(pageNo) }} className={`${styles.viewMoreBtn} ${isLoading ? styles.viewMoreBtnDisabled : ""}`} > View More </button>
                                </div>
                            </div>


                            <Box className={styles.add_area}>
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
                                    <Link href="/dealers" rel="noopener noreferrer">
                                        <img
                                            src="https://res.cloudinary.com/dzfd4phly/image/upload/v1745664709/52_mgjfps.jpg"
                                            alt="/dealer"
                                            className={styles.add_image} />
                                    </Link>
                                    <Link href="/mechanics" rel="noopener noreferrer">
                                        <img
                                            src="https://res.cloudinary.com/dzfd4phly/image/upload/v1745664645/51_perxlq.jpg"
                                            alt="/mechanic"
                                            className={styles.add_image} />
                                    </Link>
                                    <Link href="/blog" rel="noopener noreferrer">
                                        <img
                                            src="https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg"
                                            alt="/forum"
                                            className={styles.add_image} />
                                    </Link>
                                </Box>
                            </Box>
                        </Box></>
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

export default AllUsedBike;