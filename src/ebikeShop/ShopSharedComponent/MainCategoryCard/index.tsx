import styles from './index.module.scss';

const MainCatgeoryCard = ({props}:any)=>{
    return(
        <div className={styles.main}>
            <div className={styles.image_box}>
                <img src={props.images[0]} alt="" className={styles.image}/>
            </div>
            <div className={styles.price_box}>
                <p className={styles.name}>{props.product_name.slice(0,25)}</p>
                <p className={styles.price}>PKR:{props?.product_price}</p>
                <button className={styles.button}>ADD TO BAG</button>
            </div>
        </div>
    )
}

export default MainCatgeoryCard