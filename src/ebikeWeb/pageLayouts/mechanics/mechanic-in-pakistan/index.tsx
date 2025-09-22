'use client'
import MenuIcon from '@mui/icons-material/Menu';
import { MechanicinPakFilter } from './filter';
import { MechanicinPakCard } from '../Card';
import { useState, useEffect } from 'react';
import { Link, Pagination, useMediaQuery } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Box from '@mui/material/Box';
import * as React from 'react';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';

const AdsArray = [
    {
        href: 'https://youtube.com/ebikepk',
        alt: 'eBike YouTube Banner',
        url: "https://res.cloudinary.com/dulfy2uxn/image/upload/v1608620216/Animated_Banner_Gif_3_txcj9p.gif",
        target: "_blank"
    },
    {
        href: '/forum',
        alt: '/forum',
        url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg"
    },
    {
        href: '/dealers',
        alt: '/dealer',
        url: "https://res.cloudinary.com/dzfd4phly/image/upload/v1745664709/52_mgjfps.jpg"
    },
    {
        href: '/mechanics',
        alt: '/mechanic',
        url: "https://res.cloudinary.com/dzfd4phly/image/upload/v1745664645/51_perxlq.jpg"
    },
    {
        href: '/blog',
        alt: '/blog',
        url: "https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/Blog_Banner_bnv4lk.jpg"
    }
]

export const MechanicsInPakistan = ({ mechanics }: any) => {

    const [filteredResults, setFilteredResults] = useState(mechanics);
    const [isFilterApply, setisFilterApply] = useState(false);
    const [Filterobject, setFilterobject] = useState<any>()
    const isMobile = useMediaQuery('(max-width:820px)');
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (location?.search?.indexOf('brand=') > -1) {
            let brandId = location?.search?.split('=')[1]
            if (brandId) {
                setFilterobject({ brand_filter: [Number(brandId)], city_filter: [] });
                setisFilterApply(true)
            }
        }
    }, [])

    useEffect(() => {
        setisFilterApply(true)
    }, [filteredResults])

    useEffect(() => {
        setFilteredResults(mechanics);
        setisFilterApply(false);
    }, [mechanics]);

    useEffect(() => {
        handleSearch({ target: { value: '' } })
    }, [Filterobject])

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const mechanicPerPage = 10;
    const totalPages = Math.ceil(mechanics?.length / mechanicPerPage);
    const currentData = mechanics.slice((currentPage - 1) * mechanicPerPage, currentPage * mechanicPerPage);

    const filtermechanicPerPage = 10;
    const filterPages = Math.ceil(filteredResults?.length / filtermechanicPerPage);
    const filterData = filteredResults?.slice((currentPage - 1) * filtermechanicPerPage, currentPage * filtermechanicPerPage);

    const DrawerList = (
        <Box className={styles.filter_drawer_main} role="presentation" >
            <MechanicinPakFilter setFilterobject={setFilterobject} />
        </Box>
    );

    const handleSearch = (e: any) => {

        const value = e.target.value.toLowerCase();

        //if no filter apply
        if (!value && Filterobject?.city_filter?.length == 0 && Filterobject?.brand_filter?.length == 0) {
            setFilteredResults(mechanics);
        }

        else {
            //if filters apply
            let results: any = [...mechanics]

            if (value) {
                results = results.filter((item: any) => item?.shop_name.toLowerCase().includes(value))
            }

            if (Filterobject?.brand_filter?.length > 0) {
                results = results.filter((item: any) => Filterobject?.brand_filter.indexOf(item?.brand_id) > -1)
            }

            if (Filterobject?.city_filter?.length > 0) {
                results = results.filter((item: any) => Filterobject?.city_filter.indexOf(item?.city_id) > -1)
            }

            setFilteredResults(results);

        }
    };

    return (
        <>
            <div>
                <div className={styles.Mechanics_pakistan_main}>
                    {!isMobile ? <MechanicinPakFilter setFilterobject={setFilterobject} /> : ''}
                    <div className={styles.inner}>
                        <div className={styles.heading_box}>
                            <p className={styles.showrooms_heading}>Bike Showrooms / Mechanics in Pkaistan</p>
                            <div className={styles.search_box}>
                                {
                                    isMobile ?
                                        <div>
                                            <button onClick={toggleDrawer(true)} className={styles.drawer_button}><MenuIcon /></button>
                                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                                {DrawerList}
                                            </Drawer>
                                        </div>
                                        : ''}
                                <input type="text" placeholder='Search Mechanic' onChange={(e) => handleSearch(e)} className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.Mechanics_card_section}>
                            {
                                !isFilterApply ?
                                    (
                                        currentData?.map((e: any, i: any) => {
                                            return (
                                                <MechanicinPakCard props={e} key={i} />
                                            )
                                        })
                                    )
                                    :
                                    <>
                                        {filterData?.map((e: any, i: any) => {
                                            return (
                                                <MechanicinPakCard props={e} key={i} />
                                            )
                                        })}

                                    </>
                            }
                        </div>
                    </div>
                    <div className={styles.add_area}>
                        <div className={styles.add_box}>
                            {
                                AdsArray?.map((e: any, i: any) => {
                                    return (
                                        <Link href={e?.href} key={i} target={e?.target} rel="noopener noreferrer">
                                            <img
                                                src={cloudinaryLoader(e?.url , 400 , 'auto')}
                                                alt={e?.alt}
                                                className={styles.add_image} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Box className={styles.pagination}>
                <Pagination
                    count={!isFilterApply ? totalPages : filterPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color='primary'
                    size={isMobile ? "small" : "medium"}
                />
            </Box>
        </>
    )
}
