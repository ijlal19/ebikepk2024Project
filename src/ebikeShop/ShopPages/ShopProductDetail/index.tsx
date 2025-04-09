"use client"
import { getProduct } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import { Box, Button, Grid, Typography } from "@mui/material";
import { priceWithCommas } from '@/genericFunctions/geneFunc';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigation, FreeMode } from 'swiper/modules';
import RemoveIcon from '@mui/icons-material/Remove';
import { Swiper, SwiperSlide } from "swiper/react";
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from './index.module.scss';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import 'swiper/swiper-bundle.css';
import '@/app/globals.scss';

const ProductDetail = () => {

    const theme = useTheme();
    const params = useParams()
    const { slug3 } = params
    const [ProductDetail, setProductDetail] = useState<any>([])
    const [quantity, setQuantity] = useState(1);
    const [IsLoading, setIsLoading] = useState<boolean>(false)
    const [value, setValue] = useState(0);

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        fetchproductdetail()
    }, [])

    const fetchproductdetail = async () => {
        setIsLoading(true)
        const obj = {
            id: slug3
        }
        const res = await getProduct(obj)
        if (res) {
            setProductDetail(res.data)
        }
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);
    }

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

    return (
        <Box className={styles.main}>
            {
                !IsLoading ?

                    <Box className={styles.container}>

                        <Grid container className={styles.detail_grid_box}>

                            <Grid item xs={isMobile ? 12 : 9} className={styles.product_detail}>
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
                                                                            <img src={imgUrl} alt="" className={styles.image} />
                                                                        </SwiperSlide>
                                                                    )
                                                                }) :
                                                                <SwiperSlide key=''>
                                                                    <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' alt='' className={styles.slider_img} />
                                                                </SwiperSlide>
                                                        }
                                                    </Swiper>
                                                </Grid>

                                                <Grid item xs={isMobile ? 12 : 6}>
                                                    <Box className={styles.product_info}>
                                                        <Typography className={styles.name}>{e?.product_name}</Typography>
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
                                                        <Button disableRipple className={styles.add_btn}>Add to Cart</Button>
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            <Grid item xs={isMobile ? 12 : 3} className={styles.related_box}>
                                related product
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
                                    Item Two
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    Item Three
                                </TabPanel>
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