'use client'
import { getBikesBySpecificFilter, getBrandFromId, getCityFromId, getCustomBikeAd, getFavouriteBikeById } from "@/ebikeWeb/functions/globalFuntions";
import { getFavouriteAds, GetFavouriteObject, isLoginUser, priceWithCommas } from '@/genericFunctions/geneFunc';
import { BrandFilter, CC_Filter, CityFilter, YearFilter } from "@/ebikeWeb/sharedComponents/brand_filter";
import { Box, Button, Grid, Link, Pagination, Typography, useMediaQuery } from '@mui/material';
import { Apps, FormatListBulleted, PagesRounded } from '@mui/icons-material';
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData";
import BrowseUsedBike from "@/ebikeWeb/sharedComponents/BrowseUsedBike";
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from '@/ebikeWeb/sharedComponents/filters';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter, useParams } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import '../../../app/globals.scss';
import ItemCard from '../../sharedComponents/itemCard'

let SelectedADD = []

const AllUsedBikeByFilter = () => {

    const [AllFavouriteBike, setAllFavouriteBike] = useState([]);
    const [isGridSelected, setIsGridSelected] = useState(false);
    const [FavouriteData, setFavouriteData] = useState([]);
    const [SearchApply, setSearchApply] = useState(false);
    const [InputPlaceholder, setPlaceHolder] = useState('')
    const isMobileView = useMediaQuery('(max-width:600px)');
    const isMiniDesktopView = useMediaQuery('(max-width:1200px)');
    const isTabView = useMediaQuery('(max-width:910px)');
    const isMobile = useMediaQuery('(max-width:991px)');
    const [showfilter, setshowfilter] = useState(false);
    const [filterShow, setFilterShow] = useState(false);
    const [IsLogin, setIsLogin] = useState('not_login');
    const [SearchValue, setSearchValue] = useState('');
    const [allBikesArr, setAllBikesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [BrandArray, setBrandArray] = useState([]);
    const [totalPage, setTotalPage] = useState(null);
    const [getAdFrom, setGetAdFrom] = useState(-10);
    const [CityArray, setCityArray] = useState([]);
    const [YearsData, setYearsdata] = useState([]);
    const [CCsData, setCCsData] = useState([]);
    const [heading, setHeading] = useState('');
    const SelectedYearData = []
    const SelectedCCData = []

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        if (BrandArray && BrandArray.length > 0) {
            fetchBrandData(1)
        }
        else {
            fetchBikeInfo(1)
        }
    }, [BrandArray.length])

    useEffect(() => {
        if (CityArray && CityArray.length > 0) {
            fetchCityData(1)
        }
        else {
            fetchBikeInfo(1)
        }
    }, [CityArray.length])

    useEffect(() => {

        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
            fetchFavouriteAds(_isLoginUser?.info?.id)
        }
        else {
            setIsLogin("not_login")
        }

        fetchBikeInfo()
        
       
        if (params.slug == "bike-by-brand") {
            setPlaceHolder('Brand')
            setFilterShow(true)
        }
        
        else if (params.slug.indexOf("used-bikes") > -1 ) {
            setPlaceHolder('City')
            setFilterShow(true)
        }
        else if (params.slug == "bike-by-city") {
            setPlaceHolder('City')
            setFilterShow(true)
        }
        else if (params.slug == "bike-by-year") {
            setPlaceHolder('Year')
            setFilterShow(true)
        }
        else if (params.slug == "bike-by-cc") {
            setPlaceHolder('CC')
            setFilterShow(true)
        }
        else {
            setFilterShow(false)
        }


    }, [])

    const fetchFavouriteAds = async (uid) => {
        setIsLoading(true)
        
        const res = await getFavouriteAds(uid)
        if (res) {
            setFavouriteData(res)
            SelectedADD = res?.data?.favouriteArr?.usedBikeIds?.length > 0 ? res.data.favouriteArr.usedBikeIds : []
        }

        if (res?.data?.favouriteArr?.usedBikeIds) {
            const obj = {
                ids: res?.data?.favouriteArr?.usedBikeIds.length > 0 ? res?.data?.favouriteArr?.usedBikeIds : []
            }
            const getFavBike = await getFavouriteBikeById(obj)

            if (getFavBike && getFavBike?.data?.length > 0) {
                setAllFavouriteBike(getFavBike?.data)
            } else {
                setAllFavouriteBike([])
            }
        }

        setIsLoading(false)
        
        const GetScroll = 0
        setTimeout(() => {
            window.scrollTo({
                top: GetScroll || 0,
                behavior: 'smooth'
            });
        }, 500);
    }

    const capitalizeFirstWord = (str) => {
        return str.replace(/^\s*\w/, (match) => match.toUpperCase());
    };

    const handlePaginationChange = (event, page) => {
        const from = params.slug
        if (SearchApply) {
            handleSearch(page)
            return
        }
        if (from == 'bike-by-year') {
            setSearchApply(false)
            if (YearsData.length == 2) {
                fetchedYearData(page, true)
            }
            else {
                fetchBikeInfo(page)
            }
        }
        else if (from == 'bike-by-cc') {
            if (CCsData.length == 2) {
                fetchedCCData(page, true)
            }
            else {
                fetchBikeInfo(page)
            }
        }
        else if (from == 'bike-by-brand') {
            fetchBikeInfo(page)
        }
        else if (from == 'bike-by-city') {
            fetchBikeInfo(page)
        }
        else {
            fetchBikeInfo(1)
        }
    }

    async function fetchBikeInfo(_page) {
        setSearchApply(false)
        setGetAdFrom(getAdFrom + 10)
        let from = params.slug
        setIsLoading(true)

        if (from?.indexOf('year') > -1) {
            let id = params?.id1
            let Obj = {
                years_filter: [id],
                page: _page,
                adslimit: 12
            }
            let res = await getCustomBikeAd(Obj)
            if (res?.data?.length > 0) {
                setCurrentPage(res?.currentPage)
                setAllBikesArr(res?.data)
                setTotalPage(res?.pages)
                setHeading('Used Bike For Year ' + params.id)
            }
            else {
                setCurrentPage(res?.data?.currentPage)
                setAllBikesArr([])
                setTotalPage(0)
            }
        }

        else if (from?.indexOf('used-bike') > -1 && from?.indexOf('city') > -1) {
            let BrandId = params.id
            let CityId = params.id1
            let Obj = {
                city_filter: [CityId],
                brand_filter: [BrandId],
                page: _page,
                adslimit: 12
            }

            let res = await getCustomBikeAd(Obj)

            if (res?.data?.length > 0) {
                setHeading(capitalizeFirstWord(res?.data[0]?.bike_brand?.brandName)?.replaceAll('_', " ") + " Used Bike in " + capitalizeFirstWord(res?.data[0]?.city?.city_name))
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
        
        else if (from?.indexOf('cc') > -1) {
            
            let id = params.id
            let Obj = {
                cc: [id],
                page: _page,
                adslimit: 12
            }

            let res = await getCustomBikeAd(Obj)

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

        setIsLoading(false)
       
        const GetScroll = 0
        setTimeout(() => {
            window.scrollTo({
                top: GetScroll || 0,
                behavior: 'smooth'
            });
        }, 500);

    }

    function goToDetailPage(val) {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        router.push(`/used-bikes/${urlTitle}/${val.id}`)
    }

    function longCard(val, ind) {
        let brand = getBrandFromId(val?.brandId, BrandArr)
        let city = getCityFromId(val?.cityId, CityArr)
        
        const GetHref = () => {
            let title = val.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            return `/used-bikes/${urlTitle}/${val.id}`
        }

        return (
            <>
                {ind % 4 == 0 ?
                    <div className={styles.banner_1}>
                        <a href="/">
                            <img className={styles.baner_image} src={isMobile ? "https://res.cloudinary.com/dulfy2uxn/image/upload/v1608021415/Youtube%20Ad%20banners/ebike_banner_Black_1_syhm9t.jpg" : "https://res.cloudinary.com/dzfd4phly/image/upload/v1734594565/Artboard_271x-100_1_af7qlo.jpg"} />
                        </a>
                    </div> 
                : ""}
                
                {!isMobileView ?
                    <Link href={GetHref()} sx={{ textDecoration: 'none' }} onClick={() => { goToDetailPage(val) }}>
                        
                        <Grid container key={ind} className={styles.long_card}>
                            <Grid item xs={isMobile ? 12 : 3.5} className={styles.bike_image_box}>
                                <Box

                                    className={styles.long_card_img}

                                    sx={{
                                        backgroundImage: `url(${val?.images?.[0] || 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'})`,
                                        backgroundSize: isMobileView ? '100% 100%' : 'cover',
                                        boxSizing: 'border-box',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        height: isMobileView ? '150px' : "95%",
                                        width: isMobileView ? '100%' : "100%"
                                    }}>
                                    {
                                        isMobileView ?
                                            <Box className={styles.icon_box} onClick={() => AddFavourite(val?.id)}>
                                                <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
                                            </Box> : ""
                                    }
                                </Box>
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
                                    !isMobileView ?
                                        <Box className={styles.fav_box}>
                                            <Box className={styles.icon_box} onClick={(e) => {
                                                e.preventDefault();     // stop <Link> href navigation
                                                e.stopPropagation();    // stop event bubbling
                                                AddFavourite(val?.id);
                                            }}>
                                                <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
                                            </Box>
                                            <Box className={styles.phone_box} onClick={() => { goToDetailPage(val) }} >
                                                < LocalPhoneIcon className={styles.icon} /> Show Phone No
                                            </Box>
                                        </Box>
                                        : ""
                                }
                            </Grid>

                        </Grid>
                    </Link > :
                    <div className={styles.item_div}>
                        <ItemCard
                            data={val}
                            from='usedBikeComp'
                            currentpage='used_bike'
                            onBtnClick={() => { }}
                        />
                    </div>
                }
            </>

        )
    }

    
    function GridCard(val, ind) {
            let brand = getBrandFromId(val?.brandId, BrandArr)
            let city = getCityFromId(val?.cityId, CityArr)
            const GetHref = () => {
                let title = val.title
                let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
                return `/used-bikes/${urlTitle}/${val.id}`
            }
            return (
                <>
                    {!isMobileView ?
                        <Link href={GetHref()} key={ind} sx={{ textDecoration: 'none' }} className={styles.grid_card} onClick={() => { goToDetailPage(val) }}>
                            <Grid container >
    
                                <Grid item className={styles.grid_image_box}>
                                    <Box
                                        sx={{
                                            backgroundImage: `url(${val?.images?.[0] || 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            height: '100%',
                                            width: '100%',
                                        }}>
                                        <Box className={styles.icon_box} onClick={() => AddFavourite(val?.id)}>
                                            <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
                                        </Box>
                                    </Box>
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
                        </Link> :
                        <div className={styles.item_div1}>
                            <ItemCard
                                data={val}
                                from='usedBikeComp'
                                currentpage='used_bike'
                                onBtnClick={() => { }}
                            />
                        </div>}
                </>
            )
    }

    const fetchedYearData = async (_page, from) => {
        setIsLoading(true)

        if (!from) {
            setYearsdata(SelectedYearData[0])
        }
        else {
            setYearsdata(YearsData)
        }

        const MakeObj = () => {
            if (from) {
                return ({
                    years_filter: YearsData,
                    page: _page,
                    adslimit: 12
                })
            }
            else {
                return ({
                    years_filter: SelectedYearData[0],
                    page: _page,
                    adslimit: 12
                })
            }
        }

        const obj = MakeObj()

        const res = await getCustomBikeAd(obj)
        if (res && res?.data?.length > 0) {
            setAllBikesArr(res?.data)
            setCurrentPage(res?.currentPage)
            setTotalPage(res?.pages)
        }
        else {
            setCurrentPage(res?.data?.currentPage)
            setAllBikesArr([])
            setTotalPage(0)
        }

        setIsLoading(false)

        const GetScroll = 0;
        setTimeout(() => {
            window.scrollTo({
                top: GetScroll || 0,
                behavior: 'smooth'
            });
        }, 500);

    }

    const fetchedCCData = async (_page, from) => {
       
        setIsLoading(true)
       
        if (!from) {
            setCCsData(SelectedCCData[0])
        }
        else {
            setCCsData(CCsData)
        }

        const MakeOjForCC = () => {
            if (from) {
                return ({
                    cc: CCsData,
                    page: _page,
                    adslimit: 12
                })
            }
            else {
                return ({
                    cc: SelectedCCData[0],
                    page: _page,
                    adslimit: 12
                })
            }
        }

        const obj = MakeOjForCC()

        const res = await getCustomBikeAd(obj)
        if (res && res?.data?.length > 0) {
            setAllBikesArr(res?.data)
            setCurrentPage(res?.currentPage)
            setTotalPage(res?.pages)
        }
        else {
            setCurrentPage(res?.data?.currentPage)
            setAllBikesArr([])
            setTotalPage(0)
        }

        setIsLoading(false)

        const GetScroll = 0;
        setTimeout(() => {
            window.scrollTo({
                top: GetScroll || 0,
                behavior: 'smooth'
            });
        }, 500);
    }

    const fetchBrandData = async (_page) => {
        setIsLoading(true)
    
        const obj = {
            brand_filter: [],
            page: _page,
            adslimit: 12
        }

        const res = await getCustomBikeAd(obj)
        if (res && res?.data?.length > 0) {
            setAllBikesArr(res?.data)
            setCurrentPage(res?.currentPage)
            setTotalPage(res?.pages)
        }
        else {
            setCurrentPage(res?.data?.currentPage)
            setAllBikesArr([])
            setTotalPage(0)
        }

        setIsLoading(false)
        
        const GetScroll = 0;
        setTimeout(() => {
            window.scrollTo({
                top: GetScroll || 0,
                behavior: 'smooth'
            });
        }, 500);
        
    }

    const fetchCityData = async (_page) => {
        setIsLoading(true)

        const obj = {
            city_filter: savedArray,
            page: _page,
            adslimit: 12
        }
        const res = await getCustomBikeAd(obj)
        if (res && res?.data?.length > 0) {
            setAllBikesArr(res?.data)
            setCurrentPage(res?.currentPage)
            setTotalPage(res?.pages)
        }
        else {
            setCurrentPage(res?.data?.currentPage)
            setAllBikesArr([])
            setTotalPage(0)
        }
        setIsLoading(false)
        
        const GetScroll = 0;
        setTimeout(() => {
            window.scrollTo({
                top: GetScroll || 0,
                behavior: 'smooth'
            });
        }, 500);
        
    }

    const FilterChange = () => {
        if (params.slug == "bike-by-brand" || params?.slug?.indexOf("used-bikes") > -1) {
            return (
                isTabView ?
                    showfilter ?
                        <BrandFilter setBrandArray={setBrandArray} fetchBikeInfo={fetchBikeInfo} setTotalPage={setTotalPage} setAllBikesArr={setAllBikesArr} setCurrentPage={setCurrentPage} />
                        : '' 
                    : <BrandFilter setBrandArray={setBrandArray} fetchBikeInfo={fetchBikeInfo} setTotalPage={setTotalPage} setAllBikesArr={setAllBikesArr} setCurrentPage={setCurrentPage} />
            )
        }
        else if (params.slug == "bike-by-city") {
            return (
                isTabView ?
                    showfilter ?
                        <CityFilter setCityArray={setCityArray} fetchBikeInfo={fetchBikeInfo} setTotalPage={setTotalPage} setAllBikesArr={setAllBikesArr} setCurrentPage={setCurrentPage} /> : '' :
                    <CityFilter setCityArray={setCityArray} fetchBikeInfo={fetchBikeInfo} setTotalPage={setTotalPage} setAllBikesArr={setAllBikesArr} setCurrentPage={setCurrentPage} />
            )
        }
        else if (params.slug == "bike-by-year") {
            return (
                isTabView ?
                    showfilter ?
                        <YearFilter fetchedYearData={fetchedYearData} SelectedYearData={SelectedYearData} fetchBikeInfo={fetchBikeInfo} />
                        : '' :
                        <YearFilter fetchedYearData={fetchedYearData} SelectedYearData={SelectedYearData} fetchBikeInfo={fetchBikeInfo} />
            )
        }
        else if (params.slug == "bike-by-cc") {
            return (
                isTabView ?
                    showfilter ?
                        <CC_Filter fetchedCCData={fetchedCCData} SelectedCCData={SelectedCCData} fetchBikeInfo={fetchBikeInfo} /> : '' :
                    <CC_Filter fetchedCCData={fetchedCCData} SelectedCCData={SelectedCCData} fetchBikeInfo={fetchBikeInfo} />
            )
        }
    }

    const handleSearch = async (_page) => {
        if (!SearchValue == '') {
            setIsLoading(true)
            const obj = {
                search: SearchValue,
                page: _page,
                adslimit: 12
            }
            const res = await getCustomBikeAd(obj)

            if (res && res?.data?.length > 0) {
                setSearchApply(true)
                setAllBikesArr(res?.data)
                setCurrentPage(res.currentPage)
                setTotalPage(res.pages)
            }
            else {
                setCurrentPage(res?.data?.currentPage)
                setAllBikesArr([])
                setTotalPage(0)
            }
            setIsLoading(false)
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);
        }
        else {
            alert('Please Search Used Bike by (Brand , City , Years , CC)')
        }
    }

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

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }

    const AddFavourite = async (id) => {
        if (!IsLogin || IsLogin == "not_login") {
            alert('Please Login To Add Favourite')
            return
        }
        else {
            const index = SelectedADD.length > 0 ? SelectedADD.indexOf(id) : -1;
            if (index !== -1) {
                SelectedADD.splice(index, 1);
            }
            else {
                SelectedADD.push(id)
            }
            const res = await GetFavouriteObject(IsLogin?.id, 'usedBikeIds', SelectedADD, id)
            if (res) {
                fetchFavouriteAds(IsLogin?.id)
            }
        }
    }

    return (
        <>
            {
                isTabView ? <Button disableRipple onClick={filtershow} className={styles.filter_button}>Filters <FilterListIcon sx={{ marginLeft: 1 }} /></Button> : ''
            }

            <Box className={styles.main}>
                <h5 className={styles.heading1}>{heading}</h5>
                {

                        <>
                            {
                                isLoading ? 
                                     <div className={styles.load_main}>
                                        <div className={styles.load_div}>
                                            <Loader isLoading={isLoading} />
                                        </div>
                                    </div>
                                : ""
                            }
                           
                            {allBikesArr?.length > 0 ? 
                                <Grid container className={styles.grid_container}>

                                    <Grid item xs={isTabView ? 12 : isMiniDesktopView ? 3 : 2.5} className={styles.filter_grid} >
                                        {
                                            filterShow ?
                                                <Box className={styles.filter_box_main}>
                                                    {FilterChange()}
                                                </Box>
                                                : ""
                                        }
                                    </Grid>

                                    <Grid item xs={isTabView ? 12 : isMiniDesktopView ? 8.5 : 7.5} className={styles.cards_grid} >
                                       
                                       { params?.slug?.indexOf('used-bikes') > -1 ? "" : <h5 className={styles.heading2}> {heading} </h5> }

                                        <Box className={styles.all_bike_main}>
                                            <div className={styles.main_box}>
                                                <div className={styles.navigation}>
                                                    <div className={styles.text_container}>
                                                        <span className={styles.bike_text}> Used Bikes </span>
                                                    </div>
                                                    <div className={styles.search_box} style={{ display: !isMobileView ? "flex" : "none" }} >
                                                        <div className={styles.search_box_inner}>
                                                            <input type="text" value={SearchValue} className={styles.search_input} placeholder={`Search By ${InputPlaceholder}`} onChange={(e) => setSearchValue(e?.target.value)} />
                                                            <button className={styles.search_btn} onClick={() => handleSearch(1)}><SearchIcon /></button>
                                                        </div>
                                                    </div>
                                                    <div className={styles.swap_button_container}>
                                                        <span> <Apps className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
                                                        <span> <FormatListBulleted className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
                                                    </div>
                                                    <div className={styles.search_box} style={{ display: isMobileView ? "flex" : "none" }}>
                                                        <div className={styles.search_box_inner}>
                                                            <input type="text" value={SearchValue} className={styles.search_input} placeholder={`Search By ${InputPlaceholder}`} onChange={(e) => setSearchValue(e?.target.value)} />
                                                            <button className={styles.search_btn} onClick={() => handleSearch(1)}><SearchIcon /></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`${isGridSelected ? styles.grid_bike_list : ""} ${!isGridSelected ? styles.bike_ad_list : ""} `}>
                                                    {
                                                        SearchApply && allBikesArr?.length == 0 ?
                                                            <p className={styles.not_found}>No results found.</p> 
                                                            :
                                                            allBikesArr.map((val, ind) => {
                                                                return (
                                                                    isGridSelected ?
                                                                        GridCard(val, ind)
                                                                        :
                                                                        longCard(val, ind)
                                                                )
                                                            })

                                                    } 
                                                </div>
                                            </div>
                                        </Box>
                                    </Grid>
                                   
                                    <Grid item xs={isTabView ? 12 : 2} className={styles.add_area}>
                                        <Box className={styles.add_box}>
                                            {
                                                allBikesArr?.length > 8 && AdsArray?.map((e, i) => {
                                                    if(isGridSelected && i > 1) return
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
                                    </Grid>
                                </Grid> 
                            : "" }
                            
                            {allBikesArr?.length > 0 ?
                                <Box className={styles.used_bike_list_pagination}>
                                    <Pagination
                                        count={totalPage}
                                        onChange={handlePaginationChange}
                                        page={currentPage}
                                    />
                                </Box>
                            : ""}

                            <BrowseUsedBike />

                        </>
                }
            </Box>
        </>
    )
}
export default AllUsedBikeByFilter;