import React from "react"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import styles from './index.module.scss'
const MtmisPunjab = () => {
    return (
        <>
    <Box className={styles.punjab_main}>
        <Container className={styles.punjab_container}>
            <Box className={styles.punjab}>
                <h1>MTMIS Punjab Online Vehicle Verification Punjab</h1>
                <Box className={styles.punjab_text}>
                    <p style={{color:''}}>
                        <b>MTMIS Punjab</b> is providing an online vehicle verification service to the vehicle users of Punjab. As vehicle fraud is very common these days and in order to avoid the chance of fraud. A buyer or a car dealer must verify the vehicle whereabouts through this effective and efficent system. Similarly, it also helps the users to provide the detailed tax history of the vehicle.</p>
                    
                </Box>
            </Box>
        </Container>
    </Box>
</>
    )
}

export default MtmisPunjab;