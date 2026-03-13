import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { isLoginUser } from '@/genericFunctions/geneFunc';
import { getAllThreadComments, getAllthread, getCurrentForumViews, getMainCategory } from '@/ebikeForum/forumFunction/globalFuntions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const Motorforums = () => {
    const [Isdisplay, setDisplay] = useState(false);
    const [forumStats, setForumStats] = useState({ posts: 0, members: 0 });

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setDisplay(true)
        }
        else {
            setDisplay(false)
        }

        const loadStats = async () => {
            const [threadsRes, commentsRes] = await Promise.all([getAllthread(), getAllThreadComments()]);
            const threads = Array.isArray(threadsRes?.data) ? threadsRes.data : [];
            const comments = Array.isArray(commentsRes?.data)
                ? commentsRes.data
                : Array.isArray(commentsRes?.comments)
                    ? commentsRes.comments
                    : [];
            const uniqueUsers = new Set(
                [...threads, ...comments]
                    .map((item: any) => item?.user_id || item?.user_name)
                    .filter(Boolean)
            );
            setForumStats({
                posts: threads.length,
                members: uniqueUsers.size
            });
        };

        loadStats();
    }, [])

    return (
        <Box className={styles.motorcycle_forum}>
            <Typography className={styles.heading}>ebike Forum</Typography>
            <Typography className={styles.forum_analys}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#191500' }}>
                    {forumStats.posts || 0}
                </span>{' '}
                posts{' '}
                <span
                    style={{
                        marginLeft: 4,
                        marginRight: 4,
                        fontWeight: 'bolder',
                        fontSize: '14px',
                    }}
                >
                    ·
                </span>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#191500' }}>
                    {forumStats.members || 0}
                </span>{' '}
                members{' '}
                <span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span> Since
                2025
            </Typography>
            <Typography className={styles.instruction}>
                Pakistan ki eBike community for buying advice, maintenance, range tips, charging, and upgrades.
            </Typography>
            <Button className={styles.join_btn} disableRipple sx={{ display: Isdisplay ? "none" : "flex" }}>
                <PermIdentityOutlinedIcon sx={{ fontSize: '18px' }} />
                Join ebike Forum
            </Button>
        </Box>
    )
}

const Topcontributer = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const loadContributors = async () => {
            const [threadsRes, commentsRes] = await Promise.all([getAllthread(), getAllThreadComments()]);
            const threads = Array.isArray(threadsRes?.data) ? threadsRes.data : [];
            const comments = Array.isArray(commentsRes?.data)
                ? commentsRes.data
                : Array.isArray(commentsRes?.comments)
                    ? commentsRes.comments
                    : [];

            const countMap = new Map<string, number>();
            [...threads, ...comments].forEach((item: any) => {
                const name = item?.user_name || "Anonymous";
                countMap.set(name, (countMap.get(name) || 0) + 1);
            });

            const parsed = Array.from(countMap.entries())
                .map(([uname, totalpost]) => ({ uname, totalpost }))
                .sort((a, b) => b.totalpost - a.totalpost)
                .slice(0, 5);

            setData(parsed);
        };

        loadContributors();
    }, []);

    return (
        <Box className={styles.topcontributer}>
            <Typography className={styles.headeing_tismont}>Top Contributors</Typography>
            {
                data?.map((e: any, i: any) => {
                    return (
                        <Box className={styles.logo_grid} key={i}>
                            <Box
                                className={styles.logo}>
                                {e?.uname?.slice(0, 1)}
                            </Box>
                            <Box className={styles.user_details_box}>
                                <Box>
                                    <Typography className={styles.username}>{e?.uname}</Typography>
                                    <Typography className={styles.post_join}>{e.totalpost} posts</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

const Communities = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const loadCommunities = async () => {
            const mainRes = await getMainCategory();
            const categories = Array.isArray(mainRes?.data) ? mainRes.data : [];
            const mapped = categories.slice(0, 5).map((item: any) => ({
                uname: item?.name || "Forum",
                view: Array.isArray(item?.subCategories) ? item.subCategories.length : 0
            }));
            setData(mapped);
        };

        loadCommunities();
    }, []);

    return (
        <Box className={styles.topcontributer}>
            <Typography className={styles.headeing_tismont}>Popular eBike Communities</Typography>
            {
                data?.map((e: any, i: any) => {
                    return (
                        <Box className={styles.logo_grid} key={i}>
                            <Box
                                className={styles.logo}>
                                {e?.uname?.slice(0, 1)}
                            </Box>
                            <Box className={styles.user_details_box}>
                                <Box>
                                    <Typography className={styles.username}>{e?.uname}</Typography>
                                    <Typography className={styles.post_join}>{e?.view} sub forums</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

const Topforums = () => {
    const [topForums, setTopForums] = useState<any[]>([]);

    useEffect(() => {
        const loadTopForums = async () => {
            const res = await getAllthread();
            const threads = Array.isArray(res?.data) ? res.data : [];
            const sorted = [...threads]
                .sort((a: any, b: any) => {
                    const aViews = getCurrentForumViews(a);
                    const bViews = getCurrentForumViews(b);
                    const aComments = Array.isArray(a?.Comments) ? a.Comments.length : 0;
                    const bComments = Array.isArray(b?.Comments) ? b.Comments.length : 0;
                    return (bViews + bComments) - (aViews + aComments);
                })
                .slice(0, 6);
            setTopForums(sorted);
        };

        loadTopForums();
    }, []);

    return (
        <Box className={styles.motorcycle_forum}>
            <Typography className={styles.heading}>Top eBike Discussions</Typography>
            <Box className={styles.top_forums_card} >
                {
                    topForums?.map((e: any, i: any) => {
                        const commentsCount = Array.isArray(e?.Comments) ? e.Comments.length : 0;
                        const viewsCount = getCurrentForumViews(e);
                        return (<Box key={e?.id || i}>
                            <Typography className={styles.top_forums_title}>{e?.title}</Typography>
                            <Typography className={styles.top_forums_analys}>
                                <Typography className={styles.comments_}>
                                    <CommentIcon sx={{ fontSize: '14px', color: '#191500', display: 'inline-block', alignItems: 'center' }} /> {commentsCount}
                                </Typography>
                                <Typography className={styles.view_box}>
                                    <VisibilityIcon sx={{ fontSize: '14px', color: '#191500', display: 'inline-block', alignItems: 'center' }} /> {viewsCount}
                                </Typography>
                            </Typography>
                        </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export { Motorforums, Topcontributer, Communities, Topforums }
