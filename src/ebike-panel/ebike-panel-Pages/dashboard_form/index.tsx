'use client';
import Edit_newbike_form from "@/ebike-panel/ebike-panel-sharedComponent/edit-new-bike";
import EditUsedBikeForm from "@/ebike-panel/ebike-panel-sharedComponent/edit-used-bike";
import { useParams } from "next/navigation";
import styles from './index.module.scss';

const DashBoard_form = () => {
    const { slug, slug1 } = useParams()
    const CheckRoute = slug
    console.log("data", slug, slug1)

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