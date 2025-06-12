import Dashboard_page from "@/ebike-pannel/ebike-pannel-Pages/card_list_dashboard"
import SideBar from "@/ebike-pannel/ebike-pannel-sharedComponent/SideBar"

const Dashboard_slug = () => {
    return (
        <div style={{ display: 'flex' }}>
            <SideBar />
            <Dashboard_page />
        </div>
    )
}
export default Dashboard_slug