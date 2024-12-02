"use client"
import React, { useState, useEffect } from 'react'
import BikePriceData from './data'
import styles from './index.module.scss'
import { useParams } from 'next/navigation'
import { getdealerData, getnewBikeData, getnewBikedetailsData } from '@/ebikeWeb/functions/globalFuntions'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'
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
    let DealerDataRes = await getdealerData(bikeId)
    const brandName = (DealerDataRes.dealers[0].bike_brand.brandName)
    setbrandName(DealerDataRes.dealers[0].bike_brand.brandName)
    if (!DealerDataRes) {
      setIsLoading(true)
    }
    else {
      let res = await getnewBikeData({ brand: brandName })
      setAllnewBikeArr(res)
      setIsLoading(false)
      window.scrollTo(0, 0)
    }
  }
  return (
    <>
      {!isLoading ?
        <>
          <div className={styles.bike_price_main}>
            <div className={styles.heading_box}>
              <p className={styles.heading}>{brandname} Bike Price in Pakistan 2024</p></div>

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
                      <td className={styles.td} style={{ fontWeight: 'bolder', color: 'black' }}>{e?.price ? e.price : '-'}</td>
                      <td className={styles.td}>{e?.updatedAt ? e.updatedAt.slice(0, 10) : '-'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
        </>
        :
        <div className={styles.load_div}>
          <Loader isLoading={isLoading} />
        </div>
      }
    </>
  )
}