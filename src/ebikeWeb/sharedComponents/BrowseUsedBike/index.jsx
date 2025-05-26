import React from "react";
import styles from './index.module.scss';
import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";

const BrowseUsedBike = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
const HondaArray = [
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Karachi",
            url: "1/1"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Islamabad",
            url: "1/3"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Peshawar",
            url: "1/4"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Lahore",
            url: "1/2"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Faisalabad",
            url: "1/6"
        },
    ]
    const SuzukiArray = [
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Karachi",
            url: "6/1"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Islamabad",
            url: "6/3"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Peshawar",
            url: "6/4"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Lahore",
            url: "6/2"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Faisalbad",
            url: "6/6"
        },
    ]
    const YamahaArray = [
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Karachi",
            url: "7/1"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Islamabad",
            url: "7/3"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Peshawar",
            url: "7/4"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Lahore",
            url: "7/2"
        },
        {
            brandName: "Yamaha",
            bike_location: "Yamaha Bikes in Faisalabad",
            url: "7/6"
        },
    ]
    const UnitedArray = [
        {
            brandName: "United",
            bike_location: "United Bikes in Karachi",
            url: "8/1"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Islamabad",
            url: "8/3"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Peshawar",
            url: "8/4"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Lahore",
            url: "8/2"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Faisalabad",
            url: "8/6"
        },
    ]
    const SuperPowerArray = [
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Karachi",
            url: "5/1"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Islamabad",
            url: "5/3"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Peshawar",
            url: "5/4"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bikes in Lahore",
            url: "5/2"
        },
        {
            brandName: "Super Power",
            bike_location: "Super Power Bike in Faisalabad",
            url: "5/6"
        },
    ]
    const UniqueArray = [
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Karachi",
            url: "16/1"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Islamabad",
            url: "16/3"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Peshawar",
            url: "16/4"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Lahore",
            url: "16/2"
        },
        {
            brandName: "Unique",
            bike_location: "Unique Bikes in Faisalabad",
            url: "16/6"
        },
    ]
    return (
        <Box className={styles.browser}>
            <Box className={styles.container}>
                <Typography className={styles.heading}>Browse More Used Bikes</Typography>
                <Grid container className={styles.main_container}>
                    <Grid item xs={isMobile ? 6 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                HondaArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/used-bike-by-brand-and-city/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                              {
                                SuzukiArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/used-bike-by-brand-and-city/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                YamahaArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/used-bike-by-brand-and-city/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                UnitedArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/used-bike-by-brand-and-city/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                UniqueArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/used-bike-by-brand-and-city/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 2} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                SuperPowerArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/used-bike-by-brand-and-city/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
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