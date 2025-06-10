import styles from './index.module.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Pannel_header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wraper}>

                <div className={styles.back_icon} ><ChevronLeftIcon className={styles.icon} /></div>
                <div className={styles.ebiker_box}>
                    <p className={styles.ebiker_heading} >ebiker</p>
                </div>
                <button className={styles.logout

                } >Logout</button>
            </div>
        </div>
    )
}
export default Pannel_header