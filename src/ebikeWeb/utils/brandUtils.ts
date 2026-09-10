export type BrandOption = {
  id?: number;
  brandName?: string;
  logoUrl?: string;
  focus_keyword?: string | null;
  [key: string]: any;
};

const hiddenBrandNames = new Set([
  'sport',
  'sports',
  'china',
  'eagle',
]);

const topBrandPriority = [
  'honda',
  'yamaha',
  'suzuki',
  'road_prince',
  'united',
  'super_power',
  'unique',
  'crown',
  'hi_speed',
  'metro',
  'kawasaki',
  'benelli',
  'bmw',
  'kymco',
  'vlektra',
  'evee',
];

export function normalizeBrandName(brandName?: string) {
  return brandName?.trim()?.toLowerCase() || '';
}

function normalizeBrandKey(brandName?: string) {
  return normalizeBrandName(brandName).replace(/[\s-]+/g, '_');
}

export function isHiddenBrand(brand: BrandOption) {
  return hiddenBrandNames.has(normalizeBrandName(brand?.brandName));
}

export function isElectricBrand(brand: BrandOption) {
  return brand?.focus_keyword?.toLowerCase?.().includes('electric-bike') || false;
}

export function getVisibleBrands(brands: BrandOption[] = []) {
  return brands.filter((brand) => brand?.brandName && !isHiddenBrand(brand));
}

export function sortBrandsByName(brands: BrandOption[] = []) {
  return [...brands].sort((a, b) => (a?.brandName || '').localeCompare(b?.brandName || ''));
}

export function sortBrandsByPriority(brands: BrandOption[] = []) {
  const priorityMap = new Map(topBrandPriority.map((brandName, index) => [brandName, index]));

  return [...brands].sort((a, b) => {
    const aPriority = priorityMap.get(normalizeBrandKey(a?.brandName));
    const bPriority = priorityMap.get(normalizeBrandKey(b?.brandName));

    if (aPriority !== undefined && bPriority !== undefined) return aPriority - bPriority;
    if (aPriority !== undefined) return -1;
    if (bPriority !== undefined) return 1;

    return (a?.brandName || '').localeCompare(b?.brandName || '');
  });
}

export function getBrandSlug(brandName?: string) {
  return normalizeBrandName(brandName)
    .replaceAll('&', 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
