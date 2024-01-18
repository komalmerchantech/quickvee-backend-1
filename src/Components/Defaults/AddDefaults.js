import React, { useState, useRef } from "react";
import AddNewCategory from "../../Assests/Category/addIcon.svg";

import Upload from "../../Assests/Category/upload.svg";

const AddDefaults = ({ seVisible }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const [defaults, setDefaults] = useState({
      name: "",
      type: "",
      image: "", // New property for the image file
    });
    const inputChange = (e) => {
        const { name, value } = e.target;
        setDefaults((preValue) => {
          return {
            ...preValue,
            [name]: value,
          };
        });
      };


  const handleSubmit = (e) => {
    e.preventDefault();
  };


    // Function to prevent default behavior for drag over
    const inputRef = useRef(null);

    const openFileInput = () => {
      inputRef.current.click();
    };
  
    const handleDragOver = (event) => {
      event.preventDefault()
    }
  
    // Function to handle image drop
    const handleDrop = (event) => {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setDefaults((prevValue) => ({
            ...prevValue,
            image: {
              file: file,
              base64: reader.result,
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // const base64String = reader.result.split(',')[1];
        setDefaults((prevValue) => ({
          ...prevValue,
          image: {
            file: file,
            base64: reader.result,
          },
        }));
        // console.log('Base64 Path:', `data:image/png;base64,${base64String}`);
      };
      reader.readAsDataURL(file);
    }
  };

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
                  <input type="text" name="name"  value={defaults.name}
              onChange={inputChange} />
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

                <div
                  className={`h-1/2 w-full h-[100px] flex items-center justify-center border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg mt-2 `}
                  style={{ cursor: "pointer" }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={openFileInput}
                >
                  <div className="flex-column ">
                    <img
                      src={Upload}
                      style={{ transform: "translate(2.5rem, 0px)" }}
                      alt="Default Image"
                    />
                    <span>Default Image</span>
                  </div>

                  <div className="q-add-categories-single-input">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      ref={inputRef}
                      style={{ display: "none", width: "100%" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {defaults.image && defaults.image.base64 && (
                  <div className="image-preview">
                    <img src={defaults.image.base64} alt="Preview" />
                  </div>
                )}
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
  );
};

export default AddDefaults;
