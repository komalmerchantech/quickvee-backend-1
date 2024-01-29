import React, { useState } from "react";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import ReCAPTCHA from "./ReCAPTCHA";

const StoreCateUser = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);

  const [replicateUPCs, setReplicateUPCs] = useState(false); // State for the checkbox

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      // Add cases for other dropdowns if needed
      default:
        break;
    }
  };

  const [isVerified, setVerified] = useState(false);

  const handleVerify = (success) => {
    setVerified(success);
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        setSelectedEmployee(option);
        setEmployeeDropdownVisible(false);
        break;
      case "orderSource":
        setSelectedOrderSource(option);
        setOrderSourceDropdownVisible(false);
        break;
      // Add cases for other dropdowns if needed
      default:
        break;
    }
  };

  const handleCheckboxChange = () => {
    setReplicateUPCs(!replicateUPCs);
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className="q-add-categories-section">
          <div className="q-add-categories-section-header">
            <span>
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Duplicate</span>
            </span>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col">
            {/* Employee Dropdown */}
            <div className="q-order-page-filter mt-6">
              <label className="q-details-page-label" htmlFor="employeeFilter">
                Copy from this store
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("employee")}
                >
                  <span className="selected-option mt-1">
                    {selectedEmployee}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {employeeDropdownVisible && (
                  <div className="dropdown-content">
                    <div onClick={() => handleOptionClick("All", "employee")}>
                      All
                    </div>
                    <div
                      onClick={() => handleOptionClick("employee1", "employee")}
                    >
                      employee1
                    </div>
                    <div
                      onClick={() => handleOptionClick("employee2", "employee")}
                    >
                      employee2
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <label
                  className="q-details-page-label"
                  htmlFor="orderSourceFilter"
                >
                  Paste to this store
                </label>
                <div className="custom-dropdown">
                  <div
                    className="custom-dropdown-header"
                    onClick={() => toggleDropdown("orderSource")}
                  >
                    <span className="selected-option mt-1">
                      {selectedOrderSource}
                    </span>
                    <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                  </div>
                  {orderSourceDropdownVisible && (
                    <div className="dropdown-content">
                      <div
                        onClick={() => handleOptionClick("All", "orderSource")}
                      >
                        All
                      </div>
                      <div
                        onClick={() =>
                          handleOptionClick("Source1", "orderSource")
                        }
                      >
                        Source1
                      </div>
                      <div
                        onClick={() =>
                          handleOptionClick("Source2", "orderSource")
                        }
                      >
                        Source2
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="q-order-page-filter mt-6"></div>
          </div>

          <div className="q-add-inventory-section-header mx-2">
            <div class="qv_checkbox">
              <label class="qv_checkbox_add_checkmark_label">
                Want to Replicated UPC's for inventory
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  value="true"
                />
                <span class="qv_add_checkmark"></span>
              </label>
            </div>
          </div>

          <div
            className="q-add-categories-section-middle-footer "
            style={{ justifyContent: "start" }}
          >
            <button className="quic-btn quic-btn-save">
              Duplicate Inventory
            </button>
            <button className="quic-btn quic-btn-cancle">
              Duplicate setting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCateUser;