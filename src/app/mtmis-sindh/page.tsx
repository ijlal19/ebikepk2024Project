import type { Metadata } from "next";
import * as React from 'react';
import MtmisSindh from "@/ebikeWeb/pageLayouts/mtmis-sindh/index";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "../metadata-utils";

export const metadata: Metadata = {
    title: "MTMIS Sindh Online Vehicle Verification | ebike.pk",
    description: "Check MTMIS Sindh vehicle verification details online, including registration status, ownership information, tax records, and SMS verification guidance.",
    alternates: {
        canonical: `${SITE_URL}/mtmis-sindh`
    },
    openGraph: {
        title: "MTMIS Sindh Online Vehicle Verification | ebike.pk",
        description: "Explore MTMIS Sindh vehicle verification, registration checks, ownership details, tax status, CPLC information, and SMS verification support.",
        url: `${SITE_URL}/mtmis-sindh`,
        siteName: "ebike.pk",
        images: [
            {
                url: DEFAULT_SHARE_IMAGE,
                width: 512,
                height: 512,
                alt: "MTMIS Sindh - ebike.pk"
            }
        ],
        type: "article"
    },
    twitter: {
        card: "summary_large_image",
        title: "MTMIS Sindh Online Vehicle Verification | ebike.pk",
        description: "View MTMIS Sindh registration checks, tax details, ownership information, and SMS verification instructions online.",
        images: [DEFAULT_SHARE_IMAGE]
    }
};

export default function Profile() {
    return (
        <MtmisSindh />
    );
}
