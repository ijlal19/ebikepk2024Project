// 'use client'
// import { Box, Typography } from '@mui/material';
// import styles from './index.module.scss'
// import * as React from 'react';
// import { useState } from 'react';
// import { Brand, CityArr } from './data'
//  function Filters() {
//   const [openmodal, setOpenModal] = useState(false)
//   const [functionval, setFunctionVal] = useState()
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   return (
//     <Box className={styles.filter_box}>
//     <Box className={styles.heading_resultby}>
//         <Typography>Show Result By:</Typography>
//     </Box>
//     <Box className={styles.heading_city}>
//         <Typography className={styles.city_text}>CITY</Typography>
//     </Box>
//     <Box className={styles.city_options}>
//         {
//             CityArr.slice(0, 5).map((e:any, i:any) => {
//                 return (
//                     <Typography className={styles.option_values} key={i}>
//                         <input
//                             type="checkbox"
//                             checked={selectedCity === e.id}
//                             onChange={(event) => {
//                                 if (event.target.checked) {
//                                     setSelectedCity(e.id); 
//                                 } else {
//                                     setSelectedCity(null); 
//                                 }
//                             }}
//                         />
//                         {e.city_name}
//                     </Typography>
//                 );
//             })
//         }
//         <MoreOptionPopup props={ModalData} values="city" selectPropsCity={setSelectedCity} PropsCity={selectedCity}/>
//     </Box>
//     <Box className={styles.heading_brand}>
//         <Typography className={styles.brand_text}>MAKE</Typography>
//     </Box>
//     <Box className={styles.brand_options}>
//         {
//             Brand.slice(0, 5).map((e:any, i:any) => {
//                 return (
//                     <Typography className={styles.option_values} key={i}>
//                        <input
//                             type="checkbox"
//                             checked={selectedBrand === e.id}
//                             onChange={(event) => {
//                                 if (event.target.checked) {
//                                     setSelectedBrand(e.id); 
//                                 } else {
//                                     setSelectedBrand(null); 
//                                 }
//                             }}
//                         />
//                         {e.brandName}
//                     </Typography>)
//             })
//         }
//         <MoreOptionPopup props={ModalData} values='brand'  selectPropsBrand={setSelectedBrand}PropsBrand={selectedBrand}/>
//     </Box>
//     <Box className={styles.heading_years}>
//         <Typography className={styles.years_text}>YEARS</Typography>
//     </Box>
//     <Box className={styles.years_options}>
//         <FilterDropdown
//             dropvalues='years'
//             values='from'
//             className={styles.option_values}
//             sx={{
//                 Width: '90%',
//                 padding: '8px',
//                 fontSize: '12px'
//             }}
//         /><FilterDropdown
//             dropvalues='years'
//             values='To'
//             className={styles.option_values}
//             sx={{
//                 minWidth: 120,
//                 padding: '8px',
//                 fontSize: '12px'
//             }}
//         />
//     </Box>
//     <Box className={styles.heading_years}>
//         <Typography className={styles.years_text}>ENGINE CC</Typography>
//     </Box>
//     <Box className={styles.years_options}>
//         <FilterDropdown
//             values='from'
//             className={styles.option_values}
//             sx={{
//                 Width: '90%',
//                 padding: '8px',
//                 fontSize: '12px'
//             }}
//         /><FilterDropdown
//             values='To'
//             className={styles.option_values}
//             sx={{
//                 minWidth: 120,
//                 padding: '8px',
//                 fontSize: '12px'
//             }}
//         />
//     </Box>
// </Box>
//   )
// }
// export default Filters