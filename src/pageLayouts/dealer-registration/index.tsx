'use client';
import { TextareaAutosize, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { useRouter } from 'next/navigation';
import { numericOnly, isLoginUser, publishAd, uplaodImageFunc } from "@/functions/globalFuntions"
import { BrandArr, CcArr, CityArr, YearArr } from '@/constants/globalData';

const DealerRegistration = () => {


  // const [isLoading, setIsLoading] = useState(false)
  const Router = useRouter()
  const [ShopName, setShopName] = useState('');
  const [city, setCity] = useState('');
  const [brand, setBrand] = useState('');
  const [Phone, setPhone] = useState('');
  const [Phone2, setPhone2] = useState('');
  const [Address, setAddress] = useState('');
  // const [isAggreed, setIsAggreed] = useState(false)
  const [customer, setCustomer]  = useState<any>('not_login')
  // const [imageArr, setImageArr] = useState([])

  // useEffect(() => {
  //     let _isLoginUser = isLoginUser()
  //     if(_isLoginUser?.login) {
  //         setCustomer(_isLoginUser.info)
  //     }
  //     else {
  //         setCustomer("not_login")
  //         Router.push('/')
  //     }
  // },[])

  const handleChange = (field:any, value:any) => {
      if (field === 'city') {
          setCity(value);
      } else if (field === 'brand') {
          setBrand(value);
      } else if (field === 'shopName') {
          setShopName(value);
      } else if (field === 'address') {
          setAddress(value);
      } else if (field === 'phone-number') {
          setPhone(value);
      } else if (field === 'other-number') {
        setPhone2(value);
      }
  };

  const handelsubmit = async () => {

      if(!customer || customer == "not_login" || customer?.id == undefined) {
          // Router.push('/')
      }

      if(!ShopName || ShopName.length < 2) {
          alert("Please add Shop Name")
          return
      }
      else if(!city) {
          alert("Please select city")
          return
      }
      else if(!brand) {
          alert("Please select brand")
          return
      }
      else if(!Phone || Phone.length != 11 || !numericOnly(Phone)) {
        alert("Please write correct mobile number")
        return
      }
      else if(!Phone2 || Phone2.length != 11 || !numericOnly(Phone2)) {
        alert("Please write correct mobile number")
        return
      }
      else if(!Address || Address.length < 4) {
          alert("Please add Address")
          return
      }  
      
      let _phone = Phone
      while(_phone.charAt(0) === '0')
      {
          _phone = _phone.substring(1);
      }

      let obj = {
        "shop_name": ShopName,
        "city_id": city,
          "brand_id": brand,
          "phone":Phone,
          "phone2":Phone2,
          "address": Address,
          "uid": customer?.id,
          "requestedForFeatured": false
      }

      // let res = await publishAd(obj)
      // if(res.success) {
      //     alert('Ad submitted Successfully! Please wait for approval')
      // }
      // else {
      //     alert('Some thing went wrong')
      // }
      // console.log('obj', obj, res)
      console.log(obj)
  }


  return (
    <div className={styles.usedbike_form_main}>
        <div className={styles.form_container}>
            <Typography className={styles.form_heading}>Dealer Registration</Typography>

            <div className={styles.form_input_div} >
                <Typography>
                    <label htmlFor="shopName" className={styles.shop_label}>Shop Name*</label>
                </Typography>
                
                <Typography className={styles.input_parent}>
                    <input required  type="text" id="shopName" className={styles.shop_input} placeholder="Shop Name"
                    onChange={(e) => handleChange('shopName', e.target.value)}/>
                </Typography>

                <div className={styles.dropdown_div}>
                    
                    <div className={styles.dropdown_main}>
                        <Typography>
                            <label htmlFor="city" className={styles.inputs_label}>City*</label>
                        </Typography>
                        <Typography>
                            <select name="" id="city" className={styles.section_main}onChange={(e) => handleChange('city', e.target.value)}>
                                <option value="" disabled selected hidden></option>
                                {
                                    CityArr.map((e: any) => {
                                        return (
                                            <option key={e.city_name} value={e.id}className={styles.drop_option}>{e.city_name}</option>
                                        )
                                    })
                                }
                            </select>
                        </Typography>
                    </div>
                </div>

                <div className={styles.dropdown_div2}>

                    <div className={styles.dropdown_main2}>
                        <Typography>
                            <label htmlFor="brand" className={styles.inputs_label}>Brand*</label>
                        </Typography>
                        <Typography>
                            <select name="" id="brand" className={styles.section_main}
                            onChange={(e) => handleChange('brand', e.target.value)}>
                                <option value="" disabled selected hidden></option>
                                {
                                    BrandArr.map((e: any) => {
                                        return (
                                            <option key={e.id} value={e.id} className={styles.drop_option}>{e.brandName}</option>
                                        )
                                    })
                                }
                            </select>
                        </Typography>
                    </div>

                </div>

                <Typography>
                    <label htmlFor="phone-number" className={styles.inputs_label}>Phone Number*</label>
                </Typography>

                <Typography className={styles.input_parent}>
                    <input required  type="text" id="phone-number" className={styles.shop_input} placeholder="03441234567 OR 021335396999" onChange={(e) => handleChange('phone-number', e.target.value)}/>
                </Typography>

                <Typography>
                    <label htmlFor="other-number" className={styles.inputs_label}>Other Phine Number*</label>
                </Typography>

                <Typography className={styles.input_parent}>
                    <input required  type="text" id="other-number" className={styles.shop_input} placeholder="Phone Number (Optional)" 
                    onChange={(e) => handleChange('other-number', e.target.value)}/>
                </Typography>

                <Typography>
                    <label htmlFor="address" className={styles.inputs_label}>Address*</label>
                </Typography>
               
                <Typography className={styles.address_parent}>
                    <TextareaAutosize id="address" className={styles.address_area}  required  onChange={(e) => handleChange('address', e.target.value)}/>
                </Typography>
                <button className={styles.submit_button} onClick={handelsubmit} >Submit</button>
            </div>
        </div>
    </div>
);
 };

export default DealerRegistration;

