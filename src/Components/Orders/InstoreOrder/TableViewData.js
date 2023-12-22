import { useState } from "react";
import "../../../Styles/TableOrderPage.css";


import DefaultPagination from "./DefaultPagination";

const OnlineTable = () => {
    const [activePage, setActivePage] = useState(1);
  const entriesPerPage = 10;


  
  const startIndex = (activePage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  console.log()
  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">


            {/* Pagination component */}
      <DefaultPagination />
          </div>
          <div className="q-attributes-bottom-attriButes-header">
            <p className="table_view_sort">Customer</p>
            <p className="table_view_title">Order</p>
            <p className="table_view_amount">Amount</p>
            <p className="table_view_items">Status</p>
          </div>
        </div>
        <div className="q-attributes-bottom-attriButes-listing">
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <div className="table_view_sort">
              <p className="table_user_details">Brian Cooper</p>
              <p className="table_Existing_customer">Existing Customer</p>
              <p className="table_phone_details">876 556 7889</p>
              <p className="table_email_details">vijay@imerchantech.com</p>
            </div>

            <div className="table_view_title">
              <p className="table_order_details">64D249392454E</p>
              <p className="table_order_datedetails">2023-08-08 06:14:51</p>
              <p className="table_order_delivery">Pickup</p>
            </div>

            <div className="table_view_amount">
              <p className="table_Amount_details">$216.29</p>
              <p className="table_amount_status">2Cash-Pending</p>
            </div>
            <div className="table_view_items">
              <select className="table_status_selected">
                <option value="day">Accepted</option>
                <option value="month">Rejected</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="attriButes-details">
              <p className="table_view_details   ">View Details</p>
            </div>
            <div className="table_border_bottom"></div>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <div className="table_view_sort">
              <p className="table_user_details">Brian Cooper</p>
              <p className="table_Existing_customer">Existing Customer</p>
              <p className="table_phone_details">876 556 7889</p>
              <p className="table_email_details">vijay@imerchantech.com</p>
            </div>

            <div className="table_view_title">
              <p className="table_order_details">64D249392454E</p>
              <p className="table_order_datedetails">2023-08-08 06:14:51</p>
              <p className="table_order_delivery">Pickup</p>
            </div>

            <div className="table_view_amount">
              <p className="table_Amount_details">$216.29</p>
              <p className="table_amount_status">2Cash-Pending</p>
            </div>
            <div className="table_view_items">
              <select className="table_status_selected">
                <option value="day">Accepted</option>
                <option value="month">Rejected</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="attriButes-details">
              <p className="table_view_details   ">View Details</p>
            </div>
            <div className="table_border_bottom"></div>
          </div>
          <div className="py-8">

          {/* <DefaultPagination /> */}
          </div>
         
      
        </div>
      </div>
    </>
  );
};

export default OnlineTable;
