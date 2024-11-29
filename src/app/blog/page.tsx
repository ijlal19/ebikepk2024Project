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
        <BlogComp/>
    )
}