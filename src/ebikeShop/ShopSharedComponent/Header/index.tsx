"use client"
import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { getShopMainCategory } from '@/ebikeShop/Shopfunctions/globalFuntions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge, { BadgeProps } from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
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
        console.log("data", data)
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
                                    <ListItemButton onClick={() => goToRoute(data)} sx={{ paddingTop: "0px", paddingBottom: "0px" }} >
                                        <ListItemText primary={data?.name} className={styles.listText} sx={{ marginTop: "0px", marginBottom: "0px" }} />
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

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }:any) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
          padding: '0 4px',
        },
      }));

      const handleCart =()=>{
        router.push('/shop/cart')
    }


    return (
        <Box className={styles.headers_main}>

            <Box className={styles.Input_box}>
                <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} placeholder="Search..." />
                    <SearchIcon className={styles.searchIcon} />
                </div>
            </Box>
            <Box>
                <IconButton aria-label="cart"  className={styles.cart_button} onClick={()=>handleCart()}>
                    <StyledBadge badgeContent={1} color="primary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                <Button className={styles.menu_button} disableRipple onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </Button>
            </Box>

            <Drawer className={`${styles.drawer} header_drawer`} anchor="right" open={open} onClose={toggleDrawer(false)} >
                {DrawerList}
            </Drawer>
        </Box>
    );
};

export default TopbarCategory;