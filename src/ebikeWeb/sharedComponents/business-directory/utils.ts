export type BusinessKind = 'dealer' | 'mechanic';
export type Business = {
  id: number | string;
  shop_name?: string;
  address?: string;
  phone?: string | number;
  phone2?: string | number;
  brand_id?: number | string;
  city_id?: number | string;
  mechanic_type?: number | string;
  is_approved?: boolean;
  is_featured?: boolean;
  city?: { city_name?: string };
  bike_brand?: { brandName?: string; logoUrl?: string };
};

export function businessHref(business: Business, kind: BusinessKind) {
  const slug = (business.shop_name || kind).trim().replace(/\s+/g, '-').toLowerCase();
  return `/${kind === 'dealer' ? 'dealers' : 'mechanics'}/${encodeURIComponent(slug)}/${business.id}`;
}

export function brandLabel(value?: string) {
  return (value || '').replace(/[_-]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

export function phoneNumber(value?: string | number) {
  const phone = String(value || '').trim().replace(/[^\d+]/g, '');
  if (!phone || !/\d/.test(phone)) return '';
  if (phone.startsWith('+')) return phone;
  if (phone.startsWith('0092')) return `+${phone.slice(2)}`;
  if (phone.startsWith('92') && phone.length >= 12) return `+${phone}`;
  return phone.startsWith('0') ? phone : `0${phone}`;
}

export function mapHref(business: Business) {
  const location = [business.address, business.city?.city_name, 'Pakistan'].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.shop_name || ''}, ${location}`)}`;
}

export function uniqueBusinesses(items: Business[]) {
  return Array.from(new Map(items.map(item => [String(item.id), item])).values());
}
