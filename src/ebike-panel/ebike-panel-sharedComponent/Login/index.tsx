'use client'
import { checkAuthAndRedirect, PostLogin } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { Box, Typography } from "@mui/material";
import Passcode_form from "../passcode_form";
import styles from './index.module.scss';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const jsCookie = require('js-cookie');

const LoginForm = () => {
    const [Email, setEmail] = useState('');
    const [LoginPassword, setPassword] = useState('')
    const [Login, setLogin] = useState(false)
    const router = useRouter()

    useEffect(() => {
      checkAuthAndRedirect(router)
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();

        if (Email === '') {
            alert('Please fill all required fields!');
            return;
        } else if (LoginPassword === '') {
            alert('Please fill all required fields!');
            return;
        }

        const obj = {
            email: Email,
            password: LoginPassword
        };

        const post_login = await PostLogin(obj);

        if (post_login?.login) {
            setLogin(true);

            const userData = {
                login: post_login?.login,
                accessToken: post_login?.accessToken,
                expiresIn: post_login?.expiresIn,
                role: post_login?.role,
                uid: post_login?.user?.id,
                name: post_login?.user?.userFullName
            };

            jsCookie.set('userData_ebike_panel', JSON.stringify(userData), { expires: 1 });

        } else {
            alert('Login details are not correct');
            setLogin(false);
        }
    };


    return (
        <Box className={styles.main}>
            <Box className={styles.container}>
                {
                    !Login ?
                        <form className={styles.form} onSubmit={handleLogin} >
                            <Typography className={styles.heading}>Login</Typography>
                            <input type="text" placeholder="Email" className={styles.input} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" className={styles.input} onChange={(e) => setPassword(e.target.value)} />
                            <button className={styles.login_btn} type="submit" >Login</button>
                        </form> :
                        <Passcode_form />
                }
            </Box>

        </Box>
    )
}

export default LoginForm