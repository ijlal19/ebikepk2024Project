import { Box, Container, Grid, Typography } from '@mui/material'
import styles from './index.module.scss'
import React from 'react'
import Card from './Card'
import { Data } from "./Data"

const Explore = () => {
  return (
    <Box className={styles.explore_main}>
      <Container className={styles.explore_container}>
        <Typography className={styles.explore_heading}>
          Explore ebike.pk
        </Typography>
        <Box className={styles.explore_grid}>
          <Card data={Data[0]}/>
          <Card data={Data[1]}/>
        </Box>
        <Box className={styles.explore_grid}>
          <Card data={Data[2]}/>
          <Card data={Data[3]}/>
        </Box>
      </Container>
    </Box>
  )
}

export default Explore