"use client"
import React, { useState, useEffect } from 'react'
import BikePriceData from './data'
import styles from './index.module.scss'
import { priceWithCommas } from '@/functions/globalFuntions'

export default function NewBikePrice() {

  // const [AllnewBikePriceDetailsArr, setAllnewBikePriceDetailsArr]:any = useState([])

  // useEffect(() => {
  //   fetchBrandInfo()
  // }, [])

  // async function fetchBrandInfo() {
  //   // const responsedetails = await getnewBikedetailsData()
  // }
  return (
    <div className={styles.bike_price_main}>
     <div className={styles.heading_box}>
      <p className={styles.heading}>Honda Bike Price in Pakistan 2024</p></div> 
     
      <table 
  border={1} 
  style={{ borderCollapse: 'collapse', width: '100%' }} 
  className={styles.bike_price_table}
>
  <thead>
    <tr>
      <th className={styles.th}>#</th>
      <th className={styles.th}>Bike Name</th>
      <th className={styles.th}>Price</th>
      <th className={styles.th}>Last Update</th>
    </tr>
  </thead>
  <tbody>
    {
      BikePriceData.map((e, i) => (
        <tr key={i}>
          <td className={styles.td} style={{fontWeight:'bolder',color:'black'}}>{i}</td>
          <td className={styles.td}>{e.title}</td>
          <td className={styles.td} style={{fontWeight:'bolder',color:'black'}}>{priceWithCommas(e.price)}</td>
          <td className={styles.td}>{e.updatedAt.slice(0, 10)}</td>
        </tr>
      ))
    }
  </tbody>
</table>

    </div>
)
}