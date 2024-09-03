import { Box, Button, Container, Grid, Typography } from "@mui/material";
import FooterLinks from "../FooterLink/FooterLink";
import './footer-index.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import { Instagram, LinkedIn, Pinterest, Twitter, YouTube } from "@mui/icons-material";
import { useState } from "react";

export default function Footer() {
    const [Mail,setMail]=useState()
    function SendMail(e){
        e.preventDefault()
        alert(Mail)
        setMail('')
    }
    return (
        <Box className='box'>
            <Container>
                <Grid container className="main">
                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8} className="links">
                        <Grid container>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}><FooterLinks heading='Used Bike by City'
                                link1='City Karachi'
                                link2='City Lahore'
                                link3='City Quetta'
                                link4='City Multan'
                                link5='City Faisalabad'
                                link6='City Peshawar'
                                link7='City Islamabad'
                                link8='City Rawalpindi'
                            /></Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}><FooterLinks heading='Used Bike by Year'
                                link1='Years 2020'
                                link2='Years 2019'
                                link3='Years 2018'
                                link4='Years 2017'
                                link5='Years 2016'
                                link6='Years 2015'
                                link7='Years 2014'
                                link8='Years 2013'
                            /></Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}><FooterLinks heading='Used Bike by CC'
                                link1='50CC '
                                link2='70CC '
                                link3='100CC'
                                link4='110CC'
                                link5='125CC'
                                link6='150CC'
                                link7='200CC'
                                link8='250CC'
                            /></Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}><FooterLinks heading='Explore Ebike'
                                link1='Used Bikes'
                                link2='New Bikes'
                                link3='Showroom'
                                link4='Videos'
                                link5='Bikers Forum'
                                link6='Shop'
                                link7='Blog'
                                link8='Bikes Price List'
                            /></Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}><FooterLinks heading='Used Bike by Brand'
                                link1='Honda Bikes'
                                link2='United Bikes'
                                link3='Zxmco Bikes'
                                link4='Unique Bikes'
                                link5='Yamaha Bikes'
                                link6='Road Prince'
                                link7='Super Power'
                                link8='Super Star'
                            /></Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className="mail">
                        <Typography sx={{ fontSize: '18px' }}>
                            Subscribe to our Newsletter
                        </Typography>
                        <Typography className="getUser_mail">
                            <form action="" className="getUser_mail" onSubmit={SendMail}>
                            <input type="email" value={Mail} onChange={(e)=>setMail(e.target.value)} className="TextField" placeholder="User@gmail.com" required/>
                            <Button variant="contained" type="submit">Send</Button>
                            </form>
                        </Typography>
                        <Typography sx={{ fontSize: '18px', marginTop: '20px' }}>
                            Follow Us
                            <Typography className="Social_Links">
                                <FacebookIcon sx={{ margin: '0px 10px',cursor:'pointer' }} />
                                <Instagram sx={{ margin: '0px 10px',cursor:'pointer' }} />
                                <LinkedIn sx={{ margin: '0px 10px',cursor:'pointer' }} />
                                <Pinterest sx={{ margin: '0px 10px',cursor:'pointer' }}/>
                                <Twitter sx={{ margin: '0px 10px',cursor:'pointer' }}/>
                                <YouTube sx={{ margin: '0px 10px',cursor:'pointer' }}/>
                            </Typography>
                        </Typography>
                        <Typography sx={{ margin: '10px 10px', fontSize: '18px' }}>
                            Download our mobile app <br />
                            <img src="#" alt="App" />
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

// Footer Links 
import './Footerlink.scss'
export default function FooterLinks({heading,link1,link2,link3,link4,link5,link6,link7,link8}){
    return(
        <>
        <ul className='ul'>
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

// Footer Link SCSS
.ul{
    text-align: left;
    line-height: 30px;
    list-style-type: none;
    li:nth-child(1){
        color: rgb(255, 255, 255);
        font-size: 18px;
        cursor: default;
        padding-top: 20px;
        padding-bottom: 5px;
        transition: none;
        text-decoration: none !important;
    }
    li{
        color: grey;
        font-size: 15px;
        cursor: pointer;
        transition: 1s ease;
    }
    li:hover{
        text-decoration: underline;
        color: rgb(255, 255, 255);
    }
}