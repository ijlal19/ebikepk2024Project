"use client"
import {  Collapse, List, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import styles from './index.module.scss';

const SideBar = () => {

    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    const handleClick = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const GetList = (key: string, icon: string, heading: string, options: string[]) => {
        const isOpen = openSections[key] || false;

        return (
            <List sx={{ width: '100%', padding: '0px', margin: '0px', backgroundColor: 'black', color: 'white' }}>
                <ListItemButton onClick={() => handleClick(key)} sx={{ margin: '0px' }}>
                    <ListItemIcon sx={{ minWidth: '40px', color: 'white' }}>
                        {icon === 'bike' ? <PedalBikeIcon /> : icon === 'shop' ? <PersonIcon /> : <ArticleIcon />}
                    </ListItemIcon>
                    <ListItemText primary={heading} />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {options.map((e, index) => (
                    <Collapse key={index} in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 8 }}>
                                <ListItemText primary={e} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                ))}
            </List>
        );
    };

    return (
        <div className={styles.main_sidebar}>
            <div className={styles.image_box}>
                <div className={styles.admin_box}>eBike Admin</div>
                <img src='https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png' alt="" className={styles.image} />
            </div>
            <div className={styles.list}>
                <List component="div" disablePadding sx={{ backgroundColor: 'black', color: 'white' }}>
                    <ListItemButton onClick={() => handleClick("dashboard")} sx={{ margin: "0px" }}>
                        <ListItemIcon sx={{ minWidth: '40px', color: 'white' }}>
                            <HomeIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </List>
                {GetList('usedBikes', 'bike', 'Used Bikes', ["All Used Bikes", "Sell & Buy"])}
                {GetList('newBikes', 'bike', 'New Bikes', ["All New Bikes", "Sell & Buy"])}
                {GetList('blogs', 'blog', 'Blog', ["All Blogs"])}
                {GetList('pages', 'blog', 'Pages', ["All Pages"])}
                {GetList('dealers', 'bike', 'Dealers/Mechanics', ["All Dealers", "All Mechanics"])}
                {GetList('shop', 'shop', 'Shop', ["WorkShop", "Showroom"])}
                {GetList('general', 'shop', 'General', ["General"])}
                {GetList('forum', 'bike', 'Bikers Forum', ["Forums"])}
                {GetList('users', 'shop', 'Users', ["Admin", "Manager"])}
                {GetList('qrDealers', 'shop', 'QR Dealers', ["Admin", "Manager"])}
            </div>
        </div>
    )
}

export default SideBar;
