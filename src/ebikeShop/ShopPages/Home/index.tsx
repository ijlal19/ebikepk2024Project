"use client"
import HeadersCategory from '@/ebikeShop/ShopSharedComponent/Header';
import ShopMainCategory from "./ShopCategory";
import TopCategories from "./topCategories";
import Banner from "./banner";
import { useEffect, useRef, useState } from 'react';
import { getShopMainCategory } from '@/ebikeShop/Shopfunctions/globalFuntions';
import Loader from '@/ebikeShop/ShopSharedComponent/loader/loader';

const Index = () => {

    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            fetchShopMainCategory();
    }, []);  

    async function fetchShopMainCategory(){
        setIsLoading(true)
        let res = await getShopMainCategory()
        setData(res)
        setIsLoading(false)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
    }

    return (
        <div>
            <HeadersCategory />
            <Banner />
            {
                !isLoading ?
                    <>
                        <TopCategories />
                        <ShopMainCategory props={data} />
                    </>
                    :
                    <div>
                        <div>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </div>
    )
}

export default Index