'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Pagination,
  CircularProgress,
  useMediaQuery
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './index.module.scss'
import { postSearch, postSearchNew } from '@/genericFunctions/geneFunc'
import { add3Dots, priceWithCommas, cloudinaryLoader, optimizeImage } from "@/genericFunctions/geneFunc";

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

  const isMobile = useMediaQuery('(max-width:768px)');

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

  const handleBlogRoute = (blogInfo: any) => {
    var title = blogInfo.blogTitle;
    title = title.replace(/\s+/g, '-');
    var lowerTitle = title.toLowerCase();
    lowerTitle = '' + lowerTitle.replaceAll("?", "")
    router.push(`/blog/${'general'}/${lowerTitle}/${blogInfo.id}`);
  };

  function dealerDetailPage(bike: any) {
    var shop_name = bike.shop_name;
    shop_name = shop_name.replace(/\s+/g, '-');
    var lowerTitle = shop_name.toLowerCase();
    router.push(`/dealers/${lowerTitle}/${bike.id}`)
  }

  function mechanicToDetailPage(bike: any) {
      var shop_name = bike.shop_name;
      shop_name = shop_name.replace(/\s+/g, '-');
      var lowerTitle = shop_name.toLowerCase();
      router.push(`/mechanics/${lowerTitle}/${bike.id}`)
      // return `/mechanics/${lowerTitle}/${bike.id}`
  }


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
            viewAllUrl={`/used-bikes`}
            renderItem={(bike: any) => (
              <Box
                key={bike.id}
                className={styles.card}
                // onClick={() =>
                //   router.push(
                //     `/used-bikes/${bike.title.toLowerCase().replaceAll(' ', '-')}/${bike.id}`
                //   )
                // }
              >
                <Box className={styles.imgWrap}>
                  <img src={bike.images?.[0]} alt={bike.title} />
                  <span className={`${styles.tag} ${styles.tagUsed}`}>Used</span>
                </Box>

                <Box className={styles.cardBody}>
                  <Typography className={styles.cardTitle}>{add3Dots(bike.title, isMobile ? "15" : "25")}</Typography>

                  <Box className={styles.metaRow}>
                    <Typography className={styles.price}>
                      PKR {priceWithCommas(bike.price)}
                    </Typography>
                  </Box>

                  <Box className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
                    <Button
                      className={styles.btnPrimary}
                      onClick={() =>
                        router.push(
                          `/used-bikes/${bike.title.toLowerCase().replaceAll(' ', '-')}/${bike.id}`
                        )
                      }
                    >
                      View Details
                    </Button>

                    {/* <Button
                      className={styles.btnGhost}
                      onClick={() => router.push(`/used-bikes`)}
                    >
                      More Used
                    </Button> */}
                  </Box>
                </Box>
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
                <Box className={styles.imgWrap}>
                  <img src={bike.images?.[0]} alt={bike.title} />
                  <span className={`${styles.tag} ${styles.tagNew}`}>New</span>
                </Box>

                <Box className={styles.cardBody}>
                  <Typography className={styles.cardTitle}>{add3Dots(bike.title, isMobile ? "15" : "25")}</Typography>

                  <Box className={styles.metaRow}>
                    <Typography className={styles.price}>
                      PKR {priceWithCommas(bike.price)}
                    </Typography>
                  </Box>

                  <Box className={styles.cardActions}>
                    <Button className={styles.btnPrimary} onClick={() =>  router.push(`/new-bikes/${bike?.bike_brand?.brandName}/${bike?.bikeUrl}/${bike.id}`)}>
                      View Details
                    </Button>
                    {/* <Button className={styles.btnGhost} onClick={() => router.push(`/new-bikes`)}>
                      Compare
                    </Button> */}
                  </Box>
                </Box>
              </Box>
            )}
          />

          {/* Blogs */}
          <Section
            title="Blogs"
            sectionKey="blogs"
            viewAllUrl={`/blog`}
            renderItem={(blog: any) => (
              <Box key={blog.id} className={styles.card}>
                <Box className={styles.imgWrap}>
                  <img
                    src={blog.featuredImage?.split('#$#')[0]?.trim()}
                    alt={blog.blogTitle}
                  />
                  <span className={`${styles.tag} ${styles.tagBlog}`}>Blog</span>
                </Box>

                <Box className={styles.cardBody}>
                  <Typography className={styles.cardTitle}>{add3Dots(blog.blogTitle, isMobile ? "20" : "25")}</Typography>
                  <Typography className={`${styles.subText} mb-0 mt-0`} > Author : {blog.authorname} </Typography>
                  <Box className={styles.cardActions}>
                    <Button className={styles.btnPrimary} onClick={() => handleBlogRoute(blog)}>
                      Read
                    </Button>
                  </Box>
                </Box>
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
                <Box className={styles.imgWrap}>
                  <img src={ebike_logo} alt={d.shop_name} />
                  <span className={`${styles.tag} ${styles.tagDealer}`}>Dealer</span>
                </Box>

                <Box className={styles.cardBody}>
                  <Typography className={styles.cardTitle}>{add3Dots(d.shop_name, isMobile ? "15" : "25")}</Typography>
                  <Typography className={styles.subText}>{d.phone}</Typography>

                  <Box className={styles.cardActions}>
                    <Button
                      className={styles.btnPrimary}
                      onClick={() => dealerDetailPage(d) }
                    >
                      Details
                    </Button>
                  
                  </Box>
                </Box>
              </Box>
            )}

          />

          {/* Mechanics */}
          <Section
            title="Mechanics"
            sectionKey="mechanics"
            viewAllUrl={`/mechanics`}
            renderItem={(d: any) => (
                <Box key={d.id} className={styles.card}>
                  <Box className={styles.imgWrap}>
                    <img src={ebike_logo} alt={d.shop_name} />
                    <span className={`${styles.tag} ${styles.tagDealer}`}> mechanic </span>
                  </Box>

                  <Box className={styles.cardBody}>
                    <Typography className={styles.cardTitle}>{add3Dots(d.shop_name, isMobile ? "15" : "25")}</Typography>
                    <Typography className={styles.subText}>{d.phone}</Typography>

                    <Box className={styles.cardActions}>
                      <Button
                        className={styles.btnPrimary}
                        onClick={() => mechanicToDetailPage(d)}
                      >
                       Details
                      </Button>
                      {/* <Button className={styles.btnGhost} onClick={() => router.push(`/dealers`)}>
                        View All
                      </Button> */}
                    </Box>
                  </Box>
                </Box>
              )}

          />
        </>
      )}
    </Box>
  )
}
