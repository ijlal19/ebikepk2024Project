import * as React from 'react';
import { isLoginUser } from '@/ebikeForum/forumFunction/globalFuntions';
import  Thread_dropdown from '../thread_dropdown';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

export default function Create_thread_popup({ open, setOpen,IsLogin }: any) {

    const [threadMessage, setMessage] = React.useState('')
    const [threadTitle, setTitle] = React.useState('')
    const [threadTag, setTag] = React.useState('')
    const [MainCatge,setMainCatge]=React.useState<number | null>(null)
    const [SubCateg,setSubCatgeId]=React.useState('')
    const handleClose = () => setOpen(false);

    const handlePost = () => {
        if (!threadTitle || !threadMessage || !threadTag || !SubCateg) {
            alert('Please fill in all required fields before posting your thread.')
            return
        }
        else {
            const obj ={
                title:threadTitle,
                description:threadMessage,
                user_name:IsLogin?.userFullName,
                image:"",
                video_url:"",
                user_id:IsLogin?.id,
                isVerified:IsLogin?.isVerified,
                sub_categ_id:SubCateg,
                threadTag:threadTag
            }
            console.log('data' , obj)
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
                            <Box className={styles.logo}>{IsLogin?.userFullName?.slice(0,1)}</Box>
                            <input type="text" className={styles.title_input} onChange={(e) => setTitle(e.target.value)} placeholder='Thread Title' />
                        </Box>
                        <Box className={styles.message_section}>
                            <Box>

                                <label htmlFor="44" className={styles.label}>Message<span style={{ color: 'red' }}>*</span></label>
                                <textarea name="" id="44" className={styles.message_box} onChange={(e) => setMessage(e.target.value)}></textarea>
                            </Box>
                            <Thread_dropdown setMainCatge={setMainCatge} setSubCatgeId={setSubCatgeId} />
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
// "https://ebikepk-server-nodejs.herokuapp.com/api/brand/get-brand