'use client';
import { Box, Grid, useMediaQuery } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styles from './index.module.scss';
import Data from './Data';
import Link from 'next/link';

const OurVideos = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Grid container spacing={1} className={styles.container}>
            <Grid item xs={isMobile ? 12 : 6}>
                <Link href={Data[0].video_url}>
                    <Box
                        className={styles.background_box}
                        style={{
                            backgroundImage: `url(${Data[0].thumbnail_url})`,
                            backgroundSize: '100% auto',
                            backgroundPosition: 'center',
                            height: '53vh',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid grey',
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
                        <Grid item xs={isMobile ? 12 : 6} key={i} className={styles.cards_grid}>
                            <Link href={e.video_url}>
                                <Box
                                    className={styles.card}
                                    style={{
                                        backgroundImage: `url(${e.thumbnail_url})`,
                                        backgroundSize: '100% auto',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        height: '25vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        backgroundColor: 'black',
                                    }}
                                >
                                    <PlayCircleIcon className={styles.icons} />
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OurVideos;


