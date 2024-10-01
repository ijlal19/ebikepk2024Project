import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from '@/sharedComponents/header/index'
import Footer from '@/sharedComponents/footer/footer-index'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ebike.pk",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
