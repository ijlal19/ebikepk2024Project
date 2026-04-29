import { Box } from '@mui/material'
import styles from './index.module.scss'
import BikeFilterBar from '@/ebikeWeb/sharedComponents/bikeFilterBar';

const Banner = () => {
    return (
        <div>
            <Box className={styles.main}>
                <BikeFilterBar />
            </Box>
        </div>
    )
}
export default Banner
