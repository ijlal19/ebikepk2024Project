'use client'
import { getShopMainCategory, getProductCompany } from "@/ebikeShop/Shopfunctions/globalFuntions";
import { BrandArr, CityArr, YearArr } from '@/ebikeWeb/constants/globalData';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
// import FilterDropdown from './DropDown';
import * as React from 'react';
import MoreOptionPopup from "./Popup";
import { getFilteredAllbikesDetail } from "@/ebikeWeb/functions/globalFuntions";


let selectCategory: any = []
let selectCompany: any = []
let CCvalues: any = { start: '', end: '' }
let yearValues: any = { start: '', end: '' }
let selectedCC: any = []
let selectedYear: any = []

function Filters(props: any) {
  const [popupData, setpopupData]: any = useState([])
  const [openmodal, setOpenModal] = useState(false)
  const [modalOpenFor, setModalOpenFor] = useState('')
  const [ManCategoryData, setMainCategorydata] = useState([]);
  const [ProductCompanyData, setProductCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterChange, setIsFilterChange] = useState(false)

  useEffect(() => {
    fetchmainCatgeory()
  }, [])

  const fetchmainCatgeory = async () => {
    setIsLoading(true)
    const res = await getShopMainCategory()
    console.log("data", res)
    setMainCategorydata(res)
    const res1 = await getProductCompany()
    console.log("data", res1)
    if (res || res1) {
      setIsLoading(false)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 1000);
      setProductCompanyData(res1)
    }
  }

  const ModalData = {
    showmodal: toggle,
    openmodal: openmodal,
    popupdata: popupData,
  }


  function toggle(from: any) {
    if (from == 'category') {
      setModalOpenFor(from)
      setpopupData(ManCategoryData)
      setOpenModal(true)

    }
    else if (from == 'company') {
      setModalOpenFor(from)
      setpopupData(ProductCompanyData)
      setOpenModal(true)
    }
    else if (from == 'close') {
      setModalOpenFor('')
      setOpenModal(false)
    }
  }


  function updateFilterValue(event: any, from: any) {
    if (from == 'category') {
      let filterData = [...selectCategory]
      if (event.target.checked) {
        if (filterData.indexOf(event.target.id.toString()) == -1) {
          filterData.push(event.target.id.toString())
          selectCategory = filterData
        }
      }
      else {
        if (filterData.indexOf(event.target.id.toString()) > -1) {
          filterData = filterData.filter((val: any) => event.target.id != val)
          selectCategory = filterData
        }
      }
      fetchedFilterData()
    }
    else if (from == 'company') {
      let filterData = [...selectCompany]
      if (event.target.checked) {
        if (filterData.indexOf(event.target.id) == -1) {
          filterData.push(event.target.id)
          selectCompany = filterData
        }
      }
      else {
        if (filterData.indexOf(event.target.id) > -1) {
          filterData = filterData.filter((val: any) => event.target.id != val)
          selectCompany = filterData
        }
      }

      fetchedFilterData()
    }
  }

  function updateFilterDataFromModel(updatedValue: any, from: any) {
    if (from == "category") {
      selectCategory = updatedValue
      fetchedFilterData()
    }
    else if (from == "company") {
      selectCompany = updatedValue
      fetchedFilterData()
    }
  }

  // function updateFilterDataFromDropdown(value:any, isStarValue:any, from:any) {
  //   // console.log('selectedYear', value)
  //   if(from == "cc") {
  //     if(isStarValue) {
  //       CCvalues.start = value
  //     }
  //     else {
  //       CCvalues.end = value
  //     }

  //     if(CCvalues.start != "" && CCvalues.end != "") {
  //       console.log('selectedYear', CCvalues)
  //       selectedCC[0] = CCvalues.start
  //       selectedCC[1] = CCvalues.end
  //       fetchedFilterData()
  //     }
  //     else {
  //       selectedCC = []
  //     }

  //   }
  //   else if(from == "year") {
  //     if(isStarValue) {
  //       yearValues.start = value
  //     }
  //     else {
  //       yearValues.end = value
  //     }

  //     if(yearValues.start != "" && yearValues.end != "") {
  //       console.log('selectedYear', CCvalues)
  //       selectedYear[0] = yearValues.start
  //       selectedYear[1] = yearValues.end
  //       fetchedFilterData()
  //     }
  //     else {
  //       selectedYear = []
  //     }
  //   }

  //   setIsFilterChange(prev => !prev)

  // }

  async function fetchedFilterData() {
    if (selectCompany.length > 0 || selectCategory.length > 0) {
      let obj = {
        "category_filter": selectCategory,
        "company_filter": selectCompany,
      }

      setIsLoading(true)
      let res = await getFilteredAllbikesDetail(obj)
      setIsLoading(false)

      if (res && res.length > 0) {
        props.updateData(res)
        window.scrollTo(0, 0)
      }
    }
    else {
      props.fetchBikeInfo(1)
    }

  }

  function clearFilters(from: any) {
    if (from == 'category') {
      selectCategory = []
    }
    else if (from == "company") {
      selectCompany = []
    }
    else if (from == "all") {
      selectCategory = []
      selectCompany = []
    }
    fetchedFilterData()
  }


  return (

    <Box className={styles.filter_box}>
      {!isLoading ? <>
        <Box className={styles.heading_resultby}>
          <Typography> Show Result By: </Typography>
        </Box>

        {(selectCompany.length > 0 || selectCategory.length > 0) ?
          <button onClick={() => { clearFilters('all') }} className={styles.clear_btn} > Clear All Filter </button> :
          ""
        }

        {/* Category filter */}
        <Box className={styles.heading_city}>
          <Typography className={styles.city_text}>CATEGORY</Typography>
        </Box>
        <Box className={styles.city_options}>
          {
            ManCategoryData.slice(0, 5).map((data: any, i: any) => {
              return (
                <Typography className={styles.option_values} key={i}>
                  <input
                    type="checkbox"
                    checked={selectCategory.indexOf(data.id.toString()) > -1}
                    onChange={(event) => { updateFilterValue(event, 'category') }}
                    id={data?.id}
                  />
                  {data?.name}
                </Typography>
              );
            })
          }

          <p onClick={() => toggle('category')} className={styles.seeMore} > More Category </p>

          {
            selectCategory.length > 0 ?
              <button onClick={() => { clearFilters('category') }} className={styles.clear_btn} > Clear Category Filter </button> :
              ""
          }

        </Box>

        {/* Company Filter  */}
        <Box className={styles.heading_brand}>
          <Typography className={styles.brand_text}> Product Companny </Typography>
        </Box>
        <Box className={styles.brand_options}>
          {
            ProductCompanyData.slice(0, 5).map((data: any, i: any) => {
              return (
                <Typography className={styles.option_values} key={i}>
                  <input
                    type="checkbox"
                    checked={selectCompany.indexOf(data.id.toString()) > -1}
                    onChange={(event) => { updateFilterValue(event, 'company') }}
                    id={data.id}
                  />
                  {data?.name}
                </Typography>)
            })
          }

          <p onClick={() => toggle('company')} className={styles.seeMore} > More Company </p>

          {
            selectCompany.length > 0 ?
              <button onClick={() => { clearFilters('company') }} className={styles.clear_btn} > Clear Company Filter </button> :
              //   <button className={styles.clear_btn} > Clear Brand Filter </button> : 
              ""
          }

        </Box>
        <Loader isLoading={isLoading} />
        {openmodal ?
          <MoreOptionPopup
            modalData={ModalData}
            from={modalOpenFor == 'category' ? 'category' : 'company'}
            updateFilteredData={updateFilterDataFromModel}
            filterdData={modalOpenFor == 'category' ? selectCategory : selectCompany}
          />
          : ""}
      </>
        :
        <div className={styles.load_main}>
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
        </div>
      }
    </Box>
  )
}

export default Filters