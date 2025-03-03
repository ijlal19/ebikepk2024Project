'use client';
import React, { useEffect, useState } from 'react';
import { getAllthread, getMainCategory, getSubCategory, getSubCatgeorybyId, isLoginUser, ViewCountAdd } from '@/ebikeForum/forumFunction/globalFuntions';
import { Motorforums, Topforums } from '../../forumSharedComponent/motrocycle_forums/index'
import Create_thread_popup from '@/ebikeForum/forumSharedComponent/thread_popup';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Loader from '@/ebikeForum/forumSharedComponent/loader/loader';
import { useParams, useRouter } from 'next/navigation';
import CommentIcon from '@mui/icons-material/Comment';
import CreateIcon from '@mui/icons-material/Create';
import styles from './index.module.scss';

function Allforums() {

    const [SubCategorybyId, setSubCategbyId] = useState<any>([])
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { slug2 } = useParams()
    const IDnumber = Number(slug2)
    const router = useRouter()

    useEffect(() => {
        fetchSubCategory()
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            setIsLogin("not_login")
        }
    }, [])

    const fetchSubCategory = async () => {
        setIsLoading(true)
        try {
            const sub_categry_byID = await getSubCatgeorybyId(IDnumber);
            setSubCategbyId(sub_categry_byID?.data)
            console.log("data",sub_categry_byID?.data)
        }
        catch (error) {
            console.error("Error", error);
        }

        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);

    }

    const handleOpen = () => {
        if (!IsLogin || IsLogin == "not_login" || IsLogin?.id == undefined) {
            alert('You must be logged in to post a thread.')
            return
        }
        else {
            setOpen(true);
        }
    }

    const handleRoute =async (forumsinfo: any) => {

        const threadcount =
            {
                thread_id:forumsinfo.id,
                count: forumsinfo?.ViewCount?.length > 0 ? forumsinfo?.ViewCount[0].count + 1 : 1
        }

        const ThreadViewCount = await ViewCountAdd(threadcount)
            console.log("data", ThreadViewCount)

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
                        {SubCategorybyId?.name}

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
                                {SubCategorybyId?.threads?.map((e: any, i: any) => {
                                    return (
                                        <Grid container className={styles.forums_box} key={i} onClick={() => handleRoute(e)}>
                                            <Grid item xs={isMobile ? 1.5 : 1} className={styles.logo_grid}>
                                                <Box className={styles.logo}>
                                                    <CommentIcon className={styles.comment_icon} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={isMobile ? 10.5 : 11} className={styles.card_main}>
                                                <Grid container>
                                                    <Grid item xs={isMobile ? 12 : 8} className={styles.card_details}>
                                                        <Typography className={styles.card_title} >{e?.title}</Typography>
                                                        <Typography className={styles.card_desc}>{e?.user_name}<span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span>{e?.createdAt.slice(0, 10)}</Typography>
                                                    </Grid>

                                                    <Grid item xs={isMobile ? 12 : 4} className={styles.card_analys}>
                                                                    <Typography className={styles.view_box}>
                                                                        <span className={styles.view_box_inner}>
                                                                            {/* <VisibilityOutlinedIcon className={styles.analys_icon} /> {e?.ViewCount[0].count}K */}
                                                                            <VisibilityOutlinedIcon className={styles.analys_icon} /> 100
                                                                        </span>
                                                                    </Typography>
                                                        <Typography className={styles.timeago}>3h ago</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
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
            <Create_thread_popup open={open} setOpen={setOpen} IsLogin={IsLogin} />
        </Box>
    );
}

export default Allforums;