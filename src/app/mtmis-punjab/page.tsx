import type { Metadata } from "next";
import * as React from 'react';
import MtmisPunjab from "@/ebikeWeb/pageLayouts/mtmis-punjab/index";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "../metadata-utils";

export const metadata: Metadata = {
    title: "MTMIS Punjab Online Vehicle Verification | ebike.pk",
    description: "Use MTMIS Punjab to check vehicle registration, owner details, tax status, payment history, application tracking, and SMS verification information online.",
    alternates: {
        canonical: `${SITE_URL}/mtmis-punjab`
    },
    openGraph: {
        title: "MTMIS Punjab Online Vehicle Verification | ebike.pk",
        description: "Find MTMIS Punjab vehicle verification details for Lahore, Rawalpindi, Faisalabad, Multan, and other Punjab cities in one place.",
        url: `${SITE_URL}/mtmis-punjab`,
        siteName: "ebike.pk",
        images: [
            {
                url: DEFAULT_SHARE_IMAGE,
                width: 512,
                height: 512,
                alt: "MTMIS Punjab - ebike.pk"
            }
        ],
        type: "article"
    },
    twitter: {
        card: "summary_large_image",
        title: "MTMIS Punjab Online Vehicle Verification | ebike.pk",
        description: "Check MTMIS Punjab registration details, owner records, tax data, and SMS verification steps online.",
        images: [DEFAULT_SHARE_IMAGE]
    }
};

export default function Profile() {
    return (
        <MtmisPunjab />
    );
}
