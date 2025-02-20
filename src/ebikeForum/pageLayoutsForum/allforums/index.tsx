'use client';
import React, { useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
// import data from './data';
import Loader from '@/ebikeForum/sharedComponentsForum/loader/loader';
import CommentIcon from '@mui/icons-material/Comment';
import { useParams, useRouter } from 'next/navigation';
import { Motorforums, Topforums } from '../../sharedComponentsForum/motrocycle_forums/index'
import data from '../home/data';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Modal from '@mui/material/Modal';

function Allforums() {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [threadTitle,setTitle]=useState('')
    const [threadMessage,setMessage]=useState('')
    const [threadTag,setTag]=useState('')
    const {slug2 } = useParams()
    const router = useRouter()

    const userdata = data.find(item => item.c_id === Number(slug2));
console.log(userdata)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        var name = forumsinfo.name;
        name = name.replace(/\s+/g, '-');
        var lowerTitle = name.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        router.push(`/threads/${lowerTitle}/${forumsinfo.s_id}`);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handlePost=()=>{
        if(!threadTitle || !threadMessage || !threadTag){
            alert('Please fill required all inform')
            return
        }
        else{
            console.log("klkl" +
                threadTitle,
                threadMessage,
                threadTag
            )
        }
    }
    return (
        <Box>
            <Box className={styles.heading_box}>
                <Box className={styles.heading_inner_box}>
                    <Typography className={styles.banner_heading}>
                        {userdata?.name}
                    </Typography>
                    <Button className={styles.pencil_btn} onClick={handleOpen}>
                        <CreateIcon className={styles.pencil_icon} /> Creat thread
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
                                                        <Typography className={styles.card_title} onClick={() => handleRoute(e)}>{e?.name}</Typography>
                                                        <Typography className={styles.card_desc}>{e?.user_name}<span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span>{e?.postdate}</Typography>
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
            <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={styles.popup_container}>
                        <Box className={styles.popup_main}>
                            <Box className={styles.title_section}>
                                <Box className={styles.logo}>A</Box>
                                <input type="text"  className={styles.title_input} onChange={(e)=>setTitle(e.target.value)} placeholder='Thread Title'/>
                            </Box>
                            <Box className={styles.message_section}>
                                <Box>

                                <label htmlFor="44" className={styles.label}>Message<span style={{color:'red'}}>*</span></label>
                                <textarea name="" id="44" className={styles.message_box} onChange={(e)=>setMessage(e.target.value)}></textarea>
                                </Box>
                                <Box>
                                <label htmlFor="" className={styles.label}>Tags</label>
                                <input type="text" className={styles.tag_input} onChange={(e)=>setTag(e.target.value)}/>
                                </Box>
                            </Box>
                            <Box className={styles.btn_box}>
                                <Button className={styles.post_btn} onClick={handlePost}>Post Thread</Button>
                                <Button className={styles.cancel_btn} onClick={handleClose} disableRipple>cancel</Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </Box>

    );
}

export default Allforums;