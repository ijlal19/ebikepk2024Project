'use client'
import { useParams } from "next/navigation"
import { useState } from "react";
import styles from './indeex.module.scss'
import Loader from "@/ebikeForum/sharedComponentsForum/loader/loader";
import { Box, Grid, useMediaQuery } from "@mui/material";
const Forum_details = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams()
    console.log(params.slug2)


    return (
        <Box className={styles.main}>
            {
                !isLoading ? 
                <Grid container className={styles.forums_details_main}>
                    <Grid item xs={isMobile ? 12 : 8.5} className={styles.details_box}></Grid>
                    <Grid item xs={isMobile ? 12 : 3.5}></Grid>
                </Grid> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    )
}
export default Forum_details