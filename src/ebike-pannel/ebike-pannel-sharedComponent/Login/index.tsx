'use client'
import { Box, Typography } from "@mui/material";
import styles from './index.module.scss';
import { useState } from "react";
import { PostLogin } from "@/ebike-pannel/ebike-panel-Function/globalfunction";
import Passcode_form from "../passcode_form";
import Panel_header from "../panel-header";
const jsCookie = require('js-cookie');

const LoginForm = () => {
    const [Email, setEmail] = useState('');
    const [LoginPassword, setPassword] = useState('')
    const [Login, setLogin] = useState(false)


    const handleLogin = async (e: any) => {
        e.preventDefault();

        const obj = {
            email: Email,
            password: LoginPassword
        };

        const post_login = await PostLogin(obj);

        if (post_login?.login) {
            setLogin(true);

            const userData = {
                login : post_login?.login ,
                accessToken: post_login?.accessToken,
                expiresIn: post_login?.expiresIn,
                role: post_login?.role,
                uid: post_login?.user?.id,
                name: post_login?.user?.userFullName
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            jsCookie.set('accessToken_panel', post_login?.accessToken, { expires: 1 });

            console.log("data", userData);
        } else {
            setLogin(false);
        }
    };


    return (
        <Box className={styles.main}>
            <Panel_header />
            <Box className={styles.container}>
                {
                    !Login ?
                        <form className={styles.form} onSubmit={handleLogin} >
                            <Typography className={styles.heading}>Login</Typography>
                            <input type="text" placeholder="Email" required className={styles.input} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" required className={styles.input} onChange={(e) => setPassword(e.target.value)} />
                            <button className={styles.login_btn} type="submit" >Login</button>
                        </form> :
                        <Passcode_form />
                }
            </Box>

        </Box>
    )
}

export default LoginForm