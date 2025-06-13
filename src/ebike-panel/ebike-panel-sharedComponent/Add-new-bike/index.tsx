'use client';
import React, { useState } from 'react';
import styles from './index.module.scss';

const AddNewBikeForm = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const [BikeData, setBikeData] = useState({
        title: '',
        uniqueUrl: '',
        bikeUrl: '',
        description: '',
        price: '',
        engine: '',
        boreAndStroke: '',
        clutch: '',
        starting: '',
        dimention: '',
        petrolCapacity: '',
        displacement: '',
        compressionRatio: '',
        transmission: '',
        frame: '',
        groundClearance: '',
        tyreBack: '',
        tyreFront: '',
        dryWeight: '',
        meta_title: '',
        meta_description: '',
        focus_keyword: '',
        others: '',
        images: [] as File[]
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBikeData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files).slice(0, 4 - selectedImages.length);
        const fileUrls = filesArray.map((file: any) => URL.createObjectURL(file));

        setSelectedImages(prev => [...prev, ...fileUrls]);
        setImageFiles((prev:any) => [...prev, ...filesArray]);

        setBikeData((prev:any) => ({
            ...prev,
            images: [...prev.images, ...filesArray]
        }));
    };

    const handleImageDelete = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setImageFiles(updatedFiles);
        setBikeData(prev => ({
            ...prev,
            images: updatedFiles
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(BikeData); // Log final data including images as File[]
    };

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <h2 className={styles.heading}>Add New Bike</h2>

                <label htmlFor="title" className={styles.label}>Title</label>
                <input id="title" name="title" value={BikeData.title} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="uniqueUrl" className={styles.label}>Unique URL</label>
                <input id="uniqueUrl" name="uniqueUrl" value={BikeData.uniqueUrl} onChange={handleInputChange} className={styles.input} />

                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea id="description" name="description" value={BikeData.description} onChange={handleInputChange} className={styles.textarea} />

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

                <label htmlFor="bikeUrl" className={styles.label}>Bike URL</label>
                <input id="bikeUrl" name="bikeUrl" value={BikeData.bikeUrl} onChange={handleInputChange} className={styles.input} />

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

                <button type="submit" className={styles.button}>Submit Bike</button>
            </form>
        </div>
    );
};

export default AddNewBikeForm;




// 'use client'
// import React, { useEffect, useState } from 'react';
// import styles from './index.module.scss';
// import { useParams } from 'next/navigation';
// import { getnewBikedetailsData } from '@/ebikeWeb/functions/globalFuntions';
// import { UpdateNewBikeById } from '@/ebike-panel/ebike-panel-Function/globalfunction';


// const AddNewBikeForm = () => {

//     return (
//         <div className={styles.main_box}>
//             <form onSubmit={handleSubmit} className={styles.main}>
//                 <h2 className={styles.heading}>Edit New Bike</h2>

//                 {/* Title */}
//                 <label htmlFor="title" className={styles.label}>Title</label>
//                 <input id="title" name="title" value={BikeData.title} onChange={handleInputChange} className={styles.input} />

//                 {/* Video URL */}
//                 <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
//                 <input id="videoUrl" name="videoUrl" value={BikeData.bikeUrl} onChange={handleInputChange} className={styles.input} />

//                 {/* Description */}
//                 <label htmlFor="description" className={styles.label}>Description</label>
//                 <textarea id="description" name="description" value={BikeData.description} onChange={handleInputChange} className={styles.textarea} />

//                 {selectedImages.length < 4 && (
//                     <input type="file" accept="image/*" multiple onChange={handleImageChange} className={styles.fileInput} />
//                 )}
//                 {/* Images */}
//                 <label className={styles.label}>Images (max 4)</label>
//                 <div className={styles.imagePreview}>
//                     {selectedImages.map((img, index) => (
//                         <div key={index}>
//                             <img src={img} alt={`Preview ${index}`} />
//                             <button type="button" onClick={() => handleImageDelete(index)}>×</button>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Other fields */}
//                 <div className={styles.all_inputs}>
//                     {[
//                         { name: "price", label: "Price" },
//                         { name: "engine", label: "Engine" },
//                         { name: "boreAndStroke", label: "Bore & Stroke" },
//                         { name: "clutch", label: "Clutch" },
//                         { name: "starting", label: "Starting" },
//                         { name: "dimention", label: "Dimension" },
//                         { name: "petrolCapacity", label: "Petrol Capacity" },
//                         { name: "displacement", label: "Displacement" },
//                         { name: "compressionRatio", label: "Compression Ratio" },
//                         { name: "transmission", label: "Transmission" },
//                         { name: "frame", label: "Frame" },
//                         { name: "groundClearance", label: "Ground Clearance" },
//                         { name: "tyreBack", label: "Tyre Back" },
//                         { name: "tyreFront", label: "Tyre Front" },
//                         { name: "dryWeight", label: "Dry Weight" }
//                     ].map(({ name, label }) => (
//                         <div key={name}>
//                             <label htmlFor={name} className={styles.label}>{label}</label>
//                             <input
//                                 id={name}
//                                 name={name}
//                                 value={(BikeData as any)[name]}
//                                 onChange={handleInputChange}
//                                 className={styles.input_}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Others textarea */}
//                 <label htmlFor="others" className={styles.label}>Meta Title</label>
//                 <textarea id="others" name="others" value={BikeData.meta_title} onChange={handleInputChange} className={styles.textarea} />
//                 <label htmlFor="others" className={styles.label}>Meta Description</label>
//                 <textarea id="others" name="others" value={BikeData.meta_description} onChange={handleInputChange} className={styles.textarea} />
//                 <label htmlFor="others" className={styles.label}>Focus Keyword</label>
//                 <textarea id="others" name="others" value={BikeData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />
//                 <label htmlFor="others" className={styles.label}>Others</label>
//                 <textarea id="others" name="others" value={BikeData.others} onChange={handleInputChange} className={styles.textarea} />

//                 {/* Submit */}
//                 <button type="submit" className={styles.button}>Save Edit</button>
//             </form>
//         </div>
//     );
// };

// export default AddNewBikeForm;