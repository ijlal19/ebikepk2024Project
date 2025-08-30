'use client';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, PinterestShareCount, TwitterIcon, TwitterShareButton } from 'next-share';
import { getAllBlog, getAllFeaturedBike, getdealerData, getnewBikeData, getPostBlogcomment, getSingleBlogData } from '@/ebikeWeb/functions/globalFuntions';
import { Box, Grid, useMediaQuery, Typography, Avatar, Fab, Button, Link } from '@mui/material';
import { add3Dots, isLoginUser, priceWithCommas } from '@/genericFunctions/geneFunc';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { useParams, useRouter } from 'next/navigation';
import { Navigation, Autoplay } from "swiper/modules";
import { GiConsoleController } from 'react-icons/gi';
import { Swiper, SwiperSlide } from "swiper/react";
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import "swiper/css/navigation";
import "swiper/css";
import BrowseUsedBike from '@/ebikeWeb/sharedComponents/BrowseUsedBike';
import Blog_Category_Comp from '@/ebikeWeb/sharedComponents/blog_Category';

const BlogDetails = () => {
  const [IsLogin, setIsLogin] = useState<any>('not_login');
  const [allDealerArr, setAllDelaerArr] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [displayicon, setDisplayIcon] = useState(true);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [DataBlog, setDataBlog]: any = useState(null);
  const [CommentArr, setCommentArr]: any = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [BlogData, setBlogData] = useState([]);
  const [Comment, setComment] = useState('');
  const [Href, setHref] = useState('');

  const router = useRouter()
  const params = useParams()
  const id = params?.id

  useEffect(() => {
    fetchFeaturedBike()
    fetchDealerinfo()
    getAllBlogList()
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

  async function getAllBlogList() {
    setIsLoading(true);
    let res = await getAllBlog();
    if (res?.length > 0 && id) {
      const filteredBlogs = res.filter((blog: any) => blog.id.toString() !== id.toString());
      setBlogData(filteredBlogs);
    }
  }

  async function fetchFeaturedBike() {
    let res = await getAllFeaturedBike();
    if (res?.length > 0) {
      setFeaturedData(res)
    }
    else {
      setFeaturedData([])
    }
  }

  const brandName = ['honda', 'zxmco', 'united', 'crown', 'yamaha'];
  async function fetchDealerinfo() {
    setIsLoading(true)
    const randomBrand = brandName[Math.floor(Math.random() * brandName.length)];
    let res = await getnewBikeData({ brand: randomBrand })
    if (res?.length > 0) {
      let DealerDataRes = await getdealerData(res[0].brandId)
      setAllDelaerArr(DealerDataRes.dealers)
    }
  }

  async function fetchBrandInfo() {
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

  const handletrendingRoute = (e: any) => {
    var title = e.title;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    lowerTitle = '' + lowerTitle.replaceAll("?", "")
    router.push(`/used-bikes/${lowerTitle}/${e?.id}`);
  };

  const handleRoute = (blogInfo: any) => {
    var title = blogInfo.blogTitle;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    lowerTitle = '' + lowerTitle.replaceAll("?", "")
    router.push(`/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`);
  };

  const trendingCardMini = (e: any, i: any) => {
    return (
      <Box className={styles.shot_blog_card} key={i}
        onClick={() => handletrendingRoute(e)}
        style={{ cursor: "pointer" }} >
        <Box className={styles.image_box}>
          <img src={e?.images[0]} alt="" className={styles.image} />
        </Box>
        <Box className={styles.title_box}>
          <p className={styles.title}>{add3Dots(e?.title, 25)}
          </p>
          <p className={styles.price}>PKR:{priceWithCommas(e?.price)}</p>
        </Box>
      </Box>
    )
  }

  const blogCardMini = (e: any, i: any) => {
    return (
      <Box className={styles.shot_blog_card} key={i} onClick={() => handleRoute(e)} style={{ cursor: "pointer" }} >
        <Box className={styles.image_box}>
          <img src={e?.featuredImage?.split(' #$# ')[0]?.trim()} alt="" className={styles.image} />
        </Box>
        <Box className={styles.title_box}>
          <p className={styles.title}>{add3Dots(e?.blogTitle, 15)}</p>
          <p className={styles.name}>{e?.authorname}</p>
        </Box>
      </Box>
    )
  }

  return (
    <Box className={styles.blog_details_main}>
      {!isLoading ?
        <> {DataBlog ?
          <Grid container className={styles.gird_box_main}>
            <Grid item xs={isMobile ? 12 : 8.5} className={styles.blog_details_card}>

              {/* <Box className={styles.image_box}>
                <img src={DataBlog.featuredImage} alt="" className={styles.image} />
              </Box> */}

              <Box className={styles.image_box}>
                {DataBlog?.featuredImage?.includes(' #$# ') ? (
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className={styles.image_swiper}
                  >
                    {DataBlog.featuredImage.split(' #$# ').map((imgUrl: string, idx: number) => (
                      <SwiperSlide key={idx}>
                        <img src={imgUrl.trim()} alt={`blog-image-${idx}`} className={styles.image} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img
                    src={DataBlog?.featuredImage?.split(' #$# ')[0]?.trim()}
                    alt="blog"
                    className={styles.image}
                  />
                )}
              </Box>


              <Box className={styles.blog_details_content}>

                <Typography className={styles.blogTitle}>
                  {DataBlog.blogTitle}
                </Typography>

                <Typography className={styles.profile_box}>
                  <Avatar alt="Remy Sharp" sx={{ width: 26, height: 26, marginRight: 1 }} src={DataBlog?.featuredImage?.includes(" #$# ")
                    ? DataBlog.featuredImage.split(" #$# ")[0].trim()
                    : DataBlog?.featuredImage} />
                  <span>
                    <span style={{ color: 'grey' }}>By</span> <span style={{ marginRight: 8 }}>{DataBlog.authorname}</span> <span style={{ color: 'grey', marginRight: 8 }}>- On</span> {DataBlog.createdAt.slice(0, 10)}
                  </span>
                </Typography>

                <Typography className={styles.socialicons_box}>
                  <Fab variant="extended" disableRipple
                    sx={{
                      height: 32,
                      fontSize: '12px',
                      boxShadow: 'none',
                      display: 'flex',
                      color: '#4d4d4d',
                      alignItems: 'center',
                      border: '1px solid #e2e2e2',
                      background: 'white',
                      cursor: 'text',
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

              <div className={styles.blog_content} dangerouslySetInnerHTML={{ __html: DataBlog.bloghtml }} ></div>

              <Box className={styles.comment_box}>
                <Typography className={styles.shortblogheading}>Leave a Reply <span className={styles.underline}></span></Typography>
                <Box className={styles.details_input}>
                  <textarea name="" id="" className={styles.your_comment_input} placeholder="Your Comment"
                    onChange={(e) => setComment(e.target.value)}></textarea>
                </Box>
                <Button className={styles.post_comment} onClick={handlePost}>Post Comment</Button>
                <div className={styles.user_comment_box} style={{ display: CommentArr && CommentArr.length > 0 ? "" : "none" }}>
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
                            <p style={{ margin: 0, fontSize: '14px', paddingBottom: 3, fontFamily: "sans-serif" }}>
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
                  ) : ""}

                </div>
              </Box>
            </Grid>

            <Grid item xs={isMobile ? 12 : 3} className={styles.moreBlog}>
              {
                allDealerArr.length > 0 ?
                  <> <Typography className={styles.heading}>Dealers</Typography>
                    <Box className={styles.Dealers_card}>
                      {
                        allDealerArr?.map((e: any, i: any) => {
                          return (
                            <Box className={styles.card_main} key={i}>
                              <img src={e?.bike_brand?.logoUrl} alt='' className={styles.card_image} />
                              <Box className={styles.card_text}>
                                <Typography className={styles.card_title}>{e?.shop_name}</Typography>
                                <Typography className={styles.card_location}>{e?.city?.city_name}</Typography>
                              </Box>
                            </Box>
                          )
                        })
                      }
                      <Button className={styles.view_detail_btn} onClick={() => { router.push('/dealers') }}><Link href="/dealers" className={styles.Link_tag}>View More Dealers <KeyboardArrowRightIcon /></Link></Button>
                    </Box> </> : ''
              }

              <Box className={styles.shortBlog_main}>
                <Typography className={styles.heading}>Featured Used Bikes</Typography>
                {
                  featuredData.slice(0, 5).map((e: any, i: any) => {
                    return (
                      trendingCardMini(e, i)
                    )
                  })
                }
              </Box>

              <Box className={styles.blog_add}>
                <Link href='/blog'>
                  <img src="https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg" alt="" className={styles.image} />
                </Link>
              </Box>
              {/* <Box className={styles.shortBlog_main}>
                <Typography className={styles.heading}>More Blogs</Typography>
                {
                  BlogData.slice(0, 5).map((e: any, i: any) => {
                    console.log("data", e)
                    return (
                      blogCardMini(e, i)
                    )
                  })
                }
              </Box> */}
            </Grid>
            <Blog_Category_Comp heading="More Blogs" data={BlogData} />
            <BrowseUsedBike />
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

