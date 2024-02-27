import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import "./index.css";
import Layout from "./Components/Layout/Index";

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

import MainTaxes from "./Components/StoreSetting/Taxes/MainTaxes";

// import Info from "./Components/StoreSetting/SubSetting/Info";

// import Info from "./Components/StoreSetting/SubSetting/Info";

import "./Styles/AttributesPage.css";

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
import "./Styles/Table.css";
import "./Styles/DefaultsPage.css";

import "./Styles/ReceiptMainpage.css";
import "./Styles/MainCatedetails.css";
import MainResigtersetting from "./Components/StoreSetting/ResigterSetting/MainResigtersetting";
import "./Styles/ResigterSettingdata.css";
import ReceiptMainpage from "./Components/StoreSetting/Receipt/ReceiptMainpage";

import InstantActvity from "./Components/Reporting/InstantPo/InstantActvity";
import EmployeeWorking from "./Components/Reporting/EmployeeWorkingHours/EmployeeWorking";
import MainSiftSummary from "./Components/Reporting/SiftSummary/MainSiftSummary";

import CheckIDVerifyMain from "./Components/Reporting/CheckIDVerify/CheckIDVerifyMain";

import PaymentMethodReport from "./Components/Reporting/PaymentMehodDetail/PaymentMethodReport";

import NewItemCreatedBetweenMain from "./Components/Reporting/NewItemCreatedBetween/NewItemCreatedBetweenMain";
import ReorderInventoryMain from "./Components/Reporting/ReorderInventory/ReorderInventoryMain";

import MainItem from "./Components/Reporting/ItemType/MainItem";
import MainItemSales from "./Components/Reporting/ItemSales/MainItemSales";
import MainEmployeelist from "./Components/Reporting/Employelist/MainEmployeelist";
import MainTaxesReport from "./Components/Reporting/Taxes/MainTaxesReport";
import MainSalesPerson from "./Components/Reporting/SalesByPerson/MainSalesPerson";
// import MainInvDuplicates from "./Components/InventoryDuplicates/MainInvDuplicates";
import Main from "./Main";
import "./Styles/OrderSummaryDetails.css";
import "./Styles/Table.css"


// import InventoryExport from "./Components/InventoryExport/MainInventoryExport";




function App() {
  return (
    <Routes>
      
      <Route exact path="/" element={<Main />} />
      {/* <Route exact path="/" element={<Layout />} /> */}

      {/* <Route
        exact
        path="/users/view/unapprove"
        element={<Main visible={"multimerchant"} />}
      /> */}
      <Route exact path="/dashboard" element={<Main visible={"dashboard"} />} />
      <Route exact path="/order" element={<Main visible={"order"} />} />
      <Route exact path="/category" element={<Main visible={"category"} />} />
      <Route exact path="/products" element={<Main visible={"products"} />} />
      <Route
        exact
        path="/purchase-data"
        element={<Main visible={"purchase-data"} />}
      />
      <Route
        exact
        path="/attributes"
        element={<Main visible={"attributes"} />}
      />



      <Route
        exact
        path="/import-data"
        element={<Main visible={"import-data"} />}
      />
      <Route
        exact
        path="/loyalty-program"
        element={<Main visible={"loyalty-program"} />}
      />
      <Route exact path="/coupons" element={<Main visible={"coupons"} />} />
      <Route
        exact
        path="/coupons/edit-coupons/:couponsCode"
        element={<Main visible={"coupons-edit-cop"} />} />
      <Route exact path="/vendors" element={<Main visible={"vendors"} />} />
      <Route exact path="/vendors/edit-vendor/:code" element={<Main visible={"edit-vendor"} />} />
      <Route exact path="/vendors/vendor-details/:code" element={<Main visible={"vendor-details"} />} />
      <Route
        exact
        path="/category/edit-category/:categoryCode"
        element={<Main visible={"category-edit-cat"} />} />
      
     
      <Route exact path="/timesheet" element={<Main visible={"timesheet"} />} />
      <Route
        exact
        path="/toptraders"
        element={<Main visible={"toptraders"} />}
      />
      <Route
        exact
        path="/productedit"
        element={<Main visible={"productedit"} />}
      />
      
      <Route
        exact
        path="/product-add"
        element={<Main visible={"product-add"} />}
      />
   
   

 
      <Route
        exact
        path="/store-settings/info"
        element={<Main visible={"info"} />}
      />
      <Route
        exact
        path="/store-settings/setup"
        element={<Main visible={"setup"} />}
      />

      <Route
        exact
        path="/store-settings/Alters"
        element={<Main visible={"Alters"} />}
      />
      <Route
        exact
        path="/store-settings/options"
        element={<Main visible={"options"} />}
      />


      <Route
        path="/store-settings/permission/:employee_id"
        element={<Main visible={"permission"} />}
      />


      <Route
        path="/store-reporting/order-summary/:order_id"
        element={<Main visible={"order-summary"} />}
      />


      <Route
        exact
        path="/store-settings/taxes"
        element={<Main visible={"taxes"} />}
      />
      <Route
        exact
        path="/store-settings/system-access"
        element={<Main visible={"system-access"} />}
      />




      <Route
        exact
        path="/store-settings/inventory"
        element={<Main visible={"inventory"} />}
      />

      <Route
        exact
        path="/store-settings/vendors-list"
        element={<Main visible={"vendors-list"} />}
      />



      <Route
        exact
        path="/store-reporting/vendors-sales-reports"
        element={<Main visible={"vendors-sales-reports"} />}
      />

      <Route
        exact
        path="/store-settings/order-refund-report"
        element={<Main visible={"order-refund-report"} />}
      />

      <Route
        exact
        path="/store-settings/register"
        element={<Main visible={"register"} />}
      />
      <Route
        exact
        path="/store-reporting/inventory"
        element={<Main visible={"inventory"} />}
      />
      <Route
        exact
        path="/store-reporting/daily-total-report"
        element={<Main visible={"daily-total-report"} />}
      />
      <Route
        exact
        path="/store-reporting/Details-category"
        element={<Main visible={"Details-category"} />}
      />
      <Route
        exact
        path="/store-reporting/report-sales-person"
        element={<Main visible={"report-sales-person"} />}
      />
      <Route
        exact
        path="/store-reporting/order-summary:Sales"
        element={<Main visible={"order-summary"} />}
      />

      <Route
        exact
        path="/store-reporting/id-verification"
        element={<Main visible={"id-verification"} />}
      />

      <Route
        exact
        path="store-reporting/credit-debit-sales"
        element={<Main visible={"credit-debit-sales"} />}
      />
      <Route
        exact
        path="/store-reporting/instant-activity"
        element={<Main visible={"instant-activity"} />}
      />
      <Route
        exact
        path="/store-reporting/overall-top"
        element={<Main visible={"overall-top"} />}
      />
      <Route
        exact
        path="/store-reporting/flash-resigter"
        element={<Main visible={"flash-resigter"} />}
      />
      <Route
        exact
        path="/store-reporting/vendors-list"
        element={<Main visible={"vendors-list"} />}
      />
      <Route
        exact
        path="/store-reporting/employee-list"
        element={<Main visible={"employee-list"} />}
      />
      <Route
        exact
        path="/store-reporting/recorder-inventory"
        element={<Main visible={"recorder-inventory"} />}
      />
      <Route
        exact
        path="/store-reporting/shift-summary"
        element={<Main visible={"shift-summary"} />}
      />
      <Route
        exact
        path="/store-reporting/payment-method-details"
        element={<Main visible={"payment-method-details"} />}
      />
      <Route
        exact
        path="/store-reporting/order-type"
        element={<Main visible={"order-type"} />}
      />
      <Route
        exact
        path="/store-reporting/taxes-report"
        element={<Main visible={"taxes-report"} />}
      />
      <Route
        exact
        path="/store-settings/addemployee"
        element={<Main visible={"addemployee"} />}
      />
      <Route
        exact
        path="/store-settings/receipt"
        element={<Main visible={"receipt"} />}
      />
      <Route
        exact
        path="/store-reporting/employee-working-hours"
        element={<Main visible={"employee-working-hours"} />}
      />
      <Route
        exact
        path="/store-reporting/vendors-sales-reports"
        element={<Main visible={"vendors-sales-reports"} />}
      />
      <Route
        exact
        path="/store-reporting/item-sales"
        element={<Main visible={"item-sales"} />}
      />
      <Route
        exact
        path="/store-reporting/item-create-between"
        element={<Main visible={"item-create-between"} />}
      />

      {/* multiple users dashbaord */}

      <Route
        exact
        path="/users/view/unapprove/label"
        element={<Main visible={"label"} />}
      />

      {/* ---------------------------------------- */}
      <Route 
        exact
        path="/users/manager_view"
        element={<Main visible={"manager_view"} />}
      />
      <Route
        exact
        path="/users/view/unapprove"
        element={<Main visible={"unverified"} />}
      />
       <Route
        exact
        path="/users/customer"
        element={<Main visible={"customer"} />}
      />
      <Route
        exact
        path="/users/admin"
        element={<Main visible={"admin"} />}
      />
         <Route
        exact
        path="/users/view/approve"
        element={<Main visible={"verified"} />}
      />
       <Route
        exact
        path="/users/editCustomer/:id"
        element={<Main visible={"editCustomer"} />}
      />
       <Route  
        exact
        path="/users/addAdmin"
        element={<Main visible={"addAdmin"} />}
      />
       <Route  
        exact
        path="/users/editAdmin/:id"
        element={<Main visible={"editAdmin"} />}
      />
      <Route   
        exact
        path="/users/addMerchant"
        element={<Main visible={"addMerchant"} />}
      />
      <Route   
        exact
        path="/users/editMerchant/:id"
        element={<Main visible={"editMerchant"} />}
      />
      <Route
        exact
        path="/users/editAdmin/:id"
        element={<Main visible={"editAdmin"} />}
      />
      <Route
        exact
        path="/users/addmerchant"
        element={<Main visible={"addMerchant"} />}
      />
      <Route
        exact
        path="/users/editMerchant/:id"
        element={<Main visible={"editMerchant"} />}
      />
      {/* ------------------------------------ */}
      <Route
        exact
        path="/users/view/unapprove/newsletter"
        element={<Main visible={"newsletter"} />}
      />
      



      <Route
        exact
        path="/users/view/unapprove/store-order"
        element={<Main visible={"store-order"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/order-count"
        element={<Main visible={"order-count"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/menu/defaults"
        element={<Main visible={"defaults"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/release_apk"
        element={<Main visible={"release_apk"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/inverntory-duplicate"
        element={<Main visible={"inverntory-duplicate"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/category-duplicate"
        element={<Main visible={"category-duplicate"} />}
      />

      <Route
        exact
        path="/users/view/unapprove/product-duplicate"
        element={<Main visible={"product-duplicate"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/create_permission"
        element={<Main visible={"create_permission"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/invertory-export"
        element={<Main visible={"invertory-export"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/merchant-details"
        element={<Main visible={"merchant-details"} />}
      />
      <Route
        exact
        path="/users/view/unapprove/need-help"
        element={<Main visible={"need-help"} />}
      />
      <Route exact path="/store-reporting/current-inventory-value" element={<Main visible={"current-inventory-value"} />} />

      {/* <Route exact path="/" element={<DashboardMain />} /> */}

      <Route exact path="/toptraders" element={<TopTenders />} />

      {/* <Route path="/report" element={<MainReport />} /> */}
      {/* <Route path="/store-settings/taxes" element={<MainTaxes />} /> */}

      {/* <Route path="/store-settings/info"  element={<MainStoreOption />} /> */}
      {/* <Route path="/store-settings/options" element={<MainStoreOption />} /> */}
      {/* <Route

      <Route exact path="/users/view/unapprove" element={<Main  visible={"multimerchant"} />} />
      <Route exact path="/dashboard" element={<Main  visible={"dashboard"} />} />
      <Route exact path="/order" element={<Main  visible={"order"} />} />
      <Route exact path="/category" element={<Main  visible={"category"} />} />
      <Route exact path="/products" element={<Main  visible={"products"} />} />
      <Route exact path="/purchase-data" element={<Main  visible={"purchase-data"} />} />
      <Route exact path="/attributes" element={<Main  visible={"attributes"} />} />
      <Route exact path="/import-data" element={<Main  visible={"import-data"} />} />
      <Route exact path="/coupons" element={<Main  visible={"coupons"} />} />
      <Route exact path="/vendors" element={<Main  visible={"vendors"} />} />
      <Route exact path="/category/edit-category/:categoryCode" element={<Main  visible={"category-edit-cat"} />} />
      <Route exact path="/timesheet" element={<Main  visible={"timesheet"} />} />
      <Route exact path="/toptraders" element={<Main  visible={"toptraders"} />} />
      <Route exact path="/productedit" element={<Main  visible={"productedit"} />} />
      <Route exact path="/productedit" element={<Main  visible={"productedit"} />} />
      <Route exact path="/store-settings/info" element={<Main  visible={"info"} />} />
      <Route exact path="/store-settings/setup" element ={<Main visible={"setup"} />} />
   
      <Route exact path="/store-settings/Alters" element ={<Main visible={"Alters"} />} />
      <Route exact path="/store-settings/options" element ={<Main visible={"options"} />} />
      <Route exact path="/store-settings/taxes" element ={<Main visible={"taxes"} />} />
      <Route exact path="/store-settings/system-access" element ={<Main visible={"system-access"} />} />
      <Route exact path="/store-settings/inventory" element ={<Main visible={"inventory"} />} />
      <Route exact path="/store-reporting/register" element ={<Main visible={"register"} />} />
      <Route exact path="/store-reporting/inventory" element ={<Main visible={"inventory"} />} />
      <Route exact path="/store-reporting/daily-total-report" element ={<Main visible={"daily-total-report"} />} />
     <Route exact path="/store-reporting/Details-category" element ={<Main visible={"Details-category"} />} />
     <Route exact path="/store-reporting/report-sales-person" element ={<Main visible={"report-sales-person"} />} />
     <Route exact path="/store-reporting/id-verification" element ={<Main visible={"id-verification"} />} />
     
     <Route exact path="store-reporting/credit-debit-sales" element ={<Main visible={"credit-debit-sales"} />} />
     <Route exact path="/store-reporting/instant-activity" element ={<Main visible={"instant-activity"} />} />
     <Route exact path="/store-reporting/overall-top" element ={<Main visible={"overall-top"} />} />
     <Route exact path="/store-reporting/flash-resigter" element ={<Main visible={"flash-resigter"} />} />
     <Route exact path="/store-reporting/vendors-list" element ={<Main visible={"vendors-list"} />} />
     <Route exact path="/store-reporting/employee-list" element ={<Main visible={"employee-list"} />} />
     
     <Route exact path="/store-reporting/recorder-inventory" element ={<Main visible={"recorder-inventory"} />} />
     
     <Route exact path="/store-reporting/shift-summary" element ={<Main visible={"shift-summary"} />} />
     <Route exact path="/store-settings/payment-method-detail-report" element={<Main visible={"payment-method-detail-report"} />} />
     <Route exact path ="/store-reporting/order-type" element={<Main visible={"order-type"} />} />
     <Route exact path="/store-reporting/taxes" element={<Main visible={"taxes"} />} />

   

     {/* multiple users dashbaord */}

      <Route exact path="/users/view/unapprove/label" element={<Main visible={"label"} />} />
      <Route exact path="/users/view/unapprove/newsletter" element={<Main visible={"newsletter"} />} />
      <Route exact path="/users/view/unapprove/store-order" element={<Main visible={"store-order"} />} />
      <Route exact path="/users/view/unapprove/order-count" element={<Main visible={"order-count"} />} />
      <Route exact path="/users/view/unapprove/menu/defaults" element={<Main visible={"defaults"} />} />
      <Route exact path="/users/view/unapprove/menu/defaults/edit-defaults/:defaultsCode" element={<Main visible={"edit-defaults"} />} />
      <Route exact path="/users/view/unapprove/release_apk" element={<Main visible={"release_apk"} />} />
      <Route exact path="/users/view/unapprove/inverntory-duplicate" element={<Main visible={"inverntory-duplicate"} />} />
      <Route exact path="/users/view/unapprove/category-duplicate" element={<Main visible={"category-duplicate"} />} />

      <Route exact path="/users/view/unapprove/product-duplicate" element={<Main visible={"product-duplicate"} />} />
      <Route exact path="/users/view/unapprove/permission" element={<Main visible={"permission"} />} />
      <Route exact path="/users/view/unapprove/invertory-export" element={<Main visible={"invertory-export"} />} />
      <Route exact path="/users/view/unapprove/merchant-details" element={<Main visible={"merchant-details"} />} />
      <Route exact path="/users/view/unapprove/need-help" element={<Main visible={"need-help"} />} />





      {/* <Route exact path="/" element={<DashboardMain />} /> */}



      {/* <Route path="/store-settings/info"  element={<MainStoreOption />} /> */}


      {/* /store-settings/inventory */}
      {/* <Route path="/store-reporting/inventory" element={<MainInventory />} /> */}

      {/* <Route
          path="/store-reporting/employee-list"
          element={<MainEmployeelist />}
        /> */}

      {/* <Route
          path="/store-reporting/permission/:employee_id"
          element={<Permission />}
        /> */}

      {/* <Route
          path="/store-reporting/id-verification"
          element={<CheckIDVerifyMain />}
        /> */}
      {/* <Route path="/store-reporting/order-type" element={<MainItem />} />
        <Route path="/store-reporting/item-sales" element={<MainItemSales />} />
        <Route path="/store-reporting/taxes" element={<MainTaxesReport />} /> */}

      {/* <Route
          path="/store-settings/payment-method-detail-report"
          element={<PaymentMethodReport />}
        /> */}

      {/* <Route
          path="/store-settings/item-create-between"
          element={<NewItemCreatedBetweenMain />}
        /> */}
      {/* 
        <Route
          path="/store-settings/recorder-inventory"
          element={<ReorderInventoryMain />}
        /> */}
    </Routes>



  );
}
export default App;