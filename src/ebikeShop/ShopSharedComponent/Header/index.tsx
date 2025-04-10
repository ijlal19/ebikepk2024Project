"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { getShopMainCategory } from '@/ebikeShop/Shopfunctions/globalFuntions';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const TopbarCategory = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    const router = useRouter()

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const res = await getShopMainCategory()
        setData(res)
    }

    function goToRoute(data: any) {
        let urlTitle = '' + data?.name.toLowerCase().replaceAll(' ', '-')
        router.push(`/shop/collection/${urlTitle}/${data?.id}`)
        console.log("data" , data)
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <>
            <Box sx={{ width: 250 }} className={styles.drawer} role="presentation">
                <List>
                    <Divider />
                    {data?.slice(0, 7).map((data: any, index: any) => {
                        return (
                            <>
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => goToRoute(data)}  sx={{ paddingTop:"0px",paddingBottom:"0px"}} >
                                        <ListItemText primary={data?.name} className={styles.listText}  sx={{marginTop:"0px",marginBottom:"0px" }} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </>
                        )
                    })}
                </List>
            </Box>
        </>
    );

    return (
        <Box className={styles.headers_main}>

            <Box className={styles.Input_box}>
                <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} placeholder="Search..." />
                    <SearchIcon className={styles.searchIcon} />
                </div>
            </Box>
            <Box>
            <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                <MenuIcon />
            </Button>
            </Box>

            <Drawer className={`${styles.drawer} header_drawer`}anchor="right"  open={open} onClose={toggleDrawer(false)} >
                {DrawerList}
            </Drawer>
            </Box>
    );
};

export default TopbarCategory;