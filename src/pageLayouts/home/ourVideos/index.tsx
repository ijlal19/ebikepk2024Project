'use client';
import { Box, Grid, useMediaQuery } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styles from './index.module.scss';
import Data from './Data';
import Link from 'next/link';

const OurVideos = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isMobile2 = useMediaQuery('(max-width: 550px)');
    return (
        <Box className={styles.main} >
            <Box className={styles.heading_box}>
                <Box>Our Browse Videos</Box>
                <Box className={styles.all_videos}>View all Videos</Box>
            </Box>
        <Grid container spacing={1} className={styles.container}>
            <Grid item xs={isMobile ? 12 : 6} >
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
                    <Box className={styles.video_title}>{Data[0].title}</Box>
                </Link>
            </Grid>

            <Grid item xs={isMobile ? 12 : 6}>
                <Grid container spacing={1}>
                    {Data.slice(1, 5).map((e: any, i: any) => (
                        <Grid item xs={isMobile2 ? 12 : 6} key={i} className={styles.cards_grid}>
                            <Link href={e.video_url}className={styles.cards_grid}  target='blank'>
                                <Box
                                    className={styles.card}
                                    style={{
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
                            <Box className={styles.video_title}>{e.title}</Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
        </Box>
    );
};

export default OurVideos;


