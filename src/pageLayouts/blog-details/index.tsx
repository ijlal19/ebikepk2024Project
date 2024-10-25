'use client';
import { Box, Container, Grid, useMediaQuery, Typography, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import BlogDetailsData from './Data';
import { useParams } from 'next/navigation';

const BlogDetails = () => {
  const isMobile = useMediaQuery('(max-width:768px)')
  const [Title,setTitle]=useState('')
  const params = useParams()

  const id = params.slug.slice(0,3)
  console.log(id)
  useEffect(() => {
    const blog = BlogDetailsData.find((e: any) =>{
      // console.log(e)
       if (e.id == id) {
        console.log('Sure',e);
        setTitle(e);
      }}
  );
  }, [id])

  return (
    <Box className={styles.blog_details_main}>
      <Grid container>
        <Grid item xs={isMobile ? 12 : 9} className={styles.blog_details_card}>
          <Box className={styles.image_box}>
            <img src={Title.featuredImage} alt="" className={styles.image}/>
          </Box>
        </Grid>
        {/* <Grid item xs={isMobile ? 12 : 3}></Grid> */}
      </Grid>
    </Box>
  );
};

export default BlogDetails;

