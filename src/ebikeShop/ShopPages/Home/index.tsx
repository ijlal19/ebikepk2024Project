"use client"
import ShopMainCategory from "./ShopCategory";
import TopCategories from "./topCategories";
import Banner from "./banner";
import HeadersCategory from '@/ebikeShop/ShopSharedComponent/Header'

const Index = () => {
    return (
        <div>
            <HeadersCategory />
            <Banner />
            <TopCategories />
            <ShopMainCategory />
        </div>
    )
}

export default Index