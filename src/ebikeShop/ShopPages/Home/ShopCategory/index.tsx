import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import Filters from "@/ebikeShop/ShopSharedComponent/filters";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useState } from "react";

const ShopMainCategory = ({ props }: any) => {
    const [showfilter, setshowfilter] = useState(false);
    const IsMobile = useMediaQuery('(max-width:768px');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    function goToRoute(data: any) {
        let urlTitle = '' + data?.name.toLowerCase().replaceAll(' ', '-')
        router.push(`/shop/${urlTitle}/${data?.id}`)
        console.log("data", data)
    }

    const staticRatings = [4.5, 3.8, 5, 2, 3.5, 1.5, 2.5, 2, 3.4, 4.9];

    const filtershow = () => {
        setshowfilter(!showfilter);
        window.scrollTo(0, 0);
    }

    return (
        <div className={styles.main}>
            {
                !isLoading ?
                    <>
                        {
                            IsMobile ? <Button disableRipple onClick={filtershow} className={styles.filter_button}>Filters</Button> : ''
                        }
                        <Grid container>

                            <Grid item xs={IsMobile ? 12 : 2.5}>
                                {
                                    IsMobile ?
                                        showfilter ? <Filters
                                            setLoader={setIsLoading}
                                            mainCategoryData={props}
                                            selectedCategoryId=""
                                        /> : '' :
                                        <Filters
                                            setLoader={setIsLoading}
                                            mainCategoryData={props}
                                            selectedCategoryId=""
                                        />
                                }
                            </Grid>

                            <Grid item xs={IsMobile ? 12 : 9.5}>
                                <div className={styles.container}>
                                    {
                                        props?.slice(0, 7)?.map((e: any, i: any) => {
                                            return (
                                                <div className={styles.main_category} key={i}>

                                                    <div className={styles.heading_box}>
                                                        <p className={styles.heading} onClick={() => goToRoute(e)}>{e?.name}</p>
                                                    </div>

                                                    <div className={styles.product_main}>
                                                        {e?.products?.slice(0, 4).map((eProduct: any, index: any) => {
                                                            return (
                                                                <div key={index}>
                                                                    <MainCatgeoryCard props={eProduct} rating={staticRatings[i % staticRatings.length]} CategoryName={e?.name}/>
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