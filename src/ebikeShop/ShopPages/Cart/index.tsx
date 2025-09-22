'use client'
import { add3Dots, cloudinaryLoader, isLoginUser, optimizeImage, priceWithCommas } from "@/genericFunctions/geneFunc";
import { DeleteuserCart, getMyOrder, GetUserCart, PostOrder } from "@/ebikeShop/Shopfunctions/globalFuntions";
import { Box, Grid, useMediaQuery, Typography, Button } from "@mui/material";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import styles from './index.module.scss';
import Modal from '@mui/material/Modal';



const MyCart = () => {
    const [PaymentMethod, setPaymentMethod] = useState<any>('');
    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const IsMobile = useMediaQuery('(max-width:768px)');
    const [OrderNote, setOrderNote] = useState<any>('');
    const [UserAddress, setAddress] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);
    const [MyCartdata, setMyCart] = useState<any>([]);
    const [UserEmail, setEmail] = useState<any>('');
    const [UserPhone, setPhone] = useState<any>();
    const [UserName, setName] = useState<any>('');
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [AllOrder, setOrder] = useState<any>([]);

    useEffect(() => {
        let _isLoginUser = isLoginUser();
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info);
            fecthUserCart(_isLoginUser?.info?.id);
            // getorder(_isLoginUser?.info?.id)
            // getorder()
        } else {
            setIsLogin("not_login");
        }
    }, []);

    // const getorder = async (id:any) => {
    //     const res = await getMyOrder(id)
    //     console.log('data' , res)
    // }

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
            // alert('Window reload again')
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

    // if (groupedCart) {
    //     const obj = groupedCart?.map((e: any) => {
    //         return {
    //             uid: e?.userId,
    //             productId: e?.productId,
    //             quantity: e?.quantity,
    //             product_size: e?.size,
    //             product_price: e?.quantity * e?.totalPrice,
    //             discount_price: e?.quantity * e?.totalPrice
    //         };
    //     });

    //     setOrder(obj);
    //     console.log("data", obj);
    // }


    useEffect(() => {
        if (groupedCart && groupedCart.length > 0) {
            const obj = groupedCart.map((e: any) => {
                return {
                    uid: e?.userId,
                    productId: e?.productId,
                    quantity: e?.quantity,
                    product_size: e?.size,
                    product_price: e?.quantity * e?.totalPrice,
                    discount_price: e?.quantity * e?.totalPrice
                };
            });
            setOrder(obj);
        }
    }, [groupedCart]);


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
            console.log("error")
        }
    }

    const handlesubmit = async (e: any) => {
        e?.preventDefault()
        if (UserName.length > 3 && UserEmail.length > 5 && UserPhone.length > 10 && UserAddress.length > 5 && OrderNote.length > 1 && PaymentMethod.length > 3) {

            const obj = {
                name: UserName,
                email: UserEmail,
                postal_address: UserAddress,
                contact_number: UserPhone,
                description: OrderNote,
                payment_type: PaymentMethod,
                uid: IsLogin?.id,
            }
            const postorder = await PostOrder(
                { orderForm: obj, orders: AllOrder }
            )
            if (postorder) {
                groupedCart?.map((e: any) => {
                    deleteCartFunc(e?.id)
                })
                console.log("data", postorder)
            }
            else {
                console.log('data error ', 'error')
            }
        }
    }
    return (
        <Box className={styles.main}>
            {
                !isLoading ?

                    <>
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
                                                    <img src={cloudinaryLoader(e?.product?.images[0], 400 , 'auto')} alt="" className={styles.image} />
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
                                    <Button className={styles.checkout_button} onClick={handleOpen}>PROCEED TO CHECKOUT</Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Modal
                            className={styles.popup_main}
                            open={open}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className={styles.popup_box}>
                                <Box className={styles.popup_header}>
                                    <Typography className={styles.heading}>Order Form</Typography>
                                    <Typography className={styles.icon_box}><CloseIcon className={styles.icon} onClick={handleClose} /></Typography>
                                </Box>
                                <form action="" className={styles.form_box} onSubmit={handlesubmit}>
                                    <Box className={styles.input_main}>
                                        <label htmlFor="Name" className={styles.input_label}>Name:</label>
                                        <input type="text" id="Name" placeholder="asad" className={styles.inputs} onChange={(e) => setName(e?.target?.value)} required />
                                    </Box>
                                    <Box className={styles.input_main}>
                                        <label htmlFor="Email" className={styles.input_label}>Email:</label>
                                        <input type="email" id="Email" placeholder="asad@yopmail.com" className={styles.inputs} onChange={(e) => setEmail(e?.target?.value)} required />
                                    </Box>
                                    <Box className={styles.input_main}>
                                        <label htmlFor="Phone" className={styles.input_label}>Phone No:</label>
                                        <input type="number" id="Phone" placeholder="Phone No" className={styles.inputs} onChange={(e) => setPhone(e?.target?.value)} required />
                                    </Box>
                                    <Box className={styles.input_main}>
                                        <label htmlFor="Order" className={styles.input_label}>Order Note:</label>
                                        <input type="text" id="Order" placeholder="Order Note" className={styles.inputs} onChange={(e) => setOrderNote(e?.target?.value)} required />
                                    </Box>
                                    <Box className={styles.input_main}>
                                        <label htmlFor="Address" className={styles.input_label}>Address:</label>
                                        <textarea id="Address" placeholder="Address" className={styles.textarea} onChange={(e) => setAddress(e?.target?.value)} required ></textarea>
                                    </Box>
                                    <Box className={styles.input_main}>
                                        <select name="" id="" className={styles.select_main} onChange={(e) => setPaymentMethod(e?.target?.value)}>
                                            <option value="" className={styles.select_options} selected disabled hidden>Select Payment Method</option>
                                            <option value="cash" className={styles.select_options}>Cash on Delivery</option>
                                            <option value="easy paisa" className={styles.select_options}>Easy Paisa Transfer</option>
                                            <option value="bank account" className={styles.select_options}>Bank Account Transfer</option>
                                        </select>
                                    </Box>
                                    <Button disableRipple className={styles.submit_btn} type="submit" >Submit</Button>
                                </form>
                            </Box>
                        </Modal>
                    </>
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