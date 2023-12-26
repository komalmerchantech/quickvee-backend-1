import React from "react";
import { useState } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";

const AddCoupon = ({ seVisible }) => {
  const [couponStates, setCouponStates] = useState();

  const handleCheckboxChange = (couponName) => (e) => {
    setCouponStates({
      ...couponStates,
      [couponName]: e.target.checked,
    });
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
            <div className="q_coupon_Add_status_btn">
              <p>show online</p>
              <p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={{ couponStates }}
                    onChange={handleCheckboxChange("")}
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
              <label for="minimumorder">Minimum Order Amount</label>
              <input type="text" id="order" name="minium_order" />
            </div>
            <div className="q_coupon_calculation_amount">
              <label for="minimumorder">Discount</label>
              <input type="text" id="discount" name="discount" />
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
      </div>
    </>
  );
};

export default AddCoupon;
