"use client"
import { Box, Button, List } from '@mui/material'
import styles from './index.module.scss'
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import NestedList from './moreOptions/more';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import ForumIcon from '@mui/icons-material/Forum';
import ArticleIcon from '@mui/icons-material/Article';

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(true);

    const handleClick = () => {
        setOptions(!options);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const obj = {
        togglers: handleClick,
        open: open,
        toggleDrawers: toggleDrawer,
        options: options
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {['Used Bikes', 'New Bike', 'Forums', 'Blog'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={toggleDrawer(false)}>
                            <ListItemIcon>
                                {index === 0 && <TwoWheelerIcon />}      {/* Used Bikes */}
                                {index === 1 && <ElectricBikeIcon />}    {/* New Bike */}
                                {index === 2 && <ForumIcon />}           {/* Forums */}
                                {index === 3 && <ArticleIcon />}         {/* Blog */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <NestedList props={obj} />
            <Divider />
            <List>
                    <ListItem key={'Login'} disablePadding>
                        <ListItemButton onClick={toggleDrawer(false)}>
                            <ListItemIcon>
                                <LoginIcon/>    
                            </ListItemIcon>
                            <ListItemText primary={'Login'} />
                        </ListItemButton>
                    </ListItem>
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