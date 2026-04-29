"use client";

import SearchIcon from '@mui/icons-material/Search';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BrandArr, CityArr, YearArr } from '@/ebikeWeb/constants/globalData';
import { ALL_FILTER_VALUE, getBikeFilterSlug, getBikeFilterUrl } from '@/ebikeWeb/utils/bikeFilterRoute';
import styles from './index.module.scss';

const BikeFilterBar = ({ initialBrand = ALL_FILTER_VALUE, initialModal = ALL_FILTER_VALUE, initialCity = ALL_FILTER_VALUE, variant = 'banner' }) => {
    const router = useRouter();
    const [selectedBrand, setSelectedBrand] = useState(getBikeFilterSlug(initialBrand));
    const [selectedModal, setSelectedModal] = useState(getBikeFilterSlug(initialModal));
    const [selectedCity, setSelectedCity] = useState(getBikeFilterSlug(initialCity));

    const yearOptions = [...YearArr].sort((a, b) => Number(b.year) - Number(a.year));
    const brandOptions = [...BrandArr].sort((a, b) => a.brandName.localeCompare(b.brandName));
    const cityOptions = [...CityArr].sort((a, b) => a.city_name.localeCompare(b.city_name));

    const handleSearch = () => {
        router.push(getBikeFilterUrl(selectedBrand, selectedModal, selectedCity));
    };

    return (
        <div className={`${styles.filterBar} ${variant === 'page' ? styles.pageFilterBar : ''}`}>
            <label className={styles.filterField}>
                <span className={styles.fieldLabel}>
                    <TwoWheelerIcon />
                    Brand
                </span>
                <select
                    className={styles.filterSelect}
                    value={selectedBrand}
                    onChange={(event) => setSelectedBrand(event.target.value)}
                    aria-label="Select bike brand"
                >
                    <option value={ALL_FILTER_VALUE}>All Brands</option>
                    {brandOptions.map((brand) => (
                        <option key={brand.id} value={getBikeFilterSlug(brand.brandName)}>
                            {brand.brandName.replaceAll('_', ' ')}
                        </option>
                    ))}
                </select>
            </label>

            <label className={styles.filterField}>
                <span className={styles.fieldLabel}>
                    <CalendarMonthIcon />
                    Model Year
                </span>
                <select
                    className={styles.filterSelect}
                    value={selectedModal}
                    onChange={(event) => setSelectedModal(event.target.value)}
                    aria-label="Select bike model year"
                >
                    <option value={ALL_FILTER_VALUE}>All Models</option>
                    {yearOptions.map((year) => (
                        <option key={year.id} value={getBikeFilterSlug(year.year)}>{year.year}</option>
                    ))}
                </select>
            </label>

            <label className={styles.filterField}>
                <span className={styles.fieldLabel}>
                    <LocationOnIcon />
                    City
                </span>
                <select
                    className={styles.filterSelect}
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                    aria-label="Select city"
                >
                    <option value={ALL_FILTER_VALUE}>All Cities</option>
                    {cityOptions.map((city) => (
                        <option key={city.id} value={getBikeFilterSlug(city.city_name)}>{city.city_name}</option>
                    ))}
                </select>
            </label>

            <button className={styles.searchButton} onClick={handleSearch} aria-label="Search bikes">
                <SearchIcon />
                <span>Search</span>
            </button>
        </div>
    );
};

export default BikeFilterBar;
