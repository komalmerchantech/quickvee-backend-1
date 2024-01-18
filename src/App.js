import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch, Link } from 'react-router-dom';
import "./index.css";
import { Layout } from "./Components/Layout/Index";

import DashboardMain from "./Components/Dashboard/DashboardMain";
import MainOrder from "./Components/Orders/MainOrder";
import MainCategory from "./Components/Category/MainCategory";
import EditCategory from "./Components/Category/EditCategory";
import MainPurchase from "./Components/PurchaseOrders/MainPurchase";
import MainAttributes from "./Components/Attributes/MainAttributes";
import MainProducts from "./Components/Products/MainProducts";
import MainCoupon from "./Components/Coupons/MainCoupon";
import MainVendors from "./Components/Vendors/MainVendors";
import MainTimesheet from "./Components/Timesheet/MainTimesheet";
import MainImportData from "./Components/ImportData/MainImportData";
import TopTenders from "./Components/Dashboard/TopTenders";
//import ProductTable from "./Components/Products/ProductTable";
import ProductEdit from "./Components/Products/ProductEdit";
import AddPo from "./Components/PurchaseOrders/AddPo";
import AddCoupon from "./Components/Coupons/AddCoupon";
// import MainStoreSetting from "./Components/StoreSetting/MainStoreSetting";
import MainReport from "./Components/ReportSetting/MainReport";
import MainAddEmployee from "./Components/StoreSetting/AddEmployee/MainAddEmployee";
import Permission from "./Components/StoreSetting/AddEmployee/Permission";
import MainSyastemAccess from "./Components/StoreSetting/SystemAccess/MainSystemAccess";
// import Info from "./Components/StoreSetting/SubSetting/Info";


import MainInventory from "./Components/StoreSetting/Inventory/MainInventory";

import MainTaxes from "./Components/StoreSetting/SubSetting/Taxes/MainTaxes";


// import Info from "./Components/StoreSetting/SubSetting/Info";

// import Info from "./Components/StoreSetting/SubSetting/Info";

import "./Styles/AttributesPage.css"

import MainStoreOption from "./Components/StoreSetting/StoreOption/MainStoreOption";
import MainStoreAlters from "./Components/StoreSetting/StoreAlters/MainStoreAlters";

import "./Styles/CategoryPage.css";
import "./Styles/AttributesPage.css"; 
import "./Styles/PurchasePage.css";
import "./Styles/TableOrderPage.css";
import "./Styles/MainInStore.css";
import "./Styles/MainOrderPage.css";
import "./Styles/CouponDiscount.css";
import "./Styles/ImportData.css";
import "./Styles/DailyDaterange.css";
// import "./Styles/EmployeeWorking.css";

import "./Styles/ReceiptMainpage.css";
import "./Styles/MainCatedetails.css";
import MainResigtersetting from "./Components/StoreSetting/ResigterSetting/MainResigtersetting";
import "./Styles/ResigterSettingdata.css";
import ReceiptMainpage from "./Components/StoreSetting/Receipt/ReceiptMainpage";
import DailyTtlReport from "./Components/Reporting/DailyReport/DailyTtlReport";
import MainCatedetails from "./Components/Reporting/CategoryDetails/MainCatedetails";

import InstantActvity from "./Components/Reporting/InstantPo/InstantActvity";
import EmployeeWorking from "./Components/Reporting/EmployeeWorkingHours/EmployeeWorking";
import MainSiftSummary from "./Components/Reporting/SiftSummary/MainSiftSummary";

import CheckIDVerifyMain from "./Components/Reporting/CheckIDVerify/CheckIDVerifyMain";

import PaymentMethodList from "./Components/Reporting/PaymentMehodDetail/PaymentMethodList";
import PaymentMethodReport from "./Components/Reporting/PaymentMehodDetail/PaymentMethodReport";

import NewItemCreatedBetweenMain from "./Components/Reporting/NewItemCreatedBetween/NewItemCreatedBetweenMain";
import ReorderInventoryMain from "./Components/Reporting/ReorderInventory/ReorderInventoryMain";

import TopSallerReport from "./Components/Reporting/TopSaller/TopSallerReport";

import EmployeeList from "./Components/Reporting/Employelist/EmployeelistReport";
import MainItem from "./Components/Reporting/ItemType/MainItem";
import MainItemSales from "./Components/Reporting/ItemSales/MainItemSales";
import MainEmployeelist from "./Components/Reporting/Employelist/MainEmployeelist";
import MainTaxesReport from "./Components/Reporting/Taxes/MainTaxesReport"
import MainDefaults from "./Components/Defaults/MainDefaults";








function App() {
  return (
 
       <Routes>
        <Route exact path="/" element={<Layout />}>
          {/* <Route exact path="/" element={<DashboardMain />} /> */}
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/order" element={<MainOrder />} />
          <Route path="/category" element={<MainCategory />} />
          <Route path="/category/edit-category/:categoryCode" element={<EditCategory />} />
          <Route path="/purchase-data" element={<MainPurchase />} />
          <Route path="/products" element={<MainProducts />} />
          <Route path="/attributes" element={<MainAttributes />} />
          <Route path="/import-data" element={<MainImportData />} />
          <Route path="/coupons" element={<MainCoupon />} />
          <Route path="/vendors" element={<MainVendors />} />
          <Route path="/timesheet" element={<MainTimesheet />} />
          <Route exact path="/toptraders" element={<TopTenders />} />
          <Route exact path="/productedit" element={<ProductEdit />} />
          <Route exact path="/addpurchaseOrder" element={<AddPo />} />
          <Route exact path="/addCoupon" element={<AddCoupon />} />
          {/* <Route path ="/store-setting" element ={<MainStoreSetting />} /> */}
          <Route path ="/report" element ={<MainReport />} />
          <Route path="/store-settings/taxes" element={<MainTaxes />} />

          {/* <Route path="/store-settings/info"  element={<MainStoreOption />} /> */}
          <Route path="/store-settings/options"  element={<MainStoreOption />} />
          <Route path="/store-settings/addemployee"  element={<MainAddEmployee />} />


          <Route path="/store-settings/system-access"  element={<MainSyastemAccess />} />


          {/* /store-settings/inventory */}
          <Route path="/store-reporting/inventory"  element={<MainInventory />} />

          <Route path="/store-reporting/Alters"  element={<MainStoreAlters />} />

          <Route path="/store-reporting/register" element={<MainResigtersetting />} />
          <Route path="/store-reporting/receipt" element={<ReceiptMainpage />} />
          <Route path="/store-reporting/daily-total-report" element={<DailyTtlReport />}/>
          <Route path="/store-reporting/overall-top" element={<TopSallerReport />}/>
          <Route path="/store-reporting/Details-category" element={<MainCatedetails />}/>

          <Route path="/store-reporting/instant-activity" element={<InstantActvity />} />
          <Route path ="/store-reporting/employee-working-hours" element={<EmployeeWorking />} />
          <Route path ="/store-reporting/shift-summary" element={<MainSiftSummary />} />
         

          <Route path="/store-reporting/employee-list" element={<MainEmployeelist />}/>

        


          <Route path="/store-reporting/permission/:employee_id"  element={<Permission />} />
          {/* <Route path="/store-reporting/system-access"  element={<MainSyastemAccess />} /> */}
          <Route path="/store-reporting/id-verification" element={<CheckIDVerifyMain />}/>
          <Route path="/store-reporting/order-type" element={<MainItem />} />
          <Route path="/store-reporting/item-sales" element={<MainItemSales />} />
          <Route path="/store-reporting/taxes" element={<MainTaxesReport  />} />



          <Route path="/store-settings/payment-method-detail-report" element={<PaymentMethodReport />}/>

          <Route path="/store-settings/item-create-between" element={<NewItemCreatedBetweenMain />}/>

          <Route path="/store-settings/recorder-inventory" element={<ReorderInventoryMain />}/>


          <Route path="/defaults" element={<MainDefaults />}/>


          

        </Route>
      </Routes>
  
  );
}
export default App;
