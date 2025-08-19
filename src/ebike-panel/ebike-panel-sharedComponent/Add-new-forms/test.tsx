
// ///////////////////////////////////////////////////////// ADD NEW Brand
// const AddBrandForm = () => {
//     const [selectedImages, setSelectedImages] = useState<string[]>([]);
//     const [imageFiles, setImageFiles] = useState<File[]>([]);
//     const [selectedBrandId, setSelectedBrandId] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     const [imageArr, setImageArr] = useState([])
//     const [BrandData, setBrandData] = useState<any>({
//         authorname: '',
//         BrandTitle: '',
//         BrandUrl: '',
//         Brandhtml: '',
//         Brandtext: '',
//         focus_keyword: '',
//         meta_description: '',
//         meta_title: '',
//     });

//     let router = useRouter()

//     const handleInputChange = (e: any) => {
//         const { name, value } = e.target;
//         setBrandData((prev: any) => ({ ...prev, [name]: value }));
//     };

//     const handleImageDelete = (index: number) => {
//         const updatedImages = imageArr.filter((_, i) => i !== index);
//         const updatedFiles = imageFiles.filter((_, i) => i !== index);
//         setImageArr(updatedImages);
//         setImageFiles(updatedFiles);
//     };


//     function uploadImage(event: any) {
//         setIsLoading(true)
//         const reader = new FileReader()
//         reader.readAsDataURL(event.target.files[0])

//         reader.onload = (event: any) => {

//             const imgElement: any = document.createElement("img");
//             imgElement.src = reader.result;

//             imgElement.onload = async (e: any) => {

//                 const canvas = document.createElement("canvas");
//                 const max_width = 600;

//                 const scaleSize = max_width / e.target.width;
//                 canvas.width = max_width;
//                 canvas.height = e.target.height * scaleSize;

//                 const ctx: any = canvas.getContext("2d")
//                 ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

//                 const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg")
//                 let obj = { file: srcEncoded, upload_preset: 'bw6dfrc7', folder: 'used_bikes' }

//                 let imgRes: any = await uplaodImageFunc(obj)

//                 let _imageArr: any = [...imageArr]
//                 _imageArr.push(imgRes.secure_url)
//                 setImageArr(_imageArr)
//             }

//         }
//     }

//     const handleBrandChange = (e: any) => {
//         setSelectedBrandId(e.target.value);
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         if (!BrandData.BrandTitle || BrandData.BrandTitle.length < 2) {
//             alert("Please add a valid title (min 2 characters)");
//             return;
//         }
//         else if (!BrandData.authorname || BrandData.authorname.length < 2) {
//             alert("Please add a valid author name (min 2 characters)");
//             return;
//         }
//         else if (!BrandData.Brandhtml || BrandData.Brandhtml.length < 10) {
//             alert("Please enter a valid Brand description (min 10 characters)");
//             return;
//         }
//         else if (!imageArr || imageArr.length === 0) {
//             alert("Please select at least one image!");
//             return;
//         }
//         else if (!selectedBrandId) {
//             alert("Please select a Brand category");
//             return;
//         }

//         const userCookie = jsCookie.get("userData_ebike_panel");
//         const userData = JSON.parse(userCookie);
//         const UserId = userData?.uid;

//         console.log("User ID:", UserId);

//         const imagesString = imageArr.join(' #$# ');
//         const finalBikeData = {
//             BrandCategoryId: Number(selectedBrandId),
//             ...BrandData,
//             uid: UserId || null,
//             featuredImage: imagesString
//         }

//         const res = await addNewBrand(finalBikeData);
//         if (res?.success && res.info === "add Brand success") {
//             router.push('/ebike-panel/dashboard/Brand-list');
//         } else {
//             alert('Something went wrong!');
//         }
//     };

//     const goBack = () => {
//         router.push('/ebike-panel/dashboard/Brand-list')
//     }

//     return (
//         <div className={styles.main_box}>
//             <form onSubmit={handleSubmit} className={styles.main}>
//                 <div className={styles.formHeader}>
//                     <p className={styles.a} onClick={goBack} ><ArrowBackIosIcon className={styles.icon} /></p>
//                     <p className={styles.heading}>Add New Brand</p>
//                 </div>

//                 <label htmlFor="BrandTitle" className={styles.label}>Title</label>
//                 <input id="BrandTitle" name="BrandTitle" value={BrandData.BrandTitle} onChange={handleInputChange} className={styles.input} />

//                 <label htmlFor="authorname" className={styles.label}>Author Name</label>
//                 <input id="authorname" name="authorname" value={BrandData.authorname} onChange={handleInputChange} className={styles.input} />

//                 <label htmlFor="Brandhtml" className={styles.label}>Description</label>
//                 <FloaraTextArea
//                     value={BrandData.description}
//                     onChange={(desc: any) => setBrandData((prev: any) => ({ ...prev, Brandhtml: desc }))}
//                 />

//                 {imageArr.length < 4 ?
//                     <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} className={styles.fileInput} />
//                     :""}

//                 <label className={styles.label}>Images (max 4)</label>
//                 <div className={styles.imagePreview}>
//                     {imageArr.map((img, index) => (
//                         <div key={index}>
//                             <img src={img} alt={`Preview ${index}`} style={{ width: '100%', height: "100%" }} />
//                             <button type="button" onClick={() => handleImageDelete(index)}>×</button>
//                         </div>
//                     ))}
//                 </div>

//                 <div className={styles.drop_downBox}>
//                     <select name="" id="" className={styles.selected} onChange={handleBrandChange}>
//                         <option value="" disabled selected hidden>Select Category</option>
//                         {
//                             BrandCategory.map((e: any, index) => (
//                                 <option key={index} value={e?.id} className={styles.options} style={{ fontSize: '16px' }}>
//                                     {e?.categoryName}
//                                 </option>
//                             ))
//                         }
//                     </select>
//                 </div>

//                 <label htmlFor="meta_title" className={styles.label}>Meta Title</label>
//                 <textarea id="meta_title" name="meta_title" value={BrandData.meta_title} onChange={handleInputChange} className={styles.textarea} />
//                 <label htmlFor="meta_description" className={styles.label}>Meta Description</label>
//                 <textarea id="meta_description" name="meta_description" value={BrandData.meta_description} onChange={handleInputChange} className={styles.textarea} />
//                 <label htmlFor="focus_keyword" className={styles.label}>Focus Keyword</label>
//                 <textarea id="focus_keyword" name="focus_keyword" value={BrandData.focus_keyword} onChange={handleInputChange} className={styles.textarea} />

//                 <button type="submit" className={styles.button}>Add Brand</button>
//             </form>
//         </div>
//     );
// }
