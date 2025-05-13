import React from "react";
import styles from './index.module.scss';
import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";

const BrowseUsedBike = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
const HondaArray = [
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Karachi",
            url: "used-bike-by-brand-and-city/1/1"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Islamabad",
            url: "used-bike-by-brand-and-city/1/3"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Peshawar",
            url: "used-bike-by-brand-and-city/1/4"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Lahore",
            url: "used-bike-by-brand-and-city/1/2"
        },
        {
            brandName: "Honda",
            bike_location: "Honda Bikes in Faisalabad",
            url: "used-bike-by-brand-and-city/1/6"
        },
    ]
    const SuzukiArray = [
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Karachi",
            url: "used-bike-by-brand-and-city/6/1"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Islamabad",
            url: "used-bike-by-brand-and-city/6/3"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Peshawar",
            url: "used-bike-by-brand-and-city/6/4"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Lahore",
            url: "used-bike-by-brand-and-city/6/2"
        },
        {
            brandName: "Suzuki",
            bike_location: "Suzuki Bikes in Faisalbad",
            url: "used-bike-by-brand-and-city/6/6"
        },
    ]
    const ZxmcoArray = [
        {
            brandName: "Zxmco",
            bike_location: "Zxmco Bikes in Karachi",
            url: "used-bike-by-brand-and-city/10/1"
        },
        {
            brandName: "Zxmco",
            bike_location: "Zxmco Bikes in Islamabad",
            url: "used-bike-by-brand-and-city/10/3"
        },
        {
            brandName: "Zxmco",
            bike_location: "Zxmco Bikes in Peshawar",
            url: "used-bike-by-brand-and-city/10/4"
        },
        {
            brandName: "Zxmco",
            bike_location: "Zxmco Bikes in Lahore",
            url: "used-bike-by-brand-and-city/10/2"
        },
        {
            brandName: "Zxmco",
            bike_location: "Zxmco Bikes in Faisalabad",
            url: "used-bike-by-brand-and-city/10/6"
        },
    ]
    const UnitedArray = [
        {
            brandName: "United",
            bike_location: "United Bikes in Karachi",
            url: "used-bike-by-brand-and-city/8/1"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Islamabad",
            url: "used-bike-by-brand-and-city/8/3"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Peshawar",
            url: "used-bike-by-brand-and-city/8/4"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Lahore",
            url: "used-bike-by-brand-and-city/8/2"
        },
        {
            brandName: "United",
            bike_location: "United Bikes in Faisalabad",
            url: "used-bike-by-brand-and-city/8/6"
        },
    ]
    return (
        <Box className={styles.browser}>
            <Box className={styles.container}>
                <Typography className={styles.heading}>Browse More Used Bikes</Typography>
                <Grid container className={styles.main_container}>
                    <Grid item xs={isMobile ? 6 : 3} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                HondaArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 3} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                UnitedArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 3} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                ZxmcoArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </Grid>
                    <Grid item xs={isMobile ? 6 : 3} className={styles.grid_list}>
                        <ul className={styles.ul}>
                            {
                                SuzukiArray.map((data, i) => {
                                    return (
                                        <li key={i} className={styles.li}><Link href={`used-bikes/${data?.url}`} className={styles.li} >{data?.bike_location}</Link></li>
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