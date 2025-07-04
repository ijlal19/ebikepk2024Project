import * as React from 'react';
import BlogComp from "@/ebikeWeb/pageLayouts/blog/index"
import { Metadata } from 'next'


export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'Motorcycle News in Pakistan | Blogs & Articles | ebike.pk',
      description: 'Get Motorcycle news in Pakistan and get your self updated from latest motorcycle industry news, blogs, articles and bike safety tips only on ebike.pk',
      openGraph: {
        title:  'Motorcycle News in Pakistan | Blogs & Articles | ebike.pk',
        description: 'Get Motorcycle news in Pakistan and get your self updated from latest motorcycle industry news, blogs, articles and bike safety tips only on ebike.pk',
      },
    }
  }

export default function Blog() { 
    return (
      <>
        
        {/* <link
        rel="preload"
        href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
        as="script"
        crossOrigin="anonymous" // Add this
      /> */}
          {/* <Script
            strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167970563180610"
            crossOrigin="anonymous"
          ></Script> */}
        
        <BlogComp/>
      </>
    )
}