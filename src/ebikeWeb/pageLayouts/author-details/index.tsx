'use client';
import { getAuthorById } from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const socialLinks = [
  { key: 'websiteUrl', label: 'Website' },
  { key: 'facebookUrl', label: 'Facebook' },
  { key: 'twitterUrl', label: 'Twitter' },
  { key: 'linkedinUrl', label: 'LinkedIn' },
  { key: 'instagramUrl', label: 'Instagram' },
];

const AuthorDetails = () => {
  const [author, setAuthor] = useState<any>(null);
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
    const res = await getAuthorById(authorId);
    if (res && !res.message) {
      setAuthor(res);
    }
    setIsLoading(false);
  };

  const profileImage = author?.profileImage ? cloudinaryLoader(author.profileImage, 300, 'auto') : '';
  const visibleSocialLinks = socialLinks.filter((item) => author?.[item.key]);
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

            {(author.email || author.phone) && (
              <section className={styles.contact_grid} aria-label="Author contact information">
                {author.email && (
                  <a className={styles.contact_item} href={`mailto:${author.email}`}>
                    <small>Email</small>
                    <span>{author.email}</span>
                  </a>
                )}
                {author.phone && (
                  <a className={styles.contact_item} href={`tel:${author.phone}`}>
                    <small>Phone</small>
                    <span>{author.phone}</span>
                  </a>
                )}
              </section>
            )}

            {visibleSocialLinks.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.section_title}>Links</h2>
                <div className={styles.links_grid}>
                  {visibleSocialLinks.map((item) => (
                    <a key={item.key} className={styles.link_item} href={author[item.key]} target="_blank" rel="noreferrer">
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </section>
            )}
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
