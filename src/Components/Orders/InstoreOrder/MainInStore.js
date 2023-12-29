import React, { useState } from "react";
import FilterEmp from "./FilterEmp";
import DateRange from "./DateRange";
import ContentList from "./ContentList";
import InstoreTableViewData from "./InstoreTableViewData";
import OnlineTableViewData from "../OnlineOrder/OnlineTableViewData"
import MainOnline from "../OnlineOrder/MainOnline";

const MainInStore = () => {
  const [activeTab, setActiveTab] = useState("offline");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderInStoreContent = () => {
    if (activeTab === "online") {
      return (
        <>
          <MainOnline />
        </>
      );
    } else if (activeTab === "offline") {
      return (
        <>
          <FilterEmp />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className="q_header_order_tab">
          <div className="mb-6">
            <button
              onClick={() => handleTabClick("offline")}
              className={`${activeTab === "offline"
                  ? "bg-[#EBF2FF] text-[#0A64F9]"
                  : "bg-white text-[#6A6A6A]"
                } px-12 py-2 rounded  lg:text-[20px] md:text-[14px] sm:text-[12px] focus:outline-none`}
            >
              In-Store Orders
            </button>
            <button
              onClick={() => handleTabClick("online")}
              className={`${activeTab === "online"
                  ? "bg-[#EBF2FF] text-[#0A64F9]"
                  : "bg-white text-[#6A6A6A]"
                } px-12 py-2 rounded focus:outline-none lg:text-[20px] md:text-[14px] sm:text-[12px]`}
            >
              Online Orders
            </button>
            <div className="border-b-2 text-[#CEE0FF]"></div>
          </div>

          <div className="">
            <div className="">{renderInStoreContent()}</div>
          </div>
        </div>
        <div className="q_dateRange_header">
          <DateRange />
        </div>
        <div className="q_dateRange_header">
          <ContentList />
        </div>

        <div className="q_dateRange_header">
          {
            activeTab === "offline" ?
            < InstoreTableViewData />
: <OnlineTableViewData />
          }
        </div>
      </div>
    </>
  );
};

export default MainInStore;
