import My_Order from "@/ebikeShop/ShopPages/my_orders"
import Head from "next/head"

const myOrderPage = ()=>{
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Shop My-Orders </title>
    </Head>
    return(
        <>
        <My_Order />
        </>
    )
}

export default myOrderPage