import React, { useEffect} from 'react';
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import {fetchCategoriesData} from "../../Redux/features/Categories/categoriesSlice"
import { useSelector , useDispatch } from 'react-redux';

const CategoryDetail = ({ seVisible }) => {

  const dispatch = useDispatch();
useEffect(() => {
let data= {
  "merchant_id":"MAL0100CA"
}
if(data){
  dispatch(fetchCategoriesData(data))
}

}, [])


  return (
    <>
      <div className='q-category-bottom-detail-section'>
        <div className='q-category-bottom-header-sticky'>
          <div className='q-category-bottom-header'>
            <span>Purchase Order</span>
            <p onClick={() => seVisible("CategoryAlert")}>Add New PO <img src={AddIcon} alt="add-icon" /> </p>
          </div>
          <div className='q-category-bottom-categories-header'>
            <p className='categories-sort' >Sort</p>
            <p className='categories-title' >Title</p>
            <p className='categories-items'>Items</p>
            <p className='categories-enable-disable'>Enable/Disable</p>
          </div>
        </div>
        <div className='q-category-bottom-categories-listing'>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'><img src={AddIcon} alt="add-icon" /></p>
            <p className='categories-title'>Electronics</p>
            <p className='categories-items'>View Items</p>
            <p className='categories-enable-disable'>
              <div className="category-checkmark-div">
                <label className="category-checkmark-label">Online
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
                <label className="category-checkmark-label">Register
                  <input type="checkbox" />
                  <span className="category-checkmark"></span>
                </label>
              </div>
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
        </div>

      </div>

    </>
  )
}

export default CategoryDetail