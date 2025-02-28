'use client'
import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/forumSharedComponent/motrocycle_forums";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import styles from './index.module.scss';
import data from "./data";
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMainCategory } from "@/ebikeForum/forumFunction/globalFuntions";
import Loader from "@/ebikeForum/forumSharedComponent/loader/loader";

const Home = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [mainCategoryData, setMainCategoryData] = useState([])
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

    const handleRoute = (forumsinfo: any) => {
        var name = forumsinfo.name;
        name = name.replace(/\s+/g, '-');
        name = name.replace('\/', '-');
        var lowerTitle = name.toLowerCase();
        lowerTitle = '' + lowerTitle.replaceAll("?", "")
        router.push(`/forums/${lowerTitle}/${forumsinfo.id}`);
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
                                                {e?.subCategories?.map((data:any,i:any)=>{
                                        return(
                                                <Grid container className={styles.forums_box} key={i}>
                                                    <Grid item xs={isMobile ? 1.5 : 1} className={styles.logo_grid}>
                                                        <Box className={styles.logo}>
                                                            <CommentIcon className={styles.comment_icon} />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={isMobile ? 10.5 : 11} className={styles.card_main}>
                                                        <Grid container>
                                                            <Grid item xs={isMobile ? 12 : 8} className={styles.card_details}>
                                                                <Typography className={styles.card_title} onClick={() => handleRoute(data)}>{data?.name}</Typography>
                                                                <Typography className={styles.card_desc} sx={{ display: isMobile ? 'none' : '' }}>{data?.description}</Typography>
                                                            </Grid>

                                                            <Grid item xs={isMobile ? 12 : 4} className={styles.card_analys}>
                                                                <Typography className={styles.view_box}>
                                                                    {/* <span className={styles.view_box_inner}><CommentIcon className={styles.analys_icon} /> {e?.comment?.length}K</span> */}
                                                                    <span className={styles.view_box_inner}><VisibilityOutlinedIcon className={styles.analys_icon} /> {e?.view}K</span></Typography>
                                                                <Typography className={styles.timeago}>{e?.timeago}h ago</Typography>
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





// 'use client'
// import { Communities, Motorforums, Topcontributer } from "@/ebikeForum/forumSharedComponent/motrocycle_forums";
// import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
// import styles from './index.module.scss';
// import CommentIcon from '@mui/icons-material/Comment';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getMainCategory } from "@/ebikeForum/forumFunction/globalFuntions";
// import Loader from "@/ebikeForum/forumSharedComponent/loader/loader";

// const Home = () => {
//     const isMobile = useMediaQuery('(max-width:768px)');
//     const [mainCategoryData, setMainCategoryData] = useState<{ id: number; name: string; description: string; view: number; timeago: number }[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchMainCategory = async () => {
//             setIsLoading(true);
//             try {
//                 const main_category = await getMainCategory();
//                 setMainCategoryData(main_category?.data || []);
//             } catch (error) {
//                 console.error("Error fetching main category:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchMainCategory();
//     }, []);

//     const handleRoute = (forumsinfo: { id: number; name: string }) => {
//         let name = forumsinfo.name.replace(/\s+/g, '-').replace(/\//g, '-').toLowerCase().replace(/\?/g, '');
//         router.push(`/forums/${name}/${forumsinfo.id}`);
//     };

//     return (
//         <Box>
//             {!isLoading ? (
//                 <Box sx={{ backgroundColor: '#f2f2f2' }}>
//                     <Grid container className={styles.forums_container}>
//                         <Grid item xs={isMobile ? 12 : 8.5} className={styles.content_grid}>
//                             <Box>
//                                 <Typography className={styles.welcome_heading}>
//                                     Welcome To EbikeForum.com
//                                 </Typography>
//                                 <Typography className={styles.welcome_heading}>
//                                     General Forums
//                                 </Typography>
//                                 {mainCategoryData.map((e, i) => (
//                                     <Grid container className={styles.forums_box} key={i}>
//                                         <Grid item xs={isMobile ? 1.5 : 1} className={styles.logo_grid}>
//                                             <Box className={styles.logo}>
//                                                 <CommentIcon className={styles.comment_icon} />
//                                             </Box>
//                                         </Grid>
//                                         <Grid item xs={isMobile ? 10.5 : 11} className={styles.card_main}>
//                                             <Grid container>
//                                                 <Grid item xs={isMobile ? 12 : 8} className={styles.card_details}>
//                                                     <Typography className={styles.card_title} onClick={() => handleRoute(e)}>
//                                                         {e.name}
//                                                     </Typography>
//                                                     {!isMobile && (
//                                                         <Typography className={styles.card_desc}>
//                                                             {e.description}
//                                                         </Typography>
//                                                     )}
//                                                 </Grid>

//                                                 <Grid item xs={isMobile ? 12 : 4} className={styles.card_analys}>
//                                                     <Typography className={styles.view_box}>
//                                                         <span className={styles.view_box_inner}>
//                                                             <VisibilityOutlinedIcon className={styles.analys_icon} /> {e.view}K
//                                                         </span>
//                                                     </Typography>
//                                                     <Typography className={styles.timeago}>{e.timeago}h ago</Typography>
//                                                 </Grid>
//                                             </Grid>
//                                         </Grid>
//                                     </Grid>
//                                 ))}
//                             </Box>
//                         </Grid>
//                         {!isMobile && (
//                             <Grid item xs={3.5}>
//                                 <Motorforums />
//                                 <Topcontributer />
//                                 <Communities />
//                             </Grid>
//                         )}
//                     </Grid>
//                 </Box>
//             ) : (
//                 <div className={styles.load_main}>
//                     <div className={styles.load_div}>
//                         <Loader isLoading={isLoading} />
//                     </div>
//                 </div>
//             )}
//         </Box>
//     );
// };

// export default Home;
