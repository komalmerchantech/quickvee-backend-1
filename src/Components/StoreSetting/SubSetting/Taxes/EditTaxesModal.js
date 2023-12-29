import React, { useState, useEffect } from "react";

import { Box, Button, Modal } from "@mui/material";
import EditIcon from "../../../../Assests/Category/editIcon.svg";
import LeftIcon from "../../../../Assests/Taxes/Left.svg";
import { fetchtaxesData  } from "../../../../Redux/features/Taxes/taxesSlice"
import { useDispatch } from "react-redux";
import axios from "axios";
import { Form } from "react-bootstrap";


const EditTaxesModal = ({ selectedTaxe }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const myStyles = {
    width: "50rem",
    transform: "translate(25rem, 4.5rem)",
    maxHeight: "85vh", 
    overflowY: "auto",  
  };
  const width ={
    width :"8.5rem"
  };


  const mycur = {
    cursor: "pointer",
    width: "fit-content"
  }

  useEffect(() => {
    if (selectedTaxe) {
      setTaxes({
        collID: selectedTaxe.id,
        title: selectedTaxe.title,
        percent: selectedTaxe.percent,
        merchant_id: selectedTaxe.merchant_id,
      });
    }
  }, [selectedTaxe]);

  const [taxes, setTaxes] = useState({
    collID: "",
    title: "",
    percent: "",
    merchant_id: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setTaxes((preValue) => {
      return {
        ...preValue,
        [name]: name === "percent" ? formatPercent(value) : value,
      };
    });
  };

  const formatPercent = (value) => {
    if (value.match(/^\d{0,2}$/)) {
      return value;
    } else if (value.match(/^\d{3,}$/)) {
      return value.slice(0, 2) + "." + value.slice(2);
    } else if (value.match(/^\d{0,2}\.\d{0,2}$/)) {
      return value;
    }
  };
  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9.]+$/;

    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Assuming you have the selected category ID stored in selectedCategory state
    const categoryId = selectedCategory;
    // console.log(categoryId);
  
    if (applyToCategory && categoryId) {
      const formData = new FormData();
  
      // Append your tax data
      formData.append("collID", taxes.collID);
      formData.append("title", taxes.title);
      formData.append("percent", taxes.percent);
      formData.append("merchant_id", taxes.merchant_id);
  
      // Append additional data for applying tax to a category
      formData.append("applytaxtocat", applyToCategory ? 1 : 0);
      formData.append("taxchoice", updateTax ? 1 : 0); // 1 for updating tax, 0 for additional tax
      formData.append("cate_id", categoryId);

      try {
        // Make your API request with axios
        const response = await axios.post("https://sandbox.quickvee.com/taxesapi/update_Tax", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        // Handle the response as needed
        const update_message = response.data.status
        const msg = response.data.msg
        console.log(update_message);
        if(update_message == "Success"){
          // alert(msg)
          let data = {
            merchant_id: "MAL0100CA",
          };
          if (data) {
            dispatch(fetchtaxesData(data));
          }
          handleClose();
        }else if(update_message == "Failed" && msg == "*Please enter Title"){
          setErrorMessage(msg);
        }else if(update_message == "Failed" && msg == "Taxes Already Exist"){
          setErrorMessage(msg);
        }

      
  
        // Close the modal or perform any other actions
        handleClose();
      } catch (error) {
        console.error("Error submitting data:", error);
        // Handle errors as needed
      }
    } else {
      // Handle case when applyToCategory is false or categoryId is not selected
      // setErrorMessage("Please select a category and choose a tax option.");

      const formData = new FormData();
  
      // Append your tax data
      formData.append("collID", taxes.collID);
      formData.append("title", taxes.title);
      formData.append("percent", taxes.percent);
      formData.append("merchant_id", taxes.merchant_id);


      try {
        // Make your API request with axios
        const response = await axios.post("https://sandbox.quickvee.com/taxesapi/update_Tax", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        // Handle the response as needed
        const update_message = response.data.status
        const msg = response.data.msg
        console.log(update_message);
        if(update_message == "Success"){
          // alert(msg)
          let data = {
            merchant_id: "MAL0100CA",
          };
          if (data) {
            dispatch(fetchtaxesData(data));
          }
          handleClose();
        }else if(update_message == "Failed" && msg == "*Please enter Title"){
          setErrorMessage(msg);
        }else if(update_message == "Failed" && msg == "Taxes Already Exist"){
          setErrorMessage(msg);
        }
  
        // Close the modal or perform any other actions
     
      } catch (error) {
        console.error("Error submitting data:", error);
        // Handle errors as needed
      }

    }
  };



   // for Apply tax to category
   const [applyToCategory, setApplyToCategory] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [additionalTax, setAdditionalTax] = useState(false);
   const [updateTax, setUpdateTax] = useState(false);
 
   const [categoryOptions, setCategoryOptions] = useState([]);
   const [loadingCategories, setLoadingCategories] = useState(true);
 
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://sandbox.quickvee.com/Taxesapi/Taxes_category_list",
          {
            merchant_id: "MAL0100CA",
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Assuming the API response has a data property containing the category list
        const categoryList = response.data.result;

        // Extracting category IDs and view titles
        const mappedOptions = categoryList.map((category) => ({
          id: category.id,
          title: category.title,
        }));

        setCategoryOptions(mappedOptions);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []); // Fetch categories only once when the component mounts

  return (
    <div>
      <div className="flex justify-evenly categories-items categories-items-btn" onClick={handleOpen}>
        <span  className="categories-items categories-items-btn"     >
        <img src={EditIcon} alt="edit-icon" />{" "}
      </span>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="view-category-item-modal" style={myStyles}>
          {/* <div className='view-category-item-modal-header'> */}
          <div className="q-add-categories-section-header" style={width}>
            <span onClick={() => handleClose()}>
              <img src={LeftIcon} alt="Add-New-Category" />
              <span>Edit Tax</span>
            </span>
          </div>

          {/* </div> */}
          <div className="view-category-item-modal-header">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-middle-form">
                
               

                {
                  taxes.title === 'DefaultTax' ? (
                    <>
                    <div className="q-add-categories-single-input">
                  <label for="title">Title</label>

                  <input type="text" id="title" name="title" value={taxes.title} disabled />
                </div>
                {errorMessage && (
                  <span className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </span>
                )}

                    </>
                  ) : (
                    <>
                    <div className="q-add-categories-single-input">
                  <label for="title">Title</label>

                  <input type="text" id="title" onChange={inputChange} name="title" value={taxes.title} />
                </div>
                 {errorMessage && (
                  <span className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </span>
                )}
                    </>
                  )
                }

                <div className="q-add-categories-single-input">
                  <label for="Percentage">Percentage</label>

                  <input
                    type="text"
                    id="percent"
                    maxlength="5"
                    min="0.00"
                    max="99.99"
                    name="percent"
                    value={taxes.percent}
                    placeholder="00.00"
                    onChange={inputChange}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <div className="category-checkmark-div m-2">
                  <label className="category-checkmark-label">
                    Apply tax to category
                    <input
                      type="checkbox"
                      id="applytaxtocat"
                      name="applytaxtocat"
                      checked={applyToCategory}
                      onChange={() => setApplyToCategory(!applyToCategory)}
                    />
                    <span className="category-checkmark"></span>
                  </label>
                </div>

                {applyToCategory && (
                  <>
                    <div className="q-add-categories-single-input mt-2">
                      {loadingCategories ? (
                        <p>Loading categories...</p>
                      ) : (
                        <div className="q-add-categories-single-input">
                          <div className="flex-1 mb-2 sm:mb-0 sm:mr-2">
                            <select
                              id="categoryFilter"
                              className="w-full bg-white text-[#000000] text-[18px] Admin_std px-4 py-2 border border-gray-300 focus:outline-none rounded"
                              onChange={(e)=>setSelectedCategory( e.target.value)}
                            >
                              <option> Select Category</option>
                              {categoryOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="q-add-categories-single-input m-3">
                      <Form.Check className="checkradio m-1">
                        <Form.Check.Input type="radio" name="taxchoice" value="0" checked style={mycur}/>
                        <Form.Check.Label className="pl-2">
                          Apply additional tax to the chosen category?
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="checkradio m-1">
                        <Form.Check.Input type="radio" name="taxchoice" value="1" style={mycur}/>
                        <Form.Check.Label className="pl-2">
                          Update the tax for the chosen category?
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  </>
                )}





              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Update</button>

                <button
                  onClick={() => handleClose()}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTaxesModal;
