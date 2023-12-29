import React, { useState, useEffect } from "react";

import { Box, Button, Modal } from "@mui/material";
import AddIcon from "../../../../Assests/Category/addIcon.svg";
import LeftIcon from "../../../../Assests/Taxes/Left.svg";
import axios from "axios";
import { fetchtaxesData } from "../../../../Redux/features/Taxes/taxesSlice";
import { useDispatch } from "react-redux";

const AddTaxesModal = () => {
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
  const width = {
    width: "8.5rem",
  };

  const [taxes, setTaxes] = useState({
    title: "",
    percent: "",
    merchant_id: "MAL0100CA",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;

    setTaxes((preValue) => {
      return {
        ...preValue,
        // [name]: value,
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

    try {
      const res = await axios.post(
        "https://sandbox.quickvee.com/taxesapi/add_Tax",
        taxes,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const data = await res.data.status;
      const update_message = await res.data.msg;
      // console.log(update_message)
      // alert(update_message);
      if (data == "Success") {
        // alert(update_message);
        let data = {
          merchant_id: "MAL0100CA",
        };
        if (data) {
          dispatch(fetchtaxesData(data));
        }
        setTaxes({
          title: "",
          percent: "",
          merchant_id: "MAL0100CA",
        });

        handleClose();
      } else if (
        data == "Failed" &&
        update_message == "DefaultTax Taxes Already Exist"
      ) {
        setErrorMessage("*The name is already exist");
      } else if (data == "Failed" && update_message == "*Please enter Title") {
        setErrorMessage(update_message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <div
        className="flex justify-evenly categories-items categories-items-btn"
        onClick={handleOpen}
      >
        <p className="mr-2">Add Tax</p>
        <span className="categories-items categories-items-btn">
          <img src={AddIcon} alt="edit-icon" />{" "}
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
          <div className="q-add-categories-section-header " style={width}>
            <span onClick={() => handleClose()}>
              <img src={LeftIcon} alt="Add-New-Category" />
              <span>Add Tax</span>
            </span>
          </div>

          {/* </div> */}
          <div className="view-category-item-modal-header">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-categories-single-input">
                  <label for="title">Title</label>

                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={inputChange}
                    value={taxes.title}
                  />
                </div>
                {errorMessage && (
                  <span className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </span>
                )}

                <div className="q-add-categories-single-input">
                  <label for="Percentage">Percentage</label>

                  {/* <input type="text" id="percent"  maxlength="5" min="0.00" max="99.99" pattern="[0-9].*" name="percent" value={taxes.percent}   onChange={inputChange}  /> */}

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
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Save</button>

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

export default AddTaxesModal;
