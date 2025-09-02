import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from './index.module.scss';
const jsCookie = require('js-cookie');
import { useState } from "react";
import { addNewBrandCompany, AddNewCouponCode, UpdateBrandById, UpdateBrandCompany } from "@/ebike-panel/ebike-panel-Function/globalfunction";

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
            alert("Brand updated successfully!");
            onClose();
            funct(1);
        }
        else {
            alert('Something is Wrong!')
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

const AddCOuponCode = ({ open, onClose ,funct }: any) => {
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
        if(res && res?.success){
            funct()
            onClose();
        }
        else{
            alert("Something went wrong")
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

export { BasicModal, ShopBrandPopup, AddShopBrandPopup, AddCOuponCode }