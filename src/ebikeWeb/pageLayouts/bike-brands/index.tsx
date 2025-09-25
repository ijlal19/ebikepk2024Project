"use client"
import { getbrandData } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { Box, Typography, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BikesBrandCard from './Card/index';
import styles from './index.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link'


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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}


export default function NewBikeBrand() {

  const [allBrandArr, setAllBrandArr] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const CheckPath =  window?.location?.href?.includes("tab=2")
    if(CheckPath){
      setValue(1)
    }
    else{
      setValue(0)
    }
    fetchBrandInfo()
  }, [])

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


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue);
  };

  return (
    <Box className={styles.bike_sec_main}>
      {
        !isLoading ?
          <Container>
            <Typography className={styles.heading}>
              New Bikes By Make
            </Typography>

            <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary"  >
                  <Tab label="MotorCycles" className={styles.tab} sx={{ marginRight: 2 }} />
                  <Tab label="Electric Bikes" className={styles.tab} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className={styles.tab_panel}>
                  {
                    allBrandArr?.map((e: any, i: any) => {
                      if (e?.brandName?.trim()?.toLowerCase() == "sport" || e?.brandName?.trim()?.toLowerCase() == "china" || e?.brandName?.trim()?.toLowerCase() == "sports" || e?.brandName?.trim()?.toLowerCase() == "eagle") return null;
                      // if (e?.brandName?.includes("-ebb")) {
                      //   return null;
                      // }
                      if (e?.focus_keyword?.includes("electric-bike")) return null;
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
                    allBrandArr?.map((e: any, i: any) => {
                      if (e?.brandName?.trim()?.toLowerCase() == "sport" || e?.brandName?.trim()?.toLowerCase() == "china" || e?.brandName?.trim()?.toLowerCase() == "sports" || e?.brandName?.trim()?.toLowerCase() == "eagle") return null;
                      if (!e?.focus_keyword?.includes("electric-bike")) return null;
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

          </Container>
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