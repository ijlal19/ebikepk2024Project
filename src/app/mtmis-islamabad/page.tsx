import type { Metadata } from "next";
import * as React from 'react';
import MtmisIslamabad from "@/ebikeWeb/pageLayouts/mtmis-islamabad/index";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "../metadata-utils";

export const metadata: Metadata = {
    title: "MTMIS Islamabad Vehicle Verification | ebike.pk",
    description: "Check MTMIS Islamabad vehicle verification details online, including registration status, taxes, engine information, and SMS-based verification guidance.",
    alternates: {
        canonical: `${SITE_URL}/mtmis-islamabad`
    },
    openGraph: {
        title: "MTMIS Islamabad Vehicle Verification | ebike.pk",
        description: "Access MTMIS Islamabad verification details, registration checks, tax information, and SMS verification support through ebike.pk.",
        url: `${SITE_URL}/mtmis-islamabad`,
        siteName: "ebike.pk",
        images: [
            {
                url: DEFAULT_SHARE_IMAGE,
                width: 512,
                height: 512,
                alt: "MTMIS Islamabad - ebike.pk"
            }
        ],
        type: "article"
    },
    twitter: {
        card: "summary_large_image",
        title: "MTMIS Islamabad Vehicle Verification | ebike.pk",
        description: "View MTMIS Islamabad registration checks, vehicle status, tax details, and SMS verification method online.",
        images: [DEFAULT_SHARE_IMAGE]
    }
};

export default function Profile() {
    return (
        <MtmisIslamabad />
    );
}
