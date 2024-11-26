'use client'
import styles from './index.module.scss'
import { Box, Container, Typography } from '@mui/material';
import Data from './Data';
import TrendingData from './TrendingData'
import SwiperCarousels from '@/sharedComponents/swiperSlider/index';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

function NewBikesSection() {
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
        </Typography>
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
              <Tab label="Featured" className={styles.tab} sx={{marginRight:2}}/>
              <Tab label="Trending" className={styles.tab} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={Data} from='n' currentpage="featured_bike" />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={TrendingData} from='n' currentpage='trending_bike'/>
          </CustomTabPanel>
        </Box>

      </Container>
    </Box>
  )
}
export default NewBikesSection;

