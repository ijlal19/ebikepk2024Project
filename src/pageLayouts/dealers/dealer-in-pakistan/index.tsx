import styles from './index.module.scss'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { DealerinPakFilter } from './filter';
import MenuIcon from '@mui/icons-material/Menu';
import { AllDealerData } from '../Data';
import { DealerinPakCard } from '../Card';
import { Pagination, useMediaQuery } from '@mui/material';

export const DealerInPakistan = () => {
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery(`(max-width:768px)`)
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }
    const [currentPage, setCurrentPage] = React.useState(1);
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
      };
    const DealerPerPage = 10;
    const totalPages = Math.ceil(AllDealerData.length / DealerPerPage);
    const currentData = AllDealerData.slice((currentPage - 1) * DealerPerPage, currentPage * DealerPerPage);
    const DrawerList = (
        <Box className={styles.filter_drawer_main} role="presentation" >
            <DealerinPakFilter />
        </Box>
    );
    return (
        <div>
            <div className={styles.Dealer_pakistan_main}>
                <div className={styles.heading_box}>
                    <p className={styles.showrooms_heading}>Bike Showrooms / Dealers in Pkaistan</p>
                    <div className={styles.search_box}>
                        <Button onClick={toggleDrawer(true)} className={styles.drawer_button}><MenuIcon/></Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                        <input type="text" placeholder='Search' className={styles.search_input}/>
                    </div>
                </div>
                    <div className={styles.dealer_card_section}>
                        {
                            currentData.map((e:any,i:any)=>{
                                return(
                                    <DealerinPakCard props={e} key={i}/>
                                )
                            })
                        }
                    </div>
                    <Box className={styles.pagination}>
               <Pagination
                 count={totalPages}
                 page={currentPage}
                 onChange={handlePageChange}
                 variant="outlined"
                 shape="rounded"
                 color='primary'
               />
             </Box>
            </div>
        </div>
    )
}
