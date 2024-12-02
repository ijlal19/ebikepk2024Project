'use client'
import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Data from './Data'
import styles from './index.module.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/navigation'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const router = useRouter()

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



function BlogSection() {
  const [value, setValue] =React.useState(0);
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue);
  };

  const handleRoute = (blogInfo: any) => {
    var title = blogInfo.blogTitle;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    router.push(`/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`);
  };


  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Box className={styles.main_blog}>
    <Box className={styles.blog_section_main}>
      <Container>
        <Typography className={styles.heading}>
          Latest Bikes News
        </Typography>
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
              <Tab label="Blogs" className={styles.tab} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
              {
                Data.slice(0,2).map((e: any, i: any) => (
                
                    <Grid onClick={() => { handleRoute(e) }} container key={i}className={styles.blog_grid1}>
                      <Grid
                        item
                        xs={isMobile ? 12 : 3}
                        className={styles.grid1_child1}
                      >
                        <img src={e.featuredImage} alt={e.blogTitle.slice(0,15)} className={styles.blog_images} />
                      </Grid>

                      <Grid item xs={isMobile ? 12 : 8} className={styles.grid1_child2}>
                        <Box>
                          <Typography className={styles.blog_card_title}>{e.blogTitle}</Typography>
                          <Typography className={styles.blog_card_date}>
                            <span style={{marginRight:8}}>{e.authorname}</span> | <span style={{marginRight:8,marginLeft:8}}>{e.createdAt.slice(0, 10)}</span> | <span style={{color:'#1976d2',marginLeft:8}}>{e.id}</span>
                            </Typography>
                          <Typography className={styles.blog_card_description}>{e.meta_description}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                ))
              }
          </CustomTabPanel>
        </Box>
      </Container>
    </Box>
    </Box>
  )
}
    export default BlogSection