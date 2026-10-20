'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, CircularProgress } from '@mui/material'
import {
  Search, ArrowForward, TwoWheelerOutlined, SellOutlined,
  ArticleOutlined, StorefrontOutlined, BuildOutlined, SearchOff,
  PhoneOutlined, ChevronRight, HomeOutlined, Refresh,
} from '@mui/icons-material'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './index.module.scss'
import { postSearchNew, formatUsedBikePrice, cloudinaryLoader } from '@/genericFunctions/geneFunc'
import { filterVisibleBlogs } from '@/ebikeWeb/utils/blogVisibility'
import { buildBlogPath } from '@/app/metadata-utils'

type SectionKey = 'used_bikes' | 'new_bikes' | 'blogs' | 'dealers' | 'mechanics'
type Category = 'all' | SectionKey
const PAGE_LIMIT = 10
const EBikeLogo = 'https://res.cloudinary.com/dzfd4phly/image/upload/c_limit,f_auto,q_auto,w_180/v1727251053/Untitled-2_gsuasa.png'
const sections = [
  { key: 'used_bikes', title: 'Used Bikes', description: 'Explore pre-owned bikes from sellers across Pakistan.', icon: SellOutlined, url: '/used-bikes' },
  { key: 'new_bikes', title: 'New Bikes', description: 'Compare models, prices and specifications.', icon: TwoWheelerOutlined, url: '/new-bikes' },
  { key: 'blogs', title: 'Articles & News', description: 'The latest stories, guides and updates for riders.', icon: ArticleOutlined, url: '/blog' },
  { key: 'dealers', title: 'Dealers', description: 'Find a showroom for your next bike.', icon: StorefrontOutlined, url: '/dealers' },
  { key: 'mechanics', title: 'Mechanics', description: 'Discover workshops and bike service providers.', icon: BuildOutlined, url: '/mechanics' },
] as const

const slugify = (value: string) => String(value || '').trim().toLowerCase().replace(/\s+/g, '-')

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryFromUrl = (searchParams.get('query') || '').trim()
  const [query, setQuery] = useState(queryFromUrl)
  const [loading, setLoading] = useState(Boolean(queryFromUrl))
  const [results, setResults] = useState<any>(null)
  const [category, setCategory] = useState<Category>('all')
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let cancelled = false
    setQuery(queryFromUrl)
    setCategory('all')
    setResults(null)
    setError(false)
    if (!queryFromUrl) {
      setLoading(false)
      return
    }
    setLoading(true)
    const fetchResults = async () => {
      try {
        const response = await postSearchNew({ search: queryFromUrl, page: 1, limit: PAGE_LIMIT })
        if (cancelled) return
        if (!response?.results) throw new Error('Search unavailable')
        const nextResults = { ...response.results }
        if (nextResults.blogs) {
          const visibleBlogs = filterVisibleBlogs(nextResults.blogs.data)
          nextResults.blogs = { ...nextResults.blogs, data: visibleBlogs, total: visibleBlogs.length }
        }
        setResults(nextResults)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchResults()
    return () => { cancelled = true }
  }, [queryFromUrl, retry])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const term = query.trim()
    if (!term) return
    if (term === queryFromUrl) setRetry(value => value + 1)
    else router.push(`/search?query=${encodeURIComponent(term)}`)
  }

  const getCount = (key: SectionKey) => Number(results?.[key]?.total) || 0
  const total = sections.reduce((sum, section) => sum + getCount(section.key), 0)
  const availableSections = sections.filter(section => getCount(section.key) > 0)

  const renderCard = (item: any, sectionKey: SectionKey) => {
    const isBike = sectionKey === 'used_bikes' || sectionKey === 'new_bikes'
    const isService = sectionKey === 'dealers' || sectionKey === 'mechanics'
    const title = isBike ? item.title : isService ? item.shop_name : item.blogTitle
    const url = sectionKey === 'used_bikes'
      ? `/used-bikes/${slugify(item.title)}/${item.id}`
      : sectionKey === 'new_bikes'
        ? `/new-bikes/${item.bike_brand?.brandName}/${item.bikeUrl || slugify(item.title)}/${item.id}`
        : sectionKey === 'blogs'
          ? buildBlogPath(item)
          : `/${sectionKey}/${slugify(item.shop_name)}/${item.id}`
    const image = isBike ? item.images?.[0] || item.img_url
      : isService ? item.bike_brand?.logoUrl
        : item.featuredImage?.split('#$#')[0]?.trim()
    const label = sectionKey === 'used_bikes' ? 'Used Bike' : sectionKey === 'new_bikes' ? 'New Bike'
      : sectionKey === 'blogs' ? 'Article' : sectionKey === 'dealers' ? 'Dealer' : 'Mechanic'

    return (
      <Link href={url} key={item.id} className={styles.card}>
        <div className={`${styles.imgWrap} ${sectionKey === 'new_bikes' || isService ? styles.containImage : ''}`}>
          <img src={image ? cloudinaryLoader(image, 480, 'auto') : EBikeLogo} alt={title || label} loading="lazy" onError={event => { if (event.currentTarget.src !== EBikeLogo) event.currentTarget.src = EBikeLogo }} />
          <span className={`${styles.tag} ${styles[sectionKey]}`}>{label}</span>
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {isBike && <p className={styles.price}>{formatUsedBikePrice(item.price)}</p>}
          {sectionKey === 'blogs' && item.authorname && <p className={styles.subText}>By {item.authorname}</p>}
          {isService && item.phone && <p className={styles.subText}><PhoneOutlined />{item.phone}</p>}
          <span className={styles.cardAction}>{sectionKey === 'blogs' ? 'Read more' : 'View details'}<ArrowForward /></span>
        </div>
      </Link>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/"><HomeOutlined />Home</Link><ChevronRight /><span aria-current="page">Search</span>
        </nav>

        <section className={styles.hero} aria-labelledby="search-title">
          <div className={styles.heroHeading}>
            <div><p className={styles.eyebrow}>EXPLORE EBIKE.PK</p><h1 id="search-title">Find your next ride & more</h1>
              <p className={styles.heroIntro}>Search bikes, expert articles, dealers and mechanics in one place.</p></div>
            <span className={styles.heroIcon} aria-hidden="true"><Search /></span>
          </div>
          <form className={styles.searchBar} onSubmit={handleSearch} role="search">
            <Search className={styles.inputIcon} />
            <input aria-label="Search bikes, articles, dealers and mechanics" placeholder="What are you looking for?" value={query} onChange={event => setQuery(event.target.value)} />
            <Button type="submit" disabled={!query.trim()}><Search /><span>Search</span></Button>
          </form>
        </section>

        {!loading && !error && total > 0 && (
          <>
            <div className={styles.resultSummary} aria-live="polite"><h2>Results for <span>“{queryFromUrl}”</span></h2><p>{total.toLocaleString()} {total === 1 ? 'result' : 'results'} across {availableSections.length} {availableSections.length === 1 ? 'category' : 'categories'}</p></div>
            <div className={styles.filters} aria-label="Filter search results">
              <button aria-pressed={category === 'all'} className={category === 'all' ? styles.selected : ''} onClick={() => setCategory('all')}>All results<span>{total.toLocaleString()}</span></button>
              {availableSections.map(section => {
                const Icon = section.icon
                return <button key={section.key} aria-pressed={category === section.key} className={category === section.key ? styles.selected : ''} onClick={() => setCategory(section.key)}><Icon />{section.title}<span>{getCount(section.key).toLocaleString()}</span></button>
              })}
            </div>
          </>
        )}

        <div className={styles.contentWrap}>
          <div className={styles.resultsColumn} aria-busy={loading}>
            {loading && <div className={styles.emptyState} role="status"><CircularProgress size={32} /><h2>Finding your matches</h2><p>Searching bikes, articles and local services…</p></div>}
            {!loading && error && <div className={styles.emptyState} role="alert"><SearchOff /><h2>Search is unavailable</h2><p>We couldn’t load your results. Please try again.</p><Button onClick={() => setRetry(value => value + 1)} startIcon={<Refresh />}>Try again</Button></div>}
            {!loading && !error && total === 0 && <div className={styles.emptyState}><SearchOff /><h2>{queryFromUrl ? `No matches for “${queryFromUrl}”` : 'Your next ride starts here'}</h2><p>{queryFromUrl ? 'Try a different spelling, a bike model or a broader search term.' : 'Enter a brand, model or keyword to explore ebike.pk.'}</p><div className={styles.suggestions}>{['Honda', 'Yamaha', 'Suzuki'].map(term => <Link key={term} href={`/search?query=${term}`}><Search />{term}</Link>)}</div></div>}
            {!loading && !error && availableSections.filter(section => category === 'all' || category === section.key).map(section => {
              const Icon = section.icon
              return (
                <section key={section.key} className={styles.section} aria-labelledby={`results-${section.key}`}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionHeading}><span className={styles.sectionIcon}><Icon /></span><div><h2 id={`results-${section.key}`}>{section.title}<span>{getCount(section.key).toLocaleString()}</span></h2><p>{section.description}</p></div></div>
                    <Link href={section.url} className={styles.viewAll}>View all<ArrowForward /></Link>
                  </div>
                  <div className={styles.grid}>{(results?.[section.key]?.data || []).map((item: any) => renderCard(item, section.key))}</div>
                </section>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
