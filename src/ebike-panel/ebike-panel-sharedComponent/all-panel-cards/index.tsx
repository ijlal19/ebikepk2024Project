'use client'
import { addNewCity, ChangeApprove, ChangeDealerApprove, ChangeDealerFeatured, ChangeFeatured, ChangeMechanicApprove, ChangeMechanicFeatured, DeleteBlogById, DeleteBrandCompany, DeleteBrandbyId, DeleteCitybyId, DeleteDealerbyId, DeleteMainForumCategory, DeleteMechanicbyId, DeleteNewBikeById, DeletePagebyId, DeleteProductbyId, DeleteThread, DeleteThreadComment, DeleteUsedBikeById, getAllBlog, getAllDealer, getAllMechanics, getAllNewBike, getAllPages, getCityData, getCustomBikeAd, getShopCategory, getShopMainCategory, getSessionData, GetAllMainForumCategory, GetAllSubForumCategory, GetAllThreads, GetAllThreadsComments, GetCompanyBrand, GetAllVideos, DeleteBikeVideo, AddNewVideo, getbrandData } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { AddForumMainCategory, AddForumThread, AddForumThreadComment, AddShopBrandPopup, BasicModal, EditForumMainCategory, EditForumThread, EditForumThreadComment, EditVideo, ShopBrandPopup } from "./popup";
import { add3Dots, priceWithCommas, cloudinaryLoader, optimizeImage } from "@/genericFunctions/geneFunc";
import { getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { CityArr } from "@/ebikeWeb/constants/globalData";
import { Grid, Link, Pagination } from "@mui/material";
import { Navigation, FreeMode } from 'swiper/modules';
import SearchIcon from '@mui/icons-material/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import { New_header } from "../panel-header";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from './index.module.scss';
import '../../../app/globals.scss';
import 'swiper/css/navigation';
import Data from "./data";
import 'swiper/css';

let savedPage: any;
let saveNewBike: any;
let Usedbikewindowscroll: any;
let Newbikewindowscroll: any;
let brandScroll: any;
let AllBrandArray: any[] = [];


/////////////////////////////////////////////////////// USED BIKE CARD
const Used_bike_card: any = () => {

    const [displayedBikes, setDisplayedBikes] = useState([]);
    const [AllBikeForFilter, setAllBikeForFilter] = useState([]);
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [IsLoading, setIsLoading] = useState(false);
    const [AllBikeArr, setAllBikeArr] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 12;

    const router = useRouter();

    useEffect(() => {
        let savedPageStr = Number(localStorage.getItem("PageUsedBike"));
        const savedScrollStr = localStorage.getItem("UsedBikeScroll");
        const prev_page = localStorage.getItem("prev_page");
        savedPage = savedPageStr

        const brandData = getSessionData("BrandsData")
        AllBrandArray = brandData

        if (savedScrollStr && prev_page === 'edit-used-bike') {
            fetchAllUsedBike(savedPage);
            setCurrentPage(savedPage);
            localStorage.removeItem("prev_page");
            Usedbikewindowscroll = Number(savedScrollStr)
        }
        else {
            fetchAllUsedBike(1);
            setCurrentPage(1);
        }
        setTimeout(() => {
            localStorage.removeItem("PageUsedBike");
        }, 1000);
    }, []);

    useEffect(() => {
        const filtered = AllBikeForFilter.filter((bike: any) =>
            bike.id.toString().includes(searchTerm)
        );
        setFilteredBikes(filtered);
        setCurrentPage(savedPage || 1);
    }, [searchTerm, AllBikeForFilter]);

    useEffect(() => {

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedBikes(filteredBikes.slice(startIndex, endIndex));

        setTotalPage(Math.ceil(filteredBikes.length / itemsPerPage));
    }, [filteredBikes, currentPage]);

    const handlePaginationChange = async (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const GetName = (from: any, id: any) => {
        if (from == 'brand') {
            let brand = getBrandFromId(id, AllBrandArray);
            return brand[0]?.brandName || 'N/A';
        } else {
            let city = getCityFromId(id, CityArr);
            return city[0]?.city_name || 'N/A';
        }
    };

    const GetPhone = (phone: any) => {
        if (!phone) return 'N/A';
        if (phone?.charAt(0) != '0') {
            const phoneNo = '0' + phone;
            return `${phoneNo.slice(0, 4)}-${phoneNo.slice(4)}`;
        }
        return phone;
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (id: any) => {
        localStorage.setItem("PageUsedBike", String(currentPage))
        localStorage.setItem("UsedBikeScroll", window.scrollY.toString());
        localStorage.setItem("prev_page", "edit-used-bike");
        router.push(`/ebike-panel/dashboard/edit-classified-ads/${id}`);
    };

    const handleDelete = async (id: any) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Ad?");
        if (!confirmDelete) return;

        const res = await DeleteUsedBikeById(id);
        if (res && res?.success) {
            alert('Delete Successfully')
            fetchAllUsedBike(currentPage);
        } else {
            alert("Something went wrong!");
        }
    };

    const handleFeatureToggle = async (id: any, currentStatus: boolean) => {
        const confirmDelete = window.confirm("Are you sure to change Featured?");
        if (!confirmDelete) return;
        const obj = {
            id: id,
            item: { isFeatured: currentStatus ? false : true }
        }
        // console.log(obj)
        const res = await ChangeFeatured(id, obj)
        if (res && res?.info && res?.info?.indexOf("feature Ad") > -1) {
            alert('Updated Successfully ')
            fetchAllUsedBike(savedPage || 1)
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const handleApproveToggle = async (id: any, currentStatus: boolean) => {
        const confirmDelete = window.confirm("Are you sure you want to Change Ad Approve?");
        if (!confirmDelete) return;
        const obj = {
            id: id,
            item: { isApproved: currentStatus ? false : true }
        }
        console.log(obj)
        const res = await ChangeApprove(id, obj)
        if (res && res?.info?.indexOf('Approve Ad') > -1) {
            alert('Updated Successfully')
            fetchAllUsedBike(savedPage || 1)
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const fetchAllUsedBike = async (_page: any) => {
        setIsLoading(true);

        try {

            // const obj = {
            //     page: _page,
            //     adslimit: 10,
            //     isApproved: "no"
            // };

            // const res = await getCustomBikeAd(obj);

            // if (res && res?.data?.length > 0) {

            const obj1 = {
                page: 1,
                // adslimit: res?.total,
                adslimit: 500,
                isApproved: "no"
            };

            const res1 = await getCustomBikeAd(obj1);
            console.log("res", res1)
            if (res1 && res1?.data?.length > 0) {
                setAllBikeForFilter(res1.data);
                setCurrentPage(res1?.currentPage)
                setAllBikeArr(res1?.data)
                setTotalPage(res1?.pages)
            }
            else {
                setCurrentPage(1)
                setAllBikeArr([])
                setTotalPage(0)
                setAllBikeForFilter([]);
            }
            //             else {
            // }

            // setCurrentPage(_page);
            // setAllBikeArr(res1.data);
            setIsLoading(false);
            setTimeout(() => {
                window.scrollTo({
                    top: Usedbikewindowscroll,
                    left: 0,
                    behavior: 'smooth'
                });
            }, 500);

            // } else {
            //     setCurrentPage(1);
            //     setAllBikeArr([]);
            //     setAllBikeForFilter([]);
            //     setFilteredBikes([]);
            //     setTotalPage(0);
            // }

        }
        catch (error) {
            console.error("Error fetching bikes:", error);
        }
    };

    return (
        <div className={styles.main_used_bike}>
            <New_header value={searchTerm} onChange={handleSearch} placeholder="Search Ad By Seller ID" />
            {!IsLoading ? (
                <div className={styles.big_container}>
                    <div className={styles.page_header}>
                        <button className={styles.add_new_btn}>
                            <Link href="/ebike-panel/dashboard/create-blog-post" sx={{
                                color: "white", textDecoration: 'none'
                            }} ></Link></button>
                        {filteredBikes?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search Ad with Ad ID'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                    </div>
                    <div className={styles.card_conatiner}>
                        {displayedBikes.length > 0 ? (
                            <>
                                {displayedBikes.map((e: any, i: any) => (
                                    <div className={styles.main_box_card} key={i}>
                                        <div className={styles.card_container_box}>
                                            <div className={styles.card_header}>
                                                {/* <h3 className={styles.heading}>{add3Dots(e?.title, 50) || 'No Title'}</h3> */}
                                                <span className={`${styles.featured_badge} ${e?.isFeatured ? styles.featured : ''}`}>
                                                    IsFeatured: {e?.isFeatured ? 'True' : 'False'}
                                                </span>
                                                <span className={`${styles.featured_badge} ${e?.isApproved ? styles.featured : ''}`}>
                                                    IsApproved: {e?.isApproved ? 'True' : 'False'}
                                                </span>
                                                {/* <span className={styles.ad_id}>Ad ID: {e?.id || 'N/A'}</span> */}
                                            </div>

                                            <div className={styles.card_content}>
                                                <div className={styles.cardimage_box}>

                                                    <Swiper
                                                        spaceBetween={50}
                                                        slidesPerView={1}
                                                        onSlideChange={() => console.log('slide change')}
                                                        onSwiper={(swiper) => console.log(swiper)}
                                                        modules={[Navigation, FreeMode]}
                                                        navigation={true}
                                                        initialSlide={0}
                                                        loop={true}
                                                        className={styles.image}
                                                    >
                                                        {
                                                            e?.images && e?.images.length > 0 ?
                                                                e.images.map((imgUrl: any, ind: any) => {
                                                                    return (
                                                                        <SwiperSlide key={imgUrl} className={styles.image} >
                                                                            {/* <img src={optimizeImage(imgUrl, 'h_250', 'w_250')} alt={e?.title} className={styles.image} /> */}
                                                                            <img src={cloudinaryLoader(imgUrl, 400, 'auto')} alt={e?.title} className={styles.image} />
                                                                        </SwiperSlide>
                                                                    )
                                                                }) :
                                                                <SwiperSlide key=''>
                                                                    <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' alt={e?.title} className={styles.image} />
                                                                </SwiperSlide>
                                                        }
                                                    </Swiper>
                                                </div>

                                                <div className={styles.card_detail}>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Title:</span>
                                                        <span>{add3Dots(e?.title, 22) || "N/A"}</span>
                                                    </div>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Ad ID:</span>
                                                        <span>{e?.id}</span>
                                                    </div>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Brand:</span>
                                                        <span>{GetName("brand", e?.brandId)}</span>
                                                    </div>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>City:</span>
                                                        <span>{GetName("city", e?.cityId)}</span>
                                                    </div>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Price:</span>
                                                        <span className={styles.price}>
                                                            {e?.price ? priceWithCommas(e.price) : '0'}
                                                        </span>
                                                    </div>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Seller:</span>
                                                        <span>{e?.sellerName || 'N/A'}</span>
                                                    </div>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Phone:</span>
                                                        <span>{GetPhone(e?.mobileNumber)}</span>
                                                    </div>
                                                    <div className={styles.description}>
                                                        Description:
                                                        <p className={styles.description_text}>
                                                            {add3Dots(e?.description, 90) || 'No description available'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.card_actions}>
                                                <Link href={`/ebike-panel/dashboard/edit-classified-ads/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
                                                    <button
                                                        className={`${styles.action_btn} ${styles.edit_btn}`}
                                                        onClick={() => handleEdit(e?.id)}>
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    className={`${styles.action_btn} ${styles.feature_btn}`}
                                                    onClick={() => handleFeatureToggle(e?.id, e?.isFeatured)}
                                                >
                                                    {e?.isFeatured ? 'UnFeature' : 'Feature'}
                                                </button>
                                                <button
                                                    className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                                    onClick={() => handleApproveToggle(e?.id, e?.isApproved)}
                                                >
                                                    {e?.isApproved ? "Disapprove" : "Approve"}
                                                </button>
                                                <button
                                                    className={`${styles.action_btn} ${styles.delete_btn}`}
                                                    onClick={() => handleDelete(e?.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className={styles.no_results}>
                                <p>No bikes found matching your search criteria.</p>
                            </div>
                        )}
                    </div>
                    <div className={styles.pagination_btm}>
                        {filteredBikes.length > itemsPerPage && (
                            <div className={styles.pagintion_btm}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.loader_container}>
                    <Loader isLoading={IsLoading} />
                </div>
            )}
        </div>
    );
};

/////////////////////////////////////////////////////// NEW BIKE CARD
const New_bike_card = () => {
    const [AllNewBikeForFilter, setAllNewBikeForFilter] = useState<any>([]);
    const [filteredBikes, setFilteredBikes] = useState<any>([]);
    const [displayedBikes, setDisplayedBikes] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);

    const itemsPerPage = 12;
    const router = useRouter();

    useEffect(() => {
        // const savedPage = Number(localStorage.getItem("PageNewBike"));
        const url = new URL(window.location.href);
        const tab = url.searchParams.get("page");
        const tabNumber = Number(tab);
        const savedScrollStr = localStorage.getItem("NewBikeScroll");
        const prev_page = localStorage.getItem("prev_page");
        saveNewBike = tabNumber

        const brandData = getSessionData("BrandsData")
        AllBrandArray = brandData

        if (savedScrollStr && prev_page === 'edit-new-bike' && tab) {
            fetchAllNewBike(tabNumber);
            setCurrentPage(tabNumber);
            localStorage.removeItem("prev_page");
            Newbikewindowscroll = Number(savedScrollStr)
        }
        else {
            fetchAllNewBike(1);
            setCurrentPage(1);
        }
        setTimeout(() => {
            localStorage.removeItem("PageNewBike");
        }, 1000);
    }, []);

    useEffect(() => {
        const filtered = AllNewBikeForFilter.filter((bike: any) =>
            bike.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBikes(filtered);
        setCurrentPage(saveNewBike || 1);
    }, [searchTerm, AllNewBikeForFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedBikes(filteredBikes.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredBikes.length / itemsPerPage));
        console.log('res', Math.ceil(filteredBikes.length / itemsPerPage))
    }, [filteredBikes, currentPage]);

    const fetchAllNewBike = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await getAllNewBike();
            if (res && res.length > 0) {
                setAllNewBikeForFilter(res);
                setFilteredBikes(res);
            } else {
                setAllNewBikeForFilter([]);
                setFilteredBikes([]);
                setDisplayedBikes([]);
            }

        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo({
                top: Newbikewindowscroll,
                left: 0,
                behavior: 'smooth'
            });
        }, 500);
    };

    const handlePaginationChange = (event: any, page: any) => {
        // localStorage.setItem("PageNewBike", String(page))
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const GetName = (from: any, id: any) => {
        if (from === 'brand') {
            const brand = getBrandFromId(id, AllBrandArray);
            return brand[0]?.brandName || "N/A";
        } else {
            const city = getCityFromId(id, CityArr);
            return city[0]?.city_name || "";
        }
    };

    const handleDelete = async (id: any) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this bike?");

        if (!isConfirmed) return;
        const res = await DeleteNewBikeById(id);
        if (res && res.deleted && res.info == "successfully deleted") {
            alert('Delete Successfully')
            fetchAllNewBike(saveNewBike || 1);
        }
        else {
            alert('Something is Wrong!')
        }
        console.log("Deleted:", res);
    };

    const handleEdit = (id: any) => {
        // localStorage.setItem("PageNewBike", String(currentPage))
        localStorage.setItem("NewBikeScroll", window.scrollY.toString());
        localStorage.setItem("prev_page", "edit-new-bike");
        router.push(`/ebike-panel/dashboard/edit-new-bike/${id}?page=${currentPage}`);
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.main_new_bike}>
            <New_header />

            {!IsLoading ? (
                <div className={styles.big_container}>
                    <div className={styles.page_header}>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search New Bike with Title'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                        {filteredBikes?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                        <button className={styles.add_new_btn}>
                            <Link href="/ebike-panel/dashboard/add-new-bike" sx={{
                                color: "white", textDecoration: 'none'
                            }} >Add New Bike</Link></button>
                    </div>
                    <div className={styles.card_container}>
                        {displayedBikes.length > 0 ? (
                            <table className={styles.table_main}>
                                <thead className={styles.thead}>
                                    <tr >
                                        <td className={styles.td} >ID</td>
                                        <td className={styles.td} >Image</td>
                                        <td className={styles.td} >Title</td>
                                        <td className={styles.td} >Brand</td>
                                        <td className={styles.td} >Price</td>
                                        <td className={styles.td} >Action</td>
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {displayedBikes.map((e: any, i: any) => (
                                        <tr className={styles.tr}>
                                            <td className={styles.td} >{e?.id}</td>
                                            <td className={styles.td} ><img src={cloudinaryLoader(e?.images[0], 400, 'auto')} alt="" className={styles.image} /></td>
                                            <td className={styles.td} >{add3Dots(e?.title, 20)}</td>
                                            <td className={styles.td} >{GetName("brand", e?.brandId) || 'N/A'}</td>
                                            <td className={styles.td} >{e?.price ? priceWithCommas(e.price) : '0'}</td>
                                            <td className={styles.td_action}>
                                                <div className={styles.card_actions}>
                                                    <Link href={`/ebike-panel/dashboard/edit-new-bike/${e?.id}?page=${currentPage}`} style={{ textDecoration: 'none', color: "white", width: '100%' }}>
                                                        <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEdit(e?.id)}>
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.no_results}>
                                <p>No bikes found matching your search criteria.</p>
                            </div>
                        )}
                    </div>
                    <div className={styles.pagination}>
                        {filteredBikes?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    );
};

/////////////////////////////////////////////////////// BLOG CARD
const Blog_Card = () => {
    const [AllBlogFilter, setAllBlogFilter] = useState([]);
    const [filteredBlog, setFilteredBlog] = useState([]);
    const [displayedBlog, setDisplayedBlog] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);


    const itemsPerPage = 12;
    const router = useRouter();

    useEffect(() => {
        fetchAllBlog(1);
    }, []);

    useEffect(() => {
        const filtered = AllBlogFilter.filter((bike: any) =>
            bike.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlog(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllBlogFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedBlog(filteredBlog.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredBlog.length / itemsPerPage));
    }, [filteredBlog, currentPage]);

    const fetchAllBlog = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await getAllBlog();
            console.log("data", res)
            if (res && res.length > 0) {
                setAllBlogFilter(res);
                setFilteredBlog(res);
                setCurrentPage(_page);
            } else {
                setAllBlogFilter([]);
                setFilteredBlog([]);
                setDisplayedBlog([]);
                setCurrentPage(1);
                setTotalPage(0);
            }
        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this blog?')
        if (!isConfirm) return;
        const res = await DeleteBlogById(id);
        if (res && res.info == 'Blog has been deleted') {
            alert('Delete Successfully')
            fetchAllBlog(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleEditBlog = (id: any) => {
        router.push(`/ebike-panel/dashboard/edit-blog/${id}`);
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.main_blog}>
            {/* <New_header value={searchTerm} onChange={handleSearch} placeholder="Search Blog with Title" /> */}
            <New_header />

            {!IsLoading ? (
                <div className={styles.big_container}>
                    <div className={styles.page_header}>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search Blog with Title'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                        {filteredBlog?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                        <button className={styles.add_new_btn}>
                            <Link href="/ebike-panel/dashboard/create-blog-post" sx={{
                                color: "white", textDecoration: 'none'
                            }} >Add New Blog</Link></button>
                    </div>
                    <div className={styles.card_container}>
                        {displayedBlog.map((e: any, i: any) => (

                            <div className={styles.main_box_card} key={i}>
                                <div className={styles.card_container_box}>
                                    <div className={styles.card_header}>
                                        <h3 className={styles.heading}>{add3Dots(e?.blogTitle, 25) || 'No Title'}</h3>
                                        {/* <span className={styles.ad_id}>Blog ID: {e?.id}</span> */}
                                    </div>

                                    <div className={styles.card_content}>
                                        <div className={styles.cardimage_box}>
                                            <Swiper
                                                spaceBetween={50}
                                                slidesPerView={1}
                                                onSlideChange={() => console.log('slide change')}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                modules={[Navigation, FreeMode]}
                                                navigation={true}
                                                initialSlide={0}
                                                loop={true}
                                                className={styles.image}
                                            >
                                                {
                                                    e?.featuredImage && e.featuredImage.includes(' #$# ') ? (
                                                        e.featuredImage.split(' #$# ').map((imgUrl: any, ind: any) => (
                                                            <SwiperSlide key={ind} className={styles.image}>
                                                                <img src={cloudinaryLoader(imgUrl.trim(), 400, 'auto')} alt={e?.title} className={styles.image} />
                                                            </SwiperSlide>
                                                        ))
                                                    ) :
                                                        <SwiperSlide key=''>
                                                            <img src={cloudinaryLoader(e?.featuredImage?.split(' #$# ')[0].trim(), 400, 'auto')} alt={e?.title} className={styles.image} />
                                                        </SwiperSlide>
                                                }
                                            </Swiper>
                                        </div>

                                        <div className={styles.card_detail}>
                                            {/* <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Date:</span>
                                            <span>{e?.createdAt ? e?.createdAt.slice(0, 10) : "N/A"}</span>
                                        </div> */}


                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Author Name:</span>
                                                <span>{e?.authorname ? e?.authorname : "N/A"}</span>
                                            </div>

                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Category:</span>
                                                <span>{e?.blog_category?.name ? e?.blog_category?.name : "N/A"}</span>
                                            </div>

                                            <div className={styles.description}>
                                                Description:
                                                <p className={styles.description_text}>
                                                    {add3Dots(e?.meta_description, 110) || 'No description available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.card_actions}>
                                        <a href={`/ebike-panel/dashboard/edit-blog/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
                                            <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEditBlog(e?.id)}>
                                                Edit
                                            </button>
                                        </a>
                                        <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination_btm}>
                        {filteredBlog?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    )
}

/////////////////////////////////////////////////////// DEALERS CARD
const Dealer_Card = () => {
    const [totalApprovePage, setTotalApprovePage] = useState<any>(null);
    const [currentpageapprove, setCurrentpageapprove] = useState(1);
    const [AllApprovedDealer, setAllApprovedDealer] = useState([]);
    const [displayedApprove, setdisplayedApprove] = useState([]);
    const [HandleOpenTabs, setHandleOpenTabs] = useState(false);
    const [Approvefiltered, setApprovefiltered] = useState([]);
    const [AllDealerFilter, setAllDealerFilter] = useState([]);
    const [displayedDealer, setdisplayedDealer] = useState([]);
    const [FilterApprove, setFilterApprove] = useState(false);
    const [filteredDealer, setfilteredDealer] = useState([]);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [IsLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 10;

    useEffect(() => {
        fetchAllDealers(1);
    }, []);
    ///////////////////////////////////////////// For Approved
    useEffect(() => {
        const filtered = AllDealerFilter.filter((bike: any) =>
            bike.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredDealer(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllDealerFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedDealer(filteredDealer.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredDealer.length / itemsPerPage));
    }, [filteredDealer, currentPage]);

    ///////////////////////////////////////////// For Disapproved
    useEffect(() => {
        const startIndex = (currentpageapprove - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedApprove(Approvefiltered.slice(startIndex, endIndex));
        setTotalApprovePage(Math.ceil(Approvefiltered.length / itemsPerPage));
    }, [Approvefiltered, currentpageapprove]);

    useEffect(() => {
        const filtered = AllApprovedDealer.filter((bike: any) =>
            bike.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setApprovefiltered(filtered);
        setCurrentpageapprove(1);
    }, [searchTerm, AllApprovedDealer]);

    const fetchAllDealers = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await getAllDealer();
            if (res && res.length > 0) {
                res?.map((e: any, i: any) => {
                    if (e?.phone?.charAt(0) != '0') {
                        e.phone = '0' + e.phone
                    }
                })
                const approvedDealers = res.filter((e: any) => e?.is_approved === true);
                const disapprovedDealers = res.filter((e: any) => e?.is_approved === false);

                setAllDealerFilter(approvedDealers);
                setfilteredDealer(approvedDealers);

                setAllApprovedDealer(disapprovedDealers);
                setApprovefiltered(disapprovedDealers);

                setCurrentPage(_page);
                setCurrentpageapprove(_page)
            } else {
                setAllDealerFilter([]);
                setfilteredDealer([]);
                setdisplayedDealer([]);
                setCurrentPage(1);
                setTotalPage(0);

                setAllApprovedDealer([]);
                setApprovefiltered([]);
                setdisplayedApprove([])
                setCurrentpageapprove(1);
                setTotalApprovePage(0)
            }
        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        if (!HandleOpenTabs) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
            return
        }
        else {
            setCurrentpageapprove(page);
            window.scrollTo(0, 0);
        }
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Dealer?')
        if (!isConfirm) return;
        const res = await DeleteDealerbyId(id);
        if (res && res.success) {
            alert('Delete Successfully')
            fetchAllDealers(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleApproveToggle = async (id: any, currentStatus: boolean) => {
        const confirmDelete = window.confirm("Are you sure you want to Change Dealer Approve?");
        if (!confirmDelete) return;
        const obj = {
            id: id,
            item: { is_approved: currentStatus ? false : true }
        }
        console.log(obj)
        const res = await ChangeDealerApprove(id, obj)
        if (res && res?.info && res?.info?.indexOf("Approve dealer is") > -1) {
            alert('Updated Successfully')
            fetchAllDealers(currentPage)
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const handleFeatureToggle = async (id: any, currentStatus: boolean) => {
        const confirmDelete = window.confirm("Are you sure to change Featured?");
        if (!confirmDelete) return;
        const obj = {
            id: id,
            item: { is_featured: currentStatus ? false : true }
        }
        console.log(obj)
        const res = await ChangeDealerFeatured(id, obj)
        if (res && res?.info && res?.info?.indexOf("Feature Dealer is") > -1) {
            alert('Updated Successfully')
            fetchAllDealers(currentPage)
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleTabs = (value: any) => {
        if (value == 'showapprove') {
            setHandleOpenTabs(false)
        }
        else if (value == "showdisapprove") {
            setHandleOpenTabs(true)
        }
    }

    return (
        <div className={styles.main_dealers}>
            <New_header value={searchTerm} onChange={handleSearch} placeholder="Search Dealers with Title" />

            {!IsLoading ? (
                <div className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <div className={styles.btnGroup}>
                                <button className={`${styles.btn} ${!HandleOpenTabs ? styles.selected : styles.btn}`} onClick={() => handleTabs('showapprove')} >APPROVE</button>
                                <button className={`${styles.btn} ${HandleOpenTabs ? styles.selected : styles.btn}`} onClick={() => handleTabs('showdisapprove')} >DISAPPROVE</button>
                            </div>
                            <form className={styles.input_box}>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder='Search Dealer Shop Name'
                                    className={styles.input} />
                                <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                            </form>
                        </div>
                        <div className={styles.table_section}>
                            <div className={styles.pagination}>
                                {displayedDealer?.length > 0 && (
                                    <Pagination
                                        count={!HandleOpenTabs ? totalPage : totalApprovePage}
                                        onChange={handlePaginationChange}
                                        page={!HandleOpenTabs ? currentPage : currentpageapprove}
                                        size="medium"
                                        sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                    />
                                )}
                            </div>
                            <div className={styles.table_main}>
                                {
                                    !HandleOpenTabs ?
                                        <table className={styles.table}>
                                            <thead className={styles.thead}>
                                                <th className={styles.th} >Brand Logo</th>
                                                <th className={styles.th} >Shop Name</th>
                                                <th className={styles.th} >Address</th>
                                                <th className={styles.th} >Approve</th>
                                                <th className={styles.th} >Featured</th>
                                                <th className={styles.th} >Delete</th>
                                            </thead>
                                            <tbody className={styles.tbody}>
                                                {
                                                    displayedDealer.length > 0 ? displayedDealer.map((e: any, i: any) => {
                                                        return (
                                                            <tr className={styles.tr} key={i}>
                                                                {/* <td className={styles.td} style={{fontSize:'14px'}} >{e?.id}</td> */}
                                                                <td className={styles.td} >
                                                                    <img src={cloudinaryLoader(e?.bike_brand?.logoUrl, 400, 'auto')} alt={e?.title} className={styles.image} />
                                                                </td>
                                                                <td className={styles.td} >{add3Dots(e?.shop_name, 30) || 'No Title'}</td>
                                                                <td className={styles.td} >{add3Dots(e?.address, 30) || "N/A"}</td>
                                                                <td className={styles.td} ><button
                                                                    className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                                                    onClick={() => handleApproveToggle(e?.id, e?.is_approved)}
                                                                >
                                                                    {e?.is_approved ? "Disapprove" : "Approve"}
                                                                </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button
                                                                        className={`${styles.action_btn} ${styles.feature_btn}`}
                                                                        onClick={() => handleFeatureToggle(e?.id, e?.is_featured)}
                                                                    >
                                                                        {e?.is_featured ? 'UnFeature' : 'Feature'}
                                                                    </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                                {/* <td className={styles.td} >
                                                                                        <button className={styles.del_btn}
                                                                                            onClick={() => handleDelete(e?.id, 'User')}>
                                                                                            Delete
                                                                                        </button>
                                                                                    </td> */}
                                                            </tr>
                                                        )
                                                    }) :
                                                        <tr className={styles.tr}>
                                                            <td colSpan={7} className={styles.td}>User not found</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </table>
                                        :
                                        <table className={styles.table}>
                                            <thead className={styles.thead}>
                                                {/* <th className={styles.th} >ID</th> */}
                                                <th className={styles.th} >Brand Logo</th>
                                                <th className={styles.th} >Shop Name</th>
                                                <th className={styles.th} >Address</th>
                                                <th className={styles.th} >Approve</th>
                                                <th className={styles.th} >Featured</th>
                                                <th className={styles.th} >Delete</th>
                                            </thead>
                                            <tbody className={styles.tbody}>
                                                {
                                                    displayedApprove.length > 0 ? displayedApprove.map((e: any, i: any) => {
                                                        return (
                                                            <tr className={styles.tr} key={i}>
                                                                {/* <td className={styles.td} style={{fontSize:'14px'}} >{e?.id}</td> */}
                                                                <td className={styles.td} >
                                                                    <img src={cloudinaryLoader(e?.bike_brand?.logoUrl, 400, 'auto')} alt={e?.title} className={styles.image} />
                                                                </td>
                                                                <td className={styles.td} >{add3Dots(e?.shop_name, 30) || 'No Title'}</td>
                                                                <td className={styles.td} >{add3Dots(e?.address, 30) || "N/A"}</td>
                                                                {/* <td className={styles.td} >{e?.is_approved? "True" : "False"}/{e?.is_featured?"True":"False"}</td> */}
                                                                <td className={styles.td} ><button
                                                                    className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                                                    onClick={() => handleApproveToggle(e?.id, e?.is_approved)}
                                                                >
                                                                    {e?.is_approved ? "Disapprove" : "Approve"}
                                                                </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button
                                                                        className={`${styles.action_btn} ${styles.feature_btn}`}
                                                                        onClick={() => handleFeatureToggle(e?.id, e?.is_featured)}
                                                                    >
                                                                        {e?.is_featured ? 'UnFeature' : 'Feature'}
                                                                    </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                                {/* <td className={styles.td} >
                                                                                        <button className={styles.del_btn}
                                                                                            onClick={() => handleDelete(e?.id, 'User')}>
                                                                                            Delete
                                                                                        </button>
                                                                                    </td> */}
                                                            </tr>
                                                        )
                                                    }) :
                                                        <tr className={styles.tr}>
                                                            <td colSpan={7} className={styles.td}>User not found</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </table>
                                }
                            </div>
                            <div className={styles.paginationbtm}>
                                {displayedDealer?.length > 0 && (
                                    <Pagination
                                        count={!HandleOpenTabs ? totalPage : totalApprovePage}
                                        onChange={handlePaginationChange}
                                        page={!HandleOpenTabs ? currentPage : currentpageapprove}
                                        size="medium"
                                        sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    )
}

////////////////////////////////////////////////////// MECHANICS Card
const Mechanic_Card = () => {
    const [totalApprovePage, setTotalApprovePage] = useState<any>(null);
    const [currentpageapprove, setCurrentpageapprove] = useState(1);
    const [AllApprovedmechanic, setAllApprovedmechanic] = useState([]);
    const [displayedApprove, setdisplayedApprove] = useState([]);
    const [HandleOpenTabs, setHandleOpenTabs] = useState(false);
    const [Approvefiltered, setApprovefiltered] = useState([]);
    const [AllmechanicFilter, setAllmechanicFilter] = useState([]);
    const [displayedmechanic, setdisplayedmechanic] = useState([]);
    const [FilterApprove, setFilterApprove] = useState(false);
    const [filteredmechanic, setfilteredmechanic] = useState([]);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [IsLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 10;

    useEffect(() => {
        fetchAllmechanics(1);
    }, []);
    ///////////////////////////////////////////// For Approved
    useEffect(() => {
        const filtered = AllmechanicFilter.filter((bike: any) =>
            bike?.shop_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredmechanic(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllmechanicFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedmechanic(filteredmechanic.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredmechanic.length / itemsPerPage));
    }, [filteredmechanic, currentPage]);

    ///////////////////////////////////////////// For Disapproved
    useEffect(() => {
        const startIndex = (currentpageapprove - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedApprove(Approvefiltered.slice(startIndex, endIndex));
        setTotalApprovePage(Math.ceil(Approvefiltered.length / itemsPerPage));
    }, [Approvefiltered, currentpageapprove]);

    useEffect(() => {
        const filtered = AllApprovedmechanic.filter((bike: any) =>
            bike.shop_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setApprovefiltered(filtered);
        setCurrentpageapprove(1);
    }, [searchTerm, AllApprovedmechanic]);

    const fetchAllmechanics = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await getAllMechanics();
            if (res && res.length > 0) {
                res?.map((e: any, i: any) => {
                    if (e?.phone?.charAt(0) != '0') {
                        e.phone = '0' + e.phone
                    }
                })
                const approvedmechanics = res.filter((e: any) => e?.is_approved === true);
                const disapprovedmechanics = res.filter((e: any) => e?.is_approved === false);

                setAllmechanicFilter(approvedmechanics);
                setfilteredmechanic(approvedmechanics);

                setAllApprovedmechanic(disapprovedmechanics);
                setApprovefiltered(disapprovedmechanics);

                setCurrentPage(_page);
                setCurrentpageapprove(_page)
            } else {
                setAllmechanicFilter([]);
                setfilteredmechanic([]);
                setdisplayedmechanic([]);
                setCurrentPage(1);
                setTotalPage(0);

                setAllApprovedmechanic([]);
                setApprovefiltered([]);
                setdisplayedApprove([])
                setCurrentpageapprove(1);
                setTotalApprovePage(0)
            }
        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        if (!HandleOpenTabs) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
            return
        }
        else {
            setCurrentpageapprove(page);
            window.scrollTo(0, 0);
        }
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Mechanic?')
        if (!isConfirm) return;
        const res = await DeleteMechanicbyId(id);
        if (res && res.success) {
            alert('Delete Successfully')
            fetchAllmechanics(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleApproveToggle = async (id: any, currentStatus: boolean) => {
        const confirmDelete = window.confirm("Are you sure you want to Change Mechanic Approve?");
        if (!confirmDelete) return;
        const obj = {
            id: id,
            item: { is_approved: currentStatus ? false : true }
        }
        console.log(obj)
        const res = await ChangeMechanicApprove(id, obj)
        if (res && res?.info && res?.info?.indexOf("Approve mechanic is ") > -1) {
            alert('Updated Successfully')
            fetchAllmechanics(currentPage)
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const handleFeatureToggle = async (id: any, currentStatus: boolean) => {
        const confirmDelete = window.confirm("Are you sure to change Featured?");
        if (!confirmDelete) return;
        const obj = {
            id: id,
            item: { is_featured: currentStatus ? false : true }
        }
        console.log(obj)
        const res = await ChangeMechanicFeatured(id, obj)
        if (res && res?.info && res?.info?.indexOf("Feature mechanic is ") > -1) {
            alert('Updated Successfully')
            fetchAllmechanics(currentPage)
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleTabs = (value: any) => {
        if (value == 'showapprove') {
            setHandleOpenTabs(false)
        }
        else if (value == "showdisapprove") {
            setHandleOpenTabs(true)
        }
    }

    return (
        <div className={styles.main_mechanics}>
            <New_header />

            {!IsLoading ? (
                <div className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <div className={styles.btnGroup}>
                                <button className={`${styles.btn} ${!HandleOpenTabs ? styles.selected : styles.btn}`} onClick={() => handleTabs('showapprove')} >APPROVE</button>
                                <button className={`${styles.btn} ${HandleOpenTabs ? styles.selected : styles.btn}`} onClick={() => handleTabs('showdisapprove')} >DISAPPROVE</button>
                            </div>
                            <form className={styles.input_box}>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder='Search Mechanic Shop Name'
                                    className={styles.input} />
                                <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                            </form>
                        </div>
                        <div className={styles.table_section}>
                            <div className={styles.pagination}>
                                {displayedmechanic?.length > 0 && (
                                    <Pagination
                                        count={!HandleOpenTabs ? totalPage : totalApprovePage}
                                        onChange={handlePaginationChange}
                                        page={!HandleOpenTabs ? currentPage : currentpageapprove}
                                        size="medium"
                                        sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                    />
                                )}
                            </div>
                            <div className={styles.table_main}>
                                {
                                    !HandleOpenTabs ?
                                        <table className={styles.table}>
                                            <thead className={styles.thead}>
                                                {/* <th className={styles.th} >ID</th> */}
                                                <th className={styles.th} >Brand Logo</th>
                                                <th className={styles.th} >Shop Name</th>
                                                <th className={styles.th} >Address</th>
                                                <th className={styles.th} >Approve</th>
                                                <th className={styles.th} >Featured</th>
                                                <th className={styles.th} >Delete</th>
                                            </thead>
                                            <tbody className={styles.tbody}>
                                                {
                                                    displayedmechanic.length > 0 ? displayedmechanic.map((e: any, i: any) => {
                                                        return (
                                                            <tr className={styles.tr} key={i}>
                                                                {/* <td className={styles.td} style={{fontSize:'14px'}} >{e?.id}</td> */}
                                                                <td className={styles.td} >
                                                                    <img src={cloudinaryLoader(e?.bike_brand?.logoUrl, 400, 'auto')} alt={e?.shop_name} className={styles.image} />
                                                                </td>
                                                                <td className={styles.td} >{add3Dots(e?.shop_name, 30) || 'No Title'}</td>
                                                                <td className={styles.td} >{add3Dots(e?.address, 30) || "N/A"}</td>
                                                                <td className={styles.td} ><button
                                                                    className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                                                    onClick={() => handleApproveToggle(e?.id, e?.is_approved)}
                                                                >
                                                                    {e?.is_approved ? "Disapprove" : "Approve"}
                                                                </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button
                                                                        className={`${styles.action_btn} ${styles.feature_btn}`}
                                                                        onClick={() => handleFeatureToggle(e?.id, e?.is_featured)}
                                                                    >
                                                                        {e?.is_featured ? 'UnFeature' : 'Feature'}
                                                                    </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                                {/* <td className={styles.td} >
                                                                                        <button className={styles.del_btn}
                                                                                            onClick={() => handleDelete(e?.id, 'User')}>
                                                                                            Delete
                                                                                        </button>
                                                                                    </td> */}
                                                            </tr>
                                                        )
                                                    }) :
                                                        <tr className={styles.tr}>
                                                            <td colSpan={7} className={styles.td}>User not found</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </table>
                                        :
                                        <table className={styles.table}>
                                            <thead className={styles.thead}>
                                                {/* <th className={styles.th} >ID</th> */}
                                                <th className={styles.th} >Brand Logo</th>
                                                <th className={styles.th} >Shop Name</th>
                                                <th className={styles.th} >Address</th>
                                                <th className={styles.th} >Approve</th>
                                                <th className={styles.th} >Featured</th>
                                                <th className={styles.th} >Delete</th>
                                            </thead>
                                            <tbody className={styles.tbody}>
                                                {
                                                    displayedApprove.length > 0 ? displayedApprove.map((e: any, i: any) => {
                                                        return (
                                                            <tr className={styles.tr} key={i}>
                                                                {/* <td className={styles.td} style={{fontSize:'14px'}} >{e?.id}</td> */}
                                                                <td className={styles.td} >
                                                                    <img src={cloudinaryLoader(e?.bike_brand?.logoUrl, 400, 'auto')} alt={e?.title} className={styles.image} />
                                                                </td>
                                                                <td className={styles.td} >{add3Dots(e?.shop_name, 30) || 'No Title'}</td>
                                                                <td className={styles.td} >{add3Dots(e?.address, 30) || "N/A"}</td>
                                                                {/* <td className={styles.td} >{e?.is_approved? "True" : "False"}/{e?.is_featured?"True":"False"}</td> */}
                                                                <td className={styles.td} ><button
                                                                    className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                                                    onClick={() => handleApproveToggle(e?.id, e?.is_approved)}
                                                                >
                                                                    {e?.is_approved ? "Disapprove" : "Approve"}
                                                                </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button
                                                                        className={`${styles.action_btn} ${styles.feature_btn}`}
                                                                        onClick={() => handleFeatureToggle(e?.id, e?.is_featured)}
                                                                    >
                                                                        {e?.is_featured ? 'UnFeature' : 'Feature'}
                                                                    </button>
                                                                </td>
                                                                <td className={styles.td} >
                                                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                                {/* <td className={styles.td} >
                                                                                        <button className={styles.del_btn}
                                                                                            onClick={() => handleDelete(e?.id, 'User')}>
                                                                                            Delete
                                                                                        </button>
                                                                                    </td> */}
                                                            </tr>
                                                        )
                                                    }) :
                                                        <tr className={styles.tr}>
                                                            <td colSpan={7} className={styles.td}>User not found</td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </table>
                                }
                            </div>
                            <div className={styles.paginationbtm}>
                                {displayedmechanic?.length > 0 && (
                                    <Pagination
                                        count={!HandleOpenTabs ? totalPage : totalApprovePage}
                                        onChange={handlePaginationChange}
                                        page={!HandleOpenTabs ? currentPage : currentpageapprove}
                                        size="medium"
                                        sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    )
}

////////////////////////////////////////////////////// ALL PAGE CARD
const AllPages_Card = () => {
    const [AllPages, setAllPages] = useState([]);
    const [filteredAllPages, setfilteredAllPages] = useState([]);
    const [displayedAllPages, setdisplayedAllPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [HandleOpenTabs, setHandleOpenTabs] = useState(false);


    const itemsPerPage = 10;
    useEffect(() => {
        fetchAllPages(1);
    }, []);

    useEffect(() => {
        const filtered = AllPages.filter((bike: any) =>
            bike.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredAllPages(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllPages]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedAllPages(filteredAllPages.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredAllPages.length / itemsPerPage));
    }, [filteredAllPages, currentPage]);

    const fetchAllPages = async (_page: number) => {
        setIsLoading(true);
        const res = await getAllPages();
        console.log("PagesData", res?.pages)
        if (res && res.pages) {
            setAllPages(res.pages);
            setfilteredAllPages(res.pages);
            setCurrentPage(_page);
        } else {
            setAllPages([]);
            setfilteredAllPages([]);
            setdisplayedAllPages([]);
            setCurrentPage(1);
            setTotalPage(0);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Page?')
        if (!isConfirm) return;
        const res = await DeletePagebyId(id);
        if (res && res.info == 'Page has been deleted' && res.success) {
            alert('Deleted Successfully')
            fetchAllPages(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.main_AllPagess}>
            <New_header value={searchTerm} onChange={handleSearch} placeholder="Search Page with Title" />


            {!IsLoading ? (
                <>
                    <div className={styles.header}>
                        <div className={styles.btnGroup}>
                            <Link href="/ebike-panel/dashboard/add-new-page" >
                                <button className={`${styles.btn}`}>ADD NEW PAGE</button>
                            </Link>
                        </div>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search Page with Name'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                    </div>
                    <div className={styles.card_container}>
                        {displayedAllPages.map((e: any, i: any) => (
                            <div className={styles.main_box_card} key={i}>
                                <div className={styles.card_container_box}>
                                    <div className={styles.card_header}>
                                        <h3 className={styles.heading}>{add3Dots(e?.title, 50) || 'No Title'}</h3>
                                        <span className={styles.ad_id}>Page ID: {e.id}</span>
                                    </div>

                                    <div className={styles.card_content}>

                                        <div className={styles.card_detail}>
                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Page Name:</span>
                                                <span>{e?.name}</span>
                                            </div>
                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Date:</span>
                                                <span>{e?.createdAt.slice(0, 10)}</span>
                                            </div>


                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Display Position:</span>
                                                <span>{e?.displayPosition || "N/A"}</span>
                                            </div>



                                        </div>
                                    </div>

                                    <div className={styles.card_actions}>
                                        <button className={`${styles.action_btn} ${styles.disapprove_btn}`}>
                                            <Link href={`/ebike-panel/dashboard/edit-page/${e?.id}`} sx={{ textDecoration: 'none', color: 'white' }}>
                                                Edit
                                            </Link>
                                        </button>
                                        <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        {filteredAllPages?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div></>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    )
}

////////////////////////////////////////////////////// ALL Brand CARD
const AllBrands_Card = () => {
    const [AllBrands, setAllBrands] = useState([]);
    const [filteredAllBrands, setfilteredAllBrands] = useState([]);
    const [displayedAllBrands, setdisplayedAllBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [BrandName, setBrandName] = useState<any>("")
    const itemsPerPage = 8;
    const router = useRouter()
    useEffect(() => {
        const savedScrollStr = localStorage.getItem("BrandScroll");
        const url = new URL(window.location.href);
        const tab = url.searchParams.get("page");
        const SingleBrandName = url.searchParams.get("brand");
        setBrandName(SingleBrandName)

        if (tab !== null) {
            const tabNumber = Number(tab);

            if (!isNaN(tabNumber)) {
                brandScroll = Number(savedScrollStr) || 0;
                fetchAllBrands(tabNumber);
            }
        } else {
            brandScroll = 0;
            fetchAllBrands(1);
        }

    }, []);


    useEffect(() => {
        const filtered = AllBrands.filter((bike: any) =>
            bike?.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredAllBrands(filtered);
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedAllBrands(filteredAllBrands.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredAllBrands.length / itemsPerPage));
    }, [filteredAllBrands, currentPage]);

    const fetchAllBrands = async (_page: number) => {
        setIsLoading(true);
        const res = await getbrandData();
        if (res && res.length > 0) {
            setAllBrands(res);
            setfilteredAllBrands(res);
            setCurrentPage(_page);
        } else {
            setAllBrands([]);
            setfilteredAllBrands([]);
            setdisplayedAllBrands([]);
            setCurrentPage(1);
            setTotalPage(0);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo({
                top: brandScroll,
                left: 0,
                behavior: 'smooth'
            });
        }, 500);
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Brand?')
        if (!isConfirm) return;
        const res = await DeleteBrandbyId(id);
        if (res && res.info == 'Deleted!' && res.success) {
            alert('Delete Successfully')
            fetchAllBrands(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleEditBrand = (e: any) => {
        localStorage.setItem("BrandScroll", window.scrollY.toString());
        router.push(`/ebike-panel/dashboard/edit-brand/${e?.id}?page=${currentPage}&brand=${e?.brandName}`);
    };

    const [open, setOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<any>([]);
    const handleEditBrandDATA = (id: any) => {
        // array se object filter karna
        const brand = displayedAllBrands.find((b: any) => b.id == id);
        // console.log("brand" , brand)
        setSelectedBrand(brand);
        setOpen(true);
    };

    return (
        <div className={styles.main_brands}>
            <New_header value={searchTerm} onChange={handleSearch} placeholder="Search Brand with Name" />
            {!IsLoading ? (
                <div>
                    <div className={styles.page_header}>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search Brand with Name'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                        {displayedAllBrands?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                        <button className={styles.add_new_btn}>
                            <Link href="/ebike-panel/dashboard/add-new-brand" sx={{
                                color: "white", textDecoration: 'none'
                            }} >Add New Brand</Link></button>
                    </div>
                    <div className={styles.card_container}>
                        <table className={styles.table_main}>
                            <thead className={styles.thead}>
                                <tr >
                                    <td className={styles.td} >ID</td>
                                    <td className={styles.td} >Image</td>
                                    <td className={styles.td} >Brand</td>
                                    <td className={styles.td} >Description</td>
                                    {/* <td className={styles.td} >Price</td> */}
                                    <td className={styles.td} >Action</td>
                                </tr>
                            </thead>
                            <tbody className={styles.tbody}>
                                {displayedAllBrands.map((e: any, i: any) => (
                                    <tr className={styles.tr}>
                                        <td className={styles.td} >{e?.id}</td>
                                        <td className={styles.td} ><img src={cloudinaryLoader(e?.logoUrl, 400, 'auto')} alt="" className={styles.image} /></td>
                                        <td className={styles.td_name} >{e?.brandName || 'N/A'}</td>
                                        <td className={styles.td_desc}>
                                            <p className={styles.seller_comments_desc} dangerouslySetInnerHTML={{ __html: add3Dots(e?.description, 100) }} ></p>
                                        </td>
                                        {/* <td className={styles.td_desc} >{add3Dots(e?.description, 100)}</td> */}
                                        {/* <td className={styles.td} >{add3Dots(e?.title, 20)}</td> */}
                                        <td className={styles.td_action}>
                                            <div className={styles.card_actions}>
                                                <Link href={`/ebike-panel/dashboard/edit-brand/${e?.id}?page=${currentPage}&brand=${e?.brandName}`} style={{ textDecoration: 'none', color: "white", width: '100%' }}>
                                                    <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEditBrand(e)}>
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.pagination}>
                        {filteredAllBrands?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
            <BasicModal open={open} onClose={() => setOpen(false)} brand={selectedBrand} funct={fetchAllBrands} />
        </div>
    )
}

////////////////////////////////////////////////////// ALL City CARD
const AllCities_Card = () => {
    const [AllCity, setAllCity] = useState([]);
    const [filteredAllCity, setfilteredAllCity] = useState([]);
    const [displayedAllCity, setdisplayedAllCity] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [NewcityName, setNewcityName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);

    const itemsPerPage = 18;
    const router = useRouter()
    useEffect(() => {
        fetchAllCity(1);
    }, []);

    useEffect(() => {
        const filtered = AllCity.filter((bike: any) =>
            bike?.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredAllCity(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllCity]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedAllCity(filteredAllCity.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredAllCity.length / itemsPerPage));
    }, [filteredAllCity, currentPage]);

    const fetchAllCity = async (_page: number) => {
        setIsLoading(true);
        const res = await getCityData();
        console.log("Brands", res)
        if (res && res.length > 0) {
            setAllCity(res);
            setfilteredAllCity(res);
            setCurrentPage(_page);
        } else {
            setAllCity([]);
            setfilteredAllCity([]);
            setdisplayedAllCity([]);
            setCurrentPage(1);
            setTotalPage(0);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this City?')
        if (!isConfirm) return;
        const res = await DeleteCitybyId(id);
        if (res && res.info == 'Deleted' && res.success) {
            alert('Delete Successfully')
            fetchAllCity(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };
    const addCity = async (e: any) => {
        e.preventDefault()
        if (NewcityName == "") {
            alert("Please Enter City Name!")
            return
        }
        const obj = {
            city_name: NewcityName
        }
        console.log("CityName", obj)
        const res = await addNewCity(obj);
        if (res && res?.success) {
            fetchAllCity(currentPage)
        } else {
            alert('Something went wrong!');
        }
    }

    return (
        <div className={styles.main_cities}>
            <New_header value={searchTerm} onChange={handleSearch} placeholder="Search City with Name" />
            {!IsLoading ? (<>
                <div className={styles.add_city_box}>
                    <form className={styles.add_inner_box} onSubmit={(e) => { addCity(e) }} >
                        <input type="text" className={styles.input} placeholder="Enter City Name" onChange={(e) => setNewcityName(e.target.value)} />
                        <button className={styles.add_btn} type="submit" >Add</button>
                    </form>
                </div>
                <div className={styles.card_container}>

                    {displayedAllCity.map((e: any, i: any) => (

                        <div className={styles.main_box_card} key={i}>
                            <div className={styles.card_container_box}>
                                <div className={styles.card_header}>
                                    <h3 className={styles.heading}>{add3Dots(e?.city_name, 50) || 'No Title'}</h3>
                                    <span className={styles.ad_id}>City ID: {e?.id}</span>
                                </div>

                                <div className={styles.card_content}>
                                    <div className={styles.card_detail}>
                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Date:</span>
                                            <span>{e?.createdAt ? e?.createdAt.slice(0, 10) : "N/A"}</span>
                                        </div>


                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>City Name:</span>
                                            <span>{e?.city_name || "N/A"}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className={styles.card_actions}>
                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    {filteredAllCity?.length > 0 && (
                        <div className={styles.used_bike_list_pagination}>
                            <Pagination
                                count={totalPage}
                                onChange={handlePaginationChange}
                                page={currentPage}
                                size="large"
                            />
                        </div>
                    )}
                </div></>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    )
}

////////////////////////////////////////////////////// ALL Product CARD
const ProductList_Card = () => {
    const [AllShopFilter, setAllShopFilter] = useState([]);
    const [filteredShop, setFilteredShop] = useState([]);
    const [displayedShop, setDisplayedShop] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [AllCategoryName, setAllCategoryName] = useState([]);
    const [CategoryNameId, setCategoryNameId] = useState(1)

    const itemsPerPage = 12;
    const router = useRouter();

    useEffect(() => {
        fetchAllProduct(1);
        fetchCategoryDataById(1, 1)
    }, []);


    useEffect(() => {
        const filtered = AllShopFilter.filter((bike: any) =>
            bike.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredShop(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllShopFilter]);

    useEffect(() => {
        fetchCategoryDataById(CategoryNameId, currentPage)
    }, [CategoryNameId])

    const fetchCategoryDataById = async (id: any, _page: any) => {
        setIsLoading(true);
        const res = await getShopCategory({ id: id })
        if (res && res.length > 0) {
            setAllShopFilter(res);
            setFilteredShop(res);
            setCurrentPage(_page);
        } else {
            setAllShopFilter([]);
            setFilteredShop([]);
            setDisplayedShop([]);
            setCurrentPage(1);
            setTotalPage(0);
        }
        console.log("datares", res)
        setIsLoading(false);
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedShop(filteredShop.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredShop.length / itemsPerPage));
    }, [filteredShop, currentPage]);

    const fetchAllProduct = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await getShopCategory({ id: 1 });
            const rescategory = await getShopMainCategory();
            setAllCategoryName(rescategory)
            console.log("datares", rescategory)
            // if (res && res.length > 0) {
            //     setAllShopFilter(res);
            //     setFilteredShop(res);
            //     setCurrentPage(_page);
            // } else {
            //     setAllShopFilter([]);
            //     setFilteredShop([]);
            //     setDisplayedShop([]);
            //     setCurrentPage(1);
            //     setTotalPage(0);
            // }
        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Product?')
        if (!isConfirm) return;
        const res = await DeleteProductbyId(id);
        if (res && res.info == 'Deleted', res?.success) {
            alert('Deleted Successfully')
            fetchAllProduct(1);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleBtn = (id: any) => {
        setCategoryNameId(id)
    }

    return (
        <div className={styles.main_Shop}>
            <New_header />
            <div className={styles.categoryname_section}>
                {
                    AllCategoryName?.map((e: any, i: any) => {
                        return (
                            <button key={i} className={`${styles.category_btn} ${e?.id == CategoryNameId ? styles.selected : styles.category_btn}`} onClick={() => handleBtn(e?.id)} >{e?.name}</button>
                        )
                    })
                }
            </div>

            {!IsLoading ? (
                <div className={styles.big_container}>
                    <div className={styles.page_header}>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search Product with Title'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                        {filteredShop?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                        <button className={styles.add_new_btn}>
                            <Link href="/ebike-panel/dashboard/add-products" sx={{
                                color: "white", textDecoration: 'none'
                            }} >Add New Product</Link></button>
                    </div>
                    <div className={styles.card_container}>
                        {displayedShop.map((e: any, i: any) => (

                            <div className={styles.main_box_card} key={i}>
                                <div className={styles.card_container_box}>
                                    <div className={styles.card_header}>
                                        <h3 className={styles.heading}>{add3Dots(e?.product_name, 25) || 'No Title'}</h3>
                                    </div>

                                    <div className={styles.card_content}>
                                        <div className={styles.cardimage_box}>
                                            <Swiper
                                                spaceBetween={50}
                                                slidesPerView={1}
                                                onSlideChange={() => console.log('slide change')}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                modules={[Navigation, FreeMode]}
                                                navigation={true}
                                                initialSlide={0}
                                                loop={true}
                                                className={styles.image}
                                            >
                                                {
                                                    e?.images && e?.images.length > 0 ?
                                                        e.images.map((imgUrl: any, ind: any) => {
                                                            return (
                                                                <SwiperSlide key={imgUrl} className={styles.image} >
                                                                    <img src={cloudinaryLoader(imgUrl, 400, 'auto')} alt={e?.title} className={styles.image} />
                                                                </SwiperSlide>
                                                            )
                                                        }) :
                                                        <SwiperSlide key='' className={styles.image} >
                                                            <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' alt={e?.title} className={styles.image} />
                                                        </SwiperSlide>
                                                }
                                            </Swiper>
                                        </div>

                                        <div className={styles.card_detail}>

                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Category:</span>
                                                <span>{e?.shop_main_catagory?.name || "N/A"}</span>
                                            </div>
                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Price:</span>
                                                <span>{e?.product_price || "0"}</span>
                                            </div>

                                            <div className={styles.detail_row}>
                                                <span className={styles.detail_label}>Brand:</span>
                                                <span>{e?.product_company?.name || "N/A"}</span>
                                            </div>

                                            <div className={styles.description}>
                                                Description:
                                                <p className={styles.description_text}>
                                                    {add3Dots(e?.product_description, 110) || 'No description available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.card_actions}>
                                        <a href={`/ebike-panel/dashboard/edit-product/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
                                            <button className={`${styles.action_btn} ${styles.edit_btn}`}
                                            // onClick={() => handleEditShop(e?.id)}
                                            >
                                                Edit
                                            </button>
                                        </a>
                                        <button className={`${styles.action_btn} ${styles.delete_btn}`}
                                            onClick={() => handleDelete(e?.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination_btm}>
                        {filteredShop?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    )
}

/////////////////////////////////////////////////////// Electric BIKE CARD
const Electric_Bike_Card = () => {
    const [AllNewBikeForFilter, setAllNewBikeForFilter] = useState<any>([]);
    const [filteredBikes, setFilteredBikes] = useState<any>([]);
    const [displayedBikes, setDisplayedBikes] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [allBrands, setAllBrands] = useState([])
    const itemsPerPage = 12;
    const router = useRouter();

    useEffect(() => {
        fetchAllNewBike(1);
        fetchBrands()
    }, []);

    useEffect(() => {
        const filtered = AllNewBikeForFilter.filter((bike: any) =>
            bike.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBikes(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllNewBikeForFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedBikes(filteredBikes.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredBikes.length / itemsPerPage));
    }, [filteredBikes, currentPage]);

    async function fetchBrands() {
        const res = await getbrandData();
        console.log("Brands", res)
        if (res && res.length > 0) {
            setAllBrands(res);
        } else {
            setAllBrands([]);
        }
    }

    const fetchAllNewBike = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await getAllNewBike();
            if (res && res.length > 0) {
                // debugger
                const filtered = res?.filter((bike: any) =>
                    bike?.focus_keyword?.toLowerCase().includes('electric-bike')
                );
                setAllNewBikeForFilter(filtered);
                setFilteredBikes(filtered);
                setCurrentPage(_page);
            } else {
                setAllNewBikeForFilter([]);
                setFilteredBikes([]);
                setDisplayedBikes([]);
                setCurrentPage(1);
                setTotalPage(0);
            }

        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const GetName = (from: any, id: any) => {
        if (from === 'brand') {
            const brand = getBrandFromId(id, allBrands);
            return brand[0]?.brandName || "";
        } else {
            const city = getCityFromId(id, CityArr);
            return city[0]?.city_name || "";
        }
    };

    const handleDelete = async (id: any) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this bike?");

        if (!isConfirmed) return;
        const res = await DeleteNewBikeById(id);
        if (res && res.deleted && res.info == "successfully deleted") {
            alert('Delete Successfully')
            fetchAllNewBike(currentPage);
        }
        else {
            alert('Something is Wrong!')
        }
        console.log("Deleted:", res);
    };

    const handleEdit = (id: any) => {
        router.push(`/ebike-panel/dashboard/edit-electric-bike/${id}`);
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.main_new_bike}>

            <New_header />

            {!IsLoading ? (
                <div className={styles.big_container}>
                    <div className={styles.page_header}>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search New Bike with Title'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                        {filteredBikes?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                        <button className={styles.add_new_btn}>
                            <Link href="/ebike-panel/dashboard/add-electric-bike" sx={{
                                color: "white", textDecoration: 'none'
                            }} >Add Electric Bike</Link></button>
                    </div>

                    {/* <div className={styles.card_container}>
                        {displayedBikes.length > 0 ? (
                            <>
                                {displayedBikes.map((e: any, i: any) => (
                                    <div className={styles.main_box_card} key={i}>
                                        <div className={styles.card_container_box}>
                                            <div className={styles.card_header}>
                                                <h3 className={styles.heading}>{add3Dots(e?.title, 45) || 'No Title'}</h3>
                                                <span className={styles.ad_id}>Ad ID: {e?.id}</span>
                                            </div>

                                            <div className={styles.card_content}>
                                                <div className={styles.cardimage_box}>
                                                    <Swiper
                                                        spaceBetween={50}
                                                        slidesPerView={1}
                                                        onSlideChange={() => console.log('slide change')}
                                                        onSwiper={(swiper) => console.log(swiper)}
                                                        modules={[Navigation, FreeMode]}
                                                        navigation={true}
                                                        initialSlide={0}
                                                        loop={true}
                                                        className={styles.image}
                                                    >
                                                        {
                                                            e?.images && e?.images.length > 0 ?
                                                                e.images.map((imgUrl: any, ind: any) => {
                                                                    return (
                                                                        <SwiperSlide key={imgUrl} className={styles.image} >
                                                                            <img src={cloudinaryLoader(imgUrl, 400, 'auto')} alt={e?.title} className={styles.image} />
                                                                        </SwiperSlide>
                                                                    )
                                                                }) :
                                                                <SwiperSlide key=''>
                                                                    <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' alt={e?.title} className={styles.image} />
                                                                </SwiperSlide>
                                                        }
                                                    </Swiper>
                                                </div>

                                                <div className={styles.card_detail}>
                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>ID:</span>
                                                        <span>{e?.id}</span>
                                                    </div>

                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Brand:</span>
                                                        <span>{GetName("brand", e?.brandId)}</span>
                                                    </div>

                                                    <div className={styles.detail_row}>
                                                        <span className={styles.detail_label}>Price:</span>
                                                        <span className={styles.price}>
                                                            {e?.price ? priceWithCommas(e.price) : '0'}
                                                        </span>
                                                    </div>

                                                    <div className={styles.description} >
                                                        <p style={{ margin: "0px 10px", padding: "0px", color: "black", fontSize: "14px" }} className={styles.description_text} dangerouslySetInnerHTML={{ __html: add3Dots(e?.description, 75) }}></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.card_actions}>
                                                <Link href={`/ebike-panel/dashboard/edit-electric-bike/${e?.id}`} style={{ textDecoration: 'none', color: "white", width: '100%' }}>
                                                    <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEdit(e?.id)}>
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className={styles.no_results}>
                                <p>No bikes found matching your search criteria.</p>
                            </div>
                        )}
                    </div> */}

                    <div className={styles.card_container}>
                        {displayedBikes.length > 0 ? (
                            <table className={styles.table_main}>
                                <thead className={styles.thead}>
                                    <tr >
                                        <td className={styles.td} >ID</td>
                                        <td className={styles.td} >Image</td>
                                        <td className={styles.td} >Title</td>
                                        <td className={styles.td} >Brand</td>
                                        <td className={styles.td} >Price</td>
                                        <td className={styles.td} >Action</td>
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {displayedBikes.map((e: any, i: any) => (
                                        <tr className={styles.tr}>
                                            <td className={styles.td} >{e?.id}</td>
                                            <td className={styles.td} ><img src={cloudinaryLoader(e?.images[0], 400, 'auto')} alt="" className={styles.image} /></td>
                                            <td className={styles.td} >{add3Dots(e?.title, 20)}</td>
                                            <td className={styles.td} >{GetName("brand", e?.brandId) || 'N/A'}</td>
                                            <td className={styles.td} >{e?.price ? priceWithCommas(e.price) : '0'}</td>
                                            <td className={styles.td_action}>
                                                <div className={styles.card_actions}>
                                                    <Link href={`/ebike-panel/dashboard/edit-electric-bike/${e?.id}`} style={{ textDecoration: 'none', color: "white", width: '100%' }}>
                                                        <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEdit(e?.id)}>
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.no_results}>
                                <p>No bikes found matching your search criteria.</p>
                            </div>
                        )}
                    </div>



                    <div className={styles.pagination}>
                        {filteredBikes?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
        </div>
    );
};

/////////////////////////////////////////////////////// SHOP BRAND CARD
const ShopBrand = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allBrands, setAllBrands] = useState([])
    const [displayedAllPages, setdisplayedAllPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [filteredAllCompanies, setfilteredAllCompanies] = useState([]);
    const itemsPerPage = 15;

    useEffect(() => {
        const filtered = allBrands.filter((bike: any) =>
            bike?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredAllCompanies(filtered);
        setCurrentPage(1);
    }, [searchTerm, allBrands]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedAllPages(filteredAllCompanies.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredAllCompanies.length / itemsPerPage));
    }, [filteredAllCompanies, currentPage]);

    useEffect(() => {
        fetchBrands(1)
    }, [])

    const fetchBrands = async (_page: any) => {
        setIsLoading(true)
        const res = await GetCompanyBrand();
        console.log("Brands", res)
        if (res && res.length > 0) {
            setAllBrands(res);
            setfilteredAllCompanies(res);
            setCurrentPage(_page);
        } else {
            setAllBrands([]);
            setfilteredAllCompanies([]);
            setdisplayedAllPages([]);
            setCurrentPage(1);
            setTotalPage(0);
        }
        setIsLoading(false)
    }

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const [open, setOpen] = useState(false);
    const [Addopen, setAddOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<any>([]);

    const handleEditBrandDATA = (id: any) => {
        const brand = displayedAllPages.find((b: any) => b.id == id);
        setSelectedBrand(brand);
        setOpen(true);
    };
    const handleAddBrand = () => {
        setAddOpen(true);
    }

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Brand?')
        if (!isConfirm) return;
        const res = await DeleteBrandCompany(id);
        if (res && res.info == 'Deleted!' && res?.success) {
            alert('Delete Successfully')
            fetchBrands(1);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    return (
        <div className={styles.main_brand_list}>
            <New_header />
            {
                !isLoading ? (
                    <div className={styles.brand_container}>
                        <div className={styles.page_header}>
                            <form className={styles.input_box}>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder='Search Brand with Name'
                                    className={styles.input} />
                                <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                            </form>
                            {allBrands?.length > 0 && (
                                <div className={styles.used_bike_list_pagination}>
                                    <Pagination
                                        count={totalPage}
                                        onChange={handlePaginationChange}
                                        page={currentPage}
                                        size="medium"
                                    />
                                </div>
                            )}
                            <button className={styles.add_new_btn} onClick={handleAddBrand} >Add New Company Brand</button>
                        </div>
                        <div className={styles.all_card_main} style={{ display: displayedAllPages.length > 0 ? 'grid' : 'block' }}>
                            {
                                displayedAllPages.length > 0 ? (
                                    <>
                                        {
                                            displayedAllPages?.map((e: any, i: any) => {
                                                return (
                                                    <div className={styles.brand_box} key={i}>
                                                        <div className={styles.header}>
                                                            <p className={styles.brand_name}>{e?.name || "N/A"}</p>
                                                            {/* <span className={styles.brand_id}>Brand ID: {e?.id || "N/A"}</span> */}
                                                        </div>
                                                        <img src={cloudinaryLoader(e?.logoUrl, 400, 'auto')} alt={e?.name} className={styles.brand_image} />
                                                        <div className={styles.actions}>
                                                            <button className={styles.action_btn} onClick={() => handleEditBrandDATA(e.id)} >Edit</button>
                                                            <button className={styles.action_btn1} onClick={() => handleDelete(e?.id)} >Delete</button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                ) :
                                    (
                                        <div className={styles.no_results}>
                                            <p>No Brand Company found matching your search criteria.</p>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                ) : (
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
                )
            }
            <ShopBrandPopup open={open} onClose={() => setOpen(false)} brand={selectedBrand} funct={fetchBrands} />
            <AddShopBrandPopup open={Addopen} onClose={() => setAddOpen(false)} funct={fetchBrands} />
        </div>
    )
}

////////////////////////////////////////////////////// FORUM MAIN LIST
const ForuAllMainCateg = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [AllCateg, setAllCateg] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedData, setSelectedData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        fetchAllCateg()
    }, [])
    const fetchAllCateg = async () => {
        setIsLoading(true)
        const res = await GetAllMainForumCategory()
        const categoryList = Array.isArray(res?.data) ? res.data : [];
        setAllCateg(categoryList)
        setIsLoading(false)
    }

    const handleAddBrand = () => {
        setOpen(true);
    }

    const handleOpenEdit = (data: any) => {
        setSelectedData(data);
        setEditOpen(true);
    }

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this main category?');
        if (!isConfirm) return;
        const res = await DeleteMainForumCategory(id);
        if (res?.success) {
            alert('Deleted Successfully')
            fetchAllCateg()
        }
        else {
            alert(res?.msg || 'SomeThing is Wrong!')
        }
    }

    const filteredCategory = AllCateg.filter((item: any) =>
        String(item?.id || "").includes(searchTerm) ||
        String(item?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item?.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.forum_table_page}>
            <New_header />
            {
                !isLoading ?
                    <div className={styles.forum_table_container}>
                        <div className={styles.forum_table_header}>
                            <p className={styles.forum_table_heading}>Forum Main Categories</p>
                            <button className={styles.forum_primary_btn} onClick={handleAddBrand}>Add Main Category</button>
                        </div>
                        <div className={styles.forum_table_toolbar}>
                            <input
                                type="text"
                                className={styles.forum_search_input}
                                placeholder="Search by ID, name or description"
                                value={searchTerm}
                                onChange={(e: any) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className={styles.forum_table_wrapper}>
                            <table className={styles.forum_table}>
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Sub Categories</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategory.map((e: any, index: number) => (
                                        <tr key={e?.id}>
                                            <td>{index + 1}</td>
                                            <td>{e?.name || "N/A"}</td>
                                            <td>{add3Dots(e?.description || "N/A", 120)}</td>
                                            <td>{e?.subCategories?.length || 0}</td>
                                            <td>
                                                <div className={styles.forum_action_group}>
                                                    <button className={styles.forum_edit_btn} onClick={() => handleOpenEdit(e)}>Edit</button>
                                                    <button className={styles.forum_delete_btn} onClick={() => handleDelete(e?.id)}>Delete</button>
                                                    <button className={styles.forum_link_btn} onClick={() => router.push(`/ebike-panel/dashboard/all-sub-category?main=${e?.id}`)}>Sub Categories</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredCategory.length === 0 && <p className={styles.forum_empty}>No main categories found.</p>}
                        </div>
                    </div>
                    :
                    <div className={styles.load_div}>
                        <Loader isLoading={isLoading} />
                    </div>
            }
            <AddForumMainCategory open={open} onClose={() => setOpen(false)} funct={fetchAllCateg} />
            <EditForumMainCategory open={editOpen} onClose={() => setEditOpen(false)} funct={fetchAllCateg} Data={selectedData} />
        </div>
    )
}

////////////////////////////////////////////////////// ALL THREAD CARD
const ThreadList_Card = () => {
    const [allThread, setAllThread] = useState<any[]>([]);
    const [PropsData, setDataProps] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [IsLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [allSubCategory, setAllSubCategory] = useState<any[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const filterSubId = searchParams.get("sub");
    const filterMainId = searchParams.get("main");

    useEffect(() => {
        fetchAllThread()
        fetchAllSubCategories()
    }, []);

    const fetchAllThread = async () => {
        setIsLoading(true);
        const res = await GetAllThreads()
        const threadList = Array.isArray(res?.data) ? res.data : [];
        setAllThread(threadList);
        setIsLoading(false);
    }

    const fetchAllSubCategories = async () => {
        const res = await GetAllSubForumCategory();
        const subCategoryList = Array.isArray(res?.data) ? res.data : [];
        setAllSubCategory(subCategoryList);
    }

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Thread?')
        if (!isConfirm) return;
        const res = await DeleteThread(id);
        if (res?.success) {
            alert('Deleted Successfully')
            fetchAllThread()
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenPOpup = (data: any) => {
        setDataProps(data)
        setOpen(true);
    }

    const handleOpenAdd = () => {
        setAddOpen(true);
    }

    const baseThreadList = allThread.filter((item: any) => {
        if (!filterSubId) return true;
        return String(item?.sub_categ_id) === String(filterSubId);
    });

    const filteredThread = baseThreadList.filter((item: any) =>
        String(item?.id || "").includes(searchTerm) ||
        String(item?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item?.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item?.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedSubCategory = allSubCategory.find((item: any) => String(item?.id) === String(filterSubId));

    return (
        <div className={styles.forum_table_page}>
            <New_header />
            {!IsLoading ? (
                <div className={styles.forum_table_container}>
                    <div className={styles.forum_table_header}>
                        <p className={styles.forum_table_heading}>Forum Threads</p>
                        <button className={styles.forum_primary_btn} onClick={handleOpenAdd}>Add Thread</button>
                    </div>
                    <div className={styles.forum_table_toolbar}>
                        <div className={styles.forum_filter_badges}>
                            {filterMainId && <button className={styles.forum_filter_btn} onClick={() => router.push(`/ebike-panel/dashboard/all-sub-category?main=${filterMainId}`)}>Back To Sub Categories</button>}
                            {filterSubId && <span className={styles.forum_filter_label}>Sub Category: {selectedSubCategory?.name || `#${filterSubId}`}</span>}
                        </div>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search by ID, title or user'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                    </div>
                    <div className={styles.forum_table_wrapper}>
                        <table className={styles.forum_table}>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Title</th>
                                    <th>User</th>
                                    <th>Sub Category</th>
                                    <th>Comments</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredThread.map((e: any, index: number) => (
                                    <tr key={e?.id}>
                                        <td>{index + 1}</td>
                                        <td>{add3Dots(e?.title || "N/A", 40)}</td>
                                        <td>{e?.user_name || "N/A"}</td>
                                        <td>{e?.subCategory?.name || e?.sub_categ_id || "N/A"}</td>
                                        <td>{e?.Comments?.length || 0}</td>
                                        <td>{add3Dots(e?.description || "N/A", 90)}</td>
                                        <td>
                                            <div className={styles.forum_action_group}>
                                                <button className={styles.forum_edit_btn} onClick={() => handleOpenPOpup(e)}>Edit</button>
                                                <button className={styles.forum_delete_btn} onClick={() => handleDelete(e?.id)}>Delete</button>
                                                <button className={styles.forum_link_btn} onClick={() => router.push(`/ebike-panel/dashboard/all-threads-comments?thread=${e?.id}&sub=${e?.sub_categ_id}${filterMainId ? `&main=${filterMainId}` : ''}`)}>Comments</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredThread.length === 0 && <p className={styles.forum_empty}>No threads found.</p>}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
            <EditForumThread open={open} onClose={() => setOpen(false)} funct={fetchAllThread} Data={PropsData} />
            <AddForumThread open={addOpen} onClose={() => setAddOpen(false)} funct={fetchAllThread} subCategoryData={allSubCategory} />
        </div>
    )
}

////////////////////////////////////////////////////// ALL THREAD COMMENT CARD
const ThreadComments_Card = () => {
    const [allComments, setAllComments] = useState<any[]>([]);
    const [PropsData, setDataProps] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [IsLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [allThreads, setAllThreads] = useState<any[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const filterThreadId = searchParams.get("thread");
    const filterSubId = searchParams.get("sub");
    const filterMainId = searchParams.get("main");

    useEffect(() => {
        fetchAllComment()
        fetchAllThreadList()
    }, []);

    const fetchAllComment = async () => {
        setIsLoading(true);
        const res = await GetAllThreadsComments()
        const commentList = Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res?.comments)
                ? res.comments
                : [];
        setAllComments(commentList);
        setIsLoading(false);
    }

    const fetchAllThreadList = async () => {
        const res = await GetAllThreads();
        const threadList = Array.isArray(res?.data) ? res.data : [];
        setAllThreads(threadList);
    }

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Comment?')
        if (!isConfirm) return;
        const res = await DeleteThreadComment(id);
        if (res?.success) {
            alert('Deleted Successfully')
            fetchAllComment()
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenPOpup = (data: any) => {
        setDataProps(data)
        setOpen(true);
    }

    const handleOpenAdd = () => {
        setAddOpen(true);
    }

    const baseComments = allComments.filter((item: any) => {
        if (!filterThreadId) return true;
        return String(item?.thread_id) === String(filterThreadId);
    });

    const filteredComments = baseComments.filter((item: any) =>
        String(item?.id || "").includes(searchTerm) ||
        String(item?.thread_id || "").includes(searchTerm) ||
        String(item?.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item?.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedThread = allThreads.find((item: any) => String(item?.id) === String(filterThreadId));

    return (
        <div className={styles.forum_table_page}>
            <New_header />
            {!IsLoading ? (
                <div className={styles.forum_table_container}>
                    <div className={styles.forum_table_header}>
                        <p className={styles.forum_table_heading}>Forum Comments</p>
                        <button className={styles.forum_primary_btn} onClick={handleOpenAdd}>Add Comment</button>
                    </div>
                    <div className={styles.forum_table_toolbar}>
                        <div className={styles.forum_filter_badges}>
                            {filterSubId && <button className={styles.forum_filter_btn} onClick={() => router.push(`/ebike-panel/dashboard/all-threads?sub=${filterSubId}${filterMainId ? `&main=${filterMainId}` : ''}`)}>Back To Threads</button>}
                            {filterThreadId && <span className={styles.forum_filter_label}>Thread: {selectedThread?.title || `#${filterThreadId}`}</span>}
                        </div>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search by ID, thread ID, user or comment'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                    </div>
                    <div className={styles.forum_table_wrapper}>
                        <table className={styles.forum_table}>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Thread ID</th>
                                    <th>Thread Title</th>
                                    <th>User</th>
                                    <th>Comment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComments.map((e: any, index: number) => (
                                    <tr key={e?.id}>
                                        <td>{index + 1}</td>
                                        <td>{e?.thread_id || "N/A"}</td>
                                        <td>{add3Dots(e?.thread?.title || "N/A", 40)}</td>
                                        <td>{e?.user_name || "N/A"}</td>
                                        <td>{add3Dots(e?.description || "N/A", 120)}</td>
                                        <td>
                                            <div className={styles.forum_action_group}>
                                                <button className={styles.forum_edit_btn} onClick={() => handleOpenPOpup(e)}>Edit</button>
                                                <button className={styles.forum_delete_btn} onClick={() => handleDelete(e?.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredComments.length === 0 && <p className={styles.forum_empty}>No comments found.</p>}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
            <EditForumThreadComment open={open} onClose={() => setOpen(false)} funct={fetchAllComment} Data={PropsData} />
            <AddForumThreadComment open={addOpen} onClose={() => setAddOpen(false)} funct={fetchAllComment} threadData={allThreads} />
        </div>
    )
}

////////////////////////////////////////////////////// ALL BikeVideos COMMENT CARD
const BikeVideos_Card = () => {
    const [AllBikeVideosFilter, setAllBikeVideosFilter] = useState<any>([]);
    const [filteredBikeVideos, setFilteredBikeVideos] = useState<any>([]);
    const [displayedBikeVideos, setDisplayedBikeVideos] = useState([]);
    const [PropsData, setDataProps] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [SelectCateg, setSelectCateg] = useState("");
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const itemsPerPage = 8;
    const router = useRouter();

    useEffect(() => {
        fetchAllVideo(1)
    }, []);

    useEffect(() => {
        const filtered = AllBikeVideosFilter.filter((bike: any) =>
            bike.title.toString().toLowerCase().includes(searchTerm)
        );
        setFilteredBikeVideos(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllBikeVideosFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedBikeVideos(filteredBikeVideos.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredBikeVideos.length / itemsPerPage));
    }, [filteredBikeVideos, currentPage]);

    const fetchAllVideo = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await GetAllVideos();
            console.log("data", res)
            if (res && res.success && res?.data.length > 0) {
                setAllBikeVideosFilter(res?.data);
                setFilteredBikeVideos(res?.data);
                setCurrentPage(_page);
            } else {
                setAllBikeVideosFilter(Data);
                setFilteredBikeVideos(Data);
                setDisplayedBikeVideos([]);
                setCurrentPage(1);
                setTotalPage(0);
            }
        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsLoading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: any) => {
        const isConfirm = window.confirm('Are you sure to delete this Video?')
        if (!isConfirm) return;
        const res = await DeleteBikeVideo(id);
        if (res && res.info == 'Video deleted successfully', res?.success) {
            alert('Deleted Successfully')
            fetchAllVideo(1)
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenPOpup = (data: any) => {
        setDataProps(data)
        setOpen(true);
    }

    const handleBrandChange = (e: any) => {
        // console.log("test",e.target.value);
        // setSelectCateg(e.target.value);
        if (e.target.value) {
            const filtered = AllBikeVideosFilter.filter((bike: any) =>
                bike.category.toString().toLowerCase() === e.target.value.toLowerCase()
            );
            setFilteredBikeVideos(filtered);
            setCurrentPage(1);
        } else {
            setFilteredBikeVideos(AllBikeVideosFilter);
            setCurrentPage(1);
        }
    };

    const CategoryArr = [
        { id: 1, name: 'News' },
        { id: 2, name: 'BikeCare' },
        { id: 3, name: 'Safety' },
    ];

    return (
        <div className={styles.main_videos}>
            <New_header />
            {!IsLoading ? (
                <div className={styles.big_container}>
                    <div className={styles.page_header}>
                        <form className={styles.input_box}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder='Search Video with Title'
                                className={styles.input} />
                            <button className={styles.btn}><SearchIcon className={styles.icon} /></button>
                        </form>
                        <select name="" id="" className={styles.selected} onChange={handleBrandChange}>
                            <option value="" style={{ fontSize: '16px' }} className={styles.options}> All Category</option>
                            {
                                CategoryArr.map((e: any, index) => (
                                    <option key={index} value={e?.name} className={styles.options} style={{ fontSize: '16px' }}>
                                        {e?.name}
                                    </option>
                                ))
                            }
                        </select>
                        <button className={styles.add_new_btn}>
                            <Link href="/ebike-panel/dashboard/add-new-video" sx={{ color: "white", textDecoration: 'none' }}>
                                Add New Video
                            </Link>
                        </button>
                    </div>
                    <div className={styles.card_container}>
                        {displayedBikeVideos.map((e: any, i: any) => {
                            return (
                                <div className={styles.mainvideoCard} key={i}>
                                    <div className={styles.container}>
                                        <div className={styles.image_box}>
                                            <img src={cloudinaryLoader(e?.thumbnail, 400, 'auto')} alt={e?.title} className={styles.image} />
                                        </div>
                                        <div className={styles.content}>
                                            <p className={styles.title}>{add3Dots(e?.title, 60)}</p>
                                            <p className={styles.author}>By <span className={styles.name}>{e?.author}</span> | {e?.category}</p>
                                        </div>
                                        <div className={styles.action_btn}>
                                            <button className={styles.edit_btn} onClick={() => handleOpenPOpup(e)} >Edit</button>
                                            <button className={styles.del_btn} onClick={() => handleDelete(e?.id)} >Delete</button>
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
                    <div className={styles.pagination_btm}>
                        {filteredBikeVideos?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="medium"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.load_main}>
                    <div className={styles.load_div}>
                        <Loader isLoading={IsLoading} />
                    </div>
                </div>
            )}
            <EditVideo open={open} onClose={() => setOpen(false)} funct={fetchAllVideo} Data={PropsData} />
        </div>
    )
}


export {
    Used_bike_card,
    New_bike_card,
    Blog_Card,
    Dealer_Card,
    Mechanic_Card,
    AllPages_Card,
    AllBrands_Card,
    AllCities_Card,
    ProductList_Card,
    Electric_Bike_Card,
    ShopBrand,
    ForuAllMainCateg,
    ThreadList_Card,
    ThreadComments_Card,
    BikeVideos_Card
}
