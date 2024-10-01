import { Box, Container, Grid, Typography } from '@mui/material'
import styles from './index.module.scss'
import Data from './Data'
const Blog = () => {
    return (
        <Box className={styles.blog_main}>
          <Container className={styles.blog_container}>
            <Grid container className={styles.blog_grid}>
                <Grid className={styles.blog_grid1} item xs={7}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione incidunt harum vero quam animi aperiam impedit. Quidem delectus ut cumque!
                </Grid>
                <Grid className={styles.blog_grid2} item xs={4}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, animi?</Grid>
            </Grid>
          </Container>
        </Box>
    )
}

export default Blog