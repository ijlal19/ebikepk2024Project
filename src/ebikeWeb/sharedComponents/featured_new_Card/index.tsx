'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { Link, useMediaQuery } from "@mui/material";
import { add3Dots, cloudinaryLoader, getFavouriteAds, GetFavouriteObject, isLoginUser, priceWithCommas } from "@/genericFunctions/geneFunc";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { getFavouriteBikeById } from "@/ebikeWeb/functions/globalFuntions";

let SelectedADD: any = []

const Featured_New_Card = ({ props , fetchFavouriteAds }: any) => {
    const [AllFavouriteBike, setAllFavouriteBike] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [FavouriteData, setFavouriteData] = useState<any>([]);
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const isMobile = useMediaQuery('(max-width:768px)')

    useEffect(() => {

        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
            fetchFavouriteAds(_isLoginUser?.info?.id)
        }
        else {
            setIsLogin("not_login")
        }
    }, [])

    const GetImageSrc = (image: any) => {
        if (image && image.length > 0) {
            return image[0]
        }
        else {
            return "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png"
        }
    }

    const GetHref = (val: any) => {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        return `/used-bikes/${urlTitle}/${val.id}`
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
                fetchFavouriteAds1(IsLogin?.id)
            }
        }
    }

    const fetchFavouriteAds1 = async (uid: any) => {
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


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {/* <div className={styles.image_boxusedbike}>
                    <img src={cloudinaryLoader(GetImageSrc(props?.images), 400, 'auto')}
                        alt={props?.title || "default bike"}
                        className={styles.image}
                    />
                </div> */}
                <div
                    className={styles.image_boxusedbike}
                    style={{
                        backgroundImage: `url(${cloudinaryLoader(GetImageSrc(props?.images), 400, 'auto')})`,
                    }}>
                    {
                        props?.is_sold ?
                            <div className={styles.btns}>
                                <p className={styles.tag1}>FEATURED</p>
                                <p className={styles.tag1}>SOLD OUT</p>
                            </div> :
                            <div className={styles.btns}>
                                <p className={styles.tag1}>FEATURED</p>
                            </div>
                    }
                    <p className={styles.heart_box} onClick={() => AddFavourite(props?.id)}>
                        {
                            FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(props?.id) ?
                                <FavoriteRoundedIcon className={styles.icon} sx={{ color: "#1976d2" }} /> :
                                <FavoriteBorderRoundedIcon className={styles.icon} />
                        }
                    </p>
                </div>

                <div className={styles.content}>
                    <p className={styles.title}>{add3Dots(props?.title, isMobile ? 12 : 30)}</p>
                    <p className={styles.price}><span className={styles.name}>PKR {priceWithCommas(props?.price)}</span></p>
                    <Link href={GetHref(props)} className={styles.linkbtn}>
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

const FavouriteAds = ({ props }: any) => {
    const [AllFavouriteBike, setAllFavouriteBike] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [FavouriteData, setFavouriteData] = useState<any>([]);
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const isMobile = useMediaQuery('(max-width:768px)')

    const GetImageSrc = (image: any) => {
        if (image && image.length > 0) {
            return image[0]
        }
        else {
            return "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png"
        }
    }

    const GetHref = (val: any) => {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        return `/used-bikes/${urlTitle}/${val.id}`
    }

    // const AddFavourite = async (id: any) => {
    //     if (!IsLogin || IsLogin == "not_login") {
    //         alert('Please Login To Add Favourite')
    //         return
    //     }
    //     else {
    //         const index = SelectedADD.length > 0 ? SelectedADD.indexOf(id) : -1;
    //         if (index !== -1) {
    //             SelectedADD.splice(index, 1);
    //         }
    //         else {
    //             SelectedADD.push(id)
    //         }
    //         const res = await GetFavouriteObject(IsLogin?.id, 'usedBikeIds', SelectedADD, id)
    //         if (res) {
    //             fetchFavouriteAds(IsLogin?.id)
    //         }
    //     }
    // }

    // const fetchFavouriteAds = async (uid: any) => {
    //     setIsLoading(true)
    //     const res = await getFavouriteAds(uid)
    //     if (res) {
    //         setFavouriteData(res)
    //         SelectedADD = res?.data?.favouriteArr?.usedBikeIds?.length > 0 ? res.data.favouriteArr.usedBikeIds : []
    //     }

    //     if (res?.data?.favouriteArr?.usedBikeIds) {
    //         const obj = {
    //             ids: res?.data?.favouriteArr?.usedBikeIds.length > 0 ? res?.data?.favouriteArr?.usedBikeIds : []
    //         }
    //         const getFavBike = await getFavouriteBikeById(obj)

    //         if (getFavBike && getFavBike?.data?.length > 0) {
    //             setAllFavouriteBike(getFavBike?.data)
    //         } else {
    //             setAllFavouriteBike([])
    //         }
    //     }

    //     setIsLoading(false)
    // }


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {/* <div className={styles.image_boxusedbike}>
                    <img src={cloudinaryLoader(GetImageSrc(props?.images), 400, 'auto')}
                        alt={props?.title || "default bike"}
                        className={styles.image}
                    />
                </div> */}
                <div
                    className={styles.image_boxusedbike}
                    style={{
                        backgroundImage: `url(${cloudinaryLoader(GetImageSrc(props?.images), 400, 'auto')})`,
                    }}>
                    {
                        props?.isFeatured ?
                            (props?.is_sold ?
                                <div className={styles.btns}>
                                    <p className={styles.tag1}>FEATURED</p>
                                    <p className={styles.tag1}>SOLD OUT</p>
                                </div> :
                                <div className={styles.btns}>
                                    <p className={styles.tag1}>FEATURED</p>
                                </div>) : ""
                    }


                    <p className={styles.heart_box}>
                        <FavoriteRoundedIcon className={styles.icon} sx={{ color: "#1976d2" }} />
                    </p>
                </div>

                <div className={styles.content}>
                    <p className={styles.title}>{add3Dots(props?.title, isMobile ? 12 : 30)}</p>
                    <p className={styles.price}><span className={styles.name}>PKR {priceWithCommas(props?.price)}</span></p>
                    <Link href={GetHref(props)} className={styles.linkbtn}>
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

export { Featured_New_Card, FavouriteAds }