'use client'

import React, { useEffect, useMemo, useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Grid, Link, Pagination, Typography, useMediaQuery } from '@mui/material';
import { getBrandFromId, getCityFromId, getCustomBikeAd, getFavouriteBikeById } from '@/ebikeWeb/functions/globalFuntions';
import { BrandArr, CityArr } from '@/ebikeWeb/constants/globalData';
import BrowseUsedBike from '@/ebikeWeb/sharedComponents/BrowseUsedBike';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import ItemCard from '@/ebikeWeb/sharedComponents/itemCard';
import { cloudinaryLoader, getFavouriteAds, GetFavouriteObject, isLoginUser, priceWithCommas } from '@/genericFunctions/geneFunc';
import styles from '../all-used-bikes-by-filter/index.module.scss';
import '../../../app/globals.scss';

let SelectedADD = [];

const AdsArray = [
  {
    href: 'https://youtube.com/ebikepk',
    alt: 'eBike YouTube Banner',
    url: 'https://res.cloudinary.com/dulfy2uxn/image/upload/v1608620216/Animated_Banner_Gif_3_txcj9p.gif',
    target: '_blank',
  },
  {
    href: '/forum',
    alt: '/forum',
    url: 'https://res.cloudinary.com/duiuzkifx/image/upload/v1591968762/staticFiles/11_z0ruos.jpg',
  },
  {
    href: '/dealers',
    alt: '/dealer',
    url: 'https://res.cloudinary.com/dzfd4phly/image/upload/v1745664709/52_mgjfps.jpg',
  },
  {
    href: '/mechanics',
    alt: '/mechanic',
    url: 'https://res.cloudinary.com/dzfd4phly/image/upload/v1745664645/51_perxlq.jpg',
  },
];

function scrollToTop() {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, 300);
}

function makePageRequest(filterRequest, page) {
  return {
    ...(filterRequest || {}),
    page,
    adslimit: filterRequest?.adslimit || 12,
  };
}

export default function UrlFilteredUsedBikes({
  _allUsedBike,
  filterRequest,
  heading = 'Used Bikes',
}) {
  const [AllFavouriteBike, setAllFavouriteBike] = useState([]);
  const [FavouriteData, setFavouriteData] = useState([]);
  const [isGridSelected, setIsGridSelected] = useState(false);
  const [IsLogin, setIsLogin] = useState('not_login');
  const [allBikesArr, setAllBikesArr] = useState(Array.isArray(_allUsedBike?.data) ? _allUsedBike.data : []);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(_allUsedBike?.currentPage || 1);
  const [totalPage, setTotalPage] = useState(_allUsedBike?.pages || 0);

  const isMobileView = useMediaQuery('(max-width:600px)');
  const isMiniDesktopView = useMediaQuery('(max-width:1200px)');
  const isTabView = useMediaQuery('(max-width:910px)');
  const isMobile = useMediaQuery('(max-width:991px)');

  const stableFilterRequest = useMemo(() => filterRequest || { adslimit: 12 }, [filterRequest]);

  useEffect(() => {
    const _isLoginUser = isLoginUser();
    if (_isLoginUser?.login) {
      setIsLogin(_isLoginUser.info);
      fetchFavouriteAds(_isLoginUser?.info?.id);
    } else {
      setIsLogin('not_login');
    }
  }, []);

  useEffect(() => {
    setAllBikesArr(Array.isArray(_allUsedBike?.data) ? _allUsedBike.data : []);
    setCurrentPage(_allUsedBike?.currentPage || 1);
    setTotalPage(_allUsedBike?.pages || 0);
  }, [_allUsedBike]);

  const fetchFavouriteAds = async (uid) => {
    setIsLoading(true);

    const res = await getFavouriteAds(uid);
    if (res) {
      setFavouriteData(res);
      SelectedADD = res?.data?.favouriteArr?.usedBikeIds?.length > 0 ? res.data.favouriteArr.usedBikeIds : [];
    }

    if (res?.data?.favouriteArr?.usedBikeIds) {
      const obj = {
        ids: res?.data?.favouriteArr?.usedBikeIds.length > 0 ? res?.data?.favouriteArr?.usedBikeIds : [],
      };
      const getFavBike = await getFavouriteBikeById(obj);
      setAllFavouriteBike(getFavBike && getFavBike?.data?.length > 0 ? getFavBike?.data : []);
    }

    setIsLoading(false);
  };

  async function fetchBikeInfo(page) {
    setIsLoading(true);

    const res = await getCustomBikeAd(makePageRequest(stableFilterRequest, page));

    if (res?.data?.length > 0) {
      setCurrentPage(res?.currentPage);
      setAllBikesArr(res?.data);
      setTotalPage(res?.pages);
    } else {
      setCurrentPage(1);
      setAllBikesArr([]);
      setTotalPage(0);
    }

    setIsLoading(false);
    scrollToTop();
  }

  const handlePaginationChange = (event, page) => {
    fetchBikeInfo(page);
  };

  const AddFavourite = async (id) => {
    if (!IsLogin || IsLogin == 'not_login') {
      alert('Please Login To Add Favourite');
      return;
    }

    const index = SelectedADD.length > 0 ? SelectedADD.indexOf(id) : -1;
    if (index !== -1) {
      SelectedADD.splice(index, 1);
    } else {
      SelectedADD.push(id);
    }

    const res = await GetFavouriteObject(IsLogin?.id, 'usedBikeIds', SelectedADD, id);
    if (res) {
      fetchFavouriteAds(IsLogin?.id);
    }
  };

  function goToDetailPage() {
    return;
  }

  function getBikeHref(val) {
    const title = val?.title || 'used-bike';
    const urlTitle = title.toLowerCase().replaceAll(' ', '-');
    return `/used-bikes/${urlTitle}/${val.id}`;
  }

  function longCard(val, ind) {
    const brand = getBrandFromId(val?.brandId, BrandArr);
    const city = getCityFromId(val?.cityId, CityArr);
    const bikeYear = val?.year?.year;
    const brandName = brand && brand?.length > 0 ? brand[0].brandName : '';
    const cityName = city && city?.length > 0 ? city[0].city_name : '';
    const viewsCount = val?.views_count ?? 0;

    return (
      <React.Fragment key={val?.id || ind}>
        {ind % 4 == 0 ? (
          <div className={styles.banner_1}>
            <a href="/">
              <img
                className={styles.baner_image}
                src={isMobile ? 'https://res.cloudinary.com/dulfy2uxn/image/upload/v1608021415/Youtube%20Ad%20banners/ebike_banner_Black_1_syhm9t.jpg' : 'https://res.cloudinary.com/dzfd4phly/image/upload/v1734594565/Artboard_271x-100_1_af7qlo.jpg'}
                alt="eBike banner"
              />
            </a>
          </div>
        ) : null}

        {!isMobileView ? (
          <Link href={getBikeHref(val)} sx={{ textDecoration: 'none' }} onClick={() => goToDetailPage(val)}>
            <Grid container className={styles.long_card}>
              <Grid item xs={isMobile ? 12 : 3.5} className={styles.bike_image_box}>
                <Box
                  className={styles.long_card_img}
                  sx={{
                    backgroundImage: `url(${cloudinaryLoader(val?.images?.[0], 300, 'auto') || 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'})`,
                    backgroundSize: isMobileView ? '100% 100%' : 'cover',
                    boxSizing: 'border-box',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: isMobileView ? '150px' : '95%',
                    width: isMobileView ? '100%' : '100%',
                  }}
                />
              </Grid>

              <Grid item xs={isMobile ? 12 : 8} className={styles.card_info}>
                <Typography className={styles.card_title}>{val?.title}</Typography>
                <Typography className={styles.card_location}>
                  <AccountCircleOutlinedIcon sx={{ fontSize: '15px', marginRight: '2px', boxSizing: 'border-box' }} />
                  {val?.sellerName || val?.city?.city_name}
                </Typography>
                <Typography className={styles.bike_details}>
                  {bikeYear ? <span>{bikeYear}</span> : null}
                  {bikeYear && brandName ? <span className={styles.verticl_line}> | </span> : null}
                  {brandName ? <span style={{ textTransform: 'capitalize' }}>{brandName}</span> : null}
                  {(bikeYear || brandName) && cityName ? <span className={styles.verticl_line}> | </span> : null}
                  {cityName ? <span className={styles.verticl_line}>{cityName}</span> : null}
                  {(bikeYear || brandName || cityName) ? <span className={styles.verticl_line}> | </span> : null}
                  <span style={{ display: 'inline-flex', alignItems: 'center', columnGap: '2px' }}>
                    {viewsCount} <VisibilityOutlinedIcon sx={{ fontSize: '14px' }} />
                  </span>
                </Typography>
                <Typography className={styles.card_price_mobile}>PKR {priceWithCommas(val?.price)}</Typography>
              </Grid>

              <Grid item className={styles.price_section_desktop}>
                <span> PKR {priceWithCommas(val?.price)}</span>
                <Box className={styles.fav_box}>
                  <Box
                    className={styles.icon_box}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      AddFavourite(val?.id);
                    }}
                  >
                    <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
                  </Box>
                  <Box className={styles.phone_box}>
                    <LocalPhoneIcon className={styles.icon} /> Show Phone No
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Link>
        ) : (
          <div className={styles.item_div}>
            <ItemCard data={val} from="usedBikeComp" currentpage="used_bike" onBtnClick={() => {}} />
          </div>
        )}
      </React.Fragment>
    );
  }

  function GridCard(val, ind) {
    const brand = getBrandFromId(val?.brandId, BrandArr);
    const city = getCityFromId(val?.cityId, CityArr);
    const bikeYear = val?.year?.year;
    const brandName = brand && brand?.length > 0 ? brand[0].brandName : '';
    const cityName = city && city?.length > 0 ? city[0].city_name : '';
    const viewsCount = val?.views_count ?? 0;

    return (
      <Link href={getBikeHref(val)} key={val?.id || ind} sx={{ textDecoration: 'none' }} className={styles.grid_card}>
        <Grid container>
          <Grid item className={styles.grid_image_box}>
            <Box
              sx={{
                backgroundImage: `url(${cloudinaryLoader(val?.images?.[0], 300, 'auto') || 'https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                width: '100%',
              }}
            >
              <Box
                className={styles.icon_box}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  AddFavourite(val?.id);
                }}
              >
                <FavoriteIcon className={styles.icon} sx={{ color: FavouriteData?.data?.favouriteArr?.usedBikeIds?.includes(val?.id) ? '#1976d2' : 'white' }} />
              </Box>
            </Box>
          </Grid>

          <Grid item className={styles.grid_card_info}>
            <Box className={styles.grid_icon_title}>
              <Typography className={styles.grid_card_title}>{val?.title}</Typography>
            </Box>
            <Typography className={styles.grid_card_location}>{val?.sellerName || val?.city?.city_name}</Typography>
            <Typography className={styles.grid_card_price}>PKR {priceWithCommas(val?.price)}</Typography>
            <Typography className={styles.grid_bike_details}>
              {bikeYear ? <span>{bikeYear}</span> : null}
              {bikeYear && brandName ? <span className={styles.grid_verticl_line}> | </span> : null}
              {brandName ? <span style={{ textTransform: 'capitalize' }}>{brandName}</span> : null}
              {(bikeYear || brandName) && cityName ? <span className={styles.grid_verticl_line}> | </span> : null}
              {cityName ? <span className={styles.grid_verticl_line}>{cityName}</span> : null}
              {(bikeYear || brandName || cityName) ? <span className={styles.grid_verticl_line}> | </span> : null}
              <span style={{ display: 'inline-flex', alignItems: 'center', columnGap: '2px' }}>
                {viewsCount} <VisibilityOutlinedIcon sx={{ fontSize: '14px' }} />
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Link>
    );
  }

  return (
    <>
      <Box className={styles.main}>
        {/* <h5 className={styles.heading1}>{heading}</h5> */}

        {isLoading ? (
          <div className={styles.load_main}>
            <div className={styles.load_div}>
              <Loader isLoading={isLoading} />
            </div>
          </div>
        ) : null}

        <Grid container className={styles.grid_container}>
          <Grid item xs={isTabView ? 12 : isMiniDesktopView ? 10 : 8} className={styles.cards_grid}>
            <Box className={styles.all_bike_main}>
              <div className={styles.main_box}>
                <div className={`${isGridSelected ? styles.grid_bike_list : ''} ${!isGridSelected ? styles.bike_ad_list : ''}`}>
                  {allBikesArr?.length == 0 ? (
                    <p className={styles.not_found}>No results found.</p>
                  ) : (
                    allBikesArr.map((val, ind) => (isGridSelected ? GridCard(val, ind) : longCard(val, ind)))
                  )}
                </div>
              </div>
            </Box>
          </Grid>

          <Grid item xs={isTabView ? 12 : 2} className={styles.add_area}>
            <Box className={styles.add_box}>
              {AdsArray?.map((e, i) => (
                <Link href={e?.href} key={i} target={e?.target} rel="noopener noreferrer">
                  <img src={cloudinaryLoader(e?.url, 400, 'auto')} alt={e?.alt} className={styles.add_image} />
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {allBikesArr?.length > 0 ? (
          <Box className={styles.used_bike_list_pagination}>
            <Pagination count={totalPage} onChange={handlePaginationChange} page={currentPage} />
          </Box>
        ) : null}

        {AllFavouriteBike.length > 0 ? null : null}
        <BrowseUsedBike />
      </Box>
    </>
  );
}
