'use client'
import MenuIcon from '@mui/icons-material/Menu';
import { MechanicinPakFilter } from './filter';
import { MechanicinPakCard } from '../Card';
import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import Box from '@mui/material/Box';
import * as React from 'react';

export const MechanicsInPakistan = ({ mechanics }: any) => {

    const [filteredResults, setFilteredResults] = useState(mechanics);
    const [isFilterApply, setisFilterApply] = useState(false);
    const [Filterobject, setFilterobject] = useState<any>()
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
                    <div className={styles.heading_box}>
                        <p className={styles.showrooms_heading}>Bike Showrooms / Mechanics in Pkaistan</p>
                        <div className={styles.search_box}>
                            <Button onClick={toggleDrawer(true)} className={styles.drawer_button}><MenuIcon /></Button>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
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
