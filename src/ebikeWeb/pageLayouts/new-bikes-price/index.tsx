"use client"
import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { useParams } from 'next/navigation'
import { getBrandFromId, getdealerData, getnewBikeData } from '@/ebikeWeb/functions/globalFuntions'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'
import { priceWithCommas } from '@/genericFunctions/geneFunc'
import { BrandArr } from '@/ebikeWeb/constants/globalData'

export default function NewBikePrice() {
  const [allnewBikeArr, setAllnewBikeArr] = useState([])
  const [brandname, setbrandName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const bikeId = params.brand

  useEffect(() => {
    fetchBrandInfo()
  }, [])

  async function fetchBrandInfo() {
    setIsLoading(true)
      const getBrandName = await getBrandFromId(bikeId , BrandArr)
      const resName = getBrandName[0].brandName
      setbrandName(getBrandName[0].brandName)
      let res = await getnewBikeData({ brand: resName })
      setAllnewBikeArr(res)
      setIsLoading(false)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 1000);
  }
  return (
    <>
      {!isLoading ?
        <>
          <div className={styles.bike_price_main}>
            <div className={styles.heading_box}>
              <p className={styles.heading}>{brandname} Bike Price in Pakistan 2025</p></div>

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
                  allnewBikeArr.map((e: any, i: any) => (
                    <tr key={i}>
                      <td className={styles.td} style={{ fontWeight: 'bolder', color: 'black' }}>{i + 1}</td>
                      <td className={styles.td}>{e?.title ? e.title : '-'}</td>
                      <td className={styles.td} style={{ fontWeight: 'bolder', color: 'black' }}>{priceWithCommas(e?.price ? e.price : '-')}</td>
                      <td className={styles.td}>{e?.updatedAt ? e.updatedAt.slice(0, 10) : '-'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
        </>
        :
        <div className={styles.load_main}>
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
        </div>
      }
    </>
  )
}