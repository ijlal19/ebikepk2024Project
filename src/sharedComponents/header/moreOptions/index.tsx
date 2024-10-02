import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function MoreList({props}:any) {
  const morear =[
    {label: 'Bike Video',url:''},
    {label: 'MTMIS Pakistan',url:''},
    {label: 'Bike Verification Sindh',url:''},
    {label: 'Bike Verification Punjab',url:''}
  ]
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, padding:0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={props.togglers} disableRipple>
        <ListItemText primary="More" />
        {props.options ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={props.options} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            morear.map((e:any,i:any)=>{
              return(
                <ListItemButton sx={{ pl: 4 ,background:'#efe9e9'}} onClick={props.toggleDrawers(false)}  key={i}>
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