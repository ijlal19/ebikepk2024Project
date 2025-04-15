'use client'
import { add3Dots, isLoginUser, optimizeImage, priceWithCommas } from "@/genericFunctions/geneFunc";
import { DeleteuserCart, GetUserCart } from "@/ebikeShop/Shopfunctions/globalFuntions";
import { Box, Grid, useMediaQuery, Typography, Button } from "@mui/material";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import styles from './index.module.scss';

const MyCart = () => {
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const IsMobile = useMediaQuery('(max-width:768px)');
    const [isLoading, setIsLoading] = useState(false);
    const [MyCartdata, setMyCart] = useState<any>([]);

    useEffect(() => {
        let _isLoginUser = isLoginUser();
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info);
            fecthUserCart(_isLoginUser?.info?.id);
        } else {
            setIsLogin("not_login");
        }
    }, []);

    const fecthUserCart = async (id: any) => {
        setIsLoading(true)
        const obj = { userId: id };
        const usercart = await GetUserCart(obj);
        if (usercart) {
            setMyCart(usercart);
            setIsLoading(false)
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1000);
            return
        }
        else {
            alert('Window reload again')
        }
    };

    const groupCartItems = (cart: any[]) => {
        const grouped: any = {};

        cart.map((item: any) => {
            const productId = item?.product?.id;
            if (!grouped[productId]) {
                grouped[productId] = {
                    ...item,
                    quantity: item?.quantity,
                    totalPrice: item.quantity * item?.product?.sell_price
                };
            } else {
                grouped[productId].quantity += item.quantity;
                grouped[productId].totalPrice += item.quantity * item?.product?.sell_price;
            }
        });

        return Object.values(grouped);
    };

    const groupedCart = groupCartItems(MyCartdata);
    const cartTotal = groupedCart.reduce((acc: any, item: any) => acc + item?.totalPrice, 0);

    const deleteCartFunc = async (id: any) => {
        setIsLoading(true)
        const deleteCartbyID = await DeleteuserCart(id)
        if (deleteCartbyID) {
            setIsLoading(false)
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1000);
            window.location.reload()
        }
        else {
            alert("please wait!")
        }
    }

    return (
        <Box className={styles.main}>
            {
                !isLoading ?

                    <Grid container className={styles.cart_container}>
                        <Grid item xs={IsMobile ? 12 : 8} className={styles.cart_grid}>
                            <table className={styles.table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.trow}>
                                        <th className={styles.th_image}>{IsMobile ? "" : "Image"}</th>
                                        <th className={styles.th_name}>{IsMobile ? "Name" : "Product Name"}</th>
                                        <th className={styles.th_quantity}>Quantity</th>
                                        <th className={styles.th_price}>Price</th>
                                        <th className={styles.th_remove}>{IsMobile ? "" : "Remove"}</th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {groupedCart.map((e: any, i: number) => (
                                        <tr className={styles.trow} key={i}>
                                            <td className={styles.td_image_box}>
                                                <img src={optimizeImage(e?.product?.images[0], 'h_150', 'w_150')} alt="" className={styles.image} />
                                            </td>
                                            <td className={styles.td_name}>
                                                {IsMobile ? add3Dots(e?.product?.product_name, 15) : add3Dots(e?.product?.product_name, 50)}
                                            </td>
                                            <td className={styles.td_quantity}>{e?.quantity}</td>
                                            <td className={styles.td_price}>{priceWithCommas(e?.totalPrice)}</td>
                                            <td className={styles.td_remove}>
                                                <DeleteIcon className={styles.icon} onClick={() => deleteCartFunc(e?.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Grid>

                        <Grid item xs={IsMobile ? 12 : 4} className={styles.cart_total_grid}>
                            <Box className={styles.total_box_main}>
                                <Typography className={styles.heading}>CART TOTAL</Typography>
                                <Box className={styles.total_box}>
                                    <Typography className={styles.total}>SUB TOTAL:</Typography>
                                    <Typography className={styles.total_num}>{priceWithCommas(`${cartTotal}`)}</Typography>
                                </Box>
                                <Box className={styles.total_box}>
                                    <Typography className={styles.total}>TOTAL:</Typography>
                                    <Typography className={styles.total_num}>{priceWithCommas(`${cartTotal}`)}</Typography>
                                </Box>
                                <Button className={styles.checkout_button}>PROCEED TO CHECKOUT</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </Box>
    );
};

export default MyCart;
