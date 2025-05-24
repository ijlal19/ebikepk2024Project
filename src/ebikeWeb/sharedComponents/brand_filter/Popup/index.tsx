"use client"
import { getCustomBikeAd } from '@/ebikeWeb/functions/globalFuntions';
import { useParams, useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useState } from 'react';
import * as React from 'react';

export default function MoreOptionPopup(props: any) {
    const [getArray, setGetArray] = useState<number[]>([]);

    useEffect(() => {
        const savedArray = props.from === 'city'
            ? JSON.parse(localStorage.getItem("selectedDataByCity") || "[]")
            : JSON.parse(localStorage.getItem("selectedDataByBrand") || "[]");
        setGetArray(savedArray);
    }, [props.from]);

    const handleAddArray = (e: any, from: any) => {
        const id = Number(e.target.id);
        let updatedArray = [...getArray];

        if (updatedArray.includes(id)) {
            updatedArray = updatedArray.filter((item) => item !== id);
        } else {
            updatedArray.push(id);
        }

        if (from === "brand") {
            localStorage.setItem("selectedDataByBrand", JSON.stringify(updatedArray));
        } else {
            localStorage.setItem("selectedDataByCity", JSON.stringify(updatedArray));
        }

        setGetArray(updatedArray);
    };

    const handlefilterapply = async () => {
        const obj = {
            brand_filter: getArray,
            page: 1,
            adslimit: 12
        }
        const res = await getCustomBikeAd(obj)
        if (res && res?.data?.length > 0) {
            props.setAllBikesArr(res?.data)
            props.setCurrentPage(res?.currentPage)
            props.setTotalPage(res?.pages)
            props.modalData.showmodal('close')
        }
        else {
            props.setCurrentPage(res?.data?.currentPage)
            props.setAllBikesArr([])
            props.setTotalPage(0)
        }
    }

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
                                            checked={getArray?.includes(data?.id)}
                                            onChange={(e) => handleAddArray(e, props.from == 'city' ? "city" : "brand")}
                                            id={data.id}
                                        />
                                        {props.from == 'city' ? data.city_name : data.brandName}
                                    </Typography>
                                )
                            })
                        }
                    </Box>

                    <Box className={styles.modal_footer}>
                        <Button className={styles.footer_clear} onClick={() => props.modalData.showmodal('close')} > cancel </Button>
                        <Button className={styles.btn_submit} onClick={handlefilterapply} > Submit </Button>
                    </Box>

                </Box>
            </Modal>
        </Box>
    );
}