"use client"
import { getdealerData, getnewBikeData } from '@/ebikeWeb/functions/globalFuntions';
import { Box, Button, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import ImgCard from '@/ebikeWeb/sharedComponents/itemCard';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';
import MechaniLeft from '@/ebikeWeb/sharedComponents/Letf-side-section/Mechanic-left';
import AdSense from '@/ebikeWeb/sharedComponents/googleAdsense/adsense';

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function AllNewBikes({ initialBrandData = [] }: { initialBrandData?: any[] }) {

  const [allnewBikeArr, setAllnewBikeArr] = useState(initialBrandData);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [allDealerArr, setAllDelaerArr] = useState([]);
  const [brandname, setbrandName]: any = useState(initialBrandData?.[0]?.bike_brand?.brandName || '');
  const [isLoading, setIsLoading] = useState(initialBrandData.length === 0);
  const [Showmore, setShowmore] = useState(true);
  const [desc, setDesc] = useState('');
  const [logo, setLogo] = useState(initialBrandData?.[0]?.bike_brand?.logoUrl || '');
  const router = useRouter();

  const params = useParams()
  const brandName = params.slug
  useEffect(() => {
    const applyBrandData = async (res: any[]) => {
      setbrandName(res?.[0]?.bike_brand?.brandName || brandName)
      setAllnewBikeArr(res)
      const cleanedDescription = (res?.[0]?.bike_brand?.description || '')
        .toString()
        .replace('<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>', '');
      setDesc(cleanedDescription)
      setLogo(res?.[0]?.bike_brand?.logoUrl || '')
      setIsLoading(false)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 1000);

      if (res?.[0]?.brandId) {
        const dealerDataRes = await getdealerData(res[0].brandId)
        setAllDelaerArr(dealerDataRes?.dealers || [])
      } else {
        setAllDelaerArr([])
      }
    };

    const loadBrandInfo = async () => {
      if (initialBrandData.length > 0) {
        await applyBrandData(initialBrandData);
        return;
      }

      setIsLoading(true)
      const res = await getnewBikeData({ brand: brandName })

      if (res && res?.length > 0) {
        await applyBrandData(res)
      }
      else {
        setAllnewBikeArr([])
        setDesc("")
        setLogo("")
        setIsLoading(false)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
        setAllDelaerArr([])
      }
    };

    loadBrandInfo()
  }, [brandName, initialBrandData])


  const showmore = () => {
    setShowmore(!Showmore);
  };

  const visibleBrandName = brandname
    ? `${brandname.charAt(0).toUpperCase()}${brandname.slice(1)}`
    : '';
  const plainDescription = stripHtml(desc);
  const seoParagraph = visibleBrandName
    ? `${visibleBrandName} new bikes in Pakistan with latest prices, specifications, features, photos and reviews. Explore ${allnewBikeArr.length} ${visibleBrandName} motorcycle models and compare details on ebike.pk. ${plainDescription}`.trim()
    : '';

  return (
    <>
      {
        !isLoading && allnewBikeArr?.length > 0 ?
          <Box className={styles.all_new_bike_main}>
            <Box className={styles.description_box}>
              <Typography component="h1" className={styles.pageTitle}>
                {visibleBrandName} New Bikes in Pakistan
              </Typography>
              <Typography className={styles.pageIntro}>
                Compare {allnewBikeArr.length} latest {visibleBrandName} bike models with updated prices, specs and reviews.
              </Typography>
              {seoParagraph ? (
                <p className={styles.seoHiddenParagraph}>
                  {seoParagraph}
                </p>
              ) : null}
              <Box className={styles.card_main}>
                <img
                  src={cloudinaryLoader(logo, 400, 'auto')}
                  alt={`${visibleBrandName} logo`}
                  className={styles.card_image}
                />
              </Box>
              {desc && desc.length > 0 && (
                <>
                  {/* <Typography className={styles.descriptionPara} >
                    {Showmore ? desc.slice(0, 100) : desc}
                  </Typography> */}
                  <Typography
                    className={styles.descriptionPara}
                    sx={{ textAlign: Showmore ? "center" : "left" }}
                    dangerouslySetInnerHTML={{
                      __html: Showmore ? desc.slice(0, 100) : desc,
                    }}
                  />
                  <Box>
                    <Box className={styles.buttons_box}>
                      <Button
                        className={styles.show_more_button}
                        onClick={showmore}
                        disableRipple
                      >
                        {Showmore ?
                          <>
                            Show More
                            <KeyboardArrowDownIcon sx={{ fontSize: '15px' }} />
                          </>
                          :
                          <>
                            Show Less
                            <KeyboardArrowUpIcon sx={{ fontSize: '15px' }} />
                          </>
                        }
                      </Button>
                    </Box>
                  </Box>
                </>
              )}

              <Box className={styles.descriptionAdBox}>
                <AdSense
                  client="ca-pub-5167970563180610"
                  slot="9214599249"
                />
              </Box>

            </Box>
            <Grid container className={styles.grid_sectiion_box}>
              <Grid item xs={isMobile ? 12 : 9} className={styles.card_grid}>
                <Typography className={styles.heading}>{visibleBrandName} Bike Models</Typography>
                {
                  allnewBikeArr.map((e, i) => {
                    return (
                      <ImgCard data={e} currentpage='new_bike' from='n' key={i} />
                    )
                  })
                }
              </Grid>
              <Grid item xs={isMobile ? 12 : 3} className={styles.Dealers_grid_box}>
                <Box className={styles.sidebarAdBox}>
                  <AdSense
                    client="ca-pub-5167970563180610"
                    slot="9214599249"
                    format={null}
                    responsive={false}
                    adStyle={{ display: "inline-block", width: "250px", height: "250px" }}
                  />
                </Box>
                {
                  allDealerArr.length > 0 ?
                    <> <Typography className={styles.heading}>Related Dealers</Typography>
                      <Box className={styles.Dealers_card}>
                        {
                          allDealerArr?.map((e: any, i: any) => {
                            return (
                              <Box className={styles.card_main} key={i}>
                                <img src={cloudinaryLoader(e?.bike_brand?.logoUrl, 400, 'auto')} alt='' className={styles.card_image} />
                                <Box className={styles.card_text}>
                                  <Typography className={styles.card_title}>{e?.shop_name}</Typography>
                                  <Typography className={styles.card_location}>{e?.city?.city_name}</Typography>
                                </Box>
                              </Box>
                            )
                          })
                        }
                        <Button className={styles.view_detail_btn} onClick={() => { router.push('/dealers') }}><Link href="/dealers" className={styles.Link_tag}>View Related Dealers <KeyboardArrowRightIcon /></Link></Button>
                      </Box> </> : ''
                }
                {
                  allnewBikeArr?.length > 6 ?
                    <MechaniLeft />
                    : ""
                }
              </Grid>
            </Grid>
          </Box>
          :
          isLoading ? (
            <div className={styles.load_main}>
              <div className={styles.load_div}>
                <Loader isLoading={isLoading} />
              </div>
            </div>
          ) : (
            <Typography className={styles.no_data}>
              No Bikes Found
            </Typography>
          )
      }
    </>

  );
}
