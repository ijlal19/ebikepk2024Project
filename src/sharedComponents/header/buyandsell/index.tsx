import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function BuyandSell({props}:any) {
  const buysellarr =[
    {label: 'Find Used Bikes',url:''},
    {label: 'Sell Your Bike',url:''}
  ]
  return (
    <List
      sx={{ width: '100%', maxWidth: 360,padding:0 }}
      component="nav"
      
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={props.togglers} disableRipple>
        <ListItemText primary={props.title} />
        {props.options ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={props.options} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            buysellarr.map((e:any,i:any)=>{
              return(
                <ListItemButton sx={{ pl: 4 }} onClick={props.toggleDrawers(false)}  key={i}>
            <ListItemText primary={e.label} />
          </ListItemButton>
              )
            })
          }
          </List>
      </Collapse>
    </List>
  );
}