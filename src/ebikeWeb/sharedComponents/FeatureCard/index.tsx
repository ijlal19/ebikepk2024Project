import { Box, Button, Link, Paper, Typography } from '@mui/material'
import { TiTick } from "react-icons/ti";
import styles from './index.module.scss'
import { isLoginUser } from "@/genericFunctions/geneFunc";
import { useRouter } from 'next/navigation';

const FeatureCard = (props: any) => {
  let data = props.data

  const Router = useRouter()

  function goToRoute(data: any) {
    let _isLoginUser = isLoginUser()
    if(data?.isLoginreq){
      if (_isLoginUser?.login) {
        Router.push(data?.url)
      }
      else {
        if (document.getElementById('general_login_btn')) {
          document.getElementById('general_login_btn')?.click()
        }
      }
    }
    else{
      Router.push(data?.url)
    }
  }


  return (
    data ?
      <Paper className={styles.card_main} >
        <Typography className={styles.heading}>
          <h4>{data.heading}</h4>
        </Typography>
        <Box className={styles.card_text}>
          <Typography className={styles.information}>
            <TiTick style={{ color: 'yellowgreen' }} />
            {data.txt1}
          </Typography>
          <Typography className={styles.information}>
            <TiTick style={{ color: 'yellowgreen' }} />
            {data.txt2}
          </Typography>
          <Typography className={styles.information}>
            <TiTick style={{ color: 'yellowgreen' }} />
            {data.txt3}
          </Typography>
          {
            data.isLoginreq ?
              <Button className={styles.anchor} onClick={() => goToRoute(data)} >{data.button}</Button>
              :
              <Button className={styles.anchor} onClick={() => goToRoute(data)}  >
                {data.button}
              </Button>
          }
        </Box>
      </Paper> : <></>
  )
}

export default FeatureCard