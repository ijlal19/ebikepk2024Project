import ShopFooter from '@/ebikeShop/ShopSharedComponent/shopFooter';
import ShopHeader from '@/ebikeShop/ShopSharedComponent/shopHeader';
import Index from '@/ebikeShop/ShopPages/Home';
import * as React from 'react';

export default function Shop() {
    return (
        <>
        <ShopHeader/>
        <Index/>
        <ShopFooter/>
        </>
    )
}