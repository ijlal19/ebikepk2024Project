import Main_DashBoard from "@/ebike-pannel/ebike-pannel-Pages/Dashboard";
import SideBar from "@/ebike-pannel/ebike-pannel-sharedComponent/SideBar";

const DashBoard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <SideBar />
            <Main_DashBoard />
        </div>
    )
}
export default DashBoard