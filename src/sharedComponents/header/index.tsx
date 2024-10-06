"use client"
import React, { useState, useEffect } from 'react'
import { Box, Button, List } from '@mui/material'
import styles from './index.module.scss'
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreList from './moreOptions/index';
import BuyandSell from './buyandsell/index';
import DealerList from './findDealers';
import MechanicsList from './findDealers';


const Header = () => {
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(false);
    const [buysellmenu, setBuySellmenu] = React.useState(false);
    const [findDealer, setFindDealer] = React.useState(false);
    const [findMechanics, setFindMechanics] = React.useState(false);
    const [openLoginModal, setopenLoginModal] = React.useState(false);

    const handlemorelist = () => {
        setOptions(!options);
    };

    const handlebuyandsell = () => {
        setBuySellmenu(!buysellmenu);
    };

    const handlefinddealer = () => {
        setFindDealer(!findDealer);
    };

    const handlefindmechanics = () => {
        setFindMechanics(!findMechanics);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const Optionmore = {
        togglers: handlemorelist,
        toggleDrawers: toggleDrawer,
        options: options,
    }

    const OptionBuySell = {
        togglers: handlebuyandsell,
        open: open,
        toggleDrawers: toggleDrawer,
        options: buysellmenu,
        title: 'Buy & Sell Bikes'
    }

    const OptionFindDealer = {
        togglers: handlefinddealer,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findDealer,
        title: 'Find Dealers'
    }

    const OptionFindMechanics = {
        togglers: handlefindmechanics,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findMechanics,
        title: 'Find Mechanics'
    }

    const navlink = [
        { label: 'New Bikes', url: '' },
        { label: 'My Adds', url: '' },
        { label: 'Bikers Forum', url: '' },
        { label: 'Blog', url: '' },
    ]

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>

                <BuyandSell props={OptionBuySell} />
                <Divider />
                
                {navlink.map((data: any, index: any) => (
                    <>
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={toggleDrawer(false)}>
                                <ListItemText primary={data.label} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                ))}
                
                <DealerList props={OptionFindDealer} />
                <Divider />
                
                <MechanicsList props={OptionFindMechanics} />
                <Divider />
                
                <MoreList props={Optionmore} />
                <Divider />
                
                {/* Login Button in Drawer */}
                <ListItem sx={{ padding: 0 }} disablePadding>
                    <ListItemButton
                        onClick={() => { }}
                    >
                        <ListItemText primary='Login' />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <>
            <Box className={styles.header_main}>
                <Box className={styles.logo_side}>
                    <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    <Box className={styles.logo}>
                        <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk" className={styles.logo_image} />
                    </Box>
                </Box>
                <Box className={styles.header_buttons_group}>
                    {/* Login Button in Header */}
                    <span className={styles.login_btn} onClick={()=>{}}>
                        <LoginIcon className={styles.icons} /> Login
                    </span>
                </Box>
            </Box>
            
        </>
    );
};

export default Header;
