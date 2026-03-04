'use client';
import { useCallback, useEffect, useState } from "react";
import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/forumSharedComponent/motrocycle_forums";
import { getthreadbyId, postthreadComment } from "@/ebikeForum/forumFunction/globalFuntions";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import Loader from "@/ebikeForum/forumSharedComponent/loader/loader";
import { isLoginUser, timeAgo } from '@/genericFunctions/geneFunc';
import { useParams } from "next/navigation";
import styles from './index.module.scss';

const Forum_details = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [FilterThread, setFilterThread] = useState<any>();
    const [IsLogin, setIsLogin] = useState<any>('not_login')
    const [reply, setReply] = useState('')

    const params = useParams();
    const { slug2 } = params;
    const Idnumber = Number(slug2)

    const fetchthreadbyId = useCallback(async () => {
        setIsLoading(true)
        const getthread = await getthreadbyId(slug2)
        setFilterThread(getthread?.data || {})
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }, [slug2]);

    useEffect(() => {
        fetchthreadbyId()
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            setIsLogin("not_login")
        }
    }, [fetchthreadbyId])

    const PostReply = async () => {

        if (!IsLogin || IsLogin == "not_login" || IsLogin?.id == undefined) {
            alert('You must be logged in to post a Comment.')
            return
        }
        else if (!reply) {
            alert('please write your reply')
        }
        else {
            const obj = {
                title: 'Thread Comment',
                description: reply,
                image: "",
                video_url: "",
                user_name: IsLogin?.userFullName,
                user_id: IsLogin?.id,
                isVerified: IsLogin?.isVerified,
                isShow: true,
                thread_id: Idnumber
            }
            const postcomment = await postthreadComment(obj)
            if (postcomment?.success) {
                setReply("");
                fetchthreadbyId();
            }
            else {
                alert(postcomment?.msg || "Unable to post comment")
            }
        }
    }

    return (
        <Box className={styles.main}>
            {
                !isLoading ?
                    <Grid container className={styles.forums_details_main}>
                        <Grid item xs={12} className={styles.details_box}>
                            <Box className={styles.user_detail_box}>
                                <Typography className={styles.title}>{FilterThread?.title}</Typography>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {FilterThread?.user_name?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{FilterThread?.user_name}</Typography>
                                            <Typography className={styles.post_join}>1 post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {FilterThread?.createdAt?.slice(0, 10)}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className={styles.days_ago}>{timeAgo(FilterThread?.createdAt)}</Typography>
                                </Box>
                                <Box className={styles.desc_box}>
                                    <Typography className={styles.shortdesc}>{FilterThread?.description}</Typography>
                                </Box>
                            </Box>
                            {
                                FilterThread?.Comments?.map((e: any, i: any) => {
                                    return (
                                        <Box key={e?.id || i} className={styles.reply_box}>
                                            <Box className={styles.logo_grid}>
                                                <Box
                                                    className={styles.logo}>
                                                    {e?.user_name?.slice(0, 1)}
                                                </Box>
                                                <Box className={styles.user_details_box}>
                                                    <Box>
                                                        <Typography className={styles.username}>{e?.user_name}</Typography>
                                                        <Typography className={styles.post_join}>Joined {e?.createdAt?.slice(0, 10)}</Typography>
                                                    </Box>
                                                </Box>
                                                <Typography className={styles.days_ago}>{timeAgo(e?.createdAt)}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography className={styles.reply}>{e?.description}</Typography>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                            {FilterThread?.Comments?.length === 0 && (
                                <Box className={styles.empty_replies}>
                                    <Typography className={styles.empty_title}>No replies yet</Typography>
                                    <Typography className={styles.empty_desc}>Drop the first reply and get the conversation rolling.</Typography>
                                </Box>
                            )}
                            <Box className={styles.comment_box}>
                                <textarea name="" id="" value={reply} className={styles.textarea} onChange={(e) => setReply(e.target.value)} placeholder="Write your reply..."></textarea>
                            </Box>
                            <Button className={styles.postcmnt_btn} onClick={PostReply}>Post Reply</Button>
                        </Grid>
                        {/* ADD Grid */}
                        <Grid item xs={12} className={styles.side_grid} sx={{ display: isMobile ? 'none' : '' }}>
                            <Motorforums />
                            <Topcontributer />
                            <Communities />
                        </Grid>
                    </Grid> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    )
};

export default Forum_details
