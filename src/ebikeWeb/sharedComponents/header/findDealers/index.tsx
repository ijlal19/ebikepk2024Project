import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import styles from '../index.module.scss';
import { Link } from '@mui/material';

export default function DealerList({ props }: any) {

  const Router = useRouter()

  const findmechanics = [
    { label: 'Showrooms', url: '/dealers',isLoginReq: false  },
    { label: 'Registration', url: '/dealers/register',isLoginReq: true}
  ]

  function goToRoute(data: any) {
    console.log('data', data)
    if (data?.url?.indexOf('register') > -1) {
      if (props.customer == "not_login") {
        // alert('Please Login to continue')
        if (document.getElementById('general_login_btn')) {
          document.getElementById('general_login_btn')?.click()
        }
      }
      else {
        props.toggleDrawers(false)
        setTimeout(() => {
          Router.push(data.url)
        }, 100)
      }
    }
    else {
      props.toggleDrawers(false)
      setTimeout(() => {
        Router.push(data.url)
      }, 100)
    }
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, padding: 0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => props.togglers('finddealer')} disableRipple  sx={{ paddingTop:"0px",paddingBottom:"0px"}} >
        <ListItemText primary={props.title}  sx={{marginTop:"0px",marginBottom:"0px" }} />
        {props.options ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={props.options} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            findmechanics.map((e: any, i: any) => {
              return (
                !e.isLoginReq ?
                  <Link className={styles.anchor} key={i} href={e.url}>
                    <ListItemButton sx={{ pl: 4  ,paddingTop:"0px",paddingBottom:"0px"}}>
                      <ListItemText style={{ marginLeft: "10px" ,marginTop:"0px",marginBottom:"0px" }} primary={e.label} />
                    </ListItemButton>
                  </Link>
                  :
                  <ListItemButton sx={{ pl: 4  ,paddingTop:"0px",paddingBottom:"0px"}} onClick={() => goToRoute(e)} key={i}>
                    <ListItemText style={{ marginLeft: "10px" ,marginTop:"0px",marginBottom:"0px"  }} primary={e.label} />
                  </ListItemButton>
              )
            })
          }
        </List>
      </Collapse>
    </List>
  );
}