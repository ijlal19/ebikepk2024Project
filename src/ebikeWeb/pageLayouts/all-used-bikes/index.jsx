'use client'
import { getBrandFromId, getCityFromId, getCustomBikeAd, getFavouriteBikeById } from "@/ebikeWeb/functions/globalFuntions";
import { getFavouriteAds, GetFavouriteObject, isLoginUser, priceWithCommas, optimizeImage, cloudinaryLoader } from '@/genericFunctions/geneFunc';
import { Box, Button, Grid, Link, Typography, useMediaQuery, Pagination } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UsedBikesSection from '@/ebikeWeb/pageLayouts/home/usedbikeSection/index';
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider/index';
import { CityArr, BrandArr } from "@/ebikeWeb/constants/globalData";
import BrowseUsedBike from '../../sharedComponents/BrowseUsedBike';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Apps, FormatListBulleted } from '@mui/icons-material';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from '@/ebikeWeb/sharedComponents/filters';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ItemCard from '../../sharedComponents/itemCard';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import "../../../app/globals.scss"
import DealerLeft from "@/ebikeWeb/sharedComponents/Letf-side-section/dealer-left";
import MechaniLeft from "@/ebikeWeb/sharedComponents/Letf-side-section/Mechanic-left";
import Blog_left from "@/ebikeWeb/sharedComponents/Letf-side-section/blog-left";

const AdsArray = [
    {
        href: 'https://youtube.com/ebikepk',
        alt: 'eBike YouTube Banner',
        url: "https://res.cloudinary.com/dulfy2uxn/image/upload/v1608620216/Animated_Banner_Gif_3_txcj9p.gif",
        target: "_blank"
    },
    // {
    //     href: '/forum',
    //     alt: '/forum',
    //     url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg"
    // },
    // {
    //     href: '/dealers',
    //     alt: '/dealer',
    //     url: "https://res.cloudinary.com/dzfd4phly/image/upload/v1745664709/52_mgjfps.jpg"
    // },
    // {
    //     href: '/mechanics',
    //     alt: '/mechanic',
    //     url: "https://res.cloudinary.com/dzfd4phly/image/upload/v1745664645/51_perxlq.jpg"
    // },
    // {
    //     href: '/blog',
    //     alt: '/blog',
    //     url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg"
    // }
]

let SelectedADD = []
let GetScroll = 0

export default function AllUsedBike({ _allFeaturedBike, _allUsedBike }) {

    const [AllFavouriteBike, setAllFavouriteBike] = useState([]);
    const [isGridSelected, setIsGridSelected] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [FavouriteData, setFavouriteData] = useState([]);
    const [SearchApply, setSearchApply] = useState(false);
    const [featuredData, setFeaturedData] = useState([]);
    const [showfilter, setshowfilter] = useState(false);
    const [IsLogin, setIsLogin] = useState('not_login');
    const [allBikesArr, setAllBikesArr] = useState([]);
    const [SearchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);

    const is12InchScreen = useMediaQuery('(max-width:1200px)');
    const isMobileView = useMediaQuery('(max-width:600px)');
    const is10Inch = useMediaQuery('(max-width:991px)');
    const is9Inch = useMediaQuery('(max-width:910px)');

    const router = useRouter()

    useEffect(() => {

        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
            fetchFavouriteAds(_isLoginUser?.info?.id)
        }
        else {
            setIsLogin("not_login")
        }

        if (_allFeaturedBike?.data) {
            setFeaturedData(_allFeaturedBike?.data)
        }
        else {
            fetchFeaturedBike()
        }

        const pageNoRaw = localStorage.getItem('PageNo');
        if (pageNoRaw && !isNaN(Number(pageNoRaw))) {
            const PageNo = Number(pageNoRaw);
            fetchBikeInfo(PageNo, true);
        } else {
            fetchBikeInfo(1, false);
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
    }

    const handlePaginationChange = async (event, page) => {
        localStorage.setItem("PageNo", page);
        if (SearchApply) {
            handleSearch(page)
        }
        else {
            fetchBikeInfo(page, true)
        }
    }

    async function fetchBikeInfo(_pageNo, fromPagination) {
        setIsLoading(true)
        let res = null;

        let obj = {
            adslimit: 12,
            page: _pageNo
        }


        // if(_allUsedBike && _pageNo == 1 && !fromPagination) {
        //     res = _allUsedBike

        // }
        // else {
        if (res == null || fromPagination) {
            res = await getCustomBikeAd(obj);
        }
        // }

        setInitialLoading(false)
        localStorage.removeItem('PageNo')
        if (res?.data?.length > 0) {
            setCurrentPage(res?.currentPage)
            setAllBikesArr(res?.data)
            setTotalPage(res?.pages)
        }
        else {
            setCurrentPage(1)
            setAllBikesArr([])
            setTotalPage(0)
        }

        // if (fromPagination) {
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo({
                top: GetScroll ? GetScroll : 0,
                behavior: 'smooth'
            });
        }, 500);
    }

    async function fetchFeaturedBike() {

        let obj = {
            isFeatured: true,
            adslimit: 20,
            // page: 1,
            // random: true
        }

        let res = false
        if (!res) {
            res = await getCustomBikeAd(obj);
        }

        if (res && res?.data?.length > 0) {
            setFeaturedData(res.data)
        }
        else {
            setFeaturedData([])
        }
    }

    function goToDetailPage(val) {
        localStorage.setItem("PageNo", currentPage);
        // localStorage.setItem("WindowScroll", window.scrollY);
        let title = val.title;
        let urlTitle = title.toLowerCase().replaceAll(' ', '-');
        router.push(`/used-bikes/${urlTitle}/${val.id}`);
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
                            <img className={styles.baner_image} src={is10Inch ? "https://res.cloudinary.com/dulfy2uxn/image/upload/v1608021415/Youtube%20Ad%20banners/ebike_banner_Black_1_syhm9t.jpg" : "https://res.cloudinary.com/dzfd4phly/image/upload/v1734594565/Artboard_271x-100_1_af7qlo.jpg"} />
                        </a>
                    </div> : ""}
                {!isMobileView ?
                    <Link href={GetHref()} sx={{ textDecoration: 'none' }} onClick={() => { goToDetailPage(val) }}>
                        {/* <Link href={GetHref()} sx={{ textDecoration: 'none', display: isMobileView ? 'none' : 'flex', flexDirection: 'column' }} onClick={() => { goToDetailPage(val) }}> */}

                        <Grid container key={ind} className={styles.long_card}>
                            <Grid item xs={is10Inch ? 12 : 3.5} className={styles.bike_image_box}>
                                <Box

                                    className={styles.long_card_img}

                                    sx={{
                                        backgroundImage: `url(${cloudinaryLoader(val?.images?.[0], 300, "auto") || 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'})`,
                                        backgroundSize: isMobileView ? '100% 100%' : 'cover',
                                        boxSizing: 'border-box',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        height: isMobileView ? '150px' : "95%",
                                        width: isMobileView ? '100%' : "100%"
                                    }}>
                                    {
                                        val.is_sold ?
                                            <div className={styles.soldout}>Sold Out</div> : ""
                                    }
                                    {
                                        isMobileView ?
                                            <Box className={styles.icon_box} onClick={() => AddFavourite(val?.id)}>
                                                <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
                                                {/* <FavoriteIcon className={styles.icon} sx={{ color: 'red' : 'green' }} /> */}
                                            </Box> : ""
                                    }
                                </Box>
                                {/* {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt="" /> : <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png" alt="" />} */}
                            </Grid>

                            <Grid item xs={is10Inch ? 12 : 8} className={styles.card_info}>

                                <Typography className={styles.card_title} onClick={() => { goToDetailPage(val) }}> {val?.title} </Typography>

                                <Typography className={styles.card_location}><AccountCircleOutlinedIcon sx={{ fontSize: '15px', marginRight: '2px', boxSizing: 'border-box' }} />{val?.sellerName}</Typography>

                                <Typography className={styles.bike_details}>
                                    {val?.year?.year}
                                    <span className={styles.verticl_line}> | </span>
                                    <span style={{ textTransform: "capitalize" }}> {brand && brand?.length > 0 && brand[0].brandName} </span>
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
                                                {/* <FavoriteIcon className={styles.icon} sx={{ color: LikeTrue.includes(val?.id) ? 'red' : 'grey' }} /> */}
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

        // console.log('val?.images?.[0]', val?.images?.[0], cloudinaryLoader(val?.images?.[0], 350, 350) )

        return (
            <>
                {!isMobileView ?
                    <Link href={GetHref()} key={ind} sx={{ textDecoration: 'none' }} className={styles.grid_card} onClick={() => { goToDetailPage(val) }}>
                        <Grid container >

                            <Grid item className={styles.grid_image_box}>
                                <Box
                                    className={styles.grid_image_upper}
                                    sx={{
                                        backgroundImage: `url(${cloudinaryLoader(val?.images?.[0], 300, "auto") || 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        height: '100%',
                                        width: '100%',
                                    }}>

                                    <Box className={styles.icon_box} onClick={() => AddFavourite(val?.id)}>
                                        <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
                                    </Box>
                                    {
                                        val.is_sold ?
                                            <div className={styles.soldout}>Sold Out</div> : ""
                                    }
                                </Box>
                                {/* {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt="" /> : <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png" alt="" />} */}
                            </Grid>

                            <Grid item className={styles.grid_card_info}>

                                <Box className={styles.grid_icon_title}>
                                    <Typography className={styles.grid_card_title} onClick={() => { goToDetailPage(val) }}> {val?.title}  </Typography>
                                </Box>
                                <Typography className={styles.grid_card_location}><AccountCircleOutlinedIcon sx={{ fontSize: '15px', marginRight: '2px', boxSizing: 'border-box' }} />{val?.sellerName}</Typography>

                                {/* <Typography className={styles.grid_card_location}> {val?.sellerName} </Typography> */}

                                <Typography className={styles.grid_card_price}>PKR {priceWithCommas(val?.price)}</Typography>

                                <Typography className={styles.grid_bike_details}>
                                    {val?.year?.year}
                                    <span className={styles.grid_verticl_line}> | </span>
                                    <span style={{ textTransform: "capitalize" }}> {brand && brand?.length > 0 && brand[0].brandName} </span>
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
                            // sliderData={featuredBikes} from='usedBikeComp' currentpage='used_bike' onBtnClick={() => { }} 
                            currentpage='used_bike'
                            onBtnClick={() => { }}
                        />
                    </div>}
            </>
        )
    }

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }

    const handleSearch = async (_page) => {
        if (!SearchValue == '') {
            setIsLoading(true)
            setSearchApply(true)
            const obj = {
                search: SearchValue,
                page: _page,
                adslimit: 12
            }
            const res = await getCustomBikeAd(obj)

            if (res && res?.data?.length > 0) {
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
                    top: GetScroll || 0,
                    behavior: 'smooth'
                });
            }, 500);
        }
        else {
            alert('Please Search Used Bike by (Brand , City , Years , CC)')
        }
    }

    return (
        !initialLoading ?
            <>
                {
                    is9Inch ? <Button disableRipple onClick={filtershow} className={styles.filter_button}>Filters <FilterListIcon sx={{ marginLeft: 1 }} /></Button> : ''
                }
                <Box className={styles.main}>
                    <>
                        <Box className={styles.usedBike_headingBpx}>
                            <Typography className={styles.headinh_sale}>Find Used Bikes & Motorcycles in Pakistan</Typography>
                            {/* <Typography className={styles.path_text}> Home <span style={{ paddingLeft: 5, paddingRight: 5 }}>/</span>Used<span style={{ paddingLeft: 5, paddingRight: 5 }}>/</span>Bike For Sale In Pakistan</Typography> */}
                            <Typography className={styles.path_text}> Used Honda, Suzuki, Yamaha & More </Typography>
                        </Box>

                        <br className="d-none d-md-block" />
                        <br className="d-none d-md-block" />

                        <UsedBikesSection from='featuredBike' featuredData={featuredData} />

                        {
                            AllFavouriteBike.length > 0 ?
                                <div className={styles.similarBikeDiv}>
                                    <div className={styles.similarBikeDiv_inner}>
                                        <h6 className={styles.similar_heading}> Favourite Bikes </h6>
                                        <SwiperCarousels sliderName='similarBikeSwiper' sliderData={AllFavouriteBike} from='usedBikeComp' currentpage="used_bike" onBtnClick={() => { }} />
                                    </div>
                                </div> : ''
                        }

                        <Grid container className={styles.grid_container}>

                            <Grid item xs={is9Inch ? 12 : is12InchScreen ? 2.2 : 2.2} className={styles.filter_grid} >
                                {
                                    is9Inch ?
                                        showfilter ?
                                            <Box className={styles.filter_box_main}>
                                                <Filters
                                                    setLoader={setIsLoading}
                                                    updateData={setAllBikesArr}
                                                    fetchBikeInfo={fetchBikeInfo}
                                                    CurrentPage={setCurrentPage}
                                                    TotalPage={setTotalPage}
                                                    SearchValue={SearchValue}
                                                />
                                            </Box>
                                            : '' :
                                        <Box className={styles.filter_box_main}>
                                            <Filters
                                                setLoader={setIsLoading}
                                                updateData={setAllBikesArr}
                                                fetchBikeInfo={fetchBikeInfo}
                                                CurrentPage={setCurrentPage}
                                                TotalPage={setTotalPage}
                                                SearchValue={SearchValue}
                                            />
                                        </Box>
                                }
                            </Grid>

                            <Grid item xs={is9Inch ? 12 : is12InchScreen ? 8.2 : 7.2} className={styles.cards_grid} >

                                <Box className={styles.all_bike_main}>
                                    <div className={styles.main_box}>
                                        <div className={styles.navigation}>
                                            <div className={styles.text_container}>
                                                <span className={styles.bike_text}> Used Bikes </span>
                                            </div>
                                            <div className={styles.search_box} style={{ display: !isMobileView ? "flex" : "none" }} >
                                                <div className={styles.search_box_inner}>
                                                    <input type="text" value={SearchValue} className={styles.search_input} placeholder={`Search`} onChange={(e) => setSearchValue(e?.target.value)} />
                                                    <button className={styles.search_btn} onClick={() => handleSearch(1)}><SearchIcon /></button>
                                                </div>
                                            </div>
                                            <div className={styles.swap_button_container}>
                                                <span> <Apps className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
                                                <span> <FormatListBulleted className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
                                            </div>
                                            <div className={styles.search_box} style={{ display: isMobileView ? "flex" : "none" }}>
                                                <div className={styles.search_box_inner}>
                                                    <input type="text" value={SearchValue} className={styles.search_input} placeholder={`Search`} onChange={(e) => setSearchValue(e?.target.value)} />
                                                    <button className={styles.search_btn} onClick={() => handleSearch(1)}><SearchIcon /></button>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            !SearchApply ?
                                                (
                                                    <div className={`${isGridSelected ? styles.grid_bike_list : ""} ${!isGridSelected ? styles.bike_ad_list : ""} `}>
                                                        {
                                                            allBikesArr.map((val, ind) => {
                                                                return (
                                                                    isGridSelected ?
                                                                        GridCard(val, ind)
                                                                        :
                                                                        longCard(val, ind)
                                                                )
                                                            })

                                                        } </div>)
                                                :
                                                (<div className={`${isGridSelected ? styles.grid_bike_list : ""} ${!isGridSelected ? styles.bike_ad_list : ""} `}>
                                                    {allBikesArr?.length == 0 ?
                                                        <p className={styles.not_found}>No results found.</p> :
                                                        allBikesArr.map((val, ind) => {
                                                            return (
                                                                isGridSelected ? GridCard(val, ind) : longCard(val, ind)
                                                            )
                                                        })
                                                    }
                                                </div>)
                                        }
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={is9Inch ? 12 : 2.5} className={styles.add_area}>
                                <Box className={styles.add_box}>
                                    {
                                        AdsArray?.map((e, i) => {
                                            return (
                                                <Link href={e?.href} key={i} target={e?.target} rel="noopener noreferrer">
                                                    <img
                                                        src={cloudinaryLoader(e?.url, 400, 'auto')}
                                                        alt={e?.alt}
                                                        className={styles.add_image} />
                                                </Link>
                                            )
                                        })
                                    }
                                    <MechaniLeft />
                                    <Link href='/forum' target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={cloudinaryLoader('https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg', 400, 'auto')}
                                            alt="/forum"
                                            className={styles.add_image} />
                                    </Link>
                                </Box>
                                <Blog_left />
                                <DealerLeft />
                            </Grid>
                        </Grid>
                        {allBikesArr?.length > 0 ?
                            <Box className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                />
                            </Box>
                            : ""}
                    </>

                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
                </Box>
                <BrowseUsedBike />
            </> :
            <Box className={styles.main}>
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
                </div>
            </Box>
    )
}
