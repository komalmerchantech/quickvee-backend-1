import React, { useState, useEffect, useRef } from "react";
import AddNewCategory from "../../Assests/Taxes/Left.svg";
import axios from "axios";
import {
  BASE_URL,
  ADD_CATOGRY,
  LIST_ALL_Defaults,
} from "../../Constants/Config";
import Upload from "../../Assests/Category/upload.svg";

import DeleteIcon from "../../Assests/Category/deleteIcon.svg";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxField from "../../reuseableComponents/CheckBoxField";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

const AddCategory = ({ seVisible }) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(null);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const [category, setCategory] = useState({
    title: "",
    description: "",
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    online: 0,
    use_point: 0,
    earn_point: 0,
    image: "",
  });

  const myStyles = {
    display: "flex",
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCategory((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCategory((prevValue) => ({
            ...prevValue,
            image: {
              file: file,
              base64: reader.result,
            },
          }));
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          `${file.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`
        );
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append your tax data
    formData.append("title", category.title);
    formData.append("description", category.description);
    formData.append("merchant_id", category.merchant_id);
    formData.append("use_point", category.use_point);
    formData.append("earn_point", category.earn_point);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("login_type", userTypeData?.login_type);

    if (category.image && category.image.base64) {
      formData.append("online", category.online);
      formData.append("image", category.image.base64);
      formData.append("filename", category.image.file.name);
    } else {
      formData.append("image", "");
      formData.append("filename", "");
    }
    console.log(category);

    try {
      const res = await axios.post(BASE_URL + ADD_CATOGRY, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });

      const data = await res.data.status;
      //console.log(data);
      // alert(data);
      const update_message = await res.data.msg;
      // alert(update_message);
      console.log(update_message);
      if (data == "Success") {
        ToastifyAlert(update_message, "success");
        seVisible("CategoryDetail");
        // alert(update_message)
      } else if (
        data == "Failed" &&
        update_message == "The name is Already exist"
      ) {
        setErrorMessage(update_message);
      } else if (data == "Failed" && update_message == "*Please enter title") {
        setErrorMessage(update_message);
      } else {
        alert(update_message);
        seVisible("CategoryDetail");
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategory((prevValue) => ({
          ...prevValue,
          image: value,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    setCategory((prevValue) => ({
      ...prevValue,
      image: {
        file: null,
        base64: null,
      },
    }));
  };

  // for Default Category list start merchant_id,userTypeData
  const [defaultList, setDefaultList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = {
          merchant_id: merchant_id,
          token_id: userTypeData?.token_id,
          login_type: userTypeData?.login_type,
        };
        const response = await axios.post(BASE_URL + LIST_ALL_Defaults, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userTypeData?.token}`,
          },
        });

        if (response.data.status === "Success") {
          setDefaultList(response.data.result);
        } else if (
          response.data.status === "Failed" &&
          response.data.msg === "No. Data found."
        ) {
          setDefaultList([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // for Default Category list End

  return (
    <>
      <div className="box">
        <div className="q-add-categories-section mb-5">
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="q-add-categories-section-header">
              <span onClick={() => seVisible("CategoryDetail")}>
                <img
                  src={AddNewCategory}
                  alt="Add-New-Category"
                  className="w-6 h-6"
                />
                <span>Add New Category</span>
              </span>
            </div>
            <div className="q-add-categories-section-middle-form">
              <div
                className="q-add-categories-single-input mb-2"
                style={{ position: "relative" }}
              >
                <label for="title">Title</label>
              </div>

              <Autocomplete
                id="size-small-standard"
                size="small"
                options={defaultList}
                freeSolo
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={(newValue) => {
                  console.log(newValue);
                  setCategory((priviousValue) => ({
                    ...priviousValue,
                    title: newValue.target.textContent,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    className="suggestlist_input MuiAutocomplete-option"
                    name="title"
                    value={category.title}
                    onChange={inputChange}
                    style={{}}
                  />
                )}
              />
              {errorMessage && (
                <span className="error-message" style={{ color: "red" }}>
                  {errorMessage}
                </span>
              )}

              <div className="q-add-categories-single-input mt-2">
                <label for="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  value={category.description}
                  onChange={inputChange}
                ></textarea>
              </div>

              <div
                className={`h-[100px] flex items-center justify-center border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg mt-2  defaultDrag_div`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={openFileInput}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  height: "260px",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  overflow: "hidden",
                }}
              >
                {category.image && category.image.base64 ? (
                  <>
                    <span
                      className="delete-image-icon img-DeleteIcon"
                      onClick={handleDeleteImage}
                      style={{
                        position: "absolute",
                        top: "7px",
                        right: "7px",
                      }}
                    >
                      <img src={DeleteIcon} alt="delete-icon" />
                    </span>
                    <img
                      src={category.image.base64}
                      alt="Preview"
                      className="default-img"
                      style={{
                        height: "auto",
                        objectFit: "contain",
                        width: "100%",
                      }}
                    />
                  </>
                ) : (
                  <div className="flex-column">
                    <img
                      src={Upload}
                      style={{ transform: "translate(2.5rem, 0px)" }}
                      alt="Default"
                    />
                    <span style={{ color: "#6A6A6A" }}>Category Image</span>
                  </div>
                )}
                <div className="q-add-categories-single-input">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    ref={inputRef}
                    className="default-img-inputfield"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="row py-3" style={myStyles}>
                <div className="add-category-checkmark-div">
                  <label className="add-category-checkmark-label mt-2">
                    Show Online ?
                    <CheckBoxField
                      checked={category.online === 1}
                      onChangeFun={setCategory}
                      categoryType={"online"}
                    />
                  </label>
                </div>
                <div className="add-category-checkmark-div">
                  <label className="add-category-checkmark-label mt-2">
                    Use Loyalty Point ?
                    <CheckBoxField
                      checked={category.use_point === 1}
                      onChangeFun={setCategory}
                      categoryType={"use_point"}
                    />
                  </label>
                </div>
                <div className="add-category-checkmark-div">
                  <label className="add-category-checkmark-label mt-2">
                    Earn Loyalty Point ?
                    <CheckBoxField
                      checked={category.earn_point === 1}
                      onChangeFun={setCategory}
                      categoryType={"earn_point"}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="q-add-categories-section-middle-footer">
              <button className="quic-btn quic-btn-save">Add</button>
              <button
                onClick={() => seVisible("CategoryDetail")}
                className="quic-btn quic-btn-cancle"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
