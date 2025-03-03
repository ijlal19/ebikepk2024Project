'use client';
import { useEffect, useState } from "react";
import { getthreadbyId, isLoginUser, postthreadComment } from "@/ebikeForum/forumFunction/globalFuntions";
import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/forumSharedComponent/motrocycle_forums";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Loader from "@/ebikeForum/forumSharedComponent/loader/loader";
import { useParams } from "next/navigation";
import styles from './index.module.scss';
import data from "../home/data";

const Forum_details = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [FilterThread, setFilterThread] = useState<any>();
    const [IsLogin, setIsLogin] = useState<any>('not_login')
    const [reply, setReply] = useState('')

    const params = useParams();
    const { slug2 } = params;
    const Idnumber = Number(slug2)

    useEffect(() => {
        fetchthreadbyId()
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            console.log(`login data${_isLoginUser}`)
            setIsLogin("not_login")
        }
    }, [])

    const fetchthreadbyId = async () => {
        setIsLoading(true)
        const getthread = await getthreadbyId(slug2)
        setFilterThread(getthread?.data)
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }

    const PostReply =async () => {

        if (!IsLogin || IsLogin == "not_login" || IsLogin?.id == undefined) {
            alert('You must be logged in to post a Comment.')
            return
        }
        else if (!reply) {
            alert('please write your reply')
        }
        else {
            const obj = {
                title: 'Try Best Way',
                description: reply,
                image:"",
                video_url:"",
                user_name: IsLogin?.userFullName,
                user_id:IsLogin?.id,
                isVerified:IsLogin?.isVerified,
                thread_id: Idnumber
            }
            const postcomment = await postthreadComment(obj)
            if(postcomment){
                window.location.reload()
            }
            else{
                console.log("data error")
            }
        }
    }

    return (
        <Box className={styles.main}>
            {
                !isLoading ?
                    <Grid container className={styles.forums_details_main} sx={{ display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <Grid item xs={isMobile ? 12 : 8.5} className={styles.details_box}>
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
                                            <Typography className={styles.post_join}>1 post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {FilterThread?.createdAt.slice(0, 10)}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className={styles.days_ago}>#1<span style={{ marginLeft: 4, marginRight: 4 }}>·</span>2d ago</Typography>
                                </Box>
                                <Box className={styles.desc_box}>
                                    <Typography className={styles.shortdesc}>{FilterThread?.description}</Typography>
                                </Box>
                            </Box>
                            {/* Thread Comment Start */}
                            {
                                FilterThread?.Comments?.map((e: any, i: any) => {
                                    return (
                                        <>
                                            <Box className={styles.reply_box}>
                                                <Box className={styles.logo_grid}>
                                                    <Box
                                                        className={styles.logo}>
                                                        {e?.user_name?.slice(0, 1)}
                                                    </Box>
                                                    <Box className={styles.user_details_box}>
                                                        <Box>
                                                            <Typography className={styles.username}>{e?.user_name}</Typography>
                                                            <Typography className={styles.post_join}>{e?.totalpost} post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {e?.joindate}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography className={styles.days_ago}>#{i}<span style={{ marginLeft: 4, marginRight: 4 }}>·</span>2d ago</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography className={styles.reply}>{e?.description.slice(0, 180)}...</Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    )
                                })
                            }
                            {/* Thread Comment End */}
                            <Box className={styles.comment_box}>
                                <textarea name="" id="" value={reply} className={styles.textarea} onChange={(e) => setReply(e.target.value)} placeholder="Write your reply..."></textarea>
                            </Box>
                            <Button className={styles.postcmnt_btn} onClick={PostReply}>Post Reply</Button>
                        </Grid>
                        {/* ADD Grid */}
                        <Grid item xs={isMobile ? 12 : 3.5} className={styles.side_grid} sx={{ display: isMobile ? 'none' : '' }}>
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