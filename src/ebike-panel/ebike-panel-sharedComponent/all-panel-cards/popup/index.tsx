import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from './index.module.scss';
const jsCookie = require('js-cookie');
import { useState } from "react";
import { UpdateBrandById } from "@/ebike-panel/ebike-panel-Function/globalfunction";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ open, onClose, brand , funct }: any) {

    const [NewBrandName, setNewBrandName] = useState('');
    const [NewVideoUrl, setNewVideoUrl] = useState('');
    const [NewMetaTitle, setNewMetaTitle] = useState('');
    const [NewDescription, setNewDescription] = useState('');
    const [NewMetaDescription, setNewMetaDescription] = useState('');
    const [NewFocusKeyword, setNewFocusKeyword] = useState( '');
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
        else if (!NewLogoUrl ) {
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
             alert("✅ Brand updated successfully!");
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
                <textarea id="description" name="descrption" value={NewDescription} onChange={(e) => setNewDescription(e.target.value)} className={styles.textarea} />


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
