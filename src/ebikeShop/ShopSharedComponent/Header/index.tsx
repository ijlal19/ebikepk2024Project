"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { getShopMainCategory } from '@/ebikeShop/Shopfunctions/globalFuntions';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const TopbarCategory = () => {
    const [open, setOpen] = useState(false);
    const [data , setData] = useState([]);

    const router = useRouter()

    useEffect(()=>{
        fetch()
    },[])

    const fetch =async ()=>{
        const res =await getShopMainCategory()
        setData(res)
    }

    function goToRoute(data: any) {
        // router.push(data.url)
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
    <>
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <Divider />
                {data?.slice(0, 7).map((data: any, index: any) => {
                    return (
                        <>
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => goToRoute(data)}>
                                    <ListItemText primary={data?.name} className={styles.listText} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </>
                    )
                })}
            </List>
        </Box>
    </>
    );

    return (
        <Box className={styles.headers_main}>

            <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                <MenuIcon />
            </Button>

            <Box className={styles.logo_side}>
                <Drawer className='header_drawer' open={open} onClose={toggleDrawer(false)} >
                    {DrawerList}
                </Drawer>
                {/* <Box className={styles.logo}>
                    <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk" className={styles.logo_image} onClick={() => { router.push('/') }} />
                </Box> */}
            </Box>

            <Box className={styles.nav_link_box}>
                {
                    data?.slice(0, 7).map((e: any) => {
                        return (
                            <Typography className={styles.Link_text}><span className={styles.nav_link_in}>{e?.name}</span></Typography>
                        )
                    })
                }
            </Box>

            <Box className={styles.nav_icons_box}>
                <Box className={styles.nav_icons}><SearchIcon className={styles.icons} /></Box>
                <Box className={styles.nav_icons}><PermIdentityOutlinedIcon className={styles.icons} /></Box>
                <Box className={styles.nav_icons}><LocalMallOutlinedIcon className={styles.icons} /></Box>
            </Box>

        </Box>
    );
};

export default TopbarCategory;