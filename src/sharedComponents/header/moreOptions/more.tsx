import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TableViewIcon from '@mui/icons-material/TableView';

export default function NestedList({props}:any) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
     
      
      <ListItemButton onClick={props.togglers}>
        <ListItemIcon>
          <ExpandCircleDownIcon />
        </ListItemIcon>
        <ListItemText primary="more" />
        {props.options ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={props.options} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={props.toggleDrawers(false)}>
            <ListItemIcon>
              <TableViewIcon />
            </ListItemIcon>
            <ListItemText primary="Tab1" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={props.toggleDrawers(false)}>
            <ListItemIcon>
              <TableViewIcon />
            </ListItemIcon>
            <ListItemText primary="Tab2" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}