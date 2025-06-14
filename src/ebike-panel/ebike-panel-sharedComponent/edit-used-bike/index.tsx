'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getSinglebikesDetail, UpdateUsedBikeById } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import { useParams } from 'next/navigation';

const EditUsedBikeForm = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const { slug, slug1 } = useParams()
    const id = slug1
    const [bikeData, setBikeData] = useState({
        title: '',
        description: '',
        price: '',
        videoUrl: '',
        sellerName: '',
        sellerMobile: '',
        images: [] as string[],
    });

    useEffect(() => {
        if (id) fetchUsedBiukeById(id);
    }, [id]);

    const fetchUsedBiukeById = async (id: any) => {
        const getData = await getSinglebikesDetail(id);
        const bike = getData?.add;

        setBikeData(bike);
        setSelectedImages(bike?.images || []);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBikeData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files).slice(0, 4 - selectedImages.length);
        const fileUrls = filesArray.map(file => URL.createObjectURL(file));

        setSelectedImages(prev => [...prev, ...fileUrls]);
        setImageFiles(prev => [...prev, ...filesArray]);
        setBikeData(prev => ({ ...prev, images: [...prev.images, ...fileUrls] }));
    };

    const handleImageDelete = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setImageFiles(updatedFiles);
        setBikeData(prev => ({ ...prev, images: updatedImages }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const {
            id,
            createdAt,
            isApproved,
            isFeatured,
            is_sold,
            updatedAt,
            ...cleanedData
        } = bikeData as any;

        console.table(cleanedData);
        // const Update = await UpdateUsedBikeById(cleanedData)
        // console.log('data' , Update)
    };

    return (
        <div className={styles.main_box}>
            <form onSubmit={handleSubmit} className={styles.main}>
                <h2 className={styles.heading}>Edit Used Bike</h2>

                <label htmlFor="title" className={styles.label}>Title</label>
                <input id="title" name="title" value={bikeData.title} onChange={handleInputChange} className={styles.input} />

                {selectedImages.length < 4 && (
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className={styles.fileInput} />
                )}

                <label className={styles.label}>Images (max 4)</label>
                <div className={styles.imagePreview}>
                    {selectedImages.map((img, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <img src={img} alt={`Preview ${index}`} />
                            <button type="button" onClick={() => handleImageDelete(index)}>×</button>
                        </div>
                    ))}
                </div>
                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea id="description" name="description" value={bikeData.description} onChange={handleInputChange} className={styles.textarea} />
                <div className={styles.inputs_group}>
                    <div>
                        <label htmlFor="price" className={styles.label}>Price (PKR)</label>
                        <input id="price" name="price" value={bikeData.price} onChange={handleInputChange} className={styles.input_} />
                    </div>
                    <div>
                        <label htmlFor="videoUrl" className={styles.label}>Video URL</label>
                        <input id="videoUrl" name="videoUrl" value={bikeData.videoUrl} onChange={handleInputChange} className={styles.input_} />
                    </div>
                    <div>
                        <label htmlFor="sellerName" className={styles.label}>Seller Name</label>
                        <input id="sellerName" name="sellerName" value={bikeData.sellerName} onChange={handleInputChange} className={styles.input_} />
                    </div>
                    <div>
                        <label htmlFor="sellerMobile" className={styles.label}>Seller Mobile</label>
                        <input id="sellerMobile" name="sellerMobile" value={bikeData.sellerMobile} onChange={handleInputChange} className={styles.input_} />
                    </div>
                </div>


                <button type="submit" className={styles.button}>Update Bike</button>
            </form>
        </div>
    );
};

export default EditUsedBikeForm;
