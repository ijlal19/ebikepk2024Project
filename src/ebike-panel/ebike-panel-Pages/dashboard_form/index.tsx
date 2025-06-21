'use client';
import Edit_newbike_form from "@/ebike-panel/ebike-panel-sharedComponent/edit-new-bike";
import EditUsedBikeForm from "@/ebike-panel/ebike-panel-sharedComponent/edit-used-bike";
import { useParams, useRouter } from "next/navigation";
import styles from './index.module.scss';
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { useEffect } from "react";

const DashBoard_form = () => {
    const { slug, slug1 } = useParams()
    const CheckRoute = slug
    const router = useRouter()

    useEffect(() => {
        checkAuthAndRedirect(router)
    }, []);

    const GetComponent = (check: any) => {
        if (check == "edit-new-bike") {
            return <Edit_newbike_form />
        }
        else if (check == 'edit-classified-ads') {
            return <EditUsedBikeForm />
        }
    }
    return (
        <div className={styles.main}>
            {GetComponent(CheckRoute)}
        </div>
    )
}
export default DashBoard_form