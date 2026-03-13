'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getCurrentForumViews, getSubCatgeorybyId } from '@/ebikeForum/forumFunction/globalFuntions';
import { Motorforums, Topforums } from '../../forumSharedComponent/motrocycle_forums/index'
import Create_thread_popup from '@/ebikeForum/forumSharedComponent/thread_popup';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Loader from '@/ebikeForum/forumSharedComponent/loader/loader';
import { isLoginUser, timeAgo } from '@/genericFunctions/geneFunc';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
    const searchParams = useSearchParams();
    const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
    const sortType = (searchParams.get("sort") || "").trim().toLowerCase();

    const fetchSubCategory = useCallback(async () => {
        setIsLoading(true)
        try {
            const sub_categry_byID = await getSubCatgeorybyId(IDnumber);
            const categoryData = sub_categry_byID?.data || {};
            const allThreads = Array.isArray(categoryData?.threads) ? categoryData.threads : [];
            const searchedThreads = !searchQuery
                ? allThreads
                : allThreads.filter((item: any) => {
                    const title = String(item?.title || "").toLowerCase();
                    const desc = String(item?.description || "").toLowerCase();
                    const user = String(item?.user_name || "").toLowerCase();
                    return title.includes(searchQuery) || desc.includes(searchQuery) || user.includes(searchQuery);
                });

            const sortedThreads = [...searchedThreads].sort((a: any, b: any) => {
                if (sortType === "new") {
                    return new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime();
                }
                if (sortType === "top") {
                    return getCurrentForumViews(b) - getCurrentForumViews(a);
                }
                return 0;
            });

            setSubCategbyId({ ...categoryData, threads: sortedThreads })
        }
        catch (error) {
            console.error("Error", error);
        }

        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);

    }, [IDnumber, searchQuery, sortType]);

    useEffect(() => {
        fetchSubCategory()
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            setIsLogin("not_login")
        }
    }, [fetchSubCategory])

    const handleOpen = () => {
        if (!IsLogin || IsLogin == "not_login" || IsLogin?.id == undefined) {
            alert('You must be logged in to post a thread.')
            return
        }
        else {
            setOpen(true);
        }
    }

    const handleRoute = (Threadinfo: any) => {
        var title = Threadinfo.title;
        title = title.replace(/\s+/g, '-');
        var lowerTitle = title.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        router.push(`/threads/${lowerTitle}/${Threadinfo.id}`);
    };

    return (
        <Box>
            <Box className={styles.heading_box}>
                <Box className={styles.heading_inner_box}>
                    <Typography className={styles.banner_heading}>
                        {SubCategorybyId?.name}

                    </Typography>
                    <Button disableRipple className={styles.pencil_btn} onClick={handleOpen}>
                        <CreateIcon className={styles.pencil_icon} /> Create thread
                    </Button>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#f2f2f4' }}>
                {!isLoading ? (
                    <Box className={styles.home_main}>
                        <Grid container className={styles.home_grid_main}>
                            <Grid item xs={12} className={styles.card_grid_main}>
                                {SubCategorybyId?.threads?.map((e: any, i: any) => {
                                    return (
                                        <Grid container className={styles.forums_box} key={i}>
                                            <Grid item xs={2} md={1} className={styles.logo_grid}>
                                                <Box className={styles.logo}>
                                                    <CommentIcon className={styles.comment_icon} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={10} md={11} className={styles.card_main}>
                                                <Grid container>
                                                    <Grid item xs={12} md={8} className={styles.card_details}>
                                                        <Typography className={styles.card_title} onClick={() => handleRoute(e)}>{e?.title}</Typography>
                                                        <Typography className={styles.card_desc}>{e?.user_name}<span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span>{e?.createdAt?.slice(0, 10)}</Typography>
                                                    </Grid>

                                                    <Grid item xs={12} md={4} className={styles.card_analys}>
                                                                    <Typography className={styles.view_box}>
                                                                        <span className={styles.view_box_inner}>
                                                                            <VisibilityOutlinedIcon className={styles.analys_icon} /> {getCurrentForumViews(e)}
                                                                        </span>
                                                                    </Typography>
                                                        <Typography className={styles.timeago}>{timeAgo(e?.createdAt)}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                                {SubCategorybyId?.threads?.length === 0 && (
                                    <Box className={styles.empty_state}>
                                        <Typography className={styles.empty_title}>No threads found</Typography>
                                        <Typography className={styles.empty_desc}>Be the first member to start a discussion.</Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} className={styles.inform_cards_grid}>
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
            <Create_thread_popup open={open} setOpen={setOpen} IsLogin={IsLogin} onThreadCreated={fetchSubCategory} />
        </Box>
    );
}

export default Allforums;
