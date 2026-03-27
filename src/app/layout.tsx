import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from '@/ebikeWeb/sharedComponents/header/index'
import Footer from '@/ebikeWeb/sharedComponents/footer/footer-index'
import Script from "next/script";
import { SITE_URL, DEFAULT_SHARE_IMAGE } from "./metadata-utils";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ebike.pk",
  description: "Pakistan's motorcycle portal for new bikes, used bike ads, reviews, prices, dealers, mechanics, and blogs.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "ebike.pk",
    description: "Pakistan's motorcycle portal for new bikes, used bike ads, reviews, prices, dealers, mechanics, and blogs.",
    url: SITE_URL,
    siteName: "ebike.pk",
    images: [
      {
        url: DEFAULT_SHARE_IMAGE,
        width: 512,
        height: 512,
        alt: "ebike.pk"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ebike.pk",
    description: "Pakistan's motorcycle portal for new bikes, used bike ads, reviews, prices, dealers, mechanics, and blogs.",
    images: [DEFAULT_SHARE_IMAGE]
  }
};

export default function RootLayout({  children }: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html lang="en">
       <head>
   
      <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>

      

      </head>
      <body className={inter.className}>
        <Header/>
          {children}
        <Footer/>
       
      </body>
    </html>
  );
}
