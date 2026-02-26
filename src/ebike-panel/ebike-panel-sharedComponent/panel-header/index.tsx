import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';
import { checkAuthAndRedirect, GetUserDetail } from '@/ebike-panel/ebike-panel-Function/globalfunction';
const jsCookie = require("js-cookie");
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DropwDownMenu from './dropdown';
import SearchIcon from '@mui/icons-material/Search';

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
            {
                OptionName: "Add Certified Bike",
                OptionRoute: "used-bikes/sell-used-bike"
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
                OptionRoute: "all-bike-brands?page=1"
            },
            {
                OptionName: "Cities",
                OptionRoute: "all-cities"
            },
            {
                OptionName: "All User",
                OptionRoute: "user/all-user"
            },
            {
                OptionName: "Bike Videos",
                OptionRoute: "all-bike-videos"
            },
            {
                OptionName: "Website Setting",
                OptionRoute: "all-website-settings"
            }
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
            },
            {
                OptionName: "Order List",
                OptionRoute: "order-list"
            },
            {
                OptionName: "Add Coupon Code",
                OptionRoute: "coupon-list"
            }
        ]
    }
    ,{
        heading: "Bikers Forums",
        option: [
            {
                OptionName: "All Forums Main Category",
                OptionRoute: "all-main-category"
            },
            {
                OptionName: "Forums Sub Category",
                OptionRoute: "all-sub-category"
            },
            {
                OptionName: "All Threads",
                OptionRoute: "all-threads"
            },
            {
                OptionName: "All Threads Comment",
                OptionRoute: "all-threads-comments"
            }
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
                <DropwDownMenu props={NavOptionArray[4]} />
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
