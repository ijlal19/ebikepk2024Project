"use client"
import styles from './index.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
export default function MoreOptionPopup({ props ,values}: any) {
    return (
        <div>
            {
                values == 'city' ? <Typography className={styles.seeMore} onClick={() => props.showmodal('city')}>more choices...</Typography>:<Typography className={styles.seeMore} onClick={() => props.showmodal('brand')}>more choices...</Typography>
            }
            
            <Modal
                open={props.openmodal}
            >
                <Box className={styles.Modal_box}>
                    <Box className={styles.modal_header}>
                        <Typography className={styles.slesctMake_heading}>{props.arrname === 'city' ? 'Select City' : 'Select Make'}</Typography>
                        <Typography className={styles.close_ICon}><CloseIcon  onClick={() => props.showmodal('close')}/></Typography>
                    </Box>
                    <Box className={styles.modal_content}>
                        {
                            props.popupdata.map((e:any,i:any)=>{
                                return(
                                    <Typography className={styles.option_values} key={i}> 
                                        <input type="checkbox" />{props.arrname === 'city' ? e.city_name : e.brandName}
                                    </Typography>
                                )
                            })
                        }
                    </Box>
                    <Box className={styles.modal_footer}>
                        <Typography className={styles.footer_clear}>Clear</Typography>
                        <Button className={styles.btn_submit}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}