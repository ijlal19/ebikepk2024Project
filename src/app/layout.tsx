import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from '@/ebikeWeb/sharedComponents/header/index'
import Footer from '@/ebikeWeb/sharedComponents/footer/footer-index'
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ebike.pk",
  description: "",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({  children }: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html lang="en">
       <head>
   
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
          crossOrigin="anonymous"
        ></Script> */}

      <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>

        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
          crossOrigin="anonymous"
        />
      

      </head>
      <body className={inter.className}>
        <Header/>
          {children}
        <Footer/>
       
      </body>
    </html>
  );
}
