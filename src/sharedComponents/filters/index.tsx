'use client'
import { Box, Typography } from '@mui/material';
import styles from './index.module.scss'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrandArr, CityArr } from '@/constants/globalData'
import FilterDropdown from './DropDown';
import MoreOptionPopup from './Popup';
import { getFilteredAllbikesDetail } from "@/functions/globalFuntions"


let selectedCity: any = []
let selectedBrand:any = []
let selectedCC:any = {start:'', end:''}
let selectedYear:any = {start:'', end:''}

function Filters(props:any) {
  const [popupData, setpopupData]:any = useState([])
  const [openmodal, setOpenModal] = useState(false)
  const [modalOpenFor, setModalOpenFor ] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // const [selectedCity, setSelectedCity]:any = useState([]);
  // const [selectedBrand, setSelectedBrand]:any = useState([]);
  // const [selectedCC, setSelectedCC]:any = useState({start:'', end:''})
  // const [selectedYear, setSelectedYear]:any = useState({start:'', end:''})

  const ModalData = {
    showmodal: toggle,
    openmodal: openmodal,
    popupdata: popupData,
  }


  function toggle(from:any) {
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


  function updateFilterValue(event:any, from:any) {
    if(from == 'city') {
      let filterData = [...selectedCity]
      if(event.target.checked) {
        if(filterData.indexOf(event.target.id.toString()) == -1) {
          filterData.push(event.target.id.toString())
          selectedCity = filterData
        }
      }
      else {
        if(filterData.indexOf(event.target.id.toString()) > -1) {
          filterData = filterData.filter((val:any) => event.target.id != val)
          selectedCity = filterData
        }
      }
        fetchedFilterData()
    }
    else if(from == 'brand') {
      let filterData = [...selectedBrand]
      if(event.target.checked) {
        if(filterData.indexOf(event.target.id) == -1) {
          filterData.push(event.target.id)
          selectedBrand = filterData 
        }
      }
      else {
        if(filterData.indexOf(event.target.id) > -1) {
          filterData = filterData.filter((val:any) => event.target.id != val)
          selectedBrand = filterData
        }
      }
    
      fetchedFilterData()
    }
    else if(from == 'cc') {

    }
    else if(from == "year") {

    }
}

function updateFilterDataFromModel(updatedValue:any, from:any) {
  if(from == "city") {
    selectedCity = updatedValue
    fetchedFilterData()
  }
  else if(from == "brand"){
    selectedBrand = updatedValue
    fetchedFilterData()
  } 
}

async function fetchedFilterData() {
  
  let obj = {
    "city_filter": selectedCity,
    "brand_filter": selectedBrand,
    "years_filter": [],
    "cc": []
  }

  let res = await getFilteredAllbikesDetail(obj)

  if(res && res.length > 0) {
    props.updateData(res)
    window.scrollTo(0, 0)
    console.log('filter data res', res)
  }

  console.log('res', res)

}

console.log('selele', selectedCity)

  return (
    <Box className={styles.filter_box}>
      <Box className={styles.heading_resultby}>
        <Typography> Show Result By: </Typography>
      </Box>
      
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
                  checked={selectedCity.indexOf(data.id.toString()) > -1 }
                  onChange={(event) => { updateFilterValue(event, 'city') }}
                  id={data.id}
                />
                {data.city_name}
              </Typography>
            );
          })
        }

        <p onClick={()=> toggle('city')} className={styles.seeMore} > More Cities </p>

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
                  checked={selectedBrand.indexOf(data.id.toString()) > -1}
                  onChange={(event) => { updateFilterValue(event, 'brand') }}
                  id={data.id}
                />
                {data.brandName}
              </Typography>)
          })
        }

        <p onClick={()=> toggle('brand')} className={styles.seeMore} > More Brands </p>
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
          sx={{
            Width: '90%',
            padding: '8px',
            fontSize: '12px'
          }}
        />
        
        <FilterDropdown
          dropvalues='years'
          values='To'
          className={styles.option_values}
          sx={{
            minWidth: 120,
            padding: '8px',
            fontSize: '12px'
          }}
        />
      </Box>

       {/* CC filter */}
      <Box className={styles.heading_years}>
        <Typography className={styles.years_text}>ENGINE CC</Typography>
      </Box>

      <Box className={styles.years_options}>
        <FilterDropdown
          values='from'
          className={styles.option_values}
          sx={{
            Width: '90%',
            padding: '8px',
            fontSize: '12px'
          }}
        />
        
        <FilterDropdown
          values='To'
          className={styles.option_values}
          sx={{
            minWidth: 120,
            padding: '8px',
            fontSize: '12px'
          }}
        />
      </Box>

       {openmodal ?  
        <MoreOptionPopup 
          modalData={ ModalData } 
          from = { modalOpenFor == 'city' ? 'city' : 'brand' } 
          updateFilteredData = { updateFilterDataFromModel } 
          filterdData= { modalOpenFor == 'city' ? selectedCity : selectedBrand } 
          // fetchFilters= { () => fetchedFilterData() }
        /> : "" }

    </Box>
  )
}
export default Filters