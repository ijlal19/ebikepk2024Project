'use client'
import { Box, Typography } from '@mui/material';
import styles from './index.module.scss'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrandArr, CityArr, YearArr } from '@/ebikeWeb/constants/globalData'
import FilterDropdown from './DropDown';
import MoreOptionPopup from './Popup';
import { getCustomBikeAd, getFilteredAllbikesDetail } from "@/ebikeWeb/functions/globalFuntions"
import Loader from '@/ebikeWeb/sharedComponents/loader/loader'


let selectedCity: any = []
let selectedBrand: any = []
let CCvalues: any = { start: '', end: '' }
let yearValues: any = { start: '', end: '' }
let selectedCC: any = []
let selectedYear: any = []

function Filters(props: any , {updateData}:any) {
  const [popupData, setpopupData]: any = useState([])
  const [openmodal, setOpenModal] = useState(false)
  const [modalOpenFor, setModalOpenFor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterChange, setIsFilterChange] = useState(false)
  // const [totalPage, setTotalPage] = useState(null)
  // const [currentPage, setCurrentPage] = useState(1)

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
    else if (from == 'brand') {
      setModalOpenFor(from)
      setpopupData(BrandArr)
      setOpenModal(true)
    }
    else if (from == 'close') {
      setModalOpenFor('')
      setOpenModal(false)
    }
  }

  const handlePaginationChange = async (event: any, page: any) => {
    fetchedFilterData(page)
  }

  function updateFilterValue(event: any, from: any) {
    if (from == 'city') {
      let filterData = [...selectedCity]
      if (event.target.checked) {
        if (filterData.indexOf(event.target.id.toString()) == -1) {
          filterData.push(event.target.id.toString())
          selectedCity = filterData
        }
      }
      else {
        if (filterData.indexOf(event.target.id.toString()) > -1) {
          filterData = filterData.filter((val: any) => event.target.id != val)
          selectedCity = filterData
        }
      }
      fetchedFilterData(1)
    }

    else if (from == 'brand') {
      let filterData = [...selectedBrand]
      if (event.target.checked) {
        if (filterData.indexOf(event.target.id) == -1) {
          filterData.push(event.target.id)
          selectedBrand = filterData
        }
      }
      else {
        if (filterData.indexOf(event.target.id) > -1) {
          filterData = filterData.filter((val: any) => event.target.id != val)
          selectedBrand = filterData
        }
      }
      fetchedFilterData(1)
    }
  }

  function updateFilterDataFromModel(updatedValue: any, from: any) {
    if (from == "city") {
      selectedCity = updatedValue
      fetchedFilterData(1)
    }
    else if (from == "brand") {
      selectedBrand = updatedValue
      fetchedFilterData(1)
    }
  }

  function updateFilterDataFromDropdown(value: any, isStarValue: any, from: any) {
    // console.log('selectedYear', value)
    if (from == "cc") {
      if (isStarValue) {
        CCvalues.start = value
      }
      else {
        CCvalues.end = value
      }

      if (CCvalues.start != "" && CCvalues.end != "") {
        console.log('selectedYear', CCvalues)
        selectedCC[0] = CCvalues.start
        selectedCC[1] = CCvalues.end
        fetchedFilterData(1)
      }
      else {
        selectedCC = []
      }

    }
    else if (from == "year") {
      if (isStarValue) {
        yearValues.start = value
      }
      else {
        yearValues.end = value
      }

      if (yearValues.start != "" && yearValues.end != "") {
        console.log('selectedYear', CCvalues)
        selectedYear[0] = yearValues.start
        selectedYear[1] = yearValues.end
        fetchedFilterData(1)
      }
      else {
        selectedYear = []
      }
    }

    setIsFilterChange(prev => !prev)

  }

  async function fetchedFilterData(_page: any) {
    setIsLoading(true)
    if (selectedBrand.length > 0 || selectedCC.length > 0 || selectedCity.length > 0 || selectedYear.length > 0 || props.SearchValue !== "") {
      let obj = {
        "city_filter": selectedCity,
        "brand_filter": selectedBrand,
        "years_filter": selectedYear,
        "cc": selectedCC,
        "page": _page,
        "adslimit": 12,
        "search": props.SearchValue == "" ? '' : props.SearchValue
      }

      let res = await getCustomBikeAd(obj)

      if (res.data.length > 0) {
        props.updateData(res.data)
        props.CurrentPage(res.currentPage)
        props.TotalPage(res.pages)
      }
      setIsLoading(false)
      window.scrollTo(0, 0)
    }
    else {
      props.fetchBikeInfo(1, true)
    }
    setIsLoading(false)
    window.scrollTo(0, 0)

  }

  function clearFilters(from: any) {
    if (from == 'city') {
      selectedCity = []
    }
    else if (from == "brand") {
      selectedBrand = []
    }
    else if (from == "year") {
      yearValues.start = ""
      yearValues.end = ""
      selectedYear = []
    }
    else if (from == "cc") {
      CCvalues.start = ""
      CCvalues.end = ""
      selectedCC = []
    }
    else if (from == "all") {
      selectedCity = []
      selectedBrand = []

      yearValues.start = ""
      yearValues.end = ""
      selectedYear = []

      CCvalues.start = ""
      CCvalues.end = ""
      selectedCC = []
    }

    fetchedFilterData(1)

  }

  return (
    <Box className={styles.filter_box}>
      <Box className={styles.heading_resultby}>
        <Typography> Show Result By: </Typography>
      </Box>

      {(selectedBrand.length > 0 || selectedCC.length > 0 || selectedCity.length > 0 || selectedYear.length > 0) ?
        <button onClick={() => { clearFilters('all') }} className={styles.clear_btn} > Clear All Filter </button> :
        ""
      }

      {/* city filter */}
      <Box className={styles.heading_city}>
        <Typography className={styles.city_text}>CITY</Typography>
      </Box>
      <Box className={styles.city_options}>
        {
          CityArr.slice(0, 5).map((data: any, i: any) => {
            return (
              <Typography className={styles.option_values} key={i}>
                <input
                  type="checkbox"
                  checked={selectedCity.indexOf(data.id.toString()) > -1}
                  onChange={(event) => { updateFilterValue(event, 'city') }}
                  id={data.id}
                />
                {data?.city_name}
              </Typography>
            );
          })
        }

        <p onClick={() => toggle('city')} className={styles.seeMore} > More Cities </p>

        {
          selectedCity.length > 0 ?
            <button onClick={() => { clearFilters('city') }} className={styles.clear_btn} > Clear City Filter </button> :
            ""
        }

      </Box>

      {/* Brand Filter  */}
      <Box className={styles.heading_brand}>
        <Typography className={styles.brand_text}>BRAND</Typography>
      </Box>
      <Box className={styles.brand_options}>
        {
          BrandArr.slice(0, 5).map((data: any, i: any) => {
            return (
              <Typography className={styles.option_values} key={i}>
                <input
                  type="checkbox"
                  checked={selectedBrand.indexOf(data.id.toString()) > -1}
                  onChange={(event) => { updateFilterValue(event, 'brand') }}
                  id={data.id}
                />
                {data?.brandName}
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

      {/* years filter */}
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

      {/* CC filter */}
      <Box className={styles.heading_years}>
        <Typography className={styles.years_text}>ENGINE CC</Typography>
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
          data={CCvalues}
        />

        <FilterDropdown
          values='To'
          className={styles.option_values}
          from="cc"
          updateFilterValue={updateFilterDataFromDropdown}
          sx={{
            minWidth: 120,
            padding: '8px',
            fontSize: '12px'
          }}
          data={CCvalues}
        />

        {
          selectedCC.length > 0 ?
            <button onClick={() => { clearFilters('cc') }} className={styles.clear_btn_last}> Clear CC Filter </button> :
            ""
        }

      </Box>

      {openmodal ?
        <MoreOptionPopup
          modalData={ModalData}
          from={modalOpenFor == 'city' ? 'city' : 'brand'}
          updateFilteredData={updateFilterDataFromModel}
          filterdData={modalOpenFor == 'city' ? selectedCity : selectedBrand}
        /> : ""}

      <Loader isLoading={isLoading} />

    </Box>
  )
}
export default Filters