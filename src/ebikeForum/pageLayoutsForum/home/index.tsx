import { Box, Grid, useMediaQuery } from '@mui/material';
import * as React from 'react';
import styles from './index.module.scss';
export default function Home() {
    // const isMobile = useMediaQuery("(max-width: 768px)")
    return (
        <Box className={styles.home_main}>
            <Grid container>
                <Grid item xs={6}>lorem10sxwweewrfcrefcre</Grid>
                <Grid item xs={6}>rcerrejewbhjb</Grid>
            </Grid>
        </Box>
    )
}