import { add3Dots, cloudinaryLoader, optimizeImage } from '../../../genericFunctions/geneFunc';
import { Box, Link, Rating, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from './index.module.scss';

const MainCatgeoryCard = ({ props, rating, i }: any) => {

    const isMobile = useMediaQuery('(max-width:768px')
    const title = props?.product_name || '';
    const id = props?.id || '';
    const urlTitle = title.toLowerCase().replaceAll(' ', '-');
    const href = `/shop/product/${urlTitle}/${id}`;

    const handleClick = () => {
        const currentRating = rating[i] || "4.0";
        localStorage.setItem("rating", JSON.stringify({ rating: currentRating }));
    }

    const reviewNum = [
        '4.8', '4.5', '4.9', '4.6', '4.7', '4.6'
    ]

    const reviewNum2 = [
        '5.0', '4.8', '4.5', '4.6', '4.7', '4.5'
    ]

    return (
        <Link href={href} sx={{ textDecoration: "none" }} onClick={() => handleClick()} >
            <div className={styles.main}>
                <div className={styles.image_box}>
                    <img src={cloudinaryLoader(props?.images[0], 400 , 'auto')} alt="" className={styles.image} />
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
                        <p className={styles.product_price}><del>{props?.product_price === '0' || props?.product_price?.trim() === "" ? <span style={{ color: "red" }}>PKR:0</span> : <span style={{ fontSize: "14px", color: "red" }}>PKR:<span style={{ color: "red", fontWeight: "bolder" }}>{props?.product_price}</span></span>}</del></p>
                        <p className={styles.sell_price}>{props?.sell_price === '0' || props?.sell_price?.trim() === "" ? <span style={{ color: "green" }}>PKR:0</span> : <span style={{ color: "green", fontSize: "13" }}>PKR:<span style={{ color: "green", fontWeight: "bolder" }}>{props?.sell_price}</span></span>}</p>
                    </span>
                    <Box className={styles.rating}>
                        <Rating
                            name="read-only-rating"
                            value={parseFloat(rating[i] || "4.0" || "3.5")}
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