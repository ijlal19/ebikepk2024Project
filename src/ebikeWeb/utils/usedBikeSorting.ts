type DatedBikeAd = {
  createdAt?: string | number | Date | null;
  id?: string | number | null;
};

function getCreatedTime(ad: DatedBikeAd) {
  const value = ad?.createdAt;
  if (value === undefined || value === null || value === '') return 0;
  const timestamp = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function sortUsedBikeAdsNewestFirst<T extends DatedBikeAd>(ads: T[]): T[] {
  return [...ads].sort((a, b) => {
    const dateDifference = getCreatedTime(b) - getCreatedTime(a);
    if (dateDifference !== 0) return dateDifference;
    return (Number(b?.id) || 0) - (Number(a?.id) || 0);
  });
}
