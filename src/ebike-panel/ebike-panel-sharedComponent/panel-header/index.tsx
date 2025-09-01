import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';
import { checkAuthAndRedirect, GetUserDetail } from '@/ebike-panel/ebike-panel-Function/globalfunction';
const jsCookie = require("js-cookie");
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DropwDownMenu from './dropdown';
import SearchIcon from '@mui/icons-material/Search';


// const Panel_header = ({ value, onChange, placeholder }: any) => {
//     const [displayText, setDisplayText] = useState('login');
//     const [displayName, setDisplayName] = useState('ebiker');
//     const router = useRouter()
//     useEffect(() => {
//         const storedData = localStorage.getItem('userData');
//         const userCookie = jsCookie.get("userData_ebike_panel");
//         // console.log(UserId)

//         if (userCookie) {
//             const userData = JSON.parse(userCookie);
//             const UserId = userData?.uid;
//             try {
//                 // const userData = JSON.parse(storedData);
//                 if (userData?.login === true) {
//                     setDisplayText('Logout');
//                 }
//                 if (userData?.name) {
//                     setDisplayName(userData.name);
//                 }
//                 // else {
//                 //     setDisplayText('ebiker');
//                 // }
//             } catch (err) {
//                 console.error("Invalid JSON in localStorage: userData");
//             }
//         }
//     }, []);


//     const handleLogout = () => {
//         const pathname = window.location.pathname
//         jsCookie.remove('userData_ebike_panel');
//         checkAuthAndRedirect(router, pathname)

//     };


//     return (
//         <div className={styles.header}>
//             <div className={styles.wraper}>
//                 <div className={styles.input_box}>
//                     {placeholder !== "" && (
//                         <input
//                             type="text"
//                             value={value}
//                             onChange={onChange}
//                             placeholder={placeholder}
//                             className={styles.input} />
//                     )}
//                     {/* className={styles.input} */}
//                 </div>
//                 <div className={styles.btn_box}>
//                     <div className={styles.ebiker_box}>
//                         <AccountCircleIcon />  <p className={styles.ebiker_heading}>{displayName}</p>
//                     </div>
//                     <button className={styles.logout} onClick={handleLogout}>Logout</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

const NavOptionArray = [
    {
        heading: "Bikes",
        option: [
            {
                OptionName: "Used Bikes",
                OptionRoute: "view-classified-ads"
            },
            {
                OptionName: "New Bikes",
                OptionRoute: "all-new-bikes"
            },
            {
                OptionName: "Electric Bikes",
                OptionRoute: "all-electric-bikes"
            },
        ]
    },
    {
        heading: "Blog",
        option: [
            {
                OptionName: "All Blog",
                OptionRoute: "blog-list"
            },
        ]
    },
    {
        heading: "General",
        option: [
            {
                OptionName: "Dealers",
                OptionRoute: "all-dealers"
            },
            {
                OptionName: "Mechanics",
                OptionRoute: "all-mechanics"
            },
            {
                OptionName: "Pages",
                OptionRoute: "all-pages"
            },
            {
                OptionName: "Brands",
                OptionRoute: "all-bike-brands"
            },
            {
                OptionName: "Cities",
                OptionRoute: "all-cities"
            },
            // {
            //     OptionName: "Topic/Comment List",
            //     OptionRoute: ""
            // },
            // {
            //     OptionName: "Forum Category",
            //     OptionRoute: ""
            // },
            {
                OptionName: "All User",
                OptionRoute: "user/all-user"
            },
            // {
            //     OptionName : "",
            //     OptionRoute : ""
            // },
        ]
    }
    ,{
        heading: "Shop",
        option: [
            {
                OptionName: "Product List",
                OptionRoute: "product-list"
            },
            {
                OptionName: "Add Shop Category",
                OptionRoute: "add-shop-category"
            },
            {
                OptionName: "Shop Brand List",
                OptionRoute: "shop-brand-list"
            }
            // {
            //     OptionName: "Order List",
            //     OptionRoute: ""
            // },
            // {
            //     OptionName: "Add Coupon Code",
            //     OptionRoute: ""
            // },
        ]
    }
    // {
    //     heading : "",
    //     option : [
    //         {
    //             OptionName : "",
    //             OptionRoute : ""
    //         },
    //     ]
    // },
]

const New_header = ({ value, onChange, placeholder }: any) => {
    const [Detail, setUserDetail] = useState<any>({})
    const router = useRouter()

    useEffect(() => {
        const res = GetUserDetail()
        setUserDetail(res)

    },[])

    const handleLogout = () => {
            const pathname = window.location.pathname
            jsCookie.remove('userData_ebike_panel');
            checkAuthAndRedirect(router, pathname)

        };
    return (
        <div className={styles.main} >
            <img src="https://res.cloudinary.com/dtroqldun/image/upload/c_thumb,dpr_auto,f_auto,h_40,w_auto,q_auto/v1541058800/ebike-graphics/logos/logo_ebike.pk.png" alt="" className={styles.logo} />
            {/* <form className={styles.input_box}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={styles.input} />
                <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
            </form> */}
                {/* <input type="Search any thing" className={styles.input} placeholder='Search any thong...' /> */}
            <div className={styles.nav_option_main}>
                <DropwDownMenu props={NavOptionArray[0]} />
                <DropwDownMenu props={NavOptionArray[1]} />
                <DropwDownMenu props={NavOptionArray[2]} />
                <DropwDownMenu props={NavOptionArray[3]} />
            </div>
            <div className={styles.action_btn}>
                <button className={styles.user_btn}>
                    {Detail?.name || 'ebiker'}
                </button>
                <button className={styles.user_btn} onClick={handleLogout}>
                    {Detail?.accessToken ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    )
}

export { New_header };
