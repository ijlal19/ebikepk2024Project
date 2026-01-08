"use client"
import React, {useState} from "react"
import { Avatar, Grid, Button, TextField, Typography, Box, Container, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import styles from './index.module.scss'
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { validateEmail, userSignup } from "@/genericFunctions/geneFunc"
import { useRouter } from 'next/navigation'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const Router = useRouter()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handlesubmit = async (e:any) => {
        e.preventDefault()
        setError('')

        if(!name || name.length < 4) {
            setError('Please Enter Valid Name')
            return
        }
        else if(!email || !validateEmail(email)) {
            setError('Please Enter Valid Email')
        }
        else if(!password || password?.length < 6) {
            setError('Password length must be greather or equal to 6')
            return
        }
        else if (password !== confirmpassword) {
            setError('Confirm Password not match')
            return
        }

        let obj = {
            userFullName: name,
            email: email,
            password: password,
            confirmpassword: password,
            isVerified: false
        }

        setIsLoading(true)
        let res = await userSignup(obj)
        setIsLoading(false)

        if(res.success) {
            // setError('Account Created Successfully!. Verification Link has been sent to your Email. Please Verify your Email address for login.')
            setError('Account Created Successfully!')
            setTimeout(()=> {
                Router.push('/')
            }, 2000)
        }
        else {
          setError(res.info)
        }
        
        console.log(res)
    }

    return (
        <Box className={styles.signup_main}>
            <Container className={styles.signup_container}>

                <div className={styles.signup_form} >
                    <Grid>
                        <img className={styles.ebike_logo} src='https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png' />
                        <h2 className={styles.signup_heading}>Sign Up</h2>
                        <Typography variant='caption' > Please fill this form to create an account  !</Typography>
                    </Grid>
                    
                    <TextField fullWidth
                        placeholder="Name"
                        size="small"
                        onChange={(e) => { setName(e.target.value) }}
                        className={styles.signup_field}
                        required
                        value={name}
                    />

                    <TextField fullWidth
                        placeholder="Email address"
                        size="small"
                        className={styles.signup_field}
                        required
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        value={email}
                    />

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

                    <Typography className={ styles.error} style={error?.indexOf('Account Created Successfully') > -1 ?  { color:"green"} : {}} >  { error } </Typography>

                    <Button fullWidth type="submit" className={`${styles.button} ${isLoading ? 'noPointerEvent':''} `} onClick={(e) => handlesubmit(e)} > Sign Up</Button>

                </div>

            </Container>
        </Box>
    )
}

export default Signup;
