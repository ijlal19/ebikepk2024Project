import { Box, Container, Grid, Typography } from '@mui/material';
import styles from './index.module.scss';
import Card from './Card/index';

const Section2 = () => {
  return (
    <Box className={styles.featuer_main}>
      
      <Container>
        
        <Typography className={styles.featuer_title}>
          Sell Your Bike on ebike.pk and Get a Best Price of your bike
        </Typography>

        <Grid container spacing={2} className={styles.featuer_container}>
            
            <Card
              Heading='Post Free Add'
              txt1='Post your Bike Ad for Free in Easy Steps'
              txt2='Post your Free Bike Video Ad'
              txt3='Sell Your Bike at Best Price'
              button='Post Bike Add'
            />
  
            <Card
              Heading='Register Dealer'
              txt1='Register your Motorcycle showroom'
              txt2='Get more business Leads from ebike.pk users'
              txt3='Enhance your business revenue'
              button='Register Dealer'
            />
         
            <Card
              Heading='Register Mechanic'
              txt1='Register your Motorcycle workshop'
              txt2='Get more business Leads from ebike.pk users'
              txt3='Enhance your business revenue'
              button='Register Mechanic'
            />

          </Grid>
      </Container>
    </Box>
  );
};

export default Section2;

