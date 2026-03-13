'use client'
import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/forumSharedComponent/motrocycle_forums";
import { getCurrentForumViews, getMainCategory, incrementForumView } from "@/ebikeForum/forumFunction/globalFuntions";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Loader from "@/ebikeForum/forumSharedComponent/loader/loader";
import CommentIcon from '@mui/icons-material/Comment';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from './index.module.scss';
import { timeAgo } from "@/genericFunctions/geneFunc";

const Home = () => {
    const [mainCategoryData, setMainCategoryData] = useState<any>([])
    const isMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()
    const searchParams = useSearchParams();
    const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
    const sortType = (searchParams.get("sort") || "").trim().toLowerCase();

    const fetchMainCategory = useCallback(async () => {
        setIsLoading(true)
        const main_category = await getMainCategory()
        const data = Array.isArray(main_category?.data) ? main_category.data : [];

        const filtered = data.map((mainItem: any) => {
            const subCategories = Array.isArray(mainItem?.subCategories) ? mainItem.subCategories : [];
            const searchedSub = !searchQuery
                ? subCategories
                : subCategories.filter((subItem: any) => {
                    const name = String(subItem?.name || "").toLowerCase();
                    const desc = String(subItem?.description || "").toLowerCase();
                    return name.includes(searchQuery) || desc.includes(searchQuery);
                });

            const sortedSub = [...searchedSub].sort((a: any, b: any) => {
                if (sortType === "new") {
                    return new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime();
                }
                if (sortType === "top") {
                    return getCurrentForumViews(b) - getCurrentForumViews(a);
                }
                return 0;
            });

            return { ...mainItem, subCategories: sortedSub };
        }).filter((mainItem: any) => (mainItem?.subCategories?.length || 0) > 0 || !searchQuery);

        setMainCategoryData(filtered)
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }, [searchQuery, sortType]);

    useEffect(() => {
        fetchMainCategory()
    }, [fetchMainCategory])

    const handleRoute = async (subCateginfo: any) => {
        await incrementForumView("sub", subCateginfo);

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
                            <Grid item xs={12} className={styles.content_grid}>
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
                                                            <Grid item xs={2} md={1} className={styles.logo_grid}>
                                                                <Box className={styles.logo}>
                                                                    <CommentIcon className={styles.comment_icon} />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={10} md={11} className={styles.card_main}>
                                                                <Grid container>
                                                                    <Grid item xs={12} md={8} className={styles.card_details}>
                                                                        <Typography className={styles.card_title} onClick={() => handleRoute(data)}>{data?.name}</Typography>
                                                                        <Typography className={styles.card_desc} sx={{ display: isMobile ? 'none' : '' }}>{data?.description}</Typography>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={4} className={styles.card_analys}>
                                                                        <Typography className={styles.view_box}>
                                                                            <span className={styles.view_box_inner}><VisibilityOutlinedIcon className={styles.analys_icon} />{getCurrentForumViews(data)}</span></Typography>
                                                                        <Typography className={styles.timeago}>{timeAgo(data?.createdAt)}</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>)
                                                })}
                                            </Box>
                                        )
                                    })
                                }
                                {mainCategoryData?.length === 0 && (
                                    <Box className={styles.empty_state}>
                                        <Typography className={styles.empty_title}>No forum category matched</Typography>
                                        <Typography className={styles.empty_desc}>Try another search keyword or clear filters.</Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} sx={{ display: isMobile ? 'none' : '' }}>
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
