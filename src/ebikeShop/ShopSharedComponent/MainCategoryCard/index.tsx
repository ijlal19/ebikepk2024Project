import styles from './index.module.scss';
import {add3Dots , optimizeImage} from '../../../genericFunctions/geneFunc'
const MainCatgeoryCard = ({ props }: any) => {

    // add3Dots()
    return (
        <div className={styles.main}>
            <div className={styles.image_box}>
                <img src={optimizeImage(props?.images[0] , 'h_250' , 'w_350')} alt="" className={styles.image} />
            </div>
            <div className={styles.price_box}>
                <p className={styles.name}>{ add3Dots(props.product_name , 20 )}</p>
                <p className={styles.price}>{props?.product_price === '0' || props?.product_price?.trim() === "" ? "" : `PKR: ${props?.product_price}`}
                </p>
            </div>
        </div>
    )
}

export default MainCatgeoryCard