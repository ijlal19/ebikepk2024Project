'use client'
import { getFavouriteAds, GetFavouriteObject, isLoginUser, priceWithCommas, cloudinaryLoader } from '@/genericFunctions/geneFunc';
import { useParams, usePathname, useRouter } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, Grid, Link } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Card from '@mui/material/Card';

let SelectedADD: any = []

export default function NewUsedBikesCard(props: any) {
    const [isUsedBikePage, setIsUsedBikePage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const [FavouriteData, setFavouriteData] = useState<any>([]);
    const [isFeatureTagShow, setIsFeaturedTagShow] = useState(false)
    const Router = useRouter()

    useEffect(() => {
        if (window.location.pathname.indexOf('used-bikes') !== -1) {
            setIsFeaturedTagShow(true)
            setIsUsedBikePage(true)
            let _isLoginUser = isLoginUser()
            if (_isLoginUser?.login) {
                setIsLogin(_isLoginUser.info)
                fetchFavouriteAds(_isLoginUser?.info?.id)
            }
            else {
                setIsLogin("not_login")
            }
        }
        else {
            setIsFeaturedTagShow(false)
            setIsUsedBikePage(false)
        }
    }, [])

    const fetchFavouriteAds = async (uid: any) => {
        setIsLoading(true)
        const res = await getFavouriteAds(uid)
        if (res) {
            setFavouriteData(res)
            SelectedADD = res?.data?.favouriteArr?.usedBikeIds?.length > 0 ? res.data.favouriteArr.usedBikeIds : []
        }

        setIsLoading(false)
    }

    let imgUrl = ''

    if (props?.data?.img_url) {
        imgUrl = props.data.img_url
    }
    else if (props?.data?.images && props.data?.images?.length > 0) {
        imgUrl = props.data?.images[0]
    }

    function goToDetailPage(bike: any) {

        if (props.currentpage == 'new_bike') {
            Router.push(`/new-bikes/${bike?.bike_brand?.brandName}/${bike?.bikeUrl}/${bike.id}`)
        }

        else if (props.currentpage == 'featured_bike') {
            let title = bike?.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            Router.push(`/used-bikes/${urlTitle}/${bike?.id}`)
        }

        else if (props.currentpage == 'trending_bike') {
            Router.push(bike?.url)
        }

        else if (props.currentpage == 'used_bike') {
            let title = bike?.title
            let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
            Router.push(`/used-bikes/${urlTitle}/${bike?.id}`)
        }

        else {
            alert('Route not found')
        }

    }

    function getBikeUrl(bike: any) {

        if (props.currentpage === 'new_bike') {
            return `/new-bikes/${bike?.bike_brand?.brandName}/${bike?.bikeUrl}/${bike.id}`;
        }
        else if (props.currentpage === 'trending_bike') {
            return bike?.url;
        }
        else if (props.currentpage === 'featured_bike') {
            let title = bike?.title;
            let urlTitle = title.toLowerCase().replaceAll(' ', '-');
            return `/used-bikes/${urlTitle}/${bike?.id}`;
        }

        else if (props.currentpage === 'used_bike') {
            let title = bike?.title;
            let urlTitle = title.toLowerCase().replaceAll(' ', '-');
            return `/used-bikes/${urlTitle}/${bike?.id}`;
        }

        else {
            return '#';
        }

    }

    let bike = props.data

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
                // window.location.reload()
            }
        }
    }

    return (
        <>
                <Card className={styles.itemCard}>
                    {props.currentpage === 'featured_bike' ?
                        (isFeatureTagShow ?
                            <span className={styles.featured_tag}>FEATURED</span> : "")
                        : ""}
                    {
                        props.from == "usedBikeComp" ?
                            <div className={styles.card_img_wrapper}>
                                <CardMedia
                                    component="img"
                                    alt={bike.title}
                                    height="230"
                                    image={
                                        imgUrl
                                            ? cloudinaryLoader(imgUrl, 400, "auto")
                                            : 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'
                                    }
                                    className={`${styles.card_img} ${props.from == "newBikeComp" ? styles.card_img_dynamic_height : ""}`}
                                />
                                {
                                    isUsedBikePage ?
                                        <div className={styles.overlay_text}>
                                            <Box className={styles.icon_box} onClick={() => AddFavourite(props.data?.id)}>
                                                <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(props.data?.id) ? '#1976d2' : 'white' }} />
                                            </Box>
                                            {
                                                props.data.is_sold ?
                                                    <div className={styles.soldout}>Sold Out</div> : ""
                                            }
                                        </div> :
                                        ""
                                }

                            </div>
                            :
                            <CardMedia
                                component="img"
                                alt={bike.title}
                                height="230"
                                image={imgUrl ? cloudinaryLoader(imgUrl , 400 , 'auto') : 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'}
                                className={`${styles.card_img} ${props.from == "newBikeComp" ? styles.card_img_dynamic_height : ""}`}
                            />
                    }
                    <CardContent className={styles.card_info}>

                        <Typography className={styles.card_title}>
                            {bike.title}
                        </Typography>
                        {props.currentpage === 'featured_bike' ?
                            (isFeatureTagShow ?
                                <Typography className={styles.card_price} sx={{ color: '#1976d2' }}>
                                    PKR: {bike?.price ? priceWithCommas(bike?.price) : "0"}
                                </Typography>
                                : "")
                            : <Typography className={styles.card_price} sx={{ color: 'black' }}>
                                PKR: {bike?.price ? priceWithCommas(bike?.price) : "0"}
                            </Typography>}

                        {props.from == "usedBikeComp" ?

                            <Typography className={styles.card_location}>
                                {bike.location}
                            </Typography>

                            : ""}

                        {props.from != "myAdsComp" ?

                            <Link href={getBikeUrl(bike)} sx={{ textDecoration: 'none' }}>
                                <Button className={styles.view_detail_btn} onClick={() => { goToDetailPage(bike) }}>
                                    View Detail
                                </Button>
                            </Link>

                            : ""}

                        {props.from == "myAdsComp" && bike.is_sold == false ?
                            <Button className={styles.view_detail_btn} onClick={() => { props.onBtnClick(bike) }}>
                                Mark as Sold</Button>
                            : ""}

                    </CardContent>
                </Card>
        </>
    )
}