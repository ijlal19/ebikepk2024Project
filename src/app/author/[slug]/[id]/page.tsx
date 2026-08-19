import AuthorDetails from '@/ebikeWeb/pageLayouts/author-details';
import { Metadata } from 'next';
import { getAuthorById } from '@/ebikeWeb/functions/globalFuntions';

type Props = {
  params: { id: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorById(params.id);
  const title = author?.metaTitle || author?.name || 'Author';
  const description = author?.metaDescription || author?.bio || `${author?.name || 'Author'} profile on ebike.pk`;

  return {
    title: `${title} | ebike.pk`,
    description,
  };
}

export default function AuthorPage() {
  return <AuthorDetails />;
}
