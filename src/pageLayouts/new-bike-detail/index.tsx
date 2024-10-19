"use client"
import React, { useState, useEffect } from 'react'
import { newBikeData, dealerData } from './data'
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss'
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function NewBikeBrand() {
 const isMobile = useMediaQuery('(max-width:768px')
  return (
   <Box className={styles.dealers_main}>
    <Grid container className={styles.bikre_review_grid}>
      <Grid item xs={isMobile ? 12 : 9} className={styles.bike_image_box}>
        <Typography className={styles.title}>{newBikeData.bike.title}</Typography>
        <Box className={styles.bike_image}>
          <img src={newBikeData.bike.images[0]} alt={newBikeData.bike.title} className={styles.image}/>
        </Box>
      </Grid>
      <Grid item xs={isMobile ? 12 : 3} className={styles.bike_review_box}>
        <Box className={styles.price_box}>Rs: {newBikeData.bike.price}</Box>
        <Box className={styles.rating_box}><StarIcon sx={{color:'yellow',fontSize:'15px'}}/>{newBikeData.bike.newbike_ratings[0].rating} | 4 Reviews</Box>
        <Box className={styles.comment_box}>
          Reviews
          <Typography className={styles.comment_box_data}>
            <Typography className={styles.data_heading}>Name :</Typography>
            <Typography className={styles.data_text}>{newBikeData.bike.newbike_comments[0].user.userFullName}</Typography>
          </Typography>
          <Typography className={styles.comment_box_data}>
            <Typography className={styles.data_heading}>Review :</Typography>
            <Typography className={styles.data_text} sx={{display:'flex',justifyContent:'center',color:'yellowgreen'}}><StarIcon sx={{color:'yellowgreen',fontSize:'15px'}}/>
            {newBikeData.bike.newbike_comments[0].rating}
            </Typography>
          </Typography>
          <Typography className={styles.comment_box_data}>
            <Typography className={styles.data_comment}><span style={{color:'grey',fontWeight:'bolder'}}>Comment : </span>
            {isMobile ? newBikeData.bike.newbike_comments[0].comment:newBikeData.bike.newbike_comments[0].comment.slice(0,100)}
            </Typography>
          </Typography>
          <Typography className={styles.comment_box_data}>
          <Typography className={styles.data_date}>
            {newBikeData.bike.newbike_comments[0].createdAt.slice(0,10)}
          </Typography>
          </Typography>
        </Box>
        <Button className={styles.view_detail_btn} > More Reviews <KeyboardArrowRightIcon sx={{fontSize:'18px'}}/></Button>
        <Button className={styles.view_detail_btn} > Write Your Review</Button>
      </Grid>
    </Grid>
   </Box>
  );
}