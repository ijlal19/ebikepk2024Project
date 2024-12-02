import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import css from './DropDown.module.css'
const BikesOption = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 }
];

export default function SelectTextFields({label}) {
  return (
  <>
   <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={BikesOption}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
     class={css.textfield}/>
  </>
  );
}