"use client"
import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';

export default function NewBikePrice() {

  const [AllnewBikePriceDetailsArr, setAllnewBikePriceDetailsArr]:any = useState([])

  useEffect(() => {
    fetchBrandInfo()
  }, [])

  async function fetchBrandInfo() {
    // const responsedetails = await getnewBikedetailsData()
  }

  return (<>aaa</>)

}