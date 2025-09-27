'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import data from './data';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';
import { getbrandData } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import { Link } from '@mui/material';

const Side_brands = () => {
    const [allBrandArr, setAllBrandArr] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const CheckPath = window?.location?.href?.includes("tab=2");
        if (CheckPath) {
            setValue(1);
        } else {
            setValue(0);
        }
        fetchBrandInfo();
    }, []);

    const fetchBrandInfo = async () => {
        setIsLoading(true);
        let res = await getbrandData();
        if (res && res.length > 0) {
            const blockedBrands = ["hi_speed", "yamaha", "suzuki", "crown", "bmw", "honda"];
            const filtered = res.filter((e: any) =>
                blockedBrands.includes(e?.brandName?.trim()?.toLowerCase())
            );
            setAllBrandArr(filtered);
            setIsLoading(false);
        } else {
            setAllBrandArr(data);
        }
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);
    };

    const hrefLink = (brandName: string) =>{
        return('/new-bikes/' + brandName) 
    }

    return (
        <div className={styles.brandsmain}>
            <div className={styles.container}>
                <div className={styles.cards_main}>
                    {allBrandArr.map((item: any) => (
                        <Link href={hrefLink(item?.brandName)} key={item.id} className={styles.card}>
                            <img
                                src={cloudinaryLoader(item.logoUrl, 500, "auto")}
                                alt={item.brandName}
                                className={styles.card_img}
                            />
                            <p className={styles.name}>{item?.brandName}</p>
                        </Link>
                    ))}
                </div>
                <Link href={"/new-bikes"} className={styles.btn}>
                    View More Brands
                </Link>
            </div>
        </div>
    );
};

// export default Side_brands;

export { Side_brands }