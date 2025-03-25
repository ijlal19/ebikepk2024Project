'use client';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, PinterestShareCount, TwitterIcon, TwitterShareButton } from 'next-share';
import { getPostBlogcomment, getSingleBlogData } from '@/ebikeWeb/functions/globalFuntions';
import { Box, Grid, useMediaQuery, Typography, Avatar, Fab, Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { isLoginUser } from '@/genericFunctions/geneFunc';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './index.module.scss';

const BlogDetails = () => {
  const [displayicon, setDisplayIcon] = useState(true);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [DataBlog, setDataBlog]: any = useState(null);
  const [Href, setHref] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Comment, setComment] = useState('');
  const [CommentArr, setCommentArr]: any = useState();
  const [IsLogin, setIsLogin] = useState<any>('not_login');


  const params = useParams()
  const id = params?.id

  useEffect(() => {
    // fetchSubCategory()
  }, [])


  useEffect(() => {
    fetchBrandInfo()
    let _isLoginUser = isLoginUser()
    if (_isLoginUser?.login) {
      setIsLogin(_isLoginUser.info)
    }
    else {
      setIsLogin("not_login")
    }
    setHref(window.location.href)

  }, [])

  async function fetchBrandInfo() {
    setIsLoading(true)
    let res = await getSingleBlogData(id)

    if (res.bloghtml) {
      res.bloghtml = res.bloghtml.toString().replace('<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>', '');
    }
    setDataBlog(res)
    setCommentArr(res.blog_comments)
    setIsLoading(false)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000);
  }

  const handleicons = () => {
    setDisplayIcon(!displayicon)
  }

  const handlePost = () => {
    if (!IsLogin || IsLogin == "not_login" || IsLogin?.id == undefined) {
      alert('You must be logged in to post a comment.')
      return
    }
    else if (Comment.trim() === '') {
      alert('Please write your comment');
      return;
    }
    const CommentObj = {
      "uid": IsLogin?.id,
      "blog_id": id,
      "user_name": IsLogin?.userFullName,
      "comment": Comment
    }
    fetchuserComment(CommentObj)
  }
  async function fetchuserComment(dataObj: any) {
    let res = await getPostBlogcomment(dataObj)
    if (res.success) {
      window.location.reload()
      setComment('')
      return
    }
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
                <Button className={styles.post_comment} onClick={handlePost}>Post Comment</Button><hr />
                <div className={styles.user_comment_box}>
                  {CommentArr && CommentArr.length > 0 ? (
                    [...CommentArr].reverse().map((data: any, i: any) => (
                      <div key={i} className={styles.user_comment}>
                        <div className={styles.user_comment_data}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              alt="Profile"
                              sx={{ width: 28, height: 28, marginRight: 1, marginLeft: 1 }}
                            />
                          </div>
                          <span className={styles.user_comment_details}>
                            <p style={{ margin: 0, fontSize: '14px', paddingBottom: 3 ,fontFamily:"sans-serif"}}>
                              {data?.user_name}
                            </p>
                            <p style={{ margin: 0, fontSize: '10px', color: 'grey' }}>
                              {data?.createdAt?.slice(0, 10)}
                            </p>
                          </span>
                        </div>
                        <p className={styles.user_main_comment}>{data?.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ textAlign: 'center', color: 'grey', fontSize: '14px' }}>
                      No comments yet
                    </p>
                  )}

                </div>
              </Box>
            </Grid>

            <Grid item xs={isMobile ? 12 : 4} className={styles.moreBlog}>
              <Box>More Blogs</Box>
            </Grid>

          </Grid>
          : <></>} </>
        :
        <div className={styles.load_main}>
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
        </div>
      }
    </Box>
  );
};

export default BlogDetails;

