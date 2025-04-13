"use client"
import { priceWithCommas, add3Dots, optimizeImage } from '@/genericFunctions/geneFunc';
import { getProduct, getShopCategory } from "@/ebikeShop/Shopfunctions/globalFuntions";
import { Box, Button, Grid, Link, Rating, Typography } from "@mui/material";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import useMediaQuery from '@mui/material/useMediaQuery';
import Person2Icon from '@mui/icons-material/Person2';
import { Navigation, FreeMode } from 'swiper/modules';
import RemoveIcon from '@mui/icons-material/Remove';
import { Swiper, SwiperSlide } from "swiper/react";
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from './index.module.scss';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import data from './data';

import 'swiper/swiper-bundle.css';
import '@/app/globals.scss';
import MainCatgeoryCard from '@/ebikeShop/ShopSharedComponent/MainCategoryCard';

const ProductDetail = () => {

    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [ProductDetail, setProductDetail] = useState<any>([]);
    const [filterProduct, setfilterproduct] = useState<any>([]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [quantity, setQuantity] = useState(1);
    const [value, setValue] = useState(0);
    const params = useParams();
    const { slug2 } = params
    const theme = useTheme();
    const router = useRouter()

    useEffect(() => {
        fetchproductdetail()
    }, [])

    const fetchproductdetail = async () => {
        setIsLoading(true)
        const obj = {
            id: slug2
        }
        const res = await getProduct(obj)
        if (res) {
            setProductDetail(res.data)
        }

        const obj2 = {
            id: res?.data[0]?.main_catagory_id
        }
        const allproduct = await getShopCategory(obj2);
        if (allproduct?.length > 0 && slug2) {
            const allfilterproduct = allproduct.filter((blog: any) => blog.id.toString() !== slug2.toString());
            setfilterproduct(allfilterproduct);
            console.log("data" , allfilterproduct)
        }
        else {
            alert('Check Your Internet!');
        }
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);
    }

    const staticRatings = [
        4.5, 3.8, 5, 2, 3.5, 1.5, 2.5, 2, 3.4, 4.9
    ];

    const reviewNum = [
        '4.8', '4.5', '4.9', '4.6', '4.7', '5.0'
    ]

    const handleIncrease = () => {
        if (quantity < 10) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        dir?: string;
        index: number;
        value: number;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const reViewData = [
        { rating: 4, comment: 'Geniun product available with discounted prices at ebikeshop.pk ', submited: '3 days ago', by: 'Ali' },
        { rating: 5, comment: 'Geniun product available with discounted prices at ebikeshop.pk', submited: '4 days ago', by: 'faizan' },
        { rating: 3, comment: 'Geniun product available with discounted prices at ebikeshop.pk', submited: '7 days ago', by: 'agha' },
        { rating: 3, comment: 'Geniun product available with discounted prices at ebikeshop.pk', submited: '1 days ago', by: 'aslam' },
        { rating: 5, comment: 'Geniun product available with discounted prices at ebikeshop.pk', submited: '6 days ago', by: 'farooq' },
        { rating: 4, comment: 'Geniun product available with discounted prices at ebikeshop.pk', submited: '5 days ago', by: 'fahad' },
        { rating: 3, comment: 'Geniun product available with discounted prices at ebikeshop.pk', submited: '4 days ago', by: 'ismail' },
        { rating: 6, comment: 'Geniun product available with discounted prices at ebikeshop.pk', submited: '3 days ago', by: 'khurram' },
    ]

    function goToRoute(data: any) {
        let urlTitle = '' + data?.product_name.toLowerCase().replaceAll(' ', '-')
        router.push(`/shop/product/${urlTitle}/${data?.id}`)
    }

    return (
        <Box className={styles.main}>
            {
                !IsLoading ?

                    <Box className={styles.container}>

                        <Grid container className={styles.detail_grid_box}>

                            <Grid item xs={isMobile ? 12 : 8.5} className={styles.product_detail}>
                                {
                                    ProductDetail.map((e: any, i: any) => {
                                        return (
                                            <Grid container key={i}>

                                                <Grid item xs={isMobile ? 12 : 6}>
                                                    <Swiper
                                                        spaceBetween={50}
                                                        slidesPerView={1}
                                                        onSlideChange={() => console.log('slide change')}
                                                        onSwiper={(swiper) => console.log(swiper)}
                                                        modules={[Navigation, FreeMode]}
                                                        navigation={true}
                                                        initialSlide={0}
                                                        loop={true}
                                                        className='usedbikeDetailSwiper'
                                                    >
                                                        {
                                                            e?.images && e?.images.length > 0 ?
                                                                e?.images.map((imgUrl: any, ind: any) => {
                                                                    return (
                                                                        <SwiperSlide key={imgUrl} className={styles.image_box}>
                                                                            <img src={
                                                                                optimizeImage(imgUrl , 'h_350' , 'w_350')
                                                                            } alt="" className={styles.image} />
                                                                        </SwiperSlide>
                                                                    )
                                                                }) :
                                                                <SwiperSlide key=''>
                                                                    <img src={
                                                                        optimizeImage('https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' , 'h_250' , 'w_350')
                                                                    } alt='' className={styles.slider_img} />
                                                                </SwiperSlide>
                                                        }
                                                    </Swiper>
                                                </Grid>

                                                <Grid item xs={isMobile ? 12 : 6}>
                                                    <Box className={styles.product_info}>
                                                        <Typography className={styles.name}>{add3Dots(e?.product_name, 30)}</Typography>
                                                        <Typography className={styles.desc}>{e?.product_description}</Typography>
                                                        <Typography className={styles.sell_price}>Rs: {priceWithCommas(e?.sell_price)} </Typography>
                                                        <Typography className={styles.pro_price}><del>Rs: {priceWithCommas(e?.product_price)}</del></Typography>
                                                        <Typography className={styles.review}><StarIcon className={styles.rating_icon} /> {`(${reviewNum[i]})`}</Typography>

                                                        <Box className={styles.quantity_box}>
                                                            Qunatity:
                                                            <RemoveIcon className={styles.action_icon} onClick={handleDecrease} />
                                                            {quantity}
                                                            <AddIcon className={styles.action_icon} onClick={handleIncrease} />
                                                        </Box>
                                                        {
                                                            e?.stocks && e?.stocks.length > 0 ?
                                                            <Button disableRipple className={styles.add_btn}>Add to Cart</Button>
                                                            :""
                                                        }
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            <Grid item xs={isMobile ? 12 : 3.5} className={styles.related_box}>
                                <Typography className={styles.gurante_heading}>Guranteed Low Price</Typography>
                                <Typography className={styles.related_product_heading}>Related Product</Typography>
                                <Box className={styles.realted_content}>
                                    {
                                        filterProduct?.slice(4, 7).map((e: any, i: any) => {
                                            return (
                                                <Box className={styles.related_card_main} key={i} onClick={() => goToRoute(e)}>
                                                    <Box className={styles.image_box}>
                                                        <img src={
                                                            optimizeImage(e?.images[0] , 'h_330' , 'w_350')
                                                        } alt="" className={styles.image} />
                                                    </Box>
                                                    <Box className={styles.card_content}>
                                                        <Typography className={styles.card_name}>
                                                            <Link
                                                                href={`/shop/product/${e?.product_name?.toLowerCase().replaceAll(' ', '-')}/${e?.id}`}
                                                                className={styles.card_name_link}>
                                                                {add3Dots(e?.product_name, 25)}
                                                            </Link>
                                                        </Typography>
                                                        <Typography className={styles.card_price}>{e?.sell_price}</Typography>

                                                        <Typography className={styles.card_rating}><StarIcon sx={{ color: "orange", fontSize: "14px" }} />{`(${reviewNum[i]})`}</Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Grid>

                        </Grid>

                        <Box className={styles.tab_grid_box}>
                            <Box sx={{ bgcolor: 'whitesmoke', width: "100%" }}>
                                <AppBar position="static">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="secondary"
                                        textColor="inherit"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                        sx={{ backgroundColor: "yellowgreen" }}
                                    >
                                        <Tab label="Description" {...a11yProps(0)} />
                                        <Tab label="Review" {...a11yProps(1)} />
                                        <Tab label="Other" {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>

                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Grid container className={styles.product_detail_grid_main}>
                                        <Grid item xs={isMobile ? 12 : 5.5} className={styles.product_tab_info}>
                                            <Box>
                                                <Typography className={styles.heading}>
                                                    PRODUCT DETAIL
                                                </Typography>
                                                {
                                                    ProductDetail.map((e: any, i: any) => {
                                                        return (
                                                            <table className={styles.table_box} key={i}>
                                                                <thead className={styles.table_head}>
                                                                    <tr>
                                                                        <th className={styles.th}>Type</th>
                                                                        <th className={styles.th}>Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className={styles.table_body}>
                                                                    <tr>
                                                                        <td className={styles.td}>Name</td>
                                                                        <td className={styles.td}>{e?.product_name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={styles.td}>Description</td>
                                                                        <td className={styles.td}>{e?.product_description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={styles.td}>Size Guide</td>
                                                                        <td className={styles.td}>N/A</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={styles.td}>Availabe Size</td>
                                                                        <td className={styles.td}>{e?.stocks[0].product_size ? e?.stocks[0].product_size : "N/A"}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={styles.td}>Quality</td>
                                                                        <td className={styles.td}>100% Genuine Product</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        )
                                                    })
                                                }

                                            </Box>
                                        </Grid>
                                        <Grid item xs={isMobile ? 12 : 5.5} className={styles.product_tab_info}>
                                            <Box>
                                                <Typography className={styles.heading}>
                                                    VIDEO
                                                </Typography>
                                                {
                                                    ProductDetail.map((e: any, i: any) => {
                                                        return (
                                                            <iframe
                                                                key={i}
                                                                src={e?.video_url ? e.video_url : "https://www.youtube.com/embed/v4zGbwy0Ltw"}
                                                                className={styles.video_box}
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            ></iframe>
                                                        )
                                                    })}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Box className={styles.customer_review}>
                                        <Typography className={styles.heading}>CUSTOMER REVIEWS</Typography>
                                        {
                                            reViewData?.map((e: any, i: any) => {
                                                return (
                                                    <Box className={styles.card_main} key={i}>
                                                        <Box className={styles.descritpion_box}>
                                                            <Box className={styles.rating}>
                                                                <Rating
                                                                    name="read-only-rating"
                                                                    value={e?.rating}
                                                                    precision={0.5}
                                                                    readOnly
                                                                    sx={{ color: "orange", fontSize: "20px" }}
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55, color: "gray", fontSize: "20px" }} fontSize="inherit" />}
                                                                />
                                                            </Box>
                                                            <Typography className={styles.description}>
                                                                {e?.comment}
                                                            </Typography>
                                                        </Box>
                                                        <Box className={styles.author_detail}>
                                                            <Typography className={styles.day_ago}>Submited : {e?.submited}</Typography>
                                                            <Typography className={styles.name}><Person2Icon className={styles.person_icon} /> {e?.by}</Typography>
                                                        </Box>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                </TabPanel>

                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <Box className={styles.shipping_detail_box}>
                                        <Typography className={styles.shipping_heading}>SHIPPING DETAILS</Typography>
                                        <Box className={styles.Shippin_detail_info}>
                                            <Typography className={styles.shipping_text}>
                                                <Typography className={styles.shipping_conetnt}>1.</Typography>
                                                <Typography className={styles.shipping_conetnt}>
                                                    PAKISTAN WIDE SHIPPING.(Except some Places.)
                                                </Typography>
                                            </Typography>
                                            <Typography className={styles.shipping_text}>
                                                <Typography className={styles.shipping_conetnt}>2.</Typography>
                                                <Typography className={styles.shipping_conetnt}>
                                                    Orders processed timely after the customer verification.
                                                </Typography>
                                            </Typography>
                                            <Typography className={styles.shipping_text}>
                                                <Typography className={styles.shipping_conetnt}>3.</Typography>
                                                <Typography className={styles.shipping_conetnt}>
                                                    Slandered delivery time is 1-4 working days.
                                                </Typography>
                                            </Typography>
                                            <Typography className={styles.shipping_text}>
                                                <Typography className={styles.shipping_conetnt}>4.</Typography>
                                                <Typography className={styles.shipping_conetnt}>
                                                    Due to stock status and time differences, we will choose to ship your item from our first available warehouse for fast delivery.
                                                </Typography>
                                            </Typography>
                                            <Typography className={styles.shipping_text}>
                                                <Typography className={styles.shipping_conetnt}>5.</Typography>
                                                <Typography className={styles.shipping_conetnt}>
                                                    SERVICE TRANSIT TIME is provided by the carrier and excludes weekends and holidays. Transit times may vary, particularly during the holiday season.
                                                </Typography>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Box>

                        <Box className={styles.similar_product}>
                            <Typography className={styles.similar_heading}>Similar Product</Typography>
                            <Box className={styles.similar_card}>
                                {
                                    filterProduct?.slice(7, 11).map((e: any, i: any) => {
                                        return (
                                            // <div key={i} >
                                            <MainCatgeoryCard props={e} rating={staticRatings[i % staticRatings.length]} key={i} />
                                            // </div>
                                        )
                                    })
                                }
                            </Box>
                        </Box>

                    </Box>
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={IsLoading} />
                        </div>
                    </div>
            }
        </Box>
    )
}

export default ProductDetail