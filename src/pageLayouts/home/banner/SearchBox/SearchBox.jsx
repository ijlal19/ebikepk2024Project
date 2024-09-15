"use client";
import { Box, Button, Typography } from "@mui/material"
import css from './SearchBox.module.css'
import RowRadioButtonsGroup from "@/pageLayouts/home/banner/SearchBox/Radio/Radio"
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
        <Box className={css.main}>
            <Typography variant="h4" style={{fontWeight:'bolder'}} className={css.heading}>
            Search the right bike
            </Typography>
            <Box style={{display:'flex',justifyContent:'space-around',marginTop:'20px',marginBottom:'20px'}}>
                <Button class={css.Newbikes} disableRipple onClick={defVal}>New Bikes</Button>
                <Button class={css.Usedbikes} disableRipple onClick={cahnge}>Used Bikes</Button>
            </Box>
            {
                x? <><Box class={css.radio}>
                <RowRadioButtonsGroup label1={defaultval} label2={defaul2tval}/>
            </Box></>:<><Box class={css.radio}>
                <RowRadioButtonsGroup label1={defaultval} label2={defaul2tval}/>
            </Box></>
            }
            <Box>
                <Button class={css.btn} disableRipple>
                    Search
                </Button>
            </Box><br />
            <Box class={css.advance

            }>
            <Typography variant="p" sx={{fontFamily:'sans-serif',cursor:'pointer'
            }}>
                Advance search
            </Typography>
                </Box>
        </Box>
        </>
    )
}
export default SearchBox