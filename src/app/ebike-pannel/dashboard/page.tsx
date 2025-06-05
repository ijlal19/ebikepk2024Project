import Pannel_DashBoard from "@/ebike-pannel/ebike-pannel-Pages/Dashboard";
import Header from "@/ebike-pannel/ebike-pannel-sharedComponent/SideBar";

const DashBoard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Header />
            <Pannel_DashBoard />
        </div>
    )
}
export default DashBoard