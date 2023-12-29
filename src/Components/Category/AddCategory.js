import React from 'react';
import AddNewCategory from "../../Assests/Category/addIcon.svg"

const AddCategory = ({ seVisible }) => {
  return (
    <div className='q-add-categories-section'>
      <div className='q-add-categories-section-header'>
        <span onClick={() => seVisible("CategoryDetail")}>
          <img src={AddNewCategory} alt="Add-New-Category" />
          <span>Add New Category</span>
        </span>
      </div>
      <div className='q-add-categories-section-middle-form'>
        <div className='q-add-categories-single-input'>
          <label for="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>

        <div className='q-add-categories-single-input'>
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="4" cols="50">
          </textarea>
        </div>
        <div className="add-category-checkmark-div">
          <label className="add-category-checkmark-label">Show Online ?
            <input type="checkbox" />
            <span className="add-category-checkmark"></span>
          </label>

        </div>
      </div>

      <div className='q-add-categories-section-middle-footer'>
        <button className='quic-btn quic-btn-save'>
          Add
        </button>
        <button onClick={() => seVisible("CategoryDetail")} className='quic-btn quic-btn-cancle'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddCategory