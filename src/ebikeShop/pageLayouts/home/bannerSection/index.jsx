import { Box } from '@mui/material'
import styles from './index.module.scss'
import SearchBox from './SearchBox/SearchBox'

const Banner = () => {
    return(
        <div>
            <Box class={styles.main}>
                <Box class={styles.search}>
                    {/* <SearchBox/> */}
                </Box>
            </Box>
        </div>
    )
}
export default Banner