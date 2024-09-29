import React from "react"
import { Avatar, Grid, Button, TextField, Typography, Box, Container, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import styles from './index.module.scss'
import { Visibility, VisibilityOff } from "@mui/icons-material"

const Signup = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmpassword, setConfirmPassword] = React.useState('')

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handlesubmit = (e:any) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            alert('Confirm Password not match')
        }
        else {

            const obj = {
                name: name,
                email: email,
                phone: phone,
                password: password,
                confirmpassword: confirmpassword
            }
            console.log(obj)
            alert("success")
            setName('')
            setEmail('')
            setPhone('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <Box className={styles.signup_main}>
            <Container className={styles.signup_container}>

                <form className={styles.signup_form} onSubmit={handlesubmit}>
                    <Grid>
                        <Avatar className={styles.heading_box}>
                        </Avatar>
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

                    <TextField fullWidth
                        placeholder="Phone Number"
                        size="small"
                        className={styles.signup_field}
                        required
                        onChange={(e) => { setPhone(e.target.value) }}
                        type="number"
                        value={phone}
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

                    <Button fullWidth type="submit" className={styles.button}> Sign Up</Button>

                </form>

            </Container>
        </Box>
    )
}

export default Signup;
