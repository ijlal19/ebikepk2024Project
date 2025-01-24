'use client';
import React, { useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
import { data, Topforums } from './data.jsx';
import Loader from '@/ebikeForum/sharedComponentsForum/loader/loader';
import CommentIcon from '@mui/icons-material/Comment';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const router = useRouter()
    const randomColors = [
        "hotpink",
        "lightblue",
        "limegreen",
        "coral",
        "gold",
        "plum",
        "orange",
        "turquoise",
        "teal",
        "violet",
    ];

    const getRandomColor = () => {
        return randomColors[Math.floor(Math.random() * randomColors.length)];
    };

    const handleRoute = (forumsinfo: any) => {
        var title = forumsinfo.title;
        title = title.replace(/\s+/g, '-');
        var lowerTitle = title.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        router.push(`/forums/${lowerTitle}/${forumsinfo.id}`);
      };
    return (
        <Box sx={{ backgroundColor: '#f2f2f4' }}>
            {!isLoading ? (
                <Box className={styles.home_main}>
                    <Grid container className={styles.home_grid_main}>
                        <Grid item xs={isMobile ? 12 : 8.5} className={styles.card_grid_main}>
                            {data?.map((e: any, i: any) => {
                                const randomColor = getRandomColor();
                                return (
                                    <Grid container className={styles.forum_card_main} key={i}>
                                        <Grid item xs={isMobile ? 1 : 1} className={styles.logo_grid}>
                                            <Box
                                                className={styles.logo}
                                                sx={{ backgroundColor: randomColor }}
                                                onClick={() => handleRoute(e)}
                                            >
                                                {e?.uname?.slice(0, 1)}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={isMobile ? 12 : 11} className={styles.data_grid}>
                                            <Typography className={styles.notice}>{e?.notic}</Typography>
                                            <Typography className={styles.title} onClick={() => handleRoute(e)}>{e?.title}</Typography>
                                            <Typography className={styles.forum_detail}>
                                                {e?.uname} <span style={{ marginLeft: 4, marginRight: 4 }}>·</span>
                                                {e?.postdayago}d ago <span style={{ marginLeft: 4, marginRight: 4 }}>·</span>
                                                {e?.uname} replied {e?.posttimeago}h ago
                                                <Button className={styles.cmnt_btn} disableRipple>
                                                    <CommentIcon sx={{ fontSize: '12px' }} />
                                                    {e?.comments?.length ? e?.comments.length : '0'}
                                                </Button>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3.5} className={styles.inform_cards_grid}>
                            <Box className={styles.motorcycle_forum}>
                                <Typography className={styles.heading}>Motorcycle Forum</Typography>
                                <Typography className={styles.forum_analys}>
                                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#191500' }}>
                                        975k
                                    </span>{' '}
                                    posts{' '}
                                    <span
                                        style={{
                                            marginLeft: 4,
                                            marginRight: 4,
                                            fontWeight: 'bolder',
                                            fontSize: '14px',
                                        }}
                                    >
                                        ·
                                    </span>
                                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#191500' }}>
                                        133k
                                    </span>{' '}
                                    members{' '}
                                    <span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span> Since
                                    2004
                                </Typography>
                                <Typography className={styles.instruction}>
                                    A forum communit discussing all bikes from harley Davison to Honda, Suzuki, KTM,
                                    Yamaha, and BMW. Come join the discussion abdout performance modifications,
                                    troubleshooting, maintenance and more!
                                </Typography>
                                <Button className={styles.join_btn} disableRipple>
                                    <PermIdentityOutlinedIcon sx={{ fontSize: '18px' }} />
                                    Join Community
                                </Button>
                                <Button className={styles.grow_bussines_btn} disableRipple>
                                    <StoreOutlinedIcon sx={{ fontSize: '18px', color: '#191500' }} />
                                    Grow Your Bussiness
                                </Button>
                            </Box>
                            <Box className={styles.motorcycle_forum}>
                                <Typography className={styles.heading}>Our Top Forums</Typography>
                                <Box className={styles.top_forums_card} >
                                {
                                    Topforums?.map((e: any, i: any) => {
                                        return (<>
                                                <Typography key={i} className={styles.top_forums_title}>{e?.title}</Typography>
                                                <Typography className={styles.top_forums_analys}>
                                                    <Typography className={styles.comments_}>
                                                        <CommentIcon  sx={{fontSize:'14px',color:'#191500',display:'inline-block',alignItems:'center'}}/> {e?.comment}
                                                    </Typography>
                                                    <Typography className={styles.view_box}>
                                                        <VisibilityIcon sx={{fontSize:'14px',color:'#191500',display:'inline-block',alignItems:'center'}}/> {e?.views}
                                                    </Typography>
                                                </Typography>
                                        </>
                                        )
                                    })
                                }
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
                </div>
            )}
        </Box>
    );
}

export default Home;
