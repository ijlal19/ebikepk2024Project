'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Pagination,
  CircularProgress
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './index.module.scss'
import { postSearch, priceWithCommas, postSearchNew } from '@/genericFunctions/geneFunc'

/* ---------------------------------------------
   Types (optional but recommended)
---------------------------------------------- */
type SectionKey =
  | 'used_bikes'
  | 'new_bikes'
  | 'blogs'
  | 'dealers'
  | 'mechanics'

const PAGE_LIMIT = 10

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryFromUrl = searchParams.get('query') || ''

  const [query, setQuery] = useState(queryFromUrl)
  const [loading, setLoading] = useState(false)

  const [results, setResults] = useState<any>(null)

  const [pages, setPages] = useState<Record<SectionKey, number>>({
    used_bikes: 1,
    new_bikes: 1,
    blogs: 1,
    dealers: 1,
    mechanics: 1
  })

  /* ---------------------------------------------
     Fetch Search Results
  ---------------------------------------------- */
  const fetchSearch = async () => {
    if (!query.trim()) return

    setLoading(true)

    const payload = {
      search: query,
      page: 1,
      limit: PAGE_LIMIT
    }

    const res = await postSearchNew(payload)

    setResults(res?.results || null)
    setLoading(false)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ---------------------------------------------
     On URL Query Change
  ---------------------------------------------- */
  useEffect(() => {
    if (queryFromUrl) {
      setQuery(queryFromUrl)
      fetchSearch()
    }
  }, [queryFromUrl])

  /* ---------------------------------------------
     Submit Search
  ---------------------------------------------- */
  const handleSearch = () => {
    if (!query.trim()) return

    router.push(`/search?query=${encodeURIComponent(query)}`)
  }

  /* ---------------------------------------------
     Helpers
  ---------------------------------------------- */
  const hasAnyResult =
    results &&
    Object.values(results).some((section: any) => section?.total > 0)

  /* ---------------------------------------------
     Renderers
  ---------------------------------------------- */

  let ebike_logo = "https://res.cloudinary.com/dzfd4phly/image/upload/v1727251053/Untitled-2_gsuasa.png"

  const Section = ({
    title,
    sectionKey,
    renderItem,
    viewAllUrl
  }: {
    title: string
    sectionKey: SectionKey
    renderItem: (item: any) => React.ReactNode
    viewAllUrl: string
  }) => {
    const section = results?.[sectionKey]

    if (!section || section.total === 0) return null

    const totalPages = Math.ceil(section.total / PAGE_LIMIT)

    return (
      <Box className={styles.section}>
        <Box className={styles.sectionHeader}>
          <Typography variant="h5">{title}</Typography>
          <Button onClick={() => router.push(viewAllUrl)}>View All</Button>
        </Box>

        <Box className={styles.grid}>
          {section.data.map((item: any) => renderItem(item))}
        </Box>

        {/* {totalPages > 1 && (
          <Pagination
            className={styles.pagination}
            count={totalPages}
            page={pages[sectionKey]}
            onChange={(_, page) =>
              setPages(prev => ({ ...prev, [sectionKey]: page }))
            }
          />
        )} */}
      </Box>
    )
  }

  /* ---------------------------------------------
     JSX
  ---------------------------------------------- */
  return (
    <Box className={styles.main}>
      {/* Search Bar */}
      <Box className={styles.searchBar}>
        <input
          placeholder="Search bikes, blogs, dealers…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>
          <SearchIcon />
        </Button>
      </Box>

      {/* Loader */}
      {loading && (
        <Box className={styles.loader}>
          <CircularProgress />
        </Box>
      )}

      {/* No Results */}
      {!loading && query && !hasAnyResult && (
        <Typography className={styles.noResult}>
          No results found for “{query}”
        </Typography>
      )}

      {/* Results */}
      {!loading && results && (
        <>
          {/* Used Bikes */}
          <Section
            title="Used Bikes"
            sectionKey="used_bikes"
            viewAllUrl={`/used-bikes}`}
            renderItem={(bike: any) => (
              <Box
                key={bike.id}
                className={styles.card}
                onClick={() =>
                  router.push(`/used-bikes/${bike.title
                    .toLowerCase()
                    .replaceAll(' ', '-')}/${bike.id}`)
                }
              >
                <img src={bike.images?.[0]} />
                <Typography>{bike.title}</Typography>
                <Typography>
                  PKR {priceWithCommas(bike.price)}
                </Typography>
              </Box>
            )}
          />

          {/* New Bikes */}
          <Section
            title="New Bikes"
            sectionKey="new_bikes"
            viewAllUrl={`/new-bikes`}
            renderItem={(bike: any) => (
              <Box key={bike.id} className={styles.card}>
                 <img src={bike.images?.[0]} />
                <Typography>{bike.title}</Typography>
                <Typography>
                  PKR {priceWithCommas(bike.price)}
                </Typography>
              </Box>
            )}
          />

          {/* Blogs */}
          <Section
            title="Blogs"
            sectionKey="blogs"
            viewAllUrl={`/blogs}`}
            renderItem={(blog: any) => (
              <Box key={blog.id} className={styles.card}>
                <img src={blog.featuredImage?.split('#$#')[0]?.trim()} />
                <Typography>{blog.blogTitle}</Typography>
              </Box>
            )}
          />

          {/* Dealers */}
          <Section
            title="Dealers"
            sectionKey="dealers"
            viewAllUrl={`/dealers`}
            renderItem={(d: any) => (
              <Box key={d.id} className={styles.card}>
                 <img src={ebike_logo} />
                <Typography>{d.shop_name}</Typography>
                <Typography>{d.phone}</Typography>
              </Box>
            )}
          />

          {/* Mechanics */}
          <Section
            title="Mechanics"
            sectionKey="mechanics"
            viewAllUrl={`/mechanics`}
            renderItem={(m: any) => (
              <Box key={m.id} className={styles.card}>
                 <img src={ebike_logo} />
                <Typography>{m.shop_name}</Typography>
                <Typography>{m.phone}</Typography>
              </Box>
            )}
          />
        </>
      )}
    </Box>
  )
}
