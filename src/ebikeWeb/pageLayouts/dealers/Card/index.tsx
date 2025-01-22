'use client'
import { useMediaQuery } from '@mui/material';
import styles from './index.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation'

export const FeatureDealerCard = ({ props }: any) => {

    const params = useParams()
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width:768px)');

    function goToDetailPage(bike:any) {
        var shop_name = bike.shop_name;
        shop_name = shop_name.replace(/\s+/g, '-');
        var lowerTitle = shop_name.toLowerCase();
        router.push(`/dealers/${lowerTitle}/${bike.id}`)
    }

    return (
        <div className={styles.feature_card_main} onClick={isMobile ? ()=>goToDetailPage(props):undefined}>
            <p className={styles.shop_name}>{props.shop_name}</p>
            <img className={styles.logo} src={props.bike_brand.logoUrl} alt="" />
            <p className={styles.city}>Dealer in {props.city.city_name}</p>
            <p className={styles.address}>{props.address.slice(0, 12)} ...</p>
            <p className={styles.date}>Listen on {props.updatedAt.slice(0, 10)}</p>
            <button onClick={()=>goToDetailPage(props)} className={styles.more_details_button}>More Details</button>
        </div>
    )
}



export const DealerinPakCard = ({ props }: any) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const params = useParams()
    const router = useRouter()

    function goToDetailPage(bike:any) {
        var shop_name = bike.shop_name;
        shop_name = shop_name.replace(/\s+/g, '-');
        var lowerTitle = shop_name.toLowerCase();
        router.push(`/dealers/${lowerTitle}/${bike.id}`)
    }

    return (<>
        {isMobile ?            
            <div onClick={()=>goToDetailPage(props)} className={styles.dealer_card_main}>
                <p className={styles.shop_name} style={{display:isMobile ? 'flex': 'none'}}>{props.shop_name}</p>
            <div className={styles.image_box}>
                <img src={props.bike_brand.logoUrl} alt="" className={styles.image} />
            </div>
            <div className={styles.detail_box}>
                <p className={styles.shop_name}  style={{display:isMobile ? 'none': 'flex'}}>{props.shop_name}</p>
                <p className={styles.city}>Dealer in {props.city.city_name}</p>
                <p className={styles.address}><p className={styles.dealer_address}>{props.address.slice(0, 20)} ...</p> 
                <span style={{ marginRight: 7, marginLeft: 7, display:isMobile ? 'none': 'flex'}}>|</span> 
                <p className={styles.dealer_createAt}> Listed in <span style={{marginRight:7,marginLeft:7}}><ArrowForwardIcon sx={{fontSize:15,margin:0,color:"green"}}/></span> {props.createdAt.slice(0, 10)}</p>
                </p>
                <button className={styles.more_button} >View More Details</button>
            </div>
        </div>
            :
            <div className={styles.dealer_card_main}>
                <div className={styles.image_box}>
                    <img src={props.bike_brand.logoUrl} alt="" className={styles.image} />
                </div>
                <div className={styles.detail_box}>
                    <p className={styles.shop_name}>{props.shop_name}</p>
                    <p className={styles.city}>Dealer in {props.city.city_name}</p>
                    <p className={styles.address}>{props.address.slice(0, 25)} ... <span style={{ marginRight: 7, marginLeft: 7 }}>|</span> Listed in
                    <span style={{ marginRight: 7, marginLeft: 7 }}><ArrowForwardIcon sx={{ fontSize: 15, margin: 0, color: "green" }} /></span> {props.createdAt.slice(0, 10)}</p>
                    <button onClick={()=>goToDetailPage(props)} className={styles.more_button}>View More Details</button>
                </div>
            </div> 
        }

    </>
    )
}