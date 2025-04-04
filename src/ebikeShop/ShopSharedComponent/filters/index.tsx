"use client";
import { getProductCompany } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import MoreOptionPopup from "./Popup";

interface FiltersProps {
  mainCategoryData: any[];
  selectedCategoryId: string | null;
}

interface FilterState {
  company_filter: string[];
}

function Filters({ mainCategoryData, selectedCategoryId }: any) {

  const [productCompanyData, setProductCompanyData] = useState<any>([]);
  const [filter, setFilter] = useState<any>({ company_filter: [] });
  const [companyData, setCompanyData] = useState<any>([]);
  const [modalOpenFor, setModalOpenFor] = useState("");
  const [popupData, setPopupData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();


  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    selectedCategoryId || null
  );


  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    searchParams.get("company")
  );


  useEffect(() => {
    fetchProductCompanies()
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

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
    router.push(`/shop/${urlTitle}/${data?.id}`);
  };

  const getCompanyDataByFilter = async (event: any,id:any) => {

    if (event.target.checked) {
      const updatedFilter = {
        ...filter,
        company_filter: [...filter.company_filter, id],
      };

      setFilter(updatedFilter);
      console.log("err" , updatedFilter)

      try {

        const response = await fetch("https://ebikepk-server-nodejs.herokuapp.com/api/shop/product/get-product-by-Filter", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ data: updatedFilter })
        })

        const json = await response.json();
        console.log("err" , json)
        if (json.length) {
          setProductCompanyData(json);
        }

      }
      catch (err) {
        console.log("err" , err)
      }

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
            {mainCategoryData?.map((data: any, i: any) => (
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
                  checked={selectedCompany == data?.id.toString()}
                  id={data.id.toString()}
                  name="company"
                  onChange={(e) => getCompanyDataByFilter(e,data?.id)}
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