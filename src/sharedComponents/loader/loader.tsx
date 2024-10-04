'use client'
import styles from './index.module.scss'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

 function Loader() {
  return (
    <Box className={styles.loader_main}>
      <CircularProgress />
    </Box>
  )
}
export default Loader