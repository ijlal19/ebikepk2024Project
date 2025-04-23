"use client"
import { WriteModal, MoreReviewModal } from '@/ebikeWeb/sharedComponents/Review-popup';
import { Box, Button, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getdealerData, getnewBikeData, getnewBikedetailsData, getBikesBySpecificFilter } from '@/ebikeWeb/functions/globalFuntions';
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { priceWithCommas } from '@/genericFunctions/geneFunc';
import { isLoginUser } from "@/genericFunctions/geneFunc";
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import styles from './index.module.scss';
import { newBikeData } from './data';

export default function NewBikeBrand() {

  const [AllnewBikeDetailsArr, setAllnewBikeDetailsArr]: any = useState([]);
  const [AllnewBikeCardArr, setAllnewBikeCardArr]: any = useState();
  const [customer, setCustomer] = useState<any>('not_login');
  const [moreReviewArray, setmoreReviewArray] = useState();
  const [allDealerArr, setAllDelaerArr] = useState([]);
  const [writePopup, setWritePopup] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isLoading, setIsLoading] = useState(false);
  const [morePopup, setMorePopup] = useState(false);
  const [similarBrandUsedBike, setSimilarBrandUsedBike] = useState([]);

  const router = useRouter()
  const params = useParams()

  const detailsId = params.slug3

  useEffect(() => {
    fetchDealerinfo()
    fetchBrandInfo()
    let _isLoginUser = isLoginUser()
    if (_isLoginUser?.login) {
      setCustomer(_isLoginUser.info)
    }
    else {
      setCustomer("not_login")
    }
  }, [])

  async function fetchSimilarBrandUsedBike(brandId:any) {
    let res = await getBikesBySpecificFilter('brand', brandId, 0)
    setSimilarBrandUsedBike(res)
    console.log('res ===========================>', res)
  }

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

    console.log('res ===========================> 1', responsedetails)
    fetchSimilarBrandUsedBike(responsedetails[0]?.bike?.brandId)

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
    else {
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

  const brandName = ['honda', 'zxmco', 'united', 'crown', 'yamaha'];
  async function fetchDealerinfo() {
    setIsLoading(true)
    const randomBrand = brandName[Math.floor(Math.random() * brandName.length)];
    let res = await getnewBikeData({ brand: randomBrand })
    if (res?.length > 0) {
      let DealerDataRes = await getdealerData(res[0].brandId)
      setAllDelaerArr(DealerDataRes.dealers)
    }
  }


  return (
    <>
      {
        !isLoading ? 
        <>
          <Box className={styles.newbike_detail_main}>
            {
              AllnewBikeDetailsArr.map((e: any, i: any) => {
                return (
                  <>
                    <Grid key={i} container className={styles.bikre_review_grid}>

                      <Grid item xs={isMobile ? 12 : 8.9} className={styles.bike_image_box}>

                        {/* Bike IMAGE OR TITLE */}
                        <Box>
                          <Typography className={styles.title}>{e?.bike?.title}</Typography>
                          <Box className={styles.bike_image}>
                            <img src={e?.bike?.images[0]} alt={e?.bike?.title} className={styles.image} />
                          </Box>
                        </Box>

                        {/* BIKE REVIEW BOX */}
                        <Box className={styles.bike_review_box} sx={{ display: isMobile ? 'flex' : 'none' }}>

                          <Box className={styles.price_box}>
                            <Box className={styles.price}>
                              Rs: {priceWithCommas(e?.bike?.price)}
                            </Box>
                            {
                              e?.bike?.newbike_ratings?.length > 0 ?
                                <Box className={styles.rating_box}>
                                  <StarIcon sx={{ color: 'orange', fontSize: '15px' }} />{e?.bike?.newbike_ratings[0]?.rating} | 4 Reviews
                                </Box> : ""
                            }
                          </Box>

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
                        </Box>

                        {/* BIKE INFORMATION BOX */}
                        <Box className={styles.bike_information_grid1}>
                          <Typography style={{ margin: "10px 0px", padding: "0px" , color: "black", fontSize: "12px" }} className={styles.desc} dangerouslySetInnerHTML={{ __html: e?.bike?.description }}></Typography>

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
                        </Box>
                        {/* BIKE YOUTUBE VIDEO */}

                        <Box className={styles.bike_video_box}>
                          <Box className={styles.bike_video}>
                            <iframe
                              src={embebedYoutubeVideoId(e?.bike?.videoUrl)}
                              title="YouTube video player"
                              className={styles.bike_video}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                          </Box>
                        </Box>

                      </Grid>

                      <Grid item xs={isMobile ? 0 : 3} className={styles.all_adds_review_box}  sx={{ display: isMobile ? 'none' : 'flex' }}>

                        <Box className={styles.bike_review_box}  sx={{ display: isMobile ? 'none' : 'flex' }}>

                          <Box className={styles.price_box}>
                            <Box className={styles.price}>
                              Rs: {priceWithCommas(e?.bike?.price)}
                            </Box>
                            {
                              e?.bike?.newbike_ratings?.length > 0 ?
                                <Box className={styles.rating_box}>
                                  <StarIcon sx={{ color: 'orange', fontSize: '15px' }} /> {e?.bike?.newbike_ratings[0]?.rating} | 4 Reviews
                                </Box> : ""
                            }
                          </Box>

                          {e?.bike?.newbike_comments?.length > 0 ? <Box className={styles.comment_box}>
                            Recent Reviews
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
                                  <Typography className={styles.data_text} sx={{ display: 'flex', justifyContent: 'center', color: 'orange' }}>
                                    <StarIcon sx={{ color: 'orange', fontSize: '15px' }} />
                                    <StarIcon sx={{ color: 'orange', fontSize: '15px' }} />
                                    <StarIcon sx={{ color: 'orange', fontSize: '15px' }} />
                                    <StarIcon sx={{ color: 'orange', fontSize: '15px' }} />
                                    <StarIcon sx={{ color: 'orange', fontSize: '15px' }} />
                                    {/* ({e?.bike?.newbike_comments[0]?.rating}) */}
                                  </Typography> : '-'}
                            </Typography>
                            <Typography className={styles.comment_box_data}>
                              {e?.bike?.newbike_comments[0]?.comment ?
                                <Typography className={styles.data_comment}><span style={{ fontWeight: 'bolder' }}>Comment : </span>
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
                        </Box>

                        <Box className={styles.dealers_box}  sx={{ display: isMobile ? 'none' : 'flex' }}>
                          {
                            allDealerArr.length > 0 ?
                              <> <Typography className={styles.heading}>Dealers</Typography>
                                <Box className={styles.Dealers_card}>
                                  {
                                    allDealerArr?.map((e: any, i: any) => {
                                      return (
                                        <Box className={styles.card_main} key={i}>
                                          <img src={e?.bike_brand?.logoUrl} alt='' className={styles.card_image} />
                                          <Box className={styles.card_text}>
                                            <Typography className={styles.card_title}>{e?.shop_name}</Typography>
                                            <Typography className={styles.card_location}>{e?.city?.city_name}</Typography>
                                          </Box>
                                        </Box>
                                      )
                                    })
                                  }
                                  <Button className={styles.view_detail_btn} onClick={() => { router.push('/dealers') }}><Link href="/dealers" className={styles.Link_tag}>View More Dealers <KeyboardArrowRightIcon /></Link></Button>
                                </Box> </> : ''
                          }
                        </Box>

                        {/* <Box sx={{ display: isMobile ? 'none' : 'flex' }}>
                          <Link href='/blog'>
                            <img style={{ width: "100%" }} src="https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg" alt="" />
                          </Link>
                        </Box> */}

                        <Box sx={{ display: isMobile ? 'none' : 'flex' }}>
                          <Link href='/forum'>
                            <img style={{ width: "100%" }} src="https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg" alt="" />
                          </Link>
                        </Box>

                      </Grid>
                    </Grid>
                  </>)
              })}
          </Box>

          { AllnewBikeCardArr && AllnewBikeCardArr.length > 0 ?
            <>
              <Box className={styles.other_card}>
              <Typography className={styles.other_card_title}> Similar Brand New Bikes </Typography>
                <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={AllnewBikeCardArr} from='newBikeComp' currentpage='new_bike' onBtnClick={() => { }} />
              </Box>
            </> 
            : "" 
          }
          
          <div style={{ marginTop:"20px" }}>
            { similarBrandUsedBike && similarBrandUsedBike.length > 0 ?  
              <>
                <Box className={styles.other_card}>
                <Typography className={styles.other_card_title}> Similar Brand Used Bikes </Typography>
                  <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={similarBrandUsedBike} from='newBikeComp' currentpage="used_bike" onBtnClick={()=>{}}  />
                </Box> 
              </>
              : "" 
            }
          </div>


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
