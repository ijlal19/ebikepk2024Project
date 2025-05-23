'use client'
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { BrandArr, CityArr } from '@/ebikeWeb/constants/globalData';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import MoreOptionPopup from './Popup';
import * as React from 'react';
import FilterDropdown from './DropDown';
import { getCustomBikeAd } from '@/ebikeWeb/functions/globalFuntions';

let selectedBrand: any = []

function BrandFilter({ setBrandArray , fetchBikeInfo}: any) {

  const [modalOpenFor, setModalOpenFor] = useState('');
  const [popupData, setpopupData]: any = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ModalData = {
    showmodal: toggle,
    openmodal: openmodal,
    popupdata: popupData,
  }

  function clearFilters(from: any) {
  if (from == 'brand') {
    selectedBrand = []
    localStorage.removeItem('selectedDataByBrand')
    fetchBikeInfo(1)
  }
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

  const GetArray = JSON.parse(localStorage.getItem("selectedDataByBrand") || "[]");

  const updateFilterValue = (event: any, from: any) => {
    const isChecked = event.target.checked
    const BikeId = Number(event.target.id)
    if (from == "brand") {
      if (isChecked) {
        if (!selectedBrand.includes(BikeId)) {
          selectedBrand.push(BikeId);
          setBrandArray((prev: any) => [...prev, BikeId])
        }
      }
      else {
        setBrandArray((prev: any) => prev.filter((id: any) => id !== BikeId));
        const index = selectedBrand.indexOf(BikeId);

        if (index !== -1) {
          selectedBrand.splice(index, 1);
        }
      }
      if (selectedBrand && selectedBrand.length > 0) {
        localStorage.setItem("selectedDataByBrand", JSON.stringify(selectedBrand))
      }
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
                  checked={GetArray?.includes(data?.id)}
                  onChange={(event) => updateFilterValue(event, 'brand')}
                  id={data.id}
                />
                {data.brandName}
              </Typography>)
          })
        }

        <p onClick={() => toggle('brand')} className={styles.seeMore} > More Brands </p>

        {
          selectedBrand.length > 0 ?
            <button onClick={() => { clearFilters('brand') }} className={styles.clear_btn} > Clear Brand Filter </button> :
            ""
        }

      </Box>

      {openmodal ?
        <MoreOptionPopup
          modalData={ModalData}
          from={'brand'}
          updateFilterValue={updateFilterValue}
        /> : ""}
      <Loader isLoading={isLoading} />

    </Box>
  )
}

let selectedCity: any = []
function CityFilter({ setCityArray , fetchBikeInfo}: any) {

  const [modalOpenFor, setModalOpenFor] = useState('');
  const [popupData, setpopupData]: any = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const GetArray = JSON.parse(localStorage.getItem("selectedDataByCity") || "[]");

  function updateFilterValue(event: any, from: any) {
    const isChecked = event.target.checked
    const Biekid = Number(event.target.id);
    if (from == 'city') {
      if (isChecked) {
        if (!selectedCity.includes(Biekid)) {
          selectedCity.push(Biekid);
          setCityArray((prev: any) => [...prev, Biekid])
        }
      }
      else {
        setCityArray((prev: any) => prev.filter((id: any) => id !== Biekid));
        const index = selectedCity.indexOf(Biekid);

        if (index !== -1) {
          selectedCity.splice(index, 1);
        }
      }
      if (selectedCity && selectedCity.length > 0) {
        localStorage.setItem("selectedDataByCity", JSON.stringify(selectedCity))
      }
    }
  }

   function clearFilters(from: any) {
  if (from == 'city') {
    selectedCity = []
    localStorage.removeItem('selectedDataByCity')
    fetchBikeInfo(1)
  }
}

  return (
    <Box className={styles.filter_box}>
      <Box className={styles.heading_resultby}>
        <Typography> Show Result By: </Typography>
      </Box>
      {/* Brand Filter  */}
      <Box className={styles.heading_brand}>
        <Typography className={styles.brand_text}> City </Typography>
      </Box>
      <Box className={styles.brand_options}>
        {
          CityArr.slice(0, 5).map((data: any, i: any) => {
            return (
              <Typography className={styles.option_values} key={i}>
                <input
                  type="checkbox"
                  checked={GetArray?.includes(data?.id)}
                  onChange={(event) => { updateFilterValue(event, 'city') }}
                  id={data.id}
                />
                {data.city_name}
              </Typography>)
          })
        }

        <p onClick={() => toggle('city')} className={styles.seeMore} > More Cities </p>
{
          selectedCity.length > 0 ?
            <button onClick={() => { clearFilters('city') }} className={styles.clear_btn} > Clear City Filter </button> :
            ""
        }
      </Box>

      {openmodal ?
        <MoreOptionPopup
          modalData={ModalData}
          from={'city'}
          updateFilterValue={updateFilterValue}

        /> : ""}

      <Loader isLoading={isLoading} />

    </Box>
  )
}

let yearValues: any = { start: '', end: '' }
let selectedYear: any = []
function YearFilter({ fetchedYearData, SelectedYearData , fetchBikeInfo}: any) {

  const [isFilterChange, setIsFilterChange] = useState(false)

  async function updateFilterDataFromDropdown(value: any, isStarValue: any, from: any, _page: any) {

    if (from == "year") {
      if (isStarValue) {
        yearValues.start = value
      }
      else {
        yearValues.end = value
      }

      if (yearValues.start != "" && yearValues.end != "") {
        selectedYear[0] = yearValues.start
        selectedYear[1] = yearValues.end
      }
      else {
        selectedYear = []
      }
      if (selectedYear && selectedYear.length == 2) {
        if (SelectedYearData.length == 0) {
          SelectedYearData.push(selectedYear)
        }
        else {
          SelectedYearData.shift()
          SelectedYearData.push(selectedYear)
        }
        fetchedYearData(1, false)
      }
    }
    setIsFilterChange(prev => !prev)
  }

  function clearFilters(from: any) {
    if (from == "year") {
      yearValues.start = ""
      yearValues.end = ""
      selectedYear = []
    fetchBikeInfo(1)
    }
  }

  return (
    <Box className={styles.filter_box}>
      <Box className={styles.heading_resultby}>
        <Typography> Show Result By: </Typography>
      </Box>
      <Box className={styles.heading_years}>
        <Typography className={styles.years_text}>YEARS</Typography>
      </Box>
      <Box className={styles.years_options}>

        <FilterDropdown
          dropvalues='years'
          values='from'
          className={styles.option_values}
          from="year"
          updateFilterValue={updateFilterDataFromDropdown}
          sx={{
            Width: '90%',
            padding: '8px',
            fontSize: '12px'
          }}
          data={yearValues}
        />

        <FilterDropdown
          dropvalues='years'
          values='To'
          className={styles.option_values}
          updateFilterValue={updateFilterDataFromDropdown}
          from="year"
          sx={{
            minWidth: 120,
            padding: '8px',
            fontSize: '12px'
          }}
          data={yearValues}
        />

        {
          selectedYear.length > 0 ?
            <button onClick={() => { clearFilters('year') }} className={styles.clear_btn} > Clear Years Filter </button> :
            ""
        }

      </Box>

    </Box>
  )
}

let CCValues: any = { start: '', end: '' }
let selectedCC: any = []
function CC_Filter({ fetchedCCData, SelectedCCData , fetchBikeInfo}: any) {

  const [isFilterChange, setIsFilterChange] = useState(false)

  async function updateFilterDataFromDropdown(value: any, isStarValue: any, from: any, _page: any) {

    if (from == "cc") {
      if (isStarValue) {
        CCValues.start = value
      }
      else {
        CCValues.end = value
      }

      if (CCValues.start != "" && CCValues.end != "") {
        selectedCC[0] = CCValues.start
        selectedCC[1] = CCValues.end
      }
      else {
        selectedCC = []
      }
      if (selectedCC && selectedCC.length == 2) {
        if (SelectedCCData.length == 0) {
          SelectedCCData.push(selectedCC)
        }
        else {
          SelectedCCData.shift()
          SelectedCCData.push(selectedCC)
        }
        fetchedCCData(1, false)
      }
    }
    setIsFilterChange(prev => !prev)
  }

  function clearFilters(from: any) {
    if (from == "cc") {
      CCValues.start = ""
      CCValues.end = ""
      selectedCC = []
      fetchBikeInfo(1)
    }
  }

  return (
    <Box className={styles.filter_box}>
      <Box className={styles.heading_resultby}>
        <Typography> Show Result By: </Typography>
      </Box>
      <Box className={styles.heading_years}>
        <Typography className={styles.years_text}>CC</Typography>
      </Box>
      <Box className={styles.years_options}>

        <FilterDropdown
          values='from'
          className={styles.option_values}
          from="cc"
          updateFilterValue={updateFilterDataFromDropdown}
          sx={{
            Width: '90%',
            padding: '8px',
            fontSize: '12px'
          }}
          data={CCValues}
        />

        <FilterDropdown
          values='To'
          className={styles.option_values}
          updateFilterValue={updateFilterDataFromDropdown}
          from="cc"
          sx={{
            minWidth: 120,
            padding: '8px',
            fontSize: '12px'
          }}
          data={CCValues}
        />

        {
          selectedCC.length > 0 ?
            <button onClick={() => { clearFilters('cc') }} className={styles.clear_btn} > Clear CC Filter </button> :
            ""
        }

      </Box>

    </Box>
  )
}

export { BrandFilter, CityFilter, YearFilter, CC_Filter }