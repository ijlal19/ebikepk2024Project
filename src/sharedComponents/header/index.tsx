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
import Router from "next/router"
// import { useRouter } from 'next/router';


const Header = () => {

    // const router = useRouter();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(false);
    const [buysellmenu, setBuySellmenu] = useState(false);
    const [findDealer, setFindDealer] = useState(false);
    const [findMechanics, setFindMechanics] = useState(false);
    // const [isServerSide, setIsServerSide] = useState(true)

    // useEffect(() => {
    //     setIsServerSide(false)
    // }, [])

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

    // const handleRedirection = (path: any)=> () => {
    //     // if(isServerSide) return;
    //     // else Router.push(path)
    //     router.push(path);
    // };

  
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
        title:'Buy & Sell Bikes'
    }
    const OptionFindDealer = {
        togglers: handlefinddealer,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findDealer,
        title:'Find Dealers'
    }
    const OptionFindMechanics = {
        togglers: handlefindmechanics,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findMechanics,
        title:'Find Mechanics'
    }
    
    const navlink =[
        {label: 'New Bikes',url:''},
        {label: 'My Adds',url:''},
        {label: 'Bikers Forum',url:'/blog'},
      ]
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
            <BuyandSell props={OptionBuySell  }/>
            <Divider />
                {navlink.map((text:any, index:any) => (
                    <>
                    <ListItem key={index} disablePadding>
                        <ListItemButton >
                            <ListItemText primary={text.label} />
                        </ListItemButton>
                    </ListItem>
            <Divider />
                    </>
                    
                ))}
            <DealerList props={OptionFindDealer}/>
            <Divider/>
            <MechanicsList props={OptionFindMechanics}/>
            <Divider/>
            <ListItem  sx={{padding:0}} disablePadding>
                        <ListItemButton onClick={toggleDrawer(false)}>
                            <ListItemText primary='Blog' />
                        </ListItemButton>
                    </ListItem>
            <Divider/>
            <MoreList props={Optionmore} />
            </List>
            
        </Box>
    );

    return (
        <Box className={styles.header_main}>
            <Box className={styles.logo_side}>
                <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer><Box className={styles.logo}>
                    <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk" className={styles.logo_image} />
                </Box></Box>
            <Box className={styles.header_buttons_group}>
                <span className={styles.login_btn}>
                    <LoginIcon className={styles.icons} /> Login
                </span>
            </Box>
        </Box>
    );
};

export default Header