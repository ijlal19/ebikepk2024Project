import React from "react";
import styles from './index.module.scss';
import data from "./data";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

const All_Website_Setting = () => {

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <p className={styles.heading}>Website Settings: </p>
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
                            data?.map((e: any, i: any) => {
                                return (
                                    <tr key={i}>
                                        <td className={styles.td}>{i}</td>
                                        <td className={styles.td}>{e?.name}</td>
                                        <td className={styles.td}>{e?.value}</td>
                                        <td className={styles.td}>{e?.description}</td>
                                        <td className={styles.td}><EditNoteRoundedIcon className={styles.icon} /> <DeleteRoundedIcon className={styles.icon} /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default All_Website_Setting;