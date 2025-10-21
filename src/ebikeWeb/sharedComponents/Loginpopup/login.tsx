"use client"
import { Avatar, Container, Divider, Grid, IconButton, InputAdornment, ListItem, ListItemButton, ListItemText, OutlinedInput, TextField, Typography } from '@mui/material'
import { validateEmail, userLogin } from "@/genericFunctions/geneFunc";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React, { useState, useEffect, useRef } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from 'next/link';

const jsCookie = require('js-cookie');
import GoogleLoginButton from '../googleLoginComp';

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPopup({props,values}: any) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [phoneLoading, setPhoneLoading] = useState(false)
  
 
  const [phone, setPhone] = useState("+923001234567"); // E.164 format
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"enter-phone" | "enter-otp" | "done">("enter-phone");
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // ✅ Initialize Facebook SDK
  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        appId: '1044746900622305', // your App ID
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
      (window as any).FB.AppEvents.logPageView();
    };

    // load SDK
    (function (d, s, id) {
      let js: HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0] as HTMLScriptElement;
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // ✅ Facebook Login Handler
  const handleFacebookLogin = () => {
    if (typeof window === "undefined") return;
    const FB = (window as any).FB;

    FB.login(
      (response: any) => {
        if (response.authResponse) {
          // Get user data
          FB.api('/me', { fields: 'name,email,picture' }, async (userInfo: any) => {
            console.log('Facebook user info:', userInfo);

            // example payload for backend login/signup
            const obj = {
              social_uid: userInfo.id,
              email: userInfo.email,
              userFullName: userInfo.name,
              signupType: "facebook",
              isVerified: true
            };

            // 🔽 Example backend call (adjust according to your API)
            // const res = await userSignup(obj);
            // if (res.token) {
            //   jsCookie.set('userInfo_e', JSON.stringify(res.user), { expires: 7 });
            //   jsCookie.set('accessToken_e', res.token, { expires: 7 });
            //   props.showmodal('showloginpopup');
            //   props.updateAfterLogin();
            //   window.location.reload();
            // }
          });
        } else {
          alert('Facebook login failed or cancelled.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

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

  // recaptcha for phone verification
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (recaptchaVerifierRef.current) return; // already initialized

    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth,
      recaptchaRef.current!,
      {
        size: "invisible",
      }
    );
  }, []);

  const sendCodePhone = async () => {
    try {
      setPhoneLoading(true)
      if (!recaptchaVerifierRef.current) throw new Error("reCAPTCHA missing");
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone.trim(),
        recaptchaVerifierRef.current
      );
      confirmationRef.current = confirmation;
      setStep("enter-otp");
    } catch (err: any) {
      alert(err?.message ?? "Failed to send code");
    } finally {
     setPhoneLoading(false)
    }
  };

  const verifyCodePhone = async () => {
    try {
      setPhoneLoading(true)
      
      if (!confirmationRef.current) throw new Error("No confirmation");
      
      const result = await confirmationRef.current.confirm(otp.trim());
      console.log('result 111', result)

      let obj = {
        social_uid: "" ,
        signupType: 'social',
        isVerified : true,
        userFullName: ""
      }

      // let res = await userSignup(obj)
      // console.log('res 111', res)

      // if(res.token && res.user) {
      //   let userObj = JSON.stringify(res.user)
      //   jsCookie.set('userInfo_e', userObj, {expires: 1})
      //   jsCookie.set('accessToken_e', res.token , {expires: 1})
      //   props.showmodal()
      //   props.updateAfterLogin()
      // }
      setStep("done");
    }
     catch (err: any) {
      alert(err?.message ?? "Invalid code");
    } finally {
      setIsLoading(false)
      // setLoading(false);
    }
  };
 
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
      <>
        <Box className={styles.login_main}>
          <Container className={styles.login_container}>
            <div className={styles.login_form}>
              <Grid>
                  <img className={styles.ebike_logo} src='https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png' />
                  <h2 className={styles.login_heading}>Sign in</h2>
              </Grid>

          
              {jsCookie.get("phone_login") == "yes" ? <div>
              <div className="space-y-3">
                <label className="block text-sm">Phone:</label>
                <input
                  className="w-full rounded border p-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+923001234567"
                />
                <button
                  onClick={sendCodePhone}
                  disabled={false}
                  className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
                >
                  {false ? "Sending..." : "Send Code"}
                </button>

            </div>

            <div className="space-y-3">
              <label className="block text-sm">Enter OTP:</label>
              <input
                className="w-full rounded border p-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
              />
              <button
                onClick={verifyCodePhone}
                disabled={false}
                className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
              >
                {false ? "Verifying..." : "Verify & Login"}
              </button>
              <button
                onClick={() => setStep("enter-phone")}
                className="w-full rounded border p-2"
              >
                Change Number
              </button>
            </div>


            </div> : "" }

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
              <Divider/>

              <div className={styles.google_box}>
                  <GoogleLoginButton  
                    showmodal = {() => props.showmodal('showloginpopup')}
                    updateAfterLogin = {() => props.updateAfterLogin()}
                  />
              </div>

              {/* ✅ Facebook Login */}
              <div className={styles.facebook_box}>
                <Button
                  onClick={handleFacebookLogin}
                  fullWidth
                  className={styles.fb_button}
                  sx={{ backgroundColor: "#1877F2", color: "#fff", mt: 2 }}
                >
                  Continue with Facebook
                </Button>
              </div>


              <Link href='/signup'  onClick={handlesignup}>
                <Button disabled={isLoading}  className={styles.signup_button} fullWidth> Signup for Ebike </Button>
              </Link>


            </div>
          </Container>
        </Box>



      </>
      </Modal>

      <span onClick={()=>props.showmodal('showloginpopup')} id="general_login_btn" style={{ visibility:"hidden" }}> login </span>
      <div id="recaptcha-container" ref={recaptchaRef} />
    </div>
  );
}
