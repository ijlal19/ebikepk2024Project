'use client';
import { addNewBike, addNewBlog, addNewBrand, addNewPage, addNewProduct, GetProductCompany, getShopMainCategory, GetSubCategByMainCateg, uplaodImageFunc } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import FloaraTextArea from '../floaraEditiorTextarea';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';

const jsCookie = require('js-cookie');


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
let PageCategory = [
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
    'XLL', "XL", "Large", "Medium", "Small"
]


////////////////////////////////////////////////////////// ADD NEW BIKE
const AddNewBikeForm = () => {
    let router = useRouter()
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageArr, setImageArr] = useState([])
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [BikeData, setBikeData] = useState({
        bikeUrl: '',
        boreAndStroke: '',
        cityId: 1,
        clutch: '',
        compressionRatio: '',
        description: '',
        dimention: '',
        displacement: '',
        dryWeight: '',
        engine: '',
        focus_keyword: '',
        frame: '',
        groundClearance: '',
        meta_description: '',
        meta_title: '',
        others: '',
        petrolCapacity: '',
        price: '',
        starting: '',
        title: '',
        transmission: '',
        tyreBack: '',
        tyreFront: '',
        videoUrl: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBikeData(prev => ({ ...prev, [name]: value }));
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
            }

        }
    }

    const handleBrandChange = (e: any) => {
        setSelectedBrandId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;

        if (!BikeData.title || BikeData.title.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }
        else if (invalidChars.test(BikeData.title)) {
            alert("Please remove special characters.");
            return;
        }
        else if (!BikeData.bikeUrl || BikeData.bikeUrl.length < 2) {
            alert("Please enter a valid unique URL");
            return;
        }
        else if (!BikeData.description || BikeData.description.length < 10) {
            alert("Please enter a proper description (min 10 characters)");
            return;
        }
        else if (!imageArr || imageArr.length === 0) {
            alert("Please upload at least one image");
            return;
        }
        else if (!selectedBrandId) {
            alert("Please select brand");
            return
        }
        else if (!BikeData.price || isNaN(Number(BikeData.price))) {
            alert("Please enter a valid numeric price");
            return;
        }
        else if (!BikeData.engine || BikeData.engine.length < 2) {
            alert("Please enter engine info");
            return;
        }
        else if (!BikeData.boreAndStroke) {
            alert("Please enter bore & stroke");
            return;
        }
        else if (!BikeData.clutch) {
            alert("Please enter clutch info");
            return;
        }
        else if (!BikeData.starting) {
            alert("Please enter starting info");
            return;
        }
        else if (!BikeData.dimention) {
            alert("Please enter dimension");
            return;
        }
        else if (!BikeData.petrolCapacity) {
            alert("Please enter petrol capacity");
            return;
        }
        else if (!BikeData.displacement) {
            alert("Please enter displacement");
            return;
        }
        else if (!BikeData.compressionRatio) {
            alert("Please enter compression ratio");
            return;
        }
        else if (!BikeData.transmission) {
            alert("Please enter transmission");
            return;
        }
        else if (!BikeData.frame) {
            alert("Please enter frame info");
            return;
        }
        else if (!BikeData.groundClearance) {
            alert("Please enter ground clearance");
            return;
        }
        else if (!BikeData.tyreBack) {
            alert("Please enter back tyre size");
            return;
        }
        else if (!BikeData.tyreFront) {
            alert("Please enter front tyre size");
            return;
        }
        else if (!BikeData.dryWeight) {
            alert("Please enter dry weight");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;
        console.log(UserId)

        const finalBikeData = {
            ...BikeData,
            brandId: selectedBrandId,
            images: imageArr,
            uid: UserId || null
        };
        console.log(finalBikeData)
        const res = await addNewBike(finalBikeData)
        if (res && res.success) {
            router.push('/ebike-panel/dashboard/all-new-bikes')
        }
        else {
            alert('Something is Wrong!')
        }
        console.log(res)
    }

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-new-bikes')
    }


    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Add New Bike</p>
                </div>

                <label htmlFor="title" className={styles.label}>Title</label>
                <input id="title" name="title" value={BikeData.title} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="bikeUrl" className={styles.label}>Unique URL</label>
                <input id="bikeUrl" name="bikeUrl" value={BikeData.bikeUrl} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="description" className={styles.label}>Description</label>
                <FloaraTextArea
                    value={BikeData.description}
                    onChange={(desc: any) => setBikeData((prev) => ({ ...prev, description: desc }))}
                />

                {selectedImages.length < 4 && (
                    <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                )}

                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {imageArr.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Preview ${index}`} style={{ width: '100%', height: "100%" }} />
                            <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                        </div>
                    ))}
                </div>

                <div className={styles.drop_downBox}>
                    <select name="" id="" className={styles.selected} onChange={handleBrandChange}>
                        <option value="" disabled selected hidden>Select Brand</option>
                        {
                            BrandArr.map((e: any, index) => (
                                <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.brandName}
                                </option>
                            ))
                        }
                    </select>

                    <div style={{ marginTop: '10px' }}>
                        <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                        <input id="videoUrl" name="videoUrl" value={BikeData.videoUrl} onChange={handleInputChange} className={styles.input_bike_url} />
                    </div>
                </div>

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

                <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                <textarea id="meta_title" name="meta_title" value={BikeData.meta_title} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={BikeData.meta_description} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={BikeData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="others" className={styles.label}>Others</label>
                <textarea id="others" name="others" value={BikeData.others} onChange={handleInputChange} className={styles.textarea} />

                <button type="submit" className={styles.button}>Add Bike</button>
            </form>
        </div>
    );
};

///////////////////////////////////////////////////////// ADD Electric Bike
const AddNewElectricBikeForm = () => {
    let router = useRouter()
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageArr, setImageArr] = useState([])
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [BikeData, setBikeData] = useState({
        bikeUrl: '',
        videoUrl: '',
        title: '',
        description: '',
        meta_title: '',
        meta_description: '',
        focus_keyword: '',
        others: '',

        price: '',//
        engine: '',//   
        starting: '',//
        dimention: '',//
        dryWeight: '',//
        groundClearance: '',//
        frame: '',//
        batteryType: '',//
        chargingTime: '',//
        wheelSize: '',//
        tyreBack: '',//
        tyreFront: '',//
        moter: '',//
        topSpeed: '',//
        range: '',//
        torque: '',//
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBikeData(prev => ({ ...prev, [name]: value }));
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
            }

        }
    }

    const handleBrandChange = (e: any) => {
        setSelectedBrandId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;

        if (!BikeData.title || BikeData.title.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }
        else if (invalidChars.test(BikeData.title)) {
            alert("Please remove special characters.");
            return;
        }
        else if (!BikeData.bikeUrl || BikeData.bikeUrl.length < 2) {
            alert("Please enter a valid unique URL");
            return;
        }
        else if (!BikeData.description || BikeData.description.length < 10) {
            alert("Please enter a proper description (min 10 characters)");
            return;
        }
        else if (!imageArr || imageArr.length === 0) {
            alert("Please upload at least one image");
            return;
        }
        else if (!selectedBrandId) {
            alert("Please select brand");
            return
        }
        else if (!BikeData.price || isNaN(Number(BikeData.price))) {
            alert("Please enter a valid numeric price");
            return;
        }
        else if (!BikeData.engine || BikeData.engine.length < 2) {
            alert("Please enter engine info");
            return;
        }
        else if (!BikeData.starting) {
            alert("Please enter starting info");
            return;
        }
        else if (!BikeData.dimention) {
            alert("Please enter dimension");
            return;
        }
        else if (!BikeData.dryWeight) {
            alert("Please enter dry weight");
            return;
        }
        else if (!BikeData.groundClearance) {
            alert("Please enter ground clearance");
            return;
        }
        else if (!BikeData.frame) {
            alert("Please enter frame info");
            return;
        }
        else if (!BikeData.batteryType) {
            alert("Please enter battery type");
            return;
        }
        else if (!BikeData.torque) {
            alert("Please enter Torque");
            return;
        }
        else if (!BikeData.chargingTime) {
            alert("Please enter charging time");
            return;
        }
        else if (!BikeData.wheelSize) {
            alert("Please enter wheel size");
            return;
        }
        else if (!BikeData.tyreBack) {
            alert("Please enter back tyre size");
            return;
        }
        else if (!BikeData.tyreFront) {
            alert("Please enter front tyre size");
            return;
        }
        else if (!BikeData.moter) {
            alert("Please enter moter size");
            return;
        }
        else if (!BikeData.topSpeed) {
            alert("Please enter top speed");
            return;
        }
        else if (!BikeData.range) {
            alert("Please enter range km");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;
        const finalBikeData = {
            ...BikeData,
            brandId: selectedBrandId,
            images: imageArr,
            uid: UserId || null
        };
        const res = await addNewBike(finalBikeData)
        if (res && res.success) {
            router.push('/ebike-panel/dashboard/all-electric-bikes')
        }
        else {
            alert('Something is Wrong!')
        }
        // console.log(res)
    }

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-electric-bikes')
    }

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Add Electric Bike</p>
                </div>

                <label htmlFor="title" className={styles.label}>Title</label>
                <input id="title" name="title" value={BikeData.title} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="bikeUrl" className={styles.label}>Unique URL</label>
                <input id="bikeUrl" name="bikeUrl" value={BikeData.bikeUrl} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="description" className={styles.label}>Description</label>
                <FloaraTextArea
                    value={BikeData.description}
                    onChange={(desc: any) => setBikeData((prev) => ({ ...prev, description: desc }))}
                />

                {selectedImages.length < 4 && (
                    <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                )}

                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {imageArr.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Preview ${index}`} style={{ width: '100%', height: "100%" }} />
                            <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                        </div>
                    ))}
                </div>

                <div className={styles.drop_downBox}>
                    <select name="" id="" className={styles.selected} onChange={handleBrandChange}>
                        <option value="" disabled selected hidden>Select Brand</option>
                        {
                            BrandArr.map((e: any, index) => (
                                <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.brandName}
                                </option>
                            ))
                        }
                    </select>

                    <div style={{ marginTop: '10px' }}>
                        <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                        <input id="videoUrl" name="videoUrl" value={BikeData.videoUrl} onChange={handleInputChange} className={styles.input_bike_url} />
                    </div>
                </div>

                <div className={styles.all_inputs}>
                    {[
                        { name: "price", label: "Price" },
                        { name: "engine", label: "Engine" },
                        // { name: "boreAndStroke", label: "Bore & Stroke" },
                        // { name: "clutch", label: "Clutch" },
                        { name: "starting", label: "Starting" },
                        { name: "dimention", label: "Dimension" },
                        { name: "dryWeight", label: "Dry Weight" },
                        { name: "groundClearance", label: "Ground Clearance" },
                        { name: "frame", label: "Frame" },
                        { name: "batteryType", label: "Battery Type" },
                        { name: "torque", label: "Torque" },
                        { name: "chargingTime", label: "Charging Time" },
                        { name: "wheelSize", label: "Wheel Size" },
                        { name: "tyreBack", label: "Tyre Back" },
                        { name: "tyreFront", label: "Tyre Front" },
                        { name: "moter", label: "Moter Size" },
                        { name: "topSpeed", label: "Top Speed" },
                        { name: "range", label: "Range" },
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

                <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                <textarea id="meta_title" name="meta_title" value={BikeData.meta_title} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={BikeData.meta_description} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={BikeData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="others" className={styles.label}>Others</label>
                <textarea id="others" name="others" value={BikeData.others} onChange={handleInputChange} className={styles.textarea} />

                <button type="submit" className={styles.button}>Add Bike</button>
            </form>
        </div>
    );
};

///////////////////////////////////////////////////////// ADD NEW BLOG
const AddBlogForm = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [selectedBlogId, setSelectedBlogId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageArr, setImageArr] = useState([])
    const [BlogData, setBlogData] = useState<any>({
        authorname: '',
        blogTitle: '',
        blogUrl: '',
        bloghtml: '',
        blogtext: '',
        focus_keyword: '',
        meta_description: '',
        meta_title: '',
    });

    let router = useRouter()

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBlogData((prev: any) => ({ ...prev, [name]: value }));
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
            }

        }
    }

    const handleBlogChange = (e: any) => {
        setSelectedBlogId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!BlogData.blogTitle || BlogData.blogTitle.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }
        else if (!BlogData.authorname || BlogData.authorname.length < 2) {
            alert("Please add a valid author name (min 2 characters)");
            return;
        }
        else if (!BlogData.bloghtml || BlogData.bloghtml.length < 10) {
            alert("Please enter a valid blog description (min 10 characters)");
            return;
        }
        else if (!imageArr || imageArr.length === 0) {
            alert("Please select at least one image!");
            return;
        }
        else if (!selectedBlogId) {
            alert("Please select a blog category");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;

        console.log("User ID:", UserId);

        const imagesString = imageArr.join(' #$# ');
        const finalBikeData = {
            blogCategoryId: Number(selectedBlogId),
            ...BlogData,
            uid: UserId || null,
            featuredImage: imagesString
        }

        const res = await addNewBlog(finalBikeData);
        if (res?.success && res.info === "add blog success") {
            router.push('/ebike-panel/dashboard/blog-list');
        } else {
            alert('Something went wrong!');
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/blog-list')
    }

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Add New Blog</p>
                </div>

                <label htmlFor="blogTitle" className={styles.label}>Title</label>
                <input id="blogTitle" name="blogTitle" value={BlogData.blogTitle} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="authorname" className={styles.label}>Author Name</label>
                <input id="authorname" name="authorname" value={BlogData.authorname} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="bloghtml" className={styles.label}>Description</label>
                <FloaraTextArea
                    value={BlogData.description}
                    onChange={(desc: any) => setBlogData((prev: any) => ({ ...prev, bloghtml: desc }))}
                />

                {imageArr.length < 4 ?
                    <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                    :""}

                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {imageArr.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Preview ${index}`} style={{ width: '100%', height: "100%" }} />
                            <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                        </div>
                    ))}
                </div>

                <div className={styles.drop_downBox}>
                    <select name="" id="" className={styles.selected} onChange={handleBlogChange}>
                        <option value="" disabled selected hidden>Select Category</option>
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

                <button type="submit" className={styles.button}>Add Blog</button>
            </form>
        </div>
    );
}

///////////////////////////////////////////////////////// ADD NEW PAGE
const AddPageForm = () => {
    const [selectedPage, setSelectedPage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [PageData, setPageData] = useState<any>({
        title: '',
        url: '',
        html: '',
        text: '',
        name: "",
        focus_keyword: '',
        meta_description: '',
        meta_title: '',
    });

    let router = useRouter()

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setPageData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (e: any) => {
        setSelectedPage(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!PageData.title || PageData.title.length < 2) {
            alert("Please add a valid title (min 2 characters)");
            return;
        }
        else if (!PageData.name || PageData.name.length < 2) {
            alert("Please add a valid author name (min 2 characters)");
            return;
        }
        else if (!PageData.html || PageData.html.length < 10) {
            alert("Please enter a valid Page description (min 10 characters)");
            return;
        }
        else if (!selectedPage) {
            alert("Please select a Page Position");
            return;
        }

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId = userData?.uid;

        console.log("User ID:", UserId);

        const finalBikeData = {
            displayPosition: selectedPage,
            ...PageData,
            uid: UserId || null,
            images: []
        }
        const res = await addNewPage(finalBikeData);
        if (res && res?.success) {
            router.push('/ebike-panel/dashboard/all-pages');
        } else {
            alert('Something went wrong!');
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-pages')
    }

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Add New Page</p>
                </div>

                <label htmlFor="title" className={styles.label}>Title</label>
                <input id="title" name="title" value={PageData.title} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="name" className={styles.label}>Page Name</label>
                <input id="name" name="name" value={PageData.name} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="html" className={styles.label}>Description</label>
                <FloaraTextArea
                    value={PageData.html}
                    onChange={(desc: any) => setPageData((prev: any) => ({ ...prev, html: desc }))}
                />

                <div className={styles.drop_downBox}>
                    <select name="" id="" className={styles.selected} onChange={handlePageChange}>
                        <option value="" disabled selected hidden>Choose Page Position to Display</option>
                        {
                            PageCategory.map((e: any, index) => (
                                <option key={index} value={e?.PositionName} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.PositionNameShow}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                <textarea id="meta_title" name="meta_title" value={PageData.meta_title} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={PageData.meta_description} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={PageData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />

                <button type="submit" className={styles.button}>Add Page</button>
            </form>
        </div>
    );
}

///////////////////////////////////////////////////////// ADD NEW product
const AddProductForm = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageArr, setImageArr] = useState([])
    const [imageFilesProduct, setImageFilesProduct] = useState<File[]>([]);
    const [imageArrProduct, setImageArrProduct] = useState([])
    const [selectedproductId, setSelectedproductId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [AllCategoryName, setAllCategoryName] = useState([]);
    const [SubCategoryName, setSubCategoryName] = useState([]);
    const [ProductCompany, setProductCompany] = useState([]);
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
    }, [])
    const fetchAllCategName = async () => {
        const rescategory = await getShopMainCategory();
        setAllCategoryName(rescategory)
        const rescompnay = await GetProductCompany();
        setProductCompany(rescompnay)
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

    const fetchSubCategName = async (id: any) => {
        const rescategory = await GetSubCategByMainCateg(id);
        setSubCategoryName(rescategory)
    }

    const handleproductChange = (e: any, from: any) => {
        const { name, value } = e.target;
        if (from == 'sell') {
            if(value == "true"){
                setAllFieldIds((prev: any) => ({ ...prev, sell: true }));
            }
            else{
                setAllFieldIds((prev: any) => ({ ...prev, sell: false }));
            }
        }
        else if (from == "main") {
            setAllFieldIds((prev: any) => ({ ...prev, main_category_id: value }));
            fetchSubCategName(e?.target?.value)
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
        else if (!AllFieldIDs?.sell) {
            alert("Please select a Product Status");
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
        // stock: [{
        //     quantity: finalBikeData?.quantity,
        //     product_size: finalBikeData?.product_size
        // }]
        console.log("from", obj)
        const res = await addNewProduct({
            product: obj,
            stock: [{
                quantity: finalBikeData?.quantity || "0",
                product_size: finalBikeData?.product_size
            }]
        });
        if (res && res?.success) {
            router.push('/ebike-panel/dashboard/product-list');
        } else {
            alert('Something went wrong!');
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/product-list')
    }

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Add New Product</p>
                </div>

                <label htmlFor="product_name" className={styles.label}>Product Name</label>
                <input id="product_name" name="product_name" value={productData.product_name} onChange={handleInputChange} className={styles.input} />

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
                    <select name="sell" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'sell')}>
                        <option value="" disabled selected hidden>Sell</option>
                        <option value="true" className={styles.options} style={{ fontSize: '16px' }}>
                            True
                        </option>
                        <option value="false" className={styles.options} style={{ fontSize: '16px' }} >
                            False
                        </option>
                    </select>
                </div>


                {/* ///////////////////////////////////////////////////////////// MAIN CATEGORY DROP DOWN */}
                <label className={styles.label}>Main Category</label>
                <div className={styles.drop_downBox}>
                    <select name="main_category_id" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'main')}>
                        <option value="" disabled selected hidden>Select Category</option>
                        {
                            AllCategoryName.map((e: any, index) => (
                                <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>


                {/* ///////////////////////////////////////////////////////////// SUB CATEGORY DROP DOWN */}
                <label className={styles.label}>{SubCategoryName.length > 0 ? "Sub Category" : ""}</label>
                {
                    SubCategoryName.length > 0 ?
                        <div className={styles.drop_downBox}>
                            <select name="sub_category_id" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'sub')}>
                                <option value="" disabled selected hidden>Select Category</option>
                                {
                                    SubCategoryName.map((e: any, index) => (
                                        <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                            {e?.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div> : ""
                }

                <label className={styles.label}>Product Company</label>
                <div className={styles.drop_downBox}>
                    <select name="company_id" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'company')}>
                        <option value="" disabled selected hidden>Select Company</option>
                        {
                            ProductCompany.map((e: any, index) => (
                                <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
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
                            <img src={img} alt={`Preview ${index}`} style={{ width: '100%', height: "100%" }} />
                            <button type="button" onClick={() => handleImageDelete(index, 'product')}>×</button>
                        </div>
                    ))}
                </div>

                <label htmlFor="qunatity" className={styles.label}>Quantity</label>
                <input id="quantity" name="quantity" value={productData.quantity} onChange={handleInputChange} className={styles.input} />

                <label className={styles.label}>Product Size</label>
                <div className={styles.drop_downBox}>
                    <select name="product_size" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'size')}>
                        <option value="" disabled selected hidden>Select Size</option>
                        {
                            product_size.map((e: any, index) => (
                                <option key={index} value={e} className={styles.options} style={{ fontSize: '16px' }}>
                                    {e}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit" className={styles.button}>Add Product</button>
            </form>
        </div>
    );
}

///////////////////////////////////////////////////////// ADD NEW BRAND
const AddBrandForm = () => {
    const [BrandData, setBrandData] = useState<any>({
        brandName: '',
        description: '',
        videourl: '',
        logoUrl: '',
        focus_keyword: '',
        meta_description: '',
        meta_title: '',
    });

    let router = useRouter()

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBrandData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!BrandData.brandName || BrandData.brandName.length < 2) {
            alert("Please add a valid Name (min 2 characters)");
            return;
        }
        else if (!BrandData.description || BrandData.description.length < 10) {
            alert("Please enter a valid Brand description (min 10 characters)");
            return;
        }
        else if (!BrandData.logoUrl ) {
            alert("Please enter a valid Logo URL");
            return;
        }

        const finalBikeData = {
            ...BrandData,
        }

        const res = await addNewBrand(finalBikeData);
        if (res && res?.success && res.info === "Added Successfully!") {
            router.push('/ebike-panel/dashboard/all-bike-brands');
        } else {
            alert('Something went wrong!');
        }
    };

    const goBack = () => {
        router.push('/ebike-panel/dashboard/all-bike-brands')
    }

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.formHeader}>
                    <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
                    <p className={styles.heading}>Add New Brand</p>
                </div>

                <label htmlFor="brandName" className={styles.label}>Name:</label>
                <input id="brandName" name="brandName" value={BrandData.brandName} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="description" className={styles.label}>Description:</label>
                <textarea id="description" name="description" value={BrandData.description} onChange={handleInputChange} className={styles.textarea} />

                <label htmlFor="videourl" className={styles.label}>Video URL:</label>
                <input id="videourl" name="videourl" value={BrandData.videourl} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="logoUrl" className={styles.label}>Logo URL:</label>
                <input id="logoUrl" name="logoUrl" value={BrandData.logoUrl} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                <textarea id="meta_title" name="meta_title" value={BrandData.meta_title} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={BrandData.meta_description} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={BrandData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />

                <button type="submit" className={styles.button}>Add Brand</button>
            </form>
        </div>
    );
}



export {
    AddNewBikeForm,
    AddBlogForm,
    AddNewElectricBikeForm,
    AddPageForm,
    AddProductForm,
    AddBrandForm
};