import React from "react"
import { Avatar, Grid, Paper, Button, TextField, Typography } from '@mui/material'


const Profile = () => {
const  paperStyle={padding:'30px 20px', width:300, margin: "20px auto"}
const headerStyle={margin:0}

     return (
          <Grid>
            <Paper elevation={20} style={paperStyle}>
              <Grid>
                <Avatar>
                </Avatar>
                <h2 style={headerStyle}>Profile</h2>
              </Grid>
                <TextField fullWidth label='Name' placeholder="Enter Your Name"/>
                <TextField fullWidth label='Email'/>
                <TextField fullWidth label='Phone Number'/>
                <TextField fullWidth label='Password'/>
                <TextField fullWidth label='Confirm Password'/>
                <Button type='Submit' color='primary' fullWidth required variant="contained"> Sign In</Button>           
            </Paper>
          </Grid>
    )
}

export default Profile;
