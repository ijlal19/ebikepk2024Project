import React from "react";
import { Box } from "@mui/material";
import styles from './index.module.scss';

const MtmisPunjab = () => {
    return (
        <Box className={styles.punjab_main}>
            <Box className={styles.punjab}>
                <h1 className={styles.mtmis_punjab_heading}>MTMIS Punjab Online Vehicle Verification</h1>
                <Box className={styles.punjab_text}>
                    <p className={styles.mtmis_punjab_paragraph}>
                        <b>MTMIS Punjab</b> provides an easy online way to verify vehicle information across Punjab. This system helps buyers, sellers, and vehicle owners check registration records, ownership-related details, and tax information without visiting offices physically. It is useful for people in Lahore, Rawalpindi, Faisalabad, Multan, and other cities across the province. Because the service covers the whole province, users do not need to search separately for city-specific verification portals. Punjab MTMIS helps reduce the chances of fraud, unauthorized transfers, and legal complications by making vehicle records easier to review.
                    </p>
                    <p className={styles.mtmis_punjab_paragraph}>
                        <b>Vehicle Registration Check Procedure by MTMIS in Lahore and Punjab</b>
                    </p>
                    <p className={styles.mtmis_punjab_paragraph}>
                        The vehicle registration checking process on MTMIS Punjab is simple and convenient. To verify a vehicle, you need to enter the registration number on the official MTMIS Punjab website. This online system can be used in Lahore, Faisalabad, Rawalpindi, Multan, and other Punjab cities, making it easier for users to confirm vehicle history and ownership details before buying or selling.
                    </p>
                    <p className={styles.mtmis_punjab_paragraph}>
                        To use the MTMIS Punjab portal, follow these steps:
                    </p>
                    <ol className={styles.mtmis_punjab_list}>
                        <li>Open MTMIS Punjab from the top section of the page</li>
                        <li>Enter the vehicle registration number, such as `XXX 000`, `XXX 0000`, or `XXX-YY-0000`</li>
                        <li>Complete the captcha verification</li>
                        <li>Click the search vehicle button</li>
                    </ol>
                    <p className={styles.mtmis_punjab_paragraph}>
                        The system works in coordination with the Excise and Taxation Department Punjab. After entering the vehicle number, users may see details such as owner information, latest payment records, vehicle specifications, and application tracking updates.
                    </p>
                    <p className={styles.mtmis_punjab_paragraph}>
                        <b>Owner Details</b>
                    </p>
                    <ul className={styles.mtmis_punjab_list}>
                        <li>Owner name</li>
                        <li>Father name</li>
                        <li>Owner city</li>
                    </ul>
                    <p className={styles.mtmis_punjab_paragraph}>
                        <b>Latest Payment Details</b>
                    </p>
                    <ul className={styles.mtmis_punjab_list}>
                        <li>Date</li>
                        <li>Amount</li>
                    </ul>
                    <p className={styles.mtmis_punjab_paragraph}>
                        <b>Vehicle Details</b>
                    </p>
                    <ul className={styles.mtmis_punjab_list}>
                        <li>Chassis number</li>
                        <li>Engine number</li>
                        <li>Make name</li>
                        <li>Registration date</li>
                        <li>Model</li>
                        <li>Vehicle price</li>
                        <li>Color</li>
                        <li>Token tax paid up to</li>
                    </ul>
                    <p className={styles.mtmis_punjab_paragraph}>
                        <b>Vehicle Application Tracking</b>
                    </p>
                    <ul className={styles.mtmis_punjab_list}>
                        <li>Application type</li>
                        <li>Challan paid date</li>
                        <li>Application current status</li>
                    </ul>
                    <p className={styles.mtmis_punjab_paragraph}>
                        By checking these details, buyers can make more informed decisions, while sellers can better understand payment records and the status of their vehicle documents.
                    </p>
                    <p className={styles.mtmis_punjab_paragraph}>
                        <b>How do I Check Motor Vehicle Verification Through SMS in Punjab?</b>
                    </p>
                    <p className={styles.mtmis_punjab_paragraph}>
                        The Excise and Taxation Department Punjab has also introduced SMS-based verification for added convenience. Users can send the vehicle number to <b>8785</b> to check registration details for both new and used vehicles. This method offers a faster way to access vehicle verification information without depending only on the website.
                    </p>
                </Box>
            </Box>
        </Box>
    );
};

export default MtmisPunjab;
