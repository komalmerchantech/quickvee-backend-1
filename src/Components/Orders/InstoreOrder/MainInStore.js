import React, { useState } from "react";
import FilterEmp from "./FilterEmp";
import DateRange from "./DateRange";
import ContentList from "./ContentList";
import InstoreTableViewData from "./InstoreTableViewData";
import OnlineTableViewData from "../OnlineOrder/OnlineTableViewData";
import MainOnline from "../OnlineOrder/MainOnline";

const MainInStore = () => {
  const [activeTab, setActiveTab] = useState("offline");

  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(null);
  const [OnlSearchIdData, setOnlSearchIdData] = useState(null);
  const [OffSearchIdData, setOffSearchIdData] = useState(null);
  const [EmployeeIDData, setEmployeeIDData] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterDataChange = (OrderSource, OrderType, SearchId) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
    setOnlSearchIdData(SearchId);
  };

  const handleFilterEmpDataChange = (OrderSource, EmployeeID, SearchId) => {
    setOrderSourceData(OrderSource);
    setEmployeeIDData(EmployeeID);
    setOffSearchIdData(SearchId);
  };

  const renderInStoreContent = () => {
    if (activeTab === "online") {
      return (
        <>
          <MainOnline
            onFilterDataChange={handleFilterDataChange}
            searchId={searchId}
            setSearchId={setSearchId}
          />
        </>
      );
    } else if (activeTab === "offline") {
      return (
        <>
          <FilterEmp
            onFilterEmpDataChange={handleFilterEmpDataChange}
            searchId={searchId}
            setSearchId={setSearchId}
          />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className="box">
          <div className="box_shadow_div_order" style={{ overflow: "unset" }}>
            <div className="mb6_border">
              <div
                onClick={() => handleTabClick("offline")}
                className={`${
                  activeTab === "offline"
                    ? "bg-[#EBF2FF] text-[#0A64F9] font-circular-bold relative  cursor-pointer"
                    : "bg-white text-[#6A6A6A]  cursor-pointer"
                } orderfilter`}
              >
                In-Store Orders
              </div>
              <div
                onClick={() => handleTabClick("online")}
                className={`${
                  activeTab === "online"
                    ? "bg-[#EBF2FF] text-[#0A64F9]  font-circular-bold relative cursor-pointer"
                    : "bg-white text-[#6A6A6A] cursor-pointer"
                } orderfilter`}
              >
                Online Orders
              </div>
            </div>

            <div className="">
              <div className="">{renderInStoreContent()}</div>
            </div>
          </div>
          {!searchId && (
            <>
              <div className="q_dateRange_header">
                <DateRange onDateRangeChange={handleDateRangeChange} />
              </div>
              <div className="q_dateRange_header">
                <ContentList />
              </div>
            </>
          )}

          <div className="q_dateRange_header">
            {activeTab === "offline" ? (
              <InstoreTableViewData
                OrderSourceData={OrderSourceData}
                EmployeeIDData={EmployeeIDData}
                OffSearchIdData={OffSearchIdData}
                selectedDateRange={selectedDateRange}
              />
            ) : (
              <OnlineTableViewData
                OrderSourceData={OrderSourceData}
                OrderTypeData={OrderTypeData}
                OnlSearchIdData={OnlSearchIdData}
                selectedDateRange={selectedDateRange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainInStore;
