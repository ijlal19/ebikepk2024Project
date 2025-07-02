"use client"
import { Avatar, Container, Divider, Grid, IconButton, InputAdornment, ListItem, ListItemButton, ListItemText, OutlinedInput, TextField, Typography } from '@mui/material'
import { validateEmail, userLogin } from "@/genericFunctions/geneFunc";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React, { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from 'next/link';

const jsCookie = require('js-cookie');
import GoogleLoginButton from '../googleLoginComp';

export default function LoginPopup({props,values}: any) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
 

  useEffect(() => {

    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        appId: '1044746900622305', 
        cookie: true,
        xfbml: true,
        version: 'v23.0' 
      });

      (window as any).FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      let js: HTMLScriptElement;
      const fjs = d.createElement(s) as HTMLScriptElement;
      if (d.getElementById(id)) return;
      fjs.id = id;
      fjs.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.async = true;
      d.getElementsByTagName("head")[0].appendChild(fjs);
    })(document, "script", "facebook-jssdk");
  }, []);


 
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')

    if(!email || !validateEmail(email)) {
      setError('Please Enter Valid Email')
      return
    }
    else if(!password || password?.length < 6) {
      setError('Password length must be greather or equal to 6')
      return
    }
    
    let obj = {
      email: email,
      password: password
    }

    setIsLoading(true)
    let res = await userLogin(obj)
    setIsLoading(false)

    if(res.success && res.login) {
      let userObj = JSON.stringify(res.user)
      jsCookie.set('userInfo_e', userObj, {expires: 7})
      jsCookie.set('accessToken_e', res.accessToken, {expires: 7})
      props.showmodal('showloginpopup')
      props.updateAfterLogin()
      window.location.reload()
    }
    else {
      setError(res.info)
    }
  }
  const handlesignup =()=> {
    props.showmodal('showloginpopup')
  }

  const handleFacebookLogin = () => {
    console.log('aasadad');
    (window as any).FB.login(
      (response:any) => {
        if (response.authResponse) {
          console.log('User logged in successfully:', response);
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile' }
    );
  };

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

              {/* <Button disabled={isLoading} className={styles.reset_password} >Reset Password</Button> */}
              <Button disabled={isLoading} className={styles.button} fullWidth onClick={(e)=> handleSubmit(e) }>Sign in</Button>

              {/* <div style={{ margin:"10px auto", textAlign:"center" }}>
                  <FacebookLogin
                    appId="217553265854765"
                    autoLoad={false}
                    fields="name,email"
                    scope="public_profile,user_friends,user_actions.books"
                    callback={responseFacebook}
                  />
              </div> */}

              {/* <button onClick={handleLogin} > Login with Facebook </button> */}
              
              <Divider/>

              <button id="login_with_FB" onClick={handleFacebookLogin}>Login with Facebook</button>

              <div className={styles.google_box}>
                  <GoogleLoginButton  
                    showmodal = {() => props.showmodal('showloginpopup')}
                    updateAfterLogin = {() => props.updateAfterLogin()}
                  />
              </div>

              <Link href='/signup'  onClick={handlesignup}>
                <Button disabled={isLoading}  className={styles.signup_button} fullWidth> Signup for Ebike </Button>
              </Link>


            </div>
          </Container>
        </Box>
      </Modal>

      <span onClick={()=>props.showmodal('showloginpopup')} id="general_login_btn" style={{ visibility:"hidden" }}> login </span>

    </div>
  );
}
