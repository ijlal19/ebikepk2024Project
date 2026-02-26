import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from './index.module.scss';
const jsCookie = require('js-cookie');
import { useState } from "react";
import { addNewBrandCompany, AddNewCouponCode, AddNewForumComment, AddNewForumMainCategory, AddNewForumSubCategory, AddNewForumThread, AddNewSetting, GetUserDetail, UpdateBrandById, UpdateBrandCompany, UpdateMainForumCategoryById, UpdateSettingByID, UpdateSubForumCategoryById, UpdateThreadById, UpdateThreadCommentById, UpdateVideoByID } from "@/ebike-panel/ebike-panel-Function/globalfunction";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    // boxShadow: 24,
    // p: 4,
};


let VideoCategoryArr = [
    { id: 1, name: 'News' },
    { id: 2, name: 'BikeCare' },
    { id: 3, name: 'Safety' },
];

const BasicModal = ({ open, onClose, brand, funct }: any) => {

    const [NewBrandName, setNewBrandName] = useState('');
    const [NewVideoUrl, setNewVideoUrl] = useState('');
    const [NewMetaTitle, setNewMetaTitle] = useState('');
    const [NewDescription, setNewDescription] = useState('');
    const [NewMetaDescription, setNewMetaDescription] = useState('');
    const [NewFocusKeyword, setNewFocusKeyword] = useState('');
    const [NewLogoUrl, setNewLogoUrl] = useState('');

    React.useEffect(() => {
        if (brand) {
            setNewBrandName(brand?.brandName || "");
            setNewVideoUrl(brand?.vediourl || "");
            setNewMetaTitle(brand?.meta_title || "");
            setNewDescription(brand?.description || "");
            setNewMetaDescription(brand?.meta_description || "");
            setNewFocusKeyword(brand?.focus_keyword || "");
            setNewLogoUrl(brand?.logoUrl || "");
        }
    }, [brand]);

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
        else if (!NewLogoUrl) {
            alert("Please enter a Logo Url");
            return;
        }
        else if (!NewDescription) {
            alert("Please enter a Description");
            return;
        }

        const obj = {
            brandName: NewBrandName,
            logoUrl: NewLogoUrl,
            focus_keyword: NewFocusKeyword,
            meta_description: NewMetaDescription,
            meta_title: NewMetaTitle,
            vediourl: NewVideoUrl,
            description: NewDescription,
        }
        const res = await UpdateBrandById(brand?.id, obj)
        if (res) {
            alert("Brand updated successfully!");
            onClose();          // modal close
            funct(1);
        }
        else {
            alert('Something is Wrong!')
            onClose()
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            className={styles.modal}
        >
            <form onSubmit={handleSubmit} className={styles.main}>

                <label htmlFor="brandname" className={styles.label}>Brand Name</label>
                <input id="brandname" name="brandname" value={NewBrandName} onChange={(e) => setNewBrandName(e.target.value)} className={styles.input} />
                <label htmlFor="description" className={styles.label}>Description</label>
                {/* <input id="description" name="descrption" value={NewDescription} onChange={(e) => setNewDescription(e.target.value)} className={styles.input} /> */}
                <textarea id="description" name="descrption" value={NewDescription} onChange={(e) => setNewDescription(e.target.value)} className={styles.textarea1} />


                <label htmlFor="logourl" className={styles.label}>Logo Url</label>
                <input id="logourl" name="logourl" value={NewLogoUrl} onChange={(e) => setNewLogoUrl(e.target.value)} className={styles.input} />

                <label htmlFor="videourl" className={styles.label}>Video Url</label>
                <input id="videourl" name="videourl" value={NewVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} className={styles.input} />

                <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
                <textarea id="meta_title" name="meta_title" value={NewMetaTitle} onChange={(e) => setNewMetaTitle(e.target.value)} className={styles.textarea} />
                <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
                <textarea id="meta_description" name="meta_description" value={NewMetaDescription} onChange={(e) => setNewMetaDescription(e.target.value)} className={styles.textarea} />
                <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
                <textarea id="focus_keyword" name="focus_keyword" value={NewFocusKeyword} onChange={(e) => setNewFocusKeyword(e.target.value)} className={styles.textarea} />

                <button type="submit" className={styles.button}>Save Edit</button>
            </form>
        </Modal>
    );
}

const ShopBrandPopup = ({ open, onClose, brand, funct }: any) => {
    const [Name, setName] = useState('');
    const [LogoUrl, setLogoUrl] = useState('');
    React.useEffect(() => {
        if (brand) {
            setName(brand?.name || "")
            setLogoUrl(brand?.logoUrl || "")
        }
    }, [brand])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;
        if (invalidChars.test(Name)) {
            alert("Please remove special characters.");
            return;
        }
        if (!Name || Name.length < 2) {
            alert("Please add a valid Brand Name (min 3 characters)");
            return;
        }
        else if (!LogoUrl) {
            alert("Please enter a Logo Url");
            return;
        }
        const obj = {
            name: Name,
            logoUrl: LogoUrl,
        }
        const res = await UpdateBrandCompany(brand?.id, obj)
        if (res && res?.info == "brand is updated successfully") {
            alert("Brand updated successfully!");
            onClose();
            funct(1);
        }
        else {
            alert('Something is Wrong!')
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            // className={styles.modal}
            // style={style}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit} className={styles.main_shop} >
                    <label htmlFor="name" className={styles.label} >Brand Name:</label>
                    <input type="text" id="name" value={Name} className={styles.input} onChange={(e: any) => setName(e?.target.value)} />

                    <label htmlFor="logo" className={styles.label} >Logo URL:</label>
                    <input type="text" id="logo" value={LogoUrl} className={styles.input} onChange={(e: any) => setLogoUrl(e?.target.value)} />

                    <button type="submit" className={styles.btn} >Save Edit</button>
                </form>
            </Box>
        </Modal>
    )
}

const AddShopBrandPopup = ({ open, onClose, funct }: any) => {
    const [Name, setName] = useState('');
    const [LogoUrl, setLogoUrl] = useState('');
    // React.useEffect(() => {
    //     if (brand) {
    //         setName(brand?.name || "")
    //         setLogoUrl(brand?.logoUrl || "")
    //     }
    // }, [brand])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const invalidChars = /[\/,?#$!+]/;
        if (invalidChars.test(Name)) {
            alert("Please remove special characters.");
            return;
        }
        if (!Name || Name.length < 2) {
            alert("Please add a valid Brand Name (min 3 characters)");
            return;
        }
        else if (!LogoUrl) {
            alert("Please enter a Logo Url");
            return;
        }
        const obj = {
            name: Name,
            logoUrl: LogoUrl,
        }
        const res = await addNewBrandCompany(obj)
        if (res && res?.info == "Add Company Successfully") {
            alert("Brand Add successfully!");
            onClose();
            funct(1);
        }
        else {
            alert('Something is Wrong!')
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit} className={styles.main_shop} >
                    <label htmlFor="name" className={styles.label} >Brand Name:</label>
                    <input type="text" id="name" placeholder="Brand Name" className={styles.input} onChange={(e: any) => setName(e?.target.value)} />

                    <label htmlFor="logo" className={styles.label} >Logo URL:</label>
                    <input type="text" id="logo" placeholder="Logo URL" className={styles.input} onChange={(e: any) => setLogoUrl(e?.target.value)} />

                    <button type="submit" className={styles.btn} >Add Brand</button>
                </form>
            </Box>
        </Modal>
    )
}

const AddCOuponCode = ({ open, onClose, funct }: any) => {
    const [offerName, setOfferName] = useState('')
    const [Code, setCode] = useState('')
    const [Percentage, setPercentage] = useState('')
    const [ValidAmount, setValidAmount] = useState('')

    const handleAddCode = async (e: any) => {
        e.preventDefault()
        const obj = {
            code: Code,
            name: offerName,
            percentage: Percentage,
            valid_for_amount_above: ValidAmount
        }
        const res = await AddNewCouponCode(obj)
        if (res && res?.success) {
            alert("Coupon Code Successfully Add")
            onClose();
            funct()
        }
        else {
            alert("Something went wrong")
            onClose()
        }
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleAddCode} className={styles.form}  >
                    <input type="text" className={styles.input} placeholder="Offer Name" onChange={(e: any) => setOfferName(e?.target.value)} value={offerName} required />
                    <input type="text" className={styles.input} placeholder="Coupon Code i.e asd254" required value={Code} onChange={(e: any) => setCode(e?.target.value)} />
                    <input type="number" className={styles.input} placeholder="Percentage without % sign i.e 25" required value={Percentage} onChange={(e: any) => setPercentage(e?.target.value)} />
                    <input type="number" className={styles.input} placeholder="Code will be valid below this amount i.e 4000" required value={ValidAmount} onChange={(e: any) => setValidAmount(e?.target.value)} />
                    <button type="submit" className={styles.btn} >ADD CODE</button>
                </form>
            </Box>
        </Modal>
    )
}

const AddForumMainCategory = ({ open, onClose, funct }: any) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [username, setUserName] = useState('')
    const [uid, setUid] = useState('')
    React.useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const res = await GetUserDetail()
        setUserName(res?.name)
        setUid(res?.uid)
    }

    const handleAddCode = async (e: any) => {
        e.preventDefault()
        const obj = {
            name: name,
            description: description,
            image: "",
            user_name: username,
            isShow: true
        }
        const res = await AddNewForumMainCategory(obj)
        if (res && res?.success) {
            alert("Category Successfully Add")
            setDescription('')
            setName("")
            onClose()
            funct()
        }
        else {
            alert("something is wrong try again")
            onClose()
        }
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleAddCode} className={styles.form}  >
                    <input type="text" className={styles.input} placeholder="Category Name" onChange={(e: any) => setName(e?.target.value)} value={name} required />
                    {/* <input type="text" className={styles.input} placeholder="Description" required value={description} onChange={(e: any) => setDescription(e?.target.value)} /> */}
                    <textarea id="Description" name="Description" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <button type="submit" className={styles.btn} >Add Category</button>
                </form>
            </Box>
        </Modal>
    )
}

const AddForumSubCategory = ({ open, onClose, funct, data }: any) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [username, setUserName] = useState('')
    const [uid, setUid] = useState('')
    const [AllFieldIDs, setAllFieldIds] = useState<any>(data[0]?.id)
    React.useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const res = await GetUserDetail()
        setUserName(res?.name)
        setUid(res?.uid)
    }

    const handleAddCode = async (e: any) => {
        e.preventDefault()
        if (!data || data.length === 0) {
            alert("Please add main category first")
            return;
        }
        const obj = {
            name: name,
            description: description,
            image: "",
            user_name: username,
            uid: uid,
            isShow: true,
            main_categ_id: AllFieldIDs || data[0]?.id
        }
        const res = await AddNewForumSubCategory(obj)
        if (res && res?.success && res?.msg == "Created Successfully") {
            alert("Category Successfully Add")
            setDescription('')
            setName("")
            onClose()
            funct()
        }
        else {
            alert("something is wrong try again")
            onClose()
        }
    }

    const handleproductChange = (e: any, from: any) => {
        const { name, value } = e.target;
        if (from == "company") {
            setAllFieldIds(value);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleAddCode} className={styles.form}  >
                    <input type="text" className={styles.input} placeholder="Category Name" onChange={(e: any) => setName(e?.target.value)} value={name} required />
                    {/* <input type="text" className={styles.input} placeholder="Description" required value={description} onChange={(e: any) => setDescription(e?.target.value)} /> */}
                    <textarea id="Description" name="Description" value={description} placeholder="Description" required onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <label className={styles.label}>Select Main Category</label>
                    <div className={styles.drop_downBox}>
                        <select name="company_id" id="" className={styles.selected} value={AllFieldIDs || data?.[0]?.id || ''} onChange={(e) => handleproductChange(e, 'company')}>
                            {
                                (data || []).map((e: any, index: any) => (
                                    <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                        {e?.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button type="submit" className={styles.btn} >Add Category</button>
                </form>
            </Box>
        </Modal>
    )
}

const EditForumMainCategory = ({ open, onClose, funct, Data }: any) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    React.useEffect(() => {
        if (Data) {
            setName(Data?.name || "")
            setDescription(Data?.description || "")
        }
    }, [Data])

    const handleUpdate = async (e: any) => {
        e.preventDefault()
        const obj = {
            name: name,
            description: description
        }

        const res = await UpdateMainForumCategoryById(Data?.id, obj)
        if (res?.success) {
            alert("Main category updated")
            onClose()
            funct()
        }
        else {
            alert(res?.msg || "something is wrong try again")
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={handleUpdate} className={styles.form}  >
                    <input type="text" className={styles.input} value={name} onChange={(e: any) => setName(e?.target.value)} required />
                    <textarea id="Description" name="Description" value={description} required onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <button type="submit" className={styles.btn} >Save Edit</button>
                </form>
            </Box>
        </Modal>
    )
}

const EditForumSubCategory = ({ open, onClose, funct, Data, MainCategoryData }: any) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [mainCategId, setMainCategId] = useState<any>('')

    React.useEffect(() => {
        if (Data) {
            setName(Data?.name || "")
            setDescription(Data?.description || "")
            setMainCategId(Data?.main_categ_id || Data?.mainCategory?.id || "")
        }
    }, [Data])

    const handleUpdate = async (e: any) => {
        e.preventDefault()
        const obj = {
            name: name,
            description: description,
            main_categ_id: Number(mainCategId)
        }

        const res = await UpdateSubForumCategoryById(Data?.id, obj)
        if (res?.success) {
            alert("Sub category updated")
            onClose()
            funct()
        }
        else {
            alert(res?.msg || "something is wrong try again")
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={handleUpdate} className={styles.form}  >
                    <input type="text" className={styles.input} value={name} onChange={(e: any) => setName(e?.target.value)} required />
                    <textarea id="Description" name="Description" value={description} required onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <label className={styles.label}>Select Main Category</label>
                    <select className={styles.selected} value={mainCategId} onChange={(e) => setMainCategId(e.target.value)} required>
                        <option value="" disabled>Select category</option>
                        {(MainCategoryData || []).map((item: any) => (
                            <option key={item?.id} value={item?.id}>{item?.name}</option>
                        ))}
                    </select>
                    <button type="submit" className={styles.btn} >Save Edit</button>
                </form>
            </Box>
        </Modal>
    )
}

const AddForumThread = ({ open, onClose, funct, subCategoryData }: any) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subCategoryId, setSubCategoryId] = useState<any>('')
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')

    React.useEffect(() => {
        const userData = GetUserDetail()
        setUserName(userData?.name || "")
        setUserId(userData?.uid || "")
        setSubCategoryId(subCategoryData?.[0]?.id || '')
    }, [subCategoryData])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const obj = {
            title: title,
            description: description,
            user_name: userName,
            user_id: userId,
            isShow: true,
            isVerified: true,
            sub_categ_id: Number(subCategoryId)
        }

        const res = await AddNewForumThread(obj)
        if (res?.success) {
            alert("Thread created")
            setTitle('')
            setDescription('')
            onClose()
            funct()
        }
        else {
            alert(res?.msg || "something is wrong try again")
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="text" className={styles.input} placeholder="Thread title" value={title} onChange={(e: any) => setTitle(e.target.value)} required />
                    <textarea id="threadDescription" name="threadDescription" value={description} placeholder="Description" required onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <label className={styles.label}>Select Sub Category</label>
                    <select className={styles.selected} value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} required>
                        <option value="" disabled>Select sub category</option>
                        {(subCategoryData || []).map((item: any) => (
                            <option key={item?.id} value={item?.id}>{item?.name}</option>
                        ))}
                    </select>
                    <button type="submit" className={styles.btn}>Add Thread</button>
                </form>
            </Box>
        </Modal>
    )
}

const AddForumThreadComment = ({ open, onClose, funct, threadData }: any) => {
    const [description, setDescription] = useState('')
    const [threadId, setThreadId] = useState<any>('')
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')

    React.useEffect(() => {
        const userData = GetUserDetail()
        setUserName(userData?.name || "")
        setUserId(userData?.uid || "")
        setThreadId(threadData?.[0]?.id || '')
    }, [threadData])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const obj = {
            title: "Thread Comment",
            description: description,
            thread_id: Number(threadId),
            user_name: userName,
            user_id: userId,
            isShow: true,
            isVerified: true
        }

        const res = await AddNewForumComment(obj)
        if (res?.success) {
            alert("Comment added")
            setDescription('')
            onClose()
            funct()
        }
        else {
            alert(res?.msg || "something is wrong try again")
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <textarea id="commentDescription" name="commentDescription" value={description} placeholder="Comment text" required onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <label className={styles.label}>Select Thread</label>
                    <select className={styles.selected} value={threadId} onChange={(e) => setThreadId(e.target.value)} required>
                        <option value="" disabled>Select thread</option>
                        {(threadData || []).map((item: any) => (
                            <option key={item?.id} value={item?.id}>{item?.title || `Thread #${item?.id}`}</option>
                        ))}
                    </select>
                    <button type="submit" className={styles.btn}>Add Comment</button>
                </form>
            </Box>
        </Modal>
    )
}

const EditForumThread = ({ open, onClose, funct, Data }: any) => {
    console.log("Datares", Data)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    React.useEffect(() => {
        if (Data) {
            setName(Data?.title || "")
            setDescription(Data?.description || "")
        }
    }, [Data])

    const hndleUpdateThread = async (e: any) => {
        e.preventDefault()
        const obj = {
            title: name,
            description: description,
        }

        const res = await UpdateThreadById(Data?.id, obj)
        if (res?.success) {
            alert("Thread Successfully Edit")
            setDescription('')
            setName("")
            onClose()
            funct()
        }
        else {
            alert("something is wrong try again")
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={hndleUpdateThread} className={styles.form}  >
                    <input type="text" className={styles.input} onChange={(e: any) => setName(e?.target.value)} value={name} required />
                    <textarea id="Description" name="Description" value={description} required onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <button type="submit" className={styles.btn} >Edit Thread</button>
                </form>
            </Box>
        </Modal>
    )
}

const EditForumThreadComment = ({ open, onClose, funct, Data }: any) => {
    const [description, setDescription] = useState('')

    React.useEffect(() => {
        if (Data) {
            setDescription(Data?.description || "")
        }
    }, [Data])

    const hndleUpdateThread = async (e: any) => {
        e.preventDefault()
        const obj = {
            description: description,
        }

        const res = await UpdateThreadCommentById(Data?.id, obj)
        if (res?.success) {
            alert("Comment Successfully Edit")
            setDescription('')
            onClose()
            funct()
        }
        else {
            alert("something is wrong try again")
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={hndleUpdateThread} className={styles.form}  >
                    <textarea id="Description" name="Description" value={description} required onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <button type="submit" className={styles.btn} >Save Edit</button>
                </form>
            </Box>
        </Modal>
    )
}

const EditVideo = ({ open, onClose, funct, Data }: any) => {
    console.log("Datacheck", Data)
    const [ViwsCount, setViewsCount] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [video_url, setVideoUrl] = useState('');
    const [category, setCategory] = useState();
    const [title, setTitle] = useState('');

    React.useEffect(() => {
        if (Data) {
            setViewsCount(Data?.views_count || 0);
            setThumbnail(Data?.thumbnail || "");
            setVideoUrl(Data?.video_url || "");
            setCategory(Data?.category || "News");
            setTitle(Data?.title || "");
        }
    }, [Data])

    const handleUpdateVideo = async (e: any) => {
        e.preventDefault()
        const obj = {
            views_count: ViwsCount,
            thumbnail: thumbnail,
            video_url: video_url,
            category: category,
            title: title
        }

        const res = await UpdateVideoByID(Data?.id, obj)
        if (res && res?.success && res?.info == "Video updated successfully") {
            alert("Video Successfully Edit")
            setTitle('')
            setVideoUrl('')
            setThumbnail('')
            setViewsCount('')
            onClose()
            funct()
        }
        else {
            alert("something is wrong try again")
            onClose()
        }
    }

    const handleproductChange = (e: any, from: any) => {
        const { name, value } = e.target;
        if (from == "company") {
            setCategory(value);
        }
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={handleUpdateVideo} className={styles.main_}>

                    <label htmlFor="title" className={styles.label}>Video Title:</label>
                    <textarea id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.textarea1} />
                    <label htmlFor="thumbnail" className={styles.label}>Thumbnail URL:</label>
                    <input id="thumbnail" name="thumbnail" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className={styles.input} />
                    {/* <input id="description" name="descrption" value={NewDescription} onChange={(e) => setNewDescription(e.target.value)} className={styles.input} /> */}


                    <label htmlFor="video_url" className={styles.label}>Video URL:</label>
                    <input id="video_url" name="video_url" value={video_url} onChange={(e) => setVideoUrl(e.target.value)} className={styles.input} />

                    <label htmlFor="ViwsCount" className={styles.label}>Views Count</label>
                    <input id="ViwsCount" name="ViwsCount" value={ViwsCount} onChange={(e) => setViewsCount(e.target.value)} className={styles.input} />

                    <label className={styles.label}>Select Video Category</label>
                    <div className={styles.drop_downBox}>
                        <select name="company_id" id="" className={styles.selected} onChange={(e) => handleproductChange(e, 'company')}>
                            <option value={Data?.category} disabled selected hidden>{Data?.category}</option>
                            {
                                VideoCategoryArr.map((e: any, index: any) => (
                                    <option key={index} value={e?.name} className={styles.options} style={{ fontSize: '16px' }}>
                                        {e?.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <button type="submit" className={styles.button}>Save Edit</button>
                </form>
            </Box>
        </Modal>
    )
}


const EditWebsiteSetting = ({ open, onClose, funct, Data }: any) => {
    const [Value, setValue] = useState<any>();
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    React.useEffect(() => {
        if (Data) {
            setName(Data?.name || "");
            setValue(Data?.value || "");
            setDescription(Data?.description || "");
        }
    }, [Data])

    const handleUpdateVideo = async (e: any) => {
        e.preventDefault()
        const obj = {
            name: Name,
            value: Value,
            description: Description,
        }

        const res = await UpdateSettingByID(Data?.id, obj)
        if (res && res?.success && res?.info == "Setting updated successfully") {
            alert("Setting updated successfully")
            setName('')
            setValue('')
            setDescription('')
            onClose()
            funct()
        }
        else {
            alert("something is wrong try again")
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={handleUpdateVideo} className={styles.main_}>

                    <label htmlFor="name" className={styles.label}>Setting Name:</label>
                    <input id="name" name="name" value={Name} onChange={(e) => setName(e.target.value)} className={styles.input} />
                    <label htmlFor="value" className={styles.label}>Setting Value:</label>
                    <textarea id="value" name="value" value={Value} onChange={(e) => setValue(e.target.value)} className={styles.textarea1} />
                    <label htmlFor="description" className={styles.label}>Setting Description:</label>
                    <textarea id="description" name="description" value={Description} onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <button type="submit" className={styles.button}>Save Edit</button>
                </form>
            </Box>
        </Modal>
    )
}

const AddNewWebsiteSetting = ({ open, onClose, funct }: any) => {
    const [Value, setValue] = useState<any>();
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');

    const handleAddNewSetting = async (e: any) => {
        e.preventDefault()
        const obj = {
            name: Name,
            value: Value,
            description: Description,
        }

        const res = await AddNewSetting(obj)
        if (res && res?.success && res?.info == "Added Successfully!") {
            alert("Setting Add successfully")
            setName('')
            setValue('')
            setDescription('')
            onClose()
            funct()
        }
        else {
            alert("something is wrong try again")
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
                <form onSubmit={handleAddNewSetting} className={styles.main_}>

                    <label htmlFor="name" className={styles.label}>Setting Name:</label>
                    <input id="name" name="name" value={Name} onChange={(e) => setName(e.target.value)} className={styles.input} />
                    <label htmlFor="value" className={styles.label}>Setting Value:</label>
                    <textarea id="value" name="value" value={Value} onChange={(e) => setValue(e.target.value)} className={styles.textarea1} />
                    <label htmlFor="description" className={styles.label}>Setting Description:</label>
                    <textarea id="description" name="description" value={Description} onChange={(e) => setDescription(e.target.value)} className={styles.textarea1} />
                    <button type="submit" className={styles.button}>Add Setting</button>
                </form>
            </Box>
        </Modal>
    )
}

export {
    BasicModal,
    EditVideo,
    ShopBrandPopup,
    AddShopBrandPopup,
    AddCOuponCode,
    AddForumMainCategory,
    AddForumSubCategory,
    EditForumMainCategory,
    EditForumSubCategory,
    AddForumThread,
    AddForumThreadComment,
    EditForumThread,
    EditForumThreadComment,
    EditWebsiteSetting,
    AddNewWebsiteSetting
}
