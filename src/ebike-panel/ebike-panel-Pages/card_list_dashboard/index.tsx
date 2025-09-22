'use client'
import { AllBrands_Card, AllCities_Card, AllPages_Card, Blog_Card, Dealer_Card, Mechanic_Card, New_bike_card, ProductList_Card, Used_bike_card, Electric_Bike_Card, ShopBrand, ForuAllMainCateg, ThreadList_Card, ThreadComments_Card } from "@/ebike-panel/ebike-panel-sharedComponent/all-panel-cards"
import { AddNewBikeForm, AddBlogForm, AddNewElectricBikeForm, AddPageForm, AddProductForm, AddBrandForm, AddCategoryForm } from "@/ebike-panel/ebike-panel-sharedComponent/Add-new-forms";
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { useParams, useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useEffect } from "react";
import OrderListPage from "@/ebike-panel/ebike-panel-sharedComponent/Order-list-page";
import CouponCode from "@/ebike-panel/ebike-panel-sharedComponent/Coupon-list";
import BikeForums from "@/ebike-panel/ebike-panel-sharedComponent/panel-ebike-fourms/bikers-forums";
import ForumSubCateg from "@/ebike-panel/ebike-panel-sharedComponent/panel-ebike-fourms/forum-sub-category";

const Dashboard_page = () => {

    const { slug } = useParams()
    const router = useRouter()
    
    useEffect(() => {
        const pathname = window.location.pathname
        checkAuthAndRedirect(router , pathname)
    }, [])

    const SetComponent = (route: any) => {
        if (route == "view-classified-ads") {
            return <Used_bike_card />
        }
        else if (route == 'all-new-bikes') {
            return <New_bike_card />
        }
        else if (route == 'all-electric-bikes') {
            return <Electric_Bike_Card />
        }
        else if (route == "add-new-bike") {
            return <AddNewBikeForm />
        }
        else if (route == "add-electric-bike") {
            return <AddNewElectricBikeForm />
        }
        else if (route == "blog-list") {
            return <Blog_Card />
        }
        else if (route == "create-blog-post") {
            return <AddBlogForm />
        }
        else if (route == "all-dealers") {
            return <Dealer_Card />
        }
        else if (route == "all-mechanics") {
            return <Mechanic_Card />
        }
        else if(route == "all-pages"){
            return <AllPages_Card />
        }
        else if(route == "add-new-page"){
            return <AddPageForm />
        }
        else if(route == "all-bike-brands"){
            return <AllBrands_Card />
        }
        else if(route == "add-new-brand"){
            return <AddBrandForm />
        }
        else if(route == "all-cities"){
            return <AllCities_Card />
        }
        else if(route == "product-list"){
            return <ProductList_Card />
        }
        else if(route == "add-products"){
            return <AddProductForm />
        }
        else if(route == "add-shop-category"){
            return <AddCategoryForm />
        }
        else if(route == "shop-brand-list"){
            return <ShopBrand />
        }
        else if(route == "order-list"){
            return <OrderListPage />
        }
        else if(route == "coupon-list"){
            return <CouponCode />
        }
        else if(route == "forum-main-category"){
            return <BikeForums />
        }
        else if(route == "all-main-category"){
            return <ForuAllMainCateg />
        }
        else if(route == "all-sub-category"){
            return <ForumSubCateg />
        }
        else if(route == "all-threads"){
            return <ThreadList_Card />
        }
        else if(route == "all-threads-comments"){
            return <ThreadComments_Card />
        }
    }

    return (
        <div className={styles.main}>
            {SetComponent(slug)}
        </div>
    )
}
export default Dashboard_page