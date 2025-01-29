import { Box, Button, Typography } from '@mui/material';
import styles from './index.module.scss';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Motorforums = () => {
    return (
        <Box className={styles.motorcycle_forum}>
            <Typography className={styles.heading}>Motorcycle Forum</Typography>
            <Typography className={styles.forum_analys}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#191500' }}>
                    975k
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
                    133k
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
            <Button className={styles.join_btn} disableRipple>
                <PermIdentityOutlinedIcon sx={{ fontSize: '18px' }} />
                Join Community
            </Button>
            <Button className={styles.grow_bussines_btn} disableRipple>
                <StoreOutlinedIcon sx={{ fontSize: '18px', color: '#191500' }} />
                Grow Your Bussiness
            </Button>
        </Box>
    )
}

const Topcontributer = () => {
    const data = [
        {
            "uname": 'abdw',
            "totalpost": '32',
        },
        {
            "uname": 'Jisis',
            "totalpost": '22',
        },
        {
            "uname": 'kkks',
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
            "uname": 'abdw',
            "totalpost": '32',
            "view": '72'
        },
        {
            "uname": 'Jisis',
            "totalpost": '22',
            "view": '25'
        },
        {
            "uname": 'kkks',
            "totalpost": '32',
            "view": '22'
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
                                    <Typography className={styles.post_join}>{e?.view}M members</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

const Topforums =()=>{
    const Topforums = [
        {
            "id": 1,
            "title": 'Motorcycle discusion',
            "comment": '375K',
            "views": '73M'
        },
        {
            "id": 2,
            "title": 'Motorcycle Repair',
            "comment": '245K',
            "views": '69M'
        },
        {
            "id": 3,
            "title": 'First Rider',
            "comment": '223K',
            "views": '58M'
        },
        {
            "id": 4,
            "title": 'Amazing Bike',
            "comment": '180K',
            "views": '40M'
        },
        {
            "id": 5,
            "title": 'Last Model',
            "comment": '156K',
            "views": '38M'
        },
    ]
    return(
        <Box className={styles.motorcycle_forum}>
                                        <Typography className={styles.heading}>Our Top Forums</Typography>
                                        <Box className={styles.top_forums_card} >
                                        {
                                            Topforums?.map((e: any, i: any) => {
                                                return (<>
                                                        <Typography key={i} className={styles.top_forums_title}>{e?.title}</Typography>
                                                        <Typography className={styles.top_forums_analys}>
                                                            <Typography className={styles.comments_}>
                                                                <CommentIcon  sx={{fontSize:'14px',color:'#191500',display:'inline-block',alignItems:'center'}}/> {e?.comment}
                                                            </Typography>
                                                            <Typography className={styles.view_box}>
                                                                <VisibilityIcon sx={{fontSize:'14px',color:'#191500',display:'inline-block',alignItems:'center'}}/> {e?.views}
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

export { Motorforums, Topcontributer ,Communities,Topforums}