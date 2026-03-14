import Main_DashBoard from "@/ebike-panel/ebike-panel-Pages/main_dashboard";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Ebike Panel Dashboard",
    robots: {
        index: false,
        follow: false
    }
};

const MainDashBoard = () => {
    return (
        <Suspense fallback={null}>
            <Main_DashBoard />
        </Suspense>
    );
};

export default MainDashBoard;
