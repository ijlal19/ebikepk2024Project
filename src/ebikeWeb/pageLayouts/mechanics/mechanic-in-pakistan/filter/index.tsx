import { getDealerByFilter } from '@/ebikeWeb/functions/globalFuntions';
import { BrandArr, CityArr } from '../../../../constants/globalData';
import styles from './index.module.scss'
import { useState } from 'react';

export const MechanicinPakFilter = (props:any) => {

    const [DataByFilter,setDatabyFilter] = useState<any>()
    // function updateFilterValue(event:any, from:any) {
    //     if(from == 'city') {
    //     if(event.target.checked == true){
    //         alert('Sure City')
    //     }
    //     }
    //     else if(from == 'brand') {
    //         if(event.target.checked == true){
    //             alert('Sure Brand')
    //         }
    //     }
    // }
    let brand_filter: any[] = [];
    let city_filter: any[] = [];

     const updateFilterValue = async (event: any, from: any, data: any) => {
            const id = data?.id;
            const isChecked = event.target.checked;
    
            if (from === 'city') {
                if (isChecked) {
                    if (!city_filter.includes(id)) {
                        city_filter.push(id);
                    }
                } else {
                    city_filter = city_filter.filter((item) => item !== id);
                }
            }
            else if (from === 'brand') {
                if (isChecked) {
                    if (!brand_filter.includes(id)) {
                        brand_filter.push(id);
                    }
                } else {
                    brand_filter = brand_filter.filter((item) => item !== id);
                }
            }
    
            const object = {
                brand_filter: brand_filter,
                city_filter: city_filter
            }
            const res = await getDealerByFilter(object);
            console.log("data" , res)
            setDatabyFilter(res)
        };
        // console.log("data" , DataByFilter)

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
                                          onChange={(event) => { updateFilterValue(event, 'brand', data) }}
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
                                          onChange={(event) => { updateFilterValue(event, 'city' , data) }}
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