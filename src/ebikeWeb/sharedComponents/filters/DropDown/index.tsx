import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import { CcArr, YearArr } from '@/ebikeWeb/constants/globalData';
import { useState } from 'react';

export default function FilterDropdown({ values, dropvalues, updateFilterValue, from, data }: any) {

    let dataArr = dropvalues == 'years' ? YearArr : CcArr

    return (
        <>{
           
                <> {
                    values == "from" ?
                        <>
                            <FormControl sx={{ m: 1, width: '90%' }} size="small">
                                <InputLabel id="demo-select-small-label">From</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label='from'
                                    value={data.start}
                                    onChange={(e)=>updateFilterValue(e.target.value, true, from)}
                                >
                                    {dataArr.map((val: any, i: any) => {
                                        return <MenuItem id={dropvalues == 'years' ? val.id : val} key={i} value={dropvalues == 'years' ? val.id : val}>  { dropvalues == 'years' ? val.year : val}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </>
                        :
                        <>
                            <FormControl sx={{ m: 1, width: '90%' , mb :2 }} size="small">
                                <InputLabel id="demo-select-small-label">To</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label='from'
                                    value={data.end}
                                    onChange={(e) => updateFilterValue(e.target.value, false, from) }
                                >
                                    {dataArr.map((val: any, i: any) => {
                                        return<MenuItem id={dropvalues == 'years' ? val.id : val} key={i} value={dropvalues == 'years' ? val.id : val}>  { dropvalues == 'years' ? val.year : val}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </>
                }</> 
                // <>
                //     {
                //         values == "from" ?
                //             <>
                //                 <FormControl sx={{ m: 1, width: '90%' }} size="small">
                //                     <InputLabel id="demo-select-small-label">From</InputLabel>
                //                     <Select
                //                         labelId="demo-select-small-label"
                //                         id="demo-select-small"
                //                         label='from'
                //                         value={CCFrom}
                //                         onChange={(e) => updateFilterValue(e.target.id, true, from)}
                                        
                //                     >
                //                         {CcArr.map((e: any, i: any) => {
                //                             return <MenuItem key={i} value={e}>{e} CC</MenuItem>
                //                         })}
                //                     </Select>
                //                 </FormControl>
                //             </>
                //             :
                //             <>
                //                 <FormControl sx={{ m: 1, width: '90%' }} size="small">
                //                     <InputLabel id="demo-select-small-label">To</InputLabel>
                //                     <Select
                //                         labelId="demo-select-small-label"
                //                         id="demo-select-small"
                //                         label='from'
                //                         value={CCTo}
                //                         onChange={(e) => updateFilterValue(e.target.id, false, from)}
                //                     >
                //                         {[...CcArr].reverse().map((e: any, i: any) => {
                //                             return <MenuItem key={i} value={e}>{e} CC</MenuItem>;
                //                         })}
                //                     </Select>
                //                 </FormControl>
                //             </>
                //     }
                // </>
        }
        </>

    );
}
