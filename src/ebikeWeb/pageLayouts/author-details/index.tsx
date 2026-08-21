'use client';
import { getAuthorBlogs, getAuthorById } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { add3Dots, cloudinaryLoader, timeAgo } from '@/genericFunctions/geneFunc';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const slugifyText = (value: any) => String(value || '')
  .trim()
  .replace(/\s+/g, '-')
  .toLowerCase()
  .replaceAll('?', '');

const AuthorDetails = () => {
  const [author, setAuthor] = useState<any>(null);
  const [authorBlogs, setAuthorBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      fetchAuthor(id);
    }
  }, [id]);

  const fetchAuthor = async (authorId: any) => {
    setIsLoading(true);
    const [authorRes, blogsRes] = await Promise.all([
      getAuthorById(authorId),
      getAuthorBlogs(authorId),
    ]);

    if (authorRes && !authorRes.message) {
      setAuthor(authorRes);
    }

    const blogList = Array.isArray(blogsRes)
      ? blogsRes
      : Array.isArray(blogsRes?.data)
        ? blogsRes.data
        : Array.isArray(blogsRes?.blogs)
          ? blogsRes.blogs
          : [];

    setAuthorBlogs(blogList.filter((blog: any) => blog?.isHidden !== true));
    setIsLoading(false);
  };

  const getBlogRoute = (blogInfo: any) => {
    const category = blogInfo?.blog_category?.name || blogInfo?.category || 'blog';
    const title = blogInfo?.blogTitle || blogInfo?.title || 'blog';

    return `/blog/${slugifyText(category)}/${slugifyText(title)}/${blogInfo?.id}`;
  };

  const getBlogImage = (blog: any) => {
    const firstImage = blog?.featuredImage?.split(' #$# ')[0]?.trim();
    if (!firstImage) {
      return '';
    }

    return cloudinaryLoader(firstImage, 500, 'auto');
  };

  const profileImage = author?.profileImage ? cloudinaryLoader(author.profileImage, 300, 'auto') : '';
  const initials = author?.name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((item: string) => item.charAt(0))
    .join('');

  return (
    <main className={styles.author_details_main}>
      {!isLoading ? (
        author ? (
          <article className={styles.author_card}>
            <button type="button" className={styles.back_button} onClick={() => router.back()}>
              <span className={styles.back_icon} aria-hidden="true" />
              Back
            </button>

            <header className={styles.profile_header}>
              <div className={styles.avatarWrap}>
                {profileImage ? (
                  <div
                    className={styles.avatarImage}
                    style={{ backgroundImage: `url("${profileImage}")` }}
                    role="img"
                    aria-label={author.name}
                  />
                ) : (
                  <span className={styles.avatarInitials}>{initials}</span>
                )}
              </div>
              <div className={styles.profile_text}>
                <p className={styles.eyebrow}>Author Profile</p>
                <h1 className={styles.name}>{author.name}</h1>
                {(author.designation || author.company) && (
                  <p className={styles.role}>
                    {[author.designation, author.company].filter(Boolean).join(' at ')}
                  </p>
                )}
              </div>
            </header>

            {author.bio && (
              <section className={styles.section}>
                <h2 className={styles.section_title}>About</h2>
                <p className={styles.bio}>{author.bio}</p>
              </section>
            )}

            <section className={`${styles.section} ${styles.blog_section}`}>
              <div className={styles.blog_heading_row}>
                <h2 className={styles.section_title}>{author.name} Blogs</h2>
                <span>{authorBlogs.length} Articles</span>
              </div>

              {authorBlogs.length > 0 ? (
                <div className={styles.blog_list}>
                  {authorBlogs.map((blog: any, index: number) => {
                    const blogImage = getBlogImage(blog);

                    return (
                      <Link href={getBlogRoute(blog)} className={styles.blog_item} key={blog?.id || index}>
                        {blogImage ? (
                          <img src={blogImage} alt={blog?.blogTitle || 'Author blog'} className={styles.blog_image} />
                        ) : (
                          <span className={styles.blog_image_placeholder}>Blog</span>
                        )}
                        <span className={styles.blog_content}>
                          <strong>{add3Dots(blog?.blogTitle || blog?.title || 'Untitled Blog', 78)}</strong>
                          <small>
                            {[blog?.blog_category?.name, blog?.createdAt ? timeAgo(blog.createdAt) : ''].filter(Boolean).join(' | ')}
                          </small>
                          {(blog?.meta_description || blog?.blogDescription) && (
                            <em>{add3Dots(blog?.meta_description || blog?.blogDescription, 150)}</em>
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.no_blogs}>No blogs found for this author.</div>
              )}
            </section>
          </article>
        ) : (
          <div className={styles.empty_state}>Author not found</div>
        )
      ) : (
        <div className={styles.load_main}>
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
        </div>
      )}
    </main>
  );
};

export default AuthorDetails;
