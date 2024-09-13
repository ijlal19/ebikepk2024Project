import { Box, Button, Container, Grid, Typography } from "@mui/material"
import './Contactus.scss'
import logo from './Logo.png'
const ContactUS = () => {
  return (
    <>
      <Box class='main'>
        <Container className="container">
          <Grid container className="Grid_container">
            <Grid item xs={12} sm={8} md={6} lg={6} className="Grid_item1">
              <Box className='description'>
              <Box className='Logo'>
                <img src={logo} alt="Logo" />
              </Box>
              <Box className="span">
                <Typography>
                  Don't Hesitate toCall Our ebike.pk Expert for Motorcycle, Parts & Accessories related Queries & get an expert advice.
                  <br/>
                  <br/>
                  <b>021-35396999</b>
                  <br /><br />
                  <p>ebike.pk</p>
                  <p>Khayaban-e-Jami, Phase II Ext., DHA, Karachi</p>
                  <br /><br />
                  <p>Monday to Friday</p>
                  <p>10:00 AM to 05:00 PM</p>
                </Typography>
              </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={6} className="Grid_item2">
            <Box className='description'>
              <Box className='Logo'>
                Contact Us
              </Box>
              {/* <Box className="span"> */}
                <form className="span">
                  <input type="text" 
                  required
                  placeholder="Full Name"
                  name="FullName"
                  /><br/>
                  <input type="email" 
                  required
                  placeholder="Email"
                  name="Email"
                  /><br/>
                  <input type="number" 
                  required
                  placeholder="Phone Number (Optional)"
                  name="PhoneNumber"
                  /><br/>
                  <textarea name="" id="" className="input" rows="5" placeholder="Enter a Message">
                  </textarea>
                  <Button className="Btn">Submit</Button>
              </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
export default ContactUS