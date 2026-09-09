'use client';

import React, { useEffect, useMemo, useState } from "react";
import styles from './index.module.scss';
import { Box, Grid, Link, useMediaQuery } from "@mui/material";
import { BrandArr, CityArr } from "@/ebikeWeb/constants/globalData";
import { getbrandData } from "@/ebikeWeb/functions/globalFuntions";
import { getBrandSlug, getVisibleBrands, sortBrandsByName } from "@/ebikeWeb/utils/brandUtils";

const popularCityNames = ['karachi', 'islamabad', 'peshawar', 'lahore', 'faisalabad'];

function formatName(value = '') {
    const text = String(value).replaceAll('_', ' ').replaceAll('-', ' ').trim();

    if (!text) {
        return '';
    }

    return text
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const BrowseUsedBike = () => {
    const isMobile = useMediaQuery('(max-width:1120px)');
    const isMobile2 = useMediaQuery('(max-width:768px)');
    const [brands, setBrands] = useState(sortBrandsByName(getVisibleBrands(BrandArr)).slice(0, 6));

    useEffect(() => {
        async function fetchBrands() {
            const res = await getbrandData();
            const apiBrands = Array.isArray(res) ? sortBrandsByName(getVisibleBrands(res)) : [];

            if (apiBrands.length > 0) {
                setBrands(apiBrands.slice(0, 6));
            }
        }

        fetchBrands();
    }, []);

    const cities = useMemo(() => {
        return popularCityNames
            .map((cityName) => CityArr.find((city) => city?.city_name?.toLowerCase() === cityName))
            .filter(Boolean);
    }, []);

    const getHref = (brand, city) => {
        const brandSlug = getBrandSlug(brand?.brandName);
        const citySlug = getBrandSlug(city?.city_name);

        return `/used-bikes/${brandSlug}-used-bikes-in-${citySlug}-city/${brand?.id}/${city?.id}`;
    };

    return (
        <Box className={styles.browser}>
            <Box className={styles.container}>
                <Grid container className={styles.main_container}>
                    {brands.map((brand) => (
                        <Grid item xs={isMobile ? isMobile2 ? 6 : 4 : 4} className={styles.grid_list} key={brand?.id || brand?.brandName}>
                            <ul className={styles.ul}>
                                {cities.map((city) => {
                                    const brandName = formatName(brand?.brandName);
                                    const cityName = formatName(city?.city_name);

                                    return (
                                        <li key={`${brand?.id}-${city?.id}`} className={styles.li}>
                                            <Link href={getHref(brand, city)} className={styles.li}>
                                                {brandName} Bikes in {cityName}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default BrowseUsedBike
