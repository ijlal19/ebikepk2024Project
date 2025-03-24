"use client"
import { Box, Button, Link, List, Typography } from '@mui/material';
import { isLoginUser } from '../../../genericFunctions/geneFunc';
import ListItemButton from '@mui/material/ListItemButton';
import { usePathname, useRouter } from 'next/navigation';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import MechanicsList from './findMechanic/index';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import DealerList from './findDealers/index';
import LoginPopup from '../Loginpopup/login';
import Divider from '@mui/material/Divider';
import BuyandSell from './buyandsell/index';
import { Label } from '@mui/icons-material';
import MoreList from './moreOptions/index';
import Drawer from '@mui/material/Drawer';
import styles from './index.module.scss';

const jsCookie = require('js-cookie');


const Header = () => {

    const router = useRouter()
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(false);
    const [buysellmenu, setBuySellmenu] = useState(false);
    const [findDealer, setFindDealer] = useState(false);
    const [findMechanics, setFindMechanics] = useState(false);
    const [openmodal, setOpenmodal] = useState(false);
    const [customer, setCustomer] = useState('not_login')

    useEffect(() => {
        authenticateUser()
    }, [])

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    function authenticateUser() {

        let _isLoginUser = isLoginUser()

        if (_isLoginUser?.login) {
            setCustomer(_isLoginUser.info)
        }

        else {
            setCustomer("not_login")
        }

    }

    function LogoutUser() {
        jsCookie.remove('userInfo_e')
        jsCookie.remove('accessToken_e')
        window.location.reload()
    }

    function goToRoute(data: any) {
        toggleDrawer(false)
        setTimeout(() => {
            router.push(data.url)
        }, 500)
    }

    const toggle = (e: any) => {
        if (e == 'buy&sell') {
            setBuySellmenu(!buysellmenu);
        }
        else if (e == 'finddealer') {
            setFindDealer(!findDealer);
        }
        else if (e == 'findmachenics') {
            setFindMechanics(!findMechanics);
        }
        else if (e == 'moreoption') {
            setOptions(!options);
        }
        else if (e == 'showloginpopup') {
            setOpenmodal(!openmodal)
        }
        else {
            setOpen(!open);
        }
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        console.log('aaa', newOpen)
        setOpen(newOpen);
    };

    const Optionmore = {
        togglers: toggle,
        toggleDrawers: toggleDrawer,
        options: options,
        customer: customer
    }

    const OptionBuySell = {
        togglers: toggle,
        open: open,
        toggleDrawers: toggleDrawer,
        options: buysellmenu,
        title: 'Buy & Sell Bikes',
        customer: customer
    }

    const OptionFindDealer = {
        togglers: toggle,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findDealer,
        title: 'Find Dealers',
        customer: customer
    }

    const OptionFindMechanics = {
        togglers: toggle,
        open: open,
        toggleDrawers: toggleDrawer,
        options: findMechanics,
        title: 'Find Mechanics',
        customer: customer
    }
    const ModalData = {
        showmodal: toggle,
        openmodal: openmodal,
        updateAfterLogin: authenticateUser
    }

    const navlink = [
        { label: 'New Bikes', url: '/new-bikes', isLoginReq: false },
        { label: 'My Adds', url: '/my-adds', isLoginReq: false },
        { label: 'Bikers Forum', url: '/forum', isLoginReq: false }
    ]

    const DrawerList = (
        <>
            <Box sx={{ width: 250 }} role="presentation">

                <List>
                    <BuyandSell props={OptionBuySell} />
                    <Divider />
                    {
                        navlink.map((e: any, i: any) => {

                            if (e?.label == "My Adds" && customer == "not_login") return;

                            return (
                                !e.isLoginReq ?
                                    <>
                                        <Link className={styles.anchor} key={i} href={e.url}>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText style={{ marginLeft: "10px" }} primary={e.label} />
                                            </ListItemButton>
                                        </Link>
                                        <Divider />
                                    </>
                                    :
                                    <>
                                        <ListItemButton sx={{ pl: 4 }} onClick={() => goToRoute(e)} key={i}>
                                            <ListItemText style={{ marginLeft: "10px" }} primary={e.label} />
                                        </ListItemButton>
                                        <Divider />
                                    </>
                            )
                        })
                    }

                    <DealerList props={OptionFindDealer} />
                    <Divider />

                    <MechanicsList props={OptionFindMechanics} />
                    <Divider />

                    <Link href='/blog' className={styles.anchor}>
                        <ListItem sx={{ padding: 0 }} disablePadding>
                            <ListItemButton onClick={() => goToRoute({ url: "/blog" })}>
                                <ListItemText primary='Blog' />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider />

                    <MoreList props={Optionmore} />
                    <Divider />

                    {customer == 'not_login' ?
                        <LoginPopup
                            props={ModalData}
                            values={true}
                        />
                        : <></>}
                </List>
            </Box>

            <Typography className={styles.downloadapp}>
                Download Mobile App
                <Box className={styles.download_image}>
                    <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_fill,f_auto,q_auto,w_120,h_35/v1583472423/ebike-graphics/logos/google_logo_1.png" alt="App" />
                </Box>
            </Typography>
        </>
    );

    return (
        <>
            <Box className={styles.header_main}>
                <Box className={styles.logo_side}>

                    <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </Button>

                    <Drawer
                        className='header_drawer'
                        open={open}
                        onClose={toggleDrawer(false)}>

                        {DrawerList}

                    </Drawer>

                    <Box className={styles.logo}>
                        <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk" className={styles.logo_image} onClick={() => { router.push('/') }} />
                    </Box>

                </Box>

                <div className={styles.header_btn_sec}>

                    {customer == 'not_login' ?
                        "" :
                        <Link href="/used-bikes/sell-used-bike" className={styles.anchor}>
                            <button className={styles.sell_bike_btn} onClick={() => router.push('/used-bikes/sell-used-bike')}>
                                Sell Your Bike</button>
                        </Link>}

                    {customer == 'not_login' ?
                        <Box className={styles.header_buttons_group}>
                            <LoginPopup props={ModalData}/>
                        </Box>:

                        <p className={styles.logout_btn} onClick={() => LogoutUser()}> Logout </p>}

                </div>

            </Box>
        </>
    )
}

export default Header;
