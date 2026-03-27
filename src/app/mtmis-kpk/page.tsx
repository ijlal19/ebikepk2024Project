import type { Metadata } from "next";
import * as React from 'react';
import MtmisKpk from "@/ebikeWeb/pageLayouts/mtmis-kpk/index";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "../metadata-utils";

export const metadata: Metadata = {
    title: "MTMIS KPK Online Vehicle Verification | ebike.pk",
    description: "Use MTMIS KPK to verify vehicle registration, ownership details, maker information, model records, and online verification steps for Khyber Pakhtunkhwa.",
    alternates: {
        canonical: `${SITE_URL}/mtmis-kpk`
    },
    openGraph: {
        title: "MTMIS KPK Online Vehicle Verification | ebike.pk",
        description: "Check MTMIS KPK vehicle verification details, registration records, ownership information, and verification steps for Peshawar and across KPK.",
        url: `${SITE_URL}/mtmis-kpk`,
        siteName: "ebike.pk",
        images: [
            {
                url: DEFAULT_SHARE_IMAGE,
                width: 512,
                height: 512,
                alt: "MTMIS KPK - ebike.pk"
            }
        ],
        type: "article"
    },
    twitter: {
        card: "summary_large_image",
        title: "MTMIS KPK Online Vehicle Verification | ebike.pk",
        description: "Explore MTMIS KPK registration checks, ownership details, maker records, and online verification guidance.",
        images: [DEFAULT_SHARE_IMAGE]
    }
};

export default function Profile() {
    return (
        <MtmisKpk />
    );
}
