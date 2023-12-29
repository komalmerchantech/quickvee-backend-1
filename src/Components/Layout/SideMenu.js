import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "../../Assests/Dashboard/dashboard.svg";
import ShoppingCartIcon from "../../Assests/Dashboard/orders.svg";
import CategoryIcon from "../../Assests/Dashboard/category.svg";
import CouponIcon from "../../Assests/Dashboard/coupanb.svg";
import AttributesIcon from "../../Assests/Dashboard/attributesadmin.svg";
import PurchaseIcon from "../../Assests/Dashboard/purchesb.svg";
import ProductIcon from "../../Assests/Dashboard/productb.svg";
import VenderIcon from "../../Assests/Dashboard/vender.svg";
import TimesheetIcon from "../../Assests/Dashboard/timesheetb.svg";
import TimesheetsIcon from "../../Assests/Dashboard/timesheetb.svg";
import StoreIcon from "../../Assests/Dashboard/store.svg";
import ReportIcon from "../../Assests/Dashboard/reporting.svg";
import DashIcon from "../../Assests/Dashboard/dashIcon.svg";
import OrderYellow from "../../Assests/Dashboard/ordery.svg";
import CatIcon from "../../Assests/Dashboard/categoryd.svg";
import AtriIcon from "../../Assests/Dashboard/attributesy.svg";
import ProdIcon from "../../Assests/Dashboard/productY.svg";
import VenIcon from "../../Assests/Dashboard/venderb.svg";
import VenIcons from "../../Assests/Dashboard/vendery.svg";
import DataIcons from "../../Assests/Dashboard/importy.svg";
import CouIcon from "../../Assests/Dashboard/coupony.svg";
import PurIcon from "../../Assests/Dashboard/purchaseY.svg";
import SettingIcon from "../../Assests/Dashboard/settingY.svg";
import ResportIcons from "../../Assests/Dashboard/reports.svg";
import { useLocation } from 'react-router-dom';


  const SideMenu = ({ isMenuOpen, setIsMenuToggle }) => {

    const location = useLocation();
    const currentUrl = location.pathname;

    const [activeItem, setActiveItem] = useState(currentUrl); // Set Dashboard as the default active item
    const navigate = useNavigate();
  
    const handleItemClick = (item) => {
      console.log(item)
      setActiveItem(item.link);
      navigate(item.link);
    };
  

  return (
    <>
      <div
        className="sidebar-menu"
        style={isMenuOpen ? { width: "16rem" } : { width: "6rem" }}
      >
        {/* Left Side Menu */}
        <div className="flex-1 bg-[#253338] text-[#9E9E9E]">
          {isMenuOpen
            ? menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`mb-4 text-base ${
                    activeItem === item.link ? "active" : ""
                  }`}
                >
                  {item.dropdownItems ? (
                    <DropdownMenuItem item={item} />
                  ) : (
                    <div
                    className={`flex items-center ${
                      activeItem === item.link ? "bg-[#414F54] text-[#FFC400]" : ""
                        ? "text-[#FFC400] active:bg-[#414F54] hover:bg-[#414F54] px-0"
                        : ""
                    }`}
                  >
                    {activeItem === item.link ? item.activeIcon : item.icon}
                    <Link
                      onClick={() => handleItemClick(item)}
                      className={`ml-2 menu-item text-[18px] Admin_std ${
                        activeItem === item.link ? "bg-[#414F54]" : ""
                      }`}
                      to={item.link}
                    >
                      {item.text}
                    </Link>
                  </div>
                  )}
                </div>
              ))
            : menuItems.map((item) => (
                <div
                  key={item.id}
                  
                  className={`mb-4 text-base cursor-pointer ${
                    activeItem === item.link ? "active" : ""
                  }`}
                >
                  {item.dropdownItems ? (
                    <DropdownMenuItem item={item} />
                  ) : (
                    <div
                      className={`flex flex-col items-center ${
                        activeItem === item.link
                          ? "text-[#FFC400] active"
                          : "text-gray-400 hover-text-yellow"
                      }`}
                      onClick={() => {
                        handleItemClick(item);
                      }}
                    >
                      {activeItem === item.id ? item.activeIcon : item.icon}
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

const DropdownMenuItem = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
    <div className="flex items-center">
      {item.icon}
      <p
        className="ml-2 cursor-pointer menu-item text-gray-400"
        onClick={handleToggleDropdown}
      >
        {item.text}
        <FaChevronDown className="quickarrow_icon" />
      </p>
    </div>
    {isDropdownOpen && (
        <div className="absolute mt-0 bg-[#334247] p-4  shadow w-full text-center  z-10">
          {item.dropdownItems.map((dropdownItem) => (
            <Link
              key={dropdownItem.id}
              to={dropdownItem.link}
              className="flex text-center submenu-item text-gray-400 py-4"
            >
              {dropdownItem.text}
            </Link>
          ))}
      </div>
    )}
  </div>
);
};


// Define menu items with icons and text
const menuItems = [
  {
    id: 1,
    icon: (
      <img
        src={DashIcon}
        alt="Dashboard"
        className="h-6 w-10 mt-4 mb-4 "
      />
    ),
    activeIcon: (
      <img
        src={DashboardIcon}
        alt="Dashboard"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Dashboard",
    link: "/dashboard",
  },

  {
    id: 2,
    icon: (
      <img src={ShoppingCartIcon} alt="Order" className="h-6 w-10 mt-4 mb-4" />
    ),
    activeIcon: (
      <img src={OrderYellow} alt="order" className="h-6 w-10 mt-4 mb-4 " />
    ),
    text: "Order",
    link: "/order",
  },
  {
    id: 3,
    icon: (
      <img src={CategoryIcon} alt="Category" className="h-6 w-10 mt-4 mb-4" />
    ),
    activeIcon: (
      <img src={CatIcon} alt="Category" className="h-6 w-10 mt-4 mb-4 " />
    ),
    text: "Category",
    link: "/category",
  },
  {
    id: 4,
    icon: (
      <img src={ProductIcon} alt="Products" className="h-6 w-10 mt-4 mb-4" />
    ),
    activeIcon: (
      <img src={ProdIcon} alt="Products" className="h-6 w-10 mt-4 mb-4 " />
    ),
    text: "Products",
    link: "/products",
  },
  {
    id: 5,
    icon: (
      <img
        src={AttributesIcon}
        alt="Attributes"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    activeIcon: (
      <img
        src={AtriIcon}
        alt="atributes"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Attributes",
    link: "/attributes",
  },
  {
    id: 6,
    icon: (
      <img
        src={PurchaseIcon}
        alt="Purchase Data"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    activeIcon: (
      <img src={PurIcon} alt="Purchase" className="h-6 w-10 mt-4 mb-4 " />
    ),
    text: "Purchase Orders",
    link: "/purchase-data",
  },
  {
    id: 7,
    icon: (
      <img src={VenderIcon} alt="Import Data" className="h-6 w-10 mt-4 mb-4" />
    ),

    text: "Import Data",
    link: "/import-data",
    activeIcon: (
      <img src={DataIcons} alt="Import" className="h-6 w-10 mt-4 mb-4 " />
    ),
    text: "Import Data",
    link: "/import-data",
  },
  {
    id: 8,
    icon: <img src={CouponIcon} alt="Coupons" className="h-6 w-10 mt-4 mb-4" />,
    text: "Coupons",
    link: "/coupons",
    activeIcon: (
      <img src={CouIcon} alt="Coupons" className="h-6 w-10 mt-4 mb-4 " />
    ),
    text: "Coupons",
    link: "/coupons",
  },
  {
    id: 9,
    icon: <img src={VenIcon} alt="Vendors" className="h-6 w-10 mt-4 mb-4" />,
    text: "Vendors",
    link: "/vendors",
    activeIcon: (
      <img src={VenIcons} alt="Vendors" className="h-6 w-10 mt-4 mb-4 " />
    ),
    text: "Vendors",
    link: "/vendors",
  },
  {
    id: 10,
    icon: (
      <img src={TimesheetIcon} alt="Timesheet" className="h-6 w-10 mt-4 mb-4" />
    ),
    text: "Timesheet",
    link: "/timesheet",
    activeIcon: (
      <img
        src={TimesheetsIcon}
        alt="Timesheet"
        className="h-6 w-10 mt-4 mb-4 "
      />
    ),
    text: "Timesheet",
    link: "/timesheet",
  },
  {
    id: 11,
    icon: (
      <img src={StoreIcon} alt="store" className="h-6 w-10 mt-4 mb-4" />
    ),
    activeIcon: (
      <img
        src={SettingIcon}
        alt="active store"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Store Settings",
    link: "/store-settings/info", // You can set a default link or remove it
    className: "flex items-center gap-2",
    dropdownItems: [
      { id: 61, text: "Info", link: "/store-settings/info" },
      { id: 62, text: "Setup", link: "/store-settings/setup" },
      {
        id: 63,
        icon: <img src={CouponIcon} alt="option" className="h-6 w-10 mt-4 mb-4" />,
        activeIcon: (
          <img src={CouIcon} alt="option" className="h-6 w-10 mt-4 mb-4 " />
        ),
        text: "Option",
        link: "/store-settings/options",
      },
      // { id: 63, text: "Options", link: "/store-settings/option" },
      { id: 64, text: "Alters", link: "/store-settings/alters" },
      { id: 65, text: "Taxes", link: "/store-settings/taxes" },
      // { id: 66, text: "Add Employee", link: "/store-settings/add-employee" },
      {
        id: 66,
        icon: <img src={CouponIcon} alt="Add Employee" className="h-6 w-10 mt-4 mb-4" />,
        activeIcon: (
          <img src={CouIcon} alt="option" className="h-6 w-10 mt-4 mb-4 " />
        ),
        text: "Add Employee",
        link: "/store-settings/addemployee",
      },
      { id: 67, text: "Receipt", link: "/store-settings/receipt" },
      { id: 68, text: "Inventory", link: "/store-settings/inventory" },
      { id: 69, text: "Register", link: "/store-settings/register" },
      { id: 70, text: "Quick Add", link: "/store-settings/quick-add" },
      { id: 71, text: "System Access", link: "/store-settings/system-access" },
    ],
  },
  
  {
    id: 12,
    icon: (
      <img src={ReportIcon} alt="store" className="h-6 w-10 mt-4 mb-4" />
    ),
    activeIcon: (
      <img
        src={ResportIcons}
        alt="active report"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Reporting",
    link: "/reporting", // You can set a default link or remove it
    className: "flex items-center gap-2",
  dropdownItems: [

    { id: 61, text: "Sales Report", link: "/store-settings/sales-report" },
    { id: 62, text: "Daily Total Report", link: "/store-settings/daily-total-report" },
    { id: 63, text: "Detailed Category Sale", link: "/store-settings/Details-category" },
    { id: 64, text: "Report by Sales Person", link: "/store-settings/report-sales-person" },
    { id: 65, text: "Check ID verification", link: "/store-settings/id-verification" },
    { id: 66, text: "Vendor Sales Report", link: "/store-settings/vendors-sales-reports" },
    { id: 67, text: "Credit Debit Sales Report", link: "/store-settings/credit-debit-sales" },
    { id: 68, text: "Instant PO Activity Report", link: "/store-settings/instant-activity" },
    { id: 69, text: "Top Seller - Overall Top 10", link: "/store-settings/overall-top" },
    { id: 70, text: "Flash Report", link: "/store-settings/flash-resigter" },
    { id: 71, text: "Vendor List", link: "/store-settings/vendors-list" },
    { id: 72, text: "Employee List", link: "/store-settings/employee-list" },
    { id: 73, text: "New Item Created Between", link: "/store-settings/item-create-between" },
    { id: 74, text: "Reorder Inventory", link: "/store-settings/recorder-inventory" },
    { id: 75, text: "Shift Summary", link: "/store-settings/shift-summary" },
  ]
  },
  


];

export default SideMenu;
