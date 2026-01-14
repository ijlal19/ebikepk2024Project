import BlogDetails from '@/ebikeWeb/pageLayouts/blog-details/index'
import { Metadata } from 'next'
import { getSingleBlogData,  } from '@/ebikeWeb/functions/globalFuntions'
import {cloudinaryLoader } from '@/genericFunctions/geneFunc';
type Props = {
  params: { id: string }
}



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getSingleBlogData(params.id)

  const handleRoute = (blogInfo: any) => {
    var title = blogInfo.blogTitle;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    lowerTitle = '' + lowerTitle.replaceAll("?", "")
     return `https://www.ebike.pk/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`
  };

  const ogImage = cloudinaryLoader(
    blog?.featuredImage?.split(' #$# ')[0]?.trim(),
    1200,
    'auto'
  )

  return {
    title: `${blog?.blogTitle} | ebike.pk`,
    description: blog?.meta_description,

    openGraph: {
      title: `${blog?.blogTitle} | ebike.pk`,
      description: blog?.meta_description,
      url: handleRoute(blog),
      siteName: 'ebike.pk',
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: Props) {
  return <BlogDetails  />
}
