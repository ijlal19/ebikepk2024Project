"use client"
import styles from './index.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { getProductByFilter } from '@/ebikeShop/Shopfunctions/globalFuntions';

export default function MoreOptionPopup(props: any, getCompanyDataByFilter: any ) {


    const [selectedId, setSelectedId] = useState()
    const [event, setEvent] = useState()
    // const [filter, setFilter] = useState<any>({ company_filter: [] });

    const handleChange = (e: any, id: any) => {
        setSelectedId(id)
        setEvent(e)
        // console.log("data", filtered)
    }
    const submitfilterdata = () => {
        props?.getCompanyDataByFilter(event, selectedId);
        props.modalData.showmodal('close')
    }

    return (
        <div>
            <Modal open={props.modalData.openmodal} onClose={() => props.modalData.showmodal('close')} >
                <Box className={styles.Modal_box}>

                    <Box className={styles.modal_header}>
                        <Typography className={styles.slesctMake_heading}>
                            {props.from === 'category' ? 'Select Category' : 'Select Company'}
                        </Typography>
                        <Typography className={styles.close_ICon}>
                            <CloseIcon onClick={() => props.modalData.showmodal('close')} />
                        </Typography>
                    </Box>

                    <Box className={styles.modal_content}>
                        {
                            props.modalData.popupdata.map((data: any, i: any) => {
                                return (
                                    <Typography className={styles.option_values} key={i}>
                                        <input
                                            type="checkbox"
                                            name='company'
                                            value={data?.id}
                                            // checked={(filter.company_filter || []).includes(company.id.toString())}
                                            // checked={props?.Applyfiltered.includes(data?.id.toString())}
                                            // onChange={(e) => props?.getCompanyDataByFilter(e, data?.id)}
                                            onChange={(e) => handleChange(e, data?.id)}
                                            id={data?.id.toString()}
                                        />
                                        {props.from == 'category' ? data?.name : data?.name}
                                    </Typography>
                                )
                            })
                        }
                    </Box>

                    <Box className={styles.modal_footer}>
                        {/* <Typography className={styles.footer_clear} onClick={() => submitUpdatedFilter('clear')} > Clear </Typography> */}
                        <Button className={styles.btn_submit} onClick={() => submitfilterdata()} > Submit </Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}