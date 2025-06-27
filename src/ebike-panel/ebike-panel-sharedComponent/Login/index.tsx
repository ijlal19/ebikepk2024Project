'use client'
import { checkAuthAndRedirect, PostLogin } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { Box, Button, Typography } from "@mui/material";
import Passcode_form from "../passcode_form";
import styles from './index.module.scss';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// const jsCookie = require('js-cookie');

let userData = {}

const LoginForm = () => {
    const [Email, setEmail] = useState('');
    const [LoginPassword, setPassword] = useState('')
    const [Login, setLogin] = useState(false)
    const router = useRouter()
    const pathname = window.location.pathname
    useEffect(() => {
      checkAuthAndRedirect(router , pathname)
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

             userData = {
                login: post_login?.login,
                accessToken: post_login?.accessToken,
                expiresIn: post_login?.expiresIn,
                role: post_login?.role,
                uid: post_login?.user?.id,
                name: post_login?.user?.userFullName
            };

            // jsCookie.set('userData_ebike_panel', JSON.stringify(userData), { expires: 1 });

        } else {
            alert('Login details are not correct');
            setLogin(false);
        }
    };


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {
                    !Login ?
                        <form className={styles.form} onSubmit={handleLogin} >
                            <h2 className={styles.heading}><AccountCircleIcon sx={{fontSize:'30px'}}/>Login</h2>
                            <input type="text" placeholder="Email" className={styles.input} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" className={styles.input} onChange={(e) => setPassword(e.target.value)} />
                            <Button className={styles.login_btn} type="submit" >Login</Button>
                        </form> :
                        <Passcode_form props={userData} />
                }
            </div>

        </div>
    )
}

export default LoginForm