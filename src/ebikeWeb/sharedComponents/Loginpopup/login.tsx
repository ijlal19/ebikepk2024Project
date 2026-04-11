"use client"
import { Divider, IconButton, InputAdornment, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import { validateEmail, userLogin, resetPassword } from "@/genericFunctions/geneFunc";
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
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
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPopup({props,values}: any) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [phoneLoading, setPhoneLoading] = useState(false)
  const [isForgotPass, setIsForgotPass] = useState(false)
 
  const [phone, setPhone] = useState("+923001234567"); // E.164 format
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"enter-phone" | "enter-otp" | "done">("enter-phone");
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!props?.openmodal) return;
    setError('');
    setIsForgotPass(false);
    setShowPassword(false);
    setPassword('');
    setOtp('');
    setStep('enter-phone');
  }, [props?.openmodal]);

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
      setPhoneLoading(false)
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
  const handlesignup = () => {
    props.showmodal('showloginpopup')
  }

  const handleResetPass  = async () => {
      if(!email || !validateEmail(email)) {
        setError('Please Enter Valid Email')
        return
      }

      let obj = {
        email: email,
      }

      setIsLoading(true)

      let res = await resetPassword(obj)
      setIsLoading(false)

      if(res.success) {
       
      }
      else {
         setError(res.message)
      }

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
        aria-labelledby="ebike-login-title"
        aria-describedby="ebike-login-description"
        BackdropProps={{ className: styles.backdrop }}
      >
        <Box className={styles.modalRoot}>
          <Box className={styles.card}>
            <IconButton
              className={styles.closeBtn}
              aria-label="Close"
              onClick={() => props.showmodal('showloginpopup')}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>

            <div className={styles.brand}>
              <img
                className={styles.logo}
                src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png"
                alt="Ebike"
              />
              <Typography id="ebike-login-title" className={styles.title} component="h2">
                {isForgotPass ? "Forgot password" : "Sign in"}
              </Typography>
              <Typography id="ebike-login-description" className={styles.subtitle}>
                {isForgotPass ? "We’ll email you a reset link." : "Welcome back. Please enter your details."}
              </Typography>
            </div>

            <div className={styles.content}>
              {!isForgotPass ? (
                <>
                  {jsCookie.get("phone_login") === "yes" ? (
                    <div className={styles.phoneBlock}>
                      {step === "enter-phone" ? (
                        <>
                          <TextField
                            label="Phone number"
                            size="small"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+923001234567"
                            className={styles.field}
                          />
                          <Button
                            disabled={phoneLoading}
                            className={styles.secondaryButton}
                            fullWidth
                            onClick={sendCodePhone}
                          >
                            {phoneLoading ? "Sending…" : "Send code"}
                          </Button>
                        </>
                      ) : step === "enter-otp" ? (
                        <>
                          <TextField
                            label="OTP"
                            size="small"
                            fullWidth
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            className={styles.field}
                          />
                          <Button
                            disabled={phoneLoading}
                            className={styles.secondaryButton}
                            fullWidth
                            onClick={verifyCodePhone}
                          >
                            {phoneLoading ? "Verifying…" : "Verify & login"}
                          </Button>
                          <Button
                            className={styles.textButton}
                            fullWidth
                            onClick={() => setStep("enter-phone")}
                          >
                            Change number
                          </Button>
                        </>
                      ) : (
                        <Typography className={styles.success}>Phone verified. You can close this window.</Typography>
                      )}

                      <Divider className={styles.divider}>
                        <span className={styles.orText}>or</span>
                      </Divider>
                    </div>
                  ) : null}

                  <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField
                      label="Email"
                      size="small"
                      fullWidth
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.field}
                    />

                    <TextField
                      label="Password"
                      size="small"
                      fullWidth
                      required
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              onClick={handleClickShowPassword}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {error ? (
                      <Typography className={styles.error} role="alert" aria-live="polite">
                        {error}
                      </Typography>
                    ) : null}

                    <Button disabled={isLoading} className={styles.primaryButton} fullWidth type="submit">
                      {isLoading ? "Signing in…" : "Sign in"}
                    </Button>
                  </form>

                  <div className={styles.google_box}>
                    <GoogleLoginButton
                      showmodal={() => props.showmodal('showloginpopup')}
                      updateAfterLogin={() => props.updateAfterLogin()}
                    />
                  </div>

                  <div className={styles.footer}>
                    <Button onClick={() => setIsForgotPass(true)} className={styles.textButton}>
                      Forgot password?
                    </Button>
                    <Link href="/signup" onClick={handlesignup}>
                      <Button disabled={isLoading} className={styles.textButton}>
                        Create account
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleResetPass(); }}>
                  <TextField
                    label="Email"
                    size="small"
                    fullWidth
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.field}
                  />

                  {error ? (
                    <Typography className={styles.error} role="alert" aria-live="polite">
                      {error}
                    </Typography>
                  ) : null}

                  <Button disabled={isLoading} className={styles.primaryButton} fullWidth type="submit">
                    {isLoading ? "Submitting…" : "Submit"}
                  </Button>

                  <Button onClick={() => setIsForgotPass(false)} className={styles.textButton} fullWidth>
                    Back to login
                  </Button>
                </form>
              )}
            </div>
          </Box>
        </Box>
      </Modal>

      <span onClick={()=>props.showmodal('showloginpopup')} id="general_login_btn" style={{ visibility:"hidden" }}> login </span>
      <div id="recaptcha-container" ref={recaptchaRef} />
    </div>
  );
}
