
import "../../../Styles/TableOrderPage.css";
import React, { useEffect, useState } from 'react';
// import Pagination from "react-js-pagination";
import DefaultPagination from "../InstoreOrder/DefaultPagination";
import { fetchOnlieStoreOrderData } from "../../../Redux/features/Orders/onlineStoreOrderSlice";
import { useSelector, useDispatch } from 'react-redux';




const OnlineTableViewData = () => {
  const [activePage, setActivePage] = useState(1);
  const entriesPerPage = 10;



  const startIndex = (activePage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  console.log()

  const [onlineStoreOrder, setallOnlineStoreOrders] = useState([])

  const AllOnlineStoreDataState = useSelector((state) => state.onlineStoreOrder)
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA"
    }
    if (data) {
      dispatch(fetchOnlieStoreOrderData(data))
    }

  }, [])

  useEffect(() => {
    if (!AllOnlineStoreDataState.loading && AllOnlineStoreDataState.onlineStoreOrderData) {
      setallOnlineStoreOrders(AllOnlineStoreDataState.onlineStoreOrderData)
    }
  }, [AllOnlineStoreDataState, AllOnlineStoreDataState.loading, AllOnlineStoreDataState.inStoreOrderData])


  useEffect(() => {
    console.log(onlineStoreOrder)
  }, [onlineStoreOrder])

  // const handleDeleteCategory = (id) => {
  //   const data = {
  //     id: id
  //   }
  //   if(id){
  //     dispatch(deleteCategory(data))
  //   }
  // }
  // console.log('gdgfdgfdgfdgfdgfdgfd',AllOnlineStoreDataState)

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
            onlineStoreOrder && onlineStoreOrder.length >= 1 && onlineStoreOrder.map((order, index) => (
              <div key={index} className="q-attributes-bottom-attriButes-single-attributes">
                <div className="table_view_sort">
                  <p className="table_user_details"> {order.users_name} </p>
                  <p className="table_Existing_customer">{order.customer_type}</p>
                  <p className="table_phone_details">{order.delivery_phn} </p>
                  <p className="table_email_details">{order.users_email}</p>
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

export default OnlineTableViewData;








