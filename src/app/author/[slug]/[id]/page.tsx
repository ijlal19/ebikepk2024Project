import AuthorDetails from '@/ebikeWeb/pageLayouts/author-details';
import { Metadata } from 'next';
import { getAuthorById } from '@/ebikeWeb/functions/globalFuntions';
import { DEFAULT_SHARE_IMAGE, SITE_URL, slugify, toSecureUrl, trimText } from '@/app/metadata-utils';

type Props = {
  params: { id: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorById(params.id);
  const authorName = author?.name || 'Author';
  const title = author?.metaTitle || `${authorName} Blogs and Author Profile`;
  const description = trimText(author?.metaDescription || author?.bio || `Read latest motorcycle and electric bike blogs by ${authorName} on ebike.pk.`);
  const canonicalSlug = author?.slug || params.slug || slugify(authorName);
  const canonicalUrl = `${SITE_URL}/author/${canonicalSlug}/${params.id}`;
  const imageUrl = author?.profileImage ? toSecureUrl(author.profileImage) : DEFAULT_SHARE_IMAGE;

  return {
    title: `${title} | ebike.pk`,
    description,
    authors: [{ name: authorName, url: canonicalUrl }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ebike.pk`,
      description,
      url: canonicalUrl,
      siteName: 'ebike.pk',
      type: 'profile',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: authorName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ebike.pk`,
      description,
      images: [imageUrl],
    },
  };
}

export default function AuthorPage() {
  return <AuthorDetails />;
}
