import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import { getShopMainCategory } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeShop/ShopSharedComponent/loader/loader";
import { useEffect, useState } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/navigation";

const ShopMainCategory = () => {

    const [data, setData] = useState<any>([]);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchShopMainCategory()
    }, [])

    const fetchShopMainCategory = async () => {
        setIsLoading(true)
        const res = await getShopMainCategory()
        setData(res)
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }

    function goToRoute(data: any) {
        let urlTitle = '' + data?.name.toLowerCase().replaceAll(' ', '-')
        router.push(`/shop/${urlTitle}/${data?.id}`)
        console.log("data" , data)
    }

    const staticRatings = [4.5, 3.8, 5, 2, 3.5, 1.5,2.5,2,3.4,4.9];

    return (
        <div className={styles.main}>
            {
                !isLoading ?
                    <div className={styles.container}>
                        {
                            data?.slice(0, 7)?.map((e: any,i:any) => {
                                return (
                                    <div className={styles.main_category} key={i}>

                                        <div className={styles.heading_box}>
                                            <p className={styles.heading}  onClick={() => goToRoute(e)}>{e?.name}</p>
                                        </div>

                                        <div className={styles.product_main}>
                                            {e?.products?.slice(0, 4).map((eProduct: any, index:any) => {
                                                return (
                                                    <div key={index}>
                                                        <MainCatgeoryCard props={eProduct} rating={staticRatings[i % staticRatings.length]}/>
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