import BlogDetails from '@/ebikeWeb/pageLayouts/blog-details/index'
import { Metadata } from 'next'
import { getSingleBlogData,  } from '@/ebikeWeb/functions/globalFuntions'
import { DEFAULT_SHARE_IMAGE, resolveBlogShareImage, slugify, toSecureUrl, trimText, SITE_URL } from '@/app/metadata-utils';
type Props = {
  params: { id: string }
}

function buildBlogUrl(blogInfo: any) {
  if (!blogInfo) {
    return `${SITE_URL}/blog`;
  }

  return `${SITE_URL}/blog/${slugify(blogInfo.blog_category?.name || 'news')}/${slugify(blogInfo.blogTitle)}/${blogInfo.id}`;
}

function buildAuthorUrl(author: any) {
  if (!author?.id) {
    return undefined;
  }

  return `${SITE_URL}/author/${author.slug || slugify(author.name || 'author')}/${author.id}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getSingleBlogData(params.id)
  const title = blog?.blogTitle ? `${blog.blogTitle} | ebike.pk` : "Blog | ebike.pk";
  const description = trimText(blog?.meta_description || blog?.bloghtml || blog?.blogDescription, 170);
  const ogImage = resolveBlogShareImage(blog?.featuredImage) || DEFAULT_SHARE_IMAGE;
  const authorName = blog?.author?.name || blog?.authorname?.trim() || 'ebike.pk';
  const authorUrl = buildAuthorUrl(blog?.author);
  const canonicalUrl = buildBlogUrl(blog);

  return {
    title,
    description,
    authors: [authorUrl ? { name: authorName, url: authorUrl } : { name: authorName }],
    keywords: blog?.focus_keyword || blog?.blog_category?.name || undefined,
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: blog?.isHidden ? false : true,
      follow: blog?.isHidden ? false : true,
      googleBot: {
        index: blog?.isHidden ? false : true,
        follow: blog?.isHidden ? false : true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
      publishedTime: blog?.createdAt,
      modifiedTime: blog?.updatedAt,
      authors: [authorName],
      section: blog?.blog_category?.name,
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
  const blog = await getSingleBlogData(params.id);
  const canonicalUrl = buildBlogUrl(blog);
  const ogImage = resolveBlogShareImage(blog?.featuredImage) || DEFAULT_SHARE_IMAGE;
  const authorName = blog?.author?.name || blog?.authorname?.trim() || 'ebike.pk';
  const authorUrl = buildAuthorUrl(blog?.author);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: blog?.blogTitle,
    description: trimText(blog?.meta_description || blog?.bloghtml || blog?.blogDescription, 170),
    image: [toSecureUrl(ogImage)],
    datePublished: blog?.createdAt,
    dateModified: blog?.updatedAt || blog?.createdAt,
    articleSection: blog?.blog_category?.name,
    keywords: blog?.focus_keyword,
    author: [
      {
        '@type': 'Person',
        name: authorName,
        ...(authorUrl ? { url: authorUrl } : {}),
      }
    ],
    publisher: {
      '@type': 'Organization',
      name: 'ebike.pk',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: toSecureUrl(DEFAULT_SHARE_IMAGE),
      },
    },
    isAccessibleForFree: true,
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <BlogDetails />
    </>
  )
}
