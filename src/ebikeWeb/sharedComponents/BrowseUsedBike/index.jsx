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
            RoutePath: "/used-bikes/honda-used-bikes-in-karachi-city/1/1"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Islamabad",
            RoutePath: "/used-bikes/honda-used-bikes-in-islamabad-city/1/3"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Peshawar",
            RoutePath: "/used-bikes/honda-used-bikes-in-peshawar-city/1/4"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Lahore",
            RoutePath: "/used-bikes/honda-used-bikes-in-lahore-city/1/2"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Faisalabad",
            RoutePath: "/used-bikes/honda-used-bikes-in-faisalabad-city/1/6"
        },
    ]
    const SuzukiArray = [
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Karachi",
            RoutePath: "/used-bikes/suzuki-used-bikes-in-karachi-city/6/1"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Islamabad",
            RoutePath: "/used-bikes/suzuki-used-bikes-in-islamabad-city/6/3"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Peshawar",
            RoutePath: "/used-bikes/suzuki-used-bikes-in-peshawar-city/6/4"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Lahore",
            RoutePath: "/used-bikes/suzuki-used-bikes-in-lahore-city/6/2"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Faisalbad",
            RoutePath: "/used-bikes/suzuki-used-bikes-in-faisalabad-city/6/6"
        },
    ]
    const YamahaArray = [
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Karachi",
            RoutePath: "/used-bikes/yamaha-used-bikes-in-karachi-city/7/1"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Islamabad",
            RoutePath: "/used-bikes/yamaha-used-bikes-in-islamabad-city/7/3"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Peshawar",
            RoutePath: "/used-bikes/yamaha-used-bikes-in-peshawar-city/7/4"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Lahore",
            RoutePath: "/used-bikes/yamaha-used-bikes-in-lahore-city/7/2"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Faisalabad",
            RoutePath: "/used-bikes/yamaha-used-bikes-in-faisalabad-city/7/6"
        },
    ]
    const UnitedArray = [
        {
            brandName: "United",
            bike_location: "United Bikes in Karachi",
            RoutePath: "/used-bikes/united-used-bikes-in-karachi-city/8/1"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Islamabad",
            RoutePath: "/used-bikes/united-used-bikes-in-islamabad-city/8/3"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Peshawar",
            RoutePath: "/used-bikes/united-used-bikes-in-peshawar-city/8/4"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Lahore",
            RoutePath: "/used-bikes/united-used-bikes-in-lahore-city/8/2"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Faisalabad",
            RoutePath: "/used-bikes/united-used-bikes-in-faisalabad-city/8/6"
        },
    ]
    const SuperPowerArray = [
        {
            brandName: "Super Power",
            bike_location: "SP Bikes in Karachi",
            RoutePath: "/used-bikes/super-power-used-bikes-in-karachi-city/5/1"
        },
        {
            brandName: "Super Power",
            bike_location: "SP Bikes in Islamabad",
            RoutePath: "/used-bikes/super-power-used-bikes-in-islamabad-city/5/3"
        },
        {
            brandName: "Super Power",
            bike_location: "SP Bikes in Peshawar",
            RoutePath: "/used-bikes/super-power-used-bikes-in-peshawar-city/5/4"
        },
        {
            brandName: "Super Power",
            bike_location: "SP Bikes in Lahore",
            RoutePath: "/used-bikes/super-power-used-bikes-in-Lahore-city/5/2"
        },
        {
            brandName: "Super Power",
            bike_location: "SP Bike in Faisalabad",
            RoutePath: "/used-bikes/super-power-used-bikes-in-Faisalabad-city/5/6"
        },
    ]
    const UniqueArray = [
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Karachi",
            RoutePath: "/used-bikes/unique-used-bikes-in-karachi-city/16/1"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Islamabad",
            RoutePath: "/used-bikes/unique-used-bikes-in-islamabad-city/16/3"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Peshawar",
            RoutePath: "/used-bikes/unique-used-bikes-in-peshawar-city/16/4"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Lahore",
            RoutePath: "/used-bikes/unique-used-bikes-in-lahore-city/16/2"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Faisalabad",
            RoutePath: "/used-bikes/unique-used-bikes-in-Faisalabad-city/16/6"
        },
    ]

    const GetHref = (RoutePath) =>{
        return RoutePath
    }
    return (
        <Box className={styles.browser}>
            <Box className={styles.container}>
                {/* <Typography className={styles.heading}>Browse More Used Bikes</Typography> */}
                <Grid container className={styles.main_container}>
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 4} className={styles.grid_list}>
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
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 4} className={styles.grid_list}>
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
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 4} className={styles.grid_list}>
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
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 4} className={styles.grid_list}>
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
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 4} className={styles.grid_list}>
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
                    <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 4} className={styles.grid_list}>
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