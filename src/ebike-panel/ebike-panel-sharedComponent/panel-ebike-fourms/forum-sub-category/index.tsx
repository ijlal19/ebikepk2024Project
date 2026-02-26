'use client';
import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { New_header } from "../../panel-header";
import { DeleteSubForumCategory, GetAllMainForumCategory, GetAllSubForumCategory } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { add3Dots } from "@/genericFunctions/geneFunc";
import Loader from "../../loader/loader";
import { AddForumSubCategory, EditForumSubCategory } from "../../all-panel-cards/popup";
import { useRouter, useSearchParams } from "next/navigation";

const ForumSubCateg = () => {
    const [AllCategory, setAllCategory] = useState<any[]>([])
    const [AllSubCategory, setAllSubCategory] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedMainId, setSelectedMainId] = useState<any>('')
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false)
    const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [subCategoryThreadCount, setSubCategoryThreadCount] = useState<any>({})
    const router = useRouter();
    const searchParams = useSearchParams();
    const mainCategoryFromQuery = searchParams.get("main");

    useEffect(() => {
        fetchAllCateg()
    }, [])
    useEffect(() => {
        if (!selectedMainId) {
            setAllSubCategory(AllCategory?.[0]?.subCategories || [])
            return
        }
        const filtered = AllCategory.find((e: any) => String(e?.id) === String(selectedMainId));
        setAllSubCategory(filtered?.subCategories || [])
    }, [selectedMainId, AllCategory])

    const fetchAllCateg = async () => {
        setIsLoading(true)
        const [mainRes, subRes] = await Promise.all([
            GetAllMainForumCategory(),
            GetAllSubForumCategory()
        ]);
        const categoryList = Array.isArray(mainRes?.data) ? mainRes.data : [];
        const subCategoryList = Array.isArray(subRes?.data) ? subRes.data : [];

        const threadCountMap: any = {};
        subCategoryList.forEach((item: any) => {
            threadCountMap[item?.id] = Array.isArray(item?.threads) ? item.threads.length : 0;
        });
        setSubCategoryThreadCount(threadCountMap)

        setAllCategory(categoryList)
        const defaultMainId = mainCategoryFromQuery || categoryList?.[0]?.id || '';
        setSelectedMainId(defaultMainId)
        const mainCategory = categoryList.find((e: any) => String(e?.id) === String(defaultMainId));
        setAllSubCategory(mainCategory?.subCategories || [])
        setIsLoading(false)
    }

    const handleproductChange = (e: any, from: any) => {
        const { value } = e.target;
        if (from == "company") {
            setSelectedMainId(value);
        }
    };
    const handleAddCategory = () => {
        setOpen(true);
    }

    const handleOpenEdit = (data: any) => {
        setSelectedSubCategory(data);
        setEditOpen(true);
    }

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm("Are you sure to delete this sub category?");
        if (!isConfirm) return;
        const res = await DeleteSubForumCategory(id)
        if (res?.success) {
            alert("Deleted successfully")
            fetchAllCateg()
        }
        else {
            alert(res?.msg || "Something went wrong")
        }
    }

    const currentMainCategory = AllCategory.find((item: any) => String(item?.id) === String(selectedMainId));
    const filteredSubCategories = AllSubCategory.filter((item: any) =>
        String(item?.id || "").includes(searchTerm) ||
        String(item?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item?.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.forum_table_page}>
            <New_header />
            {
                !isLoading ?
                    <div className={styles.forum_table_container}>
                        <div className={styles.forum_table_header}>
                            <p className={styles.forum_table_heading}>Forum Sub Categories</p>
                            <button className={styles.forum_primary_btn} onClick={handleAddCategory}>Add Sub Category</button>
                        </div>
                        <div className={styles.forum_table_toolbar}>
                            <div className={styles.forum_filter_badges}>
                                <button className={styles.forum_filter_btn} onClick={() => router.push('/ebike-panel/dashboard/all-main-category')}>Back To Main Categories</button>
                                {selectedMainId && <span className={styles.forum_filter_label}>Main Category: {currentMainCategory?.name || `#${selectedMainId}`}</span>}
                            </div>
                            <div className={styles.drop_downBox}>
                                <select name="company_id" value={selectedMainId} className={styles.selected} onChange={(e) => handleproductChange(e, 'company')}>
                                    {
                                        AllCategory.map((e: any, index: any) => (
                                            <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
                                                {e?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <input
                                type="text"
                                className={styles.forum_search_input}
                                placeholder="Search by ID, name or description"
                                value={searchTerm}
                                onChange={(e: any) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className={styles.forum_table_wrapper}>
                            <table className={styles.forum_table}>
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Threads</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubCategories.map((e: any, index: number) => (
                                        <tr key={e?.id}>
                                            <td>{index + 1}</td>
                                            <td>{e?.name || "N/A"}</td>
                                            <td>{add3Dots(e?.description || "N/A", 120)}</td>
                                            <td>{subCategoryThreadCount?.[e?.id] ?? e?.threads?.length ?? 0}</td>
                                            <td>
                                                <div className={styles.forum_action_group}>
                                                    <button className={styles.forum_edit_btn} onClick={() => handleOpenEdit(e)}>Edit</button>
                                                    <button className={styles.forum_delete_btn} onClick={() => handleDelete(e?.id)}>Delete</button>
                                                    <button className={styles.forum_link_btn} onClick={() => router.push(`/ebike-panel/dashboard/all-threads?sub=${e?.id}&main=${selectedMainId}`)}>Threads</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredSubCategories.length === 0 && <p className={styles.forum_empty}>No sub categories found.</p>}
                        </div>
                    </div>
                    :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
            <AddForumSubCategory open={open} onClose={() => setOpen(false)} funct={fetchAllCateg} data={AllCategory} />
            <EditForumSubCategory open={editOpen} onClose={() => setEditOpen(false)} funct={fetchAllCateg} Data={selectedSubCategory} MainCategoryData={AllCategory} />
        </div>
    )
}
export default ForumSubCateg
