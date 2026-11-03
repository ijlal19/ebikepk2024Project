'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowForward, BuildOutlined, ChevronLeft, ChevronRight, Close, LocationOnOutlined, Search, StorefrontOutlined, Tune } from '@mui/icons-material';
import { getMechanicTypeFilterOptions, matchesMechanicType, MechanicTypeFilter } from '@/constants/mechanicType';
import BusinessCard from './BusinessCard';
import { brandLabel, Business, BusinessKind, uniqueBusinesses } from './utils';
import styles from './index.module.scss';

type Props = { kind: BusinessKind; items: Business[]; featured: Business[] };
const PAGE_SIZE = 12;

export default function Directory({ kind, items, featured }: Props) {
  const isDealer = kind === 'dealer';
  const plural = isDealer ? 'dealers' : 'mechanics';
  const label = isDealer ? 'Dealers' : 'Mechanics';
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [brand, setBrand] = useState('all');
  const [type, setType] = useState<MechanicTypeFilter>('all');
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState('default');
  const businesses = useMemo(() => uniqueBusinesses([...items, ...featured].filter(item => item.is_approved !== false)), [items, featured]);
  const cities = useMemo(() => Array.from(new Set(businesses.map(item => item.city?.city_name).filter(Boolean) as string[])).sort(), [businesses]);
  const brands = useMemo(() => Array.from(new Set(businesses.map(item => item.bike_brand?.brandName).filter(Boolean) as string[])).sort(), [businesses]);
  const featuredIds = useMemo(() => new Set(featured.map(item => String(item.id))), [featured]);
  const filtered = useMemo(() => {
    const result = businesses.filter(item => matchesMechanicType(item, type)
      && (city === 'all' || item.city?.city_name === city)
      && (brand === 'all' || item.bike_brand?.brandName === brand)
      && [item.shop_name, item.address, item.city?.city_name, item.bike_brand?.brandName].filter(Boolean).join(' ').toLowerCase().includes(query.trim().toLowerCase()));
    if (sort === 'name') result.sort((a, b) => (a.shop_name || '').localeCompare(b.shop_name || ''));
    return result;
  }, [businesses, type, city, brand, query, sort]);
  const featuredResults = filtered.filter(item => featuredIds.has(String(item.id))).slice(0, 3);
  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(pages, 1));
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeFilters = Number(city !== 'all') + Number(brand !== 'all') + Number(type !== 'all');
  const reset = () => { setQuery(''); setCity('all'); setBrand('all'); setType('all'); setSort('default'); setPage(1); };
  const changePage = (value: number) => { setPage(value); document.getElementById('directory-results')?.scrollIntoView({ behavior: 'auto', block: 'start' }); };

  return <main className={styles.page}>
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight /><span aria-current="page">{label}</span></nav>
      <section className={styles.directoryHero} aria-labelledby="directory-title">
        <div className={styles.heroCopy}><span className={styles.eyebrow}>YOUR NEXT STOP STARTS HERE</span><h1 id="directory-title">{isDealer ? 'Find your next ride.' : 'Keep your ride ready.'}<br /><span>{isDealer ? 'Meet the dealers.' : 'Find a mechanic.'}</span></h1><p>{isDealer ? 'Explore motorcycle showrooms and electric bike dealers across Pakistan. Find a brand, choose your city and connect directly.' : 'Explore motorcycle workshops and electric bike mechanics across Pakistan. Find a workshop in your city and get in touch.'}</p><div className={styles.heroNumbers}><span><strong>{businesses.length.toLocaleString()}</strong>{label} listed</span><span><strong>{cities.length}</strong>Cities covered</span><span><strong>{brands.length}</strong>Bike brands</span></div></div>
        <div className={styles.heroGraphic} aria-hidden="true"><div className={styles.graphicOrbit} /><div className={styles.graphicIcon}>{isDealer ? <StorefrontOutlined /> : <BuildOutlined />}</div><div className={styles.graphicLabel}><LocationOnOutlined /><span>LOCAL CONNECTIONS<br /><strong>Across Pakistan</strong></span></div></div>
      </section>
      <div className={styles.searchBar}><label><Search /><span className={styles.srOnly}>Search {plural}</span><input type="search" value={query} placeholder={`Search by ${isDealer ? 'showroom' : 'workshop'}, brand or location…`} onChange={event => { setQuery(event.target.value); setPage(1); }} /></label><div className={styles.searchHint}><LocationOnOutlined />{city === 'all' ? 'All Pakistan' : city}</div></div>
      <div className={styles.directoryLayout}>
        <aside className={styles.directorySidebar}>
          <button className={styles.mobileFilterButton} aria-expanded={mobileFilters} aria-controls="business-filters" onClick={() => setMobileFilters(!mobileFilters)}><Tune />Filter {plural}{activeFilters > 0 && <span>{activeFilters}</span>}{mobileFilters ? <Close /> : <ChevronRight />}</button>
          <section id="business-filters" className={`${styles.filterPanel} ${mobileFilters ? styles.filtersOpen : ''}`} aria-label="Filter businesses"><div className={styles.filterHeading}><h2><Tune />Refine your search</h2><button onClick={reset}>Reset</button></div><label className={styles.filterLabel}>City<select value={city} onChange={event => { setCity(event.target.value); setPage(1); }}><option value="all">All cities</option>{cities.map(value => <option key={value} value={value}>{value}</option>)}</select></label><label className={styles.filterLabel}>Bike brand<select value={brand} onChange={event => { setBrand(event.target.value); setPage(1); }}><option value="all">All brands</option>{brands.map(value => <option key={value} value={value}>{brandLabel(value)}</option>)}</select></label><div className={styles.filterTip}><LocationOnOutlined /><p>Choose your city to find {isDealer ? 'showrooms' : 'workshops'} closer to you.</p></div></section>
          <section className={styles.registerPanel}><span className={styles.kicker}>GROW YOUR BUSINESS</span><h2>{isDealer ? 'Own a showroom?' : 'Run a workshop?'}</h2><p>Help riders find your business. Add your location and contact details to ebike.pk.</p><Link href={`/${plural}/register`}>Register your {kind === 'dealer' ? 'dealership' : 'workshop'} <ArrowForward /></Link></section>
          <div className={styles.crossLink}><span>{isDealer ? 'Need a repair instead?' : 'Looking for a new bike?'}</span><Link href={isDealer ? '/mechanics' : '/dealers'}>Explore {isDealer ? 'mechanics' : 'dealers'} <ArrowForward /></Link></div>
        </aside>
        <div className={styles.resultsColumn}>
          <div className={styles.typeTabs} aria-label={`${kind} type`}>{getMechanicTypeFilterOptions(kind).map(option => <button key={option.value} className={type === option.value ? styles.activeTab : ''} aria-pressed={type === option.value} onClick={() => { setType(option.value); setPage(1); }}>{option.label}</button>)}</div>
          {featuredResults.length > 0 && <section className={styles.featuredSection} aria-labelledby="featured-title"><div className={styles.sectionHeading}><div><span className={styles.kicker}>IN THE SPOTLIGHT</span><h2 id="featured-title">Featured {plural}</h2></div><span className={styles.count}>{featuredResults.length} featured</span></div><div className={styles.featuredGrid}>{featuredResults.map(item => <BusinessCard key={item.id} business={item} kind={kind} featured />)}</div></section>}
          <section id="directory-results" className={styles.resultsSection} aria-labelledby="results-title"><div className={styles.sectionHeading}><div><span className={styles.kicker}>EXPLORE THE DIRECTORY</span><h2 id="results-title">{city === 'all' ? `All ${plural} in Pakistan` : `${label} in ${city}`}</h2><p role="status">{filtered.length ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length.toLocaleString()} ${plural}` : `No ${plural} match your search`}</p></div><label className={styles.sort}><span className={styles.srOnly}>Sort businesses</span><select value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="default">Default order</option><option value="name">Name: A to Z</option></select></label></div>
            {(query || activeFilters > 0) && <div className={styles.activeFilters}><span>Filtered results</span>{city !== 'all' && <button aria-label="Remove city filter" onClick={() => { setCity('all'); setPage(1); }}>{city}<Close /></button>}{brand !== 'all' && <button aria-label="Remove brand filter" onClick={() => { setBrand('all'); setPage(1); }}>{brandLabel(brand)}<Close /></button>}<button onClick={reset}>Clear all</button></div>}
            <div className={styles.cardGrid}>{visible.map(item => <BusinessCard key={item.id} business={item} kind={kind} featured={featuredIds.has(String(item.id))} />)}</div>
            {!visible.length && <div className={styles.empty}><Search /><h3>No {plural} found</h3><p>Try a different name, city or brand to broaden your search.</p><button onClick={reset}>Clear filters</button></div>}
            {pages > 1 && <nav className={styles.pagination} aria-label="Directory pagination"><button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} aria-label="Previous page"><ChevronLeft /></button>{Array.from({ length: pages }, (_, index) => index + 1).filter(value => value === 1 || value === pages || Math.abs(value - currentPage) <= 1).map((value, index, values) => <span key={value}>{index > 0 && value - values[index - 1] > 1 && <span className={styles.ellipsis}>…</span>}<button aria-label={`Page ${value}`} aria-current={currentPage === value ? 'page' : undefined} className={currentPage === value ? styles.currentPage : ''} onClick={() => changePage(value)}>{value}</button></span>)}<button disabled={currentPage === pages} onClick={() => changePage(currentPage + 1)} aria-label="Next page"><ChevronRight /></button></nav>}
          </section>
        </div>
      </div>
      <section className={styles.bottomBanner}><div><span className={styles.kicker}>A BETTER WAY TO CONNECT</span><h2>{isDealer ? 'Your next bike starts with a conversation.' : 'A little care goes a long way.'}</h2><p>{isDealer ? 'Check model availability and pricing with the showroom before your visit.' : 'Call ahead to discuss your bike, the work you need and workshop availability.'}</p><Link className={styles.mobileRegister} href={`/${plural}/register`}>Register your {isDealer ? 'dealership' : 'workshop'} <ArrowForward /></Link></div>{isDealer ? <StorefrontOutlined /> : <BuildOutlined />}</section>
    </div>
  </main>;
}
