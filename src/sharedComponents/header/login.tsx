import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Login from '@/pageLayouts/login';

export default function BasicModal(props:any) {

  return (
    // <div>
      <Modal
        open={props.data.openLoginModal}
        onClose={props.data.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        {/* <Box sx={style}> */}
        
         <Login/>
        {/* </Box> */}
      </Modal>
    // </div>
  );
}
