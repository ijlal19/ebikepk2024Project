import { add3Dots, optimizeImage } from '../../../genericFunctions/geneFunc';
import { Box, Link, Rating, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from './index.module.scss';

const MainCatgeoryCard = ({ props, rating }: any) => {

    const isMobile = useMediaQuery('(max-width:768px')
    const title = props?.product_name || '';
    const id = props?.id || '';
    const urlTitle = title.toLowerCase().replaceAll(' ', '-');
    const href = `/shop/product/${urlTitle}/${id}`;

    const handleClick = ()=>{
        localStorage.setItem("rating" , JSON.stringify({rating:rating}))
    }

    return (
        <Link href={href} sx={{ textDecoration: "none" }} onClick={()=>handleClick()} >
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
                        <p className={styles.product_price}><del>{props?.product_price === '0' || props?.product_price?.trim() === "" ? <span style={{color:"red"}}>PKR:0</span> : <span style={{fontSize:"14px", color:"red"}}>PKR:<span style={{ color: "red" , fontWeight:"bolder"}}>{props?.product_price}</span></span>}</del></p> 
                        <p className={styles.sell_price}>{props?.sell_price === '0' || props?.sell_price?.trim() === "" ? <span style={{color:"green"}}>PKR:0</span> : <span style={{color:"green",fontSize:"13"}}>PKR:<span style={{ color: "green" ,fontWeight:"bolder"}}>{props?.sell_price}</span></span>}</p>
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