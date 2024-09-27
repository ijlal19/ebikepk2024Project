import { Box, Button, Container } from '@mui/material'
import styles from './header-index.module.scss'
import logo from '../../../public/ebikelogo.png'
import MenuIcon from '@mui/icons-material/Menu';


const Header = () => {
  return (
    <>
    <div>
        <Box className={styles.main}>
            <Container className={styles.Container}>
                <Box className={styles.Logo}>
                    <img src={logo} alt="ebike.logo"/>
                </Box>
                <Box className={styles.Nav_links}>
                    <ul>
                        <li>Used Bikes</li>
                        <li>New Bikes</li>
                        <li>Videos</li>
                        <li>Forums</li>
                        <li>Blog</li>
                        <li><MenuIcon/></li>
                    </ul>
                </Box>
                <Box className={styles.Nav_button}>
                    <Button variant='contained' className={styles.Nav_btns}>Login</Button>
                    <Button variant='contained' className={styles.Nav_btns}>Signup</Button>
                </Box>
            </Container>
        </Box>
    </div>
    </>
  )
}

export default Header