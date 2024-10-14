'use client'
import { Box, Container, Grid, Typography } from '@mui/material'
import styles from './index.module.scss'
import React, { useState, useEffect } from 'react'
import { getAllbikesDetail } from "@/functions/globalFuntions"
import { Apps, FormatListBulleted } from '@mui/icons-material';
import { CityArr, Brand } from './filterData'
import MoreOptionPopup from './Popup'
import FilterDropdown from './DropDown'
const AllUsedBike = () => {
    const [popupArray, setPopupArray] = useState([CityArr])
    const [allBikesArr, setAllBikesArr] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [openmodal, setOpenModal] = useState(false)
    const [functionval, setFunctionVal] = useState()
    useEffect(() => {
        fetchBikeInfo(pageNo)
    }, [])

    function toggle(e) {
        if (e == 'city') {
            setOpenModal(true)
            setPopupArray(CityArr)
            setFunctionVal(e)
        }
        else if (e == 'brand') {
            setOpenModal(true)
            setPopupArray(Brand)
            setFunctionVal(e)
        }
        else if (e == 'close') {
            setOpenModal(false)
        }
        else {
            '*'
        }
    }

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
    const ModalData = {
        showmodal: toggle,
        openmodal: openmodal,
        popupdata: popupArray,
        arrname: functionval
    }
    return (
        <>
            <Box className={styles.all_bike_main}>

                <Box className={styles.filter_box}>
                    <Box className={styles.heading_resultby}>
                        <Typography>Show Result By:</Typography>
                    </Box>
                    <Box className={styles.heading_city}>
                        <Typography className={styles.city_text}>CITY</Typography>
                    </Box>
                    <Box className={styles.city_options}>
                        {
                            CityArr.slice(0, 5).map((e, i) => {
                                return (
                                    <Typography className={styles.option_values} key={i}>
                                        <input type="checkbox" /> {e.city_name}
                                    </Typography>)
                            })
                        }
                        <MoreOptionPopup props={ModalData} values='city' />
                    </Box>

                    <Box className={styles.heading_brand}>
                        <Typography className={styles.brand_text}>MAKE</Typography>
                    </Box>
                    <Box className={styles.brand_options}>
                        {
                            Brand.slice(0, 5).map((e, i) => {
                                return (
                                    <Typography className={styles.option_values} key={i}>
                                        <input type="checkbox" /> {e.brandName}
                                    </Typography>)
                            })
                        }
                        <MoreOptionPopup props={ModalData} values='brand' />
                    </Box>
                    <Box className={styles.heading_years}>
                        <Typography className={styles.years_text}>YEARS</Typography>
                    </Box>
                    <Box className={styles.years_options}>
                        <FilterDropdown
                        dropvalues='years'
                            values='from'
                            className={styles.option_values}
                            sx={{
                                Width: '90%',  
                                padding: '8px', 
                                fontSize: '12px'
                            }}
                        /><FilterDropdown
                        dropvalues='years'
                        values='To'
                        className={styles.option_values}
                        sx={{
                            minWidth: 120,  
                            padding: '8px', 
                            fontSize: '12px'
                        }}
                    />
                    </Box>
                    <Box className={styles.heading_years}>
                        <Typography className={styles.years_text}>ENGINE CC</Typography>
                    </Box>
                    <Box className={styles.years_options}>
                        <FilterDropdown
                            values='from'
                            className={styles.option_values}
                            sx={{
                                Width: '90%',  
                                padding: '8px', 
                                fontSize: '12px'
                            }}
                        /><FilterDropdown
                        values='To'
                        className={styles.option_values}
                        sx={{
                            minWidth: 120,  
                            padding: '8px', 
                            fontSize: '12px'
                        }}
                    />
                    </Box>
                </Box>

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
                              {  allBikesArr.length > 0 && allBikesArr.map((val, ind) => {
                                    return (
                                        <div className={styles.long_card} key={ind}>
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

                                                <button className={styles.show_phone_button}> Show Phone Number </button>
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

                <Box className={styles.add_area}>Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.Add area.</Box>
            </Box>
        </>
    )
}

export default AllUsedBike;