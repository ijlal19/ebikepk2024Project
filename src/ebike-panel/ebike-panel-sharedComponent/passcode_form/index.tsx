'use client'
import { useState } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/navigation";

const Passcode_form = () => {
    const router = useRouter()
    const [Passcode, setPasscode] = useState('')

    const handlePasscode = async () => {
        if(Passcode === ''){
            alert('Fill Passcode Field!')
        }
       else  if (Passcode === 'Tarrar$$156chin@') {
            router.push('/ebike-panel/dashboard');
        } else {
            alert('Incorrect passcode. Please try again.');
        }
    };


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <p className={styles.heading}>Enter the passcode to login</p>
                <div className={styles.form_box}>
                    <input type="password" placeholder="passcode" onChange={(e) => { setPasscode(e?.target.value) }} className={styles.input} />
                    <button className={styles.btn} onClick={handlePasscode} >Verify</button>
                </div>
            </div>
        </div>
    )
}
export default Passcode_form