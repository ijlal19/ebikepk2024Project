'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
import data from './data.jsx';
import Loader from '@/ebikeForum/sharedComponentsForum/loader/loader';
import CommentIcon from '@mui/icons-material/Comment';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';


function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <Box sx={{backgroundColor:'#f2f2f4'}}>
            {
                !isLoading ?
                    <Box className={styles.home_main}>
                        <Grid container className={styles.home_grid_main}>
                            <Grid item xs={isMobile ? 12 : 9} className={styles.card_grid_main}>
                                {
                                    data?.map((e: any, i:any) => {
                                        return (
                                            <Grid container className={styles.forum_card_main} key={i}>
                                                <Grid item xs={isMobile ? 2:1} className={styles.image_grid}>
                                                    <img src={e?.userimage} alt='' className={styles.user_image}/>
                                                </Grid>
                                                <Grid item xs={isMobile ? 10 : 11} className={styles.data_grid}>
                                                    <Typography className={styles.notice}>{e?.notic}</Typography>
                                                    <Typography className={styles.title}>{e?.title}</Typography>
                                                    <Typography className={styles.forum_detail}>{e?.uname} <span style={{marginLeft:5,marginRight:5}}>-</span> 
                                                    {e?.postdayago}d ago <span style={{marginLeft:5,marginRight:5}}>-</span> {e?.uname} replied {e?.posttimeago}h ago
                                                    <Button className={styles.cmnt_btn} disableRipple><CommentIcon sx={{fontSize:'15px'}}/>{e?.comments?.length ? e?.comments.length:'0'}</Button>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3} className={styles.inform_cards_grid}>
                                <Box className={styles.motorcycle_forum}>
                                    <Typography className={styles.heading}>Motorcycle Forum</Typography>
                                    <Typography className={styles.forum_analys}><span style={{fontWeight:'bold',fontSize:'12px'}}>975k</span> posts <span style={{marginLeft:5,marginRight:5,fontWeight:'bold'}}>-</span><span style={{fontWeight:'bold',fontSize:'12px'}}>133k</span> members <span style={{marginLeft:5,marginRight:5,fontWeight:'bold'}}>-</span> Since 2004</Typography>
                                    <Typography className={styles.instruction}>A forum communit discussing all bikes from harley Davison to Honda, Suzuki, KTM, Yamaha, and BMW. Come join the discussion abdout performance modifications, troubleshooting, maintenance and more!</Typography>
                                    <Button className={styles.join_btn} disableRipple><PermIdentityOutlinedIcon sx={{fontSize:'18px'}}/>Join Community</Button>
                                    <Button className={styles.grow_bussines_btn} disableRipple><StoreOutlinedIcon sx={{fontSize:'18px'}}/>Grow Your Bussiness</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    )
}
export default Home