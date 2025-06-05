'use client'
import { Box, Typography } from "@mui/material"
import styles from './index.module.scss'
import { useState } from "react"

const LoginForm = ()=>{
    const [Email , setEmail] = useState('');
    const [LoginPassword , setPassword] = useState('')
    const handleLogin = (e:any)=>{
        e.preventDefault()
        const obj = {
            Email,
            LoginPassword
        }
    }

    return(
        <Box className={styles.main}>
            <Box className={styles.container}>
                <form className={styles.form} onSubmit={handleLogin} >
                    <Typography className={styles.heading}>Login</Typography>
                    <input type="text" placeholder="Email" required className={styles.input} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" required className={styles.input} onChange={(e)=>setPassword(e.target.value)} />
                    <button className={styles.login_btn} type="submit" >Login</button>
                </form>
            </Box>
        </Box>
    )
}

export default LoginForm