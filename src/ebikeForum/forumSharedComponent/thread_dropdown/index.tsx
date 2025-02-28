import * as React from 'react';
import styles from './index.module.scss';
import { getMainCategory } from '@/ebikeForum/forumFunction/globalFuntions';

function Thread_dropdown({ setMainCatge, setSubCatgeId }: any) {

  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);
  const [mainCategoryData, setMainCategoryData] = React.useState([])
  const [subCategoryData, setSubCategoryData] = React.useState<any>()

  React.useEffect(() => {
    fetchMainCategory()
  }, [])

  const fetchMainCategory = async () => {
    const main_category = await getMainCategory()
    setMainCategoryData(main_category?.data)
    console.log("popo", main_category?.data[0].subCategories)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000);
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
    setMainCatge(Number(event.target.value));
    const subdata = mainCategoryData.find((e: any) => e.id == event.target.value)
    setSubCategoryData(subdata);
  };

  const handleSubcategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubCatgeId(Number(event.target.value));
  };

  return (
    <div className={styles.main}>

      <div className={styles.category_main}>
        <select name="category" id="category-select" onChange={handleChange} className={styles.catgegory_select}>
          <option value="" disabled hidden selected className={styles.catgegory_def_opt}>Select Category</option>
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
        <select name="sub-category" id="sub-category-select" className={styles.subcatgegory_select} onChange={handleSubcategory}>
          <option value="" disabled hidden selected className={styles.subcatgegory_def_opt}>
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