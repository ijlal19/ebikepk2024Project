import BlogDetails from '@/ebikeWeb/pageLayouts/blog-details/index'
import { Metadata } from 'next'
import { getSingleBlogData,  } from '@/ebikeWeb/functions/globalFuntions'
import { DEFAULT_SHARE_IMAGE, resolveBlogShareImage, trimText } from '@/app/metadata-utils';
type Props = {
  params: { id: string }
}



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getSingleBlogData(params.id)
  const title = blog?.blogTitle ? `${blog.blogTitle} | ebike.pk` : "Blog | ebike.pk";
  const description = trimText(blog?.meta_description || blog?.bloghtml || blog?.blogDescription, 170);

  const handleRoute = (blogInfo: any) => {
    if (!blogInfo) {
      return `https://www.ebike.pk/blog`;
    }

    var title = blogInfo.blogTitle;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    lowerTitle = '' + lowerTitle.replaceAll("?", "")
     return `https://www.ebike.pk/blog/${blogInfo.blog_category.name.toLowerCase()}/${lowerTitle}/${blogInfo.id}`
  };

  const ogImage = resolveBlogShareImage(blog?.featuredImage) || DEFAULT_SHARE_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: handleRoute(blog)
    },

    openGraph: {
      title,
      description,
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
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: Props) {
  return <BlogDetails  />
}
