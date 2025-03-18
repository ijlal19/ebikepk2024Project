'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import  styles from  './index.module.scss';
import { useState } from "react";

const ContactUS = () => {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState('')

  const HandleSubmit =(e)=>{
    e.preventDefault()
   const  obj={
      name:name,
      email:email,
      message:message
    }
    console.log(obj)
    setName('')
    setEmail('')
    setMessage('')
  }
  return (
   <Box className={styles.contactus_main}>
    <Box className={styles.contact_container}>
      <Box className={styles.contact_data}>
        <Typography className={styles.contact_logo}>
          <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk"  className={styles.logo_Image}/>
        </Typography>
        <Typography className={styles.contact_paragraph}>
        Dont Hesitate to Call Our ebike.pk Expert for Mototrcycle,Parts & Accessories related Queries & get an expert advice.
        <Typography className={styles.contact_phone}>
          021-35396999
        </Typography>
        <Typography className={styles.contact_ebike}>ebike.pk</Typography>
        <Typography className={styles.contact_address}>Khayaban-e-Jami, Phase II Ext, DHA, karachi</Typography>
        <Typography className={styles.contact_day}>Monday to friday</Typography>
        <Typography className={styles.contact_time}>10:00AM to 05:00PM</Typography>
        </Typography>
      </Box>
      <Box className={styles.contact_form}>
      <Typography className={styles.contact_heading}>
         Contact Us
        </Typography>
        <form className={styles.form_group} onSubmit={HandleSubmit}>
          <TextField 
          size="small"
          placeholder="Name"
          fullWidth
          required
          type="text"
          value={name}
          className={styles.contact_form_input}
          onChange={(e)=>setName(e.target.value)}
          />
          <TextField 
          size="small"
          placeholder="Email"
          fullWidth
          required
          type="email"
          value={email}
          className={styles.contact_form_input}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField 
          size="small"
          placeholder="Message"
          fullWidth
          required
          type="text"
          value={message}
          className={styles.contact_form_input}
          onChange={(e)=>setMessage(e.target.value)}
          />
          <Button fullWidth type="submit" className={styles.submit_button}>Submit</Button>
        </form>
      </Box>
    </Box>

   </Box>
  )
}
export default ContactUS