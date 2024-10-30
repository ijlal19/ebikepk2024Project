'use client';
import { Box, Container, Grid, useMediaQuery, Typography, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import BlogData from './Data';
import { useRouter } from 'next/navigation'
import OurVideos from '../home/ourVideos';

const Blog = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter()
  const blogsPerPage = 10;
  const totalPages = Math.ceil(BlogData.length / blogsPerPage);
  const currentBlogs = BlogData.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const handleRoute = ({title,id}: any) => {
    const formattedTitle = title.replace(/\s+/g, '-');
  router.push(`/blog/${id}${formattedTitle}/`);
  };

  const App = () => {
    const texts = [BlogData[0].blogTitle, BlogData[1].blogTitle, BlogData[2].blogTitle,BlogData[3].blogTitle];
    const [currentText, setCurrentText] = useState(texts[0]);
    let currentIndex = 0;
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        setCurrentText(texts[currentIndex]);
      }, 3000);
  
      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);
  
    return `${currentText}`;
  };

  return (<>
    <Box className={styles.blog_main}>
      <Box className={styles.FrontAdd_box}>
        <Box className={styles.trending}><b style={{color:'black'}}>Trending</b>{App()}</Box>
        <Box></Box>
      </Box>
      <OurVideos SetMaxWidth='inblogs' SetWidth='inblogs'/>
      <Typography className={styles.blog_heading}>
        Blogs & Articles
      </Typography>
        <Grid container className={styles.blog_grid}>
          <Grid item xs={isMobile ? 12 : 9} sx={{paddingRight:'15px'}}>
            <Grid container>
              {currentBlogs.map((e: any, i: any) => (
                <Grid className={styles.blog_grid1} item xs={12} key={i}>
                  <Grid container>
                    <Grid item xs={isMobile ? 12 : 4.5} className={styles.grid1_child1} onClick={()=>handleRoute({title:e.blogTitle,id:e.id})}>
                      <img src={e.featuredImage} alt="" className={styles.blog_images} />
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 7.5} className={styles.grid1_child2}>
                      <Box>
                        <Typography className={styles.blog_card_title}  onClick={()=>handleRoute({title:e.blogTitle,id:e.id})}>{e.blogTitle}</Typography>
                        <Typography className={styles.blog_card_date}>
                         <span style={{marginRight:8}}>{e.authorname}</span> | <span style={{marginRight:8,marginLeft:8}}>{e.createdAt.slice(0, 10)}</span> | <span style={{color:'#1976d2',marginLeft:8}}>{e.id}</span>
                        </Typography>
                        <Typography className={styles.blog_card_description}>{e.meta_description.slice(0,119)}...</Typography>
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
             <Box className={styles.add_area_content}>
               <Typography>Add Area</Typography>
             </Box>
           </Grid>
         </Grid>
     </Box>
  </>
   );
 };

export default Blog;

