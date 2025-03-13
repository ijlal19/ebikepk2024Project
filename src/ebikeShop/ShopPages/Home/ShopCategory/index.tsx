import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import { getShopMainCategory } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import { useEffect, useState } from "react";
import styles from './index.module.scss';

const ShopMainCategory = () => {

    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        setIsLoading(true)
        const res = await getShopMainCategory()
        setData(res)
        setIsLoading(false)
        console.log("data", res)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }

    return (
        <div className={styles.main}>
            {
                !isLoading ?
                    <div className={styles.container}>
                        {
                            data?.slice(0, 7)?.map((e: any) => {
                                return (
                                    <div className={styles.main_category}>

                                        <div className={styles.heading_box}>
                                            <p className={styles.heading}>{e?.name}</p>
                                        </div>

                                        <div className={styles.product_main}>
                                            {e?.products?.slice(0, 4).map((eProduct: any) => {
                                                return (
                                                    <div>
                                                        <MainCatgeoryCard props={eProduct} />
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div> :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </div>
    )
}

export default ShopMainCategory