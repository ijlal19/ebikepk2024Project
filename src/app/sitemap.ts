import type { MetadataRoute } from "next";
import Gconfig from "globalconfig";
import { BrandArr } from "@/ebikeWeb/constants/globalData";
import { SITE_URL } from "./metadata-utils";

export const revalidate = 3600;

type Brand = {
  id?: number | string;
  brandName?: string;
  updatedAt?: string;
  createdAt?: string;
};

type NewBike = {
  id?: number | string;
  updatedAt?: string;
  createdAt?: string;
  bike_brand?: {
    brandName?: string;
  };
  model?: {
    modelName?: string;
  };
};

type Blog = {
  id?: number | string;
  blogTitle?: string;
  updatedAt?: string;
  createdAt?: string;
  blog_category?: {
    name?: string;
  };
};

type Dealer = {
  id?: number | string;
  shop_name?: string;
  updatedAt?: string;
  createdAt?: string;
  is_approved?: boolean;
};

type Mechanic = {
  id?: number | string;
  shop_name?: string;
  updatedAt?: string;
  createdAt?: string;
  is_approved?: boolean;
};

function slugify(value?: string | number | null) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLastModified(value?: string | null) {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

async function fetchJson<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${Gconfig.ebikeApi}${endpoint}`, {
    ...init,
    next: { revalidate },
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  return response.json();
}

function buildStaticRoutes(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    // { url: `${SITE_URL}/home`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/used-bikes`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/used-bikes/sell-used-bike`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/new-bikes`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/new-bike-price`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/bike-videos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/dealers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/mechanics`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // { url: `${SITE_URL}/forum`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // { url: `${SITE_URL}/threads`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // { url: `${SITE_URL}/certified-bikes`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/mtmis-punjab`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/mtmis-sindh`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/mtmis-kpk`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/mtmis-islamabad`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/page/about-us/14`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    // { url: `${SITE_URL}/page/delete-my-data`, lastModified: now, changeFrequency: "yearly", priority: 0.2 }
  ];
}

function buildBrandRoutes(brands: Brand[]): MetadataRoute.Sitemap {
  return brands.flatMap((brand) => {
    const brandName = slugify(brand.brandName);
    if (!brandName || !brand.id) {
      return [];
    }

    const lastModified = toLastModified(brand.updatedAt || brand.createdAt);

    return [
      {
        url: `${SITE_URL}/new-bikes/${brandName}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8
      },
      {
        url: `${SITE_URL}/new-bike-price/${brand.id}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.75
      }
    ];
  });
}

function buildNewBikeRoutes(bikes: NewBike[]): MetadataRoute.Sitemap {
  return bikes.flatMap((bike) => {
    const brandName = slugify(bike?.bike_brand?.brandName);
    const modelName = slugify(bike?.model?.modelName);
    const bikeId = bike?.id;

    if (!brandName || !modelName || !bikeId) {
      return [];
    }

    return [
      {
        url: `${SITE_URL}/new-bikes/${brandName}/${modelName}/${bikeId}`,
        lastModified: toLastModified(bike.updatedAt || bike.createdAt),
        changeFrequency: "weekly",
        priority: 0.7
      }
    ];
  });
}

function buildBlogRoutes(blogs: Blog[]): MetadataRoute.Sitemap {
  return blogs.flatMap((blog) => {
    if (!blog?.id || !blog?.blogTitle || !blog?.blog_category?.name) {
      return [];
    }

    return [
      {
        url: `${SITE_URL}/blog/${slugify(blog.blog_category.name)}/${slugify(blog.blogTitle)}/${blog.id}`,
        lastModified: toLastModified(blog.updatedAt || blog.createdAt),
        changeFrequency: "weekly",
        priority: 0.7
      }
    ];
  });
}

function buildDealerRoutes(dealers: Dealer[]): MetadataRoute.Sitemap {
  return dealers.flatMap((dealer) => {
    if (!dealer?.id || !dealer?.shop_name || dealer?.is_approved === false) {
      return [];
    }

    return [
      {
        url: `${SITE_URL}/dealers/${slugify(dealer.shop_name)}/${dealer.id}`,
        lastModified: toLastModified(dealer.updatedAt || dealer.createdAt),
        changeFrequency: "weekly",
        priority: 0.65
      }
    ];
  });
}

function buildMechanicRoutes(mechanics: Mechanic[]): MetadataRoute.Sitemap {
  return mechanics.flatMap((mechanic) => {
    if (!mechanic?.id || !mechanic?.shop_name || mechanic?.is_approved === false) {
      return [];
    }

    return [
      {
        url: `${SITE_URL}/mechanics/${slugify(mechanic.shop_name)}/${mechanic.id}`,
        lastModified: toLastModified(mechanic.updatedAt || mechanic.createdAt),
        changeFrequency: "weekly",
        priority: 0.65
      }
    ];
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = buildStaticRoutes();
  const brandRoutes = buildBrandRoutes(BrandArr as Brand[]);

  try {
    const brands = (BrandArr as Brand[]).filter((brand) => brand?.brandName);
    const [blogs, dealers, mechanics, newBikeGroups] = await Promise.all([
      fetchJson<Blog[]>("blog/get-all-blog"),
      fetchJson<Dealer[]>("dealers/get-dealer"),
      fetchJson<Mechanic[]>("mechanic/get-mechanic"),
      Promise.all(
        brands.map((brand) =>
          fetchJson<NewBike[]>("new-bikes/get-new-bikes-by-brand/", {
            method: "POST",
            body: JSON.stringify({ brand: brand.brandName })
          }).catch(() => [])
        )
      )
    ]);

    return [
      ...staticRoutes,
      ...brandRoutes,
      ...buildNewBikeRoutes(newBikeGroups.flat()),
      ...buildBlogRoutes(Array.isArray(blogs) ? blogs : []),
      ...buildDealerRoutes(Array.isArray(dealers) ? dealers : []),
      ...buildMechanicRoutes(Array.isArray(mechanics) ? mechanics : [])
    ];
  } catch {
    return [
      ...staticRoutes,
      ...brandRoutes
    ];
  }
}
