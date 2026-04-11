"use client"
import React, {useState} from "react"
import { Button, TextField, Typography, Box, Container, InputAdornment, IconButton } from '@mui/material'
import styles from './index.module.scss'
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { validateEmail, userSignup } from "@/genericFunctions/geneFunc"
import { useRouter } from 'next/navigation'
import Link from "next/link"

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [notice, setNotice] = useState<{ type: 'error' | 'success', message: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const Router = useRouter()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handlesubmit = async (e:any) => {
        e.preventDefault()
        setNotice(null)

        if(!name || name.length < 4) {
            setNotice({ type: 'error', message: 'Please enter a valid name (min 4 characters).' })
            return
        }
        else if(!email || !validateEmail(email)) {
            setNotice({ type: 'error', message: 'Please enter a valid email address.' })
            return
        }
        else if(!password || password?.length < 6) {
            setNotice({ type: 'error', message: 'Password length must be greater than or equal to 6.' })
            return
        }
        else if (password !== confirmpassword) {
            setNotice({ type: 'error', message: 'Confirm password does not match.' })
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
            setNotice({
                type: 'success',
                message:
                    'Account created successfully. Verification link has been sent to your email — please verify your email to login.',
            })
            setTimeout(()=> {
                Router.push('/')
            }, 2000)
        }
        else {
          setNotice({ type: 'error', message: res.info })
        }
        
        console.log(res)
    }

    return (
        <Box className={styles.root}>
            <Container className={styles.container} maxWidth={false}>
                <div className={styles.card}>
                    <div className={styles.brand}>
                        <img
                            className={styles.logo}
                            src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png"
                            alt="Ebike"
                        />
                        <Typography component="h1" className={styles.title}>
                            Create your account
                        </Typography>
                        <Typography className={styles.subtitle}>
                            Please fill this form to create an account.
                        </Typography>
                    </div>

                    <div className={styles.content}>
                        <form className={styles.form} onSubmit={handlesubmit}>
                            <TextField
                                fullWidth
                                label="Full name"
                                size="small"
                                onChange={(e) => setName(e.target.value)}
                                className={styles.field}
                                required
                                autoComplete="name"
                                value={name}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                size="small"
                                className={styles.field}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                autoComplete="email"
                                value={email}
                            />

                            <TextField
                                label="Password"
                                size="small"
                                fullWidth
                                required
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
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
                                                {showPassword ? (
                                                    <VisibilityOff fontSize="small" />
                                                ) : (
                                                    <Visibility fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="Confirm password"
                                size="small"
                                fullWidth
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.field}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                                size="small"
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff fontSize="small" />
                                                ) : (
                                                    <Visibility fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {notice ? (
                                <Typography
                                    className={`${styles.notice} ${
                                        notice.type === "success" ? styles.noticeSuccess : styles.noticeError
                                    }`}
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {notice.message}
                                </Typography>
                            ) : null}

                            <Button
                                fullWidth
                                type="submit"
                                disabled={isLoading}
                                className={styles.primaryButton}
                            >
                                {isLoading ? "Creating…" : "Create account"}
                            </Button>
                        </form>

                        <div className={styles.footer}>
                            <Typography className={styles.footerText}>
                                Already have an account?
                            </Typography>
                            <Link className={styles.footerLink} href="/">
                                Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </Box>
    )
}

export default Signup;
