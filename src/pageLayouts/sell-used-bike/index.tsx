"use client"
import React, { useState } from "react"
import styles from './index.module.scss'
import { BrandArr, CityArr, YearArr, CcArr } from '@/constants/globalData'
import { useRouter } from 'next/navigation'
import { TextareaAutosize, Typography } from "@mui/material"

const SellUsedBike = () => {

    const [isLoading, setIsLoading] = useState(false)
    const Router = useRouter()
    const [city, setCity] = useState('');
    const [modelYear, setModelYear] = useState('');
    const [cc, setCc] = useState('');
    const [brand, setBrand] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [mobile, setMobile] = useState('');

    const handleChange = (field:any, value:any) => {
        if (field === 'city') {
            setCity(value);
        } else if (field === 'modelYear') {
            setModelYear(value);
        } else if (field === 'cc') {
            setCc(value);
        } else if (field === 'brand') {
            setBrand(value);
        } else if (field === 'title') {
            setTitle(value);
        } else if (field === 'description') {
            setDescription(value);
        } else if (field === 'price') {
            setPrice(value);
        } else if (field === 'videoUrl') {
            setVideoUrl(value);
        } else if (field === 'sellerName') {
            setSellerName(value);
        } else if (field === 'mobile') {
            setMobile(value);
        }
    };

    const handelsubmit=()=>{
        const formData =[ {
            title,
            description,
            city,
            modelYear,
            cc,
            brand,
            price,
            videoUrl,
            sellerName,
            mobile,
        }];
        console.log("Form Data:", formData);
    }
    return (
        <div className={styles.usedbike_form_main}>
            <div className={styles.form_container}>
                <Typography className={styles.form_heading}>Sell Your Bike</Typography>

                <div className={styles.form_input_div} >
                    <Typography>
                        <label htmlFor="title" className={styles.title_label}>Title*</label>
                    </Typography>
                    <Typography className={styles.input_parent}>
                        <input required  type="text" id="title" className={styles.title_input} placeholder="Title"
                        onChange={(e) => handleChange('title', e.target.value)}/>
                    </Typography>
                    <Typography>
                        <label htmlFor="desc" className={styles.description_label}>Description*</label>
                    </Typography>
                    <Typography className={styles.desc_parent}>
                        <TextareaAutosize id="desc" className={styles.description_area} placeholder="Add a Description"  required  onChange={(e) => handleChange('description', e.target.value)}/>
                    </Typography>

                    <div className={styles.dropdown_div}>
                        <div className={styles.dropdown_main}>
                            <Typography>
                                <label htmlFor="city" className={styles.description_label}>City*</label>
                            </Typography>
                            <Typography>
                                <select name="" id="city" className={styles.section_main}onChange={(e) => handleChange('city', e.target.value)}>
                                    <option value="" disabled selected hidden></option>
                                    {
                                        CityArr.map((e: any) => {
                                            return (
                                                <option key={e.city_name} value={e.city_name}className={styles.drop_option}>{e.city_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Typography>
                        </div>
                        <div className={styles.dropdown_main}>
                            <Typography>
                                <label htmlFor="model" className={styles.description_label}>Model Year*</label>
                            </Typography>
                            <Typography>
                                <select name="" id="model" className={styles.section_main}
                                onChange={(e) => handleChange('modelYear', e.target.value)}>
                                    <option value="" disabled selected hidden></option>
                                    {
                                        YearArr.map((e: any) => {
                                            return (
                                                <option key={e.year} value={e.year} className={styles.drop_option}>{e.year}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Typography>
                        </div>
                        <div className={styles.dropdown_main}>
                            <Typography>
                                <label htmlFor="cc" className={styles.description_label}>CC*</label>
                            </Typography>
                            <Typography>
                                <select name="" id="cc" className={styles.section_main}
                                onChange={(e) => handleChange('cc', e.target.value)}>
                                    <option value="" disabled selected hidden></option>
                                    {
                                        CcArr.map((e: any) => {
                                            return (
                                                <option key={e} value={e} className={styles.drop_option}>{e}</option>
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
                                <label htmlFor="brand" className={styles.description_label}>Brand*</label>
                            </Typography>
                            <Typography>
                                <select name="" id="brand" className={styles.section_main}
                                onChange={(e) => handleChange('brand', e.target.value)}>
                                    <option value="" disabled selected hidden></option>
                                    {
                                        BrandArr.map((e: any) => {
                                            return (
                                                <option key={e.brandName} value={e.brandName} className={styles.drop_option}>{e.brandName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Typography>
                        </div>
                        <div className={styles.dropdown_main2}>
                            <Typography>
                                <label htmlFor="pkr" className={styles.description_label}>Price in PKR</label>
                            </Typography>
                            <Typography>
                                <input required  name="" id="pkr" type="text" className={styles.section_input} placeholder="Price" onChange={(e) => handleChange('price', e.target.value)}/>
                            </Typography>
                        </div>

                    </div>
                    <Typography>
                        <label htmlFor="urlvideo" className={styles.title_label}>Video URL (Only Youtube) Optional</label>
                    </Typography>
                    <Typography className={styles.input_parent}>
                        <input required  type="text" id="urlvideo" className={styles.title_input} placeholder="Paste your bike youtube video URL" onChange={(e) => handleChange('videoUrl', e.target.value)}/>
                    </Typography>
                    <Typography>
                        <label htmlFor="sellername" className={styles.title_label}>Seller Name</label>
                    </Typography>
                    <Typography className={styles.input_parent}>
                        <input required  type="text" id="sellername" className={styles.title_input} placeholder="Name" 
                        onChange={(e) => handleChange('sellerName', e.target.value)}/>
                    </Typography>
                    <Typography>
                        <label htmlFor="mobile" className={styles.title_label}>Seller Mobile</label>
                    </Typography>
                    <Typography className={styles.input_parent}>
                        <input required  type="text" id="mobile" className={styles.title_input} placeholder="Mobile Number" 
                        onChange={(e) => handleChange('mobile', e.target.value)}/>
                    </Typography>
                    <Typography className={styles.permission}><input type="checkbox" /><span className={styles.permission_text}>By checking you agree to our terms & condition</span></Typography>
                    <button className={styles.post_button} onClick={handelsubmit} >Post Now</button>
                </div>
            </div>
        </div>
    )
}

export default SellUsedBike;
