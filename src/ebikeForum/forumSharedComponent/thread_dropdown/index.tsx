import * as React from 'react';
import data from '../../forumPages/home/data';
import styles from './index.module.scss';

function Thread_dropdown({ setMainCatge, setSubCatge }: any) {

  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
    setSubCatge(Number(event.target.value));
  };

  const handleSubcategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMainCatge(Number(event.target.value));
  };

  return (
    <div className={styles.main}>

      <div className={styles.category_main}>
        <select name="category" id="category-select" onChange={handleChange} className={styles.catgegory_select}>
          <option value="" disabled hidden selected className={styles.catgegory_def_opt}>Select Category</option>
          {
            data?.map((e: any, i: any) => {
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
            (data
              .find((e: any) => e.id == selectedCategory)
              ?.sub_category.map((e: any, i: number) => (
                <option key={i} value={e?.id} className={styles.subcatgegory_options}>
                  {e?.name}
                </option>
              ))) :
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