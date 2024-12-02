import { FeatureMechanicCard } from '../Card'
import styles from './index.module.scss'
export const FeatureMechanics =({featuredmechanics}:any)=>{
return(
    <div className={styles.featuremain}>
        <p className={styles.heading}>Featured Mechanics</p>
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