import DashBoard_form from "@/ebike-panel/ebike-panel-Pages/dashboard_form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Ebike Panel Edit",
    robots: {
        index: false,
        follow: false
    }
};

const Dashborad = () => {
    return (
        <Suspense fallback={null}>
            <DashBoard_form />
        </Suspense>
    );
};

export default Dashborad;
