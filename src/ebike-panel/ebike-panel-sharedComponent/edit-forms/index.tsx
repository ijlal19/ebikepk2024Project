'use client';
import { getnewBikedetailsData, getSingleblogDetail, UpdateBlogById, UpdateNewBikeById , getSinglebikesDetail, UpdateUsedBikeById} from '@/ebike-panel/ebike-panel-Function/globalfunction';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import FloaraTextarea from '../floaraEditiorTextarea';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './index.module.scss';
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

const EditUsedBikeForm = () => {

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [bikeData, setBikeData] = useState({
        title: '',
        description: '',
        price: '',
        videoUrl: '',
        sellerName: '',
        sellerMobile: '',
        images: [] as string[],
    });
    const { slug, slug1 } = useParams();
    const id = slug1

    useEffect(() => {
        if (id) fetchUsedBiukeById(id);
    }, [id]);

    const fetchUsedBiukeById = async (id: any) => {
        const getData = await getSinglebikesDetail(id);
        const bike = getData?.add;

        setBikeData(bike);
        setSelectedImages(bike?.images || []);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setBikeData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: any) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files).slice(0, 4 - selectedImages.length);
        const fileUrls = filesArray.map((file:any) => URL.createObjectURL(file));

        setSelectedImages(prev => [...prev, ...fileUrls]);
        setImageFiles((prev:any) => [...prev, ...filesArray]);
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

const EditNewBikeForm = () => {

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [BikeData, setBikeData] = useState<any>([]);
    const { slug, slug1 } = useParams()

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
            setSelectedImages((prev:any) => [...prev, ...newImageURLs].slice(0, 4));
        }
    };

    const handleImageDelete = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

         const userCookie = jsCookie.get("userData_ebike_panel");
        const userData = JSON.parse(userCookie);
        const UserId  = userData?.uid;
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
        // const res = await UpdateNewBikeById(slug1, obj);
        // console.log("✅ Response from API:", res);
    };

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
                            BrandArr.map((e: any, index:any) => (
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
    
      useEffect(() => {
        fetchBlogByID(slug1)
    }, [])

    const fetchBlogByID = async (id: any) => {
        const res = await getSingleblogDetail(id)
        console.log(res)
        if (res ) {
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
        const UserId  = userData?.uid;

            const finalBlogData = {
                blogCate1goryId: Number(CategoryId),
                ...BlogData,
                uid: UserId || null
            };
            const obj = {
                authorname:finalBlogData?.authorname,
                BlogCategoryId:  Number(CategoryId),
                blogTitle : finalBlogData?.blogTitle,
                blogUrl : finalBlogData?.blogUrl,
                bloghtml : finalBlogData?.bloghtml,
                blogtext :finalBlogData?.blogtext,
                featuredImage :finalBlogData?.featuredImage,
                focus_keyword:finalBlogData?.focus_keyword,
                meta_description:finalBlogData?.meta_description,
                meta_title:finalBlogData?.meta_title,
                uid:UserId
            }
            console.log( obj)
            // const res = await  UpdateBlogById(slug1 , obj)
            // console.log(res)
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