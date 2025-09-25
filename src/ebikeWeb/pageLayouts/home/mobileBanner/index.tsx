'use client';
import { Box, Grid, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
import Link from 'next/link';
import {isLoginUser} from "@/genericFunctions/geneFunc";
import { useRouter } from 'next/navigation';

const MobileBanner = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const Router = useRouter()

    function goToRoute(url:any) {
        let _isLoginUser = isLoginUser()
        if(_isLoginUser?.login) {
          Router.push(url)
        }
        else {
          if(document.getElementById('general_login_btn')) { 
            document.getElementById('general_login_btn')?.click()
          }
        }
      }

    return (
       <div className={styles.main_mob_container}>
            <div className={styles.mobile_card}>
                <div className={styles.text_box}>
                    <p className={styles.p1} > Want to Sell your bike ?</p>
                    <p className={styles.p2} > Post your Bike Ad for free </p>
                    <p className={styles.p2} > Post your free Bike video Ad </p>
                    <p className={styles.p2} >  Sell your Bike at best price </p>
                    <p className={styles.p3} > <span onClick={()=>{goToRoute('/used-bikes/sell-used-bike') }} > sell your bike </span> </p>
                </div>
                <img className={styles.right_img} src="https://res.cloudinary.com/dzfd4phly/image/upload/v1757678416/WhatsApp_Image_2025-09-12_at_15.58.57_gabtpm.jpg" />
            </div>

             <div className={styles.mobile_baner}>
                <img className={styles.baner_image} src="https://res.cloudinary.com/dulfy2uxn/image/upload/v1608021415/Youtube%20Ad%20banners/ebike_banner_Black_1_syhm9t.jpg" />
             </div>
       </div>
    );
};

export default MobileBanner;


