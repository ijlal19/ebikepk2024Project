import { add3Dots, optimizeImage } from '../../../genericFunctions/geneFunc';
import { Box, Link, Rating, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from './index.module.scss';

const MainCatgeoryCard = ({ props, rating,CategoryName }: any) => {
    const isMobile = useMediaQuery('(max-width:768px')
    console.log("data", props)

    const title = props?.product_name || '';
    const id = props?.id || '';
    const urlTitle = title.toLowerCase().replaceAll(' ', '-');
    const href = `/shop/${CategoryName}/${urlTitle}/${id}`;

    return (
        <Link href={href} sx={{ textDecoration: "none" }}>
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
                    <span className={styles.all_price}>
                        <p className={styles.sell_price}>{props?.sell_price === '0' || props?.sell_price?.trim() === "" ? "" : <>PKR: <span style={{ color: "green" }}>{props?.sell_price}</span></>}</p>
                        <p className={styles.product_price}><del>{props?.product_price === '0' || props?.product_price?.trim() === "" ? "" : <>PKR: <span style={{ color: "red" }}>{props?.product_price}</span></>}</del></p>
                    </span>
                    <Box className={styles.rating}>
                        <Rating
                            name="read-only-rating"
                            value={rating}
                            precision={0.5}
                            readOnly
                            sx={{ color: "orange", fontSize: "20px" }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55, color: "gray", fontSize: "20px" }} fontSize="inherit" />}
                        />
                    </Box>
                </div>
            </div>
        </Link>
    )
}

export default MainCatgeoryCard