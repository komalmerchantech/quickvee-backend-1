import React, { useState } from "react";
import AddCoupon from "./AddCoupon";
import CouponDiscount from "./CouponDiscount";

const MainCoupon = () => {
  const [visible, seVisible] = useState("CouponDiscount");
  return (
    <>
      <div className="q-category-main-page">
    
        {visible === "CouponDiscount" && (
          <CouponDiscount seVisible={seVisible} />
        )}
        {visible === "AddCoupon" && <AddCoupon seVisible={seVisible} />}
      </div>
    </>
  );
};

export default MainCoupon;


