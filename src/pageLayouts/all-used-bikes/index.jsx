'use client'
import { Box, Container } from '@mui/material'
import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'

const AllUsedBike = () => {
   
    const [allBikesArr, setAllBikesArr] = useState([])

    useEffect(() => {

    }, [])
   
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
                        <div className={styles.card}>
                            <div className={styles.bike_image}>
                                <img src={'https://picsum.photos/300/200?random=3'} alt={'a'} className={styles.card_image} />
                            </div>
                        
                            <div className={styles.card_info}>
                            <h2 className={styles.card_title}>Honda CG 125 2024 for Sale</h2>
                            <h3 className={styles.product_price}>PKR 2.55lacs</h3>
                            <p className={styles.card_details}>Lahore</p>
                            <ul className={styles.bike_details}>
                                <li>2024</li>
                                <li>|</li>
                                <li>3122km</li>
                                <li>|</li>
                                <li>4 Stroke</li>
                            </ul>
                            
                            <p className={styles.card_price}>Price: {'aa'}</p>
                                <button className={styles.show_phone_button}> Show Phone Number </button>
                                <p className={styles.phone_number}>{'aa'}</p>
                            </div>
                        </div>
                        
                    </div>
                </Container>
            </Box>
        </>
    )
}

export default AllUsedBike;