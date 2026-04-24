export type BlogVisibilityItem = {
  isHidden?: boolean | null;
};

export function isBlogVisible<T extends BlogVisibilityItem>(blog: T | null | undefined): blog is T {
  return Boolean(blog) && blog?.isHidden !== true;
}

export function filterVisibleBlogs<T extends BlogVisibilityItem>(blogs: T[] | null | undefined): T[] {
  if (!Array.isArray(blogs)) {
    return [];
  }

  return blogs.filter(isBlogVisible);
}
