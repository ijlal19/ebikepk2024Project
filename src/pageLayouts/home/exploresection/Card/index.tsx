import React from 'react'
import styles from './index.module.scss'
import { Box, Grid, Typography } from '@mui/material'
const Card = ({data}) => {
  return (
    <Box className={styles.explore_card_main}>
      <Grid container  className={styles.explore_card_container}>
        <Grid item xs={4}  className={styles.explore_card_grid1}>
          <img src={data.img_url} alt="Card Image"  className={styles.explore_card_image}/>
        </Grid>
        <Grid item xs={8} className={styles.explore_card_grid2}>
          <Typography className={styles.explore_card_title}>
          {data.title}
          </Typography>
          <Typography className={styles.explore_card_description}>
          {data.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Card;
