import Gconfig from 'globalconfig';
import { SITE_URL, slugify } from '@/app/metadata-utils';
import { filterVisibleBlogs } from '@/ebikeWeb/utils/blogVisibility';

export const revalidate = 900;

type Blog = {
  id?: number | string;
  blogTitle?: string;
  createdAt?: string;
  updatedAt?: string;
  isHidden?: boolean;
  blog_category?: {
    name?: string;
  };
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toW3cDate(value?: string) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function isRecentNewsArticle(value?: string) {
  if (!value) {
    return false;
  }

  const publishedAt = new Date(value).getTime();
  if (Number.isNaN(publishedAt)) {
    return false;
  }

  const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return publishedAt <= now && now - publishedAt <= twoDaysMs;
}

function buildBlogUrl(blog: Blog) {
  return `${SITE_URL}/blog/${slugify(blog.blog_category?.name || 'news')}/${slugify(blog.blogTitle || '')}/${blog.id}`;
}

async function getRecentBlogs() {
  const response = await fetch(`${Gconfig.ebikeApi}blog/get-all-blog`, {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const visibleBlogs = filterVisibleBlogs(Array.isArray(data) ? data : []);

  return visibleBlogs
    .filter((blog: Blog) => blog?.id && blog?.blogTitle && isRecentNewsArticle(blog.createdAt))
    .sort((a: Blog, b: Blog) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 1000);
}

export async function GET() {
  const blogs = await getRecentBlogs();
  const urls = blogs.map((blog: Blog) => {
    return `  <url>
    <loc>${escapeXml(buildBlogUrl(blog))}</loc>
    <lastmod>${escapeXml(toW3cDate(blog.updatedAt || blog.createdAt))}</lastmod>
    <news:news>
      <news:publication>
        <news:name>ebike.pk</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(toW3cDate(blog.createdAt))}</news:publication_date>
      <news:title>${escapeXml(blog.blogTitle || '')}</news:title>
    </news:news>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900',
    },
  });
}
