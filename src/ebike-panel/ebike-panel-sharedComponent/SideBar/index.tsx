"use client"
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Collapse, Link, List, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { useParams, usePathname } from 'next/navigation';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import styles from './index.module.scss';

const SideBar = () => {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
    const [activeItem, setActiveItem] = useState<string>('');
    const [DashboardRoute, setDashboardRoute] = useState<string>('');
    useEffect(() => {
       const pathname = window.location.pathname
       setDashboardRoute(pathname)
        const current = pathname.split('/').pop() || '';
        console.log("data" , current , pathname)
        setActiveItem(current);
    }, []);

    const handleClick = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const GetList = (
        key: string,
        icon: string,
        heading: string,
        options: string[],
        urls: string[],
        optionIcon: string
    ) => {
        const isOpen = openSections[key] || false;
        const isParentActive = urls.some(url => url === activeItem);

        return (
            <List sx={{ width: '100%', padding: '0px', margin: '0px', color: 'black' }}>
                <ListItemButton
                    onClick={() => handleClick(key)}
                    sx={{
                        margin: '0px',
                        backgroundColor: isParentActive ? '#77b7e2' : '#3498db',
                        color: isParentActive ? 'white' : 'white',
                        '&:hover': {
                            // backgroundColor: isParentActive ? '#9ACD32' : '#dcf3bb'
                            backgroundColor: isParentActive ? '#77b7e2' : '#118adb'
                            // '&:hover': {
                                // backgroundColor: '#dcf3bb'  // <-- Your custom hover color
                            // }
                        }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: '40px', color: isParentActive ? 'white' : 'white' }}>
                        {icon === 'bike' ? <PedalBikeIcon /> : icon === 'shop' ? <PersonIcon /> : <ArticleIcon />}
                    </ListItemIcon>
                    <ListItemText primary={heading} />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                {options.map((e, index) => (
                    <Collapse key={index} in={isOpen} timeout="auto" unmountOnExit>
                        <Link
                            href={`/ebike-panel/dashboard/${urls[index]}`}
                            sx={{ textDecoration: 'none' }}
                            onClick={() => setActiveItem(urls[index])}
                        >
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{
                                        pl: 8,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: activeItem === urls[index] ? '#77b7e2' : 'transparent',
                                        color: activeItem === urls[index] ? 'white' : 'white',
                                        '&:hover': {
                                            backgroundColor: activeItem === urls[index] ? '#77b7e2' : '#118adb'
                                            // backgroundColor: 'red'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: '30px', color: activeItem === urls[index] ? 'white' : 'white'}}>
                                        {optionIcon == 'true' ? icon === 'bike' ? <PedalBikeIcon/> : <ArticleIcon /> : <LibraryAddCheckIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={e} />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                ))}
            </List>
        );
    };

    return (
        <div className={styles.main_sidebar} style={{backgroundColor:'#3498db'}} >
            <div className={styles.image_box}>
                {/* <div className={styles.admin_box}>eBike Admin</div> */}
                <img
                    src='https://res.cloudinary.com/dtroqldun/image/upload/c_thumb,dpr_auto,f_auto,h_40,w_auto,q_auto/v1541058800/ebike-graphics/logos/logo_ebike.pk.png'
                    alt=""
                    className={styles.image}
                />
            </div>

            <div className={styles.list}>
                <Link
                    href={`/ebike-panel/dashboard`}
                    sx={{ textDecoration: 'none' }}
                // onClick={() => setActiveItem('/')}
                >
                    <List component="div" disablePadding sx={{ backgroundColor: DashboardRoute == "/ebike-panel/dashboard" ? '#77b7e2' : "#3498db", color: 'black' }}>
                        <ListItemButton
                            // onClick={() => setActiveItem('')}
                            sx={{
                                margin: "0px",
                                backgroundColor: DashboardRoute == "/ebike-panel/dashboard" ? '#77b7e2' : "#3498db",
                                color: DashboardRoute == "/ebike-panel/dashboard" ? 'white' : "white",
                                '&:hover': {
                                    backgroundColor: DashboardRoute == "/ebike-panel/dashboard" ? '#77b7e2' : "#118adb"
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px', color: DashboardRoute == "/ebike-panel/dashboard" ? 'white' : "white" }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </List> 
                </Link>

                {GetList('usedBikes', 'bike', 'Used Bikes', ["Classified"], ["view-classified-ads"], 'false')}
                {GetList('newBikes', 'bike', 'New Bikes', ["Add New Bike", "All New Bikes"], ["add-new-bike", "all-new-bikes"], 'true')}
                {GetList('electricBikes', 'bike', 'Electric Bikes', ["Add Electric Bike", "All ELectric Bikes"], ["add-electric-bike", "all-electric-bikes"], 'true')}
                {GetList('blogs', 'blog', 'Blog', ["Add New Blog", 'Blog List'], ['create-blog-post', 'blog-list'], 'true')}
                {GetList('pages', 'blog', 'Pages', ["All Pages"], ["all-pages"], 'false')}
                {GetList('dealers', 'bike', 'Dealers/Mechanics', ["All Dealers", "All Mechanics"], ["all-dealers", "all-mechanics"], '')}
                {GetList('shop', 'shop', 'Shop', ["WorkShop", "Showroom"], ["workshop", "showroom"], '')}
                {GetList('general', 'shop', 'General', ["General"], ["general"], '')}
                {GetList('forum', 'bike', 'Bikers Forum', ["Forums"], ["forums"], '')}
                {GetList('users', 'shop', 'Users', ["Admin", "Manager"], ["admin-users", "manager-users"], '')}
                {GetList('qrDealers', 'shop', 'QR Dealers', ["Admin", "Manager"], ["qr-admin", "qr-manager"], '')}
            </div>
        </div>
    );
};

export default SideBar;