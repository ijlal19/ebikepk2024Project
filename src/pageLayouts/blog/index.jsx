import { Box, Container, Grid, Typography } from '@mui/material'
import styles from './index.module.scss'
import Data from './Data'
const Blog = () => {
    return (
        <Box className={styles.blog_main}>
            {
                Data.map((e,i) => {
                    return (
                        <Container className={styles.blog_container} key={i}>
                            <Grid className={styles.grid_box}>
                                <Grid className={styles.grid_item}>
                                    <img src={e.img_url} alt="blg image" className={styles.blog_image} />
                                </Grid>
                                <Grid className={styles.grid_item}>
                                    <Typography className={styles.title}>
                                        {e.title}
                                    </Typography>
                                    <Typography className={styles.details}>
                                        {e.name} | {e.date} | {e.comment}
                                    </Typography>
                                    <Typography className={styles.description}>
                                        {e.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    )
                })
            }
        </Box>
    )
}

export default Blog