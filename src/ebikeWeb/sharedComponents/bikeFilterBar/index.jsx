"use client";

import SearchIcon from '@mui/icons-material/Search';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Select, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BrandArr, CityArr, YearArr } from '@/ebikeWeb/constants/globalData';
import { ALL_FILTER_VALUE, getBikeFilterSlug, getBikeFilterUrl } from '@/ebikeWeb/utils/bikeFilterRoute';
import { getSortedCityOptions } from '@/ebikeWeb/utils/cityOptions';
import styles from './index.module.scss';

function formatDropdownText(value = '') {
    const text = String(value).replaceAll('_', ' ').trim();

    if (!text) {
        return '';
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

const BikeFilterBar = ({ initialBrand = ALL_FILTER_VALUE, initialModal = ALL_FILTER_VALUE, initialCity = ALL_FILTER_VALUE, variant = 'banner' }) => {
    const router = useRouter();
    const [selectedBrand, setSelectedBrand] = useState(getBikeFilterSlug(initialBrand));
    const [selectedModal, setSelectedModal] = useState(getBikeFilterSlug(initialModal));
    const [selectedCity, setSelectedCity] = useState(getBikeFilterSlug(initialCity));

    const yearOptions = [...YearArr].sort((a, b) => Number(b.year) - Number(a.year));
    const brandOptions = [...BrandArr].sort((a, b) => a.brandName.localeCompare(b.brandName));
    const cityOptions = getSortedCityOptions(CityArr);
    const brandDropdownOptions = [
        { value: ALL_FILTER_VALUE, label: 'All Brands' },
        ...brandOptions.map((brand) => ({
            value: getBikeFilterSlug(brand.brandName),
            label: formatDropdownText(brand.brandName),
        })),
    ];
    const yearDropdownOptions = [
        { value: ALL_FILTER_VALUE, label: 'All Models' },
        ...yearOptions.map((year) => ({
            value: getBikeFilterSlug(year.year),
            label: String(year.year),
        })),
    ];
    const cityDropdownOptions = [
        { value: ALL_FILTER_VALUE, label: 'All Cities' },
        ...cityOptions.map((city) => ({
            value: getBikeFilterSlug(city.city_name),
            label: formatDropdownText(city.city_name),
        })),
    ];

    const selectMenuProps = {
        disableScrollLock: true,
        PaperProps: {
            className: styles.selectMenu,
        },
        MenuListProps: {
            className: styles.selectMenuList,
        },
    };

    const getSelectedLabel = (options, value) => {
        return options.find((option) => option.value === value)?.label || options[0]?.label || '';
    };

    const handleSearch = () => {
        router.push(getBikeFilterUrl(selectedBrand, selectedModal, selectedCity));
    };

    const renderFilterSelect = ({ value, onChange, options, ariaLabel }) => (
        <Select
            value={value}
            displayEmpty
            IconComponent={KeyboardArrowDownIcon}
            MenuProps={selectMenuProps}
            onChange={(event) => onChange(event.target.value)}
            className={styles.filterSelect}
            aria-label={ariaLabel}
            renderValue={(selected) => (
                <Typography component="span" className={styles.selectedText}>
                    {getSelectedLabel(options, selected)}
                </Typography>
            )}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value} className={styles.selectOption}>
                    <Typography component="span" className={styles.optionText}>
                        {option.label}
                    </Typography>
                </MenuItem>
            ))}
        </Select>
    );

    return (
        <div className={`${styles.filterBar} ${variant === 'page' ? styles.pageFilterBar : ''}`}>
            <label className={styles.filterField}>
                <span className={styles.fieldLabel}>
                    <TwoWheelerIcon />
                    Brand
                </span>
                {renderFilterSelect({
                    value: selectedBrand,
                    onChange: setSelectedBrand,
                    options: brandDropdownOptions,
                    ariaLabel: "Select bike brand",
                })}
            </label>

            <label className={styles.filterField}>
                <span className={styles.fieldLabel}>
                    <CalendarMonthIcon />
                    Model Year
                </span>
                {renderFilterSelect({
                    value: selectedModal,
                    onChange: setSelectedModal,
                    options: yearDropdownOptions,
                    ariaLabel: "Select bike model year",
                })}
            </label>

            <label className={styles.filterField}>
                <span className={styles.fieldLabel}>
                    <LocationOnIcon />
                    City
                </span>
                {renderFilterSelect({
                    value: selectedCity,
                    onChange: setSelectedCity,
                    options: cityDropdownOptions,
                    ariaLabel: "Select city",
                })}
            </label>

            <button className={styles.searchButton} onClick={handleSearch} aria-label="Search bikes">
                <SearchIcon />
                <span>Search</span>
            </button>
        </div>
    );
};

export default BikeFilterBar;
