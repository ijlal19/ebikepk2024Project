import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';

export default function MechanicsList({props}:any) {

  const Router = useRouter()

  const finddealerarr =[
    {label: 'WorkShops',url:'/mechanics'},
    {label: 'Registration',url:'/mechanics/register'}
  ]

  function goToRoute(data:any) {
    console.log('data',data)
    if(data?.url?.indexOf('register') > -1) {
      if(props.customer == "not_login") {
        // alert('Please Login to continue')
        if(document.getElementById('general_login_btn')) { 
          document.getElementById('general_login_btn')?.click()
        }
      }
      else {
        props.toggleDrawers(false)
        setTimeout(()=>{
          Router.push(data.url)
        }, 100)
      }
    }
    else {
      props.toggleDrawers(false)
      setTimeout(()=>{
        Router.push(data.url)
      }, 100)
    }
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, padding:0}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={()=>props.togglers('findmachenics')} disableRipple>
        <ListItemText primary={props.title} />
        {props.options ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={props.options} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            finddealerarr.map((e:any,i:any)=>{
              return(
                <ListItemButton sx={{ pl: 4 }} onClick={() => goToRoute(e) }  key={i}>
                  <ListItemText style={{ marginLeft:"10px" }} primary={e.label} />
                </ListItemButton>
              )
            })
          }
          </List>
      </Collapse>
    </List>
  );
}