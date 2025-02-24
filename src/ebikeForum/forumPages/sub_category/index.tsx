'use client';
import React, { useEffect, useState } from 'react';
import { Motorforums, Topforums } from '../../forumSharedComponent/motrocycle_forums/index'
import Create_thread_popup from '@/ebikeForum/forumSharedComponent/thread_popup';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { isLoginUser } from '@/ebikeForum/forumFunction/globalFuntions';
import Loader from '@/ebikeForum/forumSharedComponent/loader/loader';
import { useParams, useRouter } from 'next/navigation';
import CommentIcon from '@mui/icons-material/Comment';
import CreateIcon from '@mui/icons-material/Create';
import styles from './index.module.scss';
import data from '@/ebikeForum/forumPages/home/data';

function Allforums() {

    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [IsLogin, setIsLogin] = useState<any>('not_login')
    const [open, setOpen] = useState(false);
    const { slug2 } = useParams()
    const router = useRouter()

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            setIsLogin("not_login")
        }
    }, [])

    const userdata = data.find(item => item.id === Number(slug2));
    console.log(userdata)

    const handleOpen = () => {
        if (!IsLogin || IsLogin == "not_login" || IsLogin?.id == undefined) {
            alert('You must be logged in to post a thread.')
            return
        }
        else {
            setOpen(true);
        }
    }

    const handleRoute = (forumsinfo: any) => {
        var name = forumsinfo.name;
        name = name.replace(/\s+/g, '-');
        var lowerTitle = name.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        router.push(`/threads/${lowerTitle}/${forumsinfo.id}`);
    };

    return (
        <Box>
            <Box className={styles.heading_box}>
                <Box className={styles.heading_inner_box}>
                    <Typography className={styles.banner_heading}>
                        {userdata?.name}
                    </Typography>
                    <Button disableRipple className={styles.pencil_btn} onClick={handleOpen}>
                        <CreateIcon className={styles.pencil_icon} /> Creat thread
                    </Button>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#f2f2f4' }}>
                {!isLoading ? (
                    <Box className={styles.home_main}>
                        <Grid container className={styles.home_grid_main}>
                            <Grid item xs={isMobile ? 12 : 8.5} className={styles.card_grid_main}>
                                {userdata?.sub_category?.map((e: any, i: any) => {
                                    return (
                                        <Grid container className={styles.forums_box} key={i}>
                                            <Grid item xs={isMobile ? 1.5 : 1} className={styles.logo_grid}>
                                                <Box className={styles.logo}>
                                                    <CommentIcon className={styles.comment_icon} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={isMobile ? 10.5 : 11} className={styles.card_main}>
                                                <Grid container>
                                                    <Grid item xs={isMobile ? 12 : 8} className={styles.card_details}>
                                                        <Typography className={styles.card_title} onClick={() => handleRoute(e)}>{e?.name}</Typography>
                                                        <Typography className={styles.card_desc}>{e?.user_name}<span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span>{e?.postdate}</Typography>
                                                    </Grid>

                                                    <Grid item xs={isMobile ? 12 : 4} className={styles.card_analys}>
                                                        <Typography className={styles.view_box}>
                                                            <span className={styles.view_box_inner}><VisibilityOutlinedIcon className={styles.analys_icon} /> {e?.views}K</span></Typography>
                                                        <Typography className={styles.timeago}>3h ago</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3.5} className={styles.inform_cards_grid}>
                                <Motorforums />
                                <Topforums />
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
            <Create_thread_popup open={open} setOpen={setOpen} />
        </Box>
    );
}

export default Allforums;