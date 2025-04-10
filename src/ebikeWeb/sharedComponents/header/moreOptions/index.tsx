import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import styles from '../index.module.scss';
import { useRouter } from 'next/navigation';
import { Link } from '@mui/material';


export default function MoreList({ props }: any) {

  const Router = useRouter()

  const morear = [
    { label: 'Bike Video', url: 'https://www.youtube.com/@ebikepk' ,isLoginReq: false },
    // {label: 'MTMIS Pakistan',url:''},
    { label: 'Bike Verification Sindh', url: '/mtmis-sindh',isLoginReq: false  },
    { label: 'Bike Verification Punjab', url: '/mtmis-punjab' ,isLoginReq: false }
  ]

  function goToRoute(data: any) {
    console.log('data', data)
    props.toggleDrawers(false)
    setTimeout(() => {
      Router.push(data.url)
    }, 100)
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, padding: 0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => props.togglers('moreoption')} disableRipple sx={{ paddingTop:"0px",paddingBottom:"0px"}} >
        <ListItemText primary="More"  sx={{marginTop:"0px",marginBottom:"0px" }} />
        {props.options ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={props.options} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
          morear.map((e: any, i: any) => {
              return (
                  !e.isLoginReq ? 
                  <Link className={styles.anchor} key={i} href={e.url}>
                      <ListItemButton sx={{ pl: 4  ,paddingTop:"0px",paddingBottom:"0px"}}>
                        <ListItemText style={{ marginLeft: "10px" ,marginTop:"0px",marginBottom:"0px" }} primary={e.label} />
                      </ListItemButton>
                  </Link> 
                  :
                  <ListItemButton sx={{ pl: 4  ,paddingTop:"0px",paddingBottom:"0px"}} onClick={() => goToRoute(e)} key={i}>
                    <ListItemText style={{ marginLeft: "10px" ,marginTop:"0px",marginBottom:"0px" }} primary={e.label} />
                  </ListItemButton>
              )
            })
          }
        </List>
      </Collapse>
    </List>
  );
}