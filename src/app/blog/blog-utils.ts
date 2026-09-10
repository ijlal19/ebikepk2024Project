import { SITE_URL, slugify } from "@/app/metadata-utils";

const FALLBACK_BLOG_TAGS = [
  "Motorcycle News in Pakistan",
  "bike blogs Pakistan",
  "motorcycle reviews Pakistan",
  "bike safety tips",
  "bike maintenance guides",
  "electric bike news Pakistan",
];

const FALLBACK_BLOG_CATEGORIES = [
  "News",
  "Bike Care",
  "Electric Bike News",
  "Motorcycle Prices",
  "Pakistan Motorcycle News",
  "Safety",
];

function normalizeTag(value?: string | null) {
  return (value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function addUniqueTag(tags: string[], tag?: string | null) {
  const normalizedTag = normalizeTag(tag);

  if (!normalizedTag) {
    return;
  }

  const exists = tags.some((item) => item.toLowerCase() === normalizedTag.toLowerCase());
  if (!exists) {
    tags.push(normalizedTag);
  }
}

function buildDynamicBlogTags(blogs: any[] = [], limit = 6) {
  const tags: string[] = [];

  blogs.forEach((blog) => {
    addUniqueTag(tags, blog?.blog_category?.name);
  });

  FALLBACK_BLOG_CATEGORIES.forEach((tag) => addUniqueTag(tags, tag));

  return tags.slice(0, limit);
}

function buildBlogBreadcrumbItems(blog?: any) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
  ];

  const categoryName = normalizeTag(blog?.blog_category?.name);
  if (categoryName) {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: categoryName,
      item: `${SITE_URL}/blog/${slugify(categoryName)}`,
    });
  }

  const blogTitle = normalizeTag(blog?.blogTitle);
  if (blogTitle) {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: blogTitle,
      item: `${SITE_URL}/blog/${slugify(categoryName || "blog")}/${slugify(blogTitle)}/${blog?.id}`,
    });
  }

  return items;
}

export {
  FALLBACK_BLOG_TAGS,
  buildBlogBreadcrumbItems,
  buildDynamicBlogTags,
};
