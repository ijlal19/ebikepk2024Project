'use client';
import { Pagination } from '@mui/material';
import Loader from '../../loader/loader';
import { New_header } from '../../panel-header';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { DeleteNewsLetterUserbyId, DeleteUserbyId, getNewLettetrData, getSignupData } from '@/ebike-panel/ebike-panel-Function/globalfunction';

const All_User = () => {
    const [isLoading, setIsloading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageNews, setCurrentNewsPage] = useState(1);
    const [totalPage, setTotalPage] = useState<any>(null);
    const [totalNewsPage, setTotalNewsPage] = useState<any>(null);
    const [HandleOpenTabs, setHandleOpenTabs] = useState(false)
    const [AllUserForFilter, setAllUserForFilter] = useState<any>([]);
    const [filteredUser, setFilteredUser] = useState<any>([]);
    const [displayedUser, setDisplayedUser] = useState<any>([]);
    const [AllNewsEmailForFilter, setAllNewsEmailForFilter] = useState<any>([]);
    const [filteredNewsEmail, setFilteredNewsEmail] = useState<any>([]);
    const [displayedNewsEmail, setDisplayedNewsEmail] = useState<any>([]);

    const itemsPerPage = 30;

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        fetchAllUser(1)
    }, [])

    useEffect(() => {
        const filtered = AllNewsEmailForFilter.filter((user: any) =>
            user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNewsEmail(filtered);
        setCurrentNewsPage(1);
    }, [searchTerm, AllNewsEmailForFilter]);

    useEffect(() => {
        const startIndex = (currentPageNews - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedNewsEmail(filteredNewsEmail.slice(startIndex, endIndex));
        setTotalNewsPage(Math.ceil(filteredNewsEmail.length / itemsPerPage));
    }, [filteredNewsEmail, currentPageNews]);

    useEffect(() => {
        const filtered = AllUserForFilter.filter((user: any) =>
            user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUser(filtered);
        setCurrentPage(1);
    }, [searchTerm, AllUserForFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedUser(filteredUser.slice(startIndex, endIndex));
        setTotalPage(Math.ceil(filteredUser.length / itemsPerPage));
    }, [filteredUser, currentPage]);

    const fetchAllUser = async (_page: number) => {
        setIsloading(true);
        try {
            const res = await getSignupData();
            const resnew = await getNewLettetrData();
            if (res && res.length > 0 && resnew?.data.length > 0) {
                setAllUserForFilter(res);
                setFilteredUser(res);
                setCurrentPage(_page);
                setAllNewsEmailForFilter(resnew?.data);
                setFilteredNewsEmail(resnew?.data);
                setCurrentNewsPage(_page);
            } else {
                setAllNewsEmailForFilter([]);
                setFilteredNewsEmail([]);
                setDisplayedNewsEmail([])
                setAllUserForFilter([]);
                setCurrentNewsPage(1);
                setDisplayedUser([]);
                setFilteredUser([]);
                setCurrentPage(1);
                setTotalPage(0);
                setTotalNewsPage(0);
            }

        } catch (error) {
            console.error("Error fetching new bikes:", error);
        }
        setIsloading(false);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000)
    };

    const handlePaginationChange = (event: any, page: any) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };
    const handlePaginationChangeNews = (event: any, page: any) => {
        setCurrentNewsPage(page);
        window.scrollTo(0, 0);
    };
    const handleTabs = (value: any) => {
        if (value == 'newsletter') {
            setHandleOpenTabs(true)
        }
        else if (value == "userEmail") {
            setHandleOpenTabs(false)
        }
    }
    const handleDelete = async (id: any, from: any) => {
        if (from == "User") {
            const confirmDelete = window.confirm("Are you sure you want to delete this User?");
            if (!confirmDelete) return;

            const res = await DeleteUserbyId(id);
            if (res) {
                alert('Delete Successfully')
                fetchAllUser(currentPage)
            } else {
                alert("Something went wrong!");
            }
            return;
        }
        else if (from == 'Email') {
            const confirmDelete = window.confirm("Are you sure you want to delete this Email?");
            if (!confirmDelete) return;

            const res = await DeleteNewsLetterUserbyId(id);
            if (res && res?.success && res?.info == "Deleted") {
                alert('Delete Successfully')
                fetchAllUser(currentPageNews)
            } else {
                alert("Something went wrong!");
            }
            return;
        }
        else {
            alert("Not Found")
        }
    };

    return (
        <div>
            <New_header value={searchTerm} onChange={handleSearch} placeholder="Search User with Email" />
            {
                !isLoading ?
                    <div className={styles.main}>
                        <div className={styles.container}>
                            <div className={styles.header}>
                                <button className={`${styles.btn} ${!HandleOpenTabs ? styles.selected : styles.btn}`} onClick={() => handleTabs('userEmail')} >SignUp User Email</button>
                                <button className={`${styles.btn} ${HandleOpenTabs ? styles.selected : styles.btn}`} onClick={() => handleTabs('newsletter')} >News Letter Email</button>
                            </div>
                            <div className={styles.table_section}>
                                {
                                    !HandleOpenTabs ?
                                        <div className={styles.pagination}>
                                            {displayedUser?.length > 0 && (
                                                <Pagination
                                                    count={totalPage}
                                                    onChange={handlePaginationChange}
                                                    page={currentPage}
                                                    size="small"
                                                    sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                                />
                                            )}
                                        </div>
                                        :
                                        <div className={styles.pagination}>
                                            {displayedNewsEmail?.length > 0 && (
                                                <Pagination
                                                    count={totalNewsPage}
                                                    onChange={handlePaginationChangeNews}
                                                    page={currentPageNews}
                                                    size="small"
                                                    sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                                />
                                            )}
                                        </div>
                                }
                                <div className={styles.table_main}>
                                    {
                                        !HandleOpenTabs ?
                                            <table className={styles.table}>
                                                <thead className={styles.thead}>
                                                    <th className={styles.th} >#</th>
                                                    <th className={styles.th} >User Name</th>
                                                    <th className={styles.th} >User Email</th>
                                                    <th className={styles.th} >SignUp Type</th>
                                                    <th className={styles.th} >User Type</th>
                                                    <th className={styles.th} >Status</th>
                                                    {/* <th className={styles.th} >Delete</th> */}
                                                </thead>
                                                <tbody className={styles.tbody}>
                                                    {
                                                        displayedUser.length > 0 ? displayedUser.map((e: any, i: any) => {
                                                            return (
                                                                <tr className={styles.tr} key={i}>
                                                                    <td className={styles.td} >
                                                                        {(currentPage - 1) * itemsPerPage + i + 1}
                                                                    </td>
                                                                     <td className={styles.td} >{e?.userFullName}</td>
                                                                    <td className={styles.td} >{e?.email || 'N/A'}</td>
                                                                     <td className={styles.td} >{e?.signupType}</td>
                                                                    <td className={styles.td} >{e?.userType}</td>
                                                                    <td className={styles.td} >{e?.status}</td>
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
                                                    <th className={styles.th} >#</th>
                                                    <th className={styles.th} >NewsLetter Email</th>
                                                    <th className={styles.th} >Delete</th>
                                                </thead>
                                                <tbody className={styles.tbody}>
                                                    {
                                                        displayedNewsEmail.length > 0 ? displayedNewsEmail.map((e: any, i: any) => {
                                                            return (
                                                                <tr className={styles.tr} key={i}>
                                                                    {/* <tr> */}
                                                                    <td className={styles.td} >
                                                                        {/* {i} */}
                                                                        {(currentPageNews - 1) * itemsPerPage + i + 1}
                                                                    </td>
                                                                    <td className={styles.td} >{e?.email || 'N/A'}</td>
                                                                    <td className={styles.td} >
                                                                        <button className={styles.del_btn}
                                                                            onClick={() => handleDelete(e?.id, 'Email')}>
                                                                            Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) :
                                                            <tr className={styles.tr}>
                                                                <td colSpan={7} className={styles.td}>Email not found</td>
                                                            </tr>
                                                    }

                                                </tbody>
                                            </table>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.load_main}>
                        <div className={styles.load_div}>
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
            }
        </div>
    )
}

export default All_User