'use client';
import { Box, Container, Grid, useMediaQuery, Typography, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation'
import OurVideos from '../home/ourVideos';
import { getAllBlog } from '@/ebikeWeb/functions/globalFuntions'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
// import Adsense from '@/ebikeWeb/sharedComponents/googleAdsense/adsense'

const Blog = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [BlogData, setBlogData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getAllBlogList()
  }, [])

  async function getAllBlogList() {
    setIsLoading(true)
    let res = await getAllBlog()
    setBlogData(res)
    setIsLoading(false)
   setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000);
  }

  const blogsPerPage = 10;
  const totalPages = Math.ceil(BlogData.length / blogsPerPage);
  const currentBlogs = BlogData.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

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

  return (
    <>
      {
        !isLoading ?
          <Box className={styles.blog_main}>
            <Box className={styles.FrontAdd_box}>
              <Box className={styles.trending}><b style={{ color: 'black' }}>Trending Videos</b></Box>
              <Box></Box>
            </Box>
            <OurVideos SetMaxWidth='inblogs' SetWidth='inblogs' />
            <Typography className={styles.blog_heading}>
              Blogs & Articles
            </Typography>
            <Grid container className={styles.blog_grid}>
              <Grid item xs={isMobile ? 12 : 9} sx={{ paddingRight: '15px' }}>
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
                </Grid>

                <Box className={styles.pagination}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color='primary'
                  />
                </Box>
              </Grid>
              <Grid className={styles.blog_grid2} item xs={isMobile ? 12 : 3}>
                {/* <Adsense style={{ display:"block" }} client="ca-pub-5167970563180610" slot="4524790990" /> */}
                <Box className={styles.add_area_content}>
                </Box>
              </Grid>
            </Grid>
          </Box>
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

