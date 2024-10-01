'use client'
import styles from './index.module.scss'
import { Box, Container, Typography } from '@mui/material';
// import Data from './Data';
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
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function BrandSection() {
  const [value, setValue] =React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.brand_main}>
      <Container>
        <Typography className={styles.heading}>
          Brand
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} textColor="primary"
  indicatorColor="primary" aria-label="basic tabs example">
              <Tab label="Brands" {...a11yProps(0)} />
              {/* <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box className={styles.brand_container}>
              <Box className={styles.brand_image_box}></Box>
              {/* <img src="" alt="" /> */}
            </Box>
            {/* <SwiperCarousels sliderName='bikesSectionSwiper' sliderData={Data} from='n'/> */}
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
        </Box>
      </Container>
    </Box>
  )
}
export default BrandSection;