import styles from './index.module.scss'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DealerinPakFilter } from './filter';
export const DealerInPakistan = () => {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }
    const DrawerList = (
        <Box className={styles.filter_drawer_main} role="presentation" onClick={toggleDrawer(false)}>
       <DealerinPakFilter/>
        </Box>
    );
    return (
        <div>
        <Button onClick={toggleDrawer(true)}>Fliter Drawer</Button>
        <Drawer open={open}>
            {DrawerList}
        </Drawer>
    </div>
    )
}
