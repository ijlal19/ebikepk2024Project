'use client';
import { Box, Grid, useMediaQuery, Typography, Avatar, Fab, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import BlogDetailsData from './Data';
import { useParams } from 'next/navigation';
import ShareIcon from '@mui/icons-material/Share';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, LinkedinIcon, LinkedinShareButton, MailruIcon, MailruShareButton, PinterestIcon, PinterestShareButton, PinterestShareCount, TwitterIcon, TwitterShareButton } from 'next-share';
import {getSingleBlogData } from '@/functions/globalFuntions';

const BlogDetails = () => {
  const [displayicon, setDisplayIcon] = useState(true)
  const isMobile = useMediaQuery('(max-width:768px)')
  const [DataBlog, setDataBlog]: any = useState(null)
  const params = useParams()
  const id = params.slug.slice(0, 3)
console.log(id)
  useEffect(() => {
    fetchBrandInfo()
  }, [])

  async function fetchBrandInfo() {
    let res = await getSingleBlogData(id)
    setDataBlog(res)
  }
  console.log(DataBlog)
  const handleicons = () => {
    setDisplayIcon(!displayicon)
  }

  return (
    <Box className={styles.blog_details_main}>
      {DataBlog ?
        <Grid container className={styles.gird_box_main}>
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
                <span>
                  <span style={{ color: 'grey' }}>By</span> <span style={{ marginRight: 8 }}>{DataBlog.authorname}</span> <span style={{ color: 'grey', marginRight: 8 }}>- On</span> {DataBlog.createdAt.slice(0, 10)}
                </span>
              </Typography>

              <Typography className={styles.socialicons_box}>
                <Fab variant="extended"
                  sx={{
                    height: 32,
                    fontSize: '12px',
                    boxShadow: 'none',
                    display: 'flex',
                    color: '#4d4d4d',
                    alignItems: 'center',
                    border: '1px solid #e2e2e2',
                    background: 'white'
                  }}>
                  <ShareIcon sx={{ mr: 1, fontSize: '15px',fontWeight:'bolder' }} />
                  Share
                </Fab>

                <FacebookShareButton
                  url={'https://github.com/Abdullah30Nov'}
                  quote={'next-share is a social share buttons for your next React apps.'}
                  hashtag={'#nextshare'} style={{ display: 'flex', alignItems: 'center' }}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <PinterestShareButton
                  url={'https://github.com/next-share'}
                  media={'next-share is a social share buttons for your next React apps.'}
                  style={{ display: isMobile ? displayicon ? 'none' : 'flex' : 'flex', alignItems: 'center' }}
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
                <TwitterShareButton
                  url={'https://github.com/next-share'}
                  title={'next-share is a social share buttons for your next React apps.'} style={{ display: 'flex', alignItems: 'center' }}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <LinkedinShareButton url={'https://github.com/next-share'} style={{ display: 'flex', alignItems: 'center' }}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <EmailShareButton
                  url={'https://github.com/next-share'}
                  subject={'Next Share'}
                  body="body" style={{ display: isMobile ? displayicon ? 'none' : 'flex' : 'flex', alignItems: 'center' }}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
                <AddCircleRoundedIcon sx={{ fontSize: '35px', height: 35, display: isMobile ? 'flex' : 'none', color: '#b5b2b2' }} onClick={handleicons} />
              </Typography>
            </Box>

            <div className={styles.blog_content} dangerouslySetInnerHTML={{ __html: DataBlog.bloghtml }}></div>

            <Box className={styles.comment_box}>
              <Typography className={styles.comment_box_Title}>Leave A Reply</Typography>
              <Typography className={styles.email_publish}>Your email address will not be published.</Typography>
              <Box className={styles.input_container}>
              </Box>
              <Box className={styles.details_input}>
                <textarea className={styles.your_comment_input} placeholder="Enter your comment"></textarea>
                <input type="text" className={styles.name_input} placeholder='Your Name'/>
                <input type="text" className={styles.email_input} placeholder='Your Email'/>
                <input type="text" className={styles.website_input} placeholder='Your Website'/>
              </Box>
              <Typography className={styles.permission}><input type="checkbox" /><span style={{marginLeft:5,marginBottom:5}}>Save my name, email, and website in this browser for the next time I comment.</span></Typography>
              <Button className={styles.post_comment}>Post Comment</Button>
            </Box>
          </Grid>

          <Grid item xs={isMobile ? 12 : 4} className={styles.moreBlog}>
            <Box>More Blogs</Box>
          </Grid>

        </Grid> : <></>}
    </Box>
  );
};

export default BlogDetails;

