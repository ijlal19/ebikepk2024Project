"use client"
import { Avatar, Box, Button, Container, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import styles from './index.module.scss'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const obj = {
      email: email,
      password: password
    }
    console.log(obj)
    alert("success")
    setEmail('')
    setPassword('')
  }

  return (
    <Box className={styles.login_main}>
      <Container className={styles.login_container}>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <Grid>
            <Avatar className={styles.heading_box}>
            </Avatar>
            <h2 className={styles.login_heading}>Sign in</h2>
          </Grid>

          <TextField
            placeholder='Email*'
            size="small"
            fullWidth
            type='email'
            required
            className={styles.login_field}
            onChange={(e) => { setEmail(e.target.value) }}
            value={email} />

          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            size='small'
            value={password}
            fullWidth
            className={styles.login_field}
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

          <Button className={styles.button} type='submit' fullWidth>Sign in</Button>
          <Button className={styles.reset_password} >Reset Password</Button>

        </form>
      </Container>
    </Box>
  )
}

export default Login
