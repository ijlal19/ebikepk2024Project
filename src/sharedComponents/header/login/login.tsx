"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Login from '@/pageLayouts/login';
import { Avatar,Container, Grid, IconButton, InputAdornment, ListItem, ListItemButton, ListItemText, OutlinedInput, TextField } from '@mui/material'
import styles from './index.module.scss'
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
background:'white',
  border: '2px solid #000',
  boxShadow: 24,
  height:'auto',
//   p: 4,
};

export default function BasicModal({values}:any) {
  const [openmodal, setOpenmodal] = React.useState(false);
  const handleOpen = () => setOpenmodal(true);
  const handleClose = () => {
    setOpenmodal(false);}
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
    <div>
      {
        values ?
        <ListItem sx={{ padding: 0 }} disablePadding> <ListItemButton onClick={handleOpen}> <ListItemText primary='Login' onClick={handleOpen}/></ListItemButton></ListItem>:<span className={styles.login_btn}  onClick={handleOpen}>
        <LoginIcon className={styles.icons}/> Login
    </span>
      }
      
      <Modal
        open={openmodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
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
      </Modal>
    </div>
  );
}
