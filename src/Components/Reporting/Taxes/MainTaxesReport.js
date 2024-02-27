import React, { useState } from "react";
import DateRange from '../../Orders/InstoreOrder/DateRange'
import TaxesFilter from './TaxesFilter'
import TaxesDetails from './TaxesDetails'
import DownIcon from "../../../Assests/Dashboard/Down.svg";

const MainTaxesReport = () => {
  const [filteredData, setFilteredData] = useState([]);


  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;
      let orderTypValue;

      switch (selectedOrderSource) {
        case "All":
          orderEnvValue = 9;
          break;
        case "Online Order":
          orderEnvValue = 5;
          break;
        case "Store Order":
          orderEnvValue = 6;
          break;
        // Add more cases if needed

        default:
          orderEnvValue = 9;
          break;
      }
      switch (selectedOrderType) {
        case "All":
          orderTypValue = "both";
          break;
        case "Pickup":
          orderTypValue = "pickup";
          break;
        case "Delivery":
          orderTypValue = "delivery";
          break;
        default:
          orderTypValue = "both";
          break;
      }
      const updatedData = {
        ...data,
        merchant_id: "MAL0100CA",
        order_env: orderEnvValue,
        order_typ: orderTypValue,
      };
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [orderSourceVisible, setOrderSourdeDropdownVisible] = useState(false);
  const [orderTypeVisible, setOrderTypeDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "odersource":
        setOrderSourdeDropdownVisible(!orderSourceVisible);
        break;
      case "ordertype":
        setOrderTypeDropdownVisible(!orderTypeVisible);
        break;
    }
  };
  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "odersource":
        setSelectedOrderSource(option);
        setOrderSourdeDropdownVisible(false);
        break;
      case "ordertype":
        setSelectedOrderType(option);
        setOrderTypeDropdownVisible(false);
        break;
    }
  };



  return (
  <>

  <div className='q-order-main-page'>
    <div className="box">
    <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <div className="q_details_header ml-2">Taxes</div>
          </div>
          <div className="q_details_header ml-8">Filter by</div>
        </div>
        <div className="q-order-page-container ml-8">
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Order Source
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("odersource")}
              >
                <span className="selected-option mt-1">
                  {selectedOrderSource}
                </span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderSourceVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "odersource")}>
                    All
                  </div>
                  <div
                    onClick={() => handleOptionClick("Online Order", "odersource")}
                  >
                    Online Order
                  </div>
                  <div
                    onClick={() => handleOptionClick("Store Order", "odersource")}
                  >
                    Store Order
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Order Type
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("ordertype")}
              >
                <span className="selected-option mt-1">
                  {selectedOrderType}
                </span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderTypeVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "ordertype")}>
                    All
                  </div>
                  <div
                    onClick={() =>
                      handleOptionClick("Pickup", "ordertype")
                    }
                  >
                   Pickup
                  </div>
                  <div
                    onClick={() =>
                      handleOptionClick("Delivery", "ordertype")
                    }
                  >
                    Delivery
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="q-order-page-filter"></div>
        </div>
      </div>
  </div>
  <div className='box '>
    <DateRange onDateRangeChange={handleDataFiltered} />

  </div>
  
  <div className='mt-8'>
  <div className='box '>
    <TaxesDetails data={filteredData}  />

  </div>
  </div>
  </div>
  </>
  )
}

export default MainTaxesReport