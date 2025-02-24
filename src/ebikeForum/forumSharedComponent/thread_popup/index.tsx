import * as React from 'react';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import  Thread_dropdown from '../thread_dropdown';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Create_thread_popup({ open, setOpen }: any) {

    const [threadMessage, setMessage] = React.useState('')
    const [threadTitle, setTitle] = React.useState('')
    const [threadTag, setTag] = React.useState('')
    const [selectedValue,setSelectedVaie]=React.useState('')
    const handleClose = () => setOpen(false);

    const handlePost = () => {
        if (!threadTitle || !threadMessage || !threadTag) {
            alert('Please fill in all required fields before posting your thread.')
            return
        }
        else {
            alert(`${selectedValue} ${threadTitle} ${threadMessage} ${threadTag}` )
        }
    }

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.popup_container}>
                    <Box className={styles.popup_main}>
                        <Box className={styles.title_section}>
                            <Box className={styles.logo}>A</Box>
                            <input type="text" className={styles.title_input} onChange={(e) => setTitle(e.target.value)} placeholder='Thread Title' />
                        </Box>
                        <Box className={styles.message_section}>
                            <Box>

                                <label htmlFor="44" className={styles.label}>Message<span style={{ color: 'red' }}>*</span></label>
                                <textarea name="" id="44" className={styles.message_box} onChange={(e) => setMessage(e.target.value)}></textarea>
                            </Box>
                            <Thread_dropdown setSelectedVaie={setSelectedVaie}/>
                            <Box>
                                <label htmlFor="" className={styles.label}>Tags</label>
                                <input type="text" className={styles.tag_input} onChange={(e) => setTag(e.target.value)} />
                            </Box>
                        </Box>
                        <Box className={styles.btn_box}>
                            <Button className={styles.post_btn} onClick={handlePost}>Post Thread</Button>
                            <Button className={styles.cancel_btn} onClick={handleClose} disableRipple>cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}





// import React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import styles from './index.module.scss';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// interface CreateThreadPopupProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

// export default function Create_thread_popup({ open, setOpen }: CreateThreadPopupProps) {
//   const [threadTitle, setTitle] = React.useState('');
//   const [threadMessage, setMessage] = React.useState('');
//   const [threadTag, setTag] = React.useState('');

//   const handleClose = () => setOpen(false);

//   const handlePost = () => {
//     if (!threadTitle || !threadMessage || !threadTag) {
//       alert('Please fill all required information');
//       return;
//     } else {
//       console.log("Thread Data:", threadTitle, threadMessage, threadTag);
//       setOpen(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//       <Box className={styles.popup_container}>
//         <Box className={styles.popup_main}>
//           <Box className={styles.title_section}>
//             <Box className={styles.logo}>A</Box>
//             <input type="text" className={styles.title_input} onChange={(e) => setTitle(e.target.value)} placeholder="Thread Title" />
//           </Box>
//           <Box className={styles.message_section}>
//             <Box>
//               <label htmlFor="44" className={styles.label}>
//                 Message<span style={{ color: 'red' }}>*</span>
//               </label>
//               <textarea id="44" className={styles.message_box} onChange={(e) => setMessage(e.target.value)}></textarea>
//             </Box>
//             <Box>
//               <label htmlFor="" className={styles.label}>Tags</label>
//               <input type="text" className={styles.tag_input} onChange={(e) => setTag(e.target.value)} />
//             </Box>
//           </Box>
//           <Box className={styles.btn_box}>
//             <Button className={styles.post_btn} onClick={handlePost}>Post Thread</Button>
//             <Button className={styles.cancel_btn} onClick={handleClose} disableRipple>Cancel</Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

