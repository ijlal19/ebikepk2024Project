import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import css from './Radio.module.css'
import { useState } from 'react';
import SelectTextFields from './DropDown/DropDown';
export default function RowRadioButtonsGroup({label1,label2}) {
  let [defaultval,setDefaultval]=useState("Select Brand")
  let [defaul2tval,setDefault2val]=useState("Select Model")
  function defult(){
    setDefaultval('Select Brand')
    setDefault2val('Select Model')
  }
  function defultChange(){
    setDefaultval('Select Budget')
    setDefault2val('All Vehicle Types')
  }
  return (
    <FormControl style={{display:'flex',justifyContent:'space-between',width:'250px'}}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        style={{display:'flex',justifyContent:'space-between'}}
      >
        <FormControlLabel value={label1}  onClick={defult}  control={<Radio />} label={label1} />
        <FormControlLabel value={label2} onClick={defultChange} control={<Radio />} label={label2} />
      </RadioGroup>
      <Box class={css.dropdown}>
                <SelectTextFields label={defaultval} />
                <SelectTextFields label={defaul2tval}/>
            </Box>
    </FormControl>
  );
}
