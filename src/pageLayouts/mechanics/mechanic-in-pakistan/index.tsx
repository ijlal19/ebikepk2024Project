import styles from './index.module.scss'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { AllDealerData } from '../Data';
import { Pagination, useMediaQuery } from '@mui/material';
import { MechanicinPakFilter } from './filter';
import { MechanicinPakCard } from '../Card';

export const MechanicsInPakistan = ({mechanics}:any) => {
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
    const totalPages = Math.ceil(mechanics.length / DealerPerPage);
    const currentData = mechanics.slice((currentPage - 1) * DealerPerPage, currentPage * DealerPerPage);
    const DrawerList = (
        <Box className={styles.filter_drawer_main} role="presentation" >
            <MechanicinPakFilter />
        </Box>
    );
    return (
        <div>
            <div className={styles.Mechanics_pakistan_main}>
                <div className={styles.heading_box}>
                    <p className={styles.showrooms_heading}>Bike Showrooms / Mechanics in Pkaistan</p>
                    <div className={styles.search_box}>
                        <Button onClick={()=>{}} className={styles.drawer_button}><MenuIcon/></Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                        <input type="text" placeholder='Search' className={styles.search_input}/>
                    </div>
                </div>
                    <div className={styles.Mechanics_card_section}>
                        {
                            currentData.map((e:any,i:any)=>{
                                return(
                                    <MechanicinPakCard props={e} key={i}/>
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
