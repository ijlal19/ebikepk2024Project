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
    {title: "Years 20220", url: ""},
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
    
    function SendMail(e:any){
        e.preventDefault()
        alert(Mail)
        // setMail('')
    }



    function FooterLinks(arr:any){
        return(
            <>
            <ul className={styles.footer_ul}>
                {arr.map((item:any, ind:any) => {
                    return(
                        <li key={item.title + ind}>{item.title}</li>
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
                    <Grid item xs={12} sm={10} md={10} lg={8} xl={8}  className={styles.links}>
                        <Grid container spacing={0}>
                            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                { FooterLinks(cities_arr)}
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                                { FooterLinks (year_arr) }
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                { FooterLinks(cc_arr) }
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                { FooterLinks (catagory_arr) }
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                { FooterLinks (brand_arr) }
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