import React from "react";
import { useState } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";



const AddCoupon = ({ seVisible }) => {
  const [activeTab, setActiveTab] = useState("amount");
   const [couponStates, setCouponStates] = useState({
    coupon1: true,
    coupon2: false,
    coupon3: false,
    coupon4: false,
    // ... and so on for each coupon
  });

  const handleCheckboxChange = (couponName) => (e) => {
    setCouponStates({
      ...couponStates,
      [couponName]: e.target.checked,
    });
  };
 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="mt-10">
        <div className="q-add-categories-section">
          <div className="q-add-categories-section-header">
            <span onClick={() => seVisible("CouponDiscount")}>
              <img
                src={AddNewCategory}
                alt="Add-New-Category"
                className="h-9 w-9"
              />
              <span>Add Coupons</span>
            </span>
          </div>
          <div className="q-add-categories-section-middle-form">
           
                <div
                className={`q_coupon_Add_status_btn ${couponStates.coupon1 ? "active" : ""
                  }`}
              >
              <p>show online</p>
              <p>
              <label className="switch">
                    <input
                      type="checkbox"
                      checked={couponStates.coupon1}
                      onChange={handleCheckboxChange("coupon1")}
                    />
                    <span className="slider round"></span>
                  </label>
              </p>
            </div>
            <div className="q-add-coupon-single-input">
              <label for="coupon">Coupon Code</label>
              <input type="text" id="coupon" name="coupon_code" />
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

            <div className="q_coupon_calculation_amount">
              <div className="q_coupon_minium">
                <label for="minimumorder">Minimum Order Amount</label>
                <input
                  type="number"
                  id="order"
                  min={{}}
                  max={{}}
                  placeholder="Enter Minimum Order Amount"
                />
              </div>
              <div className="q_coupon_minium">
                {activeTab === "amount" && (
                  <div className="q_coupon_minium">
                    <label for="minimumorder">Discount</label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      placeholder="Enter Discount Amount"
                    />
                  </div>
                )}
                {activeTab === "percentage" && (
                  // Content for the 'Percentage' tab
                  <div className="q_coupon_minium">
                    <label for="minimumorder">Discount</label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      placeholder="Enter Discount Percentage"
                    />
                  </div>
                )}
              </div>

              <div className="q_tab_percentage_amount mt-4">
                <div className="q_coupon_btn_discount">
                  <div
                    className={`cursor-pointer px-6 py-2 ${
                      activeTab === "amount"
                        ? "bg-[#0A64F9] text-white radius-4"
                        : ""
                    }`}
                    onClick={() => handleTabChange("amount")}
                  >
                    Amount
                  </div>
                  <div
                    className={`cursor-pointer px-6 py-2 ${
                      activeTab === "percentage"
                        ? "bg-[#0A64F9] text-white"
                        : ""
                    }`}
                    onClick={() => handleTabChange("percentage")}
                  >
                    Percentage
                  </div>
                </div>
              </div>
            </div>




            <div className="q-add-coupon-single-input my-4">
              
              <label for="coupon">Date & Time</label>
              <div className="q_datetimesection">
               
                
               
       
              </div>
             
            </div>








            <div className="q-add-coupon-single-input">
            <div
                className={`q_coupon_Add_status_btn ${couponStates.coupon2 ? "active" : ""
                  }`}
              >
                <p>
                Enable Redemption Limit?
              </p>
              <p>
              <label className="switch">
                    <input
                      type="checkbox"
                      checked={couponStates.coupon2}
                      onChange={handleCheckboxChange("coupon2")}
                    />
                    <span className="slider round"></span>
                  </label>
              </p>
              </div>
              <label for="coupon">Redemption Limit</label>
              <input type="number" id="coupon" name="coupon_code" />
            </div>
          </div>
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
    </>
  );
};

export default AddCoupon;