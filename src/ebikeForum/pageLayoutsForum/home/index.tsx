'use client'
import {Communities, Motorforums, Topcontributer} from "@/ebikeForum/sharedComponentsForum/motrocycle_forums";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import styles from './index.module.scss';
import data from "./data";
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouter } from "next/navigation";

const Home = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const router = useRouter()

    const handleRoute = (forumsinfo: any) => {
        var title = forumsinfo.title;
        title = title.replace(/\s+/g, '-');
        title = title.replace('\/', '-');
        var lowerTitle = title.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        router.push(`/forums/${lowerTitle}/${forumsinfo.id}`);
      };
    return (
        <Box sx={{ backgroundColor: '#f2f2f2', }}>
            <Grid container className={styles.forums_container}>
                <Grid item xs={isMobile ? 12 : 8.5} className={styles.content_grid}>
                    <Box>
                        <Typography className={styles.welcome_heading}>
                            Welcome To EbikeForum.com
                        </Typography>
                        <Typography className={styles.welcome_heading}>
                            General Forums
                        </Typography>
                        {
                            data?.map((e: any, i: any) => {
                                console.log('kk', e.username)
                                return (
                                    <Grid container className={styles.forums_box}>
                                        <Grid item xs={isMobile ? 1.5 : 1} className={styles.logo_grid}>
                                            <Box className={styles.logo}>
                                                <CommentIcon className={styles.comment_icon} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={isMobile ? 10.5 : 11} className={styles.card_main}>
                                            <Grid container>
                                                <Grid item xs={isMobile ? 12 : 8} className={styles.card_details}>
                                                    <Typography className={styles.card_title} onClick={() => handleRoute(e)}>{e?.title}</Typography>
                                                    <Typography className={styles.card_desc}  sx={{display:isMobile ? 'none':''}}>{e?.description.slice(0, 80)}</Typography>
                                                </Grid>

                                                <Grid item xs={isMobile ? 12 : 4} className={styles.card_analys}>
                                                    <Typography className={styles.view_box}>
                                                        <span className={styles.view_box_inner}><CommentIcon className={styles.analys_icon} /> {e?.comment?.length}K</span>
                                                        <span className={styles.view_box_inner}><VisibilityOutlinedIcon className={styles.analys_icon} /> {e?.view}M</span></Typography>
                                                    <Typography className={styles.timeago}>{e?.timeago}h ago</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Box>
                </Grid>
                <Grid item xs={isMobile ? 12 : 3.5} sx={{display:isMobile ? 'none':''}}>
                    <Motorforums />
                    <Topcontributer/>
                    <Communities/>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Home