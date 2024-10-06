"use client"
import React, { useState } from 'react'
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
import DealerList from './findDealers/index';
import MechanicsList from './findMechanic/index';
import LoginPopup from '../Loginpopup/login';


const Header = () => {
    
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(false);
    const [buysellmenu, setBuySellmenu] = useState(false);
    const [findDealer, setFindDealer] = useState(false);
    const [findMechanics, setFindMechanics] = useState(false);
    const [openmodal, setOpenmodal] = useState(false);
//   const handleOpen = () => setOpenmodal(!openmodal);
    const toggle = (e:any) => {
        if(e == 'buy&sell'){
            setBuySellmenu(!buysellmenu);
        }
        else if(e == 'finddealer'){
            setFindDealer(!findDealer);
        }
        else if (e == 'findmachenics'){
            setFindMechanics(!findMechanics);
        }
        else if(e == 'moreoption'){
            setOptions(!options);
        }
        else if(e == 'showloginpopup'){
            // handleOpen()
            setOpenmodal(!openmodal)
        }
        else{
            setOpen(!open);
        }
    };
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const Optionmore = {
        togglers: toggle,
        toggleDrawers: toggleDrawer,
        options: options,
    }

    const OptionBuySell = {
        togglers: toggle,
        open: open,
        toggleDrawers: toggleDrawer,
        options: buysellmenu,
        title: 'Buy & Sell Bikes'
    }

    const OptionFindDealer = {
        togglers: toggle,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findDealer,
        title: 'Find Dealers'
    }

    const OptionFindMechanics = {
        togglers: toggle,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findMechanics,
        title: 'Find Mechanics'
    }
    const ModalData = {
        showmodal: toggle,
        
        openmodal:openmodal
    }

    const navlink = [
        { label: 'New Bikes', url: '' },
        { label: 'My Adds', url: '' },
        { label: 'Bikers Forum', url: '' }
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
                <ListItem sx={{ padding: 0 }} disablePadding>
                    <ListItemButton>
                        <ListItemText primary='Blog' />
                    </ListItemButton>
                </ListItem>
                <Divider/>
                <MoreList props={Optionmore} />
                <Divider />
                <LoginPopup props={ModalData}/>
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
                    {/* <span className={styles.login_btn} onClick={()=>{}}>
                        <LoginIcon className={styles.icons} /> Login
                    </span> */}
                    <LoginPopup props={ModalData}/>
                </Box>
            </Box>
            
        </>
    );
};

export default Header;
