'use client'
import styles from './index.module.scss'
import { Box, Container, Typography } from '@mui/material';
import Data from './Data';
import TrendingData from './TrendingData'
import SwiperCarousels from '@/ebikeWeb/sharedComponents/swiperSlider/index';
import * as React from 'react';
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

function NewBikesSection(props:any) {
  const [value, setValue] =React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue);
  };

  return (
    <Box className={styles.bike_sec_main}>
      <Container>
        <Typography className={styles.heading}>
          Bike Collection
          <Link className={styles.view_new_bik_btn}  href={'/new-bikes'}> 
            <span> View New Bikes </span>
          </Link> 
        </Typography>
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary"  >
              <Tab label="Featured" className={styles.tab} sx={{marginRight:2}}/>
              <Tab label="Trending" className={styles.tab} />
            </Tabs>
          </Box>

          {props?.featuredData ? <CustomTabPanel value={value} index={0}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={props?.featuredData} from='newBikeComp' currentpage="trending_bike" onBtnClick={()=>{}}  />
          </CustomTabPanel> : "" }
          {props?.trendingData ? <CustomTabPanel value={value} index={1}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={props?.trendingData} from='newBikeComp' currentpage='trending_bike' onBtnClick={()=>{}} />
          </CustomTabPanel> : "" }
        </Box>

      </Container>

    </Box>
  )
}
export default NewBikesSection;

