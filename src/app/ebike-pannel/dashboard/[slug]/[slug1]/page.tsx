import DashBoard_form from "@/ebike-pannel/ebike-pannel-Pages/dashboard_form"
import SideBar from "@/ebike-pannel/ebike-pannel-sharedComponent/SideBar"


const Dashborad = ()=>{
    return(
        <div style={{ display: 'flex' }}>
            <SideBar />
            <DashBoard_form />
        </div>
    )
}
export default Dashborad