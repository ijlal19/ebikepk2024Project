import styles from './index.module.scss';
import { add3Dots, optimizeImage } from '../../../genericFunctions/geneFunc';
import StarIcon from '@mui/icons-material/Star';
import { Box, Rating, useMediaQuery } from '@mui/material';

const MainCatgeoryCard = ({ props, rating }: any) => {
    const isMobile = useMediaQuery('(max-width:768px')

    return (
        <div className={styles.main}>
            <div className={styles.image_box}>
                <img src={optimizeImage(props?.images[0], 'h_250', 'w_350')} alt="" className={styles.image} />
            </div>
            <div className={styles.price_box}>
                {
                    isMobile ? 
                <p className={styles.name}>
                    {add3Dots(props.product_name, 13)}
                    </p>
                    :
                <p className={styles.name}>
                    {add3Dots(props.product_name, 18)}
                    </p>
                }
                <p className={styles.price}>{props?.product_price === '0' || props?.product_price?.trim() === "" ? "PKR: 0" : `PKR: ${props?.product_price}`}</p>
                {/* <p className={styles.rating}><StarIcon className={styles.rate_icon}/>{rating}</p> */}
                <Box className={styles.rating}>
                    <Rating
                        name="read-only-rating"
                        value={rating}
                        precision={0.5}
                        readOnly
                        sx={{ color: "orange",fontSize:"20px" }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55, color: "gray",fontSize:"20px" }} fontSize="inherit" />}
                    />
                </Box>
            </div>
        </div>
    )
}

export default MainCatgeoryCard