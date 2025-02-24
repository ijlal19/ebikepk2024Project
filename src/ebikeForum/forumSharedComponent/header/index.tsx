'use client'
import { Box, Button, IconButton, InputBase, Paper, TextField, Typography, useMediaQuery } from "@mui/material"
import styles from './index.module.scss'
import EditNoteIcon from '@mui/icons-material/EditNote';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { isLoginUser } from "@/ebikeForum/forumFunction/globalFuntions";
import Create_thread_popup from "../thread_popup";

const Header = () => {
    const isMobile = useMediaQuery("(max-width:600px)")
    const [IsLogin, setIsLogin] = useState<any>('not_login')
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            setIsLogin("not_login")
        }
    }, [])

    const handlepopup = () => {
        if (!IsLogin || IsLogin == "not_login" || IsLogin?.id == undefined) {
            alert('You must be logged in to post a thread.')
            return
        }
        else {
            setOpen(true);
        }
    }

    return (
        <Box className={styles.banner_box}>
            <img src="https://www.motorcycleforum.com/cdn-cgi/image/format=auto,onerror=redirect,quality=50,width=720,fit=scale-down/https://images.platforum.cloud/banners/motorcycleforum_com_banner_720w.jpg" alt="" className={styles.image} />
            <Box className={styles.header_main}>
                <Box className={styles.header_container}>
                    <Box className={styles.content_box}>

                        <Box className={styles.logo_box}>
                            <img src="https://images.platforum.cloud/logos/motorcycleforum_com.svg" alt="" className={styles.logo_image} />
                        </Box>
                        <Button
                            className={styles.thread_box}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "white-smoke",
                                color: "white",
                                padding: "8px 12px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                fontSize: "16px",
                                fontWeight: 'bolder'
                            }}
                            onClick={handlepopup}
                            disableRipple
                        >
                            <EditNoteIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                            <Typography sx={{ fontSize: "14px", color: "inherit", fontWeight: 'bolder' }} onClick={handlepopup}>Create Thread</Typography>
                        </Button>

                    </Box>
                    {/* {
                        !isMobile ? '' :
                            <Box className={styles.mobile_input}>
                                <Paper
                                    component="form"
                                    className={styles.input_box}
                                >
                                    <InputBase
                                        className={styles.input}
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Community"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Paper>
                            </Box>
                    } */}

                </Box>
            </Box>
                        <Create_thread_popup open={open} setOpen={setOpen} />
        </Box>
    )
}
export default Header