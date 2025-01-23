'use client';
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from './indeex.module.scss';
import Loader from "@/ebikeForum/sharedComponentsForum/loader/loader";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { data } from "../home/data";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const Forum_details = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const { slug2 } = params;
    const singledata = data.find(item => item.id === Number(slug2));

    return (
        <Box className={styles.main}>
            {
                !isLoading ?
                    <Grid container className={styles.forums_details_main} sx={{display:'flex',justifyContent:'space-between',boxSizing:'border-box'}}>
                        <Grid item xs={isMobile ? 12 : 8} className={styles.details_box}>
                            <Typography className={styles.title}>{singledata?.title}</Typography>
                            <Box className={styles.analys_box}>
                                <Button className={styles.analys_btn}><RemoveRedEyeOutlinedIcon className={styles.analys_icon} /> {singledata?.userdata.totalviews} views</Button>
                                <Button className={styles.analys_btn}><CommentOutlinedIcon className={styles.analys_icon} /> {singledata?.userdata.totalreplies} replies</Button>
                                <Button className={styles.analys_btn}><PersonOutlineOutlinedIcon className={styles.analys_icon} /> {singledata?.userdata.participants} participants</Button>
                            </Box>
                            <Box className={styles.logo_grid}>
                                <Box
                                    className={styles.logo}>
                                    {singledata?.uname?.slice(0, 1)}
                                </Box>
                                <Box className={styles.user_details_box}>
                                    <Box>
                                        <Typography className={styles.username}>{singledata?.uname}</Typography>
                                        <Typography className={styles.post_join}>{singledata?.userdata.totalpost} post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {singledata?.userdata.joindate}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3.5} className={styles.side_grid}>
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
                                {/* <Button className={styles.join_btn} disableRipple>
                                    <PermIdentityOutlinedIcon sx={{ fontSize: '18px' }} />
                                    Join Community
                                </Button>
                                <Button className={styles.grow_bussines_btn} disableRipple>
                                    <StoreOutlinedIcon sx={{ fontSize: '18px', color: '#191500' }} />
                                    Grow Your Bussiness
                                </Button> */}
                            </Box>
                        </Grid>
                    </Grid> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    );
};

export default Forum_details;
