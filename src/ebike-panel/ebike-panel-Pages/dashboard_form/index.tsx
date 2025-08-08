'use client';
import {EditUsedBikeForm , EditNewBikeForm, EditBlogForm, EditPageForm, EditBrandForm} from "@/ebike-panel/ebike-panel-sharedComponent/edit-forms";
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { useParams, useRouter } from "next/navigation";
import styles from './index.module.scss';
import { useEffect } from "react";

const DashBoard_form = () => {
    const { slug, slug1 } = useParams()
    const CheckRoute = slug
    const router = useRouter()
    
    useEffect(() => {
        const pathname = window.location.pathname
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
        else if (check == 'edit-page') {
            return <EditPageForm />
        }
        else if (check == 'edit-brand') {
            return <EditBrandForm />
        }
    }
    return (
        <div className={styles.main}>
            {GetComponent(CheckRoute)}
        </div>
    )
}
export default DashBoard_form