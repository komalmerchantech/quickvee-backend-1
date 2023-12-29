
import "../../../Styles/TableOrderPage.css";
import React, { useEffect, useState } from 'react';
// import Pagination from "react-js-pagination";
import DefaultPagination from "./DefaultPagination";
import { fetchInStoreOrderData } from "../../../Redux/features/Orders/inStoreOrderSlice";
import { useSelector, useDispatch } from 'react-redux';




const InstoreTableViewData = () => {
  const [activePage, setActivePage] = useState(1);
  const entriesPerPage = 10;



  const startIndex = (activePage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  console.log()

  const [inStoreOrder, setallInStoreOrders] = useState([])

  const AllInStoreDataState = useSelector((state) => state.inStoreOrder)
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA"
    }
    if (data) {
      dispatch(fetchInStoreOrderData(data))
    }

  }, [])

  useEffect(() => {
    if (!AllInStoreDataState.loading && AllInStoreDataState.inStoreOrderData) {
      setallInStoreOrders(AllInStoreDataState.inStoreOrderData)
    }
  }, [AllInStoreDataState, AllInStoreDataState.loading, AllInStoreDataState.inStoreOrderData])


  useEffect(() => {
    console.log(inStoreOrder)
  }, [inStoreOrder])

  // const handleDeleteCategory = (id) => {
  //   const data = {
  //     id: id
  //   }
  //   if(id){
  //     dispatch(deleteCategory(data))
  //   }
  // }
  // console.log('gdgfdgfdgfdgfdgfdgfd',AllInStoreDataState)

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
          {
            inStoreOrder && inStoreOrder.length >= 1 && inStoreOrder.map((order, index) => (
              <div key={index} className="q-attributes-bottom-attriButes-single-attributes">
                <div className="table_view_sort">
                  <p className="table_user_details"> {order.name} </p>
                  {/* <p className="table_Existing_customer">Existing Customer</p> */}
                  <p className="table_phone_details">{order.delivery_phn} </p>
                  {/* <p className="table_email_details">vijay@imerchantech.com</p> */}
                </div>

                <div className="table_view_title">
                  <p className="table_order_details">{order.order_id}</p>
                  <p className="table_order_datedetails">{order.merchant_time}</p>
                  <p className="table_order_delivery">{order.order_method}</p>
                </div>

                <div className="table_view_amount">
                  <p className="table_Amount_details">${order.amt}</p>
                  <p className="table_amount_status">{order.order_status}</p>
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
            ))
          }



          <div className="py-8">

            <DefaultPagination />
          </div>


        </div>
      </div>
    </>
  );
};

export default InstoreTableViewData;








