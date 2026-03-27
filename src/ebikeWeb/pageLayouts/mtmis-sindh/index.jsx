import React from "react";
import { Box } from "@mui/material";
import styles from './index.module.scss';

const MtmisSindh = () => {
    return (
        <Box className={styles.sindh_main}>
            <Box className={styles.sindh}>
                <h1 className={styles.mtmis_sindh_heading}>Discover Easy and Reliable Vehicle Verification in Sindh</h1>
                <Box className={styles.sindh_text}>
                    <p className={styles.mtmis_sindh_paragraph}>
                        <b>MTMIS Sindh</b> offers a simple way to check vehicle details online in Sindh. This service helps buyers, sellers, and vehicle owners review important information in a short time, including registration status and ownership-related details. Introduced by the Excise and Taxation Department, the platform improves transparency and helps users feel more confident before buying or selling a vehicle. Sindh MTMIS has become a dependable option for anyone who wants a quick vehicle registration check for cars or bikes without unnecessary hassle.
                    </p>
                    <p className={styles.mtmis_sindh_paragraph}>
                        <b>Online Vehicle Registration Process By MTMIS Sindh:</b>
                    </p>
                    <p className={styles.mtmis_sindh_paragraph}>
                        The online verification process through MTMIS Sindh is straightforward and user-friendly. Users only need to open the official MTMIS Sindh website and enter the vehicle registration or verification number. After that, the system shows the available record of the vehicle. The details may include:
                    </p>
                    <ol className={styles.mtmis_sindh_list}>
                        <li>Registration number</li>
                        <li>Registration date</li>
                        <li>Tax payment status</li>
                        <li>Engine number</li>
                        <li>Owner name</li>
                        <li>Class of vehicle</li>
                        <li>Horsepower</li>
                        <li>Make</li>
                        <li>Body type</li>
                        <li>Model year</li>
                        <li>Safe custody status</li>
                        <li>CPLC information</li>
                        <li>Seating capacity</li>
                        <li>Vehicle class details</li>
                    </ol>
                    <p className={styles.mtmis_sindh_paragraph}>
                        You can also use this process for a Sindh vehicle registration check to make sure the vehicle documents and ownership history appear clear and transparent.
                    </p>
                    <p className={styles.mtmis_sindh_paragraph}>
                        Vehicle owners can also use the official mobile application to check important verification details on their phones. The app available through the Excise and Taxation Department Sindh is called <b>Epayment GOS</b> and can be used on both iOS and Android devices.
                    </p>
                    <p className={styles.mtmis_sindh_paragraph}>
                        <b>CPLC Car Verification Procedure In Sindh:</b>
                    </p>
                    <p className={styles.mtmis_sindh_paragraph}>
                        Along with MTMIS Sindh, CPLC also plays an important role in vehicle verification, especially in Karachi. CPLC, which stands for Citizen Police Liaison Committee, maintains a strong database of vehicle records. Car owners can contact CPLC or visit its office and official platform to verify used or new vehicles. This system is valuable for identifying suspicious activity, reducing fraud, and helping citizens confirm whether a vehicle record is clear. Because of this, CPLC remains an important source for Karachi car registration checks and broader vehicle verification within Sindh.
                    </p>
                    <p className={styles.mtmis_sindh_paragraph}>
                        <b>How Do You Check Motor Vehicle Registration By SMS in Sindh?</b>
                    </p>
                    <p className={styles.mtmis_sindh_paragraph}>
                        Another convenient way to verify a vehicle in Sindh is through SMS. You can send the vehicle registration number to <b>8785</b> and usually receive a reply within a few minutes. This method is useful for quick verification and makes it easier to check vehicle information while you are away from a computer.
                    </p>
                </Box>
            </Box>
        </Box>
    );
};

export default MtmisSindh;
