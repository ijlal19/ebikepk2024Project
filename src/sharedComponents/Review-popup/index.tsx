import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './index.module.scss'
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  boxShadow: 24,
};

export default function ReviewModal({props}:any) {
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.popup_main}>
          <Box className={styles.heading_box}>
          <Typography className={styles.heading} id="modal-modal-title" variant="h6" component="h2">
           Review Popup
          </Typography>
          <Typography className={styles.closebtn} onClick={()=>props.close('showReviewpopup')}><CloseIcon  className={styles.closebtn}/></Typography>
          </Box>
          <Typography className={styles.para} id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
