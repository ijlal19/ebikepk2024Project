'use client'
import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/forumSharedComponent/motrocycle_forums";
import { getMainCategory, getSubCatgeorybyId, ViewCountAdd } from "@/ebikeForum/forumFunction/globalFuntions";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Loader from "@/ebikeForum/forumSharedComponent/loader/loader";
import CommentIcon from '@mui/icons-material/Comment';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './index.module.scss';

const Home = () => {
    const [mainCategoryData, setMainCategoryData] = useState<any>([])
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    useEffect(() => {
        fetchMainCategory()
    }, [])

    const fetchMainCategory = async () => {
        setIsLoading(true)
        const main_category = await getMainCategory()
        setMainCategoryData(main_category?.data)
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }

    const handleRoute = async (subCateginfo: any, mainCateginfo: any) => {

        const [{ main_categ_id, count }] = mainCateginfo?.ViewCount
        const mainCountObj = {
            main_categ_id: main_categ_id,
            count: count + 1,
        }

        const mainCategoryCount = await ViewCountAdd(mainCountObj)

        if (subCateginfo) {
            const [{ count }] = subCateginfo?.ViewCount
            const subCountObj = {
                sub_categ_id: subCateginfo.id,
                count: count + 1,
            }
            console.log("data" , subCountObj)
            const subCategoryCount = await ViewCountAdd(subCountObj)
            console.log("data" , mainCategoryCount , subCategoryCount)
            console.log("data" , mainCountObj)
        }

        var name = subCateginfo.name;
        name = name.replace(/\s+/g, '-');
        name = name.replace('\/', '-');
        var lowerTitle = name.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        router.push(`/forum/${lowerTitle}/${subCateginfo?.id}`);
    };

    return (
        <Box>
            {
                !isLoading ?
                    <Box sx={{ backgroundColor: '#f2f2f2', }}>
                        <Grid container className={styles.forums_container}>
                            <Grid item xs={isMobile ? 12 : 8.5} className={styles.content_grid}>
                                {
                                    [...(mainCategoryData || [])].reverse().map((e: any, i: any) => {
                                        return (
                                            <Box key={i}>
                                                <Typography className={styles.welcome_heading}>
                                                    {e?.name}
                                                </Typography>
                                                <Typography className={styles.heading_desc}>
                                                    {e?.description}
                                                </Typography>
                                                {e?.subCategories?.map((data: any, i: any) => {
                                                    return (
                                                        <Grid container className={styles.forums_box} key={i}>
                                                            <Grid item xs={isMobile ? 1.5 : 1} className={styles.logo_grid}>
                                                                <Box className={styles.logo}>
                                                                    <CommentIcon className={styles.comment_icon} />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={isMobile ? 10.5 : 11} className={styles.card_main}>
                                                                <Grid container>
                                                                    <Grid item xs={isMobile ? 12 : 8} className={styles.card_details}>
                                                                        <Typography className={styles.card_title} onClick={() => handleRoute(data, e)}>{data?.name}</Typography>
                                                                        <Typography className={styles.card_desc} sx={{ display: isMobile ? 'none' : '' }}>{data?.description}</Typography>
                                                                    </Grid>

                                                                    <Grid item xs={isMobile ? 12 : 4} className={styles.card_analys}>
                                                                        <Typography className={styles.view_box}>
                                                                            <span className={styles.view_box_inner}><VisibilityOutlinedIcon className={styles.analys_icon} />{data?.ViewCount[0]?.count}</span></Typography>
                                                                        <Typography className={styles.timeago}>{data?.createdAt.slice(18, 19)}h ago</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>)
                                                })}
                                            </Box>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 3.5} sx={{ display: isMobile ? 'none' : '' }}>
                                <Motorforums />
                                <Topcontributer />
                                <Communities />
                            </Grid>
                        </Grid>
                    </Box> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    )
}

export default Home