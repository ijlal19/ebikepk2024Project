'use client';
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from './index.module.scss';
import Loader from "@/ebikeForum/forumSharedComponent/loader/loader";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import data from "../home/data";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/forumSharedComponent/motrocycle_forums";

const Forum_details = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [reply, setReply] = useState('')
    const params = useParams();
    const { slug2 } = params;
    const singledata = data.find(item => item.id === Number(slug2));
    const userdata = singledata?.sub_category.find(items => items.id === Number(slug2));
    console.log('klkl', userdata)

    const PostReply = () => {
        if (reply) {
            // alert(reply)
            const obj = {
                "id": 12,
                "title": 'Zahoor',
                "views": '32',
                "participants": '24',
                "username": 'Zahid',
                "totalpost": '110',
                "joindate": '2016',
                "postdate": '27-feb-2025',
                "shortDescription": reply
            }
            setReply('')
            data[0].sub_category[0].threads.push(obj)
        }
        else {
            alert('please write your reply')
        }
    }

    return (
        <Box className={styles.main}>
            {
                !isLoading ?
                    <Grid container className={styles.forums_details_main} sx={{ display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <Grid item xs={isMobile ? 12 : 8.5} className={styles.details_box}>
                            <Box className={styles.user_detail_box}>
                                <Typography className={styles.title}>{userdata?.name}</Typography>
                                {/* <Box className={styles.analys_box}>
                                    <Button disableRipple className={styles.analys_btn}><RemoveRedEyeOutlinedIcon className={styles.analys_icon} /> {userdata?.views} views</Button>
                                    <Button disableRipple className={styles.analys_btn}><CommentOutlinedIcon className={styles.analys_icon} /> {userdata?.treads?.length} replies</Button>
                                    <Button disableRipple className={styles.analys_btn}><PersonOutlineOutlinedIcon className={styles.analys_icon} /> {userdata?.participants} participants</Button>
                                </Box> */}
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.user_name?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.user_name}</Typography>
                                            <Typography className={styles.post_join}>{userdata?.totalpost} post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {userdata?.joindate}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className={styles.days_ago}>#1<span style={{ marginLeft: 4, marginRight: 4 }}>·</span>2d ago</Typography>
                                </Box>
                                <Box className={styles.desc_box}>
                                    <Typography className={styles.shortdesc}>{userdata?.description}</Typography>
                                </Box>
                            </Box>
                            {
                                userdata?.threads.map((e: any, i: any) => {
                                    return (
                                        <>
                                            <Box className={styles.reply_box}>
                                                <Box className={styles.logo_grid}>
                                                    <Box
                                                        className={styles.logo}>
                                                        {e?.username?.slice(0, 1)}
                                                    </Box>
                                                    <Box className={styles.user_details_box}>
                                                        <Box>
                                                            <Typography className={styles.username}>{e?.username}</Typography>
                                                            <Typography className={styles.post_join}>{e?.totalpost} post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {e?.joindate}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography className={styles.days_ago}>#{i}<span style={{ marginLeft: 4, marginRight: 4 }}>·</span>2d ago</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography className={styles.reply}>{e?.shortDescription.slice(0, 180)}...</Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    )
                                })
                            }
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
    );
};

export default Forum_details;