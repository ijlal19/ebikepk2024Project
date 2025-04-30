import { Pagination, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DealerinPakFilter } from './filter';
import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { DealerinPakCard } from '../Card';
import styles from './index.module.scss';
import { AllDealerData } from '../Data';
import Box from '@mui/material/Box';
import * as React from 'react';

export const DealerInPakistan = ({ dealers }: any) => {

    const [filteredResults, setFilteredResults] = useState(dealers);
    const [isFilterApply, setisFilterApply] = useState(false);
    const [ dataByfilter,setDatabyFilter] = useState<any>()
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);


    useEffect(() => {
            setisFilterApply(true)
    }, [filteredResults])

    useEffect(() => {
        setFilteredResults(dealers);
        setisFilterApply(false);
    }, [dealers]);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
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
            <DealerinPakFilter />
        </Box>
    )

    const handleSearch = (e: any) => {

        const value = e.target.value.toLowerCase();

        if (!value) {
            setFilteredResults(dealers);
        } else {
            const results = dealers?.filter((item: any) =>
                item?.shop_name.toLowerCase().includes(value))
                setFilteredResults(results);
        }
    };

    return (
        <>
        <div>
            <div className={styles.Dealer_pakistan_main}>
                <div className={styles.heading_box}>
                    <p className={styles.showrooms_heading}>Bike Showrooms / Dealers in Pkaistan</p>
                    <div className={styles.search_box}>
                        <Button onClick={toggleDrawer(true)} className={styles.drawer_button}><MenuIcon /></Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
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