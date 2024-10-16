import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import { CCArray, YearArray } from '../data';
import { useState } from 'react';

export default function FilterDropdown({ values, dropvalues }: any) {
    const [YearFrom, setYearFrom] = useState('');
    const [YearTo, setYearTo] = useState('');
    const [CCFrom, setCCFrom] = useState('');
    const [CCTo, setCCTo] = useState('');
    // console.log(YearFrom)
    // console.log(YearTo)
    // console.log(CCFrom)
    // console.log(CCTo)
    return (
        <>{
            dropvalues == 'years' ?
                <> {
                    values == "from" ?
                        <>
                            <FormControl sx={{ m: 1, width: '90%' }} size="small">
                                <InputLabel id="demo-select-small-label">From</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label='from'
                                    value={YearFrom}
                                    onChange={(e)=>setYearFrom(e.target.value)}
                                >
                                    {YearArray.map((e: any, i: any) => {
                                        return <MenuItem key={i} value={e.id}>{e.year}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </>
                        :
                        <>
                            <FormControl sx={{ m: 1, width: '90%' }} size="small">
                                <InputLabel id="demo-select-small-label">To</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label='from'
                                    value={YearTo}
                                    onChange={(e)=>setYearTo(e.target.value)}
                                >
                                    {YearArray.map((e: any, i: any) => {
                                        return <MenuItem key={i} value={e.id}>{e.year}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </>
                }</> :
                <>
                    {
                        values == "from" ?
                            <>
                                <FormControl sx={{ m: 1, width: '90%' }} size="small">
                                    <InputLabel id="demo-select-small-label">From</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label='from'
                                        value={CCFrom}
                                        onChange={(e)=>setCCFrom(e.target.value)}
                                    >
                                        {CCArray.map((e: any, i: any) => {
                                            return <MenuItem key={i} value={e}>{e} CC</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </>
                            :
                            <>
                                <FormControl sx={{ m: 1, width: '90%' }} size="small">
                                    <InputLabel id="demo-select-small-label">To</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label='from'
                                        value={CCTo}
                                        onChange={(e)=>setCCTo(e.target.value)}>
                                        {[...CCArray].reverse().map((e: any, i: any) => {
                                            return <MenuItem key={i} value={e}>{e} CC</MenuItem>;
                                        })}
                                    </Select>
                                </FormControl>
                            </>
                    }
                </>
        }
        </>

    );
}
