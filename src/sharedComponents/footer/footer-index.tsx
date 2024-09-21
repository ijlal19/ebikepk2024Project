"use client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import styles from './footer-index.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import { Instagram, LinkedIn, Pinterest, Twitter, YouTube } from "@mui/icons-material";
import { useState } from "react";
// import styles from '../styles/footer-index.module.scss'


let cities_arr = [
    {title: "Used Bike by City", url: ""},
    {title: "City Karachi", url: ""},
    {title: "City Lahore", url: ""},
    {title: "City Quetta", url: ""},
    {title: "City Multan", url: ""},
    {title: "City Faisalabad", url: ""},
    {title: "City Peshawar", url: ""},
    {title: "City Islamabad", url: ""},
    {title: "City Rawalpindi", url: ""}
]
let year_arr = [
    {title: "Used Bike by Year", url: ""},
    {title: "Years 2020", url: ""},
    {title: "Years 2019", url: ""},
    {title: "Years 2018", url: ""},
    {title: "Years 2017", url: ""},
    {title: "Years 2016", url: ""},
    {title: "Years 2015", url: ""},
    {title: "Years 2014", url: ""},
    {title: "Years 2013", url: ""}
]
let cc_arr = [
    {title: "Used Bike by CC", url: ""},
    {title: "50cc", url: ""},
    {title: "70cc", url: ""},
    {title: "100cc", url: ""},
    {title: "110cc", url: ""},
    {title: "125cc", url: ""},
    {title: "150cc", url: ""},
    {title: "200cc", url: ""},
    {title: "250cc", url: ""}
]
let catagory_arr = [
    {title: "Explore Ebike", url: ""},
    {title: "Used Bikes", url: ""},
    {title: "New Bikes", url: ""},
    {title: "Showroom", url: ""},
    {title: "Videos", url: ""},
    {title: "Bikers Forum", url: ""},
    {title: "Shop", url: ""},
    {title: "Blog", url: ""},
    {title: "Bikes Price List", url: ""}
]
let brand_arr = [
    {title: "Used Bike by Brand", url: ""},
    {title: "Honda Bikes", url: ""},
    {title: "United Bikes", url: ""},
    {title: "Zxmco Bikes", url: ""},
    {title: "Unique Bikes", url: ""},
    {title: "Yamaha Bikes", url: ""},
    {title: "Road Prince", url: ""},
    {title: "Super Power", url: ""},
    {title: "Super Star", url: ""}
]

export default function Footer() {
    const [Mail,setMail]=useState('')
    
    function SendMail(e){
        e.preventDefault()
        alert(Mail)
        // setMail('')
    }



    function FooterLinks(heading, link1, link2, link3, link4, link5, link6, link7, link8){
        return(
            <>
            <ul className={styles.footer_ul}>
                <li>{heading}</li>
                <li>{link1}</li>
                <li>{link2}</li>
                <li>{link3}</li>
                <li>{link4}</li>
                <li>{link5}</li>
                <li>{link6}</li>
                <li>{link7}</li>
                <li>{link8}</li>
            </ul>
            </>
        )
    }

    return (
        <Box className={styles.box}>
            <Container>
                <Grid container className={styles.main}>
                    <Grid item xs={12} sm={10} md={10} lg={8} xl={8}  className={styles.links}>
                        <Grid container spacing={0}>
                            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                { FooterLinks( 
                                    'Used Bike by City',
                                    'City Karachi',
                                    'City Lahore',
                                    'City Quetta',
                                    'City Multan',
                                    'City Faisalabad',
                                    'City Peshawar',
                                    'City Islamabad',
                                    'City Rawalpindi')
                                }
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                                { FooterLinks ( 
                                    'Used Bike by Year',
                                    'Years 2020',
                                    'Years 2019',
                                    'Years 2018',
                                    'Years 2017',
                                    'Years 2016',
                                    'Years 2015',
                                    'Years 2014',
                                    'Years 2013')
                                }
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                { 
                                    FooterLinks( 
                                        'Used Bike by CC',
                                        '50CC',
                                        '70CC',
                                        '100CC',
                                        '110CC',
                                        '125CC',
                                        '150CC',
                                        '200CC',
                                        '250CC')
                                }
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                { 
                                    FooterLinks ( 
                                        'Explore Ebike',
                                        'Used Bikes',
                                        'New Bikes',
                                        'Showroom',
                                        'Videos',
                                        'Bikers Forum',
                                        'Shop',
                                        'Blog',
                                        'Bikes Price List')
                                }
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                { FooterLinks ( 
                                    'Used Bike by Brand',
                                    'Honda Bikes',
                                    'United Bikes',
                                    'Zxmco Bikes',
                                    'Unique Bikes',
                                    'Yamaha Bikes',
                                    'Road Prince',
                                    'Super Power',
                                    'Super Star')
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={styles.mail}>
                        <Typography sx={{ fontSize: '15px' }}>
                            Subscribe to our Newsletter
                        </Typography>
                        <Typography className={styles.getUser_mail}>
                            <form action="" className={styles.getUser_mail} onSubmit={SendMail}>
                                <input type="email" value={Mail} onChange={(e)=>setMail(e.target.value)} className={styles.TextField} placeholder="User@gmail.com" required/>
                                <Button variant="contained" type="submit">Send</Button>
                            </form>
                        </Typography>
                        <Typography sx={{ fontSize: '15px', marginTop: '10px'}}>
                                Follow Us
                            <Typography className={styles.Social_Links}>
                                <FacebookIcon sx={{ margin: '0px 10px',cursor:'pointer' }} />
                                <Instagram sx={{ margin: '0px 10px',cursor:'pointer' }} />
                                <LinkedIn sx={{ margin: '0px 10px',cursor:'pointer' }} />
                                <Pinterest sx={{ margin: '0px 10px',cursor:'pointer' }}/>
                                <Twitter sx={{ margin: '0px 10px',cursor:'pointer' }}/>
                                <YouTube sx={{ margin: '0px 10px',cursor:'pointer' }}/>
                            </Typography>
                        </Typography>
                        <Typography sx={{ margin: '10px 10px', fontSize: '15px' }}>
                            Download our mobile app <br />
                            <img src="#" alt="App" />
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}