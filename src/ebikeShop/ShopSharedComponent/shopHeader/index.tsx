"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const ShopHeader = () => {
    const [open, setOpen] = useState(false);

    const router = useRouter()

    const navlink = [
        { label: 'Home', url: '/new-bikes' },
        { label: 'New Bike', url: '' },
        { label: 'Used Bike', url: '' },
        { label: 'Blog', url: '' },
        { label: 'Forums', url: '' }
    ]
    function goToRoute(data: any) {
        router.push(data.url)
    }
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (<>
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <Divider />

                {navlink.map((data: any, index: any) => {
                    return (
                        <>
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => goToRoute(data)}>
                                    <ListItemText primary={data.label} className={styles.listText} />
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
        <Box className={styles.shop_header_main}>
            <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                <MenuIcon />
            </Button>
            <Box className={styles.logo_side}>
                <Drawer className='header_drawer' open={open} onClose={toggleDrawer(false)} >
                    {DrawerList}
                </Drawer>
                <Box className={styles.logo}>
                    <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk" className={styles.logo_image} onClick={() => { router.push('/') }} />
                </Box>
            </Box>
            <Box className={styles.nav_link_box}>
                <Typography className={styles.Link_text}><span className={styles.nav_link_in}>Home</span></Typography>
                <Typography className={styles.Link_text}><span className={styles.nav_link_in}>New Bike</span></Typography>
                <Typography className={styles.Link_text}><span className={styles.nav_link_in}>Used Bike</span></Typography>
                <Typography className={styles.Link_text}><span className={styles.nav_link_in}>Blog</span></Typography>
                <Typography className={styles.Link_text}><span className={styles.nav_link_in}>Forums</span></Typography>
            </Box>
            <Box className={styles.nav_icons_box}>
                <Box className={styles.nav_icons}><SearchIcon className={styles.icons} /></Box>
                <Box className={styles.nav_icons}><PermIdentityOutlinedIcon className={styles.icons} /></Box>
                <Box className={styles.nav_icons}><LocalMallOutlinedIcon className={styles.icons} /></Box>
            </Box>
        </Box>
    );
};

export default ShopHeader;