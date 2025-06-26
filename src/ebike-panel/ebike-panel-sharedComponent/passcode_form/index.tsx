'use client'
import { useState } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
const jsCookie = require('js-cookie');

const Passcode_form = ({props}:any) => {
    const router = useRouter()
    const [Passcode, setPasscode] = useState('')

    const handlePasscode = async () => {
        if(Passcode === ''){
            alert('Fill Passcode Field!')
        }
       else  if (Passcode === 'Tarrar$$156chin@') {
            jsCookie.set('userData_ebike_panel', JSON.stringify(props), { expires: 1 });
            router.push('/ebike-panel/dashboard');
        } else {
            alert('Incorrect passcode. Please try again.');
        }
    };


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <p className={styles.heading}>Enter Passcode To Login</p>
                <div className={styles.form_box}>
                    <input type="password" placeholder="Passcode" onChange={(e) => { setPasscode(e?.target.value) }} className={styles.input} />
                    <Button className={styles.btn} onClick={handlePasscode} >Verify</Button>
                </div>
            </div>
        </div>
    )
}
export default Passcode_form