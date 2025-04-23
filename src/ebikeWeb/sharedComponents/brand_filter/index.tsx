'use client'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import MoreOptionPopup from './Popup';
import * as React from 'react';

let selectedBrand: any = []

function BrandFilter() {

  const [modalOpenFor, setModalOpenFor] = useState('');
  const [popupData, setpopupData]: any = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { id1 } = useParams()

  const ModalData = {
    showmodal: toggle,
    openmodal: openmodal,
    popupdata: popupData,
  }

  function toggle(from: any) {
    if (from == 'brand') {
      setModalOpenFor(from)
      setpopupData(BrandArr)
      setOpenModal(true)
    }
    else if (from == 'close') {
      setModalOpenFor('')
      setOpenModal(false)
    }
  }

  function updateFilterValue(event: any, from: any, data: any) {
    if (from == 'brand') {
      router.push(`/used-bikes/bike-by-brand/${data?.brandName}/${data?.id}`)
    }
  }

  return (
    <Box className={styles.filter_box}>
      <Box className={styles.heading_resultby}>
        <Typography> Show Result By: </Typography>
      </Box>
      {/* Brand Filter  */}
      <Box className={styles.heading_brand}>
        <Typography className={styles.brand_text}> Brand </Typography>
      </Box>
      <Box className={styles.brand_options}>
        {
          BrandArr.slice(0, 5).map((data: any, i: any) => {
            return (
              <Typography className={styles.option_values} key={i}>
                <input
                  type="checkbox"
                  checked={data?.id == id1}
                  onChange={(event) => { updateFilterValue(event, 'brand', data) }}
                  id={data.id}
                />
                {data.brandName}
              </Typography>)
          })
        }

        <p onClick={() => toggle('brand')} className={styles.seeMore} > More Brands </p>

      </Box>

      {openmodal ?
        <MoreOptionPopup
          modalData={ModalData}
          from={'brand'}
          filterdData={selectedBrand}
        /> : ""}

      <Loader isLoading={isLoading} />

    </Box>
  )
}

export default BrandFilter