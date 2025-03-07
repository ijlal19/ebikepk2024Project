import styles from './index.module.scss';

const MainCatgeoryCard = ({props}:any)=>{
    return(
        <div className={styles.main}>
            <div className={styles.image_box}>
                <img src='https://imtiazautos.pk/wp-content/uploads/2022/09/IMG_9598-600x600.jpg' alt="" className={styles.image}/>
            </div>
            <div className={styles.price_box}>
                <p className={styles.name}>{props.name}</p>
                <p className={styles.price}>RS:12000</p>
            </div>
        </div>
    )
}

export default MainCatgeoryCard