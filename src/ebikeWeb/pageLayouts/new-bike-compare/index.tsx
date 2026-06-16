"use client"

import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  getbrandData,
  getnewBikeData,
  getNewBikeComparisonData,
} from '@/ebikeWeb/functions/globalFuntions';
import Loader from '@/ebikeWeb/sharedComponents/loader/loader';
import { cloudinaryLoader, priceWithCommas } from '@/genericFunctions/geneFunc';
import styles from './index.module.scss';

type Brand = {
  id?: number;
  brandName?: string;
  logoUrl?: string;
  focus_keyword?: string;
};

type Bike = {
  id?: number;
  title?: string;
  bikeUrl?: string;
  price?: string | number;
  images?: string[];
  bike_brand?: Brand;
  city?: { city_name?: string };
  frame?: string;
  displacement?: string;
  dimention?: string;
  tyreFront?: string;
  clutch?: string;
  dryWeight?: string;
  starting?: string;
  engine?: string;
  petrolCapacity?: string;
  tyreBack?: string;
  compressionRatio?: string;
  groundClearance?: string;
  transmission?: string;
  boreAndStroke?: string;
};

const hiddenBrandNames = new Set(['sport', 'china', 'sports', 'eagle']);
const BIKE_ONE_PARAM = 'bike1';
const BIKE_TWO_PARAM = 'bike2';

function isHiddenBrand(brand: Brand) {
  return hiddenBrandNames.has(brand?.brandName?.trim()?.toLowerCase() || '');
}

function isElectricBrand(brand: Brand) {
  return brand?.focus_keyword?.toLowerCase?.().includes('electric-bike') || false;
}

function getBikeImage(bike?: Bike) {
  const image = bike?.images?.[0] || bike?.bike_brand?.logoUrl || '';
  return image ? cloudinaryLoader(image, 700, 'auto') : '/ebikelogo.png';
}

function displayValue(value: any) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return String(value);
}

function priceValue(value: any) {
  if (!value) {
    return '-';
  }

  return `Rs: ${priceWithCommas(value)}`;
}

const motorcycleComparisonRows = [
  { label: 'Brand', value: (bike: Bike) => bike?.bike_brand?.brandName },
  { label: 'City', value: (bike: Bike) => bike?.city?.city_name },
  { label: 'Price', value: (bike: Bike) => priceValue(bike?.price) },
  { label: 'Frame', value: (bike: Bike) => bike?.frame },
  { label: 'Displacement', value: (bike: Bike) => bike?.displacement?.split(',')?.[0] },
  { label: 'Dimension', value: (bike: Bike) => bike?.dimention },
  { label: 'Front Tyre', value: (bike: Bike) => bike?.tyreFront },
  { label: 'Clutch', value: (bike: Bike) => bike?.clutch },
  { label: 'Dry Weight', value: (bike: Bike) => bike?.dryWeight },
  { label: 'Starting', value: (bike: Bike) => bike?.starting },
  { label: 'Engine', value: (bike: Bike) => bike?.engine },
  { label: 'Petrol Capacity', value: (bike: Bike) => bike?.petrolCapacity },
  { label: 'Rear Tyre', value: (bike: Bike) => bike?.tyreBack },
  { label: 'Compression Ratio', value: (bike: Bike) => bike?.compressionRatio },
  { label: 'Ground Clearance', value: (bike: Bike) => bike?.groundClearance },
  { label: 'Transmission', value: (bike: Bike) => bike?.transmission },
  { label: 'Bore & Stroke', value: (bike: Bike) => bike?.boreAndStroke },
];

const electricComparisonRows = [
  { label: 'Brand', value: (bike: Bike) => bike?.bike_brand?.brandName },
  { label: 'City', value: (bike: Bike) => bike?.city?.city_name },
  { label: 'Price', value: (bike: Bike) => priceValue(bike?.price) },
  { label: 'Type', value: (bike: Bike) => bike?.dimention },
  { label: 'Seat Length', value: (bike: Bike) => bike?.engine },
  { label: 'Battery', value: (bike: Bike) => bike?.boreAndStroke },
  { label: 'Battery Type', value: (bike: Bike) => bike?.displacement?.split(',')?.[0] },
  { label: 'Range Per Charge', value: (bike: Bike) => bike?.petrolCapacity },
  { label: 'Motor', value: (bike: Bike) => bike?.groundClearance },
  { label: 'Speed', value: (bike: Bike) => bike?.starting },
  { label: 'Charge Time', value: (bike: Bike) => bike?.tyreFront },
  { label: 'Wheel', value: (bike: Bike) => bike?.clutch },
  { label: 'Tyre Size', value: (bike: Bike) => bike?.dryWeight },
  { label: 'Shock Absorption', value: (bike: Bike) => bike?.transmission },
  { label: 'Brake (Front/Rear)', value: (bike: Bike) => bike?.tyreBack },
  { label: 'Head Light', value: (bike: Bike) => bike?.frame },
  { label: 'Frame', value: (bike: Bike) => bike?.compressionRatio },
];

export default function NewBikeCompare() {
  const isMobile = useMediaQuery('(max-width:768px)');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [compareMode, setCompareMode] = useState(0);
  const [brandOne, setBrandOne] = useState('');
  const [brandTwo, setBrandTwo] = useState('');
  const [bikeOne, setBikeOne] = useState('');
  const [bikeTwo, setBikeTwo] = useState('');
  const [bikeOptionsOne, setBikeOptionsOne] = useState<Bike[]>([]);
  const [bikeOptionsTwo, setBikeOptionsTwo] = useState<Bike[]>([]);
  const [comparedBikes, setComparedBikes] = useState<Bike[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [loadingSlot, setLoadingSlot] = useState<1 | 2 | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [message, setMessage] = useState('');
  const isHydratingFromUrl = useRef(false);
  const lastLoadedCompareUrl = useRef('');

  const updateCompareUrl = useCallback((firstBikeId?: string, secondBikeId?: string, nextMode = compareMode) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextMode === 1) {
      params.set('tab', '2');
    } else {
      params.delete('tab');
    }

    if (firstBikeId && secondBikeId) {
      params.set(BIKE_ONE_PARAM, firstBikeId);
      params.set(BIKE_TWO_PARAM, secondBikeId);
    } else {
      params.delete(BIKE_ONE_PARAM);
      params.delete(BIKE_TWO_PARAM);
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [compareMode, pathname, router, searchParams]);

  const compareSelectedBikes = useCallback(async (firstBikeId = bikeOne, secondBikeId = bikeTwo, shouldUpdateUrl = true) => {
    const firstId = Number(firstBikeId);
    const secondId = Number(secondBikeId);

    if (!firstId || !secondId) {
      return;
    }

    if (firstId === secondId) {
      setComparedBikes([]);
      setMessage('Please select two different bikes for comparison.');
      return;
    }

    setIsComparing(true);
    setMessage('');
    const res = await getNewBikeComparisonData({ bikeIds: [firstId, secondId] });

    if (res?.success && Array.isArray(res?.bikes)) {
      setComparedBikes(res.bikes);
      lastLoadedCompareUrl.current = `${firstId}-${secondId}-${compareMode === 1 ? '2' : ''}`;
      if (shouldUpdateUrl) {
        updateCompareUrl(String(firstId), String(secondId));
      }
    } else {
      setComparedBikes([]);
      setMessage(res?.info || 'Comparison details could not be loaded.');
    }

    setIsComparing(false);
  }, [bikeOne, bikeTwo, compareMode, updateCompareUrl]);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    setCompareMode(searchParams.get('tab') === '2' ? 1 : 0);
  }, [searchParams]);

  useEffect(() => {
    if (!isHydratingFromUrl.current) {
      resetComparison(false);
    }
  }, [compareMode]);

  useEffect(() => {
    if (isHydratingFromUrl.current) {
      return;
    }

    if (brandOne) {
      fetchBikesByBrand(brandOne, 1);
    } else {
      setBikeOptionsOne([]);
      setBikeOne('');
    }
  }, [brandOne]);

  useEffect(() => {
    if (isHydratingFromUrl.current) {
      return;
    }

    if (brandTwo) {
      fetchBikesByBrand(brandTwo, 2);
    } else {
      setBikeOptionsTwo([]);
      setBikeTwo('');
    }
  }, [brandTwo]);

  useEffect(() => {
    if (isHydratingFromUrl.current) {
      return;
    }

    if (bikeOne && bikeTwo) {
      compareSelectedBikes();
    }
  }, [bikeOne, bikeTwo, compareSelectedBikes]);

  useEffect(() => {
    const firstBikeId = searchParams.get(BIKE_ONE_PARAM) || '';
    const secondBikeId = searchParams.get(BIKE_TWO_PARAM) || '';
    const compareUrlKey = `${firstBikeId}-${secondBikeId}-${searchParams.get('tab') || ''}`;

    if (!firstBikeId || !secondBikeId || firstBikeId === secondBikeId || compareUrlKey === lastLoadedCompareUrl.current) {
      return;
    }

    hydrateComparisonFromUrl(firstBikeId, secondBikeId, compareUrlKey);
  }, [searchParams]);

  async function fetchBrands() {
    setIsLoadingBrands(true);
    const res = await getbrandData();
    if (Array.isArray(res)) {
      setBrands(res.filter((brand: Brand) => brand?.brandName && !isHiddenBrand(brand)));
    } else {
      setMessage('Brands could not be loaded. Please reload the page and try again.');
    }
    setIsLoadingBrands(false);
  }

  async function hydrateComparisonFromUrl(firstBikeId: string, secondBikeId: string, compareUrlKey: string) {
    isHydratingFromUrl.current = true;
    setIsComparing(true);
    setMessage('');
    const res = await getNewBikeComparisonData({ bikeIds: [Number(firstBikeId), Number(secondBikeId)] });

    if (res?.success && Array.isArray(res?.bikes) && res.bikes.length === 2) {
      const [firstBikeData, secondBikeData] = res.bikes;
      const firstBrandName = firstBikeData?.bike_brand?.brandName || '';
      const secondBrandName = secondBikeData?.bike_brand?.brandName || '';
      const nextMode = res.bikes.some((bike: Bike) => isElectricBrand(bike?.bike_brand || {})) ? 1 : 0;

      setCompareMode(searchParams.get('tab') === '2' ? 1 : nextMode);
      setBrandOne(firstBrandName);
      setBrandTwo(secondBrandName);
      setComparedBikes(res.bikes);
      await Promise.all([
        firstBrandName ? fetchBikesByBrand(firstBrandName, 1, firstBikeId) : Promise.resolve(),
        secondBrandName ? fetchBikesByBrand(secondBrandName, 2, secondBikeId) : Promise.resolve()
      ]);
      lastLoadedCompareUrl.current = compareUrlKey;
    } else {
      setComparedBikes([]);
      setMessage(res?.info || 'Shared comparison could not be loaded.');
    }

    setIsComparing(false);
    isHydratingFromUrl.current = false;
  }

  async function fetchBikesByBrand(brandName: string, slot: 1 | 2, selectedBikeId = '') {
    setLoadingSlot(slot);
    setMessage('');
    if (!isHydratingFromUrl.current) {
      setComparedBikes([]);
    }
    if (slot === 1) {
      setBikeOne(selectedBikeId);
      setBikeOptionsOne([]);
    } else {
      setBikeTwo(selectedBikeId);
      setBikeOptionsTwo([]);
    }

    const res = await getnewBikeData({ brand: brandName });
    const bikes = Array.isArray(res) ? res : [];

    if (slot === 1) {
      setBikeOptionsOne(bikes);
    } else {
      setBikeOptionsTwo(bikes);
    }

    if (bikes.length === 0) {
      setMessage(`No new bikes found for ${brandName}.`);
    }

    setLoadingSlot(null);
  }

  function resetComparison(shouldUpdateUrl = true) {
    setBrandOne('');
    setBrandTwo('');
    setBikeOne('');
    setBikeTwo('');
    setBikeOptionsOne([]);
    setBikeOptionsTwo([]);
    setComparedBikes([]);
    setMessage('');
    lastLoadedCompareUrl.current = '';
    if (shouldUpdateUrl) {
      updateCompareUrl('', '');
    }
  }

  const sortedBrands = useMemo(() => {
    return brands
      .filter((brand) => compareMode === 1 ? isElectricBrand(brand) : !isElectricBrand(brand))
      .sort((a, b) => String(a.brandName).localeCompare(String(b.brandName)));
  }, [brands, compareMode]);

  const readyToCompare = bikeOne && bikeTwo && bikeOne !== bikeTwo;
  const firstBike = comparedBikes[0];
  const secondBike = comparedBikes[1];
  const isElectricCompare = compareMode === 1;
  const comparisonRows = isElectricCompare ? electricComparisonRows : motorcycleComparisonRows;
  const pageTitle = isElectricCompare ? 'Compare Electric Bikes' : 'Compare New Bikes';
  const pageIntro = isElectricCompare
    ? 'Select electric bike brands and compare battery, range, motor, charging time, price and other EV specs side by side.'
    : 'Select a brand, then choose both bikes. The details will appear side by side in the table below.';

  function handleModeChange(_event: React.SyntheticEvent, newValue: number) {
    setCompareMode(newValue);
    updateCompareUrl('', '', newValue);
  }

  function renderBrandSelect(value: string, onChange: (value: string) => void) {
    return (
      <FormControl fullWidth className={styles.formControl}>
        <Typography className={styles.fieldLabel}>Select Brand</Typography>
        <Select
          value={value}
          displayEmpty
          onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
          className={styles.select}
        >
          <MenuItem value="">Choose brand</MenuItem>
          {sortedBrands.map((brand) => (
            <MenuItem value={brand.brandName || ''} key={`${brand.id}-${brand.brandName}`}>
              {brand.brandName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  function renderBikeSelect(value: string, onChange: (value: string) => void, bikes: Bike[], disabled: boolean) {
    return (
      <FormControl fullWidth className={styles.formControl}>
        <Typography className={styles.fieldLabel}>Select Bike</Typography>
        <Select
          value={value}
          displayEmpty
          disabled={disabled}
          onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
          className={styles.select}
        >
          <MenuItem value="">Choose bike</MenuItem>
          {bikes.map((bike) => (
            <MenuItem value={String(bike.id)} key={bike.id}>
              {bike.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <Box className={styles.compareMain}>
      {isLoadingBrands ? (
        <Box className={styles.loaderBox}>
          <Loader isLoading={isLoadingBrands} />
        </Box>
      ) : (
        <>
          <Box className={styles.heroSection}>
            <Box className={styles.heroText}>
              <Typography component="h1" className={styles.pageTitle}>
                {pageTitle}
              </Typography>
              <Typography className={styles.pageIntro}>
                {pageIntro}
              </Typography>
            </Box>
            <Box className={styles.heroIcon}>
              <CompareArrowsIcon />
            </Box>
          </Box>

          <Box className={styles.tabsShell}>
            <Tabs value={compareMode} onChange={handleModeChange} textColor="primary" indicatorColor="primary" className={styles.tabs}>
              <Tab label="MotorCycles" className={styles.tab} />
              <Tab label="Electric Bikes" className={styles.tab} />
            </Tabs>
          </Box>

          <Grid container className={styles.selectorGrid} spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} md={6}>
              <Box className={styles.selectorPanel}>
                <Box className={styles.panelHeader}>
                  <DirectionsBikeIcon />
                  <Typography>Bike One</Typography>
                </Box>
                {renderBrandSelect(brandOne, setBrandOne)}
                {renderBikeSelect(bikeOne, setBikeOne, bikeOptionsOne, !brandOne || loadingSlot === 1)}
                {loadingSlot === 1 ? <Typography className={styles.helperText}>Loading bikes...</Typography> : null}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className={styles.selectorPanel}>
                <Box className={styles.panelHeader}>
                  <DirectionsBikeIcon />
                  <Typography>Bike Two</Typography>
                </Box>
                {renderBrandSelect(brandTwo, setBrandTwo)}
                {renderBikeSelect(bikeTwo, setBikeTwo, bikeOptionsTwo, !brandTwo || loadingSlot === 2)}
                {loadingSlot === 2 ? <Typography className={styles.helperText}>Loading bikes...</Typography> : null}
              </Box>
            </Grid>
          </Grid>

          <Box className={styles.actionBar}>
            <Button
              className={styles.compareButton}
              startIcon={<SearchIcon />}
              disabled={!readyToCompare || isComparing}
              onClick={compareSelectedBikes}
            >
              {isComparing ? 'Comparing...' : 'Compare Bikes'}
            </Button>
            <Button className={styles.resetButton} startIcon={<RestartAltIcon />} onClick={resetComparison}>
              Reset
            </Button>
          </Box>

          {message ? <Typography className={styles.message}>{message}</Typography> : null}

          {isComparing ? (
            <Box className={styles.loaderBox}>
              <Loader isLoading={isComparing} />
            </Box>
          ) : null}

          {comparedBikes.length === 2 ? (
            <Box className={styles.resultSection}>
              <Box className={styles.bikeSummaryGrid}>
                {[firstBike, secondBike].map((bike) => (
                  <Box className={styles.bikeSummary} key={bike?.id}>
                    <Image
                      src={getBikeImage(bike)}
                      alt={bike?.title || 'New bike'}
                      width={140}
                      height={96}
                      unoptimized
                      className={styles.bikeImage}
                    />
                    <Box className={styles.bikeSummaryText}>
                      <Typography className={styles.bikeTitle}>{bike?.title}</Typography>
                      <Typography className={styles.bikePrice}>{priceValue(bike?.price)}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box className={styles.tableWrap}>
                <table className={styles.compareTable}>
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>{firstBike?.title}</th>
                      <th>{secondBike?.title}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>
                        <td>{displayValue(row.value(firstBike))}</td>
                        <td>{displayValue(row.value(secondBike))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          ) : null}
        </>
      )}
    </Box>
  );
}
