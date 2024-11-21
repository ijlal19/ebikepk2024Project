'use client'
import { Box, Container, Grid, Typography } from '@mui/material';
import styles from './index.module.scss';
// import Card from './Card/index';
import { SendToMobile } from '@mui/icons-material';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwiperCarousels from '@/sharedComponents/swiperSlider';
import FeatureCard from '@/sharedComponents/FeatureCard';

const Section2 = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const feautureArray=[
    {
              Heading:'Post Free Add',
              txt1:'Post your Bike Add Free in Easy Steps',
              txt2:'Post your Bike Video Picture and ADD For Free',
              txt3:'Sell Your Bike at the Best Price',
              button:'Post Bike Add',
              url:"/used-bikes/sell-used-bike/"
    },
    {
              Heading:'Register Dealer',
              txt1:'Register your Motorcycle showroom',
              txt2:'Get more business Leads from ebike.pk users',
              txt3:'Enhance your business revenue',
              button:'Register Dealer',
              url:"/dealers/register"
    },
    {
              Heading:'Register Mechanic',
              txt1:'Register your Motorcycle in workshop',
              txt2:'Get more business Leads from ebike.pk users',
              txt3:'Enhance your business revenue',
              button:'Register Mechanic',
              url:"/mechanics/register"
    }
  ]

  return (
    <Box className={styles.featuer_main}>
      
      <Container>
        <Typography className={styles.featuer_title} >
          Sell Your Bike on ebike.pk<span className={styles.titleShow}> and Get a Best Price of your bike</span>
        </Typography>
        
        <Grid container spacing={2} className={styles.featuer_container}>
          {
            isMobile ? <SwiperCarousels from='' sliderName='featurSection' sliderData={feautureArray} currentpage="" />:
            (feautureArray.map((e:any,i:any)=>{
              console.log(e)
              return(
                <FeatureCard props={e} key={i}/>
              )
            }))
          }
          </Grid>
      </Container>
    </Box>
  );
};

export default Section2;






// 'use client'
// import { Box, Container, Grid, Typography } from '@mui/material';
// import styles from './index.module.scss';
// // import FeatureCard from './Card/index';
// import { useState } from 'react';
// // import useMediaQuery from '@mui/material/useMediaQuery';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import 'swiper/swiper-bundle.min.css';
// // import 'swiper/swiper-bundle.css'

// const Section2 = () => {
//   const feautureArray = [
//     {
//       Heading: 'Post Free Add',
//       txt1: 'Post your Bike Ad for Free in Easy Steps',
//       txt2: 'Post your Free Bike Video Ad',
//       txt3: 'Sell Your Bike at Best Price',
//       button: 'Post Bike Add',
//     },
//     {
//       Heading: 'Register Dealer',
//       txt1: 'Register your Motorcycle showroom',
//       txt2: 'Get more business Leads from ebike.pk users',
//       txt3: 'Enhance your business revenue',
//       button: 'Register Dealer',
//     },
//     {
//       Heading: 'Register Mechanic',
//       txt1: 'Register your Motorcycle workshop',
//       txt2: 'Get more business Leads from ebike.pk users',
//       txt3: 'Enhance your business revenue',
//       button: 'Register Mechanic',
//     },
//   ];
//   // const isMobile = useMediaQuery('(max-width: 768px)');
// const [isMobile,setIsMobile]=useState(false)
//   return (
//     <Box className={styles.featuer_main}>
//       <Container>
//         <Typography className={styles.featuer_title}>
//           Sell Your Bike on ebike.pk
//           <span className={styles.titleShow}> and Get a Best Price of your bike</span>
//         </Typography>

//         {isMobile ? 
//           // <Swiper spaceBetween={10} slidesPerView={1}>
//           //   {feautureArray.map((item, index) => (
//           //     <SwiperSlide key={index}>
//           //       <Card props={item} />
//           //     </SwiperSlide>
//           //   ))}
//           // </Swiper>''
//           'HEllO'
//          : 
//           <Grid container spacing={2} className={styles.featuer_container}>
//             {feautureArray.map((item, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>

//               </Grid>
//             ))}
//           </Grid>
//         }
//       </Container>
//     </Box>
//   );
// };

// export default Section2;


