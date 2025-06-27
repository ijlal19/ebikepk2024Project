import { ChangeApprove, ChangeFeatured, DeleteBlogById, DeleteNewBikeById, DeleteUsedBikeById, getAllBlog, getAllNewBike, getCustomBikeAd } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions";
import { BrandArr, CityArr } from "@/ebikeWeb/constants/globalData";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { add3Dots, priceWithCommas } from "@/genericFunctions/geneFunc";
import { Navigation, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Panel_header from "../panel-header";
import styles from './index.module.scss';
import '../../../app/globals.scss';
import 'swiper/css/navigation';
import 'swiper/css';
import { FaLaptopHouse } from "react-icons/fa";

const Used_bike_card = () => {

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
        if (res) {
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
        console.log(obj)
        const res = await ChangeFeatured(id, obj)
        if (res && res?.adData && res?.info) {
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
        if (res && res?.adData && res?.info) {
            fetchAllUsedBike(currentPage)
        }
        else {
            alert('Something is Wrong!')
        }
    };

    const fetchAllUsedBike = async (_page: any) => {
        setIsLoading(true);
        try {
            const obj = {
                page: _page,
                adslimit: 10,
                // isApproved: true
            };
            const res = await getCustomBikeAd(obj);

            if (res && res?.data?.length > 0) {
                const obj1 = {
                    page: 1,
                    adslimit: res?.total,
                    // isApproved:true
                };
                const res1 = await getCustomBikeAd(obj1);

                if (res1 && res1?.data?.length > 0) {
                    setAllBikeForFilter(res1.data);
                } else {
                    setAllBikeForFilter([]);
                }

                setCurrentPage(_page);
                setAllBikeArr(res.data);
            } else {
                setCurrentPage(1);
                setAllBikeArr([]);
                setAllBikeForFilter([]);
                setFilteredBikes([]);
                setTotalPage(0);
            }
        } catch (error) {
            console.error("Error fetching bikes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.main_used_bike}>
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Ad By Seller ID" />
            {!IsLoading ? (
                <div className={styles.card_conatiner}>
                    {displayedBikes.length > 0 ? (
                        <>
                            {displayedBikes.map((e: any, i: any) => (
                                <div className={styles.main_box_card} key={i}>
                                    <div className={styles.card_container_box}>
                                        <div className={styles.card_header}>
                                            <h3 className={styles.heading}>{add3Dots(e?.title , 50) || 'No Title'}</h3>
                                            <span className={`${styles.featured_badge} ${e?.isFeatured ? styles.featured : ''}`}>
                                                IsFeatured: {e?.isFeatured ? 'True' : 'False'}
                                            </span>
                                            <span className={styles.ad_id}>Ad ID: {e?.id || 'N/A'}</span>
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
                                                            <SwiperSlide key=''>
                                                                <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' alt={e?.title} className={styles.slider_img} />
                                                            </SwiperSlide>
                                                    }
                                                </Swiper>
                                            </div>

                                            <div className={styles.card_detail}>
                                                <div className={styles.detail_row}>
                                                    <span className={styles.detail_label}>Date:</span>
                                                    <span>{e?.createdAt?.slice(0, 10) || 'N/A'}</span>
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
                                                        {e?.description || 'No description available'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.card_actions}>
                                            <button
                                                className={`${styles.action_btn} ${styles.edit_btn}`}
                                                onClick={() => handleEdit(e?.id)}>
                                                <a href={`/ebike-panel/dashboard/edit-classified-ads/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
                                                    Edit
                                                </a>
                                            </button>
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

                            {filteredBikes.length > itemsPerPage && (
                                <div className={styles.pagination}>
                                    <Pagination
                                        count={totalPage}
                                        onChange={handlePaginationChange}
                                        page={currentPage}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.no_results}>
                            <p>No bikes found matching your search criteria.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.loader_container}>
                    <Loader isLoading={IsLoading} />
                </div>
            )}
        </div>
    );
};

const New_bike_card = () => {
    const [AllNewBikeForFilter, setAllNewBikeForFilter] = useState([]);
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [displayedBikes, setDisplayedBikes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);

    const itemsPerPage = 10;
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
        const res = await DeleteNewBikeById(id);
        if(res && res.deleted){
            fetchAllNewBike(currentPage);
        }
        else{
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
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search New Bike with Title" />

            {!IsLoading ? (
                <div>
                    {displayedBikes.map((e: any, i: any) => (

                        <div className={styles.main_box_card} key={i}>
                            <div className={styles.card_container_box}>
                                <div className={styles.card_header}>
                                    <h3 className={styles.heading}>{e?.title}</h3>
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
                                                                <img src={imgUrl} alt={e?.title} className={styles.image} />
                                                            </SwiperSlide>
                                                        )
                                                    }) :
                                                    <SwiperSlide key=''>
                                                        <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' alt={e?.title} className={styles.slider_img} />
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

                                        <div className={styles.detail_row}>
                                            <p style={{ margin: "10px 0px", padding: "0px", color: "black", fontSize: "14px" }} className={styles.desc} dangerouslySetInnerHTML={{ __html: e?.description }}></p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.card_actions}>
                                    <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEdit(e?.id)}>
                                        <a href={`/ebike-panel/dashboard/edit-new-bike/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
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
                        {filteredBikes?.length > 0 && (
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
    );
};

const Blog_Card = () => {
    const [AllBlogFilter, setAllBlogFilter] = useState([]);
    const [filteredBlog, setFilteredBlog] = useState([]);
    const [displayedBlog, setDisplayedBlog] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);

    const itemsPerPage = 10;
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
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Blog with Title" />

            {!IsLoading ? (
                <div className={styles.card_container}>
                    {displayedBlog.map((e: any, i: any) => (

                        <div className={styles.main_box_card} key={i}>
                            <div className={styles.card_container_box}>
                                <div className={styles.card_header}>
                                    <h3 className={styles.heading}>{e?.blogTitle}</h3>
                                    <span className={styles.ad_id}>Ad ID: {e?.id}</span>
                                </div>

                                <div className={styles.card_content}>
                                    <div className={styles.cardimage_box}>
                                        <img className={styles.image} src={e?.featuredImage ? e?.featuredImage : "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png"} alt="" />
                                    </div>

                                    <div className={styles.card_detail}>
                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Date:</span>
                                            <span>{e?.createdAt ? e?.createdAt.slice(0, 10) : "N/A"}</span>
                                        </div>


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
                                                {e?.meta_description || 'No description available'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.card_actions}>
                                    <button className={`${styles.action_btn} ${styles.edit_btn}`} onClick={() => handleEditBlog(e?.id)}>
                                        <a href={`/ebike-panel/dashboard/edit-blog/${e?.id}`} style={{ textDecoration: 'none', color: "white" }}>
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
                        {filteredBlog?.length > 0 && (
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

export {
    Used_bike_card,
    New_bike_card,
    Blog_Card
}