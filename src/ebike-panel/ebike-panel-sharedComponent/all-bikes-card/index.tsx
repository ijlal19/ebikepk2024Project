import { getBrandFromId, getCityFromId } from "@/ebikeWeb/functions/globalFuntions";
import styles from './index.module.scss';
import { Grid, Pagination } from "@mui/material";
import { BrandArr, CityArr } from "@/ebikeWeb/constants/globalData";
import { priceWithCommas } from "@/genericFunctions/geneFunc";
import { useEffect, useState } from "react";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { DeleteNewBikeById, DeleteUsedBikeById, getAllNewBike, getCustomBikeAd } from "@/ebike-panel/ebike-panel-Function/globalfunction";
import { useRouter } from "next/navigation";

const Used_bike_card = () => {
    const [AllBikeArr, setAllBikeArr] = useState([]);
    const [AllBikeForFilter, setAllBikeForFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [displayedBikes, setDisplayedBikes] = useState([]);
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

const fetchAllUsedBike = async (_page: any) => {
    setIsLoading(true);
    try {
        const obj = {
            page: _page,
            adslimit: 10
        };
        const res = await getCustomBikeAd(obj);

        if (res && res?.data?.length > 0) {
            const obj1 = {
                page: 1,
                adslimit: res?.total
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

    const handleDelete = async (id: any) => {
    //   const res = await DeleteUsedBikeById(id)
//         console.log("data", res)
    };

    const handleEdit = (id: any) => {
        router.push(`/ebike-panel/dashboard/edit-classified-ads/${id}`);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFeatureToggle = async (id: any, currentStatus: boolean) => {
        // try {
        //     await toggleFeatureStatus(id, !currentStatus);
        //     fetchAllUsedBike(currentPage);
        // } catch (error) {
        //     console.error("Error toggling feature status:", error);
        // }
    };

    return (
        <div className={styles.main_used_bike}>
            
            <div className={styles.search_input}>
                 <input type="text" className={styles.input} value={searchTerm} onChange={handleSearch} placeholder="SearchAd By Seller ID" />
             </div>

            {!IsLoading ? (
                <div>
                    {displayedBikes.length > 0 ? (
                        <>
                            {displayedBikes.map((e: any, i: any) => (
                                <div className={styles.main_box_card} key={i}>
                                    <div className={styles.card_container_box}>
                                        <div className={styles.card_header}>
                                            <h3 className={styles.heading}>{e?.title || 'No Title'}</h3>
                                            <span className={`${styles.featured_badge} ${e?.isFeatured ? styles.featured : ''}`}>
                                               IsFeatured: {e?.isFeatured ? 'True' : 'False'}
                                            </span>
                                            <span className={styles.ad_id}>Ad ID: {e?.id || 'N/A'}</span>
                                        </div>
                                        
                                        <div className={styles.card_content}>
                                            <div className={styles.cardimage_box}>
                                                <img
                                                    src={e?.images[0] || "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png"}
                                                    alt={e?.title || 'Bike Image'}
                                                    className={styles.image}
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png";
                                                    }}
                                                />
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
                                                onClick={() => handleEdit(e?.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={`${styles.action_btn} ${styles.feature_btn}`}
                                                onClick={() => handleFeatureToggle(e?.id, e?.isFeatured)}
                                            >
                                                {e?.isFeatured ? 'Unfeature' : 'Feature'}
                                            </button>
                                            <button
                                                className={`${styles.action_btn} ${styles.disapprove_btn}`}
                                            >
                                                Disapprove
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
                                        // size="small"
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
    const [AllNewBikeArr, setAllNewBikeArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [IsLoading, setIsLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        fetchAllNewBike(1)
    }, [])

    const handlePaginationChange = async (event: any, page: any) => {
        fetchAllNewBike(page)
    }

    const fetchAllNewBike = async (_page: number) => {
        setIsLoading(true);
        const res = await getAllNewBike();
        console.log("data", res);

        const perPage = 10;
        const totalPages = Math.ceil(res?.length / perPage);
        setTotalPage(totalPages);

        const startIndex = (_page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const currentPageData = res.slice(startIndex, endIndex);
        setAllNewBikeArr(currentPageData);
        setCurrentPage(_page);

        setIsLoading(false);

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    };

    const GetName = (from: any, id: any) => {
        if (from == 'brand') {
            let brand = getBrandFromId(id, BrandArr)
            return brand[0]?.brandName
        }
        else {
            let city = getCityFromId(id, CityArr)
            return city[0]?.city_name
        }
    }

    const handleDelete = async (id: any) => {
        const res = await DeleteNewBikeById(id)
        console.log("data", res)
    }

    const handleEdit = (id: any) => {
        router.push(`/ebike-panel/dashboard/edit-new-bike/${id}`)
    }

    return (
        <div className={styles.main_new_bike}>
            <div className={styles.search_input}>
                <input type="text" className={styles.input} placeholder="Search New Bike with Title" />
            </div>
            {
                !IsLoading ?
                    <div >
                        {
                            AllNewBikeArr.map((e: any, i: any) => {
                                return (
                                    <div className={styles.card_main_box} key={i}>
                                        <div className={styles.card_container_box}>
                                            <div className={styles.heading_box}>
                                                <p className={styles.heading}>{e?.title}</p>
                                            </div>
                                            <Grid container className={styles.card_content}>
                                                <Grid item xs={3} className={styles.cardimage_box}>
                                                    <img src={e?.images[0] ? e?.images[0] : "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png"} alt="" className={styles.image} />
                                                </Grid>
                                                <Grid item xs={9} className={styles.card_detail}>
                                                    <p className={styles.phone}>Ad ID : {e?.id}</p>
                                                    <p className={styles.brand}>Brand : {GetName("brand", e?.brandId)}</p>
                                                    <p className={styles.brand}>Price : {e?.price == '' ? '0' : priceWithCommas(e?.price)}</p>
                                                    <p style={{ margin: "10px 0px", padding: "0px", color: "black", fontSize: "14px" }} className={styles.desc} dangerouslySetInnerHTML={{ __html: e?.description }}></p>

                                                </Grid>
                                            </Grid>
                                            <div className={styles.card_action}>
                                                <button className={styles.action} onClick={() => handleEdit(e?.id)}>Edit</button>
                                                <button className={styles.action_del} onClick={() => { handleDelete(e?.id) }} >Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className={styles.pagination}>
                            {AllNewBikeArr?.length > 0 ?
                                <div className={styles.used_bike_list_pagination}>
                                    <Pagination
                                        count={totalPage}
                                        onChange={handlePaginationChange}
                                        page={currentPage}
                                    />
                                </div>
                                : ""}
                        </div>
                    </div >
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={IsLoading} />
                        </div>
                    </div>
            }
        </div>
    )
}

export {
    Used_bike_card
    , New_bike_card
}


// const Used_bike_card = () => {
//     const [AllBikeArr, setAllBikeArr] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPage, setTotalPage] = useState<any>(null);
//     const [IsLoading, setIsLoading] = useState(false);

//     const router = useRouter()

//     useEffect(() => {
//         fetchAllUsedBike(1)
//     }, [])

//     const handlePaginationChange = async (event: any, page: any) => {
//         fetchAllUsedBike(page)
//     }


//     const fetchAllUsedBike = async (_page: any) => {
//         setIsLoading(true)
//         const obj = {
//             page: _page,
//             adslimit: 10
//         }
//         const res = await getCustomBikeAd(obj)
//         if (res && res?.data?.length > 0) {
//             setCurrentPage(res?.currentPage)
//             setAllBikeArr(res?.data)
//             setTotalPage(res?.pages)
//             console.log("data", res.data)
//         }
//         else {
//             setCurrentPage(res?.currentPage)
//             setAllBikeArr([])
//             setTotalPage(0)
//         }
//         setIsLoading(false)
//         setTimeout(() => {
//             window.scrollTo(0, 0)
//         }, 1000);
//     }

//     const GetName = (from: any, id: any) => {
//         if (from == 'brand') {
//             let brand = getBrandFromId(id, BrandArr)
//             return brand[0]?.brandName
//         }
//         else {
//             let city = getCityFromId(id, CityArr)
//             return city[0]?.city_name
//         }
//     }

//     const GetPhone = (phone: any) => {
//         if (phone && phone?.charAt(0) != '0') {
//             const phoneNo = '0' + phone
//             const with_Phone = `${phoneNo.slice(0, 4)}-${phoneNo.slice(4)}`
//             return with_Phone
//         }
//     }
//     const handleDelete = async (id: any) => {
//         const res = await DeleteUsedBikeById(id)
//         console.log("data", res)
//     }

//     const handleEdit = (id: any) => {
//         router.push(`/ebike-panel/dashboard/edit-classified-ads/${id}`)
//     }


//     return (
//         <div className={styles.main_used_bike}>
//             <div className={styles.search_input}>
//                 <input type="text" className={styles.input} placeholder="SearchAd By Seller ID" />
//             </div>
//             {
//                 !IsLoading ?
//                     <div >
//                         {
//                             AllBikeArr.map((e: any, i: any) => {
//                                 return (
//                                     <div className={styles.main_box_card} key={i}>
//                                         <div className={styles.card_container_box}>
//                                             <div className={styles.heading_box}>
//                                                 <p className={styles.heading}>{e?.title}</p>
//                                             </div>
//                                             <Grid container className={styles.card_content}>
//                                                 <Grid item xs={3} className={styles.cardimage_box}>
//                                                     <img src={e?.images[0] ? e?.images[0] : "https://res.cloudinary.com/dtroqldun/image/upload/c_scale,f_auto,h_200,q_auto,w_auto,dpr_auto/v1549082792/ebike-graphics/placeholders/used_bike_default_pic.png"} alt="" className={styles.image} />
//                                                 </Grid>
//                                                 <Grid item xs={9} className={styles.card_detail}>
//                                                     <p className={styles.date}>{e?.createdAt.slice(0, 10)}</p>
//                                                     <p className={styles.brand}>Brand : {GetName("brand", e?.brandId)}</p>
//                                                     <p className={styles.brand}>City : {GetName("city", e?.cityId)}</p>
//                                                     <p className={styles.brand}>Price : {e?.price == '' ? '0' : priceWithCommas(e?.price)}</p>
//                                                     <p className={styles.brand}>Name : {e?.sellerName}</p>
//                                                     <p className={styles.phone}>Phone : {GetPhone(e?.mobileNumber)}</p>
//                                                     <p className={styles.phone}>Description : {e?.description}</p>
//                                                     <p className={styles.phone}>Ad ID : {e?.id}</p>
//                                                     <p className={styles.featured}>Featured Ad : {String(e?.isFeatured)}</p>
//                                                 </Grid>
//                                             </Grid>
//                                             <div className={styles.card_action}>
//                                                 <button className={styles.action}>Disapprove</button>
//                                                 <button className={styles.action}>UnFeatured</button>
//                                                 <button className={styles.action_del} onClick={() => handleDelete(e?.id)}>Delete</button>
//                                                 <button className={styles.action} onClick={() => { handleEdit(e?.id) }} >Edit</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             })
//                         }
//                         <div className={styles.pagination}>
//                             {AllBikeArr?.length > 0 ?
//                                 <div className={styles.used_bike_list_pagination}>
//                                     <Pagination
//                                         count={totalPage}
//                                         onChange={handlePaginationChange}
//                                         page={currentPage}
//                                     />
//                                 </div>
//                                 : ""}
//                         </div>
//                     </div >
//                     :
//                     <div className={styles.load_main}>
//                         <div className={styles.load_div}>
//                             <Loader isLoading={IsLoading} />
//                         </div>
//                     </div>
//             }
//         </div>
//     )
// }