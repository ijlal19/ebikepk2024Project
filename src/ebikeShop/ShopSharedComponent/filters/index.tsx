"use client";
import { getProductByFilter, getProductCompany } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import MoreOptionPopup from "./Popup";

// function Filters({ mainCategoryData, selectedCategoryId }: any) {
function Filters({ props, mainCategoryData }: any) {

  const [productCompanyData, setProductCompanyData] = useState<any>([]);
  const [filter, setFilter] = useState<any>({ company_filter: [] });
  const [companyData, setCompanyData] = useState<any>([]);
  const [modalOpenFor, setModalOpenFor] = useState("");
  const [filteredData, setFilteredData] = useState([]);
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

  const ModalData = {
    showmodal: toggle,
    openmodal: openModal,
    popupdata: popupData,
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
          data:
          {
            amount_filter: "",
            company_filter: updatedCompanyFilter,
            onsell_filter: false
          }
        }
        // console.log("data" , obj)
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
          data:
          {
            amount_filter: "",
            company_filter: updatedCompanyFilter,
            onsell_filter: false
          }
        }
        // console.log("data" , obj)
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
      }

      else {
        props.setFilteredData()
      }
    }
    catch (error) {
      console.error("API Error:", error);
    }
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

          {/* Popup Modal */}
          {openModal && (
            <MoreOptionPopup
              getCompanyDataByFilter={(e: any, id: any) => getCompanyDataByFilter(e, id)}
              modalData={ModalData}
              from={modalOpenFor === "category" ? "category" : "company"}
              filterdData={modalOpenFor === "category" ? selectedCategory : selectedCompany}
            />
          )}
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