'use client'
import { getBrandFromId, getCityFromId, getCustomBikeAd, getFavouriteBikeById } from "@/ebikeWeb/functions/globalFuntions";
import { getFavouriteAds, GetFavouriteObject, isLoginUser, priceWithCommas, optimizeImage, cloudinaryLoader } from '@/genericFunctions/geneFunc';
import { Box, Grid, Link, Typography, useMediaQuery, Pagination } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { CityArr, BrandArr } from "@/ebikeWeb/constants/globalData";
import { Apps, FormatListBulleted } from '@mui/icons-material';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ItemCard from '../../sharedComponents/itemCard';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import DealerLeft from "@/ebikeWeb/sharedComponents/Letf-side-section/dealer-left";
import MechaniLeft from "@/ebikeWeb/sharedComponents/Letf-side-section/Mechanic-left";
import { Side_brands } from "@/ebikeWeb/sharedComponents/Letf-side-section/brand-section";
import { List_Card } from "@/ebikeWeb/sharedComponents/NewSectionM/card";

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

let SelectedADD: any = []
let GetScroll = 0

// export default function AllCertifiedBikes({ _allFeaturedBike, _allUsedBike }) {
export default function AllCertifiedBikes() {

    const [AllFavouriteBike, setAllFavouriteBike] = useState([]);
    const [isGridSelected, setIsGridSelected] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [FavouriteData, setFavouriteData] = useState<any>([]);
    const [SearchApply, setSearchApply] = useState(false);
    const [featuredData, setFeaturedData] = useState([]);
    const [showfilter, setshowfilter] = useState(false);
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const [allBikesArr, setAllBikesArr] = useState([]);
    const [SearchValue, setSearchValue] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [totalPage, setTotalPage] = useState<any>(null);
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

        fetchFeaturedBike()

        const pageNoRaw = localStorage.getItem('PageNo');
        if (pageNoRaw && !isNaN(Number(pageNoRaw))) {
            const PageNo = Number(pageNoRaw);
            fetchBikeInfo(PageNo, true);
        } else {
            fetchBikeInfo(1, false);
        }

    }, [])

    const fetchFavouriteAds = async (uid: any) => {
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

    const handlePaginationChange = async (event: any, page: any) => {
        localStorage.setItem("PageNo", page);
        fetchBikeInfo(page, true)
    }

    async function fetchBikeInfo(_pageNo: any, fromPagination: any) {
        setIsLoading(true)
        let res = null;

        let obj = {
            adslimit: 12,
            page: _pageNo
        }

        if (res == null || fromPagination) {
            res = await getCustomBikeAd(obj);
        }

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
            adslimit: 20
        }

        let res = await getCustomBikeAd(obj);
        if (res && res?.data?.length > 0) {
            setFeaturedData(res.data)
        }
        else {
            setFeaturedData([])
        }
    }

    function goToDetailPage(val: any) {
        localStorage.setItem("PageNo", currentPage);
        let title = val.title;
        let urlTitle = title.toLowerCase().replaceAll(' ', '-');
        router.push(`/used-bikes/${urlTitle}/${val.id}`);
    }

    const AddFavourite = async (id: any) => {
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

    function longCard(val: any, ind: any) {
        let brand = getBrandFromId(val?.brandId, BrandArr)
        let city = getCityFromId(val?.cityId, CityArr)
        const bikeYear = val?.year?.year
        const brandName = brand && brand?.length > 0 ? brand[0].brandName : ''
        const cityName = city && city?.length > 0 ? city[0].city_name : ''
        const viewsCount = val?.views_count ?? 0
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

                        <Grid container key={ind} className={styles.long_card} >
                            <Grid item xs={is10Inch ? 12 : 3.5} className={styles.bike_image_box}>
                                <Box className={styles.long_card_img}
                                    sx={{
                                        backgroundImage: `url(${cloudinaryLoader(val?.images?.[0], 300, "auto") || 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'})`,
                                        backgroundSize: isMobileView ? '100% 100%' : 'cover',
                                        boxSizing: 'border-box',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        height: isMobileView ? '150px' : "95%",
                                        width: isMobileView ? '100%' : "100%",
                                        borderRadius: '5px'
                                    }}>
                                    {
                                        val.is_sold ?
                                            <div className={styles.soldout}>Sold Out</div> : ""
                                    }
                                    {
                                        isMobileView ?
                                            <Box className={styles.icon_box_long} onClick={() => AddFavourite(val?.id)}>
                                                <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
                                            </Box>
                                            : ""
                                    }
                                </Box>
                            </Grid>

                            <Grid item xs={is10Inch ? 12 : 8} className={styles.card_info}>

                                <Typography className={styles.card_title} onClick={() => { goToDetailPage(val) }}> {val?.title} </Typography>

                                <Typography className={styles.card_location}><AccountCircleOutlinedIcon sx={{ fontSize: '15px', marginRight: '2px', boxSizing: 'border-box' }} />{val?.sellerName}</Typography>

                                <Typography className={styles.bike_details}>
                                    {bikeYear ? <span>{bikeYear}</span> : null}
                                    {bikeYear && brandName ? <span className={styles.verticl_line}> | </span> : null}
                                    {brandName ? <span style={{ textTransform: "capitalize" }}>{brandName}</span> : null}
                                    {(bikeYear || brandName) && cityName ? <span className={styles.verticl_line}> | </span> : null}
                                    {cityName ? <span className={styles.verticl_line}>{cityName}</span> : null}
                                    {(bikeYear || brandName || cityName) ? <span className={styles.verticl_line}> | </span> : null}
                                    <span style={{ display: 'inline-flex', alignItems: 'center', columnGap: '2px' }}>
                                        {viewsCount} <VisibilityOutlinedIcon sx={{ fontSize: '14px' }} />
                                    </span>
                                </Typography>

                                <Typography className={styles.card_price_mobile}>PKR {priceWithCommas(val?.price)}</Typography>

                            </Grid>

                            <Grid item className={styles.price_section_desktop}>
                                <span> PKR {priceWithCommas(val?.price)}</span>
                                {
                                    !isMobileView ?
                                        <Box className={styles.fav_box}>
                                            <Box className={styles.icon_box} onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
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
                    </Link >
                    :
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

    function GridCard(val: any, ind: any) {
        let brand = getBrandFromId(val?.brandId, BrandArr)
        let city = getCityFromId(val?.cityId, CityArr)
        const bikeYear = val?.year?.year
        const brandName = brand && brand?.length > 0 ? brand[0].brandName : ''
        const cityName = city && city?.length > 0 ? city[0].city_name : ''
        const viewsCount = val?.views_count ?? 0
        const GetHref = () => {
            let title = val.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            return `/used-bikes/${urlTitle}/${val.id}`
        }

        return (
            <>
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
                        </Grid>

                        <Grid item className={styles.grid_card_info}>

                            <Box className={styles.grid_icon_title}>
                                <Typography className={styles.grid_card_title} onClick={() => { goToDetailPage(val) }}> {val?.title}  </Typography>
                            </Box>
                            <Typography className={styles.grid_card_location}><AccountCircleOutlinedIcon sx={{ fontSize: '15px', marginRight: '2px', boxSizing: 'border-box' }} />{val?.sellerName}</Typography>

                            <Typography className={styles.grid_card_price}>PKR {priceWithCommas(val?.price)}</Typography>

                            <Typography className={styles.grid_bike_details}>
                                {bikeYear ? <span>{bikeYear}</span> : null}
                                {bikeYear && brandName ? <span className={styles.grid_verticl_line}> | </span> : null}
                                {brandName ? <span style={{ textTransform: "capitalize" }}>{brandName}</span> : null}
                                {(bikeYear || brandName) && cityName ? <span className={styles.grid_verticl_line}> | </span> : null}
                                {cityName ? <span className={styles.grid_verticl_line}>{cityName}</span> : null}
                                {(bikeYear || brandName || cityName) ? <span className={styles.grid_verticl_line}> | </span> : null}
                                <span style={{ display: 'inline-flex', alignItems: 'center', columnGap: '2px' }}>
                                    {viewsCount} <VisibilityOutlinedIcon sx={{ fontSize: '14px' }} />
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Link>
            </>
        )
    }

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }

    return (
        !initialLoading ?
            <>
                <Box className={styles.main}>
                    <>
                        <Grid container className={styles.grid_container}>

                            <Grid item xs={is9Inch ? 12 : is12InchScreen ? 8 : 9} className={styles.cards_grid} >
                                <Box className={styles.all_bike_main}>
                                    <div className={styles.main_box}>
                                        <div className={styles.navigation}>
                                            <div className={styles.text_container}>
                                                <span className={styles.bike_text}>Certified Bikes </span>
                                            </div>
                                            <div className={styles.swap_button_container}>
                                                <span> <Apps className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
                                                <span> <FormatListBulleted className={styles.swap_icon} onClick={() => setIsGridSelected(prev => !prev)} /> </span>
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
                            <Grid item xs={is9Inch ? 12 : 3} className={styles.add_area}>
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
                                    <Side_brands />
                                    {
                                        !isGridSelected ?
                                            <Link href='/forum' target="_blank" rel="noopener noreferrer" sx={{ marginBottom: 5 }}>
                                                <img
                                                    src={cloudinaryLoader('https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg', 400, 'auto')}
                                                    alt="/forum"
                                                    className={styles.add_image} />
                                            </Link>

                                            : ""
                                    }
                                </Box>
                                {
                                    !isGridSelected ?
                                        <List_Card />
                                        : ""
                                }
                                <br />
                                <br />
                                {
                                    !isGridSelected ?
                                        <DealerLeft /> : ""
                                }
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
