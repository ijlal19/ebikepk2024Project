import React from "react";
import styles from './index.module.scss';
import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";

const BrowseUsedBike = () => {
    const isMobile = useMediaQuery('(max-width:1120px)');
    const isMobile2 = useMediaQuery('(max-width:768px)');
    const HondaArray = [
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Karachi",
            RoutePath: "/used-bikes/honda-bikes-in-karachi/1/1"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Islamabad",
            RoutePath: "/used-bikes/honda-bikes-in-islamabad/1/3"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Peshawar",
            RoutePath: "/used-bikes/honda-bikes-in-peshawar/1/4"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Lahore",
            RoutePath: "/used-bikes/honda-bikes-in-lahore/1/2"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Faisalabad",
            RoutePath: "/used-bikes/honda-bikes-in-faisalabad/1/6"
        },
    ]
    const SuzukiArray = [
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Karachi",
            RoutePath: "/used-bikes/suzuki-bikes-in-karachi/6/1"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Islamabad",
            RoutePath: "/used-bikes/suzuki-bikes-in-islamabad/6/3"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Peshawar",
            RoutePath: "/used-bikes/suzuki-bikes-in-peshawar/6/4"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Lahore",
            RoutePath: "/used-bikes/suzuki-bikes-in-lahore/6/2"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Faisalbad",
            RoutePath: "/used-bikes/suzuki-bikes-in-faisalabad/6/6"
        },
    ]
    const YamahaArray = [
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Karachi",
            RoutePath: "/used-bikes/yamaha-bikes-in-karachi/7/1"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Islamabad",
            RoutePath: "/used-bikes/yamaha-bikes-in-islamabad/7/3"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Peshawar",
            RoutePath: "/used-bikes/yamaha-bikes-in-peshawar/7/4"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Lahore",
            RoutePath: "/used-bikes/yamaha-bikes-in-lahore/7/2"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Faisalabad",
            RoutePath: "/used-bikes/yamaha-bikes-in-faisalabad/7/6"
        },
    ]
    const UnitedArray = [
        {
            brandName: "United",
            bike_location: "United Bikes in Karachi",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/8/1"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Islamabad",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/8/3"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Peshawar",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/8/4"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Lahore",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/8/2"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Faisalabad",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/8/6"
        },
    ]
    const SuperPowerArray = [
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Karachi",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/5/1"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Islamabad",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/5/3"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Peshawar",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/5/4"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Lahore",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/5/2"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bike in Faisalabad",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/5/6"
        },
    ]
    const UniqueArray = [
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Karachi",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/16/1"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Islamabad",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/16/3"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Peshawar",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/16/4"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Lahore",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/16/2"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Faisalabad",
            RoutePath: "/used-bikes/used-bike-by-brand-and-city/16/6"
        },
    ]

    const GetHref = (RoutePath) =>{
        console.log("datakl" , RoutePath)
        return RoutePath
    }
    return (
        <Box className={styles.browser}>
            <Box className={styles.container}>
                <Typography className={styles.heading}>Browse More Used Bikes</Typography>
                <Grid container className={styles.main_container}>
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                HondaArray.map((data, i) => {
                                    
                                    return (
                                        <li key={i} className={styles.li}><Link href={GetHref(data?.RoutePath)} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                SuzukiArray.map((data, i) => {
                                    
                                    return (
                                        <li key={i} className={styles.li}><Link href={GetHref(data?.RoutePath)} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                YamahaArray.map((data, i) => {
                                    
                                    return (
                                        <li key={i} className={styles.li}><Link href={GetHref(data?.RoutePath)} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                UnitedArray.map((data, i) => {
                                    
                                    return (
                                        <li key={i} className={styles.li}><Link href={GetHref(data?.RoutePath)} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                UniqueArray.map((data, i) => {
                                    
                                    return (
                                        <li key={i} className={styles.li}><Link href={GetHref(data?.RoutePath)} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                SuperPowerArray.map((data, i) => {
                                    
                                    return (
                                        <li key={i} className={styles.li}><Link href={GetHref(data?.RoutePath)} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default BrowseUsedBike