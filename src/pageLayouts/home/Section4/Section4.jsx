import { Box, Button, Container, Grid, Typography } from '@mui/material'
import './Section4.scss'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import unique from './slide1Image/unique.png'
import Benelli from './slide1Image/Benelli.png'
import crown from './slide1Image/crown.png'
import HiSpeed from './slide1Image/hi-Speed.png'
import Honda from './slide1Image/Honda.png'
import Kawasaki from './slide1Image/Kawasaki.png'
import BMW from './slide2Image/BMW.png'
import hero from './slide2Image/hero.png'
import Yamaha from './slide2Image/Yamaha.png'
import ZXMCO from './slide2Image/ZXMCO.png'
import Roadprince from './slide2Image/Road-prince.png'
const Section4 = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Box className='section4_main'>
      <Container className='container'>
        <Box className='Section4-heading'>
          <Typography className='heading'>New Bike Brands</Typography>
          <Button variant='contained' className='btn'>View Brands</Button>
        </Box><br />
        <Carousel responsive={responsive} className='carousel-item'>
          <Grid container className='Grid'>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Hi-Speed"><img src={HiSpeed} alt="Hi-Speed"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Kawasaki"><img src={Kawasaki} alt="Kawasaki"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Crown"><img src={crown} alt="Crown"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Honda"><img src={Honda} alt="Honda"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Unique"><img src={unique} alt="Unique"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Benelli"><img src={Benelli} alt="Benelli"  className='images'/></abbr></Grid>
          </Grid>
          <Grid container className='Grid'>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="ZXMCO"><img src={ZXMCO} alt="ZXMCO"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Yamaha"><img src={Yamaha} alt="Yamaha"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="BMW"><img src={BMW} alt="BMW"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Road-Prince"><img src={Roadprince} alt="Road-Prince"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Unique"><img src={unique} alt="Unique"  className='images'/></abbr></Grid>
            <Grid item xs={4} sm={4} md={2} lg={2} className='Grid-boxes'><abbr title="Hero"><img src={hero} alt="Hero"  className='images'/></abbr></Grid>
          </Grid>
        </Carousel>
        
      </Container>
    </Box>
  )
}
export default Section4