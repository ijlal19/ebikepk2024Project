const priorityCityNames = [
  'karachi',
  'lahore',
  'islamabad',
  'rawalpindi',
  'faisalabad',
  'multan',
  'peshawer',
  'peshawar',
  'quetta',
  'hyderabad',
  'gujranwala',
  'sialkot',
  'sukkur',
  'bahawalpur',
  'sargodha',
];

function normalizeCityName(value?: string | null) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export function getSortedCityOptions(cities: any[] = []) {
  const uniqueCities = cities.filter((city, index, list) => {
    const cityName = normalizeCityName(city?.city_name || city?.cityName);
    if (!cityName) return false;

    return list.findIndex((item) => normalizeCityName(item?.city_name || item?.cityName) === cityName) === index;
  });

  return uniqueCities.sort((a, b) => {
    const aName = normalizeCityName(a?.city_name || a?.cityName);
    const bName = normalizeCityName(b?.city_name || b?.cityName);
    const aPriority = priorityCityNames.indexOf(aName);
    const bPriority = priorityCityNames.indexOf(bName);

    if (aPriority !== -1 || bPriority !== -1) {
      if (aPriority === -1) return 1;
      if (bPriority === -1) return -1;
      return aPriority - bPriority;
    }

    return aName.localeCompare(bName);
  });
}
