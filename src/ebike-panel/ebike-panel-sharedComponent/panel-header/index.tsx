import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';
import { checkAuthAndRedirect } from '@/ebike-panel/ebike-panel-Function/globalfunction';
const jsCookie = require("js-cookie");
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Panel_header = ({ value, onChange, placeholder }: any) => {
    const [displayText, setDisplayText] = useState('login');
    const [displayName, setDisplayName] = useState('ebiker');
    const router = useRouter()
    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        const userCookie = jsCookie.get("userData_ebike_panel");
        // console.log(UserId)

        if (userCookie) {
            const userData = JSON.parse(userCookie);
            const UserId = userData?.uid;
            try {
                // const userData = JSON.parse(storedData);
                if (userData?.login === true) {
                    setDisplayText('Logout');
                }
                if (userData?.name) {
                    setDisplayName(userData.name);
                }
                // else {
                //     setDisplayText('ebiker');
                // }
            } catch (err) {
                console.error("Invalid JSON in localStorage: userData");
            }
        }
    }, []);


    const handleLogout = () => {
        const pathname = window.location.pathname
        jsCookie.remove('userData_ebike_panel');
        checkAuthAndRedirect(router , pathname)

    };


    return (
        <div className={styles.header}>
            <div className={styles.wraper}>
                <div className={styles.input_box}>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={styles.input} />
                        {/* className={styles.input} */}
                </div>
                <div className={styles.btn_box}>
                <div className={styles.ebiker_box}>
                  <AccountCircleIcon/>  <p className={styles.ebiker_heading}>{displayName}</p>
                </div>
                <button className={styles.logout} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Panel_header;
