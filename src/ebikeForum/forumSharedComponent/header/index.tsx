'use client'
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { isLoginUser } from "@/genericFunctions/geneFunc";
import MenuIcon from '@mui/icons-material/Menu';

// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import Create_thread_popup from "../thread_popup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './index.module.scss';

const Header = () => {
    const isMobile = useMediaQuery("(max-width:768px)")
    const [IsLogin, setIsLogin] = useState<any>('not_login')
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

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
            // console.log(`login data${IsLogin?.userFullName}`)
        }
    }

    const submitSearch = () => {
        const parsed = searchTerm.trim();
        if (!parsed) {
            router.push("/forum");
            return;
        }
        router.push(`/forum?q=${encodeURIComponent(parsed)}`);
    };

    return (
        <Box className={styles.banner_box}>
            <img src="/images/forum/ebike-forum-banner.svg" alt="ebike forum banner" className={styles.image} />
            <Box className={styles.header_main}>
                <Box className={styles.header_container}>
                    <Box className={styles.content_box}>

                        <Box className={styles.logo_box}>
                            <img src="https://res.cloudinary.com/duiuzkifx/image/upload/v1592465223/staticFiles/logon_ayhmct.png " alt="" className={styles.logo_image} />
                        </Box>
                        <div className={styles.input_box}>
                            <input
                                type="text"
                                className={styles.input1}
                                placeholder="Search eBike forums"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") submitSearch();
                                }}
                            />
                            <button className={styles.btn} onClick={submitSearch}><SearchIcon /></button>
                        </div>
                        <div className={styles.thread_main_box} style={{ display: isMobile ? "none" : "flex" }}>
                            <Button
                                className={styles.thread_box}
                                onClick={handlepopup}
                                disableRipple
                            >
                                <EditCalendarIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread}>Create Thread</Typography>
                            </Button>
                            <Button
                                className={styles.thread_box}
                                onClick={() => router.push("/forum?sort=new")}
                                disableRipple
                            >
                                <LocalFireDepartmentIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread} >New</Typography>
                            </Button>
                            <Button
                                className={styles.thread_box}
                                onClick={() => router.push("/forum")}
                                disableRipple
                            >
                                <FormatListBulletedOutlinedIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread} >Forum</Typography>
                            </Button>
                            <Button
                                className={styles.thread_box}
                                onClick={() => router.push("/forum?sort=top")}
                                disableRipple
                            >
                                <MoreHorizSharpIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                <Typography className={styles.ct_thread} >Top</Typography>
                            </Button>
                        </div>
                        <div className={styles.thread_main_box} style={{ display: isMobile ? "flex" : "none" }}>
                            <Button
                                className={styles.thread_box}
                                onClick={handlepopup}
                                disableRipple
                            >
                                <MenuIcon sx={{ color: "white", marginRight: "4px", fontSize: "20px" }} />
                                {/* <Typography className={styles.ct_thread} onClick={handlepopup}>Create Thread</Typography> */}
                            </Button>
                        </div>
                    </Box>

                </Box>
            </Box>
            <Create_thread_popup open={open} setOpen={setOpen} IsLogin={IsLogin} />
        </Box>
    )
}
export default Header
