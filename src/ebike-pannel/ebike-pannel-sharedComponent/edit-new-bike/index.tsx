'use client'
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useParams } from 'next/navigation';
import { getnewBikedetailsData } from '@/ebikeWeb/functions/globalFuntions';
import { UpdateNewBikeById } from '@/ebike-pannel/ebike-panel-Function/globalfunction';


const EditBikeForm = () => {

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [BikeData, setBikeData] = useState<any>([]);

    const { slug, slug1 } = useParams()

    useEffect(() => {
        fetchNewBikeByID(slug1)
    }, [])
    const fetchNewBikeByID = async (id: any) => {
        const res = await getnewBikedetailsData(id)
        if(res && res[0]?.bike){
            setBikeData(res[0]?.bike)
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
            setSelectedImages(prev => [...prev, ...newImageURLs].slice(0, 4));
        }
    };

    const handleImageDelete = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = {
            ...BikeData,
            images: selectedImages,
        };
        if (formData) {
            const res = await UpdateNewBikeById(slug1, formData)
            console.log('data', formData, res);
        }
    };


    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <h2 className={styles.heading}>Edit New Bike</h2>

                {/* Title */}
                <label htmlFor="title" className={styles.label}>Title</label>
                <input id="title" name="title" value={BikeData.title} onChange={handleInputChange} className={styles.input} />

                {/* Video URL */}
                <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                <input id="videoUrl" name="videoUrl" value={BikeData.bikeUrl} onChange={handleInputChange} className={styles.input} />

                {/* Description */}
                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea id="description" name="description" value={BikeData.description} onChange={handleInputChange} className={styles.textarea} />

                {selectedImages.length < 4 && (
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className={styles.fileInput} />
                )}
                {/* Images */}
                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {selectedImages.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Preview ${index}`} />
                            <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                        </div>
                    ))}
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
                <label htmlFor="others" className={styles.label}>Meta Title</label>
                <textarea id="others" name="others" value={BikeData.meta_title} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="others" className={styles.label}>Meta Description</label>
                <textarea id="others" name="others" value={BikeData.meta_description} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="others" className={styles.label}>Focus Keyword</label>
                <textarea id="others" name="others" value={BikeData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />
                <label htmlFor="others" className={styles.label}>Others</label>
                <textarea id="others" name="others" value={BikeData.others} onChange={handleInputChange} className={styles.textarea} />

                {/* Submit */}
                <button type="submit" className={styles.button}>Save Edit</button>
            </form>
        </div>
    );
};

export default EditBikeForm;