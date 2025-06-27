'use client';
import {EditUsedBikeForm , EditNewBikeForm, EditBlogForm} from "@/ebike-panel/ebike-panel-sharedComponent/edit-forms";
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import Panel_header from "@/ebike-panel/ebike-panel-sharedComponent/panel-header";
import { useParams, useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useEffect } from "react";

const DashBoard_form = () => {
    const { slug, slug1 } = useParams()
    const CheckRoute = slug
    const router = useRouter()
    const pathname = window.location.pathname

    useEffect(() => {
        checkAuthAndRedirect(router , pathname)
    }, []);

    const GetComponent = (check: any) => {
        if (check == "edit-new-bike") {
            return <EditNewBikeForm />
        }
        else if (check == 'edit-classified-ads') {
            return <EditUsedBikeForm />
        }
        else if (check == 'edit-blog') {
            return <EditBlogForm />
        }
    }
    return (
        <div className={styles.main}>
            {/* <Panel_header /> */}
            {GetComponent(CheckRoute)}
        </div>
    )
}
export default DashBoard_form