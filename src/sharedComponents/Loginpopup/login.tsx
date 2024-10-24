"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar, Container, Divider, Grid, IconButton, InputAdornment, ListItem, ListItemButton, ListItemText, OutlinedInput, TextField, Typography } from '@mui/material'
import styles from './index.module.scss'
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Link from 'next/link';
import { validateEmail } from "@/functions/globalFuntions"



export default function LoginPopup({props,values}: any) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 const  [error, setError] = useState('')
 
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')

    if(!email || !validateEmail(email)) {
      setError('Please Enter Valid Email')
    }
    else if(!password || password?.length < 6) {
      setError('Password length must be greather or equal to 6')
      return
    }
    
    let obj = {
      email: email,
      password: password
    }

    console.log(obj)
  
  }
  const handlesignup =()=>{
    // props.toggleDrawers(false);
    props.showmodal('showloginpopup')
  }
  return (
    <div>
      {
        values ?
          <ListItem sx={{ padding: 0 }} disablePadding className={styles.login_buttons_group}>
            <ListItemButton onClick={()=>props.showmodal('showloginpopup')} disableRipple  className={styles.login_button}>
              <ListItemText primary='Login' onClick={()=>props.showmodal('showloginpopup')} />
            </ListItemButton>
          </ListItem> :
          <span className={styles.login_icon} onClick={()=>props.showmodal('showloginpopup')}>
            <LoginIcon className={styles.icons} /> Login
          </span>
      }

      <Modal
        open={props.openmodal}
        onClose={()=>props.showmodal('showloginpopup')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box className={styles.login_main}>
          <Container className={styles.login_container}>
            <div className={styles.login_form}>
              <Grid>
                  <img className={styles.ebike_logo} src='https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png' />
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
                value={email} 
              />

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

              <Typography className={ styles.error } >  { error } </Typography>

              <Button className={styles.reset_password} >Reset Password</Button>
              <Button className={styles.button} fullWidth onClick={(e)=> handleSubmit(e) }>Sign in</Button>

              <Divider/>

              <Link href='/signup'  onClick={handlesignup}>
                <Button className={styles.signup_button} fullWidth>Signup for Ebike</Button>
              </Link>
            </div>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
