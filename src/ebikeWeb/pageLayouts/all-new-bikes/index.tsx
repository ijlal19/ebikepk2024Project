"use client"
import React, { useEffect, useState } from 'react';
import { bikesDataArr, dealerDataArr } from './data';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
import ImgCard from '@/ebikeWeb/sharedComponents/itemCard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getdealerData, getnewBikeData } from '@/ebikeWeb/functions/globalFuntions';
import { useParams } from 'next/navigation';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';

export default function AllNewBikes() {

  const [Showmore, setShowmore] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [allnewBikeArr, setAllnewBikeArr] = useState([])
  const [allDealerArr, setAllDelaerArr] = useState([])
  const [brandname, setbrandName]:any = useState('')
  const [desc, setDesc] = useState('')
  const [logo, setLogo] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const params = useParams()
  const brandName = params.slug
  useEffect(() => {
    fetchBrandInfo()
  }, [])

  async function fetchBrandInfo() {
    setIsLoading(true)
   
      // const brandName = (DealerDataRes.dealers[0].bike_brand.brandName)
      setbrandName(brandName)
      let res = await getnewBikeData({ brand: brandName })
     

      if(res?.length > 0) {
        setAllnewBikeArr(res)
        setDesc(res[0]?.bike_brand?.description)
        setLogo(res[0]?.bike_brand?.logoUrl)
        setIsLoading(false)
         setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
        let DealerDataRes = await getdealerData(res[0].brandId)
        setAllDelaerArr(DealerDataRes.dealers)  
      }
     
    

    
    // if (!DealerDataRes) {
    //   setIsLoading(true)
    // }
    // else {
    //   setbrandName(DealerDataRes.dealers[0].bike_brand.brandName)
    //   let res = await getnewBikeData({ brand: brandName })
    //   setAllnewBikeArr(res)
    //   setIsLoading(false)
    //  setTimeout(() => {
        //   window.scrollTo(0, 0)
        // }, 1000);
    // }
  }


  const showmore = () => {
    setShowmore(!Showmore);
  };

  return (
    <>
      {
        !isLoading ?
          <Box className={styles.all_new_bike_main}>
            <Box className={styles.description_box}>
              <Box className={styles.card_main}>
                <img
                  src={logo}
                  alt={brandname}
                  className={styles.card_image}
                />
              </Box>
              <Typography className={styles.descriptionPara}>
                {Showmore ? desc.slice(0, 100) : desc}
              </Typography>
              <Box>
                <Box className={styles.buttons_box}>
                  <Button className={styles.show_more_button} onClick={showmore} disableRipple>
                    {Showmore ? <>Show More<KeyboardArrowDownIcon sx={{ fontSize: '15px' }} /></> : <>Show Less<KeyboardArrowUpIcon sx={{ fontSize: '15px' }} /></>}
                  </Button>
                </Box>
              </Box>
            </Box>
            <Grid container className={styles.grid_sectiion_box}>
              <Grid item xs={isMobile ? 12 : 9} className={styles.card_grid}>
                <Typography className={styles.heading}>New Bikes</Typography>
                {
                  allnewBikeArr.map((e, i) => {
                    return (
                      <ImgCard data={e} currentpage='new_bike' from='n' key={i} />
                    )
                  })
                }
              </Grid>
              <Grid item xs={isMobile ? 12 : 3} className={styles.Dealers_grid_box}>
                <Typography className={styles.heading}>Related Dealers</Typography>
                <Box className={styles.Dealers_card}>
                  {
                    allDealerArr.map((e: any, i: any) => {
                      return (
                        <Box className={styles.card_main} key={i}>
                          <img src={e.bike_brand.logoUrl} alt='' className={styles.card_image} />
                          <Box className={styles.card_text}>
                            <Typography className={styles.card_title}>{e.shop_name}</Typography>
                            <Typography className={styles.card_location}>{e.city.city_name}</Typography>
                          </Box>
                        </Box>
                      )
                    })
                  }
                  <Button className={styles.view_detail_btn} > View Bike Detail <KeyboardArrowRightIcon /></Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          : <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
      }
    </>

  );
}
