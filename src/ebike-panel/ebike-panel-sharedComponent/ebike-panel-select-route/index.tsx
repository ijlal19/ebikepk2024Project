'use client'
import { checkAuthAndRedirect } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const jsCookie = require('js-cookie');

const EbikePanel = () => {
    const router = useRouter();

    useEffect(() => {
        checkAuthAndRedirect(router)
    }, []);

    return <div></div>;
};

export default EbikePanel;
