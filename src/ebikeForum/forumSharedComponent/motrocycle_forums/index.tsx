import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { isLoginUser } from '@/ebikeForum/forumFunction/globalFuntions';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const Motorforums = () => {
    const [isUserLogin, setUserLogin] = useState<any>('not_login');
    const [Isdisplay,setDisplay]= useState(false);
    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setUserLogin(_isLoginUser.info)
            setDisplay(true)
        }
        else {
            setUserLogin("not_login")
            setDisplay(false)
        }
    }, [])

    return (
        <Box className={styles.motorcycle_forum}>
            <Typography className={styles.heading}>Motorcycle Forum</Typography>
            <Typography className={styles.forum_analys}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#191500' }}>
                    100+
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
                    1k+
                </span>{' '}
                members{' '}
                <span style={{ marginLeft: 4, marginRight: 4, fontWeight: 'bold' }}>·</span> Since
                2004
            </Typography>
            <Typography className={styles.instruction}>
                A forum communit discussing all bikes from harley Davison to Honda, Suzuki, KTM,
                Yamaha, and BMW. Come join the discussion abdout performance modifications,
                troubleshooting, maintenance and more!
            </Typography>
            <Button className={styles.join_btn} disableRipple sx={{display:Isdisplay ? "none":"flex" }}>
                <PermIdentityOutlinedIcon sx={{ fontSize: '18px'}} />
                Join Community
            </Button>
        </Box>
    )
}

const Topcontributer = () => {
    const data = [
        {
            "uname": 'Abdullah',
            "totalpost": '32',
        },
        {
            "uname": 'Shahzad',
            "totalpost": '22',
        },
        {
            "uname": 'Asif',
            "totalpost": '32',
        },
    ]
    return (
        <Box className={styles.topcontributer}>
            <Typography className={styles.headeing_tismont}>Top Contributers this Month</Typography>
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
                                    <Typography className={styles.post_join}>{e.totalpost} Replies</Typography>
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
    const data = [
        {
            "uname": 'Ebike Forums',
            "totalpost": '32',
            "view": '1'
        },
        {
            "uname": 'Motorcycle Related News',
            "totalpost": '22',
            "view": '1'
        },
        {
            "uname": 'General Forums',
            "totalpost": '32',
            "view": '1'
        },
    ]
    return (
        <Box className={styles.topcontributer}>
            <Typography className={styles.headeing_tismont}>Recommended Communities</Typography>
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
                                    <Typography className={styles.post_join}>{e?.view}K members</Typography>
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
    const Topforums = [
        {
            "id": 1,
            "title": 'Motorcycle discusion',
            "comment": '1K+',
            "views": '1K+'
        },
        {
            "id": 2,
            "title": 'Motorcycle Repair',
            "comment": '1K+',
            "views": '1K+'
        },
        {
            "id": 3,
            "title": 'First Rider',
            "comment": '1K+',
            "views": '1K+'
        },
        {
            "id": 4,
            "title": 'Amazing Bike',
            "comment": '1K+',
            "views": '1K+'
        },
        {
            "id": 5,
            "title": 'Last Model',
            "comment": '1K+',
            "views": '1K+'
        },
    ]
    return (
        <Box className={styles.motorcycle_forum}>
            <Typography className={styles.heading}>Our Top Forums</Typography>
            <Box className={styles.top_forums_card} >
                {
                    Topforums?.map((e: any, i: any) => {
                        return (<>
                            <Typography key={i} className={styles.top_forums_title}>{e?.title}</Typography>
                            <Typography className={styles.top_forums_analys}>
                                <Typography className={styles.comments_}>
                                    <CommentIcon sx={{ fontSize: '14px', color: '#191500', display: 'inline-block', alignItems: 'center' }} /> {e?.comment}
                                </Typography>
                                <Typography className={styles.view_box}>
                                    <VisibilityIcon sx={{ fontSize: '14px', color: '#191500', display: 'inline-block', alignItems: 'center' }} /> {e?.views}
                                </Typography>
                            </Typography>
                        </>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export { Motorforums, Topcontributer, Communities, Topforums }