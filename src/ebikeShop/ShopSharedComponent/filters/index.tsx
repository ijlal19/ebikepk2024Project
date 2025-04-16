"use client";

import { getProductByFilter, getProductCompany } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import styles from "./index.module.scss";

function Filters({ props, mainCategoryData }: any) {
  const [productCompanyData, setProductCompanyData] = useState<any>([]);
  const [filter, setFilter] = useState<any>({ company_filter: [] });
  const [companyData, setCompanyData] = useState<any>([]);
  const [modalOpenFor, setModalOpenFor] = useState("");
  const [popupData, setPopupData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    props?.selectedCategoryId || null
  );

  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    searchParams.get("company")
  );

  useEffect(() => {
    fetchProductCompanies()
  }, []);

  useEffect(() => {
    if (props?.selectedCategoryId) {
      setSelectedCategory(props?.selectedCategoryId);
    }
  }, [props?.selectedCategoryId]);

  const fetchProductCompanies = async () => {
    setIsLoading(true);
    const res = await getProductCompany();
    if (res) {
      setProductCompanyData(res);
      setCompanyData(res);
      setIsLoading(false);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1000);
    }
  };

  const toggle = (from: string) => {
    if (from === "category") {
      setModalOpenFor(from);
      setPopupData(mainCategoryData);
      setOpenModal(true);
    } else if (from === "company") {
      setModalOpenFor(from);
      setPopupData(productCompanyData);
      setOpenModal(true);
    } else if (from === "close") {
      setModalOpenFor("");
      setOpenModal(false);
    }
  };

  const handleCategoryCheck = ({ data }: any) => {
    let urlTitle = "" + data?.name.toLowerCase().replaceAll(" ", "-");
    router.push(`/shop/collection/${urlTitle}/${data?.id}`);
  };

  const getCompanyDataByFilter = (event: any, id: any) => {
    if (event.target.checked) {
      setFilter((prevFilter: any) => {
        const updatedCompanyFilter = [...(prevFilter.company_filter || []), id.toString()];
        const obj = {
          data: {
            amount_filter: "",
            company_filter: updatedCompanyFilter,
            onsell_filter: false
          }
        };
        sendFilterToAPI(obj);
        return {
          ...prevFilter,
          company_filter: updatedCompanyFilter
        };
      });
    } else {
      setFilter((prevFilter: any) => {
        const updatedCompanyFilter = prevFilter.company_filter.filter((item: any) => item !== id.toString());
        const obj = {
          data: {
            amount_filter: "",
            company_filter: updatedCompanyFilter,
            onsell_filter: false
          }
        };
        sendFilterToAPI(obj);
        return {
          ...prevFilter,
          company_filter: updatedCompanyFilter
        };
      });
    }
  };

  const sendFilterToAPI = async (filterObj: any) => {
    try {
      const filterProduct = await getProductByFilter(filterObj);
      console.log("data:", filterProduct);
      if (filterProduct && filterProduct.length > 0) {
        props.setFilteredData(filterProduct)
      } else {
        props.setFilteredData()
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  const submitfilterdata = () => {
    toggle('close');
  }

  return (
    <Box className={styles.filter_box}>
      {!isLoading ? (
        <>
          <Box className={styles.heading_resultby}>
            <Typography> Show Result By: </Typography>
          </Box>

          {/* Category Filter */}
          <Box className={styles.heading_city}>
            <Typography className={styles.city_text}>CATEGORY</Typography>
          </Box>

          <Box className={styles.city_options}>
            {
              mainCategoryData?.map((data: any, i: any) => (
                <Typography className={styles.option_values} key={i}>
                  <input
                    type="radio"
                    checked={selectedCategory === data?.id.toString()}
                    onChange={() => handleCategoryCheck({ data })}
                    id={data.id.toString()}
                    name="category"
                  />
                  {data?.name}
                </Typography>
              ))}
          </Box>

          {/* Company Filter */}
          <Box className={styles.heading_brand}>
            <Typography className={styles.brand_text}> Product Company </Typography>
          </Box>

          <Box className={styles.brand_options}>
            {productCompanyData.slice(0, 5).map((data: any, i: any) => (
              <Typography className={styles.option_values} key={i}>
                <input
                  type="checkbox"
                  id={data.id.toString()}
                  name="company"
                  onChange={(e) => getCompanyDataByFilter(e, data?.id)}
                />
                {data?.name}
              </Typography>
            ))}
            <p onClick={() => toggle("company")} className={styles.seeMore}>
              More Company
            </p>
          </Box>

          {/* Custom Modal for More Options */}
          <Modal open={openModal} onClose={() => toggle("close")}>
            <Box className={styles.Modal_box}>
              <Box className={styles.modal_header}>
                <Typography className={styles.slesctMake_heading}>
                  {modalOpenFor === 'category' ? 'Select Category' : 'Select Company'}
                </Typography>
                <Typography className={styles.close_ICon}>
                  <CloseIcon onClick={() => toggle("close")} />
                </Typography>
              </Box>

              <Box className={styles.modal_content}>
                {
                  popupData.map((data: any, i: any) => {
                    return (
                      <Typography className={styles.option_values} key={i}>
                        <input
                          type={modalOpenFor === "category" ? "radio" : "checkbox"}
                          name={modalOpenFor}
                          value={data?.id}
                          id={data?.id.toString()}
                          checked={
                            modalOpenFor === "category"
                              ? selectedCategory === data?.id.toString()
                              : filter.company_filter.includes(data?.id.toString())
                          }
                          onChange={
                            modalOpenFor === "category"
                              ? () => handleCategoryCheck({ data })
                              : (e) => getCompanyDataByFilter(e, data?.id)
                          }
                        />
                        {data?.name}
                      </Typography>
                    )
                  })
                }
              </Box>

              <Box className={styles.modal_footer}>
                <Button className={styles.btn_submit} onClick={submitfilterdata}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      ) : (
        <div className={styles.load_main}>
          <div className={styles.load_div}>
            <Loader isLoading={isLoading} />
          </div>
        </div>
      )}
    </Box>
  );
}

export default Filters;
