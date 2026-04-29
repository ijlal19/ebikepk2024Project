"use client"
import { getbrandData } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { Box, Typography, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BikesBrandCard from './Card/index';
import styles from './index.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AdSense from '@/ebikeWeb/sharedComponents/googleAdsense/adsense';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const hiddenBrandNames = new Set(['sport', 'china', 'sports', 'eagle']);

function isHiddenBrand(brand: any) {
  return hiddenBrandNames.has(brand?.brandName?.trim()?.toLowerCase());
}

function isElectricBrand(brand: any) {
  return brand?.focus_keyword?.toLowerCase?.().includes('electric-bike');
}

function brandNameList(brands: any[]) {
  return 'Honda, Suzuki, Unique, BMW, Kawasaki';
}


export default function NewBikeBrand({ initialBrands = [] }: { initialBrands?: any[] }) {

  const [allBrandArr, setAllBrandArr] = useState(initialBrands)
  const [isLoading, setIsLoading] = useState(initialBrands.length === 0)
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(searchParams.get('tab') === '2' ? 1 : 0);
  }, [searchParams]);

  useEffect(() => {
    if (initialBrands.length > 0) {
      setAllBrandArr(initialBrands);
      setIsLoading(false);
      return;
    }

    fetchBrandInfo()
  }, [initialBrands])

  const fetchBrandInfo = async () => {
    setIsLoading(true)
    let res = await getbrandData()
    if (res && res.length > 0) {
      setAllBrandArr(res)
      setIsLoading(false)
    }
    else {
      alert("Wait! Something went wrong while fetching the data. Please try again reload page.");
    }
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000);
  }


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const params = new URLSearchParams(searchParams.toString());

    if (newValue === 1) {
      params.set('tab', '2');
    } else {
      params.delete('tab');
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const motorcycleBrands = allBrandArr.filter((brand: any) => !isHiddenBrand(brand) && !isElectricBrand(brand));
  const electricBrands = allBrandArr.filter((brand: any) => !isHiddenBrand(brand) && isElectricBrand(brand));
  const activeBrands = value === 1 ? electricBrands : motorcycleBrands;
  const activeLabel = value === 1 ? 'Electric Bikes' : 'New Bikes';
  const activeCopy = value === 1
    ? 'Explore electric bike brands available in Pakistan with prices, models and specs.'
    : 'Browse motorcycle brands available in Pakistan and compare their latest models.';

  return (
    <Box className={styles.bike_sec_main}>
      {
        !isLoading ?
          <>
            <Box className={styles.heroSection}>
              <Container className={styles.heroContainer}>
                <Box className={styles.heroText}>
                  <Typography component="h1" className={styles.pageTitle}>
                    {activeLabel} in Pakistan
                  </Typography>
                  <Typography className={styles.pageIntro}>
                    {activeCopy}
                  </Typography>
                </Box>
                <Box className={styles.heroMeta}>
                  <Box className={styles.metaItem}>
                    <span className={styles.metaValue}>{activeBrands.length}</span>
                    <span className={styles.metaLabel}>Brands</span>
                  </Box>
                  <Box className={styles.metaDivider} />
                  <Box className={styles.metaItem}>
                    <span className={styles.metaValue}>PK</span>
                    <span className={styles.metaLabel}>Market</span>
                  </Box>
                </Box>
              </Container>
            </Box>

            <Container className={styles.contentContainer}>
              <Box className={styles.tabsShell}>
                <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" className={styles.tabs}>
                  <Tab label="MotorCycles" className={styles.tab} sx={{ marginRight: 2 }} />
                  <Tab label="Electric Bikes" className={styles.tab} />
                </Tabs>
              </Box>

              <Box className={styles.sectionHeader}>
                <Box>
                  <Typography component="h2" className={styles.heading}>
                    {value === 1 ? 'Electric Bikes By Make' : 'New Bikes By Make'}
                  </Typography>
                  <Typography className={styles.subHeading}>
                    {brandNameList(activeBrands)}
                  </Typography>
                </Box>
                <Typography className={styles.brandCount}>
                  {activeBrands.length} brands
                </Typography>
              </Box>

              <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
              <CustomTabPanel value={value} index={0}>
                <div className={styles.tab_panel}>
                  {
                    motorcycleBrands?.map((e: any, i: any) => {
                      return (
                        <Box className={styles.brand_image_box} key={i} >
                          <BikesBrandCard key={i} data={e} />
                        </Box>
                      )
                    })
                  }
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className={styles.tab_panel}>
                  {
                    electricBrands?.map((e: any, i: any) => {
                      return (
                        <Box className={styles.brand_image_box} key={i} >
                          <BikesBrandCard key={i} data={e} />
                        </Box>
                      )
                    })
                  }
                </div>
              </CustomTabPanel>
              {/* {props?.featuredData ? <CustomTabPanel value={value} index={0}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={props?.featuredData} from='newBikeComp' currentpage="trending_bike" onBtnClick={() => { }} />
          </CustomTabPanel> : ""}
          {props?.trendingData ? <CustomTabPanel value={value} index={1}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={props?.trendingData} from='newBikeComp' currentpage='trending_bike' onBtnClick={() => { }} />
          </CustomTabPanel> : ""} */}
              </Box>

            <Box className={styles.pageAdBox}>
              <AdSense
                client="ca-pub-5167970563180610"
                slot="9214599249"
              />
            </Box>

          </Container>
          </>
          :
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
      }

    </Box>
  );
}














// <Box className={styles.bikes_brand_main}>
//   {!isLoading ?
//     <>
//       <Box className={styles.bikes_brand_container}>
//         <Typography className={styles.heading}>New Bikes By Make</Typography>
//         {
//           allBrandArr?.map((e: any, i: any) => {
//             if (e?.brandName == "sport" || e?.brandName == "china") return null;
//             return (
//               <Box className={styles.brand_image_box} key={i} >
//                 <BikesBrandCard key={i} data={e} />
//               </Box>
//             )
//           })
//         }
//       </Box>
//     </> :
//     <div className={styles.load_main}>
//       <div className={styles.load_div}>
//         <Loader isLoading={isLoading} />
//       </div>
//     </div>
//   }
// </Box>
