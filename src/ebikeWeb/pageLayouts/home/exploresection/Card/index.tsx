"use client"
import React from 'react'
import styles from './index.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import {isLoginUser} from '@/ebikeWeb/functions/globalFuntions'
import { useRouter } from 'next/navigation';

const Card = (props:any) => {
  
  const Router = useRouter()

  function goToRoute(url:any) {
    let _isLoginUser = isLoginUser()
    if(_isLoginUser?.login) {
      Router.push(url)
    }
    else {
      if(document.getElementById('general_login_btn')) { 
        document.getElementById('general_login_btn')?.click()
      }
      // alert("Please Login to Continue")
    }
  }

  let data = props.data

  return (
    <Box className={styles.explore_card_main} >
      <Grid container  className={styles.explore_card_container} onClick={()=>{goToRoute(data?.url)}}>
        <Grid item xs={4}  className={styles.explore_card_grid1}>
          <img src={data?.img_url} alt="Card Image"  className={styles.explore_card_image}/>
        </Grid>
        <Grid item xs={8} className={styles.explore_card_grid2}>
          <Typography className={styles.explore_card_title}>
            {data?.title}
          </Typography>
          <Typography className={styles.explore_card_description}>
            {data?.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Card;