// import React from "react"
// import { Avatar, Grid, Paper, Button, TextField, Typography } from '@mui/material'


// const Profile = () => {
// const  paperStyle={padding:'30px 20px', width:300, margin: "20px auto"}
// const headerStyle={margin:0}

//      return (
//           <Grid>
//             <Paper elevation={20} style={paperStyle}>
//               <Grid>
//                 <Avatar>
//                 </Avatar>
//                 <h2 style={headerStyle}>Profile</h2>
//               </Grid>
//                 <TextField fullWidth label='Name' placeholder="Enter Your Name"/>
//                 <TextField fullWidth label='Email'/>
//                 <TextField fullWidth label='Phone Number'/>
//                 <TextField fullWidth label='Password'/>
//                 <TextField fullWidth label='Confirm Password'/>
//                 <Button type='Submit' color='primary' fullWidth required variant="contained"> Sign In</Button>           
//             </Paper>
//           </Grid>
//     )
// }

// export default Profile;



import { Box, Button, Container, TextField, Typography } from '@mui/material'
import styles from './index.module.scss'

const Profile = () => {
    
    return (
        <Box className={styles.profile_main}>
            <Container className={styles.profile_container}>
                <form  className={styles.profile_form}>
                    <Typography className={styles.profile_heading}>Profile</Typography>
                    <TextField label='Name' size="small" fullWidth type='text' required className={styles.profile_field}/>
                    <TextField label='Email' size="small" fullWidth type='email' required className={styles.profile_field}/>
                    <TextField label='Phone' size="small" fullWidth type='number' required className={styles.profile_field}/>
                    <TextField label='About' size="small" fullWidth type='text' required className={styles.profile_field}/>
                    <TextField label='Facebook url()' size="small" fullWidth type='text' required className={styles.profile_field}/>
                    <TextField label='Riding Since' size="small" fullWidth type='text' required className={styles.profile_field}/>
                    <TextField label='Vehicle Brands' size="small" fullWidth type='text' required className={styles.profile_field}/>
                    <TextField label='Vehicle Details' size="small" fullWidth type='text' required className={styles.profile_field}/>
                    <Button className={styles.button} type='submit'>Create</Button>
                </form>
            </Container>
        </Box>
    )
}

export default Profile
