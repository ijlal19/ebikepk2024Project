import ShopFooter from "@/ebikeShop/ShopSharedComponent/shopFooter";
import HeadersCategory from "@/ebikeShop/ShopSharedComponent/Header";
import Header from "@/ebikeWeb/sharedComponents/header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ebike.pk",
  description: "Best electric bikes in Pakistan",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <Header />
        <HeadersCategory />
        {children}
        {/* <ShopFooter /> */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
