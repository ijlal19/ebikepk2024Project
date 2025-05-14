'use client'
import { getBrandFromId, getCityFromId, getCustomBikeAd } from "@/ebikeWeb/functions/globalFuntions";
import { Box, Button, Grid, Link, Typography, useMediaQuery, Pagination } from '@mui/material';
import UsedBikesSection from '@/ebikeWeb/pageLayouts/home/usedbikeSection/index';
import { isLoginUser, priceWithCommas } from '@/genericFunctions/geneFunc';
import { CityArr, BrandArr } from "@/ebikeWeb/constants/globalData";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Apps, FormatListBulleted } from '@mui/icons-material';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Filters from '@/ebikeWeb/sharedComponents/filters';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BrowseUsedBike from '../../sharedComponents/BrowseUsedBike'
import styles from './index.module.scss';

const AdsArray = [
    {
        href: 'https://youtube.com/ebikepk',
        alt: 'eBike YouTube Banner',
        url: "https://res.cloudinary.com/dulfy2uxn/image/upload/v1608620216/Animated_Banner_Gif_3_txcj9p.gif",
        target: "_blank"
    },
    {
        href: '/forum',
        alt: '/forum',
        url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg"
    },
    {
        href: '/dealers',
        alt: '/dealer',
        url: "https://res.cloudinary.com/dzfd4phly/image/upload/v1745664709/52_mgjfps.jpg"
    },
    {
        href: '/mechanics',
        alt: '/mechanic',
        url: "https://res.cloudinary.com/dzfd4phly/image/upload/v1745664645/51_perxlq.jpg"
    },
    {
        href: '/blog',
        alt: '/blog',
        url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg"
    }
]

export default function AllUsedBike ({ _allFeaturedBike, _allUsedBike }) {
    const [isGridSelected, setIsGridSelected] = useState(false);
    const [featuredData, setFeaturedData] = useState([]);
    const handleImage = useMediaQuery('(max-width:600px)')
    const isMobile2 = useMediaQuery('(max-width:768px)');
    const isMobile = useMediaQuery('(max-width:991px)');
    const [showfilter, setshowfilter] = useState(false);
    const [IsLogin, setIsLogin] = useState('not_login');
    const [allBikesArr, setAllBikesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false)
    const [pageNo, setPageNo] = useState(-12);

    const router = useRouter()

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            setIsLogin("not_login")
        }
        fetchBikeInfo(1)
        fetchFeaturedBike(1)
    }, [])

    const handlePaginationChange = async (event, page) => {
        fetchBikeInfo(page , true)
    }

    async function fetchBikeInfo(_pageNo, fromPagination) {
       
        setIsLoading(true)
        let obj = {
            adslimit: 12,
            page: _pageNo
        }

        let res = _allUsedBike
        if(!res || fromPagination) {
            res = await getCustomBikeAd(obj);
        }

        if (res?.data?.length > 0) {
            setCurrentPage(res?.currentPage)
            setAllBikesArr(res?.data)
            setTotalPage(res?.pages)
        }
        else {
            setCurrentPage(res?.data?.currentPage)
            setAllBikesArr([])
            setTotalPage(0)
        }

        setIsLoading(false)

        if(fromPagination) {
            setTimeout(() => {
                window.scrollTo({
                    top: 300,
                    behavior: 'smooth'
                  });
            }, 500);
        }
        else {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
            }, 500);
        }
       
    }

    async function fetchFeaturedBike() {

        let obj = {
            isFeatured: true,
            random: true,
            adslimit: 20
        }

        let res = _allFeaturedBike
        if(!res) {
            res = await getCustomBikeAd(obj);
        }
        
        if (res?.data?.length > 0) {
            setFeaturedData(res.data)
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

    const AddFavourite = (id) => {
        if (!IsLogin) {
            alert('Please Login To Add Favourite')
        }
        else {
            setIsFavourite(!isFavourite)
            const object = {
                userId: IsLogin?.id,
                bikeId: id
            }
            console.log("data", object)
        }
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

                <Grid container key={ind} className={styles.long_card}>
                    <Grid item xs={isMobile ? 12 : 3.5} className={styles.bike_image_box}>
                        <Box
                            sx={{
                                backgroundImage: `url(${val?.images[0]})`,
                                backgroundSize: handleImage ? '100% 100%' : 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: handleImage ? '150px' : "90%",
                                width: handleImage ? '100%' : "100%",
                            }}>
                            {
                                handleImage ?
                                    <Box className={styles.icon_box} onClick={() => AddFavourite(val?.id)}>
                                        {
                                            isFavourite ?
                                                <FavoriteIcon className={styles.icon} sx={{ color: 'red' }} />
                                                : <FavoriteBorderIcon className={styles.icon} sx={{ color: 'white' }} />
                                        }
                                    </Box> : ""
                            }
                        </Box>
                        {/* {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt="" /> : <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png" alt="" />} */}
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 8} className={styles.card_info}>

                        <Typography className={styles.card_title} onClick={() => { goToDetailPage(val) }}> {val?.title} </Typography>

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
                        {
                            !handleImage ?
                                <Box className={styles.fav_box}>
                                    <Box className={styles.icon_box} onClick={() => AddFavourite(val?.id)}>
                                        {
                                            isFavourite ?
                                                <FavoriteIcon className={styles.icon} sx={{ color: 'red' }} />
                                                : <FavoriteBorderIcon className={styles.icon} sx={{ color: 'grey' }} />
                                        }
                                    </Box>
                                    <Box className={styles.phone_box} onClick={() => { goToDetailPage(val) }} >
                                        < LocalPhoneIcon className={styles.icon} /> Show Phone No
                                    </Box>
                                </Box>
                                : ""
                        }
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
            // <Link
            //     href={href}
            //     key={ind}
            //     className={styles.grid_card}
            //     sx={{ textDecoration: "none" }}
            // >
            <Grid container key={ind} className={styles.grid_card}>

                <Grid item className={styles.grid_image_box}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${val?.images[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '100%', // ya jitni height chahiye
                            width: '100%',   // optional
                        }}>
                        <Box className={styles.icon_box} onClick={() => AddFavourite(val?.id)}>
                            {
                                isFavourite ?
                                    <FavoriteIcon className={styles.icon} sx={{ color: 'red' }} />
                                    : <FavoriteBorderIcon className={styles.icon} sx={{ color: 'white' }} />
                            }
                        </Box>
                    </Box>
                    {/* {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt="" /> : <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png" alt="" />} */}
                </Grid>

                <Grid item className={styles.grid_card_info}>

                    <Box className={styles.grid_icon_title}>
                        <Typography className={styles.grid_card_title} onClick={() => { goToDetailPage(val) }}> {val?.title}  </Typography>
                    </Box>

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
            // </Link>
        )
    }

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }

    return (
        <Box className={styles.main}>
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
                    
                    <Box className={styles.used_bike_filter}>
                        {
                            isMobile2 ?
                                showfilter ? <Filters
                                    setLoader={setIsLoading}
                                    updateData={setAllBikesArr}
                                    fetchBikeInfo={fetchBikeInfo}
                                    CurrentPage={setCurrentPage}
                                    TotalPage={setTotalPage}
                                /> : '' :
                                <Filters
                                    className={styles.used_bike_filter}
                                    setLoader={setIsLoading}
                                    updateData={setAllBikesArr}
                                    fetchBikeInfo={fetchBikeInfo}
                                    CurrentPage={setCurrentPage}
                                    TotalPage={setTotalPage}
                                />
                        }
                    </Box>
                    
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

                        {
                            !handleImage ?
                                allBikesArr?.length > 0 ?
                                    <Box className={styles.used_bike_desktop_pagination}>
                                        <Pagination
                                            count={totalPage}
                                            onChange={handlePaginationChange}
                                            page={currentPage}
                                        />
                                    </Box>
                                    : "" : ""
                        }
                    </div>


                    <Box className={styles.add_area}>
                        <Box className={styles.add_box}>
                            {
                                AdsArray?.map((e, i) => {
                                    return (
                                        <Link href={e?.href} key={i} target={e?.target} rel="noopener noreferrer">
                                            <img
                                                src={e?.url}
                                                alt={e?.alt}
                                                className={styles.add_image} />
                                        </Link>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.main_pagination}>
                    {
                        handleImage ?
                            allBikesArr?.length > 0 ?
                                <Box className={styles.used_bike_mobile_pagination}>
                                    <Pagination
                                        count={totalPage}
                                        onChange={handlePaginationChange}
                                        page={currentPage}
                                        className={styles.pagintation}
                                    />
                                </Box>
                                : "" : ""
                    }
                </Box>
                <BrowseUsedBike />
            </>

            <div className={styles.load_main}>
                <div className={styles.load_div}>
                    <Loader isLoading={isLoading} />
                </div>
            </div>
        </Box>
    )
}
