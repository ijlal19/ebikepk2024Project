import { BrandArr, CityArr } from '../../../../constants/globalData';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

export const DealerinPakFilter = ({ setFilterobject }: any) => {

    const router = useRouter()
    const [brandFilter, setBrandFilter] = useState<any[]>([]);
    const [cityFilter, setCityFilter] = useState<any[]>([]);

    const parseFromLocalStorage = (key: string) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : [];
        } catch (error) {
            console.error("error", error);
            return [];
        }
    };

    useEffect(() => {
        const selectedBrand = parseFromLocalStorage("brand_filter");
        const selectedCity = parseFromLocalStorage("city_filter");
        setBrandFilter(selectedBrand);
        setCityFilter(selectedCity);
    }, []);

    const updateFilterValue = async (event: any, from: string, data: any) => {
        const id = data?.id;
        const isChecked = event.target.checked;

        if (from === "city") {
            const updatedCityFilter = isChecked ?
                [...cityFilter, id].filter((val, ind, array) => array.indexOf(val) === ind)
                : cityFilter.filter((item) => item !== id);
            setCityFilter(updatedCityFilter);
            localStorage.setItem("city_filter", JSON.stringify(updatedCityFilter));
            setFilterobject({ brand_filter: brandFilter, city_filter: updatedCityFilter });
        }

        else if (from === "brand") {
            const updatedBrandFilter = isChecked ?
                [...brandFilter, id].filter((val, ind, array) => array.indexOf(val) === ind)
                : brandFilter.filter((item) => item !== id);
            setBrandFilter(updatedBrandFilter);
            localStorage.setItem("brand_filter", JSON.stringify(updatedBrandFilter));
            setFilterobject({ brand_filter: updatedBrandFilter, city_filter: cityFilter });
        }
    };

    const removeFilters = (e: any) => {
        if (e == "brand") {
            localStorage.removeItem("brand_filter");
            setBrandFilter([]);
            setFilterobject({ brand_filter: [], city_filter: [] });
        }
        else {
            localStorage.removeItem("city_filter");
            setCityFilter([]);
            setFilterobject({ brand_filter: [], city_filter: [] });
        }
    };

    return (
        <div className={styles.filter_main}>
            <div className={styles.by_brand}>
                <p className={styles.filter_heading}>Search By Brand</p>
                <div className={styles.city_options}>
                    {BrandArr.map((data: any, i: any) => (
                        <p className={styles.option_values} key={i}>
                            <input
                                type="checkbox"
                                checked={brandFilter.includes(data?.id)}
                                onChange={(event) => updateFilterValue(event, 'brand', data)}
                                id={data.id}
                            />
                            {data.brandName}
                        </p>
                    ))}
                </div>
                <button
                    className={styles.brand_filter}
                    onClick={() => removeFilters('brand')}
                >
                    Remove Brand Filters
                </button>
            </div>

            <div className={styles.by_brand}>
                <p className={styles.filter_heading}>Search By City</p>
                <div className={styles.city_options}>
                    {CityArr.map((data: any, i: any) => (
                        <p className={styles.option_values} key={i}>
                            <input
                                type="checkbox"
                                checked={cityFilter.includes(data?.id)}
                                onChange={(event) => updateFilterValue(event, 'city', data)}
                                id={data.id}
                            />
                            {data.city_name}
                        </p>
                    ))}
                </div>
                <button
                    className={styles.brand_filter}
                    onClick={() => removeFilters('city')}>
                    Remove City Filters
                </button>
            </div>
        </div>
    );
};