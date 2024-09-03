import { Box, Container, Grid, Typography } from '@mui/material';
import './Section2.scss';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';

const Section2 = () => {
  return (
    <Box className='section2_main'>
      <Container>
        <Typography className='sec2_heading'>
          Sell Your Bike on ebike.pk and Get a Best Price of your bike
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} className='Grid_boxes'>
            <Card
              Heading='Post Free Add'
              txt1='Post your Bike Ad for Free in Easy Steps'
              txt2='Post your Free Bike Video Ad'
              txt3='Sell Your Bike at Best Price'
              button='Post Bike Add'
            />
          </Grid>
          <Grid item xs={12} sx={{display:{xs:'none',sm:'flex',md:'flex',lg:'flex'}}} sm={6} md={4} lg={4} className='Grid_boxes'>
            <Card
              Heading='Register Dealer'
              txt1='Register your Motorcycle showroom'
              txt2='Get more business Leads from ebike.pk users'
              txt3='Enhance your business revenue'
              button='Register Dealer'
            />
          </Grid>
          <Grid item xs={12} sx={{display:{xs:'none',sm:'flex',md:'flex',lg:'flex'}}} sm={6} md={4} lg={4} className='Grid_boxes'>
            <Card
              Heading='Register Mechanic'
              txt1='Register your Motorcycle workshop'
              txt2='Get more business Leads from ebike.pk users'
              txt3='Enhance your business revenue'
              button='Register Mechanic'
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section2;

