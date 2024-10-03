'use client'
import { Box, Container, Grid, useMediaQuery, Typography } from '@mui/material';
import styles from './index.module.scss';
import Data from './Data';

const Blog = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box className={styles.blog_main}>
        <Typography className={styles.blog_heading}>
          Blogs & Articals
        </Typography>
      <Container className={styles.blog_container}>
        <Grid container className={styles.blog_grid}>

          <Grid item xs={isMobile ? 12 : 7}>
            <Grid container >
              {
                Data.map((e: any, i: any) => (
                  <Grid
                    className={styles.blog_grid1}
                    item
                    xs={isMobile ? 12 : 12}
                    key={i}
                  >
                    <Grid container>
                      {/* Image Area */}
                      <Grid
                        item
                        xs={isMobile ? 12 : 4}
                        className={styles.grid1_child1}
                      >
                        <img src={e.featuredImage} alt="" className={styles.blog_images} />
                      </Grid>

                      {/* Details Area */}
                      <Grid
                        item
                        xs={isMobile ? 12 : 8}
                        className={styles.grid1_child2}
                      >
                        <Box>
                        <Typography className={styles.blog_card_title}>{e.blogTitle}</Typography>
                        <Typography className={styles.blog_card_date}>
                          {e.authorname} | {e.createdAt.slice(0,10)} | comment
                        </Typography>
                        <Typography className={styles.blog_card_description}>{e.meta_description}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>

          <Grid
            className={styles.blog_grid2}
            item
            xs={isMobile ? 12 : 4}
          >
            <Box className={styles.add_area_content}>
              <Typography>Add Area</Typography>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default Blog;
