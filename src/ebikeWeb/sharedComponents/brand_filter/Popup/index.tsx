"use client"
import { useParams, useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as React from 'react';

export default function MoreOptionPopup(props: any) {

    const GetArray = props.from == 'city' ?
        JSON.parse(localStorage.getItem("selectedDataByCity") || "[]")
        : JSON.parse(localStorage.getItem("selectedDataByBrand") || "[]")

    return (
        <Box>
            <Modal open={props.modalData.openmodal} onClose={() => props.modalData.showmodal('close')} >
                <Box className={styles.Modal_box}>

                    <Box className={styles.modal_header}>
                        <Typography className={styles.slesctMake_heading}>
                            {props.from === 'city' ? 'Select City' : 'Select Brand'}
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
                                            checked={GetArray?.includes(data?.id)}
                                            onChange={(e) => { props.updateFilterValue(e, props.from == 'city' ? "city" : "brand") }}
                                            id={data.id}
                                        />
                                        {props.from == 'city' ? data.city_name : data.brandName}
                                    </Typography>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}