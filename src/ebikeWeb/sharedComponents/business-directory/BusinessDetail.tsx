'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowBack, ArrowForward, BuildOutlined, ChevronRight, LocationOnOutlined, NearMeOutlined, PhoneOutlined, StorefrontOutlined } from '@mui/icons-material';
import { getSimilarDealers, getSimilarMechanics, getSingleDealerDetails, getSingleMechanicsDetails } from '@/ebikeWeb/functions/globalFuntions';
import { getMechanicTypeLabel, matchesMechanicType } from '@/constants/mechanicType';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import BusinessCard, { BusinessLogo } from './BusinessCard';
import { brandLabel, Business, BusinessKind, mapHref, phoneNumber, uniqueBusinesses } from './utils';
import styles from './index.module.scss';

export default function BusinessDetail({ kind }: { kind: BusinessKind }) {
  const params = useParams();
  const id = String(kind === 'dealer' ? params.dealerid || '' : params.mechanicid || '');
  const isDealer = kind === 'dealer';
  const plural = isDealer ? 'dealers' : 'mechanics';
  const label = isDealer ? 'Dealers' : 'Mechanics';
  const [business, setBusiness] = useState<Business | null>(null);
  const [similar, setSimilar] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setBusiness(null);
      setSimilar([]);
      try {
        const result = await (isDealer ? getSingleDealerDetails(id) : getSingleMechanicsDetails(id));
        if (!active) return;
        if (!result?.id || !result?.shop_name) return;
        setBusiness(result);
        setLoading(false);
        if (result.brand_id) {
          const related = await (isDealer ? getSimilarDealers(result.brand_id) : getSimilarMechanics(result.brand_id));
          const entries = isDealer ? related?.dealers : related?.mechanics || related?.dealers;
          if (active) setSimilar(uniqueBusinesses(Array.isArray(entries) ? entries : []).filter(item => String(item.id) !== String(result.id) && item.is_approved !== false && matchesMechanicType(item, Number(result.mechanic_type) === 2 ? 2 : 1)).slice(0, 3));
        }
      } catch {
        // Keep a loaded profile available if related listings cannot be fetched.
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [id, isDealer, retry]);

  if (loading) return <main className={styles.loading}><Loader isLoading /><p>Loading {kind} details…</p></main>;
  if (!business) return <main className={styles.page}><div className={styles.container}><div className={styles.empty}><LocationOnOutlined /><h1>Business details unavailable</h1><p>We couldn’t load this listing. Try again or explore the directory.</p><button onClick={() => setRetry(value => value + 1)}>Try again</button><Link href={`/${plural}`}>Browse {plural} <ArrowForward /></Link></div></div></main>;

  const phone = phoneNumber(business.phone);
  const alternatePhone = phoneNumber(business.phone2);
  const city = business.city?.city_name;
  const brand = brandLabel(business.bike_brand?.brandName);
  const type = getMechanicTypeLabel(business.mechanic_type, kind);
  const hasLocation = Boolean(business.address || city);
  const maps = mapHref(business);

  return <main className={styles.page}><div className={styles.container}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight /><Link href={`/${plural}`}>{label}</Link><ChevronRight /><span aria-current="page">{business.shop_name}</span></nav>
    <Link className={styles.backLink} href={`/${plural}`}><ArrowBack />Back to all {plural}</Link>
    <section className={styles.detailHero} aria-labelledby="business-name"><div className={styles.detailIdentity}><BusinessLogo business={business} kind={kind} /><div><span className={styles.eyebrow}>{isDealer ? 'SHOWROOM & DEALERSHIP' : 'WORKSHOP & BIKE CARE'}</span><h1 id="business-name">{business.shop_name}</h1><div className={styles.detailBadges}><span>{type}</span>{brand && <span>{brand}</span>}{business.is_featured && <span>Featured listing</span>}</div>{city && <p><LocationOnOutlined />{city}, Pakistan</p>}</div></div><div className={styles.heroActions}>{phone && <a className={styles.primaryButton} href={`tel:${phone}`}><PhoneOutlined />Call {isDealer ? 'dealer' : 'workshop'}</a>}{hasLocation && <a className={styles.outlineButton} href={maps} target="_blank" rel="noopener noreferrer"><NearMeOutlined />Get directions</a>}</div></section>
    <div className={styles.detailLayout}><div className={styles.detailMain}>
      <section className={styles.infoPanel} aria-labelledby="overview-title"><span className={styles.kicker}>GET TO KNOW THE BUSINESS</span><h2 id="overview-title">{isDealer ? 'Dealership' : 'Workshop'} overview</h2><p className={styles.introText}>{business.shop_name} is listed as a {type.toLowerCase()}{city ? ` in ${city}` : ' in Pakistan'}{brand ? ` for ${brand} bikes` : ''}. {isDealer ? 'Contact the showroom to discuss available models, prices and your next visit.' : 'Contact the workshop to discuss repairs, servicing and availability for your bike.'}</p><dl className={styles.overviewGrid}><div><dt>Business type</dt><dd>{type}</dd></div><div><dt>Bike brand</dt><dd>{brand || 'Not specified'}</dd></div><div><dt>City</dt><dd>{city || 'Not specified'}</dd></div><div><dt>Country</dt><dd>Pakistan</dd></div></dl></section>
      <section className={styles.infoPanel} aria-labelledby="location-title"><span className={styles.kicker}>PLAN YOUR VISIT</span><h2 id="location-title">Location & address</h2><div className={styles.addressBlock}><div className={styles.infoIcon}><LocationOnOutlined /></div><div><strong>{business.shop_name}</strong><p>{business.address || 'Street address not provided.'}</p>{city && <span>{city}, Pakistan</span>}</div></div>{hasLocation && <a className={styles.locationCard} href={maps} target="_blank" rel="noopener noreferrer"><div className={styles.mapPattern} aria-hidden="true"><div /><LocationOnOutlined /></div><div><strong>Find your way there</strong><span>Open the location in Google Maps</span></div><ArrowForward /></a>}</section>
      <section className={styles.visitPanel}><div className={styles.infoIcon}>{isDealer ? <StorefrontOutlined /> : <BuildOutlined />}</div><div><h2>Before you visit</h2><p>{isDealer ? 'Call to confirm bike availability, current pricing and showroom hours.' : 'Call to confirm workshop hours, the work your bike needs and any parts required.'}</p></div></section>
    </div><aside className={styles.contactSidebar}><section className={styles.contactPanel}><span className={styles.kicker}>LET’S CONNECT</span><h2>Contact {isDealer ? 'the dealer' : 'the workshop'}</h2><p>Speak directly with the business to plan your visit.</p>{phone ? <a href={`tel:${phone}`} className={styles.phoneRow}><PhoneOutlined /><span><small>Phone number</small><strong>{phone}</strong></span><ArrowForward /></a> : <div className={styles.missingContact}>No phone number listed. {hasLocation ? 'Use the address to find this business.' : 'Explore other businesses in the directory.'}</div>}{alternatePhone && alternatePhone !== phone && <a href={`tel:${alternatePhone}`} className={styles.phoneRow}><PhoneOutlined /><span><small>Alternate number</small><strong>{alternatePhone}</strong></span><ArrowForward /></a>}{phone && <a className={styles.contactButton} href={`tel:${phone}`}><PhoneOutlined />Call now</a>}{hasLocation && <a className={styles.directionsButton} href={maps} target="_blank" rel="noopener noreferrer"><NearMeOutlined />Get directions</a>}</section><section className={styles.detailExplore}><h2>Explore more options</h2><p>Find more {isDealer ? 'showrooms and dealerships' : 'mechanics and workshops'} across Pakistan.</p><Link href={`/${plural}`}>Browse all {plural}<ArrowForward /></Link></section></aside></div>
    {similar.length > 0 && <section className={styles.relatedSection} aria-labelledby="related-title"><div className={styles.sectionHeading}><div><span className={styles.kicker}>KEEP EXPLORING</span><h2 id="related-title">More {brand ? `${brand} ` : ''}{plural}</h2><p>Other businesses you may want to explore.</p></div><Link href={`/${plural}`} className={styles.viewAll}>View all <ArrowForward /></Link></div><div className={styles.relatedGrid}>{similar.map(item => <BusinessCard key={item.id} business={item} kind={kind} />)}</div></section>}
  </div></main>;
}
