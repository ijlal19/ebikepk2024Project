import type { Metadata } from "next";
import SellMyBikeInstructions from "@/ebikeWeb/pageLayouts/sell-my-bike-instructions";
import { DEFAULT_SHARE_IMAGE, SITE_URL } from "@/app/metadata-utils";

const pageTitle = "Sell My Bike Instructions | ebike.pk";
const pageDescription =
  "Read the complete sell my bike instructions page on ebike.pk and continue to the existing used bike selling form when ready.";
const canonicalUrl = `${SITE_URL}/sell-my-bike-instructions`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    siteName: "ebike.pk",
    images: [
      {
        url: DEFAULT_SHARE_IMAGE,
        width: 512,
        height: 512,
        alt: "Sell my bike instructions",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [DEFAULT_SHARE_IMAGE],
  },
};

export default function SellMyBikeInstructionsPage() {
  return <SellMyBikeInstructions />;
}
