'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { New_header } from "../panel-header";
import { DeleteCouponCode, GetAllCouponCode } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { AddCOuponCode } from "../all-panel-cards/popup";
import Loader from "../loader/loader";

const CouponCode = () => {
    const [isLoading, setIsloading] = useState(false)
    const [open, setOpen] = useState(false);
    const [AllCode, setAllCode] = useState([]);

    useEffect(() => {
        fetchAllCode()
    }, [])
    const fetchAllCode = async () => {
        setIsloading(true)
        const res = await GetAllCouponCode()
        if (res && res?.length > 0) {
            setAllCode(res)
        }
        else {
            setAllCode([])
            alert("Something went wrong reload page!")
        }
        setIsloading(false)
    }

    const handleAddCoupon = () => {
        setOpen(true);
    }
    const handleDelte = async (id: any) => {
        const confirmDelete = window.confirm("Are you sure you want to Delete this Coupon");
        if (!confirmDelete) return;

        const res = await DeleteCouponCode(id)
        if (res && res.success && res.info == "Deleted") {
            alert("Delete Successfully")
            fetchAllCode()
        }
        else {
            alert("Something went wrong")
        }
    }

    return (
        <div className={styles.main}>
            <New_header />
            {
                !isLoading ?
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <p className={styles.heading}>Coupon List</p>
                            <button onClick={handleAddCoupon} className={styles.btn} >Add Coupon</button>
                        </div>
                        <div className={styles.card_box}>
                            {
                                AllCode?.map((e: any, i: any) => {
                                    return (
                                        <div className={styles.card_main} key={i} >
                                            <p className={styles.heading}>{e?.name}</p>
                                            <div className={styles.info}>
                                                <p className={styles.text}><span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Code:</span> {e?.code}</p>
                                                <p className={styles.text}><span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Percentage:</span> {e?.percentage}</p>
                                                <p className={styles.text}><span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Valid below this amount:</span> {e?.valid_for_amount_above}</p>
                                                <p className={styles.text}><span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Date:</span> {e?.createdAt?.slice(0, 10)}</p>
                                                <button className={styles.delbtn} onClick={() => handleDelte(e?.id)} >Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> :
                    <div className={styles.loader_container}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
            <AddCOuponCode open={open} onClose={() => setOpen(false)} funct={fetchAllCode}/>
        </div>
    )
}

export default CouponCode