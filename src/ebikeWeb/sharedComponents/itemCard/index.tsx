import { priceWithCommas } from '@/genericFunctions/geneFunc';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Button, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import Card from '@mui/material/Card';

export default function NewUsedBikesCard(props: any) {

    const [isFeatureTagShow, setIsFeaturedTagShow] = useState(false)
    const Router = useRouter()
    useEffect(()=>{
        if (window.location.pathname.indexOf('used-bikes') !== -1) {
            setIsFeaturedTagShow(true)
        }
        else {
            setIsFeaturedTagShow(false)
        }
    },[])

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
            Router.push(bike?.url)
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

        else if (props.currentpage === 'featured_bike' || props.currentpage === 'trending_bike') {
            return bike?.url;
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

    return (
        <>
            <Card className={styles.itemCard}>
                {props.currentpage === 'featured_bike' ?
                    (isFeatureTagShow ?
                        <span className={styles.featured_tag}>FEATURED</span> : "")
                    : ""}
                <CardMedia
                    component="img"
                    alt={bike.title}
                    height="230"
                    image={imgUrl ? imgUrl : 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'}
                    className={`${styles.card_img} ${props.from == "newBikeComp" ? styles.card_img_dynamic_height : ""}`}
                />

                <CardContent className={styles.card_info}>

                    <Typography className={styles.card_title}>
                        {bike.title}
                    </Typography>

                    <Typography className={styles.card_price}>
                        {bike?.price ? priceWithCommas(bike?.price) : "0"}
                    </Typography>

                    {props.from == "usedBikeComp" ?

                        <Typography className={styles.card_location}>
                            {bike.location}
                        </Typography>

                        : ""}

                    {props.from != "myAdsComp" ?

                        <Link href={getBikeUrl(bike)}>
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