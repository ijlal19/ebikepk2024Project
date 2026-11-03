import Directory from '@/ebikeWeb/sharedComponents/business-directory/Directory';
import { Business } from '@/ebikeWeb/sharedComponents/business-directory/utils';

type Props = { featuredMechanic: Business[]; mechanic: Business[]; seoHeading?: string; seoIntro?: string; seoTags?: string[] };

export default function Mechanic({ featuredMechanic, mechanic }: Props) {
  return <Directory kind="mechanic" items={Array.isArray(mechanic) ? mechanic : []} featured={Array.isArray(featuredMechanic) ? featuredMechanic : []} />;
}
