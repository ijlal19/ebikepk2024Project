import { BrandArr, CityArr } from '../../../../constants/globalData';
import styles from './index.module.scss'
import { useState } from 'react';

export const MechanicinPakFilter = (props:any) => {
    function updateFilterValue(event:any, from:any) {
        if(from == 'city') {
        if(event.target.checked == true){
            alert('Sure City')
        }
        }
        else if(from == 'brand') {
            if(event.target.checked == true){
                alert('Sure Brand')
            }
        }
    }
 return (
        <div className={styles.filter_main}>
            <div className={styles.by_brand}>
                <p className={styles.filter_heading}>Search By Brand</p>
                <div className={styles.city_options}>
                    {
                        BrandArr.map((data: any, i: any) => {
                            return (
                                <p className={styles.option_values} key={i}>
                                    <input
                                        type="checkbox"
                                          onChange={(event) => { updateFilterValue(event, 'city') }}
                                        id={data.id}
                                    />
                                    {data.brandName}
                                </p>
                            );
                        })
                    }
                </div>
                <button className={styles.brand_filter}>Remove Brand Filters</button>
            </div>
            <div className={styles.by_brand}>
                <p className={styles.filter_heading}>Search By City</p>
                <div className={styles.city_options}>
                    {
                        CityArr.map((data: any, i: any) => {
                            return (
                                <p className={styles.option_values} key={i}>
                                    <input
                                        type="checkbox"
                                          onChange={(event) => { updateFilterValue(event, 'brand') }}
                                        id={data.id}
                                    />
                                    {data.city_name}
                                </p>
                            );
                        })
                    }
                </div>
                <button className={styles.brand_filter}>Remove City Filters</button>
            </div>
        </div>
    )
}