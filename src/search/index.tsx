'use client'
import React, { useState } from "react";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import styles from './index.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { postSearch, priceWithCommas } from '@/genericFunctions/geneFunc'
import NewUsedBikesCard from "@/ebikeWeb/sharedComponents/itemCard";
import { useRouter } from "next/navigation";

export default function SearchPage() {
    const [SearchValue, setSearchValue] = useState('')
    const [ads, setAds] = useState([])
    const router = useRouter()

    const handlepost = async () => {
        if (!SearchValue) {
            alert('Pleas fill rquire field')
            return
        }
        const obj = {
            search: SearchValue,
            page: 1,
            limit: '12'
        }

        const Post = await postSearch(obj)

        console.log("data", Post)
        console.log("data", Post.total)
        console.log("data", Post.currentPage)
        console.log("data", Post.totalPages)
        if (Post?.ads?.length > 0) {
            // Post?.ads?.map((data:any)=>{
            //     data['data'] =  data?.images?.length > 0 ? data.images[0] : ""
            // })
        }
        setAds(Post.ads)
    }

    function goToDetailPage(val: any) {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        router.push(`/used-bikes/${urlTitle}/${val.id}`)
    }

    function GridCard(val: any, ind: any) {
        // let brand = getBrandFromId(val?.brandId, BrandArr)
        // let city = getCityFromId(val?.cityId, CityArr)
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        let href = `/used-bikes/${urlTitle}/${val.id}`

        return (
            <Link
                href={href}
                key={ind}
                className={styles.grid_card}
                sx={{ textDecoration: "none" }}
            >
                <Grid container onClick={() => { goToDetailPage(val) }}>

                    <Grid item className={styles.grid_image_box}>
                        {val.images && val.images.length > 0 ? <img src={val?.images[0]} alt="" /> : <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png" alt="" />}
                    </Grid>

                    <Grid item className={styles.grid_card_info}>

                        <Typography className={styles.grid_card_title}> {val?.title} </Typography>

                        <Typography className={styles.grid_card_location}> {val?.city?.city_name} </Typography>

                        <Typography className={styles.grid_card_price}>PKR {priceWithCommas(val?.price)}</Typography>

                        <Typography className={styles.grid_bike_details}>
                            {val?.year?.year}
                            <span className={styles.grid_verticl_line}> | </span>
                            <span> {val?.bike_brand?.brandName} </span>
                            <span className={styles.grid_verticl_line}> | </span>
                            <span className={styles.grid_verticl_line}> {val?.city?.city_name} </span>
                        </Typography>
                    </Grid>
                </Grid>
            </Link>
        )
    }

    return (
        <Box className={styles.main}>
            <Box className={styles.main_header}>
                <Box className={styles.input_box}>
                    <input type="text" placeholder="search" className={styles.input} onChange={(e) => setSearchValue(e.target.value)} />
                    <Button className={styles.search_button} onClick={() => handlepost()}><SearchIcon className={styles.icon} /></Button>
                </Box>
            </Box>
            <Box>
                <Box className={styles.grid_bike_list}>
                    {
                        ads?.map((e: any, i: any) => {
                            // console.log("data", e)
                            return (
                                GridCard(e, i) 
                            )
                    })
                    }
                </Box>
            </Box>
            {/* <Box className={styles.pagination}>
                <Box className={styles.pagination_box}>1</Box>
            </Box> */}
        </Box>
    )
}