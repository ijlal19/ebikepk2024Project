'use client'
import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import { getShopCategory } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import Filters from "@/ebikeShop/ShopSharedComponent/filters";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './index.module.scss';

const CategoryDetails = () => {
    const { slug, slug2 } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [CategoryData, setCategoryData] = useState<any>([])

    useEffect(() => {
        fetchShopCategory()
    }, [])

    const fetchShopCategory = async () => {
        setIsLoading(true)
        const obj = {
            id: slug2
        }
        const res = await getShopCategory(obj)
        if (res) {
            setCategoryData(res)
        }
        else {
            alert('Check Your Internet!')
        }
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }
    const staticRatings = [4.5, 3.8, 5, 2, 3.5, 1.5, 2.5, 2, 3.4, 4.9];

    return (
        <div className={styles.main}>
            {
                !isLoading ?
                    <div className={styles.container}>
                        {
                            !isLoading ?
                                <Filters
                                    setLoader={setIsLoading}
                                    updateData={setCategoryData}
                                    fetchBikeInfo={fetchShopCategory}
                                />
                                : ""
                        }
                        <div className={styles.heading}>{CategoryData[0]?.shop_main_catagory?.name}</div>
                        <div className={styles.cardmain}>
                            {
                                CategoryData?.map((e: any, i: any) => {
                                    return (
                                        <MainCatgeoryCard props={e} key={i} rating={staticRatings[i % staticRatings.length]} />
                                    )
                                })
                            }
                        </div>
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
export default CategoryDetails