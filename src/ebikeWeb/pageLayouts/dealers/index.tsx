import Directory from '@/ebikeWeb/sharedComponents/business-directory/Directory';
import { Business } from '@/ebikeWeb/sharedComponents/business-directory/utils';

type Props = { featuredDelaer: Business[]; delaer: Business[]; seoHeading?: string; seoIntro?: string; seoTags?: string[] };

export default function Dealer({ featuredDelaer, delaer }: Props) {
  return <Directory kind="dealer" items={Array.isArray(delaer) ? delaer : []} featured={Array.isArray(featuredDelaer) ? featuredDelaer : []} />;
}
