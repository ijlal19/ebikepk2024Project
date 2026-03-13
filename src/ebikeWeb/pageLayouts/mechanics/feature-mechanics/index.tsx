import { FeatureMechanicCard } from '../Card'
import styles from './index.module.scss'
import { getMechanicTypeLabel } from '@/constants/mechanicType';
export const FeatureMechanics =({featuredmechanics, selectedType = "all"}:any)=>{
return(
    <div className={styles.featuremain}>
        <p className={styles.heading}>{selectedType === "all" ? "Featured Mechanics" : `Featured ${getMechanicTypeLabel(selectedType, "mechanic")}s`}</p>
        <div className={styles.card_box}>
        {
            featuredmechanics?.length > 0 ? featuredmechanics.slice(0,12).map((e:any,i:any)=>{
                return(
                    <FeatureMechanicCard props={e} key={i}/>
                )
            }): <></>
        }
        </div>
    </div>
)
}
