import { Box, Container } from '@mui/material'
import styles from './index.module.scss'
const AboutUs = () => {
    return (
        <>
            <Box className={styles.about_main}>
                <Container className={styles.about_container}>
                    <Box className={styles.aboutus}>
                        <h1 className={styles.abutus_heading}>About Us</h1>
                        <Box className={styles.about_text}>
                            <p className={styles.paragraph}>
                                <span style={{ color: 'blue',cursor:'pointer'}}>ebike.pk</span> is an exclusive motorbike portal, which aims to focus on bikes. It&lsquo;s a complete online portal not only providing the latest news and updates about bike industry but also providing an opportunity for used motorbike buyer and seller to finalize their deal easily.
                            </p>
                            <p className={styles.paragraph}>Similarly, the new bike user can easily get the latest prices of various motorcycle brands. It is worth mentioning here that the verified dealers and mechanic details are also available at this platform. Ebike.pk youtube channel not only educating the motorcyclists about the traffic rules but also giving them motorcycle reviews.</p>
                            <p className={styles.paragraph}>Ebike.pk tag line &quot;Yahan Sirf Bike Hai&quot; also suggests that it&lsquo;s an exclusive motorcycle portal. As they not only claim Yahan Sirf Bike Hai but they actually mean it. Any individual who is looking for a new motorbike or sell a used motorbike, it&lsquo;s possible on ebike. Similarly, spare parts, accessories even any motorbike related part can get from <span style={{ color: 'blue',cursor:'pointer'}}>ebike.pk</span>.</p>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default AboutUs