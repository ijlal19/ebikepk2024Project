// import { Box, Grid, Typography } from "@mui/material"
// import React from "react"
// import useMediaQuery from '@mui/material/useMediaQuery';
// import styles from './index.module.scss'
// import Link from "next/link"

// const ShopFooter = ()=>{

//     console.log(Box,Grid,useMediaQuery)
//     const headerlink_arr = [
//         { title: "Ebike.pk", url: "/" },
//         { title: "Contact us", url: "/contact-us" },
//         { title: "About us", url: "/about-us" },
//         { title: "Bike Verification Sindh", url: "/mtmis-sindh" },
//         { title: "Bike Verification Punjab", url: "/mtmis-punjab" }
//     ]


//     function FooterLinks(arr: any) {
//         return (
//             <>
//                 <ul className={styles.footer_ul}>
//                     {arr.map((item: any, ind: any) => {
//                         return (
//                             ind == 0 ? 
//                             <li className={styles.link_heading} key={item.title + ind}>{item.title}</li> 
//                             :
//                             <Link className={styles.link} href={item.url}>
//                                 <li className={styles.link_text} key={item.title + ind}>{item.title}</li>
//                             </Link>
//                         )
//                     })}
//                 </ul>
//             </>
//         )
//     }
//     const isMobile = useMediaQuery("(max-width: 768px)");
//     return(
//         <Box className={styles.shop_footer_main}>
//             <Grid container>
//                 <Grid item xs={isMobile ? 12 : 6} className={styles.footer_para}>
//                     <Box className={styles.footer_logo}>
//                         <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="" className={styles.logo}/>
//                     </Box>
//                     <Typography className={styles.footer_para}>

//                     </Typography>
//                 </Grid>
//                 <Grid item xs={isMobile ? 12 : 3} className={styles.footer_link}>
//                 {FooterLinks(headerlink_arr)}
//                 </Grid>
//                 <Grid item xs={isMobile ? 12 : 3} className={styles.footer_media_link}></Grid>
//             </Grid>
//         </Box>
//     )
// }
// export default ShopFooter

'use client'
import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material"; // Sahi imports
import styles from './index.module.scss';
import Link from "next/link";
import { Instagram, LinkedIn, Pinterest, Twitter, YouTube } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';


const ShopFooter = () => {
    const isMobile = useMediaQuery('(max-width:768px')

    let headerlink_arr = [
        { title: "Know About Us", url: "/" },
        { title: "About us", url: "/about-us" },
        { title: "Contact us", url: "/contact-us" },
        { title: "Privacy Ploicy", url: "" },
        { title: "Terms & Condition", url: "" },
        { title: "Whatsapp 0336-3137863", url: "" }
    ];

    function FooterLinks(arr: any) {
        return (
            <ul className={styles.footer_ul}>
                {arr.map((item: any, ind: any) => {
                    return (
                        ind === 0 ?
                            <li className={styles.link_heading} key={item.title + ind}>{item.title}</li>
                            :
                            <Link className={styles.link} href={item.url} key={item.title + ind}>
                                <li className={styles.link_text}>{item.title}</li>
                            </Link>
                    );
                })}
            </ul>
        );
    }

    return (
        <Box className={styles.shop_footer_main} sx={{ height: isMobile ? "auto" : "310px" }}>
            <Grid container className={styles.main_grid}>

                <Grid item xs={isMobile ? 12 : 6} className={styles.footer_para_box}>
                    <Box className={styles.footer_logo}>
                        <img
                            src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png"
                            alt=""
                            className={styles.logo}
                        />
                    </Box>
                    <Typography className={styles.footer_para}>
                        Let ebikeshop.pk take your online Motorcycle shopping all over Pakistan to a new level. Our simple effective and efficient layout allows you to shop Motorcycle Accessories & Parts in a simple effective way. Just browse through our product galleries from the comfort of your seat and choose your favorite product of your choice. Shop now to experience the difference of ebikeshop.pk.
                    </Typography>
                </Grid>

                <Grid item xs={isMobile ? 12 : 3}>
                    {FooterLinks(headerlink_arr)}
                </Grid>

                <Grid item xs={isMobile ? 12 : 3} className={styles.mail}>
                    <Typography className={styles.social_heading}>
                       Social
                        <Typography className={styles.Social_Links}>

                            <Link href='https://web.facebook.com/ebike.pk' target="blank" className={styles.Link}>
                                <FacebookIcon sx={{ margin: '0px', cursor: 'pointer', fontSize: '25px' }} />
                            </Link>

                            <Link href='https://www.instagram.com/ebikepak/' target="blank" className={styles.Link}>
                                <Instagram sx={{ margin: '0px', cursor: 'pointer', fontSize: '25px' }} />
                            </Link>

                            <Link href='https://www.linkedin.com/in/ebikepk/' target="blank" className={styles.Link}>
                                <LinkedIn sx={{ margin: '0px', cursor: 'pointer', fontSize: '25px' }} />
                            </Link>

                            <Link href='#' target="blank" className={styles.Link}>
                                <Pinterest sx={{ margin: '0px', cursor: 'pointer', fontSize: '25px' }} />
                            </Link>

                            <Link href='https://twitter.com/ebikepk' target="blank" className={styles.Link}>
                                <Twitter sx={{ margin: '0px', cursor: 'pointer', fontSize: '25px' }} />
                            </Link>

                            <Link href='https://www.youtube.com/@ebikepk' target="blank" className={styles.Link}>
                                <YouTube sx={{ margin: '0px', cursor: 'pointer', fontSize: '25px' }} />
                            </Link>

                        </Typography>
                    </Typography>
                    <Typography className={styles.download_app}>
                        Download our mobile app
                        <Box className={styles.download_image}>
                            <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_fill,f_auto,q_auto,w_120,h_35/v1583472423/ebike-graphics/logos/google_logo_1.png" alt="App" />
                        </Box>
                    </Typography>
                </Grid>

                <Grid item xs={isMobile ? 12 : 12} className={styles.copyright_box}>
                    <Typography className={styles.copyright}>
                        Copyright © 2017 - 2024 ebikeshop.pk - All Rights Reserved.
                    </Typography>
                </Grid>

            </Grid>
        </Box>
    );
};

export default ShopFooter;
