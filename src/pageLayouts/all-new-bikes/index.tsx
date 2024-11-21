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
import { useParams } from 'next/navigation';

export default function AllNewBikes() {

  const [Showmore, setShowmore] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [allnewBikeArr, setAllnewBikeArr] = useState([])
  const [allDealerArr, setAllDelaerArr] = useState([])
  const [brandname,setbrandName]=useState('')
  const [desc,setDesc]=useState('')
  const [logo,setLogo]=useState('')

  const params = useParams()
  const brandId = params.slug
  useEffect(() => {
    fetchBrandInfo()
  }, [])

  async function fetchBrandInfo() {

    let DealerDataRes = await getdealerData(brandId)
    setAllDelaerArr(DealerDataRes.dealers)
    const brandName = (DealerDataRes.dealers[0].bike_brand.brandName)
    setDesc(DealerDataRes.dealers[0].bike_brand.description)
    setLogo(DealerDataRes.dealers[0].bike_brand.logoUrl)
    
    setbrandName(DealerDataRes.dealers[0].bike_brand.brandName)
    let res = await getnewBikeData({brand:brandName})
    setAllnewBikeArr(res)
  }


  const showmore = () => {
    setShowmore(!Showmore);
  };

  return (
    <>
    
      {/* <div className={styles.top_add_area}>
        <div className={styles.add_image}>
          <div className={styles.image}>Add Image</div>
        </div>
      </div>

      <div className={styles.path_box}>
        <div className={styles.path_text_box}>
          <p className={styles.path_text}>Home<span style={{marginLeft:5,marginRight:5}}>/</span>New Bikes<span style={{marginLeft:5,marginRight:5}}>/</span>Honda</p>
        </div>
      </div> */}
      
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
              return(
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
          </Box>
          <Button className={styles.view_detail_btn} > View Bike Detail <KeyboardArrowRightIcon /></Button>
        </Grid>
      </Grid>
    </Box>
    </>

  );
}
