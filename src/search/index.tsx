'use client'
import React, { useState } from "react";
import { Box, Button, Grid, Link, Typography, Pagination } from "@mui/material";
import styles from './index.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { postSearch, priceWithCommas } from '@/genericFunctions/geneFunc'
import NewUsedBikesCard from "@/ebikeWeb/sharedComponents/itemCard";
import { useRouter } from "next/navigation";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";

export default function SearchPage() {
    const [SearchValue, setSearchValue] = useState('')
    const [ads, setAds] = useState([])
    const router = useRouter()
    const [IsLoading, setIsLoading] = useState(false)
    const [currentpage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [message, setMessage] = useState('')

    const handlepost = async (event:any, page: number) => {
        
        console.log('_currentPage', page)
        setMessage("")
        setIsLoading(true)
        if (!SearchValue) {
            alert('Pleas fill rquire field')
            return
        }
        const obj = {
            search: SearchValue,
            page: page,
            limit: '12'
        }

        const Post = await postSearch(obj)
        if (Post?.ads?.length > 0) {
            setAds(Post.ads)
            setIsLoading(false)
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 300);
            setTotalPage(Post?.totalPages)
        }
        else {
            setAds([])
            setIsLoading(false)
            setTotalPage(0)
            setMessage("No Result Found!")
        }
    }

    function goToDetailPage(val: any) {
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        router.push(`/used-bikes/${urlTitle}/${val.id}`)
    }

    function GridCard(val: any, ind: any) {
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
            {
                !IsLoading ?
                    <>
                        <Box className={styles.main_header}>
                            <Box className={styles.input_box}>
                                <input type="text" placeholder="search bike here..." className={styles.input} onChange={(e) => setSearchValue(e.target.value)} value={SearchValue} />
                                <Button className={styles.search_button} onClick={() => handlepost("",1)}><SearchIcon className={styles.icon} /></Button>
                            </Box>
                        </Box>
                        { message ? <p className="mt-5" > {message} </p> : "" }  
                        <Box>
                            <Box className={styles.grid_bike_list}>
                                {
                                    ads?.map((e: any, i: any) => {
                                        return (
                                            GridCard(e, i)
                                        )
                                    })
                                }
                            </Box>
                        </Box>    
                        {ads?.length > 0 ? <Box className={styles.pagination}>
                            <Pagination
                                count={totalPage}
                                onChange={handlepost}
                            />
                        </Box>  : "" }     
                    </>
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={IsLoading} />
                        </div>
                    </div>
            }
            
        </Box>
    )
}