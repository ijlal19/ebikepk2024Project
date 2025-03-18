import { FeatureDealerCard } from '../Card';
import styles from './index.module.scss';

export const FeatureDelers =({featuredDealers}:any)=>{
return(
    <div className={styles.featuremain}>
        <p className={styles.heading}>Featured Dealers</p>
        <div className={styles.card_box}>
        {
            featuredDealers?.length > 0 ? featuredDealers.slice(0,12).map((e:any,i:any)=>{
                return(
                    <FeatureDealerCard props={e} key={i}/>
                )
            }) : <></>
        }
        </div>
    </div>
)
}