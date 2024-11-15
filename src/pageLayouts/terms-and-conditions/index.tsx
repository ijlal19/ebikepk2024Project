import React from "react"
import styles from './index.module.scss'
import TermData from './data'
const TermsCondition = () => {
    return (
        <div className={styles.trem_and_cond_main}>
            <div className={styles.container}>
                {/* <div className={styles.heading_box}> */}
                    <p className={styles.heading}>Terms and Conditions</p>
                {/* </div> */}
                <div className={styles.paragraph_box}  dangerouslySetInnerHTML={{ __html: TermData.html }}>
                    {/* {Termdat} */}
                </div>
            </div>
        </div>
    )
}

export default TermsCondition;