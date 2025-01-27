'use client';
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from './index.module.scss';
import Loader from "@/ebikeForum/sharedComponentsForum/loader/loader";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import  data  from "../home/data";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/sharedComponentsForum/motrocycle_forums";

const Forum_details = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [reply, setReply] = useState('')
    const params = useParams();
    const { slug2 } = params;
    const singledata = data.find(item => item.id === Number(slug2));
    const userdata = singledata?.comment.find(items => items.id === Number(slug2));
    console.log('klkl',userdata)
    const PostReply = () => {
        if (reply) {
            alert(reply)
            setReply('')
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
                        {/* Data Grid */}
                        <Grid item xs={isMobile ? 12 : 8.5} className={styles.details_box}>
                            <Box className={styles.user_detail_box}>
                                <Typography className={styles.title}>{userdata?.title}</Typography>
                                <Box className={styles.analys_box}>
                                    <Button disableRipple className={styles.analys_btn}><RemoveRedEyeOutlinedIcon className={styles.analys_icon} /> {userdata?.views} views</Button>
                                    <Button disableRipple className={styles.analys_btn}><CommentOutlinedIcon className={styles.analys_icon} /> {userdata?.reply?.length} replies</Button>
                                    <Button disableRipple className={styles.analys_btn}><PersonOutlineOutlinedIcon className={styles.analys_icon} /> {userdata?.participants} participants</Button>
                                </Box>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.username?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.username}</Typography>
                                            <Typography className={styles.post_join}>{userdata?.totalpost} post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {userdata?.joindate}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography className={styles.days_ago}>#1<span style={{ marginLeft: 4, marginRight: 4 }}>·</span>2d ago</Typography>
                                </Box>
                                <Box className={styles.desc_box}>
                                    <Typography className={styles.shortdesc}>{userdata?.shortDescription}</Typography>
                                </Box>
                            </Box>
                            {/* <Box className={styles.image_box}>
                                <img src={userdata?.userimage} alt={singledata?.title} className={styles.bike_image} />
                            </Box> */}
                            <Box className={styles.sort_by}>
                                Sort By <span>Oldest first</span>
                            </Box>
                            {
                                userdata?.reply.map((e: any, i: any) => {
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
                                <textarea name="" id="" className={styles.textarea} onChange={(e) => setReply(e.target.value)} placeholder="Write your reply..."></textarea>
                            </Box>
                            <Button className={styles.postcmnt_btn} onClick={PostReply}>Post Reply</Button>
                        </Grid>
                        {/* ADD Grid */}
                        <Grid item xs={isMobile ? 12 : 3.5} className={styles.side_grid} sx={{display:isMobile ? 'none':''}}>
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
