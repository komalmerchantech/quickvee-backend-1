import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";

import DeletIcon from "../../Assests/Dashboard/delete.svg";
import Edit from "../../Assests/Dashboard/edit.svg";

const CouponDiscount = ({ seVisible }) => {
  const [isChecked, setIsChecked] = useState(true);
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
  return (
    <>
      <div className="mt-10">
        <div className="q-coupon-bottom-detail-section">
          <div className="q-coupon-bottom-header">
            <span>Coupon</span>

            <p onClick={() => seVisible("AddCoupon")}>
              Add New Coupon <img src={AddIcon} alt="add-icon" />
            </p>
          </div>
          <div className="q_main_section_coupon">
            <div
              className={`q_copuon_header mx-6 ${couponStates.coupon1 ? "active" : ""
                }`}
            >
              <div className="flex justify-between w-full">
                <div className="q_coupon_code">
                  <p>FLAT20</p>
                </div>
                <div className="flex space-x-2 p-4">
                  <img src={Edit} alt="" className="h-8 w-8" />
                  <img src={DeletIcon} alt="delet" className="h-8 w-8" />
                </div>
              </div>
              <div className="q_discount_coupon_Code">
                <div className="">20% OFF on minimum order of $30.00</div>
              </div>
              <div className="q_coupon_deatails_validtimes">
                <p>Valid from</p>
                <p className="q_date_details">1/08/2022 - 12:00AM to 1/09/2022 - 12:00AM</p>
              </div>
              <div className="q_coupon_discountCode">
                <p>Max Discount</p>
                <p className="q_date_details">$6.00</p>
              </div>
              <div className="q_coupon_status_btn">
                <p>Show online</p>
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
            </div>
            <div
              className={`q_copuon_header mx-6 ${couponStates.coupon2 ? "active" : ""
                }`}
            >
              <div className="flex justify-between w-full">
                <div className="q_coupon_code">
                  <p>FLAT20</p>
                </div>
                <div className="flex space-x-2 p-4">
                  <img src={Edit} alt="" className="h-8 w-8" />
                  <img src={DeletIcon} alt="delet" className="h-8 w-8" />
                </div>
              </div>
              <div className="q_discount_coupon_Code">
                <div className="">20% OFF on minimum order of $30.00</div>
              </div>
              <div className="q_coupon_deatails_validtimes">
                <p>Valid from</p>
                <p className="q_date_details">1/08/2022 - 12:00AM to 1/09/2022 - 12:00AM</p>
              </div>
              <div className="q_coupon_discountCode">
                <p>Max Discount</p>
                <p className="q_date_details">$6.00</p>
              </div>
              <div className="q_coupon_status_btn">
                <p>Show online</p>
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
            </div>
            <div
              className={`q_copuon_header mx-6 ${couponStates.coupon3 ? "active" : ""
                }`}
            >
              <div className="flex justify-between w-full">
                <div className="q_coupon_code">
                  <p>SUMMER25</p>
                </div>
                <div className="flex space-x-2 p-4">
                  <img src={Edit} alt="" className="h-8 w-8" />
                  <img src={DeletIcon} alt="delet" className="h-8 w-8" />
                </div>
              </div>
              <div className="q_discount_coupon_Code">
                <div className="">20% OFF on minimum order of $30.00</div>
              </div>
              <div className="q_coupon_deatails_validtimes">
                <p>Valid from</p>
                <p className="q_date_details">1/08/2022 - 12:00AM to 1/09/2022 - 12:00AM</p>
              </div>
              <div className="q_coupon_discountCode">
                <p>Max Discount</p>
                <p className="q_date_details">$6.00</p>
              </div>
              <div className="q_coupon_status_btn">
                <p>Show online</p>
                <p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={couponStates.coupon3}
                      onChange={handleCheckboxChange("coupon3")}
                    />
                    <span className="slider round"></span>
                  </label>
                </p>
              </div>
            </div>
            <div
              className={`q_copuon_header mx-6 ${couponStates.coupon4 ? "active" : ""
                }`}
            >
              <div className="flex justify-between w-full">
                <div className="q_coupon_code">
                  <p>FLAT20</p>
                </div>
                <div className="flex space-x-2 p-4">
                  <img src={Edit} alt="" className="h-8 w-8" />
                  <img src={DeletIcon} alt="delet" className="h-8 w-8" />
                </div>
              </div>
              <div className="q_discount_coupon_Code">
                <div className="">20% OFF on minimum order of $30.00</div>
              </div>
              <div className="q_coupon_deatails_validtimes">
                <p>Valid from</p>
                <p className="q_date_details">1/08/2022 - 12:00AM to 1/09/2022 - 12:00AM</p>
              </div>
              <div className="q_coupon_discountCode">
                <p>Max Discount</p>
                <p className="q_date_details">$6.00</p>
              </div>
              <div className="q_coupon_status_btn">
                <p>Show online</p>
                <p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={couponStates.coupon4}
                      onChange={handleCheckboxChange("coupon4")}
                    />
                    <span className="slider round"></span>
                  </label>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default CouponDiscount;
