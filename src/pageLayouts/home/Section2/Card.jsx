import { Box, Button, Paper, Typography } from '@mui/material'
import { TiTick } from "react-icons/ti";
import './Card.scss'
const Card = ({Heading,txt1,txt2,txt3,button}) => {
  return (
    <Paper className='card_main' >
        <Typography class='heading'>
            <h4>{Heading}</h4>
        </Typography>
        <Box class='card_text'>
            <Typography class='steps'><TiTick style={{color:'yellowgreen'}}/> {txt1}</Typography> 
            <Typography class='steps'><TiTick style={{color:'yellowgreen'}}/> {txt2}</Typography> 
            <Typography class='steps'><TiTick style={{color:'yellowgreen'}}/> {txt3}</Typography><br /> 
            <Button variant="contained" color="primary" class='btn'>{button}</Button>
        </Box>
    </Paper>
  )
}

export default Card