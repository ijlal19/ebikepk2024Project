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
import { getAllBlogComment, getPostBlogcomment, getSingleBlogData } from '@/functions/globalFuntions';
import Loader from '@/sharedComponents/loader/loader'

const BlogDetails = () => {
  const [displayicon, setDisplayIcon] = useState(true)
  const isMobile = useMediaQuery('(max-width:768px)')
  const [DataBlog, setDataBlog]: any = useState(null)
  const [Href, setHref] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [Comment, setComment] = useState('')

  const params = useParams()
  const id = params?.id

  useEffect(() => {
    fetchBrandInfo()
    setHref(window.location.href)

  }, [])

  async function fetchBrandInfo() {
    setIsLoading(true)
    let res = await getSingleBlogData(id)


    let response = await getAllBlogComment()
    console.log('res',response)


    if (res.bloghtml) {
      res.bloghtml = res.bloghtml.toString().replace('<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>', '');
    }
    setDataBlog(res)
    console.log(res)
    setIsLoading(false)
    window.scrollTo(0, 0)
    // const category = res?.blog_category?.name
    // console.log(category)
    // const Maintitle = res?.blogTitle
    // const titleReplace = Maintitle.replace(/\s+/g, '-');
    // var completetitle = titleReplace.toLowerCase();
    // console.log(completetitle)
  }

  const handleicons = () => {
    setDisplayIcon(!displayicon)
  }

  const handlePost = () => {
    if (Comment.trim() === '') {
      alert('Please write your comment');
      return;
    }
    const CommentObj = {
      "uid": null,
      "blog_id": id,
      "user_name": "ebiker",
      "comment": Comment
    }
    console.log('eded', CommentObj)
    // getPostBlogcomment
    fetchuserComment(CommentObj)
  }
  async function fetchuserComment(dataObj: any) {
    let res = await getPostBlogcomment(dataObj)
    if (res.success) {
      setComment('')
      console.log('Success', res)
      return
    }
    console.log('erro', res)
  }
  return (
    <Box className={styles.blog_details_main}>
      {!isLoading ?
        <> {DataBlog ?
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
                    <ShareIcon sx={{ mr: 1, fontSize: '15px', fontWeight: 'bolder' }} />
                    Share
                  </Fab>

                  <FacebookShareButton
                    url={Href}
                    quote={'next-share is a social share buttons for your next React apps.'}
                    hashtag={'#nextshare'} style={{ display: 'flex', alignItems: 'center' }}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <PinterestShareButton
                    url={Href}
                    media={'next-share is a social share buttons for your next React apps.'}
                    style={{ display: isMobile ? displayicon ? 'none' : 'flex' : 'flex', alignItems: 'center' }}
                  >
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                  <TwitterShareButton
                    url={Href}
                    title={'next-share is a social share buttons for your next React apps.'} style={{ display: 'flex', alignItems: 'center' }}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  <LinkedinShareButton url={Href}
                    style={{ display: 'flex', alignItems: 'center' }}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>

                  <EmailShareButton
                    url={Href}
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
                <Typography className={styles.comment_box_Title}>Leave a Reply</Typography>
                <Box className={styles.details_input}>
                  <textarea name="" id="" className={styles.your_comment_input} placeholder="Enter your comment"
                    onChange={(e) => setComment(e.target.value)}></textarea>
                </Box>
                <Button className={styles.post_comment} onClick={handlePost}>Post Comment</Button>
              </Box>
            </Grid>

            <Grid item xs={isMobile ? 12 : 4} className={styles.moreBlog}>
              <Box>More Blogs</Box>
            </Grid>

          </Grid>
          : <></>} </>
        :
        <div className={styles.load_div}>
          <Loader isLoading={isLoading} />
        </div>
      }
    </Box>
  );
};

export default BlogDetails;

