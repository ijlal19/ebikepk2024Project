'use client'
import { getShopCategory, getShopMainCategory } from "@/ebikeShop/Shopfunctions/globalFuntions";
import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import Filters from "@/ebikeShop/ShopSharedComponent/filters";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './index.module.scss';

const CategoryDetails = () => {

    const [CategoryData, setCategoryData] = useState<any>([]);
    const [MainCategory, setMainCategory] = useState([]);
    const [showfilter, setshowfilter] = useState(false);
    const IsMobile = useMediaQuery('(max-width:768px');
    const [isLoading, setIsLoading] = useState(false);
    const { slug2 } = useParams();


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
            console.log("data", res)
            setCategoryData(res);
        } else {
            alert('Check Your Internet!');
        }

        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);

    };

    const staticRatings = [4.5, 3.8, 5, 2, 3.5, 1.5, 2.5, 2, 3.4, 4.9];

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }

    return (
        <div className={styles.main}>
            {!isLoading ?
                <>
                    {
                        IsMobile ? <Button disableRipple onClick={filtershow} className={styles.filter_button}>Filters</Button> : ''
                    }
                    <Grid container>

                        <Grid item xs={IsMobile ? 12 : 2.5} className={styles.filter_grid}>
                            {
                                IsMobile ?
                                    showfilter ? <Filters
                                        setLoader={setIsLoading}
                                        selectedCategoryId={slug2}
                                        mainCategoryData={MainCategory}
                                    /> : '' :
                                    <Filters
                                        selectedCategoryId={slug2}
                                        setLoader={setIsLoading}
                                        mainCategoryData={MainCategory}
                                    />
                            }
                        </Grid>

                        <Grid item xs={IsMobile ? 12 : 9.5}>
                            <div className={styles.container}>
                                <div className={styles.main_category}>

                                    <div className={styles.heading_box}>
                                        <p className={styles.heading}
                                        >{CategoryData[0]?.shop_main_catagory?.name}</p>
                                    </div>

                                    <div className={styles.product_main}>
                                        {CategoryData?.map((eProduct: any, index: any) => {
                                            return (
                                                <div key={index}>
                                                    <MainCatgeoryCard props={eProduct} rating={staticRatings[index % staticRatings.length]}/>
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