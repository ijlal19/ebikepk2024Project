'use client';
import { Box, Container, Grid, useMediaQuery, Typography, Pagination } from '@mui/material';
import { useState } from 'react';
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
  return (<>
      <OurVideos SetMaxWidth='inblogs' SetWidth='inblogs'/>
    <Box className={styles.blog_main}>
      <Typography className={styles.blog_heading}>
        Blogs & Articles
      </Typography>
      <Container className={styles.blog_container}>
        <Grid container className={styles.blog_grid}>
          <Grid item xs={isMobile ? 12 : 8}>
            <Grid container>
              {currentBlogs.map((e: any, i: any) => (
                <Grid className={styles.blog_grid1} item xs={12} key={i}>
                  <Grid container>
                    <Grid item xs={isMobile ? 12 : 4} className={styles.grid1_child1} onClick={()=>handleRoute({title:e.blogTitle,id:e.id})}>
                      <img src={e.featuredImage} alt="" className={styles.blog_images} />
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 8} className={styles.grid1_child2}>
                      <Box>
                        <Typography className={styles.blog_card_title}  onClick={()=>handleRoute({title:e.blogTitle,id:e.id})}>{e.blogTitle}</Typography>
                        <Typography className={styles.blog_card_date}>
                          {e.authorname} | {e.createdAt.slice(0, 10)} | <span style={{color:'#1976d2'}}>{e.id}</span>
                        </Typography>
                        <Typography className={styles.blog_card_description}>{e.meta_description}</Typography>
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
       </Container>
     </Box>
  </>
   );
 };

export default Blog;

