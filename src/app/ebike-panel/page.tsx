import EbikePanel from "@/ebike-panel/ebike-panel-sharedComponent/ebike-panel-select-route";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Ebike Panel",
    robots: {
        index: false,
        follow: false
    }
};

const ebike_panel_main = () => {
    return (
        <Suspense fallback={null}>
            <EbikePanel />
        </Suspense>
    );
};

export default ebike_panel_main;
