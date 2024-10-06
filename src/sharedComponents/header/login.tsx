import * as React from 'react';
import Modal from '@mui/material/Modal';
import Login from '@/pageLayouts/login';

export default function BasicModal(props:any) {

  return (
      <Modal
        open={props.data.openmodal}
        onClose={props.data.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
      >
        <Login/>
      </Modal>
  );
}
