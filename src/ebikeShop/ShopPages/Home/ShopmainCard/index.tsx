import { getShopMainCategory } from "@/ebikeShop/Shopfunctions/globalFuntions";
import MainCatgeoryCard from "@/ebikeShop/ShopSharedComponent/MainCategoryCard";
import { useEffect, useState } from "react";
import styles from './index.module.scss';

const ShopMainCategory = ()=>{

    const [ShopMainCategoryData,setMainCategoryData] = useState<any>([]);

    useEffect(()=>{
        fetch()
    },[])

    const fetch =async ()=>{
        const res =await getShopMainCategory()
        setMainCategoryData(res)
    }

return(
<div className={styles.main}>
    <div className={styles.container}>
    {
        ShopMainCategoryData?.map((e:any)=>{
            return(
                <MainCatgeoryCard props={e} />
            )
        })
    }
    </div>
</div>
)
}

export default ShopMainCategory