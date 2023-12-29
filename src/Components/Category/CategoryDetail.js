import React, { useEffect, useState } from 'react';
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import { fetchCategoriesData , deleteCategory } from "../../Redux/features/Categories/categoriesSlice"
import { useSelector, useDispatch } from 'react-redux';
import ViewItemsModal from './ViewItemsModal';
import EditCategoryModal from './EditCategoryModal';

const CategoryDetail = ({ seVisible }) => {
  const [allcategories, setallcategories] = useState([])

  const AllCategoriesDataState = useSelector((state) => state.categories)
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA"
    }
    if (data) {
      dispatch(fetchCategoriesData(data))
    }

  }, [])

  useEffect(() => {
    if (!AllCategoriesDataState.loading && AllCategoriesDataState.categoriesData) {
      setallcategories(AllCategoriesDataState.categoriesData)
    }
  }, [AllCategoriesDataState, AllCategoriesDataState.loading , AllCategoriesDataState.categoriesData])


  const handleDeleteCategory = (id) => {
    const data = {
      id: id
    }
    if(id){
      dispatch(deleteCategory(data))
    }
  }

  // console.log('gdgfdgfdgfdgfdgfdgfd',AllCategoriesDataState)
  return (
    <>
      <div className='q-category-bottom-detail-section'>
        <div className='q-category-bottom-header-sticky'>
          <div className='q-category-bottom-header'>
            <span>Category</span>
            <p onClick={() => seVisible("CategoryAlert")}>Add Category <img src={AddIcon} alt="add-icon" /> </p>
          </div>
          <div className='q-category-bottom-categories-header'>
            <p className='categories-sort' >Sort</p>
            <p className='categories-title' >Title</p>
            <p className='categories-items'>Items</p>
            <p className='categories-enable-disable'>Enable/Disable</p>
          </div>
        </div>
        <div className='q-category-bottom-categories-listing'>
          {
            allcategories && allcategories.length >= 1 && allcategories.map((category, index) => (
              <div key={index} className='q-category-bottom-categories-single-category'>
                <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
                <p className='categories-title'>{category.title}</p>
                <p className='categories-items'>
                  <ViewItemsModal id={category.id} />

                </p>
                <p className='categories-enable-disable'>
                  <div className="category-checkmark-div">
                    <label className="category-checkmark-label">Online
                      <input type="checkbox" checked={category.cat_show_status === "0" || category.cat_show_status === "1" ? true : false} />
                      <span className="category-checkmark"></span>
                    </label>
                    <label className="category-checkmark-label">Register
                      <input type="checkbox" checked={category.cat_show_status === "0" || category.cat_show_status === "2" ? true : false} />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                  <EditCategoryModal />
                  <img  src={DeleteIcon} alt="delete-icon" onClick={() => handleDeleteCategory(category.id)} />
                </p>
              </div>
            ))
          }


        </div>

      </div>

    </>
  )
}

export default CategoryDetail