import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemSalesData } from "../../../Redux/features/Reports/ItemSales/ItemSalesSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const ItemSalesDetails = (props) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const dispatch = useDispatch();
  const [allItemSalesData, setallItemSalesData] = useState("");
  const AllItemSalesDataState = useSelector((state) => state.ItemSalesReportList);

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
        cat_name: props.SelectCatData,
        token_id: userTypeData?.token_id,
        login_type: userTypeData?.login_type,
        ...userTypeData,
      };
      if (data) {
        dispatch(fetchItemSalesData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (!AllItemSalesDataState.loading && AllItemSalesDataState.ItemSalesData && AllItemSalesDataState.ItemSalesData[0])
    {
      // console.log(AllItemSalesDataState.ItemSalesData[0])
      setallItemSalesData(AllItemSalesDataState.ItemSalesData[0]);
    }
    else
    {
      setallItemSalesData("");
    }
  }, [
    AllItemSalesDataState,
    AllItemSalesDataState.loading,
    AllItemSalesDataState.ItemSalesData,
  ]);

  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Item Sales Report</span>
          </div>
          <div className="q-attributes-bottom-attriButes-header item_sale_header_div">
            <p className="q-employee-item">Category</p>
            <p className="q-employee-in">	Name </p>
            <p className="q-employee-in"># Sold</p>
            <p className="q-employee-in">Gross Sales</p>
            <p className="q-employee-in">Price Override</p>

            <p className="q-employee-out">Discounts</p>
            <p className="q-employee-worked">Default Tax</p>
            <p className="q-catereport-break">Other Tax</p>
            <p className="q-catereport-break">Refunded</p>
            <p className="q-catereport-break">	Net Sales</p>
          </div>
        </div>

        {allItemSalesData && allItemSalesData.length >= 1 && allItemSalesData.map((ItemData, index) => (
          <div key={index} className="q-attributes-bottom-attriButes-listing">
            <div className="q-employee-bottom-attriButes-single-attributes item_sale_div">
              <p className="q-employee-item">{ItemData.categoryss}</p>
              <p className="q-employee-in">{ItemData.name}</p>
              <p className="q-employee-in">{ItemData.total_qty}</p>
              <p className="q-employee-in">{ItemData.total_price}</p>
              <p className="q-employee-in">{ItemData.adjust_price}</p>

              <p className="q-employee-out">{ItemData.discount_amt}</p>
              <p className="q-employee-worked">{ItemData.saletx}</p>
              <p className="q-catereport-break">{ItemData.othertx}</p>
              <p className="q-catereport-break">{ItemData.refund_amount}</p>
              <p className="q-catereport-break">{ItemData.discount_price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ItemSalesDetails