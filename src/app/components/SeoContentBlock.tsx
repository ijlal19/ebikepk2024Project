import styles from './SeoContentBlock.module.scss';

type SeoContentBlockProps = {
  title: string;
  description: string;
  tags: string[];
  headingLevel?: 'h1' | 'h2';
  tagHrefPrefix?: string;
  formatTagHrefValue?: (tag: string) => string;
};

export default function SeoContentBlock({
  title,
  description,
  tags,
  headingLevel = 'h2',
  tagHrefPrefix,
  formatTagHrefValue = (tag) => tag,
}: SeoContentBlockProps) {
  const Heading = headingLevel;

  return (
    <section className={styles.seoBlock} aria-labelledby="page-seo-title">
      <Heading id="page-seo-title" className={styles.title}>
        {title}
      </Heading>
      <p className={styles.description}>{description}</p>
      {tags.length > 0 ? (
        <div className={styles.tags} aria-label="Popular searches">
          {tags.map((tag) => (
            tagHrefPrefix ? (
              <a className={styles.tag} href={`${tagHrefPrefix}${encodeURIComponent(formatTagHrefValue(tag))}`} key={tag}>
                {tag}
              </a>
            ) : (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            )
          ))}
        </div>
      ) : null}
    </section>
  );
}
