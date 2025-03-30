"use client"
import styles from './index.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';

export default function MoreOptionPopup(props:any) {


    const [newApplyFilter, setNewApplyFilters]:any = useState(props.filterdData)

    function updateFilterValue(event:any) {
        let filterData = [...newApplyFilter]
        if(event.target.checked) {
            if(filterData.indexOf(event.target.id.toString()) == -1) {
                filterData.push(event.target.id.toString())
            }
        }
        else {
            if(filterData.indexOf(event.target.id.toString()) > -1) {
                filterData = filterData.filter((val:any) => event.target.id != val)
            }
        }

        setNewApplyFilters(filterData)
        console.log('appliedFilters', filterData)
    }

    function submitUpdatedFilter(from:any) {
        props.updateFilteredData(from == 'clear' ? [] : newApplyFilter, props.from)
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
                                            checked = { newApplyFilter.indexOf(data.id.toString()) > -1 }
                                            onChange={(event) => { updateFilterValue(event) }}
                                            id={data.id}
                                        />
                                        { props.from == 'category' ? data?.name: data?.name }
                                    </Typography>
                                )
                            })
                        }
                    </Box>

                    <Box className={styles.modal_footer}>
                        <Typography className={styles.footer_clear} onClick={ () => submitUpdatedFilter('clear') } > Clear </Typography>
                        <Button className={styles.btn_submit}  onClick={ () => submitUpdatedFilter('update') } > Submit </Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}