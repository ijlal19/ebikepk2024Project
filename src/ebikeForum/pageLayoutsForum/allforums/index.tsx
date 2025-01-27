'use client';
import React, { useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
// import data from './data';
import Loader from '@/ebikeForum/sharedComponentsForum/loader/loader';
import CommentIcon from '@mui/icons-material/Comment';
import { useParams, useRouter } from 'next/navigation';
import {Motorforums, Topforums} from '../../sharedComponentsForum/motrocycle_forums/index'
import data from '../home/data';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Allforums() {
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const {slug,slug2} = useParams()
    console.log('jj',slug2,slug)
    const userdata = data.find(item => item.id === Number(slug2));
    console.log('jj',userdata?.comment)
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
        router.push(`/threads/${lowerTitle}/${forumsinfo.id}`);
      };
    return (
        <Box>
                    <Box className={styles.heading_box}>
                        <Box className={styles.heading_inner_box}>
                            <Typography className={styles.banner_heading}>
                        {userdata?.title}
                            </Typography>
                            <Button className={styles.pencil_btn}>
                                <CreateIcon className={styles.pencil_icon}/> Creat thread
                            </Button>
                        </Box>
                    </Box>
        <Box sx={{ backgroundColor: '#f2f2f4' }}>
            {!isLoading ? (
                <Box className={styles.home_main}>
                    <Grid container className={styles.home_grid_main}>
                        <Grid item xs={isMobile ? 12 : 8.5} className={styles.card_grid_main}>
                            {userdata?.comment?.map((e: any, i: any) => {
                                const randomColor = getRandomColor();
                                return (
                                    <Grid container className={styles.forums_box}>
                                        <Grid item xs={isMobile ? 1.5 : 1} className={styles.logo_grid}>
                                            <Box className={styles.logo}
                                            sx={{ backgroundColor: randomColor }}>
                                                <CommentIcon className={styles.comment_icon} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={isMobile ? 10.5 : 11} className={styles.card_main}>
                                            <Grid container>
                                                <Grid item xs={isMobile ? 12 : 8} className={styles.card_details}>
                                                    <Typography className={styles.card_title} onClick={() => handleRoute(e)}>{e?.title}</Typography>
                                                    <Typography className={styles.card_desc}>{e?.username}<span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span>{e?.postdate}</Typography>
                                                </Grid>

                                                <Grid item xs={isMobile ? 12 : 4} className={styles.card_analys}>
                                                    <Typography className={styles.view_box}>
                                                        <span className={styles.view_box_inner}><CommentIcon className={styles.analys_icon} /> {e?.reply?.length}K</span>
                                                        <span className={styles.view_box_inner}><VisibilityOutlinedIcon className={styles.analys_icon} /> {e?.views}M</span></Typography>
                                                    <Typography className={styles.timeago}>3h ago</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3.5} className={styles.inform_cards_grid}>
                            <Motorforums/>
                           <Topforums/>
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
        </Box>
    );
}

export default Allforums;
