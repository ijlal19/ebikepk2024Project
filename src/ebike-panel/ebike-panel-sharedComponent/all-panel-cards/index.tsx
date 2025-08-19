'use client'
import { addNewCity, ChangeApprove, ChangeDealerApprove, ChangeDealerFeatured, ChangeFeatured, ChangeMechanicApprove, ChangeMechanicFeatured, DeleteBlogById, DeleteBrandbyId, DeleteCitybyId, DeleteDealerbyId, DeleteMechanicbyId, DeleteNewBikeById, DeletePagebyId, DeleteProductbyId, DeleteUsedBikeById, getAllBlog, getAllDealer, getAllMechanics, getAllNewBike, getAllPages, getbrandData, getCityData, getCustomBikeAd, getShopCategory, getShopMainCategory } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions";
import { add3Dots, priceWithCommas, cloudinaryLoader } from "@/genericFunctions/geneFunc";
import { BrandArr, CityArr } from "@/ebikeWeb/constants/globalData";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { Grid, Link, Pagination } from "@mui/material";
import { Navigation, FreeMode } from 'swiper/modules';
import SearchIcon from '@mui/icons-material/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import { New_header } from "../panel-header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './index.module.scss';
import '../../../app/globals.scss';
import 'swiper/css/navigation';
import 'swiper/css';

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
        fetchAllUsedBike(1);
    }, []);

    useEffect(() => {
        const filtered = AllBikeForFilter.filter((bike: any) =>
            bike.id.toString().includes(searchTerm)
        );
        setFilteredBikes(filtered);
        setCurrentPage(1);
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
            let brand = getBrandFromId(id, BrandArr);
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
        router.push(`/ebike-panel/dashboard/edit-classified-ads/${id}`);
    };

    const handleDelete = async (id: any) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Ad?");
        if (!confirmDelete) return;

        const res = await DeleteUsedBikeById(id);
        if (res && res?.success) {
            alert('Updated Successfully')
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
            fetchAllUsedBike(currentPage)
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
            fetchAllUsedBike(currentPage)
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

            if (res1 && res1?.data?.length > 0) {
                setAllBikeForFilter(res1.data);
            }
            else {
                setAllBikeForFilter([]);
            }
            setCurrentPage(_page);
            setAllBikeArr(res1.data);
            setIsLoading(false);
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 500);

            // } else {
            //     setCurrentPage(1);
            //     setAllBikeArr([]);
            //     setAllBikeForFilter([]);
            //     setFilteredBikes([]);
            //     setTotalPage(0);
            // }

        } catch (error) {
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
                                                                        <img src={cloudinaryLoader(imgUrl, 300, 'auto')} alt={e?.title} className={styles.image} />
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
        fetchAllNewBike(1);
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

    const fetchAllNewBike = async (_page: number) => {
        setIsLoading(true);
        try {
            const res = await getAllNewBike();
            if (res && res.length > 0) {
                setAllNewBikeForFilter(res);
                setFilteredBikes(res);
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
            const brand = getBrandFromId(id, BrandArr);
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
            fetchAllNewBike(currentPage);
        }
        else {
            alert('Something is Wrong!')
        }
        console.log("Deleted:", res);
    };

    const handleEdit = (id: any) => {
        router.push(`/ebike-panel/dashboard/edit-new-bike/${id}`);
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.main_new_bike}>
            {/* <New_header value={searchTerm} onChange={handleSearch} placeholder="Search New Bike with Title" /> */}
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
                                                                            <img src={cloudinaryLoader(imgUrl, 500, 'auto')} alt={e?.title} className={styles.image} />
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
                                                <Link href={`/ebike-panel/dashboard/edit-new-bike/${e?.id}`} style={{ textDecoration: 'none', color: "white", width: '100%' }}>
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
                                                                <img src={imgUrl.trim()} alt={e?.title} className={styles.image} />
                                                            </SwiperSlide>
                                                        ))
                                                    ) :
                                                        <SwiperSlide key=''>
                                                            <img src={e?.featuredImage?.split(' #$# ')[0].trim()} alt={e?.title} className={styles.image} />
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
                                                    displayedDealer.length > 0 ? displayedDealer.map((e: any, i: any) => {
                                                        return (
                                                            <tr className={styles.tr} key={i}>
                                                                {/* <td className={styles.td} style={{fontSize:'14px'}} >{e?.id}</td> */}
                                                                <td className={styles.td} >
                                                                    <img src={e?.bike_brand?.logoUrl} alt={e?.title} className={styles.image} />
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
                                                                    <img src={e?.bike_brand?.logoUrl} alt={e?.title} className={styles.image} />
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
            bike.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
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
            bike.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                                                                    <img src={e?.bike_brand?.logoUrl} alt={e?.title} className={styles.image} />
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
                                                                    <img src={e?.bike_brand?.logoUrl} alt={e?.title} className={styles.image} />
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

    const itemsPerPage = 10;
    const router = useRouter()
    useEffect(() => {
        fetchAllBrands(1);
    }, []);

    useEffect(() => {
        const filtered = AllBrands.filter((bike: any) =>
            bike?.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setfilteredAllBrands(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllBrands]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setdisplayedAllBrands(filteredAllBrands.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredAllBrands.length / itemsPerPage));
    }, [filteredAllBrands, currentPage]);

    const fetchAllBrands = async (_page: number) => {
        setIsLoading(true);
        const res = await getbrandData();
        console.log("Brands", res)
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
            window.scrollTo(0, 0)
        }, 1000)
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
            fetchAllBrands(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleEditBrand = (id: any) => {
        router.push(`/ebike-panel/dashboard/edit-brand/${id}`);
    };

    return (
        <div className={styles.main_brands}>
            <New_header value={searchTerm} onChange={handleSearch} placeholder="Search Brand with Name" />
            {!IsLoading ? (
                <div className={styles.card_container}>
                    {displayedAllBrands.map((e: any, i: any) => (

                        <div className={styles.main_box_card} key={i}>
                            <div className={styles.card_container_box}>
                                <div className={styles.card_header}>
                                    <h3 className={styles.heading}>{add3Dots(e?.brandName, 50) || 'No Title'}</h3>
                                    <span className={styles.ad_id}>Brand ID: {e?.id}</span>
                                </div>

                                <div className={styles.card_content}>
                                    <div className={styles.cardimage_box}
                                        style={{
                                            background: `url(${e?.logoUrl})`,
                                            backgroundPosition: "center",
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '100px auto'
                                        }}>
                                    </div>

                                    <div className={styles.card_detail}>
                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Date:</span>
                                            <span>{e?.createdAt ? e?.createdAt.slice(0, 10) : "N/A"}</span>
                                        </div>


                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Brand Name:</span>
                                            <span>{e?.brandName ? e?.brandName : "N/A"}</span>
                                        </div>

                                        <div className={styles.description}>
                                            Description:
                                            <p className={styles.description_text}>
                                                {e?.description || 'No description available'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.card_actions}>
                                    <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEditBrand(e?.id)}>
                                        <a href={`/ebike-panel/dashboard/edit-brand/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
                                            Edit
                                        </a></button>
                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.pagination}>
                        {filteredAllBrands?.length > 0 && (
                            <div className={styles.used_bike_list_pagination}>
                                <Pagination
                                    count={totalPage}
                                    onChange={handlePaginationChange}
                                    page={currentPage}
                                    size="large"
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
        if (res && res.info == 'Deleted' , res?.success) {
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
                                                                    <img src={imgUrl} alt={e?.title} className={styles.image} />
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
                                        <a href={`/ebike-panel/dashboard/edit-Shop/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
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

export {
    Used_bike_card,
    New_bike_card,
    Blog_Card,
    Dealer_Card,
    Mechanic_Card,
    AllPages_Card,
    AllBrands_Card,
    AllCities_Card,
    ProductList_Card
}