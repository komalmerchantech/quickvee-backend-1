import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";

import DeletIcon from "../../Assests/Dashboard/delete.svg";
import Edit from "../../Assests/Dashboard/edit.svg";

const CouponDiscount = ({ seVisible }) => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "FLAT20",
      discount: "20% OFF on a minimum order of $30.00",
      validDate: "1/08/2022 - 12:00AM to 1/09/2022 - 12:00AM",
      maxDiscount: "$50",
      status: "Enabled",
    },
    // Add more coupons as needed
  ]);

  const handleEdit = (id) => {
    // Add logic to handle edit
    console.log(`Edit coupon with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Add logic to handle delete
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => coupon.id !== id)
    );
    console.log(`Delete coupon with ID ${id}`);
  };

  const handleToggleStatus = (id) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              status: coupon.status === "Enabled" ? "Disabled" : "Enabled",
            }
          : coupon
      )
    );
  };

  return (
    <>
      <div className="mt-10">
        <div className="q-attributes-bottom-detail-section">
          <div className="q-attributes-bottom-header">
            <span>Coupon</span>

            <p onClick={() => seVisible("AddCoupon")}>
              Add New Coupon <img src={AddIcon} alt="add-icon" />
            </p>
          </div>
          <div className="flex justify-between w-full gap-8">
            <div className="q_copuon_header mx-12">
              <div className="flex justify-between w-full">
                <div className="q_coupon_code">
                  <p>FLAT20</p>
                </div>
                <div className="flex space-x-2 p-4">
                  <img src={Edit} alt="" className="h-12 w-16" />

                  <img src={DeletIcon} alt="delet" className="h-12 w-16" />
                </div>
              </div>

              <div className="q_discount_coupon_Code">
                <div className="">20% OFF on minimum order of $30.00</div>
              </div>
              <div className="">
                
              </div>
            </div>

            <div className="q_copuon_header mx-4">
              <div className="flex justify-between w-full">
                <div className="q_coupon_code">
                  <p>SUMMER25</p>
                </div>
                <div className="flex space-x-2 p-4">
                  <img src={Edit} alt="" className="h-12 w-16" />

                  <img src={DeletIcon} alt="delet" className="h-12 w-16" />
                </div>
              </div>
              <div className="q_discount_coupon_Code">
                <div className="">20% OFF on minimum order of $30.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponDiscount;
