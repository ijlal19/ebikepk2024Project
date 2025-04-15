'use client'
import { getShopCategory, getShopMainCategory } from "@/ebikeShop/Shopfunctions/globalFuntions";
import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import { Button, Grid, IconButton, useMediaQuery } from "@mui/material";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartIcon from "@/ebikeShop/ShopSharedComponent/cartIcon";
import Filters from "@/ebikeShop/ShopSharedComponent/filters";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useParams, useRouter } from "next/navigation";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import styles from './index.module.scss';


const CategoryDetails = () => {

    const [filteredData, setFilteredData] = useState([]);
    const [CategoryData, setCategoryData] = useState<any>([]);
    const [MainCategory, setMainCategory] = useState([]);
    const [showfilter, setshowfilter] = useState(false);
    const IsMobile = useMediaQuery('(max-width:768px');
    const [isLoading, setIsLoading] = useState(false);
    const { slug2 } = useParams();
    const Router = useRouter()


    useEffect(() => {
        fetchShopCategory();
    }, []);

    const fetchShopCategory = async () => {
        setIsLoading(true);
        const obj = { id: slug2 };
        let res1 = await getShopMainCategory();
        setMainCategory(res1);

        const res = await getShopCategory(obj);
        if (res) {
            setCategoryData(res);
        } else {
            alert('Check Your Internet!');
        }

        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);

    };

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }: any) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleCart = () => {
        Router.push('/shop/cart')
    }

    const propsData = {
        selectedCategoryId: slug2,
        MainCategoryData: MainCategory,
        setLoader: setIsLoading,
        setFilteredData: setFilteredData
    }

    const reviewNum = [
        '3.7', '3.5', '4.7', '4.5'
    ]

    const reviewNum2 = [
        '5', '3', '4', '6'
    ]

    return (
        <div className={styles.main}>
            {!isLoading ?
                <>
                    {
                        IsMobile ? <Button disableRipple onClick={filtershow} className={styles.filter_button}>Filters</Button> : ''
                    }
                    <Grid container>

                        <Grid item xs={IsMobile ? 12 : 2} className={styles.filter_grid}>
                            {
                                IsMobile ?
                                    showfilter ?
                                        <Filters props={propsData} mainCategoryData={MainCategory}
                                        />
                                        : '' :
                                    <Filters props={propsData} mainCategoryData={MainCategory}
                                    />
                            }
                        </Grid>

                        <Grid item xs={IsMobile ? 12 : 10}>
                            <div className={styles.container}>
                                <div className={styles.main_category}>

                                    <div className={styles.heading_box}>
                                        <p className={styles.heading}
                                        >{CategoryData[0]?.shop_main_catagory?.name}</p>
                                        <CartIcon />
                                    </div>

                                    <div className={styles.product_main}>
                                        {
                                            filteredData && filteredData.length > 0 ?
                                                filteredData.map((eProduct: any, index: any) => {
                                                    const selectedRating = index % 2 === 0 ? reviewNum2 : reviewNum;
                                                    return (
                                                        <div key={index}>
                                                            <MainCatgeoryCard props={eProduct} rating={selectedRating} i={index} />
                                                        </div>
                                                    )
                                                }) :
                                                CategoryData?.map((eProduct: any, index: any) => {
                                                    const selectedRating = index % 2 === 0 ? reviewNum2 : reviewNum;
                                                    return (
                                                        <div key={index}>
                                                            <MainCatgeoryCard props={eProduct} rating={selectedRating} i={index} />
                                                        </div>
                                                    )
                                                })}
                                    </div>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </>
                : (
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default CategoryDetails;