"use client";
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import styles from './footer-index.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import { Instagram, LinkedIn, Pinterest, Twitter, YouTube } from "@mui/icons-material";
import { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'

let cities_arr = [
    { title: "Used Bike by City", url: "" },
    { title: "City Karachi", url: "" },
    { title: "City Lahore", url: "" },
    { title: "City Quetta", url: "" },
    { title: "City Multan", url: "" },
    { title: "City Faisalabad", url: "" },
    { title: "City Peshawar", url: "" },
    { title: "City Islamabad", url: "" },
    { title: "City Rawalpindi", url: "" }
]
let year_arr = [
    { title: "Used Bike by Year", url: "" },
    { title: "Years 2020", url: "" },
    { title: "Years 2019", url: "" },
    { title: "Years 2018", url: "" },
    { title: "Years 2017", url: "" },
    { title: "Years 2016", url: "" },
    { title: "Years 2015", url: "" },
    { title: "Years 2014", url: "" },
    { title: "Years 2013", url: "" }
]
let cc_arr = [
    { title: "Used Bike by CC", url: "" },
    { title: "50cc", url: "" },
    { title: "70cc", url: "" },
    { title: "100cc", url: "" },
    { title: "110cc", url: "" },
    { title: "125cc", url: "" },
    { title: "150cc", url: "" },
    { title: "200cc", url: "" },
    { title: "250cc", url: "" }
]
let catagory_arr = [
    { title: "Explore Ebike", url: "" },
    { title: "Used Bikes", url: "/used-bikes" },
    { title: "New Bikes", url: "" },
    { title: "Showroom", url: "" },
    { title: "Videos", url: "" },
    { title: "Bikers Forum", url: "" },
    { title: "Shop", url: "" },
    { title: "Blog", url: "/blog" },
    { title: "Bikes Price List", url: "" }
]
let brand_arr = [
    { title: "Used Bike by Brand", url: "" },
    { title: "Honda Bikes", url: "" },
    { title: "United Bikes", url: "" },
    { title: "Zxmco Bikes", url: "" },
    { title: "Unique Bikes", url: "" },
    { title: "Yamaha Bikes", url: "" },
    { title: "Road Prince", url: "" },
    { title: "Super Power", url: "" },
    { title: "Super Star", url: "" }
]
let headerlink_arr = [
    { title: "Ebike.pk", url: "/" },
    { title: "Contact us", url: "/contact-us" },
    { title: "About us", url: "/about-us" },
    { title: "MTMIS Pakistan", url: "" },
    { title: "Bike Verification Sindh", url: "/mtmis-sindh" },
    { title: "Bike Verification Punjab", url: "/mtmis-punjab" }
]
export default function Footer() {

    const [Mail, setMail] = useState('')
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isMobileUl = useMediaQuery('(max-width: 580px)');

    function SendMail(e: any) {
        e.preventDefault()
        alert(Mail)
        // setMail('')
    }



    function FooterLinks(arr: any) {
        return (
            <>
                <ul className={styles.footer_ul}>
                    {arr.map((item: any, ind: any) => {
                        return (
                            ind == 0 ? 
                            <li className={styles.link_heading} key={item.title + ind}>{item.title}</li> 
                            :
                            <Link className={styles.link} href={item.url}>
                                <li className={styles.link_text} key={item.title + ind}>{item.title}</li>
                            </Link>
                        )
                    })}
                </ul>
            </>
        )
    }

    return (
        <Box className={styles.box}>
            <Container>
                <Grid container className={styles.main}>
                    <Grid item xs={isMobile ? 12 : 8} className={styles.links}>
                        <Grid container >

                            <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(cities_arr)}
                            </Grid>

                            <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(year_arr)}
                            </Grid>

                            <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(cc_arr)}
                            </Grid>

                            <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(catagory_arr)}
                            </Grid>

                            <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(brand_arr)}
                            </Grid>

                            <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(headerlink_arr)}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={isMobile ? 12 : 4} className={styles.mail}>
                        <Typography className={styles.subscribe_heading}>
                            Subscribe to our Newsletter
                            <Typography className={styles.getUser_mail}>
                                <form action="" className={styles.getUser_mail} onSubmit={SendMail}>
                                    <input type="email" value={Mail} onChange={(e) => setMail(e.target.value)} className={styles.TextField} placeholder="User@gmail.com" required />
                                    <Button variant="contained" type="submit" sx={{ borderRadius: 0 }}>Send</Button>
                                </form>
                            </Typography>
                        </Typography>
                        <Typography className={styles.follow_heading}>
                            Follow Us
                            <Typography className={styles.Social_Links}>

                                <Link href='https://web.facebook.com/ebike.pk' target="blank" className={styles.Link}>
                                <FacebookIcon sx={{ margin: '0px', cursor: 'pointer',fontSize:'25px'}} />
                                </Link>

                                <Link href='https://www.instagram.com/ebikepak/' target="blank" className={styles.Link}>
                                <Instagram sx={{ margin: '0px', cursor: 'pointer',fontSize:'25px' }} />
                                </Link>

                                <Link href='https://www.linkedin.com/in/ebikepk/' target="blank" className={styles.Link}>
                                <LinkedIn sx={{ margin: '0px', cursor: 'pointer',fontSize:'25px' }} />
                                </Link>

                                <Link href='#' target="blank"  className={styles.Link}>
                                <Pinterest sx={{ margin: '0px', cursor: 'pointer' ,fontSize:'25px'}} />
                                </Link>

                                <Link href='https://twitter.com/ebikepk' target="blank" className={styles.Link}>
                                <Twitter sx={{ margin: '0px', cursor: 'pointer',fontSize:'25px' }} />
                                </Link>

                                <Link href='https://www.youtube.com/@ebikepk' target="blank" className={styles.Link}>
                                <YouTube sx={{ margin: '0px', cursor: 'pointer',fontSize:'25px' }} />
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
                            Copyright © 2004 - 2025 ebike.pk - All Rights Reserved.
                        </Typography>
                        <Typography className={styles.term_policy}>
                            <Link href="/terms-and-conditions" className={styles.link}> Terms of Service </Link>  | <Link href="/privacy-policy" className={styles.link}> Privacy Policy </Link> 
                        </Typography>
                        <Typography className={styles.permission}>
                            Reproduction of material from any Ebike.pk pages without permission is strictly prohibited.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}