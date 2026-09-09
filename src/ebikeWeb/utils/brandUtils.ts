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

export function normalizeBrandName(brandName?: string) {
  return brandName?.trim()?.toLowerCase() || '';
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

export function getBrandSlug(brandName?: string) {
  return normalizeBrandName(brandName)
    .replaceAll('&', 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
