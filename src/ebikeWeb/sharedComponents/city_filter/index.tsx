'use client'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { CityArr } from '@/ebikeWeb/constants/globalData';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import MoreOptionPopup from './Popup';
import * as React from 'react';

let selectedcity: any = []

function CityFilter() {

  const [modalOpenFor, setModalOpenFor] = useState('');
  const [popupData, setpopupData]: any = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { slugcityid } = useParams()

  const ModalData = {
    showmodal: toggle,
    openmodal: openmodal,
    popupdata: popupData,
  }

  function toggle(from: any) {
    if (from == 'city') {
      setModalOpenFor(from)
      setpopupData(CityArr)
      setOpenModal(true)
    }
    else if (from == 'close') {
      setModalOpenFor('')
      setOpenModal(false)
    }
  }

  function updateFilterValue(event: any, from: any, data: any) {
    if (from == 'city') {
      router.push(`/testing/1/${data?.id}`)
    }
  }

  return (
    <Box className={styles.filter_box}>
      <Box className={styles.heading_resultby}>
        <Typography> Show Result By: </Typography>
      </Box>
      {/* city Filter  */}
      <Box className={styles.heading_city}>
        <Typography className={styles.city_text}> City </Typography>
      </Box>
      <Box className={styles.city_options}>
        {
          CityArr.slice(0, 5).map((data: any, i: any) => {
            console.log("data" , data)
            return (
              <Typography className={styles.option_values} key={i}>
                <input
                  type="checkbox"
                  checked={data?.id == slugcityid}
                  onChange={(event) => { updateFilterValue(event, 'city', data) }}
                  id={data.id}
                />
                {data?.city_name}
              </Typography>)
          })
        }

        <p onClick={() => toggle('city')} className={styles.seeMore} > More citys </p>

      </Box>

      {openmodal ?
        <MoreOptionPopup
          modalData={ModalData}
          from={'city'}
          filterdData={selectedcity}
        /> : ""}

      <Loader isLoading={isLoading} />

    </Box>
  )
}

export default CityFilter