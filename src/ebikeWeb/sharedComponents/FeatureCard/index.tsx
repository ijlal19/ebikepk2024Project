import { Box, Button, Link, Paper, Typography } from '@mui/material'
import { TiTick } from "react-icons/ti";
import styles from './index.module.scss'
import { isLoginUser } from "@/genericFunctions/geneFunc";
import { useRouter } from 'next/navigation';

const FeatureCard = (props: any) => {

  const Router = useRouter()

  function goToRoute(url: any) {
    let _isLoginUser = isLoginUser()
    if (_isLoginUser?.login) {
      Router.push(url)
    }
    else {
      if (document.getElementById('general_login_btn')) {
        document.getElementById('general_login_btn')?.click()
      }
    }
  }

  let data = props.data

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
                <Button className={styles.anchor} onClick={() => goToRoute(data.url)} >{data.button}</Button>
              :
              <Link className={styles.anchor} href={data?.url}>
                {data.button}
              </Link>
          }
        </Box>
      </Paper> : <></>
  )
}

export default FeatureCard