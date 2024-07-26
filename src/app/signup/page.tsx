import * as React from 'react';
import {Button, TextField, Checkbox, FormControlLabel} from '@mui/material';

function Login() {

  return (
    <>
        <TextField 
            label="Email" 
            type='email' 
            variant="outlined" 
            style={{
                minWidth:'300px', 
                height:'40px', 
                display:"block", 
                margin:'10px auto' 
            }} 
        />

        <br/>

        <TextField 
            label="Password" 
            type='password' 
            variant="outlined"
            style={{
                minWidth:'300px', 
                height:'40px', 
                display:"block", 
                margin:'10px auto'
            }}  
        />

        <br/>

        <FormControlLabel 
            required 
            control={<Checkbox />} 
            label="Aggree"  
        />

        <br/>

        <Button variant="contained">Login</Button>
    </>
  );
}

export default Login;