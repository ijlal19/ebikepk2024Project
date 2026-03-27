import React from "react";
import { Box } from "@mui/material";
import styles from "./index.module.scss";

const MtmisIslamabad = () => {
    return (
        <Box className={styles.islamabad_main}>
            <Box className={styles.islamabad}>
                <h1 className={styles.mtmis_islamabad_heading}>Verify Your Vehicle Status Online with MTMIS Islamabad</h1>
                <Box className={styles.islamabad_text}>
                    <p className={styles.mtmis_islamabad_paragraph}>
                        <b>MTMIS Islamabad</b> gives buyers, sellers, customers, and vehicle owners an easy way to check vehicle details online in Islamabad. Through coordination with the Excise and Taxation Department, the system provides updated and reliable information about a vehicle's current status. This saves users from standing in long queues and makes the verification process faster and more convenient. With quick online car and bike verification, users can check important details with confidence before making any decision. MTMIS Islamabad registration and verification services are available through the MTMIS ICT platform, which supports vehicle checking services for the Islamabad region.
                    </p>
                    <p className={styles.mtmis_islamabad_paragraph}>
                        <b>Online Vehicle Verification Procedure by MTMIS Islamabad:</b>
                    </p>
                    <p className={styles.mtmis_islamabad_paragraph}>
                        The online verification process in Islamabad is simple and dependable. Whether you are buying or selling a vehicle, you only need to enter the vehicle number in the MTMIS Islamabad system to view useful information. This process can also help reduce the chances of unauthorized transactions or illegal activity. For an Islamabad car registration check, users can visit the official MTMIS Islamabad website or use the SMS verification option to get quick information about registration status and taxes.
                    </p>
                    <ul className={styles.mtmis_islamabad_list}>
                        <li>Registration number</li>
                        <li>Engine type</li>
                        <li>Vehicle cost</li>
                        <li>Year of manufacture</li>
                        <li>Current paid taxes or outstanding taxes</li>
                    </ul>
                    <p className={styles.mtmis_islamabad_paragraph}>
                        <b>How do You Check Motor Vehicle Registration by SMS in Islamabad?</b>
                    </p>
                    <p className={styles.mtmis_islamabad_paragraph}>
                        You can also check motor vehicle registration in Islamabad through SMS. Simply type your chassis number and send it to <b>8521</b>. Within a short time, you can receive the registration status and other important vehicle details on your mobile phone. This method is quick, user-friendly, and helpful for anyone who wants vehicle information without going through lengthy steps. The SMS service is also useful for people who need a fast car registration check in Islamabad while on the move.
                    </p>
                </Box>
            </Box>
        </Box>
    );
};

export default MtmisIslamabad;
