"use client"
import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss'
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import ImgCard from '@/ebikeWeb/sharedComponents/itemCard';
import { getnewBikedetailsData, isLoginUser } from '@/ebikeWeb/functions/globalFuntions';
import { useParams, useRouter } from 'next/navigation';
import { WriteModal, MoreReviewModal } from '@/ebikeWeb/sharedComponents/Review-popup';
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';

export default function NewBikeBrand() {
  const isMobile = useMediaQuery('(max-width:768px)')
  const [writePopup, setWritePopup] = useState(false)
  const [morePopup, setMorePopup] = useState(false)
  const [moreReviewArray, setmoreReviewArray] = useState()
  const [customer, setCustomer] = useState<any>('not_login')
  const [AllnewBikeDetailsArr, setAllnewBikeDetailsArr]: any = useState([])
  const [AllnewBikeCardArr, setAllnewBikeCardArr]: any = useState()
  const [isLoading, setIsLoading] = useState(false)

  const Router = useRouter()
  const params = useParams()
  const detailsId = params.slug3
  useEffect(() => {
    fetchBrandInfo()
    let _isLoginUser = isLoginUser()
    if (_isLoginUser?.login) {
      setCustomer(_isLoginUser.info)
    }
    else {
      setCustomer("not_login")
    }
  }, [])

  async function fetchBrandInfo() {
    setIsLoading(true)
    const responsedetails: any = await getnewBikedetailsData(detailsId)
    if (responsedetails.length > 0) {
      if (responsedetails[0]?.bike?.description) {
        responsedetails[0].bike.description = responsedetails[0].bike.description.toString().replace('<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>', '');
      }
    }
    setAllnewBikeDetailsArr(responsedetails)
    setAllnewBikeCardArr(responsedetails[0].bikes)
    if (responsedetails?.length > 0) {
      setmoreReviewArray(responsedetails[0]?.bike?.newbike_comments)
    }
    setIsLoading(false)
   setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
  }

  const writeopen = () => {
    if (!customer || customer == "not_login" || customer?.id == undefined) {
      alert('You must be logged in to submit a review.')
      return
    }
    else{
      setWritePopup(true)
    }
  }

  const writeclose = () => {
    setWritePopup(false)
  }
  const moreOpen = () => {
      setMorePopup(true)
  }
  const moreClose = () => {
    setMorePopup(false)
  }

  const writepopupData = {
    Open: writePopup,
    uid: customer?.id,
    bikeId: detailsId,
    close: () => setWritePopup(false)
  }

  const morepopupData = {
    OpenMore: morePopup,
    data: moreReviewArray ? moreReviewArray : null
  }

  function embebedYoutubeVideoId(videoURL: string) {
    if (videoURL) {
      var url = videoURL;
      if (url.split('https://youtu.be/')[1]) {
        let videoID = url.split('https://youtu.be/')[1]
        let videoUrl = 'https://www.youtube.com/embed/' + videoID
        return videoUrl;
      }
      else if (url.split('https://www.youtube.com/watch?v=')[1]) {
        let videoID = url.split('https://www.youtube.com/watch?v=')[1]
        let videoUrl = 'https://www.youtube.com/embed/' + videoID;
        return videoUrl;
      }
      else {
        return ""
      }
    }
    else {
      return ""
    }
  }
  return (
    <>
      {
        !isLoading ? <>
          <Box className={styles.dealers_main}>
            {
              AllnewBikeDetailsArr.map((e: any, i: any) => {
                return (
                  <>
                    <Grid key={i} container className={styles.bikre_review_grid}>
                      <Grid item xs={isMobile ? 12 : 9} className={styles.bike_image_box}>
                        <Typography className={styles.title}>{e?.bike?.title}</Typography>
                        <Box className={styles.bike_image}>
                          <img src={e?.bike?.images[0]} alt={e?.bike?.title} className={styles.image} />
                        </Box>
                      </Grid>
                      <Grid item xs={isMobile ? 12 : 3} className={styles.bike_review_box}>

                        <Box className={styles.price_box}>
                          Rs: {e?.bike?.price}
                        </Box>
                        {
                          e?.bike?.newbike_ratings?.length > 0 ?
                            <Box className={styles.rating_box}>
                              <StarIcon sx={{ color: 'yellow', fontSize: '15px' }} />{e?.bike?.newbike_ratings[0]?.rating} | 4 Reviews
                            </Box> : ""
                        }

                        {e?.bike?.newbike_comments?.length > 0 ? <Box className={styles.comment_box}>
                          Reviews
                          <Typography className={styles.comment_box_data}>
                            <Typography className={styles.data_heading}>Name :</Typography>
                            {e?.bike?.newbike_comments?.length > 0 ?
                              <Typography className={styles.data_text}>{e?.bike?.newbike_comments[0]?.user?.userFullName}</Typography> : "-"
                            }
                          </Typography>
                          <Typography className={styles.comment_box_data}>
                            <Typography className={styles.data_heading}>Review :</Typography>
                            {
                              e?.bike?.newbike_comments[0]?.rating ?
                                <Typography className={styles.data_text} sx={{ display: 'flex', justifyContent: 'center', color: 'yellowgreen' }}><StarIcon sx={{ color: 'yellowgreen', fontSize: '15px' }} />
                                  {e?.bike?.newbike_comments[0]?.rating}</Typography> : '-'}
                          </Typography>
                          <Typography className={styles.comment_box_data}>
                            {e?.bike?.newbike_comments[0]?.comment ?
                              <Typography className={styles.data_comment}><span style={{ color: 'grey', fontWeight: 'bolder' }}>Comment : </span>
                                {isMobile ? e?.bike?.newbike_comments[0]?.comment : e?.bike?.newbike_comments[0]?.comment.slice(0, 100)}
                              </Typography> : '-'
                            }
                          </Typography>
                          <Typography className={styles.comment_box_data}>
                            {e?.bike?.newbike_comments[0]?.createdAt ?
                              <Typography className={styles.data_date}>
                                {e?.bike?.newbike_comments[0]?.createdAt.slice(0, 10)}
                              </Typography> : '-'
                            }
                          </Typography>
                        </Box> : ""}

                        {e?.bike?.newbike_comments?.length > 0 ? <Button className={styles.view_detail_btn} disableRipple onClick={() => { moreOpen() }}> More Reviews <KeyboardArrowRightIcon sx={{ fontSize: '18px' }} /></Button> : ""}
                        <MoreReviewModal props={morepopupData} closeFunctionmore={moreClose} />
                        <Button className={styles.view_detail_btn} disableRipple onClick={() => { writeopen() }}> Write Your Review</Button>
                        <WriteModal props={writepopupData} closeFunction={writeclose} />
                      </Grid>
                    </Grid>
                    <Grid container className={styles.bike_information_grid}>
                      <Grid item xs={isMobile ? 12 : 9} className={styles.bike_information_grid1}>
                        {/* <Typography className={styles.title}>{e?.bike?.title}</Typography> */}

                        <Typography style={{ margin: "10px" }} className={styles.desc} dangerouslySetInnerHTML={{ __html: e?.bike?.description }}></Typography>

                        <Box className={styles.information_table}>
                          <Grid container>
                            <Grid item xs={isMobile ? 12 : 6}>
                              <table className={styles.table}>
                                <tr className={styles.tr} >
                                  <td className={styles.column}>Frame</td>
                                  <td className={styles.column}>{e?.bike?.frame ? e.bike.frame : '-'}</td>
                                </tr>
                                <tr className={styles.tr} >
                                  <td className={styles.column}>Displacement</td>
                                  <td className={styles.column}>{e?.bike?.displacement ? e.bike.displacement : '-'}</td>
                                </tr>
                                <tr className={styles.tr} >
                                  <td className={styles.column}>Dimention</td>
                                  <td className={styles.column}>{e?.bike?.dimention ? e.bike.dimention : "-"}</td>
                                </tr>
                                <tr className={styles.tr} >
                                  <td className={styles.column}>Tyre Front</td>
                                  <td className={styles.column}>{e?.bike?.tyreFront ? e.bike.tyreFront : '-'}</td>
                                </tr>
                                <tr className={styles.tr} >
                                  <td className={styles.column}>Clutch</td>
                                  <td className={styles.column}>{e?.bike?.clutch ? e.bike.clutch : '-'}</td>
                                </tr>
                                <tr className={styles.tr} >
                                  <td className={styles.column}>Dry Weight</td>
                                  <td className={styles.column}>{e?.bike?.dryWeight ? e.bike.dryWeight : '-'}</td>
                                </tr>
                                <tr className={styles.tr} >
                                  <td className={styles.column}>Starting</td>
                                  <td className={styles.column}>{e?.bike?.starting ? e.bike.starting : '-'}</td>
                                </tr>
                              </table>
                            </Grid>

                            <Grid item xs={isMobile ? 12 : 6}>

                              <table className={styles.table}>
                                <tr className={styles.tr}>
                                  <td className={styles.column}>Starting</td>
                                  <td className={styles.column}>{e?.bike?.starting ? e.bike.starting : '-'}</td>
                                </tr>
                                <tr className={styles.tr}>
                                  <td className={styles.column}>Engine</td>
                                  <td className={styles.column}>{e?.bike?.engine ? e.bike.engine.slice(0, 15) : '-'}</td>
                                </tr>
                                <tr className={styles.tr}>
                                  <td className={styles.column}>Petrol Capacity</td>
                                  <td className={styles.column}>{e?.bike?.petrolCapacity ? e.bike.petrolCapacity : '-'}</td>
                                </tr>
                                <tr className={styles.tr}>
                                  <td className={styles.column}>Tyre Back</td>
                                  <td className={styles.column}>{e?.bike?.tyreBack ? e.bike.tyreBack : '-'}</td>
                                </tr>
                                <tr className={styles.tr}>
                                  <td className={styles.column}>Comp-Ration</td>
                                  <td className={styles.column}>{e?.bike?.compressionRatio ? e.bike.compressionRatio : '-'}</td>
                                </tr>
                                <tr className={styles.tr}>
                                  <td className={styles.column}>Ground Clearence</td>
                                  <td className={styles.column}>{e?.bike?.groundClearance ? e.bike.groundClearance : '-'}</td>
                                </tr>
                                <tr className={styles.tr}>
                                  <td className={styles.column}>Transmittion</td>
                                  <td className={styles.column}>{e?.bike?.transmission ? e.bike.transmission : '-'}</td>
                                </tr>
                              </table>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item xs={isMobile ? 12 : 3} className={styles.bike_information_grid2}></Grid>
                    </Grid>
                    {
                      e?.bike?.videoUrl ?
                    <Grid container className={styles.bike_video_grid}>
                      <Grid item xs={isMobile ? 12 : 9} className={styles.bike_video_box}>
                        <Box className={styles.bike_video}>
                          <iframe
                            src={embebedYoutubeVideoId(e?.bike?.videoUrl)}
                            title="YouTube video player"
                            className={styles.bike_video}
                            // frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          // allowfullscreen  
                          ></iframe>
                        </Box>
                      </Grid>
                      <Grid item xs={isMobile ? 12 : 3}></Grid>
                    </Grid>:''}
                  </>)
              })}
          </Box>
          <Box className={styles.other_card}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={AllnewBikeCardArr} from='newBikeComp' currentpage='new_bike' />
          </Box>
        </> :
         <div className={styles.load_main}>
         <div className={styles.load_div}>
           <Loader isLoading={isLoading} />
         </div>
         </div>
      }
    </>
  );
}