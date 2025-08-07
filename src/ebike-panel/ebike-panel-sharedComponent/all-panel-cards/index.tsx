'use client'
import { ChangeApprove, ChangeDealerApprove, ChangeDealerFeatured, ChangeFeatured, ChangeMechanicApprove, ChangeMechanicFeatured, DeleteBlogById, DeleteBrandbyId, DeleteDealerbyId, DeleteMechanicbyId, DeleteNewBikeById, DeletePagebyId, DeleteUsedBikeById, getAllBlog, getAllDealer, getAllMechanics, getAllNewBike, getAllPages, getbrandData, getCustomBikeAd } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions";
import { add3Dots, priceWithCommas } from "@/genericFunctions/geneFunc";
import { BrandArr, CityArr } from "@/ebikeWeb/constants/globalData";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { Navigation, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Link, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Panel_header from "../panel-header";
import styles from './index.module.scss';
import '../../../app/globals.scss';
import 'swiper/css/navigation';
import 'swiper/css';

/////////////////////////////////////////////////////// USED BIKE CARD
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
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Ad By Seller ID" />
            {!IsLoading ? (
                <div className={styles.card_conatiner}>
                    {displayedBikes.length > 0 ? (
                        <>
                            {displayedBikes.map((e: any, i: any) => (
                                <div className={styles.main_box_card} key={i}>
                                    <div className={styles.card_container_box}>
                                        <div className={styles.card_header}>
                                            <h3 className={styles.heading}>{add3Dots(e?.title, 50) || 'No Title'}</h3>
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
                                                                <img src='https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png' alt={e?.title} className={styles.image} />
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

/////////////////////////////////////////////////////// NEW BIKE CARD
const New_bike_card = () => {
    const [AllNewBikeForFilter, setAllNewBikeForFilter] = useState<any>([]);
    const [filteredBikes, setFilteredBikes] = useState<any>([]);
    const [displayedBikes, setDisplayedBikes] = useState<any>([]);
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
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search New Bike with Title" />

            {!IsLoading ? (
                <div>
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
                                                                        <img src={imgUrl} alt={e?.title} className={styles.image} />
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
                        </>) : (
                        <div className={styles.no_results}>
                            <p>No bikes found matching your search criteria.</p>
                        </div>
                    )}
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

/////////////////////////////////////////////////////// BLOG CARD
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
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Blog with Title" />

            {!IsLoading ? (
                <div className={styles.card_container}>
                    {displayedBlog.map((e: any, i: any) => (

                        <div className={styles.main_box_card} key={i}>
                            <div className={styles.card_container_box}>
                                <div className={styles.card_header}>
                                    <h3 className={styles.heading}>{add3Dots(e?.blogTitle, 50) || 'No Title'}</h3>
                                    <span className={styles.ad_id}>Blog ID: {e?.id}</span>
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

/////////////////////////////////////////////////////// DEALERS CARD
const Dealer_Card = () => {
    const [AllDealerFilter, setAllDealerFilter] = useState([]);
    const [filteredDealer, setfilteredDealer] = useState([]);
    const [displayedDealer, setdisplayedDealer] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [FilterApprove, setFilterApprove] = useState(false)

    const itemsPerPage = 10;

    useEffect(() => {
        const filtered = AllDealerFilter.filter((m: any) => m.is_approved === FilterApprove);
        setdisplayedDealer(filtered);
    }, [FilterApprove])

    useEffect(() => {
        fetchAllDealers(1);
    }, []);

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
                setAllDealerFilter(res);
                setfilteredDealer(res);
                setCurrentPage(_page);
            } else {
                setAllDealerFilter([]);
                setfilteredDealer([]);
                setdisplayedDealer([]);
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

    const handleState = () => {
        setFilterApprove(!FilterApprove)
    }

    return (
        <div className={styles.main_dealers}>
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Dealers with Title" />

            {!IsLoading ? (
                <div className={styles.card_container}>
                    <button onClick={handleState} className={styles.change_approved_btn}>{FilterApprove ? 'DisApproved' : "Approved"}</button>

                    {displayedDealer.map((e: any, i: any) => (

                        <div className={styles.main_box_card} key={i}>
                            <div className={styles.card_container_box}>
                                <div className={styles.card_header}>
                                    <h3 className={styles.heading}>{add3Dots(e?.shop_name, 50) || 'No Title'}</h3>
                                    <span className={`${styles.featured_badge} ${e?.is_approved ? styles.featured : ''}`}>
                                        IsApproved: {e?.is_approved ? 'True' : 'False'}
                                    </span>
                                    <span className={styles.ad_id}>Dealer ID: {e?.id}</span>
                                </div>

                                <div className={styles.card_content}>
                                    <div className={styles.cardimage_box}>
                                        <img src={e?.bike_brand?.logoUrl} alt={e?.title} className={styles.image} />
                                    </div>

                                    <div className={styles.card_detail}>
                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Date:</span>
                                            <span>{e?.createdAt ? e?.createdAt.slice(0, 10) : "N/A"}</span>
                                        </div>


                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Address:</span>
                                            <span>{e?.address || "N/A"}</span>
                                        </div>

                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Phone:</span>
                                            <span>{e?.phone?.slice(0, 4)}-{e?.phone?.slice(4) || 'N/A'}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className={styles.card_actions}>
                                    <button
                                        className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                        onClick={() => handleApproveToggle(e?.id, e?.is_approved)}
                                    >
                                        {e?.is_approved ? "Disapprove" : "Approve"}
                                    </button>
                                    <button
                                        className={`${styles.action_btn} ${styles.feature_btn}`}
                                        onClick={() => handleFeatureToggle(e?.id, e?.is_featured)}
                                    >
                                        {e?.is_featured ? 'UnFeature' : 'Feature'}
                                    </button>
                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.pagination}>
                        {filteredDealer?.length > 0 && (
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

////////////////////////////////////////////////////// MECHANICS Card
const Mechanic_Card = () => {
    const [AllmechanicFilter, setAllmechanicFilter] = useState([]);
    const [filteredmechanic, setfilteredmechanic] = useState([]);
    const [displayedmechanic, setdisplayedmechanic] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [FilterApprove, setFilterApprove] = useState(false)

    const itemsPerPage = 10;

    useEffect(() => {
        const filtered = AllmechanicFilter.filter((m: any) => m.is_approved === FilterApprove);
        setdisplayedmechanic(filtered);
    }, [FilterApprove])

    useEffect(() => {
        fetchAllmechanics(1);
    }, []);

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
                setAllmechanicFilter(res);
                setfilteredmechanic(res);
                setCurrentPage(_page);
            } else {
                setAllmechanicFilter([]);
                setfilteredmechanic([]);
                setdisplayedmechanic([]);
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
        const isConfirm = window.confirm('Are you sure to delete this mechanic?')
        if (!isConfirm) return;
        const res = await DeleteMechanicbyId(id);
        if (res && res?.success) {
            fetchAllmechanics(currentPage);
        }
        else {
            alert('SomeThing is Wrong!')
        }
    };

    const handleApproveToggle = async (id: any, currentStatus: boolean) => {
        const confirmDelete = window.confirm("Are you sure you want to Change mechanic Approve?");
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
    const handleState = () => {
        setFilterApprove(!FilterApprove)
    }

    return (
        <div className={styles.main_mechanics}>
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Mechanics with Title" />

            {!IsLoading ? (
                <div className={styles.card_container}>
                    <button onClick={handleState} className={styles.change_approved_btn}>{FilterApprove ? 'DisApproved' : "Approved"}</button>
                    {displayedmechanic.map((e: any, i: any) => (

                        <div className={styles.main_box_card} key={i}>
                            <div className={styles.card_container_box}>
                                <div className={styles.card_header}>
                                    <h3 className={styles.heading}>{add3Dots(e?.shop_name, 50) || 'No Title'}</h3>
                                    <span className={`${styles.featured_badge} ${e?.is_approved ? styles.featured : ''}`}>
                                        IsApproved: {e?.is_approved ? 'True' : 'False'}
                                    </span>
                                    <span className={styles.ad_id}>Mechanic ID: {e?.id}</span>
                                </div>

                                <div className={styles.card_content}>
                                    <div className={styles.cardimage_box}>
                                        <img src={e?.bike_brand?.logoUrl} alt={e?.title} className={styles.image} />
                                    </div>

                                    <div className={styles.card_detail}>
                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Date:</span>
                                            <span>{e?.createdAt ? e?.createdAt.slice(0, 10) : "N/A"}</span>
                                        </div>


                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Address:</span>
                                            <span>{e?.address || "N/A"}</span>
                                        </div>

                                        <div className={styles.detail_row}>
                                            <span className={styles.detail_label}>Phone:</span>
                                            <span>{e?.phone?.slice(0, 4)}-{e?.phone?.slice(4) || 'N/A'}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className={styles.card_actions}>
                                    <button
                                        className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                        onClick={() => handleApproveToggle(e?.id, e?.is_approved)}
                                    >
                                        {e?.is_approved ? "Disapprove" : "Approve"}
                                    </button>
                                    <button
                                        className={`${styles.action_btn} ${styles.feature_btn}`}
                                        onClick={() => handleFeatureToggle(e?.id, e?.is_featured)}
                                    >
                                        {e?.is_featured ? 'UnFeature' : 'Feature'}
                                    </button>
                                    <button className={`${styles.action_btn} ${styles.delete_btn}`} onClick={() => handleDelete(e?.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.pagination}>
                        {filteredmechanic?.length > 0 && (
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

////////////////////////////////////////////////////// All PAGES CARD
const AllPages_Card = () => {
    const [AllPages, setAllPages] = useState([]);
    const [filteredAllPages, setfilteredAllPages] = useState([]);
    const [displayedAllPages, setdisplayedAllPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);

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
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Page with Title" />


            {!IsLoading ? (
                <>
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
            <Panel_header value={searchTerm} onChange={handleSearch} placeholder="Search Brand with Name" />
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

export {
    Used_bike_card,
    New_bike_card,
    Blog_Card,
    Dealer_Card,
    Mechanic_Card,
    AllPages_Card,
    AllBrands_Card
}