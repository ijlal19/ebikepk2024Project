import * as React from 'react';
import BlogComp from "@/ebikeWeb/pageLayouts/blog/index"
import { Metadata } from 'next'
import { Suspense } from "react";
import { getAllBlog } from '@/ebikeWeb/functions/globalFuntions';
import { DEFAULT_SHARE_IMAGE, resolveBlogShareImage, SITE_URL, slugify, toSecureUrl, trimText } from '@/app/metadata-utils';

export const revalidate = 900;

function buildBlogUrl(blogInfo: any) {
  return `${SITE_URL}/blog/${slugify(blogInfo?.blog_category?.name || 'news')}/${slugify(blogInfo?.blogTitle)}/${blogInfo?.id}`;
}

function sanitizeBlogForListing(blog: any) {
  return {
    id: blog?.id,
    blogTitle: blog?.blogTitle,
    featuredImage: blog?.featuredImage,
    meta_description: blog?.meta_description,
    blogDescription: trimText(blog?.blogDescription, 220),
    authorname: blog?.authorname,
    createdAt: blog?.createdAt,
    updatedAt: blog?.updatedAt,
    views_count: blog?.views_count,
    focus_keyword: blog?.focus_keyword,
    is_news: blog?.is_news,
    blog_category: blog?.blog_category
      ? {
        id: blog.blog_category.id,
        name: blog.blog_category.name,
      }
      : undefined,
    author: blog?.author
      ? {
        id: blog.author.id,
        name: blog.author.name,
        slug: blog.author.slug,
      }
      : undefined,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Latest Motorcycle News in Pakistan | ebike.pk';
  const description = 'Read the latest motorcycle and electric bike news in Pakistan, including launches, prices, industry updates, and bike market stories from ebike.pk.';
  const canonicalUrl = `${SITE_URL}/blog/news`;

  return {
    title,
    description,
    keywords: 'motorcycle news Pakistan, bike news Pakistan, electric bike news, ebike.pk news',
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
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
      type: 'website',
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: 'ebike.pk',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_SHARE_IMAGE],
    },
  }
}

export default async function NewsBlog() {
  const newsBlogs = await getAllBlog({ is_news: true, next: { revalidate } });
  const allNewsBlogs = Array.isArray(newsBlogs) ? newsBlogs.map(sanitizeBlogForListing) : [];
  const latestBlogs = allNewsBlogs.slice(0, 20);
  const canonicalUrl = `${SITE_URL}/blog/news`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Latest Motorcycle News in Pakistan',
      description: 'Latest motorcycle and electric bike news from ebike.pk.',
      url: canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'ebike.pk',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'ebike.pk',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: toSecureUrl(DEFAULT_SHARE_IMAGE),
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: latestBlogs.map((blog: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: buildBlogUrl(blog),
        item: {
          '@type': 'NewsArticle',
          headline: blog?.blogTitle,
          description: trimText(blog?.meta_description || blog?.bloghtml || blog?.blogDescription, 170),
          image: [toSecureUrl(resolveBlogShareImage(blog?.featuredImage) || DEFAULT_SHARE_IMAGE)],
          datePublished: blog?.createdAt,
          dateModified: blog?.updatedAt || blog?.createdAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': buildBlogUrl(blog),
          },
          author: {
            '@type': 'Person',
            name: blog?.author?.name || blog?.authorname?.trim() || 'ebike.pk',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ebike.pk',
            logo: {
              '@type': 'ImageObject',
              url: toSecureUrl(DEFAULT_SHARE_IMAGE),
            },
          },
          isAccessibleForFree: true,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Suspense fallback={null}>
        <BlogComp initialBlogs={allNewsBlogs} isNewsPage />
      </Suspense>
    </>
  )
}
