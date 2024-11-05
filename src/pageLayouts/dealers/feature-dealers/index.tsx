import styles from './index.module.scss'
import { FeatureDealerCard } from '../Card'
export const FeatureDelers =({props}:any)=>{
return(
    <div className={styles.featuremain}>
        <p className={styles.heading}>Featured Dealers</p>
        <div className={styles.card_box}>
        {
            props.slice(0,12).map((e:any)=>{
                return(
                    <FeatureDealerCard props={e}/>
                )
            })
        }
        </div>
    </div>
)
}