import React from "react"
import {Button, TextField, Checkbox, FormControlLabel, Autocomplete} from '@mui/material';
import {Grid,Paper,Avatar} from "@mui/material"

const Login = () => {
     
     const paperstyle={padding: 20, height: '70vh', width: 280, margin: "20px auto"}
     const avtarStyle={backgroundcolor: 'green'}
     return(
       <Grid>
            <Paper elevation={(10)} style={paperstyle}>
                <Grid align= 'center'>
                <Avatar></Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <TextField label='User Name' placeholder='Enter User Name' fullWidth required></TextField>
                <TextField label='Password' placeholder='Enter Password' type='Password' fullWidth required></TextField>
                <Button type='Submit' color='primary' fullWidth required variant="contained"> Sign In</Button>
         </Paper>
       </Grid>
          
     )
}


export default Login;
