"use client"
import React, { useEffect, useState } from 'react';
import { bikesDataArr, dealerDataArr } from './data';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
import ImgCard from '@/sharedComponents/itemCard';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getdealerData, getnewBikeData } from '@/functions/globalFuntions';

export default function AllNewBikes() {
  const [Showmore, setShowmore] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [allnewBikeArr, setAllnewBikeArr] = useState([])
  const [allDealerArr, setAllDelaerArr] = useState([])

  const showmore = () => {
    setShowmore(!Showmore);
  };

  useEffect(() => {
    fetchBrandInfo()
  }, [])

  async function fetchBrandInfo() {

    let res = await getnewBikeData()
    setAllnewBikeArr(res)

    let DealerDataRes = await getdealerData()
    setAllDelaerArr(DealerDataRes.dealers)
  }

  return (
    <Box className={styles.all_new_bike_main}>
      <Box className={styles.description_box}>
        <Box className={styles.card_main}>
          <img
            src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_50,q_auto,w_auto,dpr_auto/v1540624359/bike_brands/Suzuki.png'
            alt='./'
            className={styles.card_image}
          />
        </Box>
        <Typography className={styles.descriptionPara}>
          {Showmore ? bikesDataArr[0].bike_brand.description.slice(0, 100) : bikesDataArr[0].bike_brand.description}
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
            bikesDataArr.map((e, i) => (
              <ImgCard data={e} from='u' key={i} />
            ))
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
          </Box>
          <Button className={styles.view_detail_btn} > View Bike Detail <KeyboardArrowRightIcon /></Button>
        </Grid>
      </Grid>
    </Box>
  );
}
