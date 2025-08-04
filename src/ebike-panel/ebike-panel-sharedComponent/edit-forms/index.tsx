'use client';
import { getnewBikedetailsData, getSingleblogDetail, UpdateBlogById, UpdateNewBikeById, getSinglebikesDetail, UpdateUsedBikeById, uplaodImageFunc } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BrandArr } from '@/ebikeWeb/constants/globalData';
import { numericOnly } from '@/genericFunctions/geneFunc';
import { useParams, useRouter } from 'next/navigation';
import FloaraTextarea from '../floaraEditiorTextarea';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Loader from '../loader/loader';
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

        console.log("data", obj);
        const res = await UpdateUsedBikeById(id, obj)
        if (res && res.info == 'Bike has been updated') {
            router.push('/ebike-panel/dashboard/view-classified-ads')
        }
        else {
        
            // alert('Something is Wrong!')
        }
    };

    return (
        <div className={styles.main_box}>
            {
                !isLoading ?
                    < form onSubmit={handleSubmit} className={styles.main}>
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

        console.log("data", obj, finalData);

        const res = await UpdateNewBikeById(slug1, finalData);
        if (res && res.success && res.info == "Bike updated") {
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
            brandId: brandId
        }));
    };

    const GetBrandName = (id: any) => {
        const GetbrandObject = BrandArr.find((item: any) => item.id === id)
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
                            onChange={(e: any) => handleChange('newdescription', e.target.value)}
                        />

                        {imageArr.length < 4 && (
                            <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
                        )}

                        {/* Images */}
                        <label className={styles.label}>Images (max 4)</label>
                        <div className={styles.imagePreview}>
                            {imageArr?.map((img, index) => (
                                <div key={index}>
                                    <img src={img} alt={`Preview ${index}`} style={{ width: "100%", height: "100%" }} />
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
        console.log(res)
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
                const GetImage = res.featuredImage.split(' #$# ').trim()
                console.log("Image", GetImage)
            }
            else {
                console.log(`${[res.featuredImage]}`)
                setImageArr([res.featuredImage])
            }
        }
    }
    console.log(imageArr)

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
                            <img src={img} alt={`Preview ${index}`} style={{ width: "100%", height: "100%" }} />
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

export {
    EditUsedBikeForm,
    EditNewBikeForm,
    EditBlogForm
};