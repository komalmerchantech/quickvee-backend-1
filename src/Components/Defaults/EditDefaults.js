import React, { useState, useEffect, useRef } from "react";
import AddNewCategory from "../../Assests/Taxes/Left.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import axios from "axios";

import Upload from "../../Assests/Category/upload.svg";
import { Link, useParams } from "react-router-dom";
import {  BASE_URL, DEFAULTDATA , EDIT_DEFAULTS } from "../../Constants/Config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditDefaults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const [defaults, setDefaults] = useState({
    name: "",
    type: "",
    image: "", // New property for the image file
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    type: "",
    image: "",
  });


  const params = useParams();
  async function fetchData() {
    const getdefaultsData = {
      id: params.defaultsCode,
    };

    try {
      const response = await axios.post(
        BASE_URL + DEFAULTDATA,
        getdefaultsData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "Success") {
        return response.data.result;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  useEffect(() => {
    // Fetch data when the component mounts
    const fetchDataAndUpdateState = async () => {
      const res = await fetchData();
      if (res) {
        setDefaults({
          id: res[0].id,
          name: res[0].name,
          type: res[0].type,
          image: res[0].media, 
        });
      }
    };

    fetchDataAndUpdateState();
  }, [params.defaultsCode]); 




  const inputChange = (e) => {
    const { name, value } = e.target;
    setDefaults((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleTypeChange = (e) => {
    setDefaults((prevValue) => ({
      ...prevValue,
      type: e.target.value,
    }));

    // Clear error message when user selects a type
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      type: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newFieldErrors = {};

    // Validate name
    if (!defaults.name.trim()) {
      newFieldErrors.name = "Name is required";
      valid = false;
    }

    // Validate type
    if (!defaults.type.trim() || defaults.type === "Select") {
      newFieldErrors.type = "Type is required";
      valid = false;
    }


    // Validate image

    setFieldErrors(newFieldErrors);
    return valid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Form is not valid, do not proceed
      return ;
    }

    const formData = new FormData();
    formData.append("id", defaults.id);
    formData.append("name", defaults.name);
    formData.append("type", defaults.type);

    if (defaults.image && defaults.image.base64) {
      formData.append("image", defaults.image.base64);
      formData.append("filename", defaults.image.file.name);
    }else {
      formData.append("image", "");
      formData.append("filename", "");
    }
    try {
      const res = await axios.post(BASE_URL + EDIT_DEFAULTS, formData, { headers: { "Content-Type": "multipart/form-data" } })

      const data = await res.data.status;
      const update_message = await res.data.msg;
      if (data == "Success") {
        navigate("/defaults");
      } else if (
        data == "Failed" &&
        update_message == "Default Title Already Exist!"
      ) {
        setErrorMessage(update_message);
      } 
    } catch (error) {
      console.error("API Error:", error);
    }



  };

  // Function to prevent default behavior for drag over
  const inputRef = useRef(null);

  const openFileInput = () => {
    inputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    setDefaults((prevValue) => ({
      ...prevValue,
      image: {
        file: null,
        base64: null,
      },
    }));
  };


  const myStyles = {
    display: "flex",
  };

  return (
    <>
      <div className="q-category-main-page ">
        <div className="q-add-categories-section">
          <div className="mt-10">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-header">
                <Link to={`/defaults`}>
                  <span style={myStyles}>
                    <img src={AddNewCategory} alt="Add-New-Category" />
                    <span>Edit Defaults</span>
                  </span>
                </Link>
              </div>
              <div className="q-add-categories-section-middle-form">
              <div className="q-add-categories-single-input">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={defaults.name}
                    onChange={inputChange}
                  />
                </div>
                {errorMessage && (
                  <span className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </span>
                )}
                {fieldErrors.name && (
                  <span className="error-message" style={{ color: "red" }}>
                    {fieldErrors.name}
                  </span>
                )}
                <div className="q-add-categories-single-input mb-5">
                  <label htmlFor="type" className="mb-3">
                    Type
                  </label>
                  <div className="flex-1 mb-2 sm:mb-0 ">
                    <select
                      id="categoryFilter"
                      name="type"
                      value={defaults.type}
                      onChange={handleTypeChange}
                      className="w-full bg-white text-[#000000] text-[18px] Admin_std  px-1 py-3 border border-gray-300 focus:outline-none rounded"
                    >
                      <option> Select</option>
                      <option value="1"> Category</option>
                    </select>
                  </div>
                </div>
                {fieldErrors.type && (
                  <span className="error-message" style={{ color: "red" }}>
                    {fieldErrors.type}
                  </span>
                )}

                <div
                  className={`h-1/2  h-[100px] flex items-center justify-center border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg mt-2 `}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    height: "auto",
                    padding: "10px ",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={openFileInput}
                >
                  {defaults.image && defaults.image.base64 ? (
                    <>
                      <span
                        className="delete-image-icon"
                        onClick={handleDeleteImage}
                        style={{
                          position: "absolute",
                          top: "7px",
                          right: "7px",
                        }}
                      >
                        <img
                          src={DeleteIcon}
                          alt="delete-icon"
                          style={{ width: "40px", height: "40px" }}
                        />
                      </span>
                      <img
                        src={defaults.image.base64}
                        alt="Preview"
                        style={{ width: "100%" }}
                      />
                    </>
                  ) : (
                    <>
                    {defaults.image && defaults.image.length > 0 ? (
                      <div className="flex-column">
                        <img
                          src={`${BASE_URL}upload/defaults_images/${defaults.image}`}
                          alt="Default"
                          style={{ width: "100%" }}
                        />

                      </div>
                    ) : (
                      <div className="flex-column">
                        <img
                          src={Upload}
                          style={{ transform: "translate(2.5rem, 0px)" }}
                          alt="Default"
                        />
                        <span>Default Image</span>
                      </div>
                    )}
                  </>
                  )}
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
                {fieldErrors.image  && !defaults.image &&  (
                  <span className="error-message" style={{ color: "red" }}>
                    {fieldErrors.image}
                  </span>
                )}

              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save" >Save</button>
                <Link to={`/defaults`}>
                  <button className="quic-btn quic-btn-cancle" >Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditDefaults