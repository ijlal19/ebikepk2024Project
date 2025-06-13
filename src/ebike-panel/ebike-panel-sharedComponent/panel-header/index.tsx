import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';

const Panel_header = () => {
    const [displayText, setDisplayText] = useState('login');
    const [displayName, setDisplayName] = useState('ebiker');
    const router = useRouter()
    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            try {
                const userData = JSON.parse(storedData);
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

    const handleLogout =()=>{
        localStorage.removeItem('userData')
        router.push('/ebike-panel/login')
    }

    return (
        <div className={styles.header}>
            <div className={styles.wraper}>
                <div className={styles.back_icon}>
                    <ChevronLeftIcon className={styles.icon} />
                </div>
                <div className={styles.ebiker_box}>
                    <p className={styles.ebiker_heading}>{displayName}</p>
                </div>
                {displayText === 'Logout' ?
                    <button className={styles.logout} onClick={handleLogout}>Logout</button>
                    :
                    <button className={styles.logout}>Login</button>
                }
            </div>
        </div>
    );
};

export default Panel_header;
