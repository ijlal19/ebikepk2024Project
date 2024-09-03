import { Box } from '@mui/material'
import css from './Banner.module.css'
import SearchBox from './SearchBox/SearchBox'
const Banner=()=>{
    return(
        <Box class={css.main}>
            <Box class={css.search}>
                <SearchBox/>
            </Box>
        </Box>
    )
}
export default Banner