'use client';
import { getnewBikedetailsData, getSingleblogDetail, UpdateBlogById, UpdateNewBikeById, getSinglebikesDetail, UpdateUsedBikeById, uplaodImageFunc, getPageById, UpdatePageById, getBrandFromId, UpdateBrandById, getbrandData, getShopMainCategory, GetProductCompany, getProduct, GetSubCategByMainCateg, UpdateProductDetailById } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import { cloudinaryLoader, numericOnly } from '@/genericFunctions/geneFunc';
import { useParams, useRouter } from 'next/navigation';
import FloaraTextarea from '../floaraEditiorTextarea';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Loader from '../loader/loader';
const jsCookie = require('js-cookie');
import CloseIcon from "@mui/icons-material/Close";
import { getProductCompany } from '@/ebikeShop/Shopfunctions/globalFuntions';


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
let PagePosition = [
    {
        id: 1,
        PositionName: "main_menu",
        PositionNameShow: "Menu",
    },
    {
        id: 2,
        PositionName: "footer",
        PositionNameShow: "Footer"
    },
    {
        id: 3,
        PositionName: "other",
        PositionNameShow: "Other"
    },
]
let product_size = [
    {
        id: 1,
        SizeName: 'XLL'
    },
    {
        id: 2,
        SizeName: 'XL'
    },
    {
        id: 3,
        SizeName: 'Large'
    },
    {
        id: 4,
        SizeName: 'Medium'
    },
    {
        id: 5,
        SizeName: 'Small'
    }
]

//////////////////////////////////////////////// EDIT USED BIKE
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
        if (id) fetchUsedBikeById(id);
    }, [id]);

    const fetchUsedBikeById = async (id: any) => {
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

    const goBack = () => {
        router.push('/ebike-panel/dashboard/view-classified-ads')
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;

        if (!newtitle || newtitle.length < 2) {
            alert("Please add title")
            return
        }
        else if (invalidChars.test(newtitle)) {
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
        // else if (!mobile || mobile.length != 11 || !numericOnly(mobile)) {
        //     alert("Please write correct mobile number")
        //     return
        // }
        // else if (imageArr.length < 0) {
        //     alert('Please select min(1) image')
        //     return
        // }

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

        const res = await UpdateUsedBikeById(id, obj)
        if (res?.success) {
            alert('Updated Successfully')
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
                    <form onSubmit={handleSubmit} className={styles.main}>
                        <div className={styles.formHeader}>
                            <p className={styles.a} onClick={goBack}><ArrowBackIosIcon className={styles.icon} /></p>
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
                                    <img src={cloudinaryLoader(img , 400 , 'auto')} alt={`Preview ${index}`} />
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

///////////////////////////////////////////////// EDIT NEW BIKE
const EditNewBikeForm = () => {
    const [NewField, setNewField] = useState<any>({
        newbikeUrl: "",
        newboreAndStroke: "",
        newbrandId: "",
        newclutch: "",
        newcompressionRatio: "",
        newdescription: "",
        newdimentiuon: "",
        newdisplacement: "",
        newdryWeight: "",
        newengine: "",
        newfocus_keyword: "",
        newframe: "",
        newgroundClearance: "",
        newmeta_description: "",
        newmeta_title: "",
        newothers: "",
        newpetrolCapacity: "",
        newprice: "",
        newstarting: "",
        newtitle: "",
        newtransmission: "",
        newtyreBack: "",
        newtyreFront: "",
        newvideoUrl: ""
    })
    const [imageArr, setImageArr] = useState([])
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [AddcityId, setCityID] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { slug, slug1 } = useParams()
    let id = slug1
    const router = useRouter()
    useEffect(() => {
        if (id) fetchNewBikeByID(id);
    }, [id])

    const fetchNewBikeByID = async (id: any) => {
        setIsLoading(true);
        const getData = await getnewBikedetailsData(id);

        if (getData && getData[0].bike) {
            const bike = getData[0].bike;
            setCityID(bike.cityId)
            const { uid, createdAt, images, newbike_comments, newbike_ratings, updatedAt, cityId, id, ...cleandData } = bike
            const transformedData: any = {};
            Object.keys(cleandData).forEach((key) => {
                transformedData["new" + key] = bike[key] || "";
            });
            transformedData.uid = bike.uid || "";
            console.log("data", transformedData)


            setNewField(transformedData);
            setImageArr(bike?.images);
        }

        setIsLoading(false);
    };

    const handleChange = (field: any, value: any) => {
        setNewField((prev: any) => ({
            ...prev,
            [field]: value
        }));
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

        const invalidChars = /[\/,?#$!+]/;

        if (!NewField.newtitle || NewField.newtitle.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }
        else if (invalidChars.test(NewField.newtitle)) {
            alert("Please remove special characters.");
            return;
        }
        else if (!NewField.newbikeUrl || NewField.newbikeUrl.length < 2) {
            alert("Please enter a valid unique URL");
            return;
        }
        else if (!NewField.newprice || isNaN(Number(NewField.newprice))) {
            alert("Please enter a valid numeric price");
            return;
        }
        else if (!NewField.newengine || NewField.newengine.length < 2) {
            alert("Please enter engine info");
            return;
        }
        else if (!NewField.newboreAndStroke) {
            alert("Please enter bore & stroke");
            return;
        }
        else if (!NewField.newclutch) {
            alert("Please enter clutch info");
            return;
        }
        else if (!NewField.newstarting) {
            alert("Please enter starting info");
            return;
        }
        else if (!NewField.newdimention) {
            alert("Please enter dimension");
            return;
        }
        else if (!NewField.newpetrolCapacity) {
            alert("Please enter petrol capacity");
            return;
        }
        else if (!NewField.newdisplacement) {
            alert("Please enter displacement");
            return;
        }
        else if (!NewField.newcompressionRatio) {
            alert("Please enter compression ratio");
            return;
        }
        else if (!NewField.newtransmission) {
            alert("Please enter transmission");
            return;
        }
        else if (!NewField.newframe) {
            alert("Please enter frame info");
            return;
        }
        else if (!NewField.newgroundClearance) {
            alert("Please enter ground clearance");
            return;
        }
        else if (!NewField.newtyreFront) {
            alert("Please enter front tyre size");
            return;
        }
        else if (!NewField.newtyreBack) {
            alert("Please enter back tyre size");
            return;
        }
        else if (!NewField.newdryWeight) {
            alert("Please enter dry weight");
            return;
        }
        else if (!NewField.newdescription || NewField.newdescription.length < 10) {
            alert("Please enter a proper description (min 10 characters)");
            return;
        }
        else if (!NewField.newbrandId) {
            alert("Please select brand");
            return;
        }
        else if (!imageArr || imageArr.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;
        console.log(UserId)

        const obj = {
            ...NewField,
        };
        const finalData = {
            bikeUrl: obj?.newbikeUrl,
            boreAndStroke: obj?.newboreAndStroke,
            brandId: obj?.newbrandId,
            cityId: AddcityId,
            clutch: obj?.newclutch,
            compressionRatio: obj?.newcompressionRatio,
            description: obj?.newdescription,
            dimentiuon: obj?.newdimention,
            displacement: obj?.newdisplacement,
            dryWeight: obj?.newdryWeight,
            engine: obj?.newengine,
            focus_keyword: obj?.newfocus_keyword,
            frame: obj?.newframe,
            groundClearance: obj?.newgroundClearance,
            images: imageArr,
            meta_description: obj?.newmeta_description,
            meta_title: obj?.newmeta_title,
            others: obj?.newothers,
            petrolCapacity: obj?.newpetrolCapacity,
            price: obj?.newprice,
            starting: obj?.newstarting,
            title: obj?.newtitle,
            transmission: obj?.newtransmission,
            tyreBack: obj?.newtyreBack,
            tyreFront: obj?.newtyreFront,
            uid: UserId,
            videoUrl: obj?.newvideoUrl
        }

        const res = await UpdateNewBikeById(slug1, finalData);
        if (res && res.success && res.info == "Bike updated") {
            alert("Bike Updated Successfully")
            router.push('/ebike-panel/dashboard/all-new-bikes')
        }
        else {
            alert('Something is Wrong!')
        }
    }

    const handleBrandChange = (e: any) => {
        const brandId = e.target.value;
        setNewField((prev: any) => ({
            ...prev,
            newbrandId: brandId
        }));
    };

    const GetBrandName = (id: any) => {
        const GetbrandObject: any = BrandArr.find((item: any) => item.id === id)
        return GetbrandObject?.brandName
    }

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-new-bikes')
    }

    return (
        <div className={styles.New_main_box}>
            {
                !isLoading ?
                    <form onSubmit={handleSubmit} className={styles.main}>
                        <div className={styles.formHeader}>
                            <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                            <p className={styles.heading}>Edit New Bike</p>
                        </div>
                        {/* Title */}
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input id="title" name="title" value={NewField?.newtitle} onChange={(e) => handleChange('newtitle', e.target.value)} className={styles.input} />

                        {/* Video URL */}
                        <label htmlFor="bikeUrl" className={styles.label}>Unique URL</label>
                        <input id="bikeUrl" name="bikeUrl" value={NewField?.newbikeUrl} onChange={(e) => handleChange('newbikeUrl', e.target.value)} className={styles.input} />

                        {/* Description */}
                        <FloaraTextarea
                            value={NewField.newdescription}
                            onChange={(e: any) => handleChange('newdescription', e)}
                        />

                        {imageArr.length < 4 && (
                            <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                        )}

                        {/* Images */}
                        <label className={styles.label}>Images (max 4)</label>
                        <div className={styles.imagePreview}>
                            {imageArr?.map((img, index) => (
                                <div key={index}>
                                    <img src={cloudinaryLoader(img , 400 , 'auto')} alt={`Preview ${index}`} style={{ width: "100%", height: "100%" }} />
                                    <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.drop_downBox}>
                            <select name="" id="" className={styles.selected} onChange={handleBrandChange}>
                                <option value="" disabled selected hidden>{GetBrandName(NewField?.newbrandId)}</option>
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
                                <input id="videoUrl" name="videoUrl" value={NewField.newvideoUrl} onChange={(e) => handleChange('newvideoUrl', e.target.value)} className={styles.input_bike_url} />
                            </div>
                        </div>

                        {/* Other fields */}
                        <div className={styles.all_inputs}>
                            {[
                                { name: "newprice", label: "Price" },
                                { name: "newengine", label: "Engine" },
                                { name: "newboreAndStroke", label: "Bore & Stroke" },
                                { name: "newclutch", label: "Clutch" },
                                { name: "newstarting", label: "Starting" },
                                { name: "newdimention", label: "Dimension" },
                                { name: "newpetrolCapacity", label: "Petrol Capacity" },
                                { name: "newdisplacement", label: "Displacement" },
                                { name: "newcompressionRatio", label: "Compression Ratio" },
                                { name: "newtransmission", label: "Transmission" },
                                { name: "newframe", label: "Frame" },
                                { name: "newgroundClearance", label: "Ground Clearance" },
                                { name: "newtyreBack", label: "Tyre Back" },
                                { name: "newtyreFront", label: "Tyre Front" },
                                { name: "newdryWeight", label: "Dry Weight" }
                            ].map(({ name, label }) => (
                                <div key={name}>
                                    <label htmlFor={name} className={styles.label}>{label}</label>
                                    <input
                                        id={name}
                                        name={name}
                                        value={(NewField as any)[name]}
                                        onChange={(e) => handleChange(name, e.target.value)}
                                        className={styles.input_}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Others textarea */}
                        <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                        <textarea id="meta_title" name="meta_title" value={NewField.newmeta_title} onChange={(e) => handleChange('newmeta_title', e.target.value)} className={styles.textarea} />
                        <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                        <textarea id="meta_description" name="meta_description" value={NewField?.newmeta_description} onChange={(e) => handleChange('newmeta_description', e.target.value)} className={styles.textarea} />
                        <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                        <textarea id="focus_keyword" name="focus_keyword" value={NewField?.newfocus_keyword} onChange={(e) => handleChange('newfocus_keyword', e.target.value)} className={styles.textarea} />
                        <label htmlFor="others" className={styles.label}>Others</label>
                        <textarea id="others" name="others" value={NewField?.newothers} onChange={(e) => handleChange('newothers', e.target.value)} className={styles.textarea} />

                        {/* Submit */}
                        <button type="submit" className={styles.button}>Save Edit</button>
                    </form>
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </div>
    );
};

///////////////////////////////////////////////// EDIT NEW BIKE
const EditElectricBikeForm = () => {
    const [NewField, setNewField] = useState<any>({
        newbikeUrl: "",
        newboreAndStroke: "",
        newbrandId: "",
        newclutch: "",
        newcompressionRatio: "",
        newdescription: "",
        newdimentiuon: "",
        newdisplacement: "",
        newdryWeight: "",
        newengine: "",
        newfocus_keyword: "",
        newframe: "",
        newgroundClearance: "",
        newmeta_description: "",
        newmeta_title: "",
        newothers: "",
        newpetrolCapacity: "",
        newprice: "",
        newstarting: "",
        newtitle: "",
        newtransmission: "",
        newtyreBack: "",
        newtyreFront: "",
        newvideoUrl: ""
    })
    const [imageArr, setImageArr] = useState([])
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [AddcityId, setCityID] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [allBrands, setAllBrands] = useState([])

    const { slug, slug1 } = useParams()
    let id = slug1
    const router = useRouter()

    useEffect(() => {
        fetchBrands()
    }, [])

    async function fetchBrands() {
        const res = await getbrandData();
        console.log("Brands", res)
        if (res && res.length > 0) {
            setAllBrands(res);
        } else {
            setAllBrands([]);
        }
    }
    useEffect(() => {
        if (id) fetchNewBikeByID(id);
    }, [id])

    const fetchNewBikeByID = async (id: any) => {
        setIsLoading(true);
        const getData = await getnewBikedetailsData(id);

        if (getData && getData[0].bike) {
            const bike = getData[0].bike;
            setCityID(bike.cityId)
            const { uid, createdAt, images, newbike_comments, newbike_ratings, updatedAt, cityId, id, ...cleandData } = bike
            const transformedData: any = {};
            Object.keys(cleandData).forEach((key) => {
                transformedData["new" + key] = bike[key] || "";
            });
            transformedData.uid = bike.uid || "";
            console.log("data", transformedData)


            setNewField(transformedData);
            setImageArr(bike?.images);
        }

        setIsLoading(false);
    };

    const handleChange = (field: any, value: any) => {
        setNewField((prev: any) => ({
            ...prev,
            [field]: value
        }));
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

        const invalidChars = /[\/,?#$!+]/;

        // if (!NewField.newtitle || NewField.newtitle.length < 2) {
        //     alert("Please add a valid title (min 2 characters)");
        //     return;
        // }
        // else if (invalidChars.test(NewField.newtitle)) {
        //     alert("Please remove special characters.");
        //     return;
        // }
        // else if (!NewField.newbikeUrl || NewField.newbikeUrl.length < 2) {
        //     alert("Please enter a valid unique URL");
        //     return;
        // }
        // else if (!NewField.newprice || isNaN(Number(NewField.newprice))) {
        //     alert("Please enter a valid numeric price");
        //     return;
        // }
        // else if (!NewField.newengine || NewField.newengine.length < 2) {
        //     alert("Please enter engine info");
        //     return;
        // }
        // else if (!NewField.newboreAndStroke) {
        //     alert("Please enter Motor Detail");
        //     return;
        // }
        // else if (!NewField.newclutch) {
        //     alert("Please enter Top speed");
        //     return;
        // }
        // else if (!NewField.newstarting) {
        //     alert("Please enter starting info");
        //     return;
        // }
        // else if (!NewField.newdimention) {
        //     alert("Please enter dimension");
        //     return;
        // }
        // else if (!NewField.newpetrolCapacity) {
        //     alert("Please enter Torque detail");
        //     return;
        // }
        // else if (!NewField.newdisplacement) {
        //     alert("Please enter battery type");
        //     return;
        // }
        // else if (!NewField.newcompressionRatio) {
        //     alert("Please enter charging time");
        //     return;
        // }
        // else if (!NewField.newtransmission) {
        //     alert("Please enter wheel size");
        //     return;
        // }
        // else if (!NewField.newframe) {
        //     alert("Please enter frame info");
        //     return;
        // }
        // else if (!NewField.newgroundClearance) {
        //     alert("Please enter ground clearance");
        //     return;
        // }
        // else if (!NewField.newtyreFront) {
        //     alert("Please enter front tyre size");
        //     return;
        // }
        // else if (!NewField.newtyreBack) {
        //     alert("Please enter back tyre size");
        //     return;
        // }
        // else if (!NewField.newdryWeight) {
        //     alert("Please enter dry weight");
        //     return;
        // }
        // else if (!NewField.newdescription || NewField.newdescription.length < 10) {
        //     alert("Please enter a proper description (min 10 characters)");
        //     return;
        // }
        // else if (!NewField.newbrandId) {
        //     alert("Please select brand");
        //     return;
        // }
        // else if (!imageArr || imageArr.length === 0) {
        //     alert("Please upload at least one image");
        //     return;
        // }

        if (!NewField.newtitle || NewField.newtitle.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }
        else if (invalidChars.test(NewField.newtitle)) {
            alert("Please remove special characters.");
            return;
        }
        else if (!NewField.newbikeUrl || NewField.newbikeUrl.length < 2) {
            alert("Please enter a valid unique URL");
            return;
        }
        else if (!imageArr || imageArr.length === 0) {
            alert("Please upload at least one image");
            return;
        }
        else if (!NewField.newprice || isNaN(Number(NewField.newprice))) {
            alert("Please enter a valid numeric price");
            return;
        }
        else if (!NewField.newengine) {
            alert("Please enter Seat Length");
            return;
        }
        else if (!NewField.newboreAndStroke) {
            alert("Please enter Battery Detail");
            return;
        }
        else if (!NewField.newclutch) {
            alert("Please enter Wheel Detail");
            return;
        }
        else if (!NewField.newstarting) {
            alert("Please enter starting info");
            return;
        }
        else if (!NewField.newdimention) {
            alert("Please enter Type");
            return;
        }
        else if (!NewField.newpetrolCapacity) {
            alert("Please enter Range Per Charge");
            return;
        }
        else if (!NewField.newdisplacement) {
            alert("Please enter battery type");
            return;
        }
        else if (!NewField.newcompressionRatio) {
            alert("Please enter Frame Detail");
            return;
        }
        else if (!NewField.newtransmission) {
            alert("Please enter Shock Absorption");
            return;
        }
        else if (!NewField.newframe) {
            alert("Please enter Head Light detail");
            return;
        }
        else if (!NewField.newgroundClearance) {
            alert("Please enter Motor Detail");
            return;
        }
        else if (!NewField.newtyreBack) {
            alert("Please enter Brake Detail");
            return;
        }
        else if (!NewField.newtyreFront) {
            alert("Please enter Charge Time");
            return;
        }
        else if (!NewField.newdryWeight) {
            alert("Please enter Tyre Size");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;
        console.log(UserId)

        const obj = {
            ...NewField,
        };
        const finalData = {
            bikeUrl: obj?.newbikeUrl,
            boreAndStroke: obj?.newboreAndStroke,
            brandId: obj?.newbrandId,
            cityId: AddcityId,
            clutch: obj?.newclutch,
            compressionRatio: obj?.newcompressionRatio,
            description: obj?.newdescription,
            dimentiuon: obj?.newdimention,
            displacement: obj?.newdisplacement,
            dryWeight: obj?.newdryWeight,
            engine: obj?.newengine,
            focus_keyword: obj?.newfocus_keyword,
            frame: obj?.newframe,
            groundClearance: obj?.newgroundClearance,
            images: imageArr,
            meta_description: obj?.newmeta_description,
            meta_title: obj?.newmeta_title,
            others: obj?.newothers,
            petrolCapacity: obj?.newpetrolCapacity,
            price: obj?.newprice,
            starting: obj?.newstarting,
            title: obj?.newtitle,
            transmission: obj?.newtransmission,
            tyreBack: obj?.newtyreBack,
            tyreFront: obj?.newtyreFront,
            uid: UserId,
            videoUrl: obj?.newvideoUrl
        }

        console.log("data", obj, finalData);

        const res = await UpdateNewBikeById(slug1, finalData);
        if (res && res.success && res.info == "Bike updated") {
            alert("Updated Successfully")
            router.push('/ebike-panel/dashboard/all-electric-bikes')
        }
        else {
            alert('Something is Wrong!')
        }
    }

    const handleBrandChange = (e: any) => {
        const brandId = e.target.value;
        setNewField((prev: any) => ({
            ...prev,
            newbrandId: brandId
        }));
    };

    const GetBrandName = (id: any) => {
        const GetbrandObject: any = allBrands.find((item: any) => item.id === id)
        return GetbrandObject?.brandName
    }

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-electric-bikes')
    }

    return (
        <div className={styles.New_main_box}>
            {
                !isLoading ?
                    <form onSubmit={handleSubmit} className={styles.main}>
                        <div className={styles.formHeader}>
                            <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                            <p className={styles.heading}>Edit Electric Bike</p>
                        </div>
                        {/* Title */}
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input id="title" name="title" value={NewField?.newtitle} onChange={(e) => handleChange('newtitle', e.target.value)} className={styles.input} />

                        {/* Video URL */}
                        <label htmlFor="bikeUrl" className={styles.label}>Unique URL</label>
                        <input id="bikeUrl" name="bikeUrl" value={NewField?.newbikeUrl} onChange={(e) => handleChange('newbikeUrl', e.target.value)} className={styles.input} />

                        {/* Description */}
                        <FloaraTextarea
                            value={NewField.newdescription}
                            onChange={(e: any) => handleChange('newdescription', e)}
                        />

                        {imageArr.length < 4 && (
                            <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                        )}

                        {/* Images */}
                        <label className={styles.label}>Images (max 4)</label>
                        <div className={styles.imagePreview}>
                            {imageArr?.map((img, index) => (
                                <div key={index}>
                                    <img src={cloudinaryLoader(img , 400 , 'auto')} alt={`Preview ${index}`} style={{ width: "100%", height: "100%" }} />
                                    <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                                </div>
                            ))}
                        </div>

                        {allBrands?.length > 0 ? <div className={styles.drop_downBox}>
                            <select name="" id="" className={styles.selected} onChange={handleBrandChange}>
                                <option value="" disabled selected hidden>{GetBrandName(NewField?.newbrandId)}</option>
                                {
                                    allBrands.map((e: any, index: any) => (
                                        <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                            {e?.brandName}
                                        </option>
                                    ))
                                }
                            </select>

                            <div>
                                <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                                <input id="videoUrl" name="videoUrl" value={NewField.newvideoUrl} onChange={(e) => handleChange('newvideoUrl', e.target.value)} className={styles.input_bike_url} />
                            </div>
                        </div> : ""}

                        {/* Other fields */}
                        <div className={styles.all_inputs}>
                            {[
                                // { name: "newprice", label: "Price" },
                                // { name: "newdimention", label: "Dimension" },
                                // { name: "newengine", label: "Engine" },
                                // { name: "newboreAndStroke", label: "Motor" },
                                // { name: "newframe", label: "Frame" },
                                // { name: "newpetrolCapacity", label: "Tourque" },
                                // { name: "newstarting", label: "Starting" },
                                // { name: "newgroundClearance", label: "Ground Clearance" },
                                // { name: "newclutch", label: "Top Speed" },
                                // { name: "newdryWeight", label: "Dry Weight" },
                                // { name: "newtransmission", label: "Transmission" },
                                // { name: "newtyreBack", label: "Tyre Back" },
                                // { name: "newtyreFront", label: "Tyre Front" },
                                // { name: "newdisplacement", label: "Battery Type" },
                                // { name: "newcompressionRatio", label: "Charging Time" },
           
                                { name: "newprice", label: "Price" },
                                { name: "newdimention", label: "Type" },
                                { name: "newengine", label: "Seat Length" },
                                { name: "newboreAndStroke", label: "Battery" }, // change
                                { name: "newframe", label: "Head Light" },
                                { name: "newpetrolCapacity", label: "Range Per Charge" }, // change
                                { name: "newstarting", label: "Speed" },
                                { name: "newgroundClearance", label: "Motor" },
                                { name: "newclutch", label: "Wheel" }, // change
                                { name: "newdryWeight", label: "Tyre Size" },
                                { name: "newtransmission", label: "Shock Absorption" }, // change
                                { name: "newtyreBack", label: "Brake (Front/Rear)" },
                                { name: "newtyreFront", label: "Charge Time" },
                                { name: "newdisplacement", label: "Battery Type" }, // change
                                { name: "newcompressionRatio", label: "Frame" },

                            ].map(({ name, label }) => (
                                <div key={name}>
                                    <label htmlFor={name} className={styles.label}>{label}</label>
                                    <input
                                        id={name}
                                        name={name}
                                        value={(NewField as any)[name]}
                                        onChange={(e) => handleChange(name, e.target.value)}
                                        className={styles.input_}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Others textarea */}
                        <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                        <textarea id="meta_title" name="meta_title" value={NewField.newmeta_title} onChange={(e) => handleChange('newmeta_title', e.target.value)} className={styles.textarea} />
                        <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                        <textarea id="meta_description" name="meta_description" value={NewField?.newmeta_description} onChange={(e) => handleChange('newmeta_description', e.target.value)} className={styles.textarea} />
                        <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                        <textarea id="focus_keyword" name="focus_keyword" value={NewField?.newfocus_keyword} onChange={(e) => handleChange('newfocus_keyword', e.target.value)} className={styles.textarea} />
                        <label htmlFor="others" className={styles.label}>Others</label>
                        <textarea id="others" name="others" value={NewField?.newothers} onChange={(e) => handleChange('newothers', e.target.value)} className={styles.textarea} />

                        {/* Submit */}
                        <button type="submit" className={styles.button}>Save Edit</button>
                    </form>
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </div>
    );
};

///////////////////////////////////////////////// EDIT BLOG 
const EditBlogForm = () => {
    const [Blog_Meta_Description, setBlog_Meta_description] = useState('');
    const [Blog_Featured_Image, setBlog_Featured_Image] = useState('');
    const [Blog_Focus_keyword, setBlog_Focus_keyword] = useState('');
    const [Blog_Meta_Title, setBlog_Meta_Title] = useState('');
    const [Author_Name, setAuthor_Name] = useState('');
    const [BlogData, setBlogData] = useState<any>([]);
    const [Blog_Title, setBlog_Title] = useState('');
    const [CategoryId, setCategoryId] = useState('');
    const [Blog_Html, setBlog_Html] = useState('');
    const [imageArr, setImageArr] = useState<any>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const { slug, slug1 } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        fetchBlogByID(slug1)
    }, [])

    const fetchBlogByID = async (id: any) => {
        const res = await getSingleblogDetail(id)
        if (res) {
            setCategoryId(res.blogCategoryId)
            setBlog_Title(res.blogTitle)
            setAuthor_Name(res.authorname)
            setBlog_Html(res.bloghtml)
            setBlog_Meta_description(res.meta_description)
            setBlog_Meta_Title(res.meta_title)
            setBlog_Focus_keyword(res.focus_keyword)
            setBlog_Featured_Image(res.featuredImage)
            setBlogData(res)
            if (res.featuredImage.includes(' #$# ')) {
                const GetImage = res.featuredImage.split(' #$# ').map((item: any) => item.trim());
                setImageArr(GetImage)
            }
            else {
                setImageArr([res.featuredImage])
            }
        }
    }

    const handleImageDelete = (index: number) => {
        const updatedImages = imageArr.filter((_: any, i: any) => i !== index);
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

    const CategoryChange = (e: any) => {
        setCategoryId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;
        if (invalidChars.test(Blog_Title)) {
            alert("Please remove special characters.");
            return;
        }
        if (!Blog_Title || Blog_Title.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }

        else if (!Author_Name && Author_Name.length < 2) {
            alert("Please enter a Author Name");
            return;
        }
        else if (!Blog_Html) {
            alert("Please enter a Description");
            return;
        }
        else if (!imageArr || imageArr.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;

        const finalBlogData = {
            blogCate1goryId: Number(CategoryId),
            ...BlogData,
            uid: UserId || null
        };
        const obj = {
            authorname: Author_Name,
            BlogCategoryId: Number(CategoryId),
            blogTitle: Blog_Title,
            blogUrl: finalBlogData?.blogUrl,
            bloghtml: Blog_Html,
            blogtext: finalBlogData?.blogtext,
            featuredImage: imageArr.join(' #$# '),
            focus_keyword: Blog_Focus_keyword,
            meta_description: Blog_Meta_Description,
            meta_title: Blog_Meta_Title,
            uid: UserId
        }
        console.log(obj)
        const res = await UpdateBlogById(slug1, obj)
        if (res && res.info == "blog updated" && res.success) {
            alert('Updated Successfully')
            router.push('/ebike-panel/dashboard/blog-list')
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/blog-list')
    }

    return (
        <div className={styles.main_blog_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Edit Blog</p>
                </div>
                <label htmlFor="blogTitle" className={styles.label}>Title</label>
                <input id="blogTitle" name="blogTitle" value={Blog_Title} onChange={(e) => setBlog_Title(e.target.value)} className={styles.input} />

                <label htmlFor="authorname" className={styles.label}>Author Name</label>
                <input id="authorname" name="authorname" value={Author_Name} onChange={(e) => setAuthor_Name(e.target.value)} className={styles.input} />

                <label htmlFor="bloghtml" className={styles.label}>Description</label>
                <FloaraTextarea
                    value={Blog_Html}
                    onChange={(e: any) => setBlog_Html(e)}
                />

                {/* <input
                    type="file"
                    className={styles.fileInput}
                    accept="image/*"
                    onChange={(e) => uploadImage(e)}
                />
                {Blog_Featured_Image && (
                    <img
                        src={Blog_Featured_Image}
                        alt="Preview"
                        style={{ width: '150px', height: '100px', marginTop: '10px', border: '1px solid grey', borderRadius: '3px' }}
                    />
                )} */}

                {imageArr.length < 4 && (
                    <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                )}

                {/* Images */}
                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {imageArr?.map((img: any, index: any) => (
                        <div key={index}>
                            <img src={cloudinaryLoader(img , 400 , 'auto')} alt={`Preview ${index}`} style={{ width: "100%", height: "100%" }} />
                            <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                        </div>
                    ))}
                </div>


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
                <textarea id="meta_title" name="meta_title" value={Blog_Meta_Title} onChange={(e) => setBlog_Meta_Title(e.target.value)} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={Blog_Meta_Description} onChange={(e) => setBlog_Meta_description(e.target.value)} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={Blog_Focus_keyword} onChange={(e) => setBlog_Focus_keyword(e.target.value)} className={styles.textarea} />

                <button type="submit" className={styles.button}>Save Edit</button>
            </form>
        </div>
    );
}

///////////////////////////////////////////////// EDIT PAGES 
const EditPageForm = () => {
    const [PageData, setPageData] = useState<any>({});
    const [NewTitle, setNewTitle] = useState('');
    const [NewName, setNewName] = useState('');
    const [NewMetaTitle, setNewMetaTitle] = useState('');
    const [NewDescription, setNewDescritpion] = useState('');
    const [NewMetaDescription, setNewMetaDescription] = useState('');
    const [NewFocusKeyword, setNewFocusKeyword] = useState('');
    const [NewPosition, setNewPosition] = useState('');
    const { slug, slug1 } = useParams();
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        fetchPageByID(slug1)
    }, [])

    const fetchPageByID = async (id: any) => {
        setIsLoading(true)
        const res = await getPageById(id)
        if (res && res.success) {
            setNewTitle(res?.page?.title)
            setNewName(res?.page?.name)
            setNewMetaTitle(res?.page?.meta_title)
            setNewDescritpion(res?.page?.html)
            setNewMetaDescription(res?.page?.meta_description)
            setNewFocusKeyword(res?.page?.focus_keyword)
            setNewPosition(res?.page?.displayPosition)
            setPageData(res?.page)
        }
        else {
            alert('Waiting reload page!')
        }
        setIsLoading(false)
    }

    const CategoryChange = (e: any) => {
        setNewPosition(e.target.value);
    };

    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;
        if (invalidChars.test(NewTitle)) {
            alert("Please remove special characters.");
            return;
        }
        if (!NewTitle || NewTitle.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }
        else if (!NewName && NewName.length < 2) {
            alert("Please enter a Page Name");
            return;
        }
        else if (!NewDescription) {
            alert("Please enter a Description");
            return;
        }
        else if (!NewPosition) {
            alert("Please Select a Position");
            return
        }


        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;

        const obj = {
            title: NewTitle,
            html: NewDescription,
            name: NewName,
            focus_keyword: NewFocusKeyword,
            meta_description: NewMetaDescription,
            meta_title: NewMetaTitle,
            displayPosition: NewPosition,
            uid: UserId,
            images: [],
            text: '',
            url: ''
        }
        const res = await UpdatePageById(slug1, obj)
        if (res && res.message == "updated successfully" && res.success) {
            alert('Updated Successfully')
            router.push('/ebike-panel/dashboard/all-pages')
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-pages')
    }


    return (
        <div className={styles.main_page_box}>
            {
                !isLoading ?
                    <form onSubmit={handleSubmit} className={styles.main}>
                        <div className={styles.formHeader}>
                            <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                            <p className={styles.heading}>Edit Page</p>
                        </div>
                        <label htmlFor="title" className={styles.label}>Page Title</label>
                        <input id="title" name="title" value={NewTitle} onChange={(e) => setNewTitle(e.target.value)} className={styles.input} />

                        <label htmlFor="name" className={styles.label}>Page Name</label>
                        <input id="name" name="name" value={NewName} onChange={(e) => setNewName(e.target.value)} className={styles.input} />

                        <label htmlFor="Description" className={styles.label}>Description</label>
                        <FloaraTextarea
                            value={NewDescription}
                            onChange={(e: any) => setNewDescritpion(e)}
                        />

                        <div className={styles.drop_downBox}>
                            <select name="" id="" className={styles.selected} onChange={CategoryChange}>
                                <option value={PageData?.name || ''} disabled selected hidden>
                                    {
                                        PageData?.displayPosition
                                    }
                                    {/* {Pos.find((e: any) => e.id === BlogData.blogCategoryId)?.categoryName || "Select Category"} */}
                                </option>
                                {
                                    PagePosition.map((e: any, index) => (
                                        <option key={index} value={e?.PositionName} className={styles.options} style={{ fontSize: '16px' }}>
                                            {e?.PositionNameShow}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                        <textarea id="meta_title" name="meta_title" value={NewMetaTitle} onChange={(e) => setNewMetaTitle(e.target.value)} className={styles.textarea} />
                        <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                        <textarea id="meta_description" name="meta_description" value={NewMetaDescription} onChange={(e) => setNewMetaDescription(e.target.value)} className={styles.textarea} />
                        <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                        <textarea id="focus_keyword" name="focus_keyword" value={NewFocusKeyword} onChange={(e) => setNewFocusKeyword(e.target.value)} className={styles.textarea} />

                        <button type="submit" className={styles.button}>Save Edit</button>
                    </form> :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
        </div>
    );
}

///////////////////////////////////////////////// EDIT PAGES 
const EditBrandForm = () => {
    const [BrandData, setBrandData] = useState<any>([]);
    const [NewBrandName, setNewBrandName] = useState('');
    const [NewVideoUrl, setNewVideoUrl] = useState('');
    const [NewMetaTitle, setNewMetaTitle] = useState('');
    const [NewDescription, setNewDescription] = useState('');
    const [NewMetaDescription, setNewMetaDescription] = useState('');
    const [NewFocusKeyword, setNewFocusKeyword] = useState('');
    const [NewLogoUrl, setNewLogoUrl] = useState('');
    const { slug, slug1 } = useParams();
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        fetchPageByID(slug1)
    }, [])

    const fetchPageByID = async (id: any) => {
        setIsLoading(true)
        const res = await getBrandFromId(id, BrandArr)
        console.log("DataCheck", res)
        if (res && res) {
            setNewBrandName(res[0].brandName)
            setNewLogoUrl(res[0].logoUrl)
            setNewMetaTitle(res[0].meta_title)
            setNewVideoUrl(res[0].vediourl)
            setNewMetaDescription(res[0].meta_description)
            setNewDescription(res[0].description)
            setNewFocusKeyword(res[0].focus_keyword)
            setBrandData(res?.page)
        }
        else {
            alert('Waiting reload page!')
        }
        setIsLoading(false)
    }

    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;
        if (invalidChars.test(NewBrandName)) {
            alert("Please remove special characters.");
            return;
        }
        if (!NewBrandName || NewBrandName.length < 2) {
            alert("Please add a valid Brand Name (min 3 characters)");
            return;
        }
        else if (!NewLogoUrl && NewLogoUrl.length < 2) {
            alert("Please enter a Logo Url");
            return;
        }
        else if (!NewDescription) {
            alert("Please enter a Description");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;

        const obj = {
            brandName: NewBrandName,
            logoUrl: NewLogoUrl,
            focus_keyword: NewFocusKeyword,
            meta_description: NewMetaDescription,
            meta_title: NewMetaTitle,
            vediourl: NewVideoUrl,
            description: NewDescription,
        }
        const res = await UpdateBrandById(slug1, obj)
        if (res && res.info == "brand is updated successfully") {
            alert('Updated Successfully')
            router.push('/ebike-panel/dashboard/all-bike-brands')
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-bike-brands')
    }


    return (
        <div className={styles.main_brand_box}>
            {
                !isLoading ?
                    <form onSubmit={handleSubmit} className={styles.main}>
                        <div className={styles.formHeader}>
                            <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                            <p className={styles.heading}>Edit Brand</p>
                        </div>

                        <label htmlFor="brandname" className={styles.label}>Brand Name</label>
                        <input id="brandname" name="brandname" value={NewBrandName} onChange={(e) => setNewBrandName(e.target.value)} className={styles.input} />

                        <label htmlFor="Description" className={styles.label}>Description</label>
                        <FloaraTextarea
                            value={NewDescription}
                            onChange={(e: any) => setNewDescription(e)}
                        />

                        <label htmlFor="title" className={styles.label}>Logo Url</label>
                        <input id="title" name="title" value={NewLogoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} className={styles.input} />

                        <label htmlFor="title" className={styles.label}>Video Url</label>
                        <input id="title" name="title" value={NewVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} className={styles.input} />

                        <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                        <textarea id="meta_title" name="meta_title" value={NewMetaTitle} onChange={(e) => setNewMetaTitle(e.target.value)} className={styles.textarea} />
                        <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                        <textarea id="meta_description" name="meta_description" value={NewMetaDescription} onChange={(e) => setNewMetaDescription(e.target.value)} className={styles.textarea} />
                        <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                        <textarea id="focus_keyword" name="focus_keyword" value={NewFocusKeyword} onChange={(e) => setNewFocusKeyword(e.target.value)} className={styles.textarea} />

                        <button type="submit" className={styles.button}>Save Edit</button>
                    </form> :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
        </div>
    );
}


///////////////////////////////////////////////////////// EDIT NEW product
const EditProductForm = () => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageArr, setImageArr] = useState([])
    const [imageFilesProduct, setImageFilesProduct] = useState<File[]>([]);
    const [imageArrProduct, setImageArrProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [AllCategoryName, setAllCategoryName] = useState([]);
    const [SubCategoryName, setSubCategoryName] = useState([]);
    const [ProductCompany, setProductCompany] = useState([]);
    const [variants, setVariants] = useState<any>([]);
    const params = useParams() 
    const ProductIdParams = params?.slug1   

    const [AllFieldIDs, setAllFieldIds] = useState<any>({
        sell: false,
        main_category_id: "",
        sub_category_id: "",
        company_id: "",
        product_size: ""
    })

    const [productData, setproductData] = useState<any>({
        productprice: '',
        product_name: '',
        product_description: '',
        sellprice: '',
        videoUrl: '',
        quantity: ""
    });

    let router = useRouter()
    useEffect(() => {
        fetchAllCategName()
        fetchProductById()
    }, [])

    const fetchProductById = async () => {
        setIsLoading(true)
        const res = await getProduct({ id: ProductIdParams })
        if (res && res?.data && res?.data.length > 0) {
            setproductData({
                productprice: res?.data[0]?.product_price,
                product_name: res?.data[0]?.product_name,
                product_description: res?.data[0]?.product_description,
                sellprice: res?.data[0]?.sell_price,
                videoUrl: res?.data[0]?.videoUrl,
                quantity: res?.data[0]?.quantity
            })
            setAllFieldIds({
                sell: res?.data[0]?.sell,
                main_category_id: res?.data[0]?.main_catagory_id,
                sub_category_id: res?.data[0]?.sub_catagory_id,
                company_id: res?.data[0]?.company_id,
                product_size: res?.data?.product_size
            })
            setImageArr(res?.data[0]?.images)
            setImageArrProduct(res?.data[0]?.size_guide)
            fetchSubCategName(res?.data[0]?.sub_catagory_id)

            setVariants(res?.data[0]?.stocks)
        }
        setIsLoading(false)
    }

    const fetchAllCategName = async () => {
        const rescategory = await getShopMainCategory();
        setAllCategoryName(rescategory)
        const rescompnay = await getProductCompany();
        setProductCompany(rescompnay)
    }

    const fetchSubCategName = async (id: any) => {
        const rescategory = await GetSubCategByMainCateg(id);
        setSubCategoryName(rescategory)
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setproductData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleImageDelete = (index: number, from: any) => {
        if (from == 'sizeguide') {
            const updatedImages = imageArr.filter((_, i) => i !== index);
            const updatedFiles = imageFiles.filter((_, i) => i !== index);
            setImageArr(updatedImages);
            setImageFiles(updatedFiles);
        }
        else if (from == 'product') {
            const updatedImages = imageArrProduct.filter((_, i) => i !== index);
            const updatedFiles = imageFilesProduct.filter((_, i) => i !== index);
            setImageArrProduct(updatedImages);
            setImageFilesProduct(updatedFiles);
        }
        else {
            alert("not found variety")
        }
    };

    function uploadImage(event: any, from: any) {
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
                let _imageArrProduct: any = [...imageArrProduct]
                _imageArrProduct.push(imgRes.secure_url)

                if (from == "sizeguide") {
                    setImageArr(_imageArr)
                }
                else if (from == "product") {
                    setImageArrProduct(_imageArrProduct)
                }
            }

        }
    }

    const handleproductChange = (e: any, from: any) => {
        const { name, value } = e.target;
        if (from == 'sell') {
            if (value == "true") {
                setAllFieldIds((prev: any) => ({ ...prev, sell: true }));
            }
            else {
                setAllFieldIds((prev: any) => ({ ...prev, sell: false }));
            }
        }
        else if (from == "main") {
            setAllFieldIds((prev: any) => ({ ...prev, main_category_id: value }));
            // fetchSubCategName(e?.target?.value)
        }
        else if (from == "company") {
            setAllFieldIds((prev: any) => ({ ...prev, company_id: value }));
        }
        else if (from == "size") {
            setAllFieldIds((prev: any) => ({ ...prev, product_size: value }));
        }
        else {
            setAllFieldIds((prev: any) => ({ ...prev, sub_category_id: value }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!productData.product_name || productData.product_name.length < 2) {
            alert("Please add a valid Name (min 2 characters)");
            return;
        }
        else if (!productData.productprice) {
            alert("Please add a Product Price");
            return;
        }
        else if (!productData.product_description || productData.product_description.length < 10) {
            alert("Please enter a valid product description (min 10 characters)");
            return;
        }
        else if (!productData.sellprice) {
            alert("Please enter a Product Sell Price");
            return;
        }
        else if (Number(productData.sellprice) > Number(productData.productprice)) {
            alert("Sell Price cannot be greater than Product Price");
            return;

        }
        else if (!AllFieldIDs?.main_category_id) {
            alert("Please select a Product Category");
            return;
        }
        else if (!AllFieldIDs?.company_id) {
            alert("Please select a Product Company");
            return;
        }
        else if (!imageArr || imageArr.length === 0) {
            alert("Please select at least one image!");
            return;
        }
        else if (!imageArrProduct || imageArrProduct.length === 0) {
            alert("Please select at least one image!");
            return;
        }
        // else if (variants) {
        //     // if(variants.length > 0){
        //     variants.map((e: any) => {
        //         if (!e.product_size || !e.quantity) {
        //             alert("Please enter size and quantity for all variants");
        //         }
        //         return;
        //     }
        //     )
        //     // }
        // }

        const finalBikeData = {
            ...productData,
            ...AllFieldIDs,
            images: imageArr,
            size_guide: imageArrProduct
        }
        const obj = {
            company_id: finalBikeData?.company_id,
            images: imageArr,
            main_catagory_id: finalBikeData?.main_category_id,
            on_sell: finalBikeData?.sell,
            product_description: finalBikeData?.product_description,
            product_name: finalBikeData?.product_name,
            product_price: finalBikeData?.productprice,
            sell_price: finalBikeData?.sellprice,
            size_guide: imageArrProduct,
            sub_catagory_id: finalBikeData?.sub_category_id,
            video_url: finalBikeData?.videoUrl,
        }

        const res = await UpdateProductDetailById(ProductIdParams, obj);
        if (res && res.success && res.info == "Updated successfully") {
            alert("Product Updated Successfully!")
            router.push('/ebike-panel/dashboard/product-list');
        } else {
            alert('Something went wrong!');
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/product-list')
    }

    const handleAddVariant = () => {
        if (variants.length >= 5) {
            alert("Maximum 5 stock boxes allowed!");
            return;
        }
        setVariants([...variants, { product_size: "", quantity: "" }]);
    };

    const handleRemoveVariant = (index: any) => {
        const updated = variants.filter((_: any, i: any) => i !== index);
        setVariants(updated);
    };

    const handleChange = (index: any, field: any, value: any) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    return (
        <div className={styles.product_main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Edit Product</p>
                </div>

                <label htmlFor="product_name" className={styles.label}>Product Name</label>
                <input id="product_name" name="product_name" value={productData?.product_name} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="productprice" className={styles.label}>Product Price</label>
                <input id="productprice" name="productprice" value={productData.productprice} onChange={handleInputChange} className={styles.input} />


                <label htmlFor="product_description" className={styles.label}>Product Description</label>
                <input id="product_description" name="product_description" value={productData.product_description} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="sellprice" className={styles.label}>Sell Price</label>
                <input id="sellprice" name="sellprice" value={productData.sellprice} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                <input id="videoUrl" name="videoUrl" value={productData.videoUrl} onChange={handleInputChange} className={styles.input} />


                {/* ///////////////////////////////////////////////////////////// SELL DROP DOWN */}
                <label className={styles.label}>Sell</label>
                <div className={styles.drop_downBox}>
                    <select
                        name="sell"
                        className={styles.selected}
                        onChange={(e) => handleproductChange(e, 'sell')}
                        value={AllFieldIDs?.sell ? "true" : "false"}
                    >
                        <option value="true" className={styles.options} style={{ fontSize: '16px' }}>
                            True
                        </option>
                        <option value="false" className={styles.options} style={{ fontSize: '16px' }}>
                            False
                        </option>
                    </select>
                </div>

                {/* ///////////////////////////////////////////////////////////// MAIN CATEGORY DROP DOWN */}
                <label className={styles.label}>Main Category</label>
                <div className={styles.drop_downBox}>
                    <select name="main_category_id" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'main')}>
                        {
                            AllCategoryName?.map((e: any, index) => (
                                <option key={index} value={e?.id} selected={AllFieldIDs?.main_category_id == e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* ///////////////////////////////////////////////////////////// SUB CATEGORY DROP DOWN */}
                <label className={styles.label}>Sub Category</label>
                {/* {
                    SubCategoryName.length > 0 ? */}
                <div className={styles.drop_downBox}>
                    <select name="sub_category_id" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'sub')}>
                        {
                            SubCategoryName.map((e: any, index) => (
                                <option key={index} value={e?.id} selected={AllFieldIDs?.sub_category_id == e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {/* : ""
                } */}

                <label className={styles.label}>Product Company</label>
                <div className={styles.drop_downBox}>
                    <select name="company_id" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'company')}>
                        <option value="" disabled selected hidden>Select Company</option>
                        {
                            ProductCompany.map((e: any, index) => (
                                <option key={index} value={e?.id} selected={AllFieldIDs?.company_id == e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* ///////////////////////////////////////////////////////////// SIZE GUIDE */}
                <label className={styles.label}>Upload Size Guide Photos (max 5)</label>
                {imageArr.length < 5 ?
                    <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e, 'sizeguide')} className={styles.fileInput} />
                    : ""}

                <div className={styles.imagePreview}>
                    {imageArr.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Preview ${index}`} style={{ width: '100%', height: "100%" }} />
                            <button type="button" onClick={() => handleImageDelete(index, 'sizeguide')}>×</button>
                        </div>
                    ))}
                </div>

                {/* ///////////////////////////////////////////////////////////// PRODUCT PHOTOS */}
                <label className={styles.label}>Upload Photos (max 5)</label>
                {imageArrProduct.length < 5 ?
                    <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e, "product")} className={styles.fileInput} />
                    : ""}

                <div className={styles.imagePreview}>
                    {imageArrProduct.map((img, index) => (
                        <div key={index}>
                            <img src={cloudinaryLoader(img , 400 , 'auto')} alt={`Preview ${index}`} style={{ width: '100%', height: "100%" }} />
                            <button type="button" onClick={() => handleImageDelete(index, 'product')}>×</button>
                        </div>
                    ))}
                </div>

                {/* ///////////////////////////////////////// QUANTITY AND SIZE BOX  */}
                {/* {variants.map((item: any, index: any) => (
                    <div key={index} className={styles.stock_box}>
                        <div className={styles.quantity_box}>
                            <label className={styles.label}>Quantity</label>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleChange(index, "quantity", e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.size}>
                            <label className={styles.label}>Product Size</label>
                            <select
                                value={item.product_size || ''} // Ensure a default value is set
                                //  onChange={(e) => setItem({ ...item, size: Number(e.target.value) })}
                                onChange={(e) => handleChange(index, "product_size", e.target.value)}
                                className={styles.selected}
                            >
                                {
                                    item?.product_size ?
                                        "" : <option value="" disabled selected hidden>Select Size</option>
                                }
                                {product_size.map((e: any, i: any) => (
                                    <option key={i} value={e?.id} selected={item?.product_size ? e?.id == item?.product_size : false} className={styles.options} style={{ fontSize: '16px' }}>
                                        {e?.SizeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {variants.length > 1 && (
                            <button className={styles.cross_btn}>
                                <CloseIcon
                                    className={styles.removeIcon}
                                    onClick={() => handleRemoveVariant(index)}
                                />
                            </button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddVariant} className={styles.button_1}>
                    Add More Size & Quantity
                </button> */}
                <button type="submit" className={styles.button}>Add Product</button>
            </form>
        </div>
    );
}

export {
    EditUsedBikeForm,
    EditNewBikeForm,
    EditBlogForm,
    EditPageForm,
    EditBrandForm,
    EditElectricBikeForm,
    EditProductForm
};