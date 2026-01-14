import * as React from 'react';
import BlogDetails from '@/ebikeWeb/pageLayouts/blog-details/index';
import { Metadata } from 'next'
import {getSingleBlogData } from '@/ebikeWeb/functions/globalFuntions';
import Head from "next/head";

type Props = {
    params: { id: string }
}
let blog:any = {}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    blog = await getSingleBlogData(id)

    return {
      title: blog?.blogTitle + ' | ebike.pk',
      description: blog?.meta_description,
      openGraph: {
        title:  blog.blogTitle + ' | ebike.pk',
        description: blog?.meta_description,
        images: [
        {
          url:  blog.featuredImage,
          width: 1200,
          height: 630,
          alt: 'blog Image',
        },
        ],
        tags: [blog.blogTitle, blog?.meta_description, 'blog', blog.featuredImage]
      },
    }
  }

export default function Blog() {
    return (
      <>
        <Head>
            <meta property="og:title" content={blog?.blogTitle} />
            <meta property="og:description" content={blog?.meta_description} />
            <meta property="og:image" content={blog.featuredImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={blog?.blogTitle} />
            <meta name="twitter:description" content={blog?.meta_description} />
            <meta name="twitter:image" content={blog.featuredImage} />

        </Head>
        <BlogDetails /> 
      </>
    )
}