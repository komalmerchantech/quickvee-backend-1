import React, { useState, useEffect } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import { Link, useParams } from "react-router-dom";
import CustomeDateTime from "./CustomeDateTime2";
import axios from "axios";
import {
  BASE_URL,
  COUPON_DETAILS_ID_CHECK,
} from "../../Constants/Config";
import Switch from '@mui/material/Switch';
const EditCoupon = () => {
  const myStyles = {
    display: "flex",
  };
  const [errorMessage, setErrorMessage] = useState('');

  const [couponStates, setCouponStates] = useState({
    online: false,
    enable_limit: false,
  });

  const handleCheckboxChange = (couponName) => (e) => {
    setCouponStates({
      ...couponStates,
      [couponName]: e.target.checked ? 1 : 0,
    });
  };

  const [activeTab, setActiveTab] = useState("amount");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };



  const params = useParams();
  async function fetchData() {
    const getcouponData = {
      merchant_id: "MAL0100CA",
      id: params.couponsCode,
    };

    try {
      const response = await axios.post(
        BASE_URL + COUPON_DETAILS_ID_CHECK,
        getcouponData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === true) {
        // console.log(response.data.result)
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
          console.log(res)
      }
    };

    fetchDataAndUpdateState();
  }, [params.couponsCode]); 

  return (
    <>
      <div className="q-category-main-page">
        <div className="box ">
          <div className="box_shadow_div">
            <div className="q-add-categories-section">
              <div className="q-add-categories-section-header">
                <Link to={`/coupons`}>
                  <span style={myStyles}>
                    <img src={AddNewCategory} alt="Add-New-Category" />
                    <span className="pl-4">Edit Coupon</span>
                  </span>
                </Link>
              </div>
              <div className="q-add-categories-section-middle-form">
                <div className="q_coupon_Add_status_btn">
                  <p>show online</p>
                  <Switch name="online" id="online" 
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
                  <input
                    type="text"
                    id="coupon_name"
                    name="coupon_name"
                    maxlength="11"
                  />
                  {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
                </div>

              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area" > 
                    <input  style={{width:"50%",borderRadius: "4px 0 0 4px",
          borderRight: "none"}} type="date" />
                    <input type="time" style={{width:"50%",borderRadius: "4px 0 0 4px",
          borderLeft: "none",}} />  
                                      
                  </div>
                </div>
                <div className="col-qv-6">
                  <div className="input_area"> 
                  <label for="coupon_name">Coupon Code</label>
                  <input
                    type="text"
                    id="coupon_name"
                    name="coupon_name"
                    maxlength="11"
                  />
                  </div>
                </div>
              </div>



                <div className="q-add-coupon-single-input">
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>
                <div className="q-add-coupon-single-input ">
                  <div className="row mini_order_DIS">
                    <div className="col-md-6 col__6">
                      <div className="q_coupon_minium col_minimun_order_amount">
                        <label for="minorder_amt">Minimum Order Amount</label>
                        <input
                          type="number"
                          id="minorder_amt"
                          name="minorder_amt"
                          min={{}}
                          max={{}}
                          placeholder="Enter Minimum Order Amount"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col__6">
                      <div className="q_coupon_minium col_minimun_order_amount dicount_per_amo">
                        {activeTab === "amount" && (
                          <div className="q_coupon_minium">
                            <label for="discount_amt">Discount</label>
                            <input
                              type="number"
                              id="discount_amt"
                              name="discount"
                              placeholder="Enter Discount Amount"
                            />
                          </div>
                        )}
                        {activeTab === "percentage" && (
                          // Content for the 'Percentage' tab
                          <div className="q_coupon_minium">
                            <label for="discount_per">Discount</label>
                            <input
                              type="number"
                              id="discount_per"
                              name="discount"
                              placeholder="Enter Discount Percentage"
                            />
                          </div>
                        )}
                        <div className="q_tab_percentage_amount mt-4">
                          <div className="q_coupon_btn_discount">
                            <div
                              className={`cursor-pointer  text-center ${
                                activeTab === "amount"
                                  ? "bg-[#0A64F9] text-white radius-4"
                                  : ""
                              }`}
                              onClick={() => handleTabChange("amount")}
                            >
                              Amount ($)
                            </div>
                            <div
                              className={`cursor-pointer  text-center  ${
                                activeTab === "percentage"
                                  ? "bg-[#0A64F9] text-white radius-4"
                                  : ""
                              }`}
                              onClick={() => handleTabChange("percentage")}
                            >
                              Percentage (%)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                {activeTab === 'percentage' && 
        
                <div className="q_coupon_minium edit_mini_dis_Amt">
                  <label for="maximum_discount">Maximum Discount Amount</label>
                  <input type="number" id="maximum_discount" name="maximum_discount" min={{}}  max={{}} placeholder="Enter Maximum Discount Amount"/>
                </div>
         
              }
                </div>

                <div className="q_coupon_minium my-4">
              <label for="coupon" >Date & Time</label>
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

                {couponStates.enable_limit > 0 && (
                  <div className="q-add-coupon-single-input">
                    <label for="count_limit">Redemption Limit</label>
                    <input
                      type="number"
                      id="count_limit"
                      name="count_limit"
                      min="1"
                      max="999"
                    />
                  </div>
                )}

                <div className="q-add-categories-section-middle-footer">
                  <button className="quic-btn quic-btn-save">Save</button>

                  <Link to={`/coupons`}>
                    <button className="quic-btn quic-btn-cancle">Cancel</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCoupon;
