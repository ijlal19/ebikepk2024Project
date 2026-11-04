"use client";

import { useEffect, useState } from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getCustomBikeAd } from '@/ebikeWeb/functions/globalFuntions';
import { UsedBikeCard } from '@/ebikeWeb/sharedComponents/new_item_card';
import { sortUsedBikeAdsNewestFirst } from '@/ebikeWeb/utils/usedBikeSorting';
import styles from './index.module.scss';

function UsedBikesSection() {
  const [bikes, setBikes] = useState<any[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let active = true;

    async function fetchUsedBikes() {
      try {
        const response = await getCustomBikeAd({
          approved_only: true,
          exclude_sold: true,
          require_image: true,
          sort_by: 'createdAt',
          sort_order: 'desc',
          adslimit: 12,
        });

        if (!Array.isArray(response?.data)) throw new Error('Unable to load used bikes');

        const availableBikes = response.data.filter((bike: any) =>
          !bike?.is_sold && Array.isArray(bike?.images) && bike.images.some(Boolean)
        );

        if (active) {
          setBikes(sortUsedBikeAdsNewestFirst(availableBikes).slice(0, 4));
          setStatus('ready');
        }
      } catch {
        if (active) setStatus('error');
      }
    }

    fetchUsedBikes();
    return () => { active = false; };
  }, []);

  return (
    <Box className={styles.usedbike_main}>
      <Container>
        <h2 className={styles.heading}>Used Bikes For Sale</h2>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={0} textColor="primary" indicatorColor="primary" aria-label="Used bikes">
            <Tab label="Bikes" id="home-used-bikes-tab" aria-controls="home-used-bikes-panel" className={styles.tab} />
          </Tabs>
        </Box>
        <Box role="tabpanel" id="home-used-bikes-panel" aria-labelledby="home-used-bikes-tab" sx={{ p: 3 }}>
          {status === 'loading' ? <p role="status">Loading used bikes...</p> :
            status === 'error' ? <p role="status">Unable to load used bikes. Please try again later.</p> :
              bikes.length === 0 ? <p role="status">No used bikes available right now.</p> : (
                <div className={styles.tab_panel}>
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={0}
                    watchOverflow
                    slidesPerView={4}
                    slidesPerGroup={1}
                    breakpoints={{
                      0: { slidesPerView: 2 },
                      768: { slidesPerView: 4 },
                    }}
                  >
                    {bikes.map((bike: any) => (
                      <SwiperSlide key={bike.id}>
                        <UsedBikeCard props={bike} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
        </Box>
      </Container>
    </Box>
  );
}

export default UsedBikesSection;
