import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Login from '@/pageLayouts/login';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
background:'white',
  border: '2px solid #000',
  boxShadow: 24,
  height:'auto',
//   p: 4,
};

export default function BasicModal({data}) {
//   const [openmodal, setOpenmodal] = React.useState(false);
//   const handleOpen = () => setOpenmodal(true);
//   const handleClose = () => setOpenmodal(false);

  return (
    // <div>
      <Modal
        open={data.openmodal}
        onClose={data.handleClose}
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
