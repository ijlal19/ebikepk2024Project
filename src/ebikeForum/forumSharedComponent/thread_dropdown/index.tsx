import * as React from 'react';
import styles from './index.module.scss';
import { getMainCategory } from '@/ebikeForum/forumFunction/globalFuntions';

function Thread_dropdown({ setMainCatge = () => { }, setSubCatgeId }: any) {

  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<string>("");
  const [mainCategoryData, setMainCategoryData] = React.useState<any[]>([])
  const [subCategoryData, setSubCategoryData] = React.useState<any>(null)

  React.useEffect(() => {
    fetchMainCategory()
  }, [])

  const fetchMainCategory = async () => {
    const main_category = await getMainCategory()
    setMainCategoryData(Array.isArray(main_category?.data) ? main_category.data : [])
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMainId = event.target.value;
    setSelectedCategory(selectedMainId);
    setMainCatge(Number(selectedMainId));
    const subdata = mainCategoryData.find((e: any) => e.id == event.target.value)
    setSubCategoryData(subdata);
    setSelectedSubCategory("");
    setSubCatgeId("");
  };

  const handleSubcategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubId = event.target.value;
    setSelectedSubCategory(selectedSubId);
    setSubCatgeId(Number(selectedSubId));
  };

  return (
    <div className={styles.main}>

      <div className={styles.category_main}>
        <select name="category" id="category-select" value={selectedCategory} onChange={handleChange} className={styles.catgegory_select}>
          <option value="" disabled className={styles.catgegory_def_opt}>Select Category</option>
          {
            mainCategoryData?.map((e: any, i: any) => {
              return (
                <option key={i} value={e?.id} className={styles.catgegory_options}>{e?.name}</option>
              )
            })
          }
        </select>
      </div>

      <div className={styles.subcatgegory}>
        <select name="sub-category" id="sub-category-select" value={selectedSubCategory} className={styles.subcatgegory_select} onChange={handleSubcategory}>
          <option value="" disabled className={styles.subcatgegory_def_opt}>
            Select Subcategory
          </option>
          {selectedCategory ?
            subCategoryData?.subCategories?.map((e: any, i: number) => (
              <option key={i} value={e?.id} className={styles.subcatgegory_options}>
                {e?.name}
              </option>
            )) :
            <option value='' disabled className={styles.subcatgegory_options}>
              Select a category first to see subcategories.
            </option>
          }
        </select>
      </div>

    </div>

  );
}

export default Thread_dropdown
