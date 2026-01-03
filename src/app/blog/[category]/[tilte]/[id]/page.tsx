import * as React from 'react';
import BlogDetails from '@/ebikeWeb/pageLayouts/blog-details/index';
import { Metadata } from 'next'
import {getSingleBlogData } from '@/ebikeWeb/functions/globalFuntions';

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    const blog = await getSingleBlogData(id)

    return {
      title: blog?.blogTitle + ' | ebike.pk',
      description: blog.meta_description,
      openGraph: {
        title:  blog.blogTitle + ' | ebike.pk',
        description: blog.meta_description,
        images: [blog.featuredImage],
        tags: [blog.blogTitle, blog.meta_description, 'blog', blog.featuredImage]
      },
    }
  }

export default function Blog() {
    return (
      <>
        <BlogDetails /> 
      </>
    )
}