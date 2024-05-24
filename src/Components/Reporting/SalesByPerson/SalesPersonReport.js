import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSalePersonData } from "../../../Redux/features/SalesByPerson/SalesByPersonSlice";
import { Link } from "react-router-dom";
import OrderSummaryDetails from "./MainOrderSumaaryDetails/OrderSummaryDetails";
import { useAuthDetails } from "../../../Common/cookiesHelper"

const SalesPersonReport = (props) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
  useAuthDetails();
  // console.log(props);
  const dispatch = useDispatch();
  const [allSalesByPersonData, setallSalesByPersonData] = useState("");
  const AllSalesByPersonDataState = useSelector((state) => state.SalesByPersonList);

  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  useEffect(() => {
    if (props && props.selectedDateRange) 
    {
      let data = {
        merchant_id: merchant_id,
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        order_typ: props.OrderTypeData,
        order_env: props.OrderSourceData,
        employee_id: props.SelectEmpListData,
        token_id: userTypeData?.token_id,
        login_type: userTypeData?.login_type,
        ...userTypeData,
      };
      if (data) {
        dispatch(fetchSalePersonData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (!AllSalesByPersonDataState.loading && AllSalesByPersonDataState.SalePersonData)
    {
      // console.log(AllSalesByPersonDataState.SalePersonData)
      setallSalesByPersonData(AllSalesByPersonDataState.SalePersonData);
    }
    else
    {
      setallSalesByPersonData("");
    }
  }, [
    AllSalesByPersonDataState,
    AllSalesByPersonDataState.loading,
    AllSalesByPersonDataState.ItemSalesData,
  ]);

  useEffect(() => {
    console.log(allSalesByPersonData);
  }, [allSalesByPersonData]);

  return (
    <>
    
      {allSalesByPersonData && Object.keys(allSalesByPersonData).map((EmpData, index) => (
        <div key={index} className="q-attributes-bottom-detail-section">
          <div className="q-category-bottom-header">
            <div className="q_details_header ml-2">Employee Name: {EmpData}</div>
          </div>

          <div className="q-attributes-bottom-attriButes-header">
            <p className="q-sales-item">Order ID</p>
            <p className="q-sales-in ">Date Time</p>
            <p className="q-sales-total ">Total</p>
          </div>
          {allSalesByPersonData[EmpData].map((SalesData, index1) => (
            <div key={index1} className="q-attributes-bottom-attriButes-listing ">
              <div className="q-employee-bottom-attriButes-single-attributes text-center ">
                <Link to={`/store-reporting/order-summary/${SalesData.order_id}`}>
                
                  <p className="q-sales-item">{SalesData.order_id}</p>
                </Link>
                <p className="q-sales-in">{SalesData.merchant_time}</p>
                <p className="q-sales-total"> ${SalesData.amt}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default SalesPersonReport;
