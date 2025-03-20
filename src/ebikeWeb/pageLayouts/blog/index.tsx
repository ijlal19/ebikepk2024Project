'use client';
import { Box, Grid, useMediaQuery, Typography, Pagination, Button } from '@mui/material';
import { getAllBlog } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OurVideos from '../home/ourVideos';
import styles from './index.module.scss';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const Blog = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [BlogData, setBlogData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFilterApply, setisFilterApply] = useState(false);

  useEffect(() => {
    getAllBlogList()
  }, [])

  async function getAllBlogList() {
    setIsLoading(true)
    let res = await getAllBlog()
    setBlogData(res)
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
  useEffect(() => {
    console.log("datar", "hello world", filteredResults)
    setisFilterApply(true)
  }, [filteredResults])
  const handleSearch = () => {
    const results = BlogData.filter((item: any) =>
      item.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
    console.log("datar", results);
  };
  const SearchTerm = (e: any) => {
    setSearchTerm(e.target.value)
  }
  return (
    <>
      {
        !isLoading ?
          <Box className={styles.blog_main}>
            <Box className={styles.FrontAdd_box}>
              <Box className={styles.trending}><b style={{ color: 'black', fontFamily: "sans-serif" }}>Trending Videos</b></Box>
              <Box className={styles.input_main}>
                <input type="text" placeholder='Search...' onChange={SearchTerm} className={styles.input}/>
                <button  onClick={handleSearch} className={styles.button}>
                  Search
                </button>
              </Box>
            </Box>
            <OurVideos SetMaxWidth='inblogs' SetWidth='inblogs' />
            <Typography className={styles.blog_heading}>
              Blogs & Articles
            </Typography>
            <Grid container className={styles.blog_grid}>
              <Grid item xs={isMobile ? 12 : 9} sx={{ paddingRight: '15px' }}>
                {
                  !isFilterApply ?
                    <Grid container>
                      {currentBlogs.length > 0 && currentBlogs.map((e: any, i: any) => (
                        <Grid className={styles.blog_grid1} item xs={12} key={i}>
                          <Grid container>
                            <Grid item xs={isMobile ? 12 : 4.5} className={styles.grid1_child1} onClick={() => handleRoute(e)}>
                              <img src={e.featuredImage} alt="" className={styles.blog_images} />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 7.5} className={styles.grid1_child2}>
                              <Box>
                                <Typography className={styles.blog_card_title} onClick={() => handleRoute(e)}>{e.blogTitle}</Typography>
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
                          <Grid container>
                            <Grid item xs={isMobile ? 12 : 4.5} className={styles.grid1_child1} onClick={() => handleRoute(e)}>
                              <img src={e.featuredImage} alt="" className={styles.blog_images} />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 7.5} className={styles.grid1_child2}>
                              <Box>
                                <Typography className={styles.blog_card_title} onClick={() => handleRoute(e)}>{e.blogTitle}</Typography>
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
              <Grid className={styles.blog_grid2} item xs={isMobile ? 12 : 3}>
                <Box className={styles.add_area_content}>
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