"use client"
import React, { useState, useEffect } from 'react'
import { newBikeData, dealerData } from './data'
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss'
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ImgCard from '@/sharedComponents/itemCard';
import { getnewBikedetailsData, priceWithCommas } from '@/functions/globalFuntions';
import { useParams } from 'next/navigation';
import ReviewModal from '@/sharedComponents/Review-popup';

export default function NewBikeBrand() {
  const isMobile = useMediaQuery('(max-width:768px')
  const [AllnewBikeDetailsArr, setAllnewBikeDetailsArr]: any = useState([])
  const [openPopup, setOpenpopup] = useState(false)

  const params = useParams()
  const detailsId = params.slug3
  useEffect(() => {
    fetchBrandInfo()
  }, [])

  async function fetchBrandInfo() {
    const responsedetails = await getnewBikedetailsData(detailsId)
    setAllnewBikeDetailsArr(responsedetails)
  }
  const toggle = (e: any) => {
    if (e == "showReviewpopup") {
      setOpenpopup(!openPopup)
    }
  }
  const handleOpen = () => {
    setOpenpopup(!openPopup)
  }
  const popupData = {
    close: toggle,
    open: openPopup
  }
  return (
    <Box className={styles.dealers_main}>
      {
        AllnewBikeDetailsArr.map((e: any, i: any) => {
          return (
            <>
              <Grid key={i} container className={styles.bikre_review_grid}>
                <Grid item xs={isMobile ? 12 : 9} className={styles.bike_image_box}>
                  <Typography className={styles.title}>{e.bike.title}</Typography>
                  <Box className={styles.bike_image}>
                    <img src={e.bike.images[0]} alt={e.bike.title} className={styles.image} />
                  </Box>
                </Grid>
                <Grid item xs={isMobile ? 12 : 3} className={styles.bike_review_box}>

                  <Box className={styles.price_box}>
                    Rs: {e.bike.price}
                  </Box>

                  <Box className={styles.rating_box}>
                    <StarIcon sx={{ color: 'yellow', fontSize: '15px' }} />{e.bike.newbike_ratings[0].rating} | 4 Reviews
                  </Box>

                  <Box className={styles.comment_box}>
                    Reviews
                    <Typography className={styles.comment_box_data}>
                      <Typography className={styles.data_heading}>Name :</Typography>
                      <Typography className={styles.data_text}>{e.bike.newbike_comments[0].user.userFullName}</Typography>
                    </Typography>
                    <Typography className={styles.comment_box_data}>
                      <Typography className={styles.data_heading}>Review :</Typography>
                      <Typography className={styles.data_text} sx={{ display: 'flex', justifyContent: 'center', color: 'yellowgreen' }}><StarIcon sx={{ color: 'yellowgreen', fontSize: '15px' }} />
                        {e.bike.newbike_comments[0].rating}
                      </Typography>
                    </Typography>
                    <Typography className={styles.comment_box_data}>
                      <Typography className={styles.data_comment}><span style={{ color: 'grey', fontWeight: 'bolder' }}>Comment : </span>
                        {isMobile ? e.bike.newbike_comments[0].comment : e.bike.newbike_comments[0].comment.slice(0, 100)}
                      </Typography>
                    </Typography>
                    <Typography className={styles.comment_box_data}>
                      <Typography className={styles.data_date}>
                        {e.bike.newbike_comments[0].createdAt.slice(0, 10)}
                      </Typography>
                    </Typography>
                  </Box>

                  <Button className={styles.view_detail_btn} disableRipple> More Reviews <KeyboardArrowRightIcon sx={{ fontSize: '18px' }} /></Button>
                  <Button className={styles.view_detail_btn} disableRipple onClick={handleOpen}><ReviewModal props={popupData} /> Write Your Review</Button>
                </Grid>
              </Grid>
              <Grid container className={styles.bike_information_grid}>
                <Grid item xs={isMobile ? 12 : 9} className={styles.bike_information_grid1}>
                  <Typography className={styles.title}>{e.bike.title}</Typography>
                  <Box className={styles.information_table}>
                    <Grid container>
                      <Grid item xs={isMobile ? 12 : 6}>
                        <table className={styles.table}>
                          <tr className={styles.tr} >
                            <td className={styles.column}>Frame</td>
                            <td className={styles.column}>{e.bike.frame}</td>
                          </tr>
                          <tr className={styles.tr} >
                            <td className={styles.column}>Displacement</td>
                            <td className={styles.column}>{e.bike.displacement}</td>
                          </tr>
                          <tr className={styles.tr} >
                            <td className={styles.column}>Dimention</td>
                            <td className={styles.column}>{e.bike.dimention}</td>
                          </tr>
                          <tr className={styles.tr} >
                            <td className={styles.column}>Tyre Front</td>
                            <td className={styles.column}>{e.bike.tyreFront}</td>
                          </tr>
                          <tr className={styles.tr} >
                            <td className={styles.column}>Clutch</td>
                            <td className={styles.column}>{e.bike.clutch}</td>
                          </tr>
                          <tr className={styles.tr} >
                            <td className={styles.column}>Dry Weight</td>
                            <td className={styles.column}>{e.bike.dryWeight}</td>
                          </tr>
                          <tr className={styles.tr} >
                            <td className={styles.column}>Starting</td>
                            <td className={styles.column}>{e.bike.starting}</td>
                          </tr>
                        </table>
                      </Grid>

                      <Grid item xs={isMobile ? 12 : 6}>

                        <table className={styles.table}>
                          <tr className={styles.tr}>
                            <td className={styles.column}>Starting</td>
                            <td className={styles.column}>{e.bike.starting}</td>
                          </tr>
                          <tr className={styles.tr}>
                            <td className={styles.column}>Engine</td>
                            <td className={styles.column}>{e.bike.engine.slice(0, 15)}</td>
                          </tr>
                          <tr className={styles.tr}>
                            <td className={styles.column}>Petrol Capacity</td>
                            <td className={styles.column}>{e.bike.petrolCapacity}</td>
                          </tr>
                          <tr className={styles.tr}>
                            <td className={styles.column}>Tyre Back</td>
                            <td className={styles.column}>{e.bike.tyreBack}</td>
                          </tr>
                          <tr className={styles.tr}>
                            <td className={styles.column}>Comp-Ration</td>
                            <td className={styles.column}>{e.bike.compressionRatio}</td>
                          </tr>
                          <tr className={styles.tr}>
                            <td className={styles.column}>Ground Clearence</td>
                            <td className={styles.column}>{e.bike.groundClearance}</td>
                          </tr>
                          <tr className={styles.tr}>
                            <td className={styles.column}>Transmittion</td>
                            <td className={styles.column}>{e.bike.transmission}</td>
                          </tr>
                        </table>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={isMobile ? 12 : 3} className={styles.bike_information_grid2}></Grid>
              </Grid>
              <Grid container className={styles.bike_video_grid}>
                <Grid item xs={isMobile ? 12 : 9} className={styles.bike_video_box}>
                  <Box className={styles.bike_video}>
                    <iframe src={e.bike.videoUrl} title="YouTube video player" className={styles.bike_video}></iframe>
                  </Box>
                </Grid>
                <Grid item xs={isMobile ? 12 : 3}></Grid>
              </Grid>
              <Grid container className={styles.other_bike_card}>
                <Grid item xs={isMobile ? 12 : 9} className={styles.card_grid}>
                  {
                    [e.bike].map((e: any, i: any) => {
                      return (
                        <ImgCard data={e} from='u' key={i} />
                      )
                    })
                  }
                </Grid>
                <Grid item xs={isMobile ? 12 : 3}></Grid>
              </Grid>
            </>)
        })}
        </Box>
  );
}