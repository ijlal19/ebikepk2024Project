"use client"
import { Box, Button, Link } from '@mui/material';
import { isLoginUser } from '../../../genericFunctions/geneFunc';
import { usePathname, useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginPopup from '../Loginpopup/login';
import Drawer from '@mui/material/Drawer';
import styles from './index.module.scss';
import Sidebar from './Sidebar';
import BottomBar from '@/ebikeWeb/sharedComponents/BottomBar/BottomBar'

const jsCookie = require('js-cookie');


const Header = () => {

    const pathname = usePathname();
    const router = useRouter();

    const [customer, setCustomer] = useState('not_login');
    const [isUsedBike, setIsUserBike] = useState(false);
    const [IsEbikePanel, setIsEbikePanel] = useState(false);
    const [openmodal, setOpenmodal] = useState(false);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        let URL = window.location.pathname
        authenticateUser()
        if (URL.includes('/used-bikes/')) {
            setIsUserBike(false)
        }
        else if (URL.includes('/used-bikes')) {
            setIsUserBike(true)
        }
        else if (URL.includes('/ebike-panel')) {
            setIsEbikePanel(true)
        }
        else if (URL.includes('/forum')) {
            setIsEbikePanel(true)
        }
        else {
            setIsUserBike(false)
        }
    }, [])

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const handleSearch = () => {
        if (!query.trim()) return; // ignore empty search
        const formattedQuery = query.trim().replace(/\s+/g, " ");
        router.push(`/search?query=${formattedQuery} `)
        // window.history.pushState({}, "", newUrl);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

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

    const toggle = (action: string) => {
        if (action === 'showloginpopup') setOpenmodal(current => !current);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        console.log('aaa', newOpen)
        setOpen(newOpen);
    };

    const ModalData = {
        showmodal: toggle,
        openmodal: openmodal,
        updateAfterLogin: authenticateUser
    }

    return (
        <>
            <Box className={`${isUsedBike ? styles.header_main_used_bike : styles.header_main}`} sx={{ display: IsEbikePanel ? "none" : "flex" }}>
                <Box className={styles.logo_side}>

                    <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </Button>

                    <Drawer
                        PaperProps={{ sx: {
                            borderRadius: '0 16px 16px 0',
                            borderRight: '1px solid #dce4ee',
                            boxShadow: 'inset 1px 0 0 #fff, 6px 0 20px rgba(25, 45, 75, 0.2), 2px 0 5px rgba(25, 45, 75, 0.1)',
                        } }}
                        open={open}
                        onClose={toggleDrawer(false)}>

                        <Sidebar
                            onClose={toggleDrawer(false)}
                            onLogin={() => setOpenmodal(true)}
                            onLogout={LogoutUser}
                            loggedIn={customer !== 'not_login'}
                            query={query}
                            onQueryChange={setQuery}
                            onSearch={handleSearch}
                        />

                    </Drawer>

                    <Box className={styles.logo}>
                        <img src="https://res.cloudinary.com/dzfd4phly/image/upload/c_limit,dpr_auto,f_auto,q_auto,w_180,fl_strip_profile/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk" className={styles.logo_image} onClick={() => { router.push('/') }} />
                    </Box>

                </Box>

                    <Box className={styles.search_box}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={styles.search_input}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className={styles.search_btn} onClick={handleSearch}>
                            <SearchIcon />
                        </button>
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
                            <LoginPopup props={ModalData} />
                        </Box> :

                        <p className={styles.logout_btn} onClick={() => LogoutUser()}> Logout </p>}

                </div>

            </Box>
            <BottomBar />
        </>
    )
}

export default Header;
