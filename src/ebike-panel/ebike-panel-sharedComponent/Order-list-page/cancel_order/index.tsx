'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import Loader from "../../loader/loader";
import { Pagination } from "@mui/material";
import { GetAllOrders } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { add3Dots } from "@/genericFunctions/geneFunc";

const CancelOrderelist = () => {
    const [AllOrders, setAllOrders] = useState([]);
    const [filteredAllOrders, setfilteredAllOrders] = useState([]);
    const [displayedAllOrders, setdisplayedAllOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 16;

    useEffect(() => {
        fetchAllOrders(1)
    }, [])

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedAllOrders(filteredAllOrders.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredAllOrders.length / itemsPerPage));
    }, [filteredAllOrders, currentPage]);


    const fetchAllOrders = async (pageNo: number) => {
        setIsLoading(true)
        const res = await GetAllOrders()
        if (res && res?.oders.length > 0) {
            const CancelOrders = res.oders.filter((order: any) => order.order_status === "cancel");

            setAllOrders(CancelOrders);
            setfilteredAllOrders(CancelOrders);
            // setAllOrders(res?.oders)
            // setfilteredAllOrders(res?.oders)
            setCurrentPage(pageNo)
        }
        else {
            setAllOrders([])
            setfilteredAllOrders([])
            setdisplayedAllOrders([])
            setCurrentPage(1)
            setTotalPage(0)
        }
        setIsLoading(false)
    }

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className={styles.main}>
            {
                !isLoading ?
                    <div>
                        <div className={styles.card_container1}>
                            {
                                displayedAllOrders?.length > 0 ? (
                                    <div className={styles.card_container}>
                                        {
                                            displayedAllOrders?.map((e: any, i: any) => {
                                                if (e?.order_status !== "cancel") return null;
                                                return (
                                                    <div className={styles.card_main} key={i} >
                                                        <div className={styles.header}>
                                                            <p className={styles.title}>SKU {e?.id} | {add3Dots(e?.product?.product_name, 20)}</p>
                                                        </div>
                                                        <div className={styles.body}>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Order No:</span> {e?.order_form_id} </p>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Quantity:</span> {e?.quantity || "0"} </p>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Size:</span> {e?.product_size || "N/A"} </p>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Amount:</span> <span style={{ color: 'red' }}>{e?.order_price || "0"}</span></p>
                                                        </div>
                                                        <div className={styles.user_info}>
                                                            <p className={styles.heading}>User Info</p>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Name:</span> {e?.order_form?.name || "N/A"} </p>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Address:</span> {e?.order_form?.postal_address || "N/A"} </p>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Phone:</span> {e?.order_form?.contact_number || "N/A"} </p>
                                                            <p className={styles.text}><span style={{ fontWeight: "bold" }}>Date:</span> {e?.order_form?.createdAt.slice(0, 10) || "N/A"} </p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                                    : (
                                        <p style={{ textAlign: "center", fontSize: "20px", gridColumn: "1/-1" }}>No Cancel Orders</p>
                                    )
                            }
                        </div>
                        {AllOrders?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </div>
    )

}
export default CancelOrderelist