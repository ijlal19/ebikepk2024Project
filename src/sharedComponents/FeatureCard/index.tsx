import { Box, Button, Paper, Typography } from '@mui/material'
import { TiTick } from "react-icons/ti";
import styles from './index.module.scss'
import {isLoginUser} from '@/functions/globalFuntions'
import { useRouter } from 'next/navigation';

const FeatureCard = ({props}:any) => {

  const Router = useRouter()

  function goToRoute(url:any) {
    let _isLoginUser = isLoginUser()
    if(_isLoginUser?.login) {
      Router.push(url)
    }
    else {
      alert("Please Login to Continue")
    }
  }

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
            <Button className={styles._btn} onClick={()=>goToRoute(props.url)}  >{props.button}</Button>
        </Box>
    </Paper>
  )
}

export default FeatureCard