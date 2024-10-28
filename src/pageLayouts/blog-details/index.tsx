'use client';
import { Box, Grid, useMediaQuery, Typography,  Avatar,  Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import BlogDetailsData from './Data';
import { useParams } from 'next/navigation';
import ShareIcon from '@mui/icons-material/Share';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const BlogDetails = () => {
  const [displayicon,setDisplayIcon]=useState(true)
  const isMobile = useMediaQuery('(max-width:768px)')
  const [DataBlog, setDataBlog]:any = useState(null)
  const params = useParams()
  const id = params.slug.slice(0, 3)

  useEffect(() => {
    const blogs:any = BlogDetailsData.find((e: any) => {
      if (e.id == id) {
        return e
      }
    }
  );
  setDataBlog(blogs);
}, [id])


const handleicons=()=>{
  setDisplayIcon(!displayicon)
}

  return (
    <Box className={styles.blog_details_main}>
      {DataBlog ? <Grid container className={styles.gird_box_main}>
        <Grid item xs={isMobile ? 12 : 8} className={styles.blog_details_card}>
          <Box className={styles.image_box}>
            <img src={DataBlog.featuredImage} alt="" className={styles.image} />
          </Box>
          <Box className={styles.blog_details_content}>
            <Typography className={styles.blogTitle}>
              {DataBlog.blogTitle}
            </Typography>

            <Typography className={styles.profile_box}>
              <Avatar alt="Remy Sharp" sx={{ width: 26, height: 26, marginRight: 1 }} src={DataBlog.featuredImage} />
              <span><span style={{ color: 'grey' }}>By</span> {DataBlog.authorname} <span style={{ color: 'grey' }}>- On</span> {DataBlog.createdAt.slice(0,10)}</span>
            </Typography>

            <Typography className={styles.socialicons_box}>
              <Fab variant="extended" size='small' sx={{height: 27, fontSize: '13px',boxShadow:'none'
                ,border:'1px solid grey',background:'white'
               }}>
                <ShareIcon sx={{ mr: 1, fontSize: '12px' }} />
                Share
              </Fab>
              <FacebookOutlinedIcon sx={{ height:30 ,fontSize: '30px', color:'#2d5f9a' }}/>
              <FacebookOutlinedIcon sx={{ fontSize: '30px',height:30 ,color:'#53c7ff'}}/>
              <FacebookOutlinedIcon sx={{ fontSize: '30px',height:30 ,color:'#d93b2b'}}/>
              <FacebookOutlinedIcon sx={{ fontSize: '30px',height:30 ,display: isMobile ? displayicon? 'none' :'flex' : 'flex',color:'#a41719'}}/>
              <FacebookOutlinedIcon sx={{ fontSize: '30px',height:30 ,display: isMobile ? displayicon? 'none' :'flex' : 'flex',color:'#005182'}}/>
              <FacebookOutlinedIcon sx={{ fontSize: '30px',height:30 ,display: isMobile ? displayicon? 'none' :'flex' : 'flex',color:'#444444'}}/>
              <FacebookOutlinedIcon sx={{ fontSize: '30px',height:30 ,display: isMobile ? displayicon? 'none' :'flex' : 'flex',color:'#444444'}}/>
              <AddCircleRoundedIcon sx={{ fontSize: '30px',height:30 ,display: isMobile ? 'flex' : 'none',color:'black'}} onClick={handleicons}/>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={isMobile ? 12 : 4} className={styles.moreBlog}>
          <Box>More Blogs</Box>
        </Grid>
      </Grid> : <></> }
    </Box>
  );
};

export default BlogDetails;

