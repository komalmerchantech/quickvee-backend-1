import React, { useState,useCallback } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import CustomeDateTime from "./CustomeDateTime";
import axios from "axios";
import { BASE_URL, COUPON_TITLE_CHECK } from "../../Constants/Config";
import _ from 'lodash';
import Switch from '@mui/material/Switch';

const AddCoupon = ({ seVisible }) => {
  const [activeTab, setActiveTab] = useState("amount");

  const [couponStates, setCouponStates] = useState({
    online: false,
    enable_limit: false
  });

  const handleCheckboxChange = (couponName) => (e) => {
    setCouponStates({
      ...couponStates,
      [couponName]: e.target.checked ? 1 : 0,
    });
  };


  const [inputValue, setInputValue] = useState('');
  const [isUnique, setIsUnique] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to check uniqueness in the database
  const checkUniqueness = async (value) => {
    const data = {
      merchant_id: "MAL0100CA",
      name: value
    };
    try {
      const response = await axios.post(BASE_URL + COUPON_TITLE_CHECK, data, { headers: { "Content-Type": "multipart/form-data" } })
     
      if (response.data && response.data.status !== undefined) {
        setIsUnique(response.data.status); // Assuming the API returns { isUnique: boolean }
        setErrorMessage(response.data.status ? '' : 'Coupon name already exists');
      }
    } catch (error) {
      console.error('Error checking name uniqueness', error);
    }
  };

  // Debounce the checkUniqueness function
  const debouncedCheck = useCallback(_.debounce(checkUniqueness, 300), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9 ]*$/;

    if (regex.test(value) || value === '') {
      setInputValue(value);
      setIsUnique(true); 
      setErrorMessage('');
      if (value) {
        debouncedCheck(value);
      }
    } else {
      setErrorMessage('Special characters are not allowed');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  
  return (
    <>
   
      <div className="box">
      <div className="box_shadow_div">
        <div className="q-add-categories-section">
          <div className="q-add-categories-section-header">
            <span onClick={() => seVisible("CouponDiscount")} className="add_coupon_span">
              <img src={AddNewCategory} alt="Add-New-Category" className="h-9 w-9" />
              <span>Add Coupons</span>
            </span>
          </div>
          <div className="q-add-categories-section-middle-form">
            <div className="q_coupon_Add_status_btn">
              <p>show online</p>
              {/* <p>
                <label className="switch">
                  <input type="checkbox" name="online" id="online" checked={couponStates.online} onChange={handleCheckboxChange("online")}/>
                  <span className="slider round"></span>
                </label>
              </p> */}

              <Switch name="online" id="online" checked={couponStates.online} onChange={handleCheckboxChange("online")}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#0A64F9', // Change color when switch is checked
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: '#0A64F9', // Change background color of the track
               
                      },
                    }} />
            </div>
            <div className="q-add-coupon-single-input">
              <label for="coupon_name">Coupon Code</label>
              <input type="text" id="coupon_name" name="coupon_name" maxlength="11" value={inputValue} onChange={handleInputChange}/>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            <div className="q-add-coupon-single-input">
              <label for="description">Description</label>
              <textarea id="description" name="description" rows="4"  cols="50"></textarea>
            </div>

            <div className="q_coupon_calculation_amount row">
              <div className="q_coupon_minium col_minimun_order_amount">
                <label for="minorder_amt">Minimum Order Amount</label>
                <input type="number" id="minorder_amt" name="minorder_amt" min={{}}  max={{}} placeholder="Enter Minimum Order Amount"/>
              </div>
              <div className="q_coupon_minium col_minimun_order_amount dicount_per_amo">
                {activeTab === "amount" && (
                  <div className="q_coupon_minium">
                    <label for="discount_amt">Discount</label>
                    <input type="number" id="discount_amt" name="discount" placeholder="Enter Discount Amount"/>
                  </div>
                )}
                {activeTab === "percentage" && (
                  // Content for the 'Percentage' tab
                  <div className="q_coupon_minium">
                    <label for="discount_per">Discount</label>
                    <input type="number" id="discount_per" name="discount" placeholder="Enter Discount Percentage"/>
                  </div>
                )}
              <div className="q_tab_percentage_amount mt-4">
                <div className="q_coupon_btn_discount">
                  <div className={`cursor-pointer  text-center ${activeTab === "amount"? "bg-[#0A64F9]  text-white radius-4": "" }`} onClick={() => handleTabChange("amount")} >
                    Amount ($)
                  </div>
                  <div className={`cursor-pointer  text-center ${activeTab === "percentage"? "bg-[#0A64F9] text-white radius-4": ""}`} onClick={() => handleTabChange("percentage")}>
                    Percentage (%)
                  </div>
                </div>
              </div>
              
              </div>
              {activeTab === 'percentage' && 
                <div className="q_coupon_minium mini_dis_Amt">
                  <label for="maximum_discount">Maximum Discount Amount</label>
                  <input type="number" id="maximum_discount" name="maximum_discount" min={{}}  max={{}} placeholder="Enter Maximum Discount Amount"/>
                </div>
              }

            </div>

            <div className="q_coupon_minium my-4">
              <label for="coupon mt-2">Date & Time</label>
              <div className="flex flex-row gap-5">
                {/* <div className="q_datetimesection"> */}
                  <CustomeDateTime />
                {/* </div> */}
                {/* <div className="q_datetimesection">
                  <CustomeDateTime />
                </div> */}
              </div>
            </div>

            <div className="q-add-coupon-single-input">
              <div className="q_coupon_Add_status_btn">
                <p>Enable Redemption Limit?</p>
                {/* <p>
                  <label className="switch">
                    <input type="checkbox" name="enable_limit" id="enable_limit" checked={couponStates.enable_limit} onChange={handleCheckboxChange("enable_limit")}/>
                    <span className="slider round"></span>
                  </label>
                </p> */}

                <Switch name="enable_limit" id="enable_limit" checked={couponStates.enable_limit} onChange={handleCheckboxChange("enable_limit")}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#0A64F9', // Change color when switch is checked
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: '#0A64F9', // Change background color of the track
               
                      },
                    }} />
              </div>
            </div>

            {couponStates.enable_limit > 0 &&
                <div className="q-add-coupon-single-input">
                  <label for="count_limit">Redemption Limit</label>
                  <input type="number" id="count_limit" name="count_limit" min="1" max="999" />
                </div>
              }
          </div>

          <div className="q-add-categories-section-middle-footer">
            <button className="quic-btn quic-btn-save">Add</button>
            <button
              onClick={() => seVisible("CouponDiscount")}
              className="quic-btn quic-btn-cancle"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default AddCoupon;