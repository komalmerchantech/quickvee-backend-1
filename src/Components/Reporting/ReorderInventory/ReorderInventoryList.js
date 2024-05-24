import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReorderInventoryData } from "../../../Redux/features/Reports/ReorderInventory/ReorderInventorySlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const ReorderInventoryList = (props) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  console.log(props);
  const dispatch = useDispatch();
  const [allReorderInventoryData, setallReorderInventoryData] = useState("");
  const AllReorderInventoryDataState = useSelector(
    (state) => state.ReorderInventoryList
  );

  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  useEffect(() => {
    let data = {
      merchant_id: merchant_id,
      token_id: userTypeData?.token_id,
      login_type: userTypeData?.login_type,
      ...userTypeData,
      // merchant_id: "JOS0948CA",
    };
    if (data) {
      dispatch(fetchReorderInventoryData(data));
    }
  }, []);

  useEffect(() => {
    if (
      !AllReorderInventoryDataState.loading &&
      AllReorderInventoryDataState.ReorderData
    ) {
      console.log(AllReorderInventoryDataState.ReorderData);
      setallReorderInventoryData(AllReorderInventoryDataState.ReorderData);
    } else {
      setallReorderInventoryData("");
    }
  }, [
    AllReorderInventoryDataState,
    AllReorderInventoryDataState.loading,
    AllReorderInventoryDataState.ReorderData,
  ]);

  return (
    <>
      <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-sort">Item Name</p>
          <p className="report-sort">Variant</p>
          <p className="report-sort">Category</p>
          <p className="report-sort">Cost of Vendor</p>
          <p className="report-sort">Instock</p>
          <p className="report-sort">Item Price</p>
          <p className="report-sort">Reorder Level</p>
          <p className="report-sort">Reorder Quantity</p>
        </div>
      </div>

      {allReorderInventoryData && allReorderInventoryData.length >= 1 ? (
        allReorderInventoryData.map((InvData, index) => (
          <div className="box">
            <div
              key={index}
              className="q-category-bottom-categories-listing"
              style={{ borderRadius: "unset" }}
            >
              <div className="q-category-bottom-categories-single-category">
                <p className="report-title">{InvData.item_name}</p>
                <p className="report-title">{InvData.variant}</p>
                <p className="report-title">{InvData.category}</p>
                <p className="report-title">{InvData.cost_vendor}</p>
                <p className="report-title">{InvData.instock}</p>
                <p className="report-title">{InvData.item_price}</p>
                <p className="report-title">{InvData.reorder_level}</p>
                <p className="report-title">{InvData.reorder_qty}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-div">No data available</div>
      )}
    </>
  );
};

export default ReorderInventoryList;
