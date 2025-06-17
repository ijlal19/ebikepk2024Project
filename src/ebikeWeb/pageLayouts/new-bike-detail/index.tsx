"use client"
import { WriteModal, MoreReviewModal } from '@/ebikeWeb/sharedComponents/Review-popup';
import { Box, Button, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getdealerData, getnewBikeData, getnewBikedetailsData, getBikesBySpecificFilter, getMechanicByBrandId } from '@/ebikeWeb/functions/globalFuntions';
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { priceWithCommas } from '@/genericFunctions/geneFunc';
import { isLoginUser } from "@/genericFunctions/geneFunc";
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import styles from './index.module.scss';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import FeatureSection from '@/ebikeWeb/pageLayouts/home/featureSection/index'
import ReviewSection from "@/ebikeWeb/sharedComponents/reviewSection/index"
import { CityArr, BrandArr, YearArr } from "@/ebikeWeb/constants/globalData";
import { getAllbikesDetail, getAllFeaturedBike, getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions";
import { initialDealers, initialMechanics } from "./dummy_data"

type NewBikeDetailsCompProps = {
  _responsedetails: any;
};


export default function NewBikeBrand({ _responsedetails }: NewBikeDetailsCompProps) {

  const [AllnewBikeDetailsArr, setAllnewBikeDetailsArr]: any = useState([]);
  const [AllnewBikeCardArr, setAllnewBikeCardArr]: any = useState();
  const [customer, setCustomer] = useState<any>('not_login');
  const [moreReviewArray, setmoreReviewArray] = useState();
  const [allDealerArr, setAllDelaerArr]: any = useState([]);
  const [writePopup, setWritePopup] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isLoading, setIsLoading] = useState(true);
  const [morePopup, setMorePopup] = useState(false);
  const [similarBrandUsedBike, setSimilarBrandUsedBike] = useState([]);
  const [similarCCUsedBike, setSimilarCCUsedBike] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [allMechanicArr, setAllMechanicArr]: any = useState([]);

  const router = useRouter()
  const params = useParams()

  const detailsId = params.slug3

  useEffect(() => {
    fetchNewBikeInfo()
    let _isLoginUser = isLoginUser()
    if (_isLoginUser?.login) {
      setCustomer(_isLoginUser.info)
    }
    else {
      setCustomer("not_login")
    }
  }, [])

  async function fetchNewBikeInfo() {

    console.log('_responsedetails', _responsedetails)

    let responsedetails: any = null
    if (_responsedetails?.length > 0) {
      responsedetails = _responsedetails
    }
    else {
      responsedetails = await getnewBikedetailsData(detailsId)
    }

    if (responsedetails.length > 0) {

      if (responsedetails[0]?.bike?.description) {
        responsedetails[0].bike.description = responsedetails[0].bike.description.toString().replace('<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>', '');
      }

      if (responsedetails[0]?.bike?.images) {
        let imgArr = responsedetails[0]?.bike?.images
        let totalRequiredImageCount = 4 - imgArr?.length
        if (totalRequiredImageCount > 0) {
          [...Array(totalRequiredImageCount)].map((val: any) => {
            if (responsedetails[0]?.bike?.images?.length > 0) {
              imgArr.push(responsedetails[0]?.bike?.images[0])
            }
          })
        }
        responsedetails[0].bike.images = imgArr
      }

      if (responsedetails[0]?.bike?.brandId) {
        let brand = getBrandFromId(responsedetails[0]?.bike?.brandId, BrandArr)
        responsedetails[0].bike.brandName = brand?.length > 0 ? brand[0].brandName : "Similar Brand"
      }

      let CC = Number(responsedetails[0]?.bike?.displacement.split(' ')[0]) ? Number(responsedetails[0]?.bike?.displacement.split(' ')[0]) : 70
      // if (responsedetails[0]?.bike?.displacement?.indexOf('') > -1) {
      //   responsedetails[0].bike.displacement = responsedetails[0]?.bike?.displacement?.split(',')[0]
      //   CC = responsedetails[0]?.bike?.displacement?.split(',')[1] ? responsedetails[0]?.bike?.displacement?.split(',')[1] : 70;
      // }

      responsedetails[0].bike.bikeCC = CC

      setmoreReviewArray(responsedetails[0]?.bike?.newbike_comments)

      setAllnewBikeDetailsArr(responsedetails)
      setAllnewBikeCardArr(responsedetails[0].bikes)
      setIsLoading(false)

      fetchSimilarBrandUsedBike(responsedetails[0]?.bike?.brandId)
      fetchSimilarBrandDealerInfo(responsedetails[0]?.bike?.brandId)
      fetchSimilarBrandMechanicInfo(responsedetails[0]?.bike?.brandId)
      fetchSimilarCCUsedBike(CC)

      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 1000);
    }

  }

  async function fetchSimilarBrandUsedBike(brandId: any) {
    let res = await getBikesBySpecificFilter('brand', brandId, 0)
    setSimilarBrandUsedBike(res)
    console.log('res ===========================>', res)
  }

  async function fetchSimilarCCUsedBike(cc: any) {
    let res = await getBikesBySpecificFilter('cc', cc, 0)
    setSimilarCCUsedBike(res)
    console.log('res ===========================> fetchSimilarCCUsedBike', res)
  }

  async function fetchSimilarBrandMechanicInfo(brandId: any) {
    let arr = []
    arr.push(brandId)
    let mechanicDataRes = await getMechanicByBrandId(arr)
    if (mechanicDataRes.length > 0) {
      if (mechanicDataRes.length > 4) {
        setAllMechanicArr(mechanicDataRes?.slice(0, 4))
      }
      else {
        setAllMechanicArr(mechanicDataRes)
      }
    }
    else {
      setAllMechanicArr(initialMechanics)
    }
  }

  async function fetchSimilarBrandDealerInfo(brandId: any) {
    let DealerDataRes = await getdealerData(brandId)
    if (DealerDataRes?.dealers?.length > 0) {
      setAllDelaerArr(DealerDataRes.dealers)
    }
    else {
      setAllDelaerArr(initialDealers)
    }
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

                          <Box>

                            <Typography className={styles.title}>{e?.bike?.title}</Typography>

                            <Swiper
                              onSwiper={setThumbsSwiper}
                              direction="horizontal"
                              spaceBetween={10}
                              slidesPerView={4}
                              freeMode={true}
                              watchSlidesProgress={true}
                              modules={[Thumbs]}
                              className="w-20 h-[400px] thumbSwiper"
                            >
                              {e?.bike?.images.map((img: any, index: any) => (
                                <SwiperSlide key={index}>
                                  <img src={img} alt={`thumb-${index}`} className="cursor-pointer object-cover" />
                                </SwiperSlide>
                              ))}
                            </Swiper>

                            <Swiper
                              modules={[Navigation, Autoplay, Thumbs]}
                              className={styles.swiper}
                              loop={true}
                              slidesPerView={1}
                              thumbs={{ swiper: thumbsSwiper }}
                              simulateTouch={true}
                            >
                              {e?.bike?.images && e?.bike?.images?.length > 0 && e?.bike?.images.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                  <Box className={styles.bike_image}>
                                    <img src={item} alt={e?.bike?.title} className={styles.image} />
                                  </Box>
                                </SwiperSlide>
                              ))}
                            </Swiper>

                          </Box>

                          {/* BIKE REVIEW BOX */}
                          <Box className={styles.bike_review_box} sx={{ display: isMobile ? 'none' : 'flex' }}>
                            {
                              e?.bike?.price ?
                                <Box className={styles.price_box}>
                                  <Box className={styles.price}>
                                    Rs: {priceWithCommas(e?.bike?.price)}
                                  </Box>
                                </Box>
                                : ""
                            }
                            <Button className={styles.view_detail_btn} disableRipple onClick={() => { writeopen() }}> Write Your Review</Button>
                            <WriteModal props={writepopupData} closeFunction={writeclose} />
                          </Box>

                          {/* BIKE INFORMATION BOX */}
                          <Box className={styles.bike_information_grid1}>
                            <Typography style={{ margin: "10px 0px", padding: "0px", color: "black", fontSize: "14px" }} className={styles.desc} dangerouslySetInnerHTML={{ __html: e?.bike?.description }}></Typography>

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
                                src={e?.bike?.videoUrl ? embebedYoutubeVideoId(e?.bike?.videoUrl) : "https://www.youtube.com/embed/9g0U8s83jkw"}
                                title="YouTube video player"
                                className={styles.bike_video}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              ></iframe>
                            </Box>
                          </Box>

                        </Grid>

                        <Grid item xs={isMobile ? 0 : 3} className={styles.all_adds_review_box} sx={{ display: isMobile ? 'none' : 'flex' }}>

                          <Box className={styles.bike_review_box} sx={{ display: isMobile ? 'none' : 'flex' }}>

                            {
                              e?.bike?.price ?
                                <Box className={styles.price_box}>
                                  <Box className={styles.price}>
                                    Rs: {priceWithCommas(e?.bike?.price)}
                                  </Box>
                                </Box>
                                : ""
                            }
                            <MoreReviewModal props={morepopupData} closeFunctionmore={moreClose} />
                            <Button className={styles.view_detail_btn} disableRipple onClick={() => { writeopen() }}> Write Your Review</Button>
                            <WriteModal props={writepopupData} closeFunction={writeclose} />
                          </Box>

                          <Box className={styles.dealers_box} sx={{ display: isMobile ? 'none' : 'flex' }}>
                            {
                              allDealerArr.length > 0 ?
                                <> <Typography className={styles.heading}>Related Dealers</Typography>
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
                                    
                                    <Button className={styles.view_detail_btn} 
                                      onClick={() => { allDealerArr?.length > 0 ? 
                                         router.push(`/dealers?brand=${allDealerArr[0]?.brand_id}`) 
                                         : 
                                         router.push(`/dealers`) 
                                    }}> 
                                      <Link href={allDealerArr.length > 0 ? `/dealers?brand=${allDealerArr[0]?.brand_id}` : '/dealers'} className={styles.Link_tag}> 
                                        More Dealers <KeyboardArrowRightIcon />
                                      </Link>
                                    </Button>

                                  </Box> </> : ''
                            }
                          </Box>


                          <Box className={styles.dealers_box} sx={{ display: isMobile ? 'none' : 'flex' }}>
                            {
                              allMechanicArr.length > 0 ?
                                <> <Typography className={styles.heading}>Related Mechanics </Typography>
                                  <Box className={styles.Dealers_card}>
                                    {
                                      allMechanicArr?.map((e: any, i: any) => {
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
                                    <Button className={styles.view_detail_btn} 
                                      onClick={() => { allMechanicArr?.length > 0 ? 
                                         router.push(`/mechanics?brand=${allMechanicArr[0]?.brand_id}`) 
                                         : 
                                         router.push(`/mechanics`) 
                                    }}> 
                                      <Link href={allMechanicArr.length > 0 ? `/mechanics?brand=${allMechanicArr[0]?.brand_id}` : '/mechanics'} className={styles.Link_tag}> 
                                        More Mechanics <KeyboardArrowRightIcon />
                                      </Link>
                                    </Button>
                                    {/* <Button className={styles.view_detail_btn} onClick={() => { router.push('/dealers') }}><Link href="/mechanics" className={styles.Link_tag}>More Mechanics <KeyboardArrowRightIcon /></Link></Button> */}
                                  </Box> </> : ''
                            }
                          </Box>

                          <Box sx={{ display: isMobile ? 'none' : 'flex' }}>
                            <Link href='/forum'>
                              <img style={{ width: "100%" }} src="https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg" alt="" />
                            </Link>
                          </Box>

                        </Grid>
                      </Grid>
                    </>)
                })}
            </Box>

            <div className={styles.review_section_newbikes}>
              <ReviewSection orignal_review={AllnewBikeDetailsArr[0]?.bike?.newbike_comments?.length > 0 ? AllnewBikeDetailsArr[0]?.bike?.newbike_comments : []} />
            </div> 

            <div className={styles.feature_section_newbikes}>
              <FeatureSection />
            </div>

            {AllnewBikeCardArr && AllnewBikeCardArr.length > 0 ?
              <>
                <Box className={styles.other_card}>
                  <Typography className={styles.other_card_title}> {AllnewBikeDetailsArr?.length > 0 ? AllnewBikeDetailsArr[0]?.bike?.brandName : "Similar Brand"} New Bikes </Typography>
                  <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={AllnewBikeCardArr} from='newBikeComp' currentpage='new_bike' onBtnClick={() => { }} />
                </Box>
              </>
              : ""
            }

            <div style={{ marginTop: "20px" }}>
              {similarBrandUsedBike && similarBrandUsedBike.length > 0 ?
                <>
                  <Box className={styles.other_card}>
                    <Typography className={styles.other_card_title}> {AllnewBikeDetailsArr?.length > 0 ? AllnewBikeDetailsArr[0]?.bike?.brandName : "Similar Brand"} Used Bikes </Typography>
                    <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={similarBrandUsedBike} from='newBikeComp' currentpage="used_bike" onBtnClick={() => { }} />
                  </Box>
                </>
                : ""
              }
            </div>

            <div style={{ marginTop: "20px" }}>
              {similarCCUsedBike && similarCCUsedBike.length > 0 ?
                <>
                  <Box className={styles.other_card}>
                    <Typography className={styles.other_card_title}> {AllnewBikeDetailsArr?.length > 0 ? AllnewBikeDetailsArr[0]?.bike?.brandName : "Similar Brand"} { AllnewBikeDetailsArr[0]?.bike?.bikeCC} CC Used Bikes </Typography>
                    <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={similarCCUsedBike} from='newBikeComp' currentpage="used_bike" onBtnClick={() => { }} />
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
