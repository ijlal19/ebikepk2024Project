"use client";
import { Box, Button, Typography } from "@mui/material"
import styles from './SearchBox.module.scss'
import RowRadioButtonsGroup from "@/pageLayouts/home/bannerSection/SearchBox/Radio/Radio"
import { useState } from "react"
function  SearchBox(){
    let [defaultval,setDefaultval]=useState("By Brand")
    let [defaul2tval,setDefault2val]=useState("By Budget")
    let [x ,setX]=useState(true)
    let [y ,setY]=useState(false)
    
    function defVal(){
        setDefaultval("By Brand")
        setDefault2val("By Budget")
        setX(true)
        setY(!y)
    }
    
    function cahnge(){
        setX(!x)
        setY(true)
        setDefaultval("By Budget")
        setDefault2val("By Model")
    }
    
    return(
        <>
        <Box className={styles.main}>
            <Typography variant="h6"  className={styles.heading}>
                Search the right bike
            </Typography>
            <Box style={{display:'flex',justifyContent:'space-around',marginTop:'10px',marginBottom:'10px'}}>
                <Button class={styles.newbikes_btn} disableRipple onClick={defVal}>New Bikes</Button>
                <Button class={styles.usedbikes_btn} disableRipple onClick={cahnge}>Used Bikes</Button>
            </Box>
            {
            // x? 
            // <>
            //     <Box class={styles.radio}>
            //         <RowRadioButtonsGroup label1={defaultval} label2={defaul2tval}/>
            //     </Box>
            // </> :
            // <>
                <Box class={styles.radio}>
                    <RowRadioButtonsGroup label1={defaultval} label2={defaul2tval}/>
                </Box>
            // </>
            }
            <Box>
                <Button class={styles.btn} disableRipple>
                    Search
                </Button>
            </Box>
        </Box>
        </>
    )
}
export default SearchBox