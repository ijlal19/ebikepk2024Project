import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import Filters from "@/ebikeShop/ShopSharedComponent/filters";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useState } from "react";

const ShopMainCategory = ({ props }: any) => {
    const IsMobile = useMediaQuery('(max-width:768px');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    function goToRoute(data: any) {
        let urlTitle = '' + data?.name.toLowerCase().replaceAll(' ', '-')
        router.push(`/shop/collection/${urlTitle}/${data?.id}`)
    }

    const reviewNum = [
        '4.5', '3.5', '4.7', '3'
    ]

    const reviewNum2 = [
        '5', '3.5', '4', '4.5'
    ]

    return (
        <div className={styles.main}>
            {
                !isLoading ?
                    <>
                        <Grid container>
                            <Grid item xs={IsMobile ? 12 : 12}>
                                <div className={styles.container}>
                                    {
                                        props?.slice(0, 7)?.map((e: any, i: any) => {
                                            const ratingData = i % 2 === 0 ? reviewNum : reviewNum2; // alternate arrays
                                            return (
                                                <div className={styles.main_category} key={i}>

                                                    <div className={styles.heading_box}>
                                                        <p className={styles.heading} onClick={() => goToRoute(e)}>{e?.name}</p>
                                                    </div>

                                                    <div className={styles.product_main}>
                                                        {e?.products?.slice(0, 4).map((eProduct: any, index: any) => {
                                                            return (
                                                                <div key={index}>
                                                                    <MainCatgeoryCard props={eProduct} rating={ratingData} i={index} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Grid>

                        </Grid>
                    </>
                    : <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </div>
    )
}

export default ShopMainCategory