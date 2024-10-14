import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CCArray, YearArray } from '../filterData';

export default function FilterDropdown({ values, dropvalues }: any) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

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
                                    value={age}
                                    onChange={handleChange}
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
                                    value={age}
                                    onChange={handleChange}
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
                                        value={age}
                                        onChange={handleChange}
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
                                        value={age}
                                        onChange={handleChange}
                                    >
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
