'use client'
import { Box, Container, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { BlogData } from './Data'
import { getAllBlog } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import { NewCard } from '@/ebikeWeb/sharedComponents/new_item_card';
import { filterVisibleBlogs } from '@/ebikeWeb/utils/blogVisibility';

function BlogSection(props: any) {
  const [AllBlogs, setAllBlogs] = useState<any>([])
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    fetchAllBlog()
  }, [])

  const fetchAllBlog = async () => {
    setIsLoading(true)
    const res = filterVisibleBlogs(await getAllBlog())
    if (res && res?.length > 0) {
      const first20 = res.slice(0, 20);

      const shuffleArray = <T,>(array: T[]): T[] => {
        return array
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      };
      // setAllBlogs(shuffleArray(first20));
      setAllBlogs(res);
    }
    else {
      setAllBlogs(BlogData)
    }
    setIsLoading(false)
  }

  return (
    <Box className={styles.main_blog}>
      <Box className={styles.blog_section_main}>
        <Container>
          <h2 className={styles.heading}>Latest Bikes News</h2>

          <Box sx={{ width: '100%' }}>
                {
                  !isLoading ? 
              <div  className={styles.panel1}>
                  {AllBlogs?.length > 0 &&
                  (isMobile ? AllBlogs.slice(0, 2):AllBlogs.slice(0, 3)).map((e: any, i: any) => {
                      return (
                        <NewCard props={e} key={i}/>
                      )
                    }
                    )}
                    </div>
                    :
                    <p className={styles.loading}>
                      Loading...
                    </p>
                }
          </Box>
        </Container>
      </Box>
       {/* <div className={styles.load_div}>
                  <Loader isLoading={isLoading} />
                </div> */}
    </Box>
  );
}

export default BlogSection;


   // <Grid container key={i} className={styles.blog_grid1}>
                  //   <Grid item xs={isMobile ? 12 : 3} className={styles.grid1_child1}>
                  //     <img src={e?.featuredImage?.split(' #$# ')[0]?.trim()} alt={e.blogTitle.slice(0, 15)} className={styles.blog_images} />
                  //   </Grid>
                  
                  //   <Grid item xs={isMobile ? 12 : 8} className={styles.grid1_child2}>
                  //     <Box>
                  //       <Typography className={styles.blog_card_title}>
                  //         <Link href={getBlogUrl(e)} className={styles.link_tag}>{e.blogTitle}</Link>
                  //       </Typography>
                  //       <Typography className={styles.blog_card_date}>
                  //         <span style={{ marginRight: 8 }}>{e.authorname}</span> |{' '}
                  //         <span style={{ marginRight: 8, marginLeft: 8 }}>{e.createdAt.slice(0, 10)}</span> |{' '}
                  //         <span style={{ color: '#1976d2', marginLeft: 8 }}>{e.id}</span>
                  //       </Typography>
                  //       <Typography className={styles.blog_card_description}>{e.meta_description}</Typography>
                  //     </Box>
                  //   </Grid>
                  // </Grid>
