'use client'
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import data from './data'
import { Box, useMediaQuery, Button } from "@mui/material";
import { add3Dots, isLoginUser, optimizeImage, priceWithCommas } from "@/genericFunctions/geneFunc";
import { getMyOrder } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";

const My_Order = () => {
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const [isLoading, setIsLoading] = useState<any>(false);
    const [MyAllOrder, setMyAllOrder] = useState<any>([]);
    const IsMobile = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
            console.log("data", _isLoginUser?.info?.id)
            fetchMyOrder(_isLoginUser?.info?.id)
        }
        else {
            setIsLogin("not_login")
        }
    }, [])

    const fetchMyOrder = async (id: any) => {
        setIsLoading(true)
        const getOrder = await getMyOrder(id)
        console.log("data", getOrder?.oders)
        if (getOrder?.oders?.length > 0) {
            setMyAllOrder(getOrder?.oders)
            setIsLoading(false)
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1000);
        }
    }

    return (
        <Box className={styles.main}>
            {
                !isLoading ?

                    <Box className={styles.container}>
                        <table className={styles.table}>
                            <thead className={styles.thead}>
                                <tr className={styles.trow}>
                                    <th className={styles.th_image}>{IsMobile ? "" : ""}</th>
                                    <th className={styles.th_name}>{IsMobile ? "ID" : "ORDER ID"}</th>
                                    <th className={styles.th_quantity}>QT</th>
                                    <th className={styles.th_price}>{IsMobile ? "PKR" : "PRICE"}</th>
                                    <th className={styles.th_date}>DATE</th>
                                    <th className={styles.th_remove}>{IsMobile ? "STATUS" : "STATUS"}</th>
                                    <th className={styles.th_detail}>{IsMobile ? "DETAIL" : "DETAIL"}</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tbody}>
                                {
                                    MyAllOrder?.map((e: any, i: any) => (
                                        <tr className={styles.trow} key={i}>
                                            <td className={styles.td_image_box}>
                                                <img src={optimizeImage(e?.product?.images[0], 'h_150', 'w_150')} alt="" className={styles.image} />
                                            </td>
                                            <td className={styles.td_name}>
                                                {e?.id}
                                            </td>
                                            <td className={styles.td_quantity}>{e?.quantity}</td>
                                            <td className={styles.td_price}>{priceWithCommas(e?.product?.sell_price ? e?.product?.sell_price * e?.quantity : e?.product?.product_price * e?.quantity)}</td>
                                            <td className={styles.td_date}>{e?.createdAt.slice(0, 10)}</td>
                                            <td className={styles.td_remove}>
                                                {e?.order_status}
                                            </td>
                                            <td className={styles.td_detail}>
                                                <Button className={styles.btn}>Detail</Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </Box> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    )
}

export default My_Order