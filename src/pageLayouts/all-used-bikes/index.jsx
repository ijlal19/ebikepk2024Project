'use client'
import { Box, Typography } from '@mui/material'
import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import { getAllbikesDetail } from "@/functions/globalFuntions"
import { Apps, FormatListBulleted } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import Filters from '@/sharedComponents/filters'
const AllUsedBike = () => {

    const [allBikesArr, setAllBikesArr] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        fetchBikeInfo(pageNo)
    }, [])
    async function fetchBikeInfo(_pageNo) {
        let curentFetchPage = _pageNo + 10
        setPageNo(curentFetchPage)
        setIsLoading(true)
        let res = await getAllbikesDetail(curentFetchPage)
        setIsLoading(false)
        setAllBikesArr(res)
        window.scrollTo(0, 0)
        console.log('res', res)
    }

    function goToDetailPage(val) {
        console.log('val', val)
        let title = val.title
        let urlTitle = '' + title.toLowerCase().replaceAll(' ', '-')
        console.log('url title', urlTitle)
        router.push(`/used-bikes/${urlTitle}/${val.id}`)
    }
    return (
        <>
            <Box className={styles.all_bike_main}>
                <Filters/>

                <div className={styles.main_box}>
                    <div className={styles.navigation}>
                        <div className={styles.text_container}>
                            <span className={styles.bike_text}> Used Bikes </span>
                        </div>
                        <div className={styles.swap_button_container}>
                            <span> <Apps className={styles.swap_icon} /> </span>
                            <span> <FormatListBulleted className={styles.swap_icon} /> </span>
                        </div>
                    </div>

                    <div>
                        {allBikesArr.length > 0 && allBikesArr.map((val, ind) => {
                            return (
                                <div className={styles.long_card} key={ind} onClick={() => { goToDetailPage(val) }}>
                                    <div className={styles.bike_image}>
                                        {val.images && val.images.length > 0 ? <img src={val.images[0]} alt={'a'} className={styles.card_image} /> : ""}
                                    </div>

                                    <div className={styles.card_info}>
                                        <h2 className={styles.card_title}> {val.title} </h2>
                                        <h3 className={styles.card_price_desktop}>PKR {val.price}</h3>
                                        <p className={styles.card_details}> {val?.city?.city_name} </p>
                                        <ul className={styles.bike_details}>
                                            <li>{val?.year?.year}</li>
                                            <li>|</li>
                                            <li>3122km</li>
                                            <li>|</li>
                                            <li>4 Stroke</li>
                                        </ul>

                                        <p className={styles.card_price_mobile}>Price:  {val.price}</p>

                                        {/* <button className={styles.show_phone_button}> Show Phone Number </button> */}
                                        {/* <p className={styles.phone_number}>{'aa'}</p> */}
                                    </div>
                                </div>
                            )
                        })}

                    </div>


                    <div className={styles.viewMoreBtnContainer} >
                        <button onClick={() => { fetchBikeInfo(pageNo) }} className={`${styles.viewMoreBtn} ${isLoading ? styles.viewMoreBtnDisabled : ""}`} > View More </button>
                    </div>
                </div>

                <Box className={styles.add_area}>

                </Box>
            </Box>
        </>
    )
}

export default AllUsedBike; 