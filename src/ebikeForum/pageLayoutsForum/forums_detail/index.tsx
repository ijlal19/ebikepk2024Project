'use client';
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from './index.module.scss';
import Loader from "@/ebikeForum/sharedComponentsForum/loader/loader";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { data } from "../home/data";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const Forum_details = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [reply,setReply]=useState('')
    const params = useParams();
    const { slug2 } = params;
    const singledata = data.find(item => item.id === Number(slug2));

    const PostReply =()=>{
        if(reply){
            alert(reply)
            setReply('')
        }
        else{
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
                                <Typography className={styles.title}>{singledata?.title}</Typography>
                                <Box className={styles.analys_box}>
                                    <Button disableRipple className={styles.analys_btn}><RemoveRedEyeOutlinedIcon className={styles.analys_icon} /> {singledata?.userdata.totalviews} views</Button>
                                    <Button disableRipple className={styles.analys_btn}><CommentOutlinedIcon className={styles.analys_icon} /> {singledata?.userdata.totalreplies} replies</Button>
                                    <Button disableRipple className={styles.analys_btn}><PersonOutlineOutlinedIcon className={styles.analys_icon} /> {singledata?.userdata.participants} participants</Button>
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
                                    <Typography className={styles.days_ago}>#1<span style={{ marginLeft: 4, marginRight: 4 }}>·</span>2d ago</Typography>
                                </Box>
                                <Box className={styles.desc_box}>
                                    <Typography className={styles.shortdesc}>{singledata?.shortDesc}</Typography>
                                </Box>
                            </Box>
                            <Box className={styles.image_box}>
                                <img src={singledata?.userimage} alt={singledata?.title} className={styles.bike_image} />
                            </Box>
                            <Box className={styles.sort_by}>
                                Sort By <span>Oldest first</span>
                            </Box>
                            {
                                singledata?.comments.map((e: any,i:any) => {
                                    return (
                                        <>
                                            <Box className={styles.reply_box}>
                                                <Box className={styles.logo_grid}>
                                                    <Box
                                                        className={styles.logo}>
                                                        {e?.uname?.slice(0, 1)}
                                                    </Box>
                                                    <Box className={styles.user_details_box}>
                                                        <Box>
                                                            <Typography className={styles.username}>{e?.uname}</Typography>
                                                            <Typography className={styles.post_join}>{e?.totalpost} post <span style={{ marginRight: '4', marginLeft: '4' }}>·</span> Joined {e?.joindate}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography className={styles.days_ago}>#{i}<span style={{ marginLeft: 4, marginRight: 4 }}>·</span>2d ago</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography className={styles.reply}>{e?.reply.slice(0,180)}...</Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    )
                                })
                            }
                            <Box className={styles.comment_box}>
                                <textarea name="" id="" className={styles.textarea} onChange={(e)=>setReply(e.target.value)} placeholder="Write your reply..."></textarea>
                            </Box>
                                <Button className={styles.postcmnt_btn} onClick={PostReply}>Post Reply</Button>
                        </Grid>
                        {/* ADD Grid */}
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
                                <hr style={{marginTop:'12px',marginBottom:'12px'}}/>
                                <Typography className={styles.explore_forums}>Explore Our Forums</Typography>
                                <Typography className={styles.our_forums}><a href="" className={styles.our_forums}>General Motorcycle Discusion</a></Typography>
                                <Typography className={styles.our_forums}><a href="" className={styles.our_forums}>Motorcycle Repair</a></Typography>
                                <Typography className={styles.our_forums}><a href="" className={styles.our_forums}>First Bike / New Rider</a></Typography>
                                <Typography className={styles.our_forums}><a href="" className={styles.our_forums}>Honda</a></Typography>
                                <Typography className={styles.our_forums}><a href="" className={styles.our_forums}>Vintage Forum</a></Typography>
                            </Box>
                            <Box className={styles.topcontributer}>
                                <Typography className={styles.headeing_tismont}>Top Contributers this Month</Typography>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.uname?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.uname}</Typography>
                                            <Typography className={styles.post_join}>{singledata?.userdata.totalpost} Replies</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.uname?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.uname}</Typography>
                                            <Typography className={styles.post_join}>{singledata?.userdata.totalpost} Replies</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.uname?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.uname}</Typography>
                                            <Typography className={styles.post_join}>{singledata?.userdata.totalpost} Replies</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={styles.topcontributer}>
                                <Typography className={styles.headeing_tismont}>Recommended Communities</Typography>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.uname?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.uname}</Typography>
                                            <Typography className={styles.post_join}>1.3M members</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.uname?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.uname}</Typography>
                                            <Typography className={styles.post_join}>2K members</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className={styles.logo_grid}>
                                    <Box
                                        className={styles.logo}>
                                        {singledata?.uname?.slice(0, 1)}
                                    </Box>
                                    <Box className={styles.user_details_box}>
                                        <Box>
                                            <Typography className={styles.username}>{singledata?.uname}</Typography>
                                            <Typography className={styles.post_join}>4K members</Typography>
                                        </Box>
                                    </Box>
                                </Box>
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
