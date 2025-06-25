'use client';
import { addNewBike, addNewBlog } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import FloaraTextArea from '../floaraEditiorTextarea';
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

const AddNewBikeForm = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
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
        images: [] as string[],
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

    const handleImageChange = (e: any) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files).slice(0, 4 - selectedImages.length);
        const fileUrls = filesArray.map((file: any) => URL.createObjectURL(file));

        setSelectedImages((prev: any) => [...prev, ...fileUrls]);
        setImageFiles((prev: any) => [...prev, ...filesArray]);

        setBikeData((prev: any) => ({
            ...prev,
            images: [...prev.images, ...fileUrls]
        }));
    };

    const handleImageDelete = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedFiles = imageFiles.filter((_, i) => i !== index);

        setSelectedImages(updatedImages);
        setImageFiles(updatedFiles);

        setBikeData(prev => ({
            ...prev,
            images: updatedImages
        }));
    };

    const handleBrandChange = (e: any) => {
        setSelectedBrandId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId  = userData?.uid;
        console.log(UserId)

        if(!selectedBrandId){
            alert('Select Brand')
        }
        else{
            const finalBikeData = {
                ...BikeData,
                brandId: selectedBrandId,
                uid: UserId || null
            };
            console.table(finalBikeData)
            // const res = await addNewBike(finalBikeData)
            // console.log(res)
        }
    };

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <h2 className={styles.heading}>Add New Bike</h2>

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
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className={styles.fileInput} />
                )}

                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {selectedImages.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Preview ${index}`} />
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

                    <div style={{marginTop:'10px'}}>
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

const AddBlogForm = () => {
    const [selectedBlogId, setSelectedBlogId] = useState();
    const [BlogData, setBlogData] = useState<any>({
        authorname: '',
        blogTitle: '',
        blogUrl: '',
        bloghtml: '',
        blogtext: '',
        featuredImage: '',
        focus_keyword: '',
        meta_description: '',
        meta_title: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBlogData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageURL = URL.createObjectURL(file);
        console.log("Image URL:", imageURL);

        setBlogData((prev: any) => ({
            ...prev,
            featuredImage: imageURL,
        }));
    };

    const handleBlogChange = (e: any) => {
        setSelectedBlogId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId  = userData?.uid;
        console.log(UserId)

        if(!selectedBlogId){
            alert('Select Blog Category')
        }
        else{
            const finalBikeData = {
                blogCategoryId: Number(selectedBlogId),
                ...BlogData,
                uid: UserId || null
            };
            console.log(finalBikeData)
            // const res = await addNewBlog(finalBikeData)
            // console.log(res)
        }
    };

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <h2 className={styles.heading}>Add New Blog</h2>

                <label htmlFor="blogTitle" className={styles.label}>Title</label>
                <input id="blogTitle" name="blogTitle" value={BlogData.blogTitle} required onChange={handleInputChange} className={styles.input} />

                <label htmlFor="authorname" className={styles.label}>Author Name</label>
                <input id="authorname" name="authorname" value={BlogData.authorname} required onChange={handleInputChange} className={styles.input} />

                <label htmlFor="bloghtml" className={styles.label}>Description</label>
                <FloaraTextArea
                    value={BlogData.description}
                    onChange={(desc: any) => setBlogData((prev: any) => ({ ...prev, bloghtml: desc }))}
                />

                <input
                    type="file"
                    className={styles.fileInput}
                    accept="image/*"
                    onChange={handleImageChange}
                    required
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
    AddBlogForm
};