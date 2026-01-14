import BlogDetails from '@/ebikeWeb/pageLayouts/blog-details/index'
import { Metadata } from 'next'
import { getSingleBlogData,  } from '@/ebikeWeb/functions/globalFuntions'
import {cloudinaryLoader } from '@/genericFunctions/geneFunc';
type Props = {
  params: { id: string }
}



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getSingleBlogData(params.id)

  return {
    title: `${blog?.blogTitle} | ebike.pk`,
    description: blog?.meta_description,

    openGraph: {
      title: `${blog?.blogTitle} | ebike.pk`,
      description: blog?.meta_description,
      url: `https://ebike.pk/blog/${params.id}`,
      siteName: 'ebike.pk',
      images: [
        {
          url: cloudinaryLoader(blog?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto'),
          width: 1200,
          height: 630,
          alt: blog?.blogTitle,
        },
      ],
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      title: blog?.blogTitle,
      description: blog?.meta_description,
      images: [cloudinaryLoader(blog?.featuredImage?.split(' #$# ')[0]?.trim(), 400, 'auto')],
    },
  }
}

export default async function Blog({ params }: Props) {
  return <BlogDetails  />
}
