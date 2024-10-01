'use client'
import { Box, Container } from '@mui/material'
import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import { getAllbikesDetail } from "@/functions/globalFuntions"

const AllUsedBike = () => {
   
    const [allBikesArr, setAllBikesArr] = useState([])

    useEffect(() => {
        fetchBikeInfo()
    }, [])

    async function fetchBikeInfo() {
        let res = await getAllbikesDetail()
        setAllBikesArr(res)
        console.log('res', res)
    }
   
    return (
        <>
            <Box className={styles.all_bike_main}>
                <Container className={styles.all_bike_main_container}>
                    <div className={styles.main_box}> 
                      
                        {/* sort Bar */}
                        <div className={styles.navigation}>
                            <div className={styles.text_container}>
                                <span className={styles.sort_text}>Sort By:</span>
                                <select>
                                    <option>Updated Date: Recent First</option>
                                </select>
                            </div>
                            <div className={styles.button_container}>
                                <button>
                                    <span>LIST</span>
                                </button>
                                <button>
                                    <span>GRID</span>
                                </button>
                            </div>
                        </div>

                        {

                        }
                    
                        {/* ads data */} 
                        {
                            allBikesArr.length > 0 && allBikesArr.map((val, ind) => {
                                return(
                                    <div className={styles.card} key={ind}>
                                        <div className={styles.bike_image}>
                                            {val.images && val.images.length > 0 ? <img src={val.images[0]} alt={'a'} className={styles.card_image} /> : "" }
                                        </div>
                                    
                                        <div className={styles.card_info}>
                                        <h2 className={styles.card_title}> {val.title} </h2>
                                        <h3 className={styles.product_price}>PKR {val.price}</h3>
                                        <p className={styles.card_details}> {val?.city?.city_name} </p>
                                        <ul className={styles.bike_details}>
                                            <li>{val?.year?.year}</li>
                                            <li>|</li>
                                            <li>3122km</li>
                                            <li>|</li>
                                            <li>4 Stroke</li>
                                        </ul>
                                        
                                        <p className={styles.card_price}>Price:  {val.price}</p>
                                            <button className={styles.show_phone_button}> Show Phone Number </button>
                                            {/* <p className={styles.phone_number}>{'aa'}</p> */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Container>
            </Box>
        </>
    )
}

export default AllUsedBike;