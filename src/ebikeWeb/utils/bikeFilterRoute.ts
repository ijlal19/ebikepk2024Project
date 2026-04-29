import { BrandArr, CityArr, YearArr } from '@/ebikeWeb/constants/globalData';

export const ALL_FILTER_VALUE = 'all';

export function getBikeFilterSlug(value: string | number | null | undefined) {
  if (!value) return ALL_FILTER_VALUE;

  return String(value)
    .trim()
    .toLowerCase()
    .replaceAll('&', 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || ALL_FILTER_VALUE;
}

export function getBikeFilterUrl(brand = ALL_FILTER_VALUE, modal = ALL_FILTER_VALUE, city = ALL_FILTER_VALUE) {
  return `/bikes/${getBikeFilterSlug(brand)}/${getBikeFilterSlug(modal)}/${getBikeFilterSlug(city)}`;
}

export function getBikeFilterIds(params: { brand?: string; modal?: string; city?: string }) {
  const brandSlug = getBikeFilterSlug(params?.brand);
  const modalSlug = getBikeFilterSlug(params?.modal);
  const citySlug = getBikeFilterSlug(params?.city);

  const brand = BrandArr.find((item: any) => getBikeFilterSlug(item?.brandName) === brandSlug);
  const year = YearArr.find((item: any) => getBikeFilterSlug(item?.year) === modalSlug);
  const city = CityArr.find((item: any) => getBikeFilterSlug(item?.city_name) === citySlug);

  return {
    brand: brandSlug === ALL_FILTER_VALUE ? '' : brand?.id ? String(brand.id) : '',
    year: modalSlug === ALL_FILTER_VALUE ? '' : year?.id ? String(year.id) : '',
    city: citySlug === ALL_FILTER_VALUE ? '' : city?.id ? String(city.id) : '',
  };
}
