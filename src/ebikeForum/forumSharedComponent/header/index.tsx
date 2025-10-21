'use client'
import { Box, Button, IconButton, InputBase, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
// import EditSquareIcon from '@mui/icons-material/EditSquare';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { isLoginUser } from "@/genericFunctions/geneFunc";
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuIcon from '@mui/icons-material/Menu';

// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import Create_thread_popup from "../thread_popup";
import { useEffect, useState } from "react";
import styles from './index.module.scss';

const Header = () => {
    const isMobile = useMediaQuery("(max-width:768px)")
    const [IsLogin, setIsLogin] = useState<any>('not_login')
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
        }
        else {
            console.log(`login data${_isLoginUser}`)
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
            // console.log(`login data${IsLogin?.userFullName}`)
        }
    }

    return (
        <Box className={styles.banner_box}>
            <img src="https://res.cloudinary.com/duiuzkifx/image/upload/q_10/v1592657594/staticFiles/1_forum_Main_Banner_Approved_iequ4c_jjijkf.jpg
" alt="" className={styles.image} />
            <Box className={styles.header_main}>
                <Box className={styles.header_container}>
                    <Box className={styles.content_box}>

                        <Box className={styles.logo_box}>
                            <img src="https://res.cloudinary.com/duiuzkifx/image/upload/v1592465223/staticFiles/logon_ayhmct.png " alt="" className={styles.logo_image} />
                        </Box>
                        <div className={styles.input_box} style={isMobile ? { display: 'flex' } : { display: 'flex' }}>
                            <input type="text" className={styles.input1} placeholder="Search" />
                            <button className={styles.btn}><SearchIcon /></button>
                        </div>
                        <div className={styles.thread_main_box}  style={{display: isMobile ? "none" : "flex"}}>
                            <Button
                                className={styles.thread_box}
                                onClick={handlepopup}
                                disableRipple
                            >
                                <EditCalendarIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread} onClick={handlepopup}>Create Thread</Typography>
                            </Button>
                            <Button
                                className={styles.thread_box}
                                onClick={handlepopup}
                                disableRipple
                            >
                                <LocalFireDepartmentIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread} >New</Typography>
                            </Button>
                            <Button
                                className={styles.thread_box}
                                onClick={handlepopup}
                                disableRipple
                            >
                                <FormatListBulletedOutlinedIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread} >Froum</Typography>
                            </Button>
                            <Button
                                className={styles.thread_box}
                                onClick={handlepopup}
                                disableRipple
                            >
                                <MoreHorizSharpIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread} >More</Typography>
                            </Button>
                        </div>
                        <div className={styles.thread_main_box} style={{display: isMobile ? "flex" : "none"}}>
                            <Button
                                className={styles.thread_box}
                                onClick={handlepopup}
                                disableRipple
                            >
                                <MenuIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                {/* <Typography className={styles.ct_thread} onClick={handlepopup}>Create Thread</Typography> */}
                            </Button>
                        </div>
                        <div className={styles.input_box}style={isMobile ? { display: 'none' } : { display: 'none' }}>
                            <input type="text" className={styles.input1} placeholder="Search" />
                            <button className={styles.btn}><SearchIcon /></button>
                        </div>
                    </Box>

                </Box>
            </Box>
            <Create_thread_popup open={open} setOpen={setOpen} IsLogin={IsLogin} />
        </Box>
    )
}
export default Header