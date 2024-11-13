'use client';
import { Box, Grid, useMediaQuery } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styles from './index.module.scss';
import Data from './Data';
import Link from 'next/link';

const OurVideos = ({SetWidth,SetMaxWidth}:any) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Box className={styles.main} style={{maxWidth: SetMaxWidth === 'inblogs'?'1150px':'1000px',display : isMobile? SetMaxWidth === 'inblogs'?'none':'block':'block' }} >

            <Box className={styles.heading_box}  style={{display:SetMaxWidth === 'inblogs' ? 'none': 'flex'}}>
                <Box>Our Browse Videos</Box>
                 <Link href="https://www.youtube.com/@ebikepk" target='_blank'>
                    <Box className={styles.all_videos}>View all Videos</Box>
                 </Link>
            </Box>

        <Grid container spacing={1} className={styles.container} style={{maxWidth: SetMaxWidth === 'inblogs'?'1150px':'1000px' }}>
            <Grid item xs={isMobile ? 8 : 7} >
                <Link href={Data[0].video_url} className={styles.link} target='blank'>
                    <Box
                        className={styles.background_box}
                        style={{
                            backgroundImage: `url(${Data[0].thumbnail_url})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <PlayCircleIcon className={styles.icons} />
                    </Box>
                </Link>
            </Grid>

            <Grid item xs={isMobile ? 4 : 5}>
                <Grid container spacing={1}>
                    {
                    isMobile? Data.slice(1, 3).map((e: any, i: any) => (
                        <Grid item xs={12} style={{marginBottom:SetMaxWidth ==='inblogs'? 0:2}} key={i} className={styles.cards_grid}>
                            <Link href={e.video_url}className={styles.cards_grid}  target='blank'>
                                <Box
                                    className={styles.card}
                                    style={{
                                        height:SetMaxWidth === 'inblogs' ? '27vh':'25px',
                                        backgroundImage: `url(${e.thumbnail_url})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'black',
                                    }}
                                >
                                    <PlayCircleIcon className={styles.icons} />
                                </Box>
                            </Link>
                        </Grid>
                    )):
                    Data.slice(1, 5).map((e: any, i: any) => (
                        <Grid item xs={isMobile ? 12 :6} style={{marginBottom:SetMaxWidth ==='inblogs'? 0:2}} key={i} className={styles.cards_grid}>
                            <Link href={e.video_url}className={styles.cards_grid}  target='blank'>
                                <Box
                                    className={styles.card}
                                    style={{
                                        height:SetMaxWidth === 'inblogs' ? '27vh':'25vh',
                                        backgroundImage: `url(${e.thumbnail_url})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'black',
                                    }}
                                >
                                    <PlayCircleIcon className={styles.icons} />
                                </Box>
                            </Link>
                        </Grid>))
                        }
                </Grid>
            </Grid>
        </Grid>
        </Box>
    );
};

export default OurVideos;


