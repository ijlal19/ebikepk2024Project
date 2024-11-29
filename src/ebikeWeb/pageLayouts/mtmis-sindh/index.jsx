import React from "react"
import { Box, Container } from "@mui/material"
import styles from './index.module.scss'
const MtmisSindh = () => {
    return (
        <>
            <Box className={styles.sindh_main}>
                    <Box className={styles.sindh}>
                        <h1 className={styles.mtmis_sindh_heading}>MTMIS Sindh Online Vehicle Verification Sindh</h1>
                        <Box className={styles.sindh_text}>
                            <p  className={styles.mtmis_sindh_paragraph}>
                            <b>MTMIS Sindh</b> is providing vehicle verification service for the Vehicle users of Sindh. It is now important for the buyers and dealers to verify the authenticity of the vehicle before buying any vehicle. Now users in Sindh can verify both cars and motorcycles through this online verification.</p>
                        </Box>
                    </Box>
            </Box>
        </>)
}

export default MtmisSindh;