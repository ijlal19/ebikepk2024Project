"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowForward, ChevronRight, ExpandLess, ExpandMore, LocationOnOutlined, Search, TwoWheelerOutlined } from '@mui/icons-material';
import { getdealerData, getnewBikeData } from '@/ebikeWeb/functions/globalFuntions';
import { cloudinaryLoader } from '@/genericFunctions/geneFunc';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import AdSense from '@/ebikeWeb/sharedComponents/googleAdsense/adsense';
import styles from './index.module.scss';

type Bike = {
  id?: number | string;
  title?: string;
  price?: number | string;
  bikeUrl?: string;
  img_url?: string;
  images?: string[];
  displacement?: string;
  transmission?: string;
  starting?: string;
  brandId?: number | string;
  bike_brand?: { brandName?: string; logoUrl?: string; description?: string };
};
type Dealer = { id: number | string; shop_name?: string; city?: { city_name?: string } };
const money = (price: number) => `PKR ${price.toLocaleString('en-PK')}`;
const priceOf = (bike: Bike) => Number(bike.price) > 0 && Number.isFinite(Number(bike.price)) ? Number(bike.price) : 0;
const imageOf = (bike?: Bike) => bike?.img_url || bike?.images?.[0] || '';
const placeholder = 'https://res.cloudinary.com/dtroqldun/image/upload/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png';

export default function AllNewBikes({ initialBrandData = [] }: { initialBrandData?: Bike[] }) {
  const params = useParams();
  const slug = String(params.slug || '');
  const [bikes, setBikes] = useState(initialBrandData);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(initialBrandData.length === 0);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;
    setQuery('');
    setSort('default');
    setExpanded(false);
    setDealers([]);
    async function load() {
      setLoading(initialBrandData.length === 0);
      const result = initialBrandData.length ? initialBrandData : await getnewBikeData({ brand: slug });
      if (!active) return;
      const nextBikes: Bike[] = Array.isArray(result) ? result : [];
      setBikes(nextBikes);
      setLoading(false);
      if (nextBikes[0]?.brandId) {
        const result = await getdealerData(nextBikes[0].brandId);
        if (active) setDealers(Array.isArray(result?.dealers) ? result.dealers : []);
      }
    }
    load();
    return () => { active = false; };
  }, [slug, initialBrandData]);

  const brand = bikes[0]?.bike_brand;
  const name = (brand?.brandName || slug).replace(/[_-]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
  const prices = bikes.map(priceOf).filter(price => price > 0);
  const capacities = bikes.map(bike => parseFloat((bike.displacement || '').replace(/,/g, ''))).filter(value => Number.isFinite(value) && value > 0);
  const description = (brand?.description || '').replace(/<p\b[^>]*>\s*(?:Powered by\s*)?<a[^>]*href="https:\/\/www.froala.com[\s\S]*?<\/p>/gi, '');
  const visibleBikes = useMemo(() => {
    const filtered = bikes.filter(bike => (bike.title || '').toLowerCase().includes(query.trim().toLowerCase()));
    if (sort === 'low' || sort === 'high') filtered.sort((a, b) => {
      const aPrice = priceOf(a), bPrice = priceOf(b);
      if (!aPrice) return bPrice ? 1 : 0;
      if (!bPrice) return -1;
      return sort === 'low' ? aPrice - bPrice : bPrice - aPrice;
    });
    if (sort === 'name') filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    return filtered;
  }, [bikes, query, sort]);
  const bikeHref = (bike: Bike) => `/new-bikes/${slug}/${bike.bikeUrl}/${bike.id}`;
  const resetFilters = () => { setQuery(''); setSort('default'); };

  if (loading) return <div className={styles.loading}><Loader isLoading /></div>;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link><ChevronRight /><Link href="/new-bikes">New Bikes</Link><ChevronRight /><span aria-current="page">{name}</span>
        </nav>
        <section className={styles.hero} aria-labelledby="brand-title">
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span /> THE {name.toUpperCase()} COLLECTION</div>
            <h1 id="brand-title">{name} bikes<br /><span>in Pakistan.</span></h1>
            <p>Find your next ride. Explore {name} models, compare prices and discover the specifications that matter to you.</p>
            <a href="#brand-models" className={styles.primaryButton}>Explore models <ArrowForward fontSize="small" /></a>
          </div>
          <div className={styles.heroVisual}>
            {brand?.logoUrl && <div className={styles.brandLogo}><img src={cloudinaryLoader(brand.logoUrl, 240, 'auto')} alt={`${name} logo`} /></div>}
            {imageOf(bikes[0]) ? <img className={styles.heroBike} src={cloudinaryLoader(imageOf(bikes[0]), 900, 'auto')} alt={bikes[0]?.title || `${name} motorcycle`} /> : <TwoWheelerOutlined className={styles.heroFallback} />}
            {bikes[0]?.title && <span className={styles.heroCaption}>{bikes[0].title}</span>}
          </div>
        </section>
        <div className={styles.stats}>
          <div><span>Models to explore</span><strong>{bikes.length.toString().padStart(2, '0')} <small>models</small></strong></div>
          <div><span>Starting price</span><strong>{prices.length ? money(Math.min(...prices)) : 'Price on request'}</strong></div>
          <div><span>Engine range</span><strong>{capacities.length ? `${Math.min(...capacities)}${Math.min(...capacities) !== Math.max(...capacities) ? ` – ${Math.max(...capacities)}` : ''} cc` : 'See model specs'}</strong></div>
        </div>
        <nav className={styles.sectionNav} aria-label="Brand sections"><a href="#brand-models">Bike models <span>{bikes.length}</span></a><a href="#brand-prices">Price list</a>{description && <a href="#about-brand">About {name}</a>}<Link href="/new-bikes/compare">Compare bikes <ArrowForward /></Link></nav>
        <div className={styles.content}>
          <div className={styles.mainColumn}>
            <section id="brand-models" className={styles.models} aria-labelledby="models-title">
              <div className={styles.sectionHeading}><div><span className={styles.kicker}>FIND YOUR RIDE</span><h2 id="models-title">{name} bike models</h2><p>Explore the range. Get to know every detail.</p></div><span className={styles.count}>{bikes.length} models</span></div>
              <div className={styles.toolbar}>
                <label className={styles.search}><Search /><span className={styles.srOnly}>Search {name} models</span><input type="search" placeholder="Search a model…" value={query} onChange={event => setQuery(event.target.value)} /></label>
                <label className={styles.sort}><span>Sort by</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="default">Default order</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option><option value="name">Name: A to Z</option></select></label>
              </div>
              <p className={styles.resultCount} role="status">Showing {visibleBikes.length} of {bikes.length} models</p>
              <div className={styles.cardGrid}>
                {visibleBikes.map(bike => <Link href={bikeHref(bike)} key={bike.id} className={styles.bikeCard}>
                  <div className={styles.bikeImage}><img src={cloudinaryLoader(imageOf(bike) || placeholder, 600, 'auto')} alt={bike.title || `${name} bike`} loading="lazy" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = placeholder; }} /></div>
                  <div className={styles.cardBody}><span className={styles.cardBrand}>{name}</span><h3>{bike.title}</h3><div className={styles.specs}>{[bike.displacement, bike.transmission, bike.starting].filter(Boolean).slice(0, 2).map((spec, index) => <span key={index}>{spec}</span>)}</div><div className={styles.cardFooter}><div><span>Price in Pakistan</span><strong>{priceOf(bike) ? money(priceOf(bike)) : 'Price on request'}</strong></div><span className={styles.cardArrow} aria-hidden="true"><ArrowForward fontSize="small" /></span></div></div>
                </Link>)}
              </div>
              {!visibleBikes.length && <div className={styles.empty}><TwoWheelerOutlined /><h3>{bikes.length ? 'No matching models' : 'No models available yet'}</h3><p>{bikes.length ? 'Try another model name or clear your search.' : `Explore other brands while we update the ${name} collection.`}</p>{bikes.length ? <button onClick={resetFilters}>Clear search</button> : <Link href="/new-bikes">Explore all brands</Link>}</div>}
            </section>
            {bikes.length > 0 && <section id="brand-prices" className={styles.panel} aria-labelledby="prices-title"><span className={styles.kicker}>AT A GLANCE</span><h2 id="prices-title">{name} bike price list</h2><p>Compare listed prices across the range.</p><div className={styles.tableWrap}><table><thead><tr><th scope="col">Model</th><th scope="col">Price in Pakistan</th></tr></thead><tbody>{bikes.map(bike => <tr key={bike.id}><td><Link href={bikeHref(bike)}>{bike.title}</Link></td><td>{priceOf(bike) ? money(priceOf(bike)) : 'Price on request'}</td></tr>)}</tbody></table></div><p className={styles.priceNote}>Prices may vary by dealer and location. Confirm the final price with your dealer.</p></section>}
            {description && <section id="about-brand" className={styles.panel} aria-labelledby="about-title"><span className={styles.kicker}>THE BRAND</span><h2 id="about-title">About {name}</h2><div id="brand-description" className={`${styles.description} ${expanded ? '' : styles.collapsed}`} dangerouslySetInnerHTML={{ __html: description }} /><button className={styles.readMore} onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="brand-description">{expanded ? 'Read less' : `More about ${name}`}{expanded ? <ExpandLess /> : <ExpandMore />}</button></section>}
          </div>
          <aside className={styles.sidebar}>
            <section className={styles.comparePanel}><div className={styles.iconTile}><TwoWheelerOutlined /></div><span className={styles.kicker}>MAKE AN INFORMED CHOICE</span><h2>Which bike<br />is right for you?</h2><p>Put your favourites side by side. Compare prices, engine specs and features before you decide.</p><Link href="/new-bikes/compare">Compare bikes <ArrowForward fontSize="small" /></Link></section>
            <section className={styles.dealerPanel}><LocationOnOutlined className={styles.dealerIcon} /><h2>{name} dealers</h2><p>Connect with a dealer for availability and pricing near you.</p>{dealers.slice(0, 3).map(dealer => <div className={styles.dealer} key={dealer.id}><strong>{dealer.shop_name}</strong>{dealer.city?.city_name && <span><LocationOnOutlined />{dealer.city.city_name}</span>}</div>)}<Link href="/dealers">Explore dealers <ArrowForward fontSize="small" /></Link></section>
            <div className={styles.ad}><span>ADVERTISEMENT</span><AdSense client="ca-pub-5167970563180610" slot="9214599249" style={{}} format="" responsive={false} adStyle={{ display: 'inline-block', width: '250px', height: '250px' }} /></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
