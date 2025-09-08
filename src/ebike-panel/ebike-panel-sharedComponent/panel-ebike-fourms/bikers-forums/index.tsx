'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { New_header } from "../../panel-header";
import { DeleteForumCategory, GetAllForumCategory } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { AddForumCategory } from "../../all-panel-cards/popup";
import Loader from "../../loader/loader";

const BikeForums = () => {
    const [isLoading, setIsloading] = useState(false)
    const [open, setOpen] = useState(false);
    const [AllCategory, setAllCategory] = useState([]);

    useEffect(() => {
        fetchAllCategory()
    }, [])
    const fetchAllCategory = async () => {
        setIsloading(true)
        const res = await GetAllForumCategory()
        console.log("datares", res)
        if (res && res?.catagory?.length > 0) {
            setAllCategory(res?.catagory)
        }
        else {
            setAllCategory([])
            alert("Something went wrong reload page!")
        }
        setIsloading(false)
    }

    const handleAddCategory = () => {
        setOpen(true);
    }
    const handleDelte = async (id: any) => {
        const confirmDelete = window.confirm("Are you sure you want to Delete this Category");
        if (!confirmDelete) return;

        const res = await DeleteForumCategory(id)
        if (res && res.info == "Deleted") {
            alert("Deleted Successfully")
            fetchAllCategory()
        }
        else {
            alert("Something went wrong")
        }
    }

    return (
        <div className={styles.main}>
            <New_header />
            {
                !isLoading ?
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <p className={styles.heading}>Category List</p>
                            <button onClick={handleAddCategory} className={styles.btn} >Add Category</button>
                        </div>
                        <div className={styles.card_box}>
                            {
                                AllCategory?.map((e: any, i: any) => {
                                    return (
                                        <div className={styles.card_main} key={i} >
                                            <p className={styles.heading}>{e?.name}</p>
                                            <button className={styles.delbtn} onClick={() => handleDelte(e?.id)} >Delete</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> :
                    <div className={styles.loader_container}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
            <AddForumCategory open={open} onClose={() => setOpen(false)} funct={fetchAllCategory} />
        </div>
    )
}

export default BikeForums