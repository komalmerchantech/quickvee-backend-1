import React from 'react'

const  EditDefaults = () => {
  return (
    <>
        <div className="q-category-main-page ">
        <div className="q-add-categories-section">
          <div className="mt-10">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-header">
                <span onClick={() => seVisible("DefaultsDetail")}>
                  <img src={AddNewCategory} alt="Add-New-Category" />
                  <span>Add New Defaults</span>
                </span>
              </div>
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-categories-single-input">
                  <label for="name">Name</label>
                  <input type="text" name="name" />
                </div>
                <div className="q-add-categories-single-input">
                  <label for="type" className="mb-3">
                    Type
                  </label>
                  <div className="flex-1 mb-2 sm:mb-0 sm:mr-2">
                    <select
                      id="categoryFilter"
                      className="w-full bg-white text-[#000000] text-[18px] Admin_std px-4 py-2 border border-gray-300 focus:outline-none rounded"
                    >
                      <option> Select</option>
                      <option value="1"> Category</option>
                    </select>
                  </div>

                </div>
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Add</button>
                <button
                  onClick={() => seVisible("DefaultsDetail")}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditDefaults