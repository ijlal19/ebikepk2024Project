import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import { CcArr, YearArr } from '@/constants/globalData';
import { useState } from 'react';

export default function FilterDropdown({ values, dropvalues }: any) {
    const [YearFrom, setYearFrom] = useState('');
    const [YearTo, setYearTo] = useState('');
    const [CCFrom, setCCFrom] = useState('');
    const [CCTo, setCCTo] = useState('');

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
                                    {YearArr.map((e: any, i: any) => {
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
                                    {YearArr.map((e: any, i: any) => {
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
                                        {CcArr.map((e: any, i: any) => {
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
                                        {[...CcArr].reverse().map((e: any, i: any) => {
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
