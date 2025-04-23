'use client'
import { add3Dots, isLoginUser, optimizeImage, priceWithCommas } from "@/genericFunctions/geneFunc";
import { Box, useMediaQuery, Button, Typography } from "@mui/material";
import { getMyOrder } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import data from './data';

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
        const getOrder = await  (id)
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
                                            {MyAllOrder?.map((e: any, i: any) => {
                                        return (
                        <Box key={i} className={styles.detail_main}>
                            <Box className={styles.both_row}>
                            <Box className={styles.user_detail}>
                                <Typography className={styles.heading}>USER DETAIL</Typography>
                                   <Typography className={styles.user_detail_text}><span className={styles.span} >NAME : </span> {e?.order_form?.name}</Typography>
                                <Typography className={styles.user_detail_text}><span className={styles.span} >EMAIL : </span> {e?.order_form?.email}</Typography>
                                <Typography className={styles.user_detail_text}><span className={styles.span} >ADDRESS : </span> {e?.order_form?.postal_address}</Typography>
                                <Typography className={styles.user_detail_text}><span className={styles.span} >PAYMENT METHOD : </span> {e?.order_form?.payment_type}</Typography>

                                </Box>
                            <Box className={styles.order_detail}>
                                <Typography className={styles.heading}>ORDER DETAIL</Typography>
                                <Typography className={styles.order_detail_text}><span className={styles.span} >ORDER ID : </span> {e?.order_form_id}</Typography>
                                <Typography className={styles.order_detail_text}><span className={styles.span} >TOTAL PRICE : </span> {priceWithCommas(e?.product?.product_price? e?.product?.product_price * e?.quantity : e?.discount_price * e?.quantity) }</Typography>
                                <Typography className={styles.order_detail_text}><span className={styles.span} >DISCOUNTED PRICE : </span> {priceWithCommas(e?.discount_price? e?.discount_price * e?.quantity : e?.product?.product_price * e?.quantity)}</Typography>
                                <Typography className={styles.order_detail_text}><span className={styles.span} >DATE : </span> {e?.createdAt?.slice(0,10)}</Typography>
                                <Typography className={styles.order_detail_text}><span className={styles.span} >STATUS : </span> {e?.order_status}</Typography>


                                </Box>
                                </Box>
                            <Box className={styles.product_detail}>
                                <Typography className={styles.heading}>PRODUCT DETAIL</Typography>
<Box className={styles.card_main}>
    <Box className={styles.image_box}><img src={optimizeImage(e?.product?.images[0], 'h_150', 'w_150')} alt={e?.product?.product_name.slice(0,10)} className={styles.image} /></Box>
    <Box className={styles.card_detail}>
        <Typography className={styles.product_detail_text}><span className={styles.span}>NAME : </span>{add3Dots(e?.product?.product_name ,IsMobile? 20 : 100)}</Typography>
        <Typography className={styles.product_detail_text}><span className={styles.span}>PRICE : </span>{priceWithCommas(e?.discount_price? e?.discount_price: e?.product?.product_price )}</Typography>
        <Typography className={styles.product_detail_text}><span className={styles.span}>QUANTITY : </span>{e?.quantity}</Typography>
        <Typography className={styles.product_detail_text}><span className={styles.span}>TOTAL PRICE : </span>{priceWithCommas(e?.discount_price? e?.discount_price * e?.quantity : e?.product?.product_price * e?.quantity)}</Typography>
    </Box>
    </Box>

                                </Box>
                
                            </Box>
                    )
                })}
                                    </Box> 
                    :
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







// 'use client'
// import React, { useEffect, useState } from "react";
// import styles from './index.module.scss';
// import data from './data'
// import { Box, useMediaQuery, Button } from "@mui/material";
// import { add3Dots, isLoginUser, optimizeImage, priceWithCommas } from "@/genericFunctions/geneFunc";
// import { getMyOrder } from "@/ebikeShop/Shopfunctions/globalFuntions";
// import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";

// const My_Order = () => {
//     const [IsLogin, setIsLogin] = useState<any>('not_login');
//     const [isLoading, setIsLoading] = useState<any>(false);
//     const [MyAllOrder, setMyAllOrder] = useState<any>([]);
//     const IsMobile = useMediaQuery('(max-width:768px)');

//     useEffect(() => {
//         let _isLoginUser = isLoginUser()
//         if (_isLoginUser?.login) {
//             setIsLogin(_isLoginUser.info)
//             console.log("data", _isLoginUser?.info?.id)
//             fetchMyOrder(_isLoginUser?.info?.id)
//         }
//         else {
//             setIsLogin("not_login")
//         }
//     }, [])

//     const fetchMyOrder = async (id: any) => {
//         setIsLoading(false)
//         const getOrder = await getMyOrder(id)
//         console.log("data", getOrder?.oders)
//         if (getOrder?.oders?.length > 0) {
//             setMyAllOrder(getOrder?.oders)
//             setIsLoading(false)
//             setTimeout(() => {
//                 window.scrollTo(0, 0);
//             }, 1000);
//         }
//     }

//     return (
//         <Box className={styles.main}>
//             {
//                 !isLoading ?

//                     <Box className={styles.container}>
//                         <table className={styles.table}>
//                             <thead className={styles.thead}>
//                                 <tr className={styles.trow}>
//                                     <th className={styles.th_image}>{IsMobile ? "" : ""}</th>
//                                     <th className={styles.th_name}>{IsMobile ? "ID" : "ORDER ID"}</th>
//                                     <th className={styles.th_quantity}>QT</th>
//                                     <th className={styles.th_price}>{IsMobile ? "PKR" : "PRICE"}</th>
//                                     <th className={styles.th_date}>DATE</th>
//                                     <th className={styles.th_remove}>{IsMobile ? "STATUS" : "STATUS"}</th>
//                                     <th className={styles.th_detail}>{IsMobile ? "DETAIL" : "DETAIL"}</th>
//                                 </tr>
//                             </thead>
//                                 {
//                                     // MyAllOrder?.map((e: any, i: any) => (
//                                     data?.map((e: any, i: any) => {
//                                         return (
//                                             <tbody className={styles.tbody}>
//                                             {/* <> */}
//                                             <tr>
//                                                     {/* <td colSpan={7} >{e?.user?.email}</td> */}
//                                                     <td colSpan={7} >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam repellendus exercitationem numquam, cumque possimus illo alias provident iusto voluptate ad autem esse rerum ex deleniti dicta a quisquam unde laboriosam nesciunt. Accusantium laboriosam deserunt error est tempora laborum quis unde porro nam eum, corrupti eos aperiam temporibus debitis iste a autem voluptatibus. Eveniet modi perspiciatis eos suscipit harum, dolore architecto autem similique quia dolores accusamus aut placeat reprehenderit! Similique sunt vitae asperiores reprehenderit expedita, unde, perferendis suscipit, cupiditate accusamus ipsam quam nam quod molestiae. Commodi tenetur atque ullam porro accusantium nulla ut distinctio tempora eos, sint doloribus ab recusandae enim?</td>
//                                                     {/* <td></td>
//                                                     <td></td> */}
//                                                 </tr>
//                                                 <tr className={styles.trow} key={i}>
//                                                     <td className={styles.td_image_box}>
//                                                         <img src={optimizeImage(e?.product?.images[0], 'h_150', 'w_150')} alt="" className={styles.image} />
//                                                     </td>
//                                                     <td className={styles.td_name}>
//                                                         {e?.id}
//                                                     </td>
//                                                     <td className={styles.td_quantity}>{e?.quantity}</td>
//                                                     <td className={styles.td_price}>{priceWithCommas(e?.product?.sell_price ? e?.product?.sell_price * e?.quantity : e?.product?.product_price * e?.quantity)}</td>
//                                                     <td className={styles.td_date}>{e?.createdAt.slice(0, 10)}</td>
//                                                     <td className={styles.td_remove}>
//                                                         {e?.order_status}
//                                                     </td>
//                                                     <td className={styles.td_detail}>
//                                                         <Button className={styles.btn}>Detail</Button>
//                                                     </td>
//                                                 </tr>
//                                                 </tbody>
                                                
//                                             // </>
//                                         )
//                                     })}
//                         </table>
//                     </Box> :
//                     <div className={styles.load_main}>
//                         <div className={styles.load_div}>
//                             <Loader isLoading={isLoading} />
//                         </div>
//                     </div>
//             }
//         </Box>
//     )
// }

// export default My_Order