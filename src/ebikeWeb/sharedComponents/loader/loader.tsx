'use client'
import styles from './index.module.scss'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

 function Loader(props:any) {
  return (
    <Modal open={props.isLoading}  className={styles.loader_main} >
      <Box className={styles.loader_inner}>
        <img src="https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png" alt="ebike.pk" className={styles.logo_image} />
        <CircularProgress className={styles.progress} />
        <p className={styles.text} > Loading ... </p>
      </Box>
    </Modal>
  )
}
export default Loader