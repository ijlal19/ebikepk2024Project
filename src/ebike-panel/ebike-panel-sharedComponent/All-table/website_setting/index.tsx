import { DeleteSetting, GetAllSetting } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { AddNewWebsiteSetting, EditWebsiteSetting } from "../../all-panel-cards/popup";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React, { useEffect, useState } from "react";
import { New_header } from "../../panel-header";
import styles from './index.module.scss';
import data from "./data";

const All_Website_Setting = () => {
    const [open, setOpen] = useState(false);
    const [openAddNew, setOpenAddNew] = useState(false);
    const [AllSetting, setAllsetting] = useState([]);
    const [PropsData, setPropData] = useState([]);
    useEffect(() => {
        fetchAllSetting()
    }, [])

    const fetchAllSetting = async () => {
        const res = await GetAllSetting()
        if (res && res?.data?.length > 0) {
            setAllsetting(res?.data)
        }
        else {
            setAllsetting([])
        }
    }

    const handleOpenPOpup = (data: any, from: any) => {
        if (from == "edit") {
            setPropData(data)
            setOpen(true);
        }
        else {
            setOpenAddNew(true)
        }
    }

    const handleDelete = async (id: any) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Setting?");
        if (!confirmDelete) return;

        const res = await DeleteSetting(id);
        if (res) {
            alert('Delete Successfully')
            fetchAllSetting()
        } else {
            alert("Something went wrong!");
        }
        return;
    }

    return (
        <div className={styles.main}>
            <New_header />
            <div className={styles.container}>
                <p className={styles.heading}>Website Settings: <button className={styles.add_seting_btn} onClick={(e) => handleOpenPOpup(e, "add")} >Add New Setting</button></p>
                <table className={styles.table_main}>
                    <thead className={styles.thead}>
                        <tr>
                            <td className={styles.td}>#</td>
                            <td className={styles.td}>Setting Name</td>
                            <td className={styles.td}>Setting Value</td>
                            <td className={styles.td}>Setting Description</td>
                            <td className={styles.td}>Action</td>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {
                            AllSetting?.map((e: any, i: any) => {
                                return (
                                    <tr key={i}>
                                        <td className={styles.td}>{i + 1}</td>
                                        <td className={styles.td}>{e?.name}</td>
                                        <td className={styles.td}>{e?.value}</td>
                                        <td className={styles.td}>{e?.description}</td>
                                        <td className={styles.td}><EditNoteRoundedIcon className={styles.icon} onClick={() => handleOpenPOpup(e, "edit")} /> <DeleteRoundedIcon className={styles.icon} onClick={() => handleDelete(e?.id)} /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <EditWebsiteSetting open={open} onClose={() => setOpen(false)} funct={fetchAllSetting} Data={PropsData} />
            <AddNewWebsiteSetting open={openAddNew} onClose={() => setOpenAddNew(false)} funct={fetchAllSetting} />
        </div>
    )
}

export default All_Website_Setting;