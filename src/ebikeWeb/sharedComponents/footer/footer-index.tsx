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
    { title: "City Karachi", url: "/used-bikes/bike-by-city/karachi/1" },
    { title: "City Lahore", url: "/used-bikes/bike-by-city/lahore/2" },
    { title: "City Quetta", url: "/used-bikes/bike-by-city/quetta/5" },
    { title: "City Multan", url: "/used-bikes/bike-by-city/multan/10" },
    { title: "City Faisalabad", url: "/used-bikes/bike-by-city/faisalabad/6" },
    { title: "City Peshawar", url: "/used-bikes/bike-by-city/peshawar/4" },
    { title: "City Islamabad", url: "/used-bikes/bike-by-city/islamabad/3" },
    { title: "City Rawalpindi", url: "/used-bikes/bike-by-city/rawalpindi/8" }
]
let year_arr = [
    { title: "Used Bike by Year", url: "" },
    { title: "Years 2025", url: "/used-bikes/bike-by-year/2025/58" },
    { title: "Years 2024", url: "/used-bikes/bike-by-year/2024/57" },
    { title: "Years 2023", url: "/used-bikes/bike-by-year/2023/56" },
    { title: "Years 2022", url: "/used-bikes/bike-by-year/2022/55" },
    { title: "Years 2021", url: "/used-bikes/bike-by-year/2021/54" },
    { title: "Years 2020", url: "/used-bikes/bike-by-year/2020/53" },
    { title: "Years 2019", url: "/used-bikes/bike-by-year/2019/52" },
    { title: "Years 2018", url: "/used-bikes/bike-by-year/2018/51" },
    { title: "Years 2017", url: "/used-bikes/bike-by-year/2017/50" }
]
let cc_arr = [
    { title: "Used Bike by CC", url: "" },
    { title: "50cc", url: "/used-bikes/bike-by-cc/50/1" },
    { title: "70cc", url: "/used-bikes/bike-by-cc/70/1" },
    { title: "100cc", url: "/used-bikes/bike-by-cc/100/1" },
    { title: "110cc", url: "/used-bikes/bike-by-cc/110/1" },
    { title: "125cc", url: "/used-bikes/bike-by-cc/125/1" },
    { title: "150cc", url: "/used-bikes/bike-by-cc/150/1" },
    { title: "200cc", url: "/used-bikes/bike-by-cc/200/1" },
    { title: "250cc", url: "/used-bikes/bike-by-cc/250/1" },
    { title: "300cc", url: "/used-bikes/bike-by-cc/300/1" },
]

let catagory_arr = [
    { title: "Explore Ebike", url: "" },
    { title: "Used Bikes", url: "/used-bikes" },
    { title: "New Bikes", url: "/new-bikes" },
    { title: "Showroom", url: "/dealers" },
    { title: "Videos", url: "https://www.youtube.com/@ebikepk" },
    { title: "Bikers Forum", url: "" },
    { title: "Shop", url: "" },
    { title: "Blog", url: "/blog" },
    { title: "Bikes Price List", url: "/new-bike-price" },
    { title: "Dealers", url: "/dealers" },
    { title: "Mechanics", url: "/mechanics" }
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
    { title: "About us", url: "/page/about-us/14" },
    // { title: "MTMIS Pakistan", url: "" },
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

                            {/* <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(cc_arr_2)}
                            </Grid> */}

                            

                            <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(catagory_arr)}
                            </Grid>

                            {/* <Grid item xs={isMobileUl ? 6 : 4}>
                                {FooterLinks(brand_arr)}
                            </Grid> */}

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

                                <Link href='https://www.pinterest.com/ebikepk/' target="blank"  className={styles.Link}>
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
                            Copyright © 2017 - 2024 ebike.pk - All Rights Reserved.
                        </Typography>
                        <Typography className={styles.term_policy}>
                            <Link href="/page/terms-and-conditions/25" className={styles.link}> Terms of Service </Link>  | <Link href="/page/privacy-policy/13" className={styles.link}> Privacy Policy </Link> 
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