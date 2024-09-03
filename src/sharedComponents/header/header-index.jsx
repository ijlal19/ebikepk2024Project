import { Box, Button, Container } from '@mui/material'
import './header-index.module.scss'
import logo from './Logo.png'
import MenuIcon from '@mui/icons-material/Menu';
const Header = () => {
  return (
    <>
    <Box className='main'>
        <Container className='Container'>
            <Box className='Logo'>
                <img src={logo} alt="ebike.logo"/>
            </Box>
            <Box className='Nav_links'>
                <ul>
                    <li>Used Bikes</li>
                    <li>New Bikes</li>
                    <li>Videos</li>
                    <li>Forums</li>
                    <li>Blog</li>
                    <li><MenuIcon/></li>
                </ul>
            </Box>
            <Box className='Nav_button'>
                <Button variant='contained' className='Nav_btns'>Login</Button>
                <Button variant='contained' className='Nav_btns'>Signup</Button>
            </Box>
        </Container>
    </Box>
    </>
  )
}

export default Header