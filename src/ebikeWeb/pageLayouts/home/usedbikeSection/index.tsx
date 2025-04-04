'use client'
import styles from './index.module.scss'
import { Box, Container, Typography } from '@mui/material';
import Data from './Data';
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

function CustomTabPanel(props: any) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function UsedBikesSection({from, featuredData, usedBikeData}:any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Box className={styles.usedbike_main}>
      <Container>
        <Typography className={`${styles.heading} ${from == 'featuredBike' ? styles.featuredHeading : ""} `  } >
         {from == 'featuredBike' ? 'Featured Bikes': 'Used Bikes'} 
         {from != 'featuredBike' ?  
           <Link className={styles.view_new_bik_btn}  href={'/used-bikes'}> 
              <span> View Used Bikes </span>
            </Link>  : "" }
        </Typography>
        
        { from == 'featuredBike' ?
        <Box sx={{ width: '100%' }}>
          <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={from == 'featuredBike' ? (featuredData?.length > 0 ?  featuredData : Data) : Data}  from='usedBikeComp' currentpage="used_bike" onBtnClick={()=>{}}  />
        </Box> :
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} textColor="primary"
                  indicatorColor="primary" aria-label="basic tabs example">
              <Tab label="Bikes" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={usedBikeData} from='usedBikeComp' currentpage='used_bike' onBtnClick={()=>{}}  />
          </CustomTabPanel>
        </Box> }
        
      </Container>
    </Box>
  )
}
export default UsedBikesSection;