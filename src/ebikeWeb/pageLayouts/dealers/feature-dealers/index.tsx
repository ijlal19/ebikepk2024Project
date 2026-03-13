import { FeatureDealerCard } from '../Card';
import styles from './index.module.scss';
import { getMechanicTypeLabel } from '@/constants/mechanicType';

export const FeatureDelers =({featuredDealers, selectedType = "all"}:any)=>{
return(
    <div className={styles.featuremain}>
        <p className={styles.heading}>{selectedType === "all" ? "Featured Dealers" : `Featured ${getMechanicTypeLabel(selectedType, "dealer")}s`}</p>
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
