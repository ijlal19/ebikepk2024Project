'use client';
import { Box, Grid, useMediaQuery, Typography, Pagination, Button } from '@mui/material';
import { getAllBlog } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import Autocomplete from '@mui/material/Autocomplete';
import { GiConsoleController } from 'react-icons/gi';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OurVideos from '../home/ourVideos';
import styles from './index.module.scss';
import Stack from '@mui/material/Stack';

const Blog = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFilterApply, setisFilterApply] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [BlogBikeCare, setBlogBikeCare] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [BlogSafety, setBlogSafety] = useState([]);
  const [BlogData, setBlogData] = useState([]);
  const [BlogNews, setBlognews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllBlogList()
  }, [])

  useEffect(() => {
    setisFilterApply(true)
  }, [filteredResults])

  async function getAllBlogList() {
    setIsLoading(true)
    let res = await getAllBlog()
    setBlogData(res)
    res.map((e: any) => {
      const newsBlogs = res.filter((e: any) => e?.blog_category?.name === "News");
      const safetyBlogs = res.filter((e: any) => e?.blog_category?.name === "Safety");
      const Bike_Care = res.filter((e: any) => e?.blog_category?.name === "Bike Care");
      setBlognews(newsBlogs)
      setBlogSafety(safetyBlogs)
      setBlogBikeCare(Bike_Care)
    })
    setisFilterApply(false)
    setIsLoading(false)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000);
  }

  const blogsPerPage = 10;
  const totalPages = Math.ceil(BlogData.length / blogsPerPage);
  const currentBlogs = BlogData.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

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
  };

  const SearchTerm = (e: any) => {
    setSearchTerm(e.target.value)

  }

  const blogCardMini = (e: any, i: any) => {
    return (
      <Box className={styles.shot_blog_card} key={i} onClick={() => handleRoute(e)} style={{ cursor: "pointer" }} >
        <Box className={styles.image_box}>
          <img src={e?.featuredImage} alt="" className={styles.image} />
        </Box>
        <Box className={styles.title_box}>
          <p className={styles.title}>{e?.blogTitle}</p>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {
        !isLoading ?
          <Box className={styles.blog_main}>

            <Box className={styles.FrontAdd_box}>
              <Box className={styles.trending}><b style={{ color: 'black', fontFamily: "sans-serif",display: isMobile? "none":"flex" }}>Trending Videos</b></Box>
            </Box>
            <OurVideos SetMaxWidth='inblogs' SetWidth='inblogs' />
            <Box className={styles.blog_header}>
              <Typography className={styles.blog_heading}>
                Blogs & Articles
              </Typography>

              <Box className={styles.FrontAdd_box}>
                <Box className={styles.input_main}>
                  <input type="text" placeholder='Search Blog Here...' onChange={(e) => handleSearch(e)} className={styles.input} />
                </Box>
              </Box>
            </Box>

            <hr />

            <Grid container className={styles.blog_grid}>
              <Grid item xs={isMobile ? 12 : 8.5} sx={{ paddingRight: '15px' }}>
                {
                  !isFilterApply ?
                    <Grid container>
                      {currentBlogs.length > 0 && currentBlogs.map((e: any, i: any) => (
                        <Grid className={styles.blog_grid1} item xs={12} key={i}>
                          <Grid container onClick={() => handleRoute(e)} style={{ cursor: "pointer" }}>
                            <Grid item xs={isMobile ? 12 : 4.5} className={styles.grid1_child1} >
                              <img src={e.featuredImage} alt="" className={styles.blog_images} />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 7.5} className={styles.grid1_child2} >
                              <Box style={isMobile ? {} : { paddingLeft: "9px" }}>
                                <Typography className={styles.blog_card_title} >{e.blogTitle}</Typography>
                                <Typography className={styles.blog_card_date}>
                                  <span style={{ marginRight: 8 }}>{e.authorname}</span> | <span style={{ marginRight: 8, marginLeft: 8 }}>{e.createdAt.slice(0, 10)}</span> | <span style={{ color: '#1976d2', marginLeft: 8 }}>{e.id}</span>
                                </Typography>
                                <Typography className={styles.blog_card_description}>{e?.meta_description?.slice(0, 119)}...</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid> :
                    <Grid container>
                      {filterBlogs.length > 0 && filterBlogs.map((e: any, i: any) => (
                        <Grid className={styles.blog_grid1} item xs={12} key={i}>
                          <Grid container onClick={() => handleRoute(e)} style={{ cursor: "pointer" }}>
                            <Grid item xs={isMobile ? 12 : 4.5} className={styles.grid1_child1} >
                              <img src={e.featuredImage} alt="" className={styles.blog_images} />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 7.5} className={styles.grid1_child2}>
                              <Box style={isMobile ? {} : { paddingLeft: "9px" }}>
                                <Typography className={styles.blog_card_title} >{e.blogTitle}</Typography>
                                <Typography className={styles.blog_card_date}>
                                  <span style={{ marginRight: 8 }}>{e.authorname}</span> | <span style={{ marginRight: 8, marginLeft: 8 }}>{e.createdAt.slice(0, 10)}</span> | <span style={{ color: '#1976d2', marginLeft: 8 }}>{e.id}</span>
                                </Typography>
                                <Typography className={styles.blog_card_description}>{e?.meta_description?.slice(0, 119)}...</Typography>
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
                  />
                </Box>
              </Grid>
              <Grid className={styles.blog_grid2} item xs={isMobile ? 12 : 3.5}>
                <Box className={styles.add_area_content}>
                  <Box className={styles.shortBlog_main}>
                    <Typography className={styles.shortblogheading}>News <span className={styles.underline}></span></Typography>
                    {
                      BlogNews.slice(0, 5).map((e: any, i: any) => {
                        return (
                          blogCardMini(e, i)
                        )
                      })
                    }
                  </Box>
                  <Box className={styles.shortBlog_main}>
                    <Typography className={styles.shortblogheading}>Safety <span className={styles.underline}></span></Typography>
                    {
                      BlogSafety.slice(0, 5).map((e: any, i: any) => {
                        return (
                          blogCardMini(e, i)
                        )
                      })
                    }
                  </Box>
                  <Box className={styles.shortBlog_main}>
                    <Typography className={styles.shortblogheading}>Bike Care <span className={styles.underline}></span></Typography>
                    {
                      BlogBikeCare.slice(0, 5).map((e: any, i: any) => {
                        return (
                          blogCardMini(e, i)
                        )
                      })
                    }
                  </Box>
                </Box>
              </Grid>
            </Grid>
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