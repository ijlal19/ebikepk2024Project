'use client';
import { addNewBike, addNewBlog, uplaodImageFunc } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import FloaraTextArea from '../floaraEditiorTextarea';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import React, { useState } from 'react';

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
                    <p className={styles.heading}>ADD New Bike</p>
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
                    <p className={styles.heading}>ADD New Blog</p>
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

export {
    AddNewBikeForm,
    AddBlogForm,
    AddNewElectricBikeForm
};