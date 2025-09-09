'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { New_header } from "../../panel-header";
import { GetAllForumCategory, GetAllMainForumCategory } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { add3Dots } from "@/genericFunctions/geneFunc";
import Loader from "../../loader/loader";
import { AddForumSubCategory } from "../../all-panel-cards/popup";

const ForumSubCateg = () => {
    const [AllCategory, setAllCategory] = useState<any>([])
    const [AllSubCategory, setAllSubCategory] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [CategoryNameId, setCategoryNameId] = useState(1)
    const [open, setOpen] = useState(false);

    const [AllFieldIDs, setAllFieldIds] = useState<any>(0)

    useEffect(() => {
        fetchAllCateg()
    }, [])
    useEffect(() => {
        const filtered = AllCategory.filter((e: any) => e?.id == AllFieldIDs);
       setAllSubCategory(filtered[0]?.subCategories)
    }, [AllFieldIDs])

    const fetchAllCateg = async () => {
        setIsLoading(true)
        const res = await GetAllMainForumCategory()
        console.log("res", res?.data)
        if (res && res?.data.length > 0) {
            setAllCategory(res?.data)
            setAllSubCategory(res?.data[0]?.subCategories)
            console.log("datares", res?.data[0]?.subCategories)
        }
        else {
            alert("Failed to fetch Data try again!")
            setAllCategory([])
        }
        setIsLoading(false)
    }

    const handleBtn = (id: any) => {
        setCategoryNameId(id)
    }
    const handleproductChange = (e: any, from: any) => {
        const { name, value } = e.target;
        if (from == "company") {
            setAllFieldIds(value);
            console.log("datares" , Number(value) )
        }
    };
     const handleAddCategory = () => {
        setOpen(true);
    }

    return (
        <div className={styles.main_forums_Categ}>
            <New_header />
            {
                !isLoading ?
                    <div className={styles.card_section}>
                        <div className={styles.page_header}>
                            <div className={styles.drop_downBox}>
                                <select name="company_id" id={AllCategory[0]?.id} className={styles.selected} onChange={(e) => handleproductChange(e, 'company')}>
                                    <option value="" disabled selected hidden>{AllCategory[0]?.name}</option>
                                    {
                                        AllCategory.map((e: any, index: any) => (
                                            <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                                {e?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/* <p className={styles.forums_main_heading}>Forum Main Category</p> */}
                            {/* <button className={styles.add_new_btn} >Add New Category</button> */}
                            <button className={styles.add_new_btn} onClick={handleAddCategory} >Add New Category</button>
                        </div>
                        {
                            AllSubCategory && AllSubCategory.length > 0 ?
                        <div className={styles.card_main_box}>
                            {
                                AllSubCategory?.map((e: any, i: any) => {
                                    return (
                                        <div className={styles.card_main} key={i} >
                                            <div className={styles.header}>
                                                <p className={styles.title}>{add3Dots(e?.name, 30)}</p>
                                            </div>
                                            <div className={styles.body}>
                                                <p className={styles.text}><span style={{ fontWeight: "bold" }}>ID:</span> {e?.id} </p>
                                                <p className={styles.text}><span style={{ fontWeight: "bold" }}>Name:</span> {e?.user_name || "N/A"} </p>
                                                <p className={styles.text}><span style={{ fontWeight: "bold" }}>Description:</span> {e?.description || 'N/A'} </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : 
                        <p className={styles.not}>No categories found!</p>
                        }
                    </div>
                    :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
            <AddForumSubCategory open={open} onClose={() => setOpen(false)} funct={fetchAllCateg} data={AllCategory} />
        </div>
    )
}
export default ForumSubCateg