"use client"
import { IconButton, InputAdornment, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import { CUSTOMER_AUTH_COOKIE_DAYS, validateEmail, userLogin, resetPassword } from "@/genericFunctions/geneFunc";
import { Close, EmailOutlined, Google, PhoneIphone, Visibility, VisibilityOff } from '@mui/icons-material'
import React, { useState, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from 'next/link';

const jsCookie = require('js-cookie');
import GoogleLoginButton from '../googleLoginComp';

type LoginMode = 'email' | 'gmail' | 'phone';

export default function LoginPopup({props,values}: any) {
  
  const [loginMode, setLoginMode] = useState<LoginMode>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [phoneLoading, setPhoneLoading] = useState(false)
  const [isForgotPass, setIsForgotPass] = useState(false)
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"enter-phone" | "enter-otp">("enter-phone");

  useEffect(() => {
    if (!props?.openmodal) return;
    setError('');
    setIsForgotPass(false);
    setShowPassword(false);
    setPassword('');
    setOtp('');
    setStep('enter-phone');
    setLoginMode('email');
  }, [props?.openmodal]);

  const saveCustomerSession = (res: any) => {
    let userObj = JSON.stringify(res.user)
    jsCookie.set('userInfo_e', userObj, {expires: CUSTOMER_AUTH_COOKIE_DAYS})
    jsCookie.set('accessToken_e', res.accessToken, {expires: CUSTOMER_AUTH_COOKIE_DAYS})
    props.showmodal('showloginpopup')
    props.updateAfterLogin()
    window.location.reload()
  }

  const sendCodePhone = async () => {
    const cleanPhone = phone.trim();
    setError('')

    if (!cleanPhone || cleanPhone.replace(/[^\d]/g, '').length < 10) {
      setError('Please enter a valid phone number')
      return
    }

    try {
      setPhoneLoading(true)
      const res = await userLogin({
        phoneNumber: cleanPhone,
        signupType: 'phone-number'
      });

      if (res?.success && res?.otpSent !== false) {
        setStep("enter-otp");
      }
      else {
        setError(res?.info || res?.message || 'Failed to send OTP')
      }
    } catch (err: any) {
      setError(err?.message ?? "Failed to send OTP");
    } finally {
     setPhoneLoading(false)
    }
  };

  const verifyCodePhone = async () => {
    const cleanPhone = phone.trim();
    const cleanOtp = otp.trim();
    setError('')

    if (!cleanOtp) {
      setError('Please enter OTP')
      return
    }

    try {
      setPhoneLoading(true)

      const res = await userLogin({
        phoneNumber: cleanPhone,
        signupType: 'phone-number',
        otp: cleanOtp
      });

      if(res?.success && res?.login) {
        saveCustomerSession(res)
      }
      else {
        setError(res?.info || res?.message || 'Invalid OTP')
      }
    }
     catch (err: any) {
      setError(err?.message ?? "Invalid OTP");
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
      saveCustomerSession(res)
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
                {isForgotPass ? "We'll email you a reset link." : "Choose how you want to continue."}
              </Typography>
            </div>

            <div className={styles.content}>
              {!isForgotPass ? (
                <>
                  <div className={styles.modeSwitch} aria-label="Login options">
                    {[
                      { key: 'email', label: 'Email', icon: <EmailOutlined fontSize="small" /> },
                      { key: 'gmail', label: 'Gmail', icon: <Google fontSize="small" /> },
                      { key: 'phone', label: 'Phone', icon: <PhoneIphone fontSize="small" /> },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className={`${styles.modeButton} ${loginMode === item.key ? styles.activeMode : ''}`}
                        onClick={() => {
                          setLoginMode(item.key as LoginMode);
                          setError('');
                        }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {loginMode === 'email' ? (
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
                        {isLoading ? "Signing in..." : "Sign in"}
                      </Button>
                    </form>
                  ) : null}

                  {loginMode === 'gmail' ? (
                    <div className={styles.googlePanel}>
                      <GoogleLoginButton
                        showmodal={() => props.showmodal('showloginpopup')}
                        updateAfterLogin={() => props.updateAfterLogin()}
                      />
                    </div>
                  ) : null}

                  {loginMode === 'phone' ? (
                    <div className={styles.phoneBlock}>
                      {step === "enter-phone" ? (
                        <>
                          <TextField
                            label="Phone number"
                            size="small"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="03001234567"
                            autoComplete="tel"
                            className={styles.field}
                          />
                          {error ? (
                            <Typography className={styles.error} role="alert" aria-live="polite">
                              {error}
                            </Typography>
                          ) : null}
                          <Button
                            disabled={phoneLoading}
                            className={styles.primaryButton}
                            fullWidth
                            onClick={sendCodePhone}
                          >
                            {phoneLoading ? "Sending..." : "Send OTP"}
                          </Button>
                        </>
                      ) : (
                        <>
                          <TextField
                            label="OTP"
                            size="small"
                            fullWidth
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            inputProps={{ inputMode: 'numeric' }}
                            className={styles.field}
                          />
                          {error ? (
                            <Typography className={styles.error} role="alert" aria-live="polite">
                              {error}
                            </Typography>
                          ) : null}
                          <Button
                            disabled={phoneLoading}
                            className={styles.primaryButton}
                            fullWidth
                            onClick={verifyCodePhone}
                          >
                            {phoneLoading ? "Verifying..." : "Verify & login"}
                          </Button>
                          <Button
                            className={styles.textButton}
                            fullWidth
                            onClick={() => {
                              setStep("enter-phone");
                              setOtp('');
                              setError('');
                            }}
                          >
                            Change number
                          </Button>
                        </>
                      )}
                    </div>
                  ) : null}

                  <div className={styles.footer}>
                    <Button onClick={() => setIsForgotPass(true)} className={styles.textButton} disabled={loginMode !== 'email'}>
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
                    {isLoading ? "Submitting..." : "Submit"}
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
    </div>
  );
}
