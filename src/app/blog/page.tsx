import * as React from 'react';
import BlogComp from "@/ebikeWeb/pageLayouts/blog/index"
import { Metadata } from 'next'
import { Suspense } from "react";
import { getAllBlog } from '@/ebikeWeb/functions/globalFuntions';
import { DEFAULT_SHARE_IMAGE, resolveBlogShareImage, SITE_URL, slugify, toSecureUrl, trimText } from '@/app/metadata-utils';
import SeoContentBlock from '@/app/components/SeoContentBlock';
import { FALLBACK_BLOG_TAGS, buildBlogBreadcrumbItems, buildDynamicBlogTags } from './blog-utils';

export const revalidate = 900;

const blogTitle = 'Motorcycle News in Pakistan | Blogs & Articles | ebike.pk';
const blogDescription = 'Read motorcycle blogs, bike reviews, maintenance guides, safety tips and latest bike news in Pakistan on ebike.pk.';
const blogCanonical = `${SITE_URL}/blog`;

function buildBlogUrl(blogInfo: any) {
  return `${SITE_URL}/blog/${slugify(blogInfo?.blog_category?.name || 'blog')}/${slugify(blogInfo?.blogTitle)}/${blogInfo?.id}`;
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
  return {
    title: blogTitle,
    description: blogDescription,
    keywords: FALLBACK_BLOG_TAGS,
    alternates: {
      canonical: blogCanonical,
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
    category: 'automotive',
    openGraph: {
      title: blogTitle,
      description: blogDescription,
      url: blogCanonical,
      siteName: 'ebike.pk',
      type: 'website',
      images: [
        {
          url: DEFAULT_SHARE_IMAGE,
          width: 512,
          height: 512,
          alt: 'ebike.pk motorcycle blog',
        },
      ],
      locale: 'en_PK',
    },
    twitter: {
      card: 'summary_large_image',
      title: blogTitle,
      description: blogDescription,
      images: [DEFAULT_SHARE_IMAGE],
    },
  }
}

function buildBlogJsonLd(blogs: any[]) {
  const latestBlogs = blogs.slice(0, 20);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${blogCanonical}#blog`,
        name: blogTitle,
        description: blogDescription,
        url: blogCanonical,
        inLanguage: 'en-PK',
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
        '@type': 'BreadcrumbList',
        '@id': `${blogCanonical}#breadcrumb`,
        itemListElement: buildBlogBreadcrumbItems(),
      },
      {
        '@type': 'ItemList',
        '@id': `${blogCanonical}#itemlist`,
        name: 'Latest motorcycle blogs and articles in Pakistan',
        numberOfItems: latestBlogs.length,
        itemListElement: latestBlogs.map((blog: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: buildBlogUrl(blog),
          item: {
            '@type': 'BlogPosting',
            headline: blog?.blogTitle,
            description: trimText(blog?.meta_description || blog?.blogDescription, 170),
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
    ],
  };
}

export default async function Blog() {
  const blogs = await getAllBlog({ next: { revalidate } });
  const allBlogs = Array.isArray(blogs) ? blogs.map(sanitizeBlogForListing) : [];
  const blogSeoTags = buildDynamicBlogTags(allBlogs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogJsonLd(allBlogs)).replace(/</g, '\\u003c') }}
      />
      <SeoContentBlock
        title="Motorcycle News, Blogs & Guides in Pakistan"
        description="Read motorcycle news, bike reviews, maintenance guides, safety tips and electric bike updates for Pakistan. Explore helpful ebike.pk articles before buying, selling or maintaining your bike."
        tags={blogSeoTags}
        tagHrefPrefix="/blog?category="
        formatTagHrefValue={(tag) => tag.replace(/\s+/g, "_")}
        headingLevel="h1"
      />
      <Suspense fallback={null}>
        <BlogComp initialBlogs={allBlogs} />
      </Suspense>
    </>
  )
}
