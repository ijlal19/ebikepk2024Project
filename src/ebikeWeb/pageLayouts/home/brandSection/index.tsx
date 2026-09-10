'use client'
import styles from './index.module.scss'
import { Box, Button, Container, Link, Typography } from '@mui/material';
import * as React from 'react';
import BrandCard from './Card/index'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/navigation'
import { getbrandData } from '@/ebikeWeb/functions/globalFuntions';
import { getVisibleBrands, sortBrandsByPriority } from '@/ebikeWeb/utils/brandUtils';

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
  const [value, setValue] = React.useState(0);
  const [allBrandArr, setAllBrandArr] = React.useState<any>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const Router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }; 
  React.useEffect(() => {
    fecthAllBRands()
  },[])
  const fecthAllBRands = async () => {
    setIsLoading(true)
    let res = await getbrandData()
    setAllBrandArr(Array.isArray(res) ? sortBrandsByPriority(getVisibleBrands(res)) : [])
    setIsLoading(false);
  }

  return (
    <Box className={styles.brand_main}>
      <Container >
        <h2 className={styles.heading}>
          Bike Brands In Pakistan
          <Link className={styles.view_new_bik_btn} href={'/new-bikes'}>
            <span> View Bike Brands </span>
          </Link>
        </h2>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} textColor="primary"
              indicatorColor="primary" aria-label="basic tabs example">
              <Tab label="Brands" {...a11yProps(0)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <Box className={styles.brand_container}>
              {
                allBrandArr && allBrandArr.length > 0 ?
                  (allBrandArr.slice(0, 12).map((e: any, i: any) => {
                    return (
                      <Link href={`/new-bikes/${e?.brandName}`} className={styles.brand_image_box} key={i}>
                        <BrandCard key={i} data={e} />
                      </Link>
                    )
                  }))
                  :
                  null
              }

              <Button className={styles.viewallbikes_button} disableRipple><Link className={styles.anchor} href="/new-bikes">View More Brands</Link></Button>
            </Box>
          </CustomTabPanel>
        </Box>
      </Container>
    </Box>
  )
}
export default BrandSection;
