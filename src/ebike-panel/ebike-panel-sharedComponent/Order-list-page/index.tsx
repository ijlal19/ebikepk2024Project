import React from "react";
import styles from './index.module.scss';
import { New_header } from "../panel-header";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Diversity1Sharp } from "@mui/icons-material";
import PendingOrders from "./pending-orders";
import CancelOrderelist from "./cancel_order";
import ProcessOrderList from "./Process_order";
import CompleteOrderList from "./Complete-order";
import ReturnOrderelist from "./Return-order";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div style={{ padding: "3px" }}>{children}</div>}
        </div>
    );
}

const OrderListPage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
        setValue(newValue);
    };


    return (
        <div className={styles.main}>
            <New_header />

            <div style={{ width: '100%' , padding: '10px 20px' , boxSizing: 'border-box' }}>
                <div style={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary"  >
                        <Tab label="Pending (Needs To Deliver)" className={styles.tab} sx={{ marginRight: 2 }} />
                        <Tab label="Processed (on the way)" className={styles.tab}  sx={{ marginRight: 2 }} />
                        <Tab label="Completed" className={styles.tab}  sx={{ marginRight: 2 }} />
                        <Tab label="Cancelled" className={styles.tab}  sx={{ marginRight: 2 }} />
                        <Tab label="Returned" className={styles.tab} />
                    </Tabs>
                </div>
                <CustomTabPanel value={value} index={0}>
                    <div className={styles.tab_panel}>
                        <PendingOrders />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className={styles.tab_panel}>
                        <ProcessOrderList />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className={styles.tab_panel}>
                        <CompleteOrderList />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div className={styles.tab_panel}>
                        <CancelOrderelist />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <div className={styles.tab_panel}>
                        <ReturnOrderelist />
                    </div>
                </CustomTabPanel>
            </div>
        </div>
    )
}
export default OrderListPage;