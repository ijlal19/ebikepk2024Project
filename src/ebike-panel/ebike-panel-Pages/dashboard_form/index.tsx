'use client';
import Edit_newbike_form from "@/ebike-panel/ebike-panel-sharedComponent/edit-new-bike";
import { useParams } from "next/navigation"


const DashBoard_form = ()=>{
    const {slug , slug1} = useParams()
    console.log("data" , slug , slug1)
    return(
        // <div >
            <Edit_newbike_form/>
        // </div>
    )
}
export default DashBoard_form