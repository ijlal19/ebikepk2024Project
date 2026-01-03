'use client';
import Featrued_Usedbike_left from '@/ebikeWeb/sharedComponents/Letf-side-section/used-bike-section/featuredBikecard';
import { add3Dots, BlogShuffle, cloudinaryLoader, isLoginUser, timeAgo } from '@/genericFunctions/geneFunc';
import { Box, Grid, useMediaQuery, Typography, Pagination, Button, Link } from '@mui/material';
import { Side_brands } from '@/ebikeWeb/sharedComponents/Letf-side-section/brand-section';
import MechaniLeft from '@/ebikeWeb/sharedComponents/Letf-side-section/Mechanic-left';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getAllBlog, getViewsByID, UpdateView } from '@/ebikeWeb/functions/globalFuntions';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Blog_Category_Comp from '@/ebikeWeb/sharedComponents/blog_Category';
import BrowseUsedBike from '@/ebikeWeb/sharedComponents/BrowseUsedBike';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Autocomplete from '@mui/material/Autocomplete';
import { GiConsoleController } from 'react-icons/gi';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OurVideos from '../home/ourVideos';
import styles from './index.module.scss';
import Stack from '@mui/material/Stack';
import CATEGORYdATA from './Data';
import Script from "next/script";

import { List_Card } from '@/ebikeWeb/sharedComponents/NewSectionM/card';
const TagArray = [
  "Honda",
  "Price",
  "Bike",
  "Tips",
  "CC",
  "Suzuki",
  "125",
  "2025",
  "Petrol",
  "New",
  "Used",
  "Riding",
  "Fuel",
  "KTM",
  "Pakistan",
  "Launch",
  "Model",
  "Yamaha",
  "Review",
  "Vehicle",
  "Kawasaki",
  "Motorcycle",
  "Electric",
  "Introduce",
  "Scooter",
  "BMW",
]
const Blog = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFilterApply, setisFilterApply] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [BlogBikeCare, setBlogBikeCare] = useState([]);
  const [SelectedTags, setSelectedTag] = useState('');
  const [IsLogin, setIsLogin] = useState('not_login');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [BlogSafety, setBlogSafety] = useState([]);
  const [BlogData, setBlogData] = useState([]);
  const [BlogNews, setBlognews] = useState([]);
  const [messages, setMessages] = useState<any>([]);
  const [TipsandAdvice, setTipsandAdvide] = useState<any>([])
  const [OpinionsData, setOpinionsData] = useState<any>([])
  // const [AllViews, setAllView] = useState<any>([])

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let _isLoginUser = isLoginUser()
    if (_isLoginUser?.login) {
      setIsLogin(_isLoginUser.info)
    }
    else {
      setIsLogin("not_login")
    }

    getAllBlogList()
    setFade(true);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }

  }, [])

  useEffect(() => {
    setisFilterApply(true)
  }, [filteredResults])


  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages]);

  async function getAllBlogList() {
    setIsLoading(true)
    let res = await getAllBlog()
    // let res1 = await getViewsByID(1)
    // if (res1 && res1?.success && res1?.data.length > 0) {
    //   setAllView(res1?.data)
    // }
    setBlogData(res)
    const resAdvice = BlogShuffle(res)
    setTipsandAdvide(resAdvice);
    const resOpinion = BlogShuffle(res)
    setOpinionsData(resOpinion);
    res?.map((e: any) => {
      const newsBlogs = res.filter((e: any) => e?.blog_category?.name === "News");
      const safetyBlogs = res.filter((e: any) => e?.blog_category?.name === "Safety");
      const Bike_Care = res.filter((e: any) => e?.blog_category?.name === "Bike Care");
      setBlognews(newsBlogs)
      setBlogSafety(safetyBlogs)
      setBlogBikeCare(Bike_Care)
    })
    const top7Titles = res.slice(0, 7).map((e: any) => e);
    setMessages(top7Titles);

    setisFilterApply(false)
    setIsLoading(false)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000);
  }

  const blogsPerPage = 10;
  const totalPages = Math.ceil(BlogData?.length / blogsPerPage);
  const currentBlogs = BlogData?.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const filterblogsPerPage = 10;
  const totalfilterPages = Math.ceil(filteredResults.length / filterblogsPerPage);
  const filterBlogs = filteredResults.slice((currentPage - 1) * filterblogsPerPage, currentPage * filterblogsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleRoute = (blogInfo: any) => {
    var title = blogInfo.blogTitle;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    lowerTitle = '' + lowerTitle.replaceAll("?", "")
    router.push(`/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`);
  };

  const handleSearch = (e: any) => {
    const results = BlogData.filter((item: any) =>
      item.blogTitle.toLowerCase().includes(e?.target?.value?.toLowerCase())
    );
    setFilteredResults(results);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  const SearchTerm = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleTag = async (e: any) => {
    setSelectedTag(e)
    const obj = {
      target: { value: e }
    }
    handleSearch(obj)
  }

  const blogCardMini = (e: any, i: any) => {
    const firstImage = e?.featuredImage?.split(' #$# ')[0]?.trim();
    return (
      <div className={styles.shot_blog_card} key={i} onClick={() => handleRoute(e)} style={{ cursor: "pointer" }} >
        <div className={styles.image_box}><img src={cloudinaryLoader(firstImage, 400, 'auto')} alt="" className={styles.image} />
        </div>
        <div className={styles.title_box}>
          <p className={styles.title}>{add3Dots(e?.blogTitle, 45)}</p>
        </div>
      </div>
    )
  }

  const gotoSellBike = () => {
    if (IsLogin && IsLogin == "not_login") {
      alert('Please Login to Sell Your Bike!')
      return
    }
    else {
      router.push('/used-bikes/sell-used-bike')
    }
  }

  const getRoute = (blogInfo: any) => {
    var title = blogInfo.blogTitle;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    lowerTitle = '' + lowerTitle.replaceAll("?", "")
    return `/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`
  }

  return (
    <>

      <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
        crossOrigin="anonymous"
      />

      {
        !isLoading ?
          <Box className={styles.blog_main}>
            <Box className={styles.blog_header}>
              <Typography className={styles.blog_heading}>
                <p className={styles.static}>Trending <NavigateNextIcon className={styles.icon} /> </p>
                {messages.length > 0 && (
                  <h1 className={`${styles.text} ${fade ? styles.fadeIn : styles.fadeOut}`}>
                    <a href={getRoute(messages[index])} style={{ padding: '0px', margin: '0px', textDecoration: 'none', color: '#696969' }} >
                      {add3Dots(messages[index].blogTitle, isMobile ? 33 : 80)}
                    </a>
                  </h1>
                )}
              </Typography>

              {/* <Box className={styles.input_main}>
                <input type="text" placeholder='Search Blog Here...' onChange={(e) => handleSearch(e)} className={styles.input} />
              </Box> */}

            </Box>

            <OurVideos SetMaxWidth='inblogs' SetWidth='inblogs' />

            <hr />

            <Grid container className={styles.blog_grid}>

              <Grid item xs={isMobile ? 12 : 8.5} className={styles.card_grid_main}>

                <Box className={styles.input_main_box}>
                  <input type="text" placeholder='Search Blog Here...' onChange={(e) => handleSearch(e)} className={styles.input} />
                </Box>

                <div className="text-center mt-2 mb-2">
                      <ins className="adsbygoogle"
                          style={{ display: "block" }}
                          data-ad-client="ca-pub-5167970563180610"
                          data-ad-slot="9214599249"
                          data-ad-format="auto"
                          data-full-width-responsive="true">
                    </ins>
                </div>

                {
                  !isFilterApply ?
                    <Grid container>



                      <Typography className={styles.shortblogheading} sx={{ marginBottom: isMobile ? '10px' : '1px' }}> Bike News <span className={styles.underline}></span></Typography>

                      {currentBlogs?.length > 0 && currentBlogs?.map((e: any, i: any) => (
                        <Grid className={styles.blog_grid1} item xs={12} key={i}>
                          <Grid container onClick={() => handleRoute(e)} className={styles.blog_grid1_container}>
                            <Grid item xs={isMobile ? 12 : 4.5} className={styles.grid1_child1} >
                              <img src={cloudinaryLoader(e?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto')} alt="" className={styles.blog_images} />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 7.4} className={styles.grid1_child2} >
                              <Box style={isMobile ? {} : { paddingLeft: "9px" }}>
                                <Typography className={styles.blog_card_title} ><Link href={getRoute(e)} className={styles.link_title} >{add3Dots(e.blogTitle, 60)}</Link></Typography>
                                <Typography className={styles.blog_card_date}>
                                  <span style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}><AccountCircleOutlinedIcon sx={{ fontSize: '15px', marginRight: '2px' }} />{e.authorname}</span> | <span style={{ marginRight: 8, marginLeft: 8, display: 'flex', alignItems: 'center' }}><DateRangeIcon sx={{ fontSize: '15px', marginRight: '2px' }} />{timeAgo(e.createdAt)}</span> |
                                  <span style={{ color: '#1976d2', marginLeft: 8 }}>
                                    {e.id}
                                  </span>
                                  {/* {
                                    (() => {
                                      const matched = AllViews.find((viewd: any) => viewd.AdID === e.id);
                                      return matched ? <span style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>{matched.views_count} <VisibilityOutlinedIcon sx={{ fontSize: '13px', marginRight: '2px', marginLeft: '2px' }} /></span> : <span style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>0 <VisibilityOutlinedIcon sx={{ fontSize: '13px', marginRight: '2px', marginLeft: '2px' }} /></span>;
                                    })()
                                  } */}
                                </Typography>
                                <Typography className={styles.blog_card_description}>{add3Dots(e?.meta_description, 200)}</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid> :
                    <Grid container>
                      {filterBlogs.length > 0 && filterBlogs.map((e: any, i: any) => (
                        <Grid className={styles.blog_grid1} item xs={12} key={i}>
                          <Grid container onClick={() => handleRoute(e)} className={styles.blog_grid1_container}>
                            <Grid item xs={isMobile ? 12 : 4.5} className={styles.grid1_child1} >
                              <img src={cloudinaryLoader(e?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto')} alt="" className={styles.blog_images} />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 7.4} className={styles.grid1_child2} >
                              <Box style={isMobile ? {} : { paddingLeft: "9px" }}>
                                <Typography className={styles.blog_card_title} ><Link href={getRoute(e)} className={styles.link_title} >{add3Dots(e.blogTitle, 60)}</Link></Typography>
                                <Typography className={styles.blog_card_date}>
                                  <span style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}><AccountCircleOutlinedIcon sx={{ fontSize: '15px', marginRight: '2px' }} />{e.authorname}</span> | <span style={{ marginRight: 8, marginLeft: 8 }}><DateRangeIcon sx={{ fontSize: '15px', marginRight: '2px' }} />{e.createdAt.slice(0, 10)}</span> | <span style={{ color: '#1976d2', marginLeft: 8 }}>{e.id}</span>
                                </Typography>
                                <Typography className={styles.blog_card_description}>{add3Dots(e?.meta_description, 200)}</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                }

                <Box className={styles.pagination}>
                  <Pagination
                    count={!isFilterApply ? totalPages : totalfilterPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color='primary'
                    size={isMobile ? "small" : 'medium'}
                  />
                </Box>
              </Grid>
              <Grid className={styles.blog_grid2} item xs={isMobile ? 12 : 3.5}>
                <Box className={styles.add_area_content}>

                  <Side_brands />

                  <MechaniLeft />

                  <Featrued_Usedbike_left />
                  <div className={styles.main_art}>
                    <List_Card />
                  </div>

                  <button className={styles.btn} onClick={gotoSellBike}>Sell your bike</button>
                  <Box className={styles.tags_main} >
                    <Typography className={styles.shortblogheading}>Popular Tags <span className={styles.underline}></span></Typography>
                    <Box className={styles.tags_content}>
                      {
                        TagArray.map((e: any, i: any) => {
                          return (
                            <Button className={SelectedTags !== e ? styles.tags_btn : styles.tags_select_btn} onClick={() => { handleTag(e) }} key={i} >{e}</Button>
                          )
                        })
                      }
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Blog_Category_Comp heading="More Blogs" data={TipsandAdvice} />

            <BrowseUsedBike />
          </Box >
          :
          <div className={styles.load_main}>
            <div className={styles.load_div}>
              <Loader isLoading={isLoading} />
            </div>
          </div>
      }
    </>
  );
};

export default Blog;