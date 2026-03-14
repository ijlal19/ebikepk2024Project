import Dashboard_page from "@/ebike-panel/ebike-panel-Pages/card_list_dashboard";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Ebike Panel Dashboard",
    robots: {
        index: false,
        follow: false
    }
};

const Dashboard_slug = () => {
    return (
        <Suspense fallback={null}>
            <Dashboard_page />
        </Suspense>
    );
};

export default Dashboard_slug;
