import React, { useEffect, useState,useCallback } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";

import DeletIcon from "../../Assests/Dashboard/delete.svg";
import Edit from "../../Assests/Dashboard/edit.svg";

import axios from "axios";
import { fetchCouponList, updateStatus ,deleteCoupon } from "../../Redux/features/Coupon/couponSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Switch from '@mui/material/Switch';

import { BASE_URL, COUPON_STATUS_UPDATE } from "../../Constants/Config";

import moment from 'moment';

const CouponDiscount = ({ seVisible }) => {

  const [isChecked, setIsChecked] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchCouponList(data));
    }
  }, []);

  const [couponList, setAllCoupon] = useState([]);
  const AllCouponDataState = useSelector((state) => state.couponList);

  useEffect(() => {
    if (
      !AllCouponDataState.loading &&
      AllCouponDataState.couponData
    ) {
      setAllCoupon(AllCouponDataState.couponData);
      // console.log(AllCouponDataState.couponData);
    }
  }, [
    AllCouponDataState,
    AllCouponDataState.loading,
    AllCouponDataState.couponData,
  ]);

  const handleCheckboxChange = useCallback(async (couponId, isChecked) => {
    if (isChecked) {
      try {
        const data = {
          merchant_id: "MAL0100CA",
          coupon_id: couponId
        };
      

        const response = axios.post(BASE_URL + COUPON_STATUS_UPDATE, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response) 
        {
            dispatch(updateStatus({ coupon_id: couponId, show_online: 1 ,show_offline:0}));
        } 
      } catch (error) {
        console.error("API call failed:", error);
        alert(error.response?.data?.message || 'Error occurred while updating status');
      }
    }
  }, [dispatch]);

  const handleDeleteCoupon = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this coupon?");
    if (isConfirmed) {
      const data = {
        merchant_id: "MAL0100CA",
        coupon_id: id
      }
      if(id){
        dispatch(deleteCoupon(data))
      }
    }
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <>
      
      <div className="box">
      <div className="box_shadow_div">
        <div className="q-coupon-bottom-detail-section">
          <div className="q-coupon-bottom-header">
            <span>Coupon</span>

            <p onClick={() => seVisible("AddCoupon")}>
              Add New Coupon <img src={AddIcon} alt="add-icon" />
            </p>
          </div>
          <div className="container_q_main_section_coupon">

         
          <div className="q_main_section_coupon">
            {couponList && couponList.length >= 1 && couponList.map((coupons, index) => (
              <div key={index} className={`q_copuon_header mx-6 ${coupons.show_online == 1 ? "active" : ""}`}>
                <div className="flex justify-between w-full">
                  <div className="q_coupon_code">
                    <p>{coupons.name}</p>
                  </div>
                  <div className="flex space-x-2 p-4">
                  <Link to={`/coupons/edit-coupons/${coupons.id}`}>
                    <img src={Edit} alt="" className="h-8 w-8" />

                  </Link>
                    <img src={DeletIcon} alt="delet" className="h-8 w-8 delet-icon" onClick={() => handleDeleteCoupon(coupons.id)} />
                  </div>
                </div>
                <div className="q_discount_coupon_Code">
                  <div className="">{coupons.flag == 1 ? '$' : ''}{coupons.discount} {coupons.flag == 0 ? '%' : ''} OFF on minimum order of ${parseFloat(coupons.min_amount).toFixed(2)}</div>
                </div>
                <div className="q_coupon_deatails_validtimes">
                  <p>Valid from</p>
                  <p className="q_date_details">{moment(coupons.date_valid).format('MM/DD/YYYY')} - {moment(coupons.time_valid, "HH:mm:ss").format('hh:mm A')} to {moment(coupons.date_expire).format('MM/DD/YYYY')} - {moment(coupons.time_expire, "HH:mm:ss").format('hh:mm A')}</p>
                </div>
                <div className="q_coupon_discountCode">
                  <p>Max Discount</p>
                  <p className="q_date_details">${parseFloat(coupons.maximum_discount).toFixed(2)}</p>
                </div>
                <div className="q_coupon_status_btn">
                  <p>Show online</p>

                  <Switch checked={coupons.show_online == 1 ? true : false} onChange={(e) => handleCheckboxChange(coupons.id, e.target.checked)}
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
            ))}


          </div>
          </div>

        </div>
      </div>
      </div>
    </>
  );
};


export default CouponDiscount;