"use client"
import { Box, Button, Icon, InputAdornment, List, TextField } from '@mui/material'
import styles from './index.module.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import logo from './images.png'
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box className={styles.header_main}>
            <Box className={styles.logo_side}>
                <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}><MenuIcon /></Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <Box className={styles.logo}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRyK0VOYPEFJqNIKrG99anlIXq54TIWLJOg&s" alt="ebike.pk" className={styles.logo_image} />
                </Box>
            </Box>
            <Box className={styles.header_buttons_group}>
                <TextField
                    className={styles.header_input}
                    size="small"
                    placeholder="Search"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon className={styles.icons} />
                            </InputAdornment>
                        ),
                    }}
                />
                <LocationOnIcon className={styles.icons} />
                <GTranslateIcon className={styles.icons} />
                <LoginIcon className={styles.icons} />
            </Box>
        </Box>
    )
}

export default Header