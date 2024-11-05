import styles from './index.module.scss'

export const FeatureDealerCard =({props}:any)=>{
    console.log({props})
    return(
        <div className={styles.feature_card_main}>
            <p className={styles.shop_name}>{props.shop_name}</p>
            <img className={styles.logo} src={props.bike_brand.logoUrl} alt="" />
            <p className={styles.city}>Dealer in {props.city.city_name}</p>
            <p className={styles.address}>{props.address.slice(0,12)} ...</p>
            <p className={styles.date}>Listen on {props.updatedAt.slice(0,10)}</p>
            <button className={styles.more_details_button}>More Details</button>
        </div>
    )
}










// export const DealerinPakCard =()=>{
//     return(
//         <>
//         <p>Dealer In Pakistan Card</p>
//         </>
//     )
// }