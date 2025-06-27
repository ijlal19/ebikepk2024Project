'use client';
import { getnewBikedetailsData, getSingleblogDetail, UpdateBlogById, UpdateNewBikeById, getSinglebikesDetail, UpdateUsedBikeById, uplaodImageFunc } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import { numericOnly } from '@/genericFunctions/geneFunc';
import { useParams, useRouter } from 'next/navigation';
import FloaraTextarea from '../floaraEditiorTextarea';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Loader from '../loader/loader';
const jsCookie = require('js-cookie');
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

let BlogCategory = [
    {
        id: 1,
        categoryName: "News"
    },
    {
        id: 2,
        categoryName: "Bike Care"
    },
    {
        id: 3,
        categoryName: "Safety"
    },
]

const EditUsedBikeForm = () => {

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageArr, setImageArr] = useState([])
    const [newtitle, setTitle] = useState('');
    const [newdescription, setDescription] = useState('');
    const [newprice, setPrice] = useState('');
    const [newvideoUrl, setVideoUrl] = useState('');
    const [newsellerName, setSellerName] = useState('');
    const [mobile, setMobile] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [bikeData, setBikeData] = useState<any>();

    const { slug, slug1 } = useParams();
    let id = slug1
    const router = useRouter()

    useEffect(() => {
        if (id) fetchUsedBiukeById(id);
    }, [id]);

    const fetchUsedBiukeById = async (id: any) => {
        setIsLoading(true)
        const getData = await getSinglebikesDetail(id);
        if (getData && getData.add) {
            const bike = getData?.add;
            console.log("data", bike)
            setTitle(bike.title)
            setDescription(bike.description)
            setPrice(bike.price)
            setVideoUrl(bike.videoUrl)
            setMobile(bike.mobileNumber)
            setSellerName(bike.sellerName)
            setBikeData(bike);
            setImageArr(bike?.images || []);
            setIsLoading(false)
            return
        }
        else {
            alert("Internet issue!")
        }
    };
    // console.log('data' , bikeData?.brandId)

    const handleChange = (field: any, value: any) => {
        if (field === 'title') {
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

    const handleImageDelete = (index: number) => {
        const updatedImages = imageArr.filter((_, i) => i !== index);
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setImageArr(updatedImages);
        setImageFiles(updatedFiles);
    };

    function uploadImage(event: any) {
        setIsLoading(true)
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])

        reader.onload = (event: any) => {

            const imgElement: any = document.createElement("img");
            imgElement.src = reader.result;

            imgElement.onload = async (e: any) => {

                const canvas = document.createElement("canvas");
                const max_width = 600;

                const scaleSize = max_width / e.target.width;
                canvas.width = max_width;
                canvas.height = e.target.height * scaleSize;

                const ctx: any = canvas.getContext("2d")
                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

                const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg")
                let obj = { file: srcEncoded, upload_preset: 'bw6dfrc7', folder: 'used_bikes' }

                let imgRes: any = await uplaodImageFunc(obj)

                let _imageArr: any = [...imageArr]
                _imageArr.push(imgRes.secure_url)
                setImageArr(_imageArr)
                setIsLoading(false)
                console.log('imgRes', imgRes)
            }

        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!newtitle || newtitle.length < 2) {
            alert("Please add title")
            return
        }
        const invalidChars = /[\/,?#$!+]/;
        if (invalidChars.test(newtitle)) {
            alert("Please remove special characters.");
            return;
        }
        else if (!newdescription || newdescription.length < 4) {
            alert("Description should contain 4 or more characters")
            return
        }
        else if (!newprice) {
            alert("Please add correct price")
            return
        }
        else if (!newsellerName || newsellerName.length < 2) {
            alert("Please write correct seller Name")
            return
        }
        else if (!mobile || mobile.length != 11 || !numericOnly(mobile)) {
            alert("Please write correct mobile number")
            return
        }
        else if (imageArr.length < 0) {
            alert('Please select min(1) image')
            return
        }

        let _phone = mobile
        while (_phone.charAt(0) === '0') {
            _phone = _phone.substring(1);
        }
        const obj = {
            title: newtitle,
            description: newdescription,
            price: newprice,
            videoUrl: newvideoUrl,
            sellerName: newsellerName,
            mobileNumber: mobile,
            images: imageArr,
            brandId: bikeData.brandId,
            cc: bikeData.cc,
            cityId: bikeData.cityId,
            requestedForFeatured: bikeData?.requestedForFeatured,
            yearId: bikeData.yearId,
            uid: bikeData.uid
        }

        console.log("data", obj);
        const res = await UpdateUsedBikeById(id, obj)
        if (res && res.success) {
            router.push('/ebike-panel/dashboard/view-classified-ads')
        }
        else {
            alert('Something is Wrong!')
        }
    };

    return (
        <div className={styles.main_box}>
            {
                !isLoading ?
                    < form onSubmit={handleSubmit} className={styles.main}>
                        <div className={styles.formHeader}>
                            <a href="/ebike-panel/dashboard/view-classified-ads" className={styles.a}><ArrowBackIosIcon  className={styles.icon} /></a>
                            <p className={styles.heading}>Edit Used Bike</p>
                        </div>

                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input id="title" name="title" value={newtitle} onChange={(e) => handleChange('title', e.target.value)} className={styles.input} />

                        {imageArr.length < 4 && (
                            <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                        )}

                        <label className={styles.label}>Images (max 4)</label>
                        <div className={styles.imagePreview}>
                            {imageArr.map((img, index) => (
                                <div key={index} className={styles.imageWrapper}>
                                    <img src={img} alt={`Preview ${index}`} />
                                    <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea id="description" name="description" value={newdescription} onChange={(e) => handleChange('description', e.target.value)} className={styles.textarea} />
                        <div className={styles.inputs_group}>
                            <div>
                                <label htmlFor="price" className={styles.label}>Price (PKR)</label>
                                <input id="price" name="price" value={newprice} onChange={(e) => handleChange('price', e.target.value)} className={styles.input_} />
                            </div>
                            <div>
                                <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                                <input id="videoUrl" name="videoUrl" value={newvideoUrl} onChange={(e) => handleChange('videoUrl', e.target.value)} className={styles.input_} />
                            </div>
                            <div>
                                <label htmlFor="sellerName" className={styles.label}>Seller Name</label>
                                <input id="sellerName" name="sellerName" value={newsellerName} onChange={(e) => handleChange('sellerName', e.target.value)} className={styles.input_} />
                            </div>
                            <div>
                                <label htmlFor="sellerMobile" className={styles.label}>Seller Mobile</label>
                                <input id="sellerMobile" name="sellerMobile" value={mobile} onChange={(e) => handleChange('mobile', e.target.value)} className={styles.input_} />
                            </div>
                        </div>


                        <button type="submit" className={styles.button}>Update Bike</button>
                    </form>
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }

        </div >
    );
};

const EditNewBikeForm = () => {

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [BikeData, setBikeData] = useState<any>([]);
    const { slug, slug1 } = useParams()
    const router = useRouter()
    useEffect(() => {
        fetchNewBikeByID(slug1)
    }, [])

    const fetchNewBikeByID = async (id: any) => {
        const res = await getnewBikedetailsData(id)
        if (res && res[0]?.bike) {
            setBikeData(res[0]?.bike)
            console.log(res[0]?.bike)
            setSelectedImages(res[0]?.bike?.images)
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBikeData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        const files = e.target.files;
        if (files) {
            const newImageURLs = Array.from(files).slice(0, 4 - selectedImages.length).map((file: any) => URL.createObjectURL(file));
            setSelectedImages((prev: any) => [...prev, ...newImageURLs].slice(0, 4));
        }
    };

    const handleImageDelete = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;
        console.log(UserId)

        const formData = {
            ...BikeData,
            images: selectedImages,
            brandId: BikeData.brandId,
            uid: UserId || null,
        };
        const obj = {
            bikeUrl: formData?.bikeUrl,
            boreAndStroke: formData?.boreAndStroke,
            brandId: formData?.brandId,
            cityId: formData?.cityId,
            clutch: formData?.clutch,
            compressionRatio: formData?.compressionRatio,
            description: formData?.description,
            dimentiuon: formData?.dimention,
            displacement: formData?.displacement,
            dryWeight: formData?.dryWeight,
            engine: formData?.engine,
            focus_keyword: formData?.focus_keyword,
            frame: formData?.frame,
            groundClearance: formData?.groundClearance,
            images: formData?.images,
            meta_description: formData?.meta_description,
            meta_title: formData?.meta_title,
            others: formData?.others,
            petrolCapacity: formData?.petrolCapacity,
            price: formData?.price,
            starting: formData?.starting,
            title: formData?.title,
            transmission: formData?.transmission,
            tyreBack: formData?.tyreBack,
            tyreFront: formData?.tyreFront,
            uid: formData?.uid,
            videoUrl: formData?.videoUrl
        }
        console.log(obj)
        const res = await UpdateNewBikeById(slug1, obj);
        if(res && res.success && res.info =="Bike updated"){
            router.push('/ebike-panel.dashboard/all-new-bikes')
        }
        else{
            alert('Something is Wrong!')
        }
    }

    const handleBrandChange = (e: any) => {
        const brandId = e.target.value;
        setBikeData((prev: any) => ({
            ...prev,
            brandId
        }));
    };

    const GetBrandName = (id: any) => {
        const GetbrandObject = BrandArr.find((item: any) => item.id === id)
        return GetbrandObject?.brandName
    }

    return (
        <div className={styles.New_main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <h2 className={styles.heading}>Edit New Bike</h2>

                {/* Title */}
                <label htmlFor="title" className={styles.label}>Title</label>
                <input id="title" name="title" value={BikeData?.title} onChange={handleInputChange} className={styles.input} />

                {/* Video URL */}
                <label htmlFor="bikeUrl" className={styles.label}>Unique URL</label>
                <input id="bikeUrl" name="bikeUrl" value={BikeData?.bikeUrl} onChange={handleInputChange} className={styles.input} />

                {/* Description */}
                <FloaraTextarea
                    value={BikeData.description}
                    onChange={(desc: any) => setBikeData((prev: any) => ({ ...prev, description: desc }))}
                />

                {selectedImages.length < 4 && (
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className={styles.fileInput} />
                )}

                {/* Images */}
                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {selectedImages?.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Preview ${index}`} />
                            <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                        </div>
                    ))}
                </div>

                <div className={styles.drop_downBox}>
                    <select name="" id="" className={styles.selected} onChange={handleBrandChange}>
                        <option value="" disabled selected hidden>{GetBrandName(BikeData?.brandId)}</option>
                        {
                            BrandArr.map((e: any, index: any) => (
                                <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.brandName}
                                </option>
                            ))
                        }
                    </select>

                    <div>
                        <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                        <input id="videoUrl" name="videoUrl" value={BikeData.videoUrl} onChange={handleInputChange} className={styles.input_bike_url} />
                    </div>
                </div>

                {/* Other fields */}
                <div className={styles.all_inputs}>
                    {[
                        { name: "price", label: "Price" },
                        { name: "engine", label: "Engine" },
                        { name: "boreAndStroke", label: "Bore & Stroke" },
                        { name: "clutch", label: "Clutch" },
                        { name: "starting", label: "Starting" },
                        { name: "dimention", label: "Dimension" },
                        { name: "petrolCapacity", label: "Petrol Capacity" },
                        { name: "displacement", label: "Displacement" },
                        { name: "compressionRatio", label: "Compression Ratio" },
                        { name: "transmission", label: "Transmission" },
                        { name: "frame", label: "Frame" },
                        { name: "groundClearance", label: "Ground Clearance" },
                        { name: "tyreBack", label: "Tyre Back" },
                        { name: "tyreFront", label: "Tyre Front" },
                        { name: "dryWeight", label: "Dry Weight" }
                    ].map(({ name, label }) => (
                        <div key={name}>
                            <label htmlFor={name} className={styles.label}>{label}</label>
                            <input
                                id={name}
                                name={name}
                                value={(BikeData as any)[name]}
                                onChange={handleInputChange}
                                className={styles.input_}
                            />
                        </div>
                    ))}
                </div>

                {/* Others textarea */}
                <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                <textarea id="meta_title" name="meta_title" value={BikeData.meta_title} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={BikeData.meta_description} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={BikeData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="others" className={styles.label}>Others</label>
                <textarea id="others" name="others" value={BikeData.others} onChange={handleInputChange} className={styles.textarea} />

                {/* Submit */}
                <button type="submit" className={styles.button}>Save Edit</button>
            </form>
        </div>
    );
};

const EditBlogForm = () => {
    const [CategoryId, setCategoryId] = useState('');
    const [BlogData, setBlogData] = useState<any>([])
    const { slug, slug1 } = useParams()
    const router = useRouter()

    useEffect(() => {
        fetchBlogByID(slug1)
    }, [])

    const fetchBlogByID = async (id: any) => {
        const res = await getSingleblogDetail(id)
        console.log(res)
        if (res) {
            setCategoryId(res.blogCategoryId)
            setBlogData(res)
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBlogData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageURL = URL.createObjectURL(file);

        setBlogData((prev: any) => ({
            ...prev,
            featuredImage: imageURL,
        }));
    };

    const CategoryChange = (e: any) => {
        setCategoryId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;

        const finalBlogData = {
            blogCate1goryId: Number(CategoryId),
            ...BlogData,
            uid: UserId || null
        };
        const obj = {
            authorname: finalBlogData?.authorname,
            BlogCategoryId: Number(CategoryId),
            blogTitle: finalBlogData?.blogTitle,
            blogUrl: finalBlogData?.blogUrl,
            bloghtml: finalBlogData?.bloghtml,
            blogtext: finalBlogData?.blogtext,
            featuredImage: finalBlogData?.featuredImage,
            focus_keyword: finalBlogData?.focus_keyword,
            meta_description: finalBlogData?.meta_description,
            meta_title: finalBlogData?.meta_title,
            uid: UserId
        }
        console.log(obj)
        const res = await UpdateBlogById(slug1, obj)
        if (res && res.info == "blog updated" && res.success) {
            router.push('/ebike-panel/dashboard/blog-list')
        }
        else{
            alert('Something is Wrong!')
        }
    };

    return (
        <div className={styles.main_blog_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <h2 className={styles.heading}>Edit Blog</h2>

                <label htmlFor="blogTitle" className={styles.label}>Title</label>
                <input id="blogTitle" name="blogTitle" value={BlogData.blogTitle} required onChange={handleInputChange} className={styles.input} />

                <label htmlFor="authorname" className={styles.label}>Author Name</label>
                <input id="authorname" name="authorname" value={BlogData.authorname} required onChange={handleInputChange} className={styles.input} />

                <label htmlFor="bloghtml" className={styles.label}>Description</label>
                <FloaraTextarea
                    value={BlogData.bloghtml}
                    onChange={(desc: any) => setBlogData((prev: any) => ({ ...prev, bloghtml: desc }))}
                />

                <input
                    type="file"
                    className={styles.fileInput}
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {BlogData.featuredImage && (
                    <img
                        src={BlogData.featuredImage}
                        alt="Preview"
                        style={{ width: '150px', height: '100px', marginTop: '10px', border: '1px solid grey', borderRadius: '3px' }}
                    />
                )}

                {/* {selectedImages} */}
                <div className={styles.drop_downBox}>
                    <select name="" id="" className={styles.selected} onChange={CategoryChange}>
                        <option value={BlogData.blogCategoryId || ''} disabled selected hidden>
                            {BlogCategory.find((e: any) => e.id === BlogData.blogCategoryId)?.categoryName || "Select Category"}
                        </option>
                        {
                            BlogCategory.map((e: any, index) => (
                                <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.categoryName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                <textarea id="meta_title" name="meta_title" value={BlogData.meta_title} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={BlogData.meta_description} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={BlogData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />

                <button type="submit" className={styles.button}>Save Edit</button>
            </form>
        </div>
    );
}

export {
    EditUsedBikeForm,
    EditNewBikeForm,
    EditBlogForm
};