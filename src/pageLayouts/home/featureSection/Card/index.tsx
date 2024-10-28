import { Box, Button, Paper, Typography } from '@mui/material'
import { TiTick } from "react-icons/ti";
import styles from './index.module.scss'

const Card = ({props}:any) => {
  return (
    <Paper className={styles.card_main} >
        <Typography className={styles.heading}>
            <h4>{props.Heading}</h4>
        </Typography>
        <Box className={styles.card_text}>
            <Typography className={styles.information}>
                <TiTick style={{color:'yellowgreen'}}/> 
                {props.txt1}
              </Typography> 
            <Typography className={styles.information}>
                <TiTick style={{color:'yellowgreen'}}/> 
                {props.txt2}
            </Typography> 
            <Typography className={styles.information}>
              <TiTick style={{color:'yellowgreen'}}/>
               {props.txt3}
            </Typography>
            <br /> 
            <Button className={styles._btn}>{props.button}</Button>
        </Box>
    </Paper>
  )
}

export default Card