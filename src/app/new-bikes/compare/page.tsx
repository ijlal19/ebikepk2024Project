import type { Metadata } from 'next';
import { Suspense } from 'react';
import NewBikeCompare from '@/ebikeWeb/pageLayouts/new-bike-compare';
import { SITE_URL } from '@/app/metadata-utils';

export const metadata: Metadata = {
  title: 'Compare New Bikes & Electric Bikes in Pakistan | ebike.pk',
  description: 'Compare two new bikes or electric bikes in Pakistan by brand, price, engine, battery, range, charging time, tyres and other specifications.',
  alternates: {
    canonical: `${SITE_URL}/new-bikes/compare`,
  },
};

export default function NewBikeComparePage() {
  return (
    <Suspense fallback={null}>
      <NewBikeCompare />
    </Suspense>
  );
}
