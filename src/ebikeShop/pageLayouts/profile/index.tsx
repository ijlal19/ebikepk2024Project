"use client"
import { Avatar, Box, Button, Container, Grid, TextField} from '@mui/material'
import styles from './index.module.scss'
import React, { useState } from 'react'

const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [about, setAbout] = useState('')
    const [facebookUrl, setFacebookUrl] = useState('')
    const [ridingSince, setRidingsince] = useState('')
    const [vehiclebrands, setVehiclebrands] = useState('')
    const [vehicledetails, setVehicleDetails] = useState('')

    const handlesubmit = (e:any) => {
        e.preventDefault()
        
        const obj = {
            name: name,
            email: email,
            phone: phone,
            about: about,
            facebookUrl: facebookUrl,
            riding: ridingSince,
            vehiclebrands: vehiclebrands,
            vehicledetails: vehicledetails
        }

        console.log(obj)
        alert('success')
        setName('')
        setEmail('')
        setPhone('')
        setFacebookUrl('')
        setAbout('')
        setRidingsince('')
        setVehiclebrands('')
        setVehicleDetails('')
    }
    return (
        <Box className={styles.profile_main}>
            <Container className={styles.profile_container}>
                <form action="" className={styles.profile_form} onSubmit={handlesubmit}>

                    <Grid>
                        <Avatar className={styles.heading_box}>
                        </Avatar>
                        <h2 className={styles.profile_heading}>Profile</h2>
                    </Grid>
                    <TextField label='Name' size="small" fullWidth type='text' required className={styles.profile_field} 
                    onChange={(e)=>{setName(e.target.value)}}
                    value={name}
                    />
                    <TextField label='Email' size="small" fullWidth type='email' required className={styles.profile_field} 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}
                    />
                    <TextField label='Phone' size="small" fullWidth type='number' required className={styles.profile_field} 
                    onChange={(e)=>{setPhone(e.target.value)}}
                    value={phone}
                    />
                    <TextField label='About' size="small" fullWidth type='text' required className={styles.profile_field} 
                    onChange={(e)=>{setAbout(e.target.value)}}
                    value={about}
                    />
                    <TextField label='Facebook url()' size="small" fullWidth type='text' required className={styles.profile_field} 
                    onChange={(e)=>{setFacebookUrl(e.target.value)}}
                    value={facebookUrl}
                    />
                    <TextField label='Riding Since' size="small" fullWidth type='text' required className={styles.profile_field} 
                    onChange={(e)=>{setRidingsince(e.target.value)}}
                    value={ridingSince}
                    />
                    <TextField label='Vehicle Brands' size="small" fullWidth type='text' required className={styles.profile_field} 
                    onChange={(e)=>{setVehiclebrands(e.target.value)}}
                    value={vehiclebrands}
                    />
                    <TextField label='Vehicle Details' size="small" fullWidth type='text' required className={styles.profile_field} 
                    onChange={(e)=>{setVehicleDetails(e.target.value)}}
                    value={vehicledetails}
                    />
                    <Button className={styles.button} type='submit' fullWidth>Create</Button>
                </form>
            </Container>
        </Box>
    )
}

export default Profile
