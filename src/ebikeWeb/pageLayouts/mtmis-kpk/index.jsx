import React from "react";
import { Box } from "@mui/material";
import styles from "./index.module.scss";

const MtmisKpk = () => {
    return (
        <Box className={styles.kpk_main}>
            <Box className={styles.kpk}>
                <h1 className={styles.mtmis_kpk_heading}>Fast And Reliable Online Vehicle Checks with MTMIS KPK</h1>
                <Box className={styles.kpk_text}>
                    <p className={styles.mtmis_kpk_paragraph}>
                        <b>MTMIS KPK</b> makes it easier to check important vehicle details such as registration status, ownership information, and transfer-related records. In Khyber Pakhtunkhwa, this online verification system is managed by the Excise and Taxation Department. It gives users a quick and dependable way to verify vehicle information without visiting an office. This helps buyers and owners make better decisions with more confidence. People living in Peshawar can also use the same service to check vehicle records in the provincial capital. Whether you are in Peshawar or any other city of KPK, MTMIS KPK helps you access updated vehicle details online.
                    </p>
                    <p className={styles.mtmis_kpk_paragraph}>
                        <b>How To Verify A Vehicle Online Through MTMIS KPK:</b>
                    </p>
                    <p className={styles.mtmis_kpk_paragraph}>
                        MTMIS KPK allows users to verify vehicle registration records online and view important information about vehicles registered in the province. This system is useful in reducing the chances of fraud, unauthorized sales, or suspicious transactions. To check a vehicle online through the official MTMIS KPK platform, you can follow these steps:
                    </p>
                    <ul className={styles.mtmis_kpk_list}>
                        <li>Open MTMIS Pakistan from the More section available at the top right side of the page</li>
                        <li>Select MTMIS KPK</li>
                        <li>Select District</li>
                        <li>Choose whether the vehicle is registered or is running on a temporary number</li>
                        <li>Enter the registration number, for example: A-0000</li>
                        <li>After entering the required details, click the search button</li>
                    </ul>
                    <p className={styles.mtmis_kpk_paragraph}>
                        Users in Peshawar can also perform the same verification process directly through the official website and view registration details without any difficulty.
                    </p>
                    <p className={styles.mtmis_kpk_paragraph}>
                        If you enter the wrong district or registration number, you can update the information and search again. Once the system verifies your entry, it displays a record containing details such as:
                    </p>
                    <ul className={styles.mtmis_kpk_list}>
                        <li>Vehicle registration number</li>
                        <li>Maker Name</li>
                        <li>Chassis Number</li>
                        <li>Owner Name</li>
                        <li>Model</li>
                        <li>Engine Number</li>
                        <li>Owner Father Name</li>
                    </ul>
                    <p className={styles.mtmis_kpk_paragraph}>
                        In addition to the MTMIS KPK website, users can also use the ZamaKPK mobile app for online car and motorcycle verification.
                    </p>
                </Box>
            </Box>
        </Box>
    );
};

export default MtmisKpk;
