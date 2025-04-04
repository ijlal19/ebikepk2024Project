"use client";
import { getProductCompany } from "@/ebikeShop/Shopfunctions/globalFuntions";
import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.scss";
import MoreOptionPopup from "./Popup";

function Filters({ mainCategoryData ,selectedCategoryId}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [popupData, setPopupData]: any = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalOpenFor, setModalOpenFor] = useState("");
  const [productCompanyData, setProductCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(selectedCategoryId || null);
const [selectedCompany, setSelectedCompany] = useState<string | null>(searchParams.get("company"));

  useEffect(() => {
    fetchProductCompanies();
  }, []);
  
  useEffect(() => {
    // ✅ Update selected category when params change
    if (selectedCategoryId) {
      setSelectedCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);


  const fetchProductCompanies = async () => {
    setIsLoading(true);
    const res = await getProductCompany();
    if (res) {
      setProductCompanyData(res);
      setIsLoading(false);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1000);
    }
  };

  const ModalData = {
    showmodal: toggle,
    openmodal: openModal,
    popupdata: popupData,
  };

  function toggle(from: any) {
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
  }
  const handleCategoryCheck = ({data}: any) => {
    console.log("data" , data)
    let urlTitle = '' + data?.name.toLowerCase().replaceAll(' ', '-')
    router.push(`/shop/${urlTitle}/${data?.id}`);
  };


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
                  onChange={() => handleCategoryCheck({data})}
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
                  type="radio"
                  checked={selectedCompany === data.id.toString()}
                  // onChange={() => handleCompanyCheck(data)}
                  id={data.id.toString()}
                  name="company"
                />
                {data?.name}
              </Typography>
            ))}
            <p onClick={() => toggle("company")} className={styles.seeMore}>
              More Company
            </p>
          </Box>

          <Loader isLoading={isLoading} />

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




// "use client";
// import { getProductCompany } from "@/ebikeShop/Shopfunctions/globalFuntions";
// import Loader from "@/ebikeWeb/sharedComponents/loader/loader";
// import { Box, Typography } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./index.module.scss";
// import MoreOptionPopup from "./Popup";

// function Filters({ mainCategoryData, selectedCategoryId }: any) {
//   const router = useRouter();
//   const [popupData, setPopupData]: any = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [modalOpenFor, setModalOpenFor] = useState("");
//   const [productCompanyData, setProductCompanyData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ Set selected category from params initially
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(selectedCategoryId || null);

//   useEffect(() => {
//     fetchProductCompanies();
//   }, []);

//   useEffect(() => {
//     // ✅ Update selected category when params change
//     if (selectedCategoryId) {
//       setSelectedCategory(selectedCategoryId);
//     }
//   }, [selectedCategoryId]);

//   const fetchProductCompanies = async () => {
//     setIsLoading(true);
//     const res = await getProductCompany();
//     if (res) {
//       setProductCompanyData(res);
//       setIsLoading(false);
//       setTimeout(() => {
//         window.scrollTo(0, 0);
//       }, 1000);
//     }
//   };

//   const ModalData = {
//     showmodal: toggle,
//     openmodal: openModal,
//     popupdata: popupData,
//   };

//   function toggle(from: any) {
//     if (from === "category") {
//       setModalOpenFor(from);
//       setOpenModal(true);
//     } else if (from === "company") {
//       setModalOpenFor(from);
//       setPopupData(productCompanyData);
//       setOpenModal(true);
//     } else if (from === "close") {
//       setModalOpenFor("");
//       setOpenModal(false);
//     }
//   }

//   // ✅ Handle Category Selection & Navigate
//   const handleCategoryCheck = ({data}: any) => {
//         console.log("data" , data)
//         let urlTitle = '' + data?.name.toLowerCase().replaceAll(' ', '-')
//         // setSelectedCategory(data?.id);
//         router.push(`/shop/${urlTitle}/${data?.id}`);
//       };

//   return (
//     <Box className={styles.filter_box}>
//       {!isLoading ? (
//         <>
//           <Box className={styles.heading_resultby}>
//             <Typography> Show Result By: </Typography>
//           </Box>

//           {/* Category Filter */}
//           <Box className={styles.heading_city}>
//             <Typography className={styles.city_text}>CATEGORY</Typography>
//           </Box>
//           <Box className={styles.city_options}>
//             {mainCategoryData?.map((data: any, i: any) => (
//               <Typography className={styles.option_values} key={i}>
//                 <input
//                   type="radio"
//                   checked={selectedCategory === data.id.toString()} // ✅ Preselect from params
//                   onChange={() => handleCategoryCheck({data})}
//                   id={data.id.toString()}
//                   name="category"
//                 />
//                 {data?.name}
//               </Typography>
//             ))}
//           </Box>

//           <Loader isLoading={isLoading} />
//         </>
//       ) : (
//         <div className={styles.load_main}>
//           <div className={styles.load_div}>
//             <Loader isLoading={isLoading} />
//           </div>
//         </div>
//       )}
//     </Box>
//   );
// }

// export default Filters;
