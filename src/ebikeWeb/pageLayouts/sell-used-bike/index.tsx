"use client"
import React, { useState, useEffect } from "react"
import styles from './index.module.scss'
import { BrandArr, CityArr, YearArr, CcArr } from '@/ebikeWeb/constants/globalData'
import { useRouter } from 'next/navigation'
import { TextareaAutosize, Typography } from "@mui/material"
import { numericOnly, isLoginUser, publishAd, uplaodImageFunc } from "@/ebikeWeb/functions/globalFuntions"

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
    const [isAggreed, setIsAggreed] = useState(false)
    const [msg, setMsg] = useState('')
    const [customer, setCustomer]  = useState<any>('not_login')
    const [imageArr, setImageArr] = useState([])

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if(_isLoginUser?.login) {
            setCustomer(_isLoginUser.info)
        }
        else {
            setCustomer("not_login")
            Router.push('/')
        }
    },[])

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

    const handelsubmit = async () => {

        if(!customer || customer == "not_login" || customer?.id == undefined) {
            Router.push('/')
        }

        if(!title || title.length < 2) {
            alert("Please add title")
            return
        }
        else if(!description || description.length < 4) {
            alert("Description should contain 4 or more characters")
            return
        }
        else if(!city) {
            alert("Please select city")
            return
        }
        else if(!modelYear) {
            alert("Please select model Year")
            return
        }
        else if(!cc) {
            alert("Please select CC")
            return
        }
        else if(!brand) {
            alert("Please select brand")
            return
        }
        else if(!price) {
            alert("Please add correct price")
            return
        }
        else if(!sellerName || sellerName.length < 2) {
            alert("Please write correct seller Name")
            return
        }
        else if(!mobile || mobile.length != 11 || !numericOnly(mobile)) {
            alert("Please write correct mobile number")
            return
        }
        else if(!isAggreed) {
            alert("Please checked terms and conditions")
            return
        }  
        
        let _phone = mobile
        while(_phone.charAt(0) === '0')
        {
            _phone = _phone.substring(1);
        }

        let obj = {
            "brandId": brand,
            "cityId": city,
            "description": description,
            "mobileNumber": parseInt(_phone),
            "price": parseInt(price),
            "sellerName": sellerName,
            "title": title,
            "uid": customer?.id,
            "yearId": modelYear,
            "images": imageArr,
            "videoUrl": videoUrl,
            "cc": cc,
            "requestedForFeatured": false
        }

        setIsLoading(true)
        let res = await publishAd(obj)
        setIsLoading(false)
        window.scrollTo(0, 0)

        if(res.success) {
            alert('Ad submitted Successfully! Please wait for approval')
            Router.push('/used-bikes')
        }
        else {
            alert('Some thing went wrong')
        }
        console.log('obj', obj, res)
    }

    function uploadImage(event:any) {

     console.log('event', event)
     
     // new method to send image in cloudinary with size reducing
     const reader = new FileReader()
     reader.readAsDataURL(event.target.files[0])
     
     reader.onload = (event:any) => {
       
       const imgElement : any  = document.createElement("img");
       imgElement.src = reader.result;
 
       imgElement.onload = async(e:any) => {
       
         const canvas = document.createElement("canvas");
         const max_width = 600;
 
         const scaleSize = max_width / e.target.width;
         canvas.width = max_width;
         canvas.height = e.target.height * scaleSize;
 
         const ctx:any = canvas.getContext("2d")
         ctx.drawImage(e.target , 0 , 0  , canvas.width , canvas.height)
 
        const srcEncoded  = ctx.canvas.toDataURL(e.target , "image/jpeg")
        let obj = { file: srcEncoded , upload_preset: 'bw6dfrc7', folder: 'used_bikes' }
        
        let imgRes:any = await uplaodImageFunc(obj)
        
        let _imageArr:any = [...imageArr]
        _imageArr.push(imgRes.secure_url)
        setImageArr(_imageArr)

        console.log('imgRes', imgRes)
        }
 
      }
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

                    <Typography>
                        <label htmlFor="desc" className={styles.description_label}>Description*</label>
                    </Typography>
                    <Typography>
                        <input type="file" accept="image/*" id="imageInput" name="image" onChange={(e)=>uploadImage(e)} />
                    </Typography>

                    <div style={{ display:"flex", margin:"20px auto"}} >
                        {
                            imageArr.length > 0 && imageArr.map((val, ind) => {
                                return <img src={val} key={ind} style={{ border:"solid 1px grey", display:"inline-block", margin:"10px", width:"100px", height:"70px" }} />
                            })
                        }
                    </div>

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
                                                <option key={e.city_name} value={e.id}className={styles.drop_option}>{e.city_name}</option>
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
                                                <option key={e.year} value={e.id} className={styles.drop_option}>{e.year}</option>
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
                                                <option key={e.id} value={e.id} className={styles.drop_option}>{e.brandName}</option>
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
                        <input required  type="number" id="mobile" className={styles.title_input} placeholder="Mobile Number" 
                        onChange={(e) => handleChange('mobile', e.target.value)}/>
                    </Typography>
                    
                    <Typography className={styles.permission}><input checked={isAggreed} onChange={(e) => { setIsAggreed(e.target.checked)}} type="checkbox" /><span className={styles.permission_text}>By checking you agree to our terms & condition</span></Typography>
                    <button disabled={isLoading} className={styles.post_button} onClick={handelsubmit} >Post Now</button>
                </div>
            </div>
        </div>
    )
}

export default SellUsedBike;
