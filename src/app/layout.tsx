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
   

      <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>

      {/* <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnload"
          onLoad={() => {
            (window as any).fbAsyncInit = function () {
              FB.init({
                appId: 'YOUR_APP_ID',
                cookie: true,
                xfbml: true,
                version: 'v18.0',
              });
              FB.AppEvents.logPageView();
            };
          }}
        /> */}


      </head>
      <body className={inter.className}>
        <Header/>
          {children}
        <Footer/>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
