'use client'
import MenuIcon from '@mui/icons-material/Menu';
import { DealerinPakFilter } from './filter';
import { useState, useEffect } from 'react';
import { Link, Pagination, useMediaQuery } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { DealerinPakCard } from '../Card';
import styles from './index.module.scss';
import Box from '@mui/material/Box';
import * as React from 'react';
import '../../../../app/globals.scss'

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


export const DealerInPakistan = ({ dealers }: any) => {

    const [filteredResults, setFilteredResults] = useState(dealers);
    const [isFilterApply, setisFilterApply] = useState(false);
    const [Filterobject, setFilterobject] = useState<any>()
    const [currentPage, setCurrentPage] = useState(1);
    const isMobile = useMediaQuery('(max-width:820px)');
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
        setFilteredResults(dealers);
        setisFilterApply(false);
    }, [dealers]);

    useEffect(() => {
        handleSearch({ target: { value: '' } })
    }, [Filterobject])

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
    }

    const DealerPerPage = 10;
    const totalPages = Math.ceil(dealers?.length / DealerPerPage);
    const currentData = dealers?.slice((currentPage - 1) * DealerPerPage, currentPage * DealerPerPage);

    const filterDealerPerPage = 10;
    const filterPages = Math.ceil(filteredResults?.length / filterDealerPerPage);
    const filterData = filteredResults?.slice((currentPage - 1) * filterDealerPerPage, currentPage * filterDealerPerPage);

    const DrawerList = (
        <Box className={styles.filter_drawer_main} role="presentation" >
            <DealerinPakFilter setFilterobject={setFilterobject} />
        </Box>
    )

    const handleSearch = (e: any) => {

        const value = e.target.value.toLowerCase();

        // if no filter apply
        if (!value && Filterobject?.city_filter?.length == 0 && Filterobject?.brand_filter?.length == 0) {
            setFilteredResults(dealers);
        }

        else {
            // if filters apply
            let results: any = [...dealers]

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
                <div className={styles.Dealer_pakistan_main}>
                    {
                        !isMobile ?
                            <DealerinPakFilter setFilterobject={setFilterobject} /> : ''
                    }
                    <div className={styles.inner_box}>
                        <div className={styles.heading_box}>
                            <p className={styles.showrooms_heading}>Bike Showrooms / Dealers in Pkaistan</p>
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
                                <input type="text" placeholder='Search Dealer' onChange={(e) => handleSearch(e)} className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.dealer_card_section}>
                            {
                                !isFilterApply ?
                                    (
                                        currentData?.map((e: any, i: any) => {
                                            return (
                                                <DealerinPakCard props={e} key={i} />
                                            )
                                        })
                                    )
                                    : <>
                                        {filterData?.map((e: any, i: any) => {
                                            return (
                                                <DealerinPakCard props={e} key={i} />
                                            )
                                        })}

                                    </>
                            }
                        </div>
                    </div>
                    <div className={styles.add_area}>
                        <div className={styles.add_box}>
                            {
                                AdsArray?.map((e, i) => {
                                    return (
                                        <Link href={e?.href} key={i} target={e?.target} rel="noopener noreferrer">
                                            <img
                                                src={e?.url}
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
                />
            </Box>
        </>
    )
}