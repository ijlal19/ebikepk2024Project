"use client"
import React, {useState, useEffect} from "react"
import { Avatar, Grid, Button, TextField, Typography, Box, Container, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import styles from './index.module.scss'
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { validateEmail, userSignup, changePassword } from "@/genericFunctions/geneFunc"
import { useRouter } from 'next/navigation'
import { useParams } from "next/navigation";

const ChangePass = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [usedId, setUserId] = useState("")

    const Router = useRouter()
    const params = useParams();

    useEffect(() => {
        if (!params) {
            Router.push("/")
        };
        const id = params.id;
        const token = params.token;
        if(!id) {
            Router.push("/")
        }
        else {
            setUserId(id)   
        }
    }, [params]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handlesubmit = async (e:any) => {
        e.preventDefault()
        setError('')

        if(!password || password?.length < 6) {
            setError('Password length must be greather or equal to 6')
            return
        }
        else if (password !== confirmpassword) {
            setError('Confirm Password not match')
            return
        }

        let obj = {
            userId: usedId,
            password: password,
        }

        setIsLoading(true)
        let res = await changePassword(obj)
        setIsLoading(false)

        if(res.success) {
            setError('Password Updated successfully.')
            setTimeout(()=> {
                Router.push('/')
            }, 2000)
        }
        else {
          setError(res.message)
        }
    }

    return (
        <Box className={styles.signup_main}>
            <Container className={styles.signup_container}>

                <div className={styles.signup_form} >
                    <Grid>
                        <img className={styles.ebike_logo} src='https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png' />
                        <h2 className={styles.signup_heading}>Change Password</h2>
                    </Grid>
                    

                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        size='small'
                        value={password}
                        fullWidth
                        className={styles.signup_field}
                        placeholder='Password*'
                        onChange={(e) => { setPassword(e.target.value) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    <OutlinedInput
                        id="confirm password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        size='small'
                        value={confirmpassword}
                        fullWidth
                        className={styles.signup_field}
                        placeholder='Confirm Password*'
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    <Typography className={ styles.error} style={error?.indexOf('Successfully') > -1 ?  { color:"green"} : {}} >  { error } </Typography>

                    <Button fullWidth type="submit" className={`${styles.button} ${isLoading ? 'noPointerEvent':''} `} onClick={(e) => handlesubmit(e)} > Change password </Button>

                </div>

            </Container>
        </Box>
    )
}

export default ChangePass;
