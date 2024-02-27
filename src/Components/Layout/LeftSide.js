import React from "react";

import DashboardMain from "../Dashboard/DashboardMain";
import MainOrder from "./../Orders/MainOrder";
//import MainProduct from '../Category/MainCategory';
import MainPurchase from "../PurchaseOrders/MainPurchase";
import MainAttributes from "../Attributes/MainAttributes";
import MainCategory from "../Category/MainCategory";
import MainCoupon from "../Coupons/MainCoupon";
import ProductEdit from "../Products/ProductEdit";
import MainVendors from "../Vendors/MainVendors";
import MainTimesheet from "../Timesheet/MainTimesheet";
import MainImportData from "../ImportData/MainImportData";
import MainProducts from "../Products/MainProducts";
// import MainStoreSetting from '../StoreSetting/MainStoreSetting';
import MainStoreOption from "../StoreSetting/StoreOption/MainStoreOption";
import EditCategory from "../Category/EditCategory";
import TopTenders from "../Dashboard/TopTenders";

import Info from "../StoreSetting/Info";
import Setup from "../StoreSetting/Setup";
import MainStoreAlters from "../StoreSetting/StoreAlters/MainStoreAlters";
import MainTaxes from "../StoreSetting/Taxes/MainTaxes";
import MainInventory from "../StoreSetting/Inventory/MainInventory";
import MainResigtersetting from "../StoreSetting/ResigterSetting/MainResigtersetting";
import MainSyastemAccess from "../StoreSetting/SystemAccess/MainSystemAccess";
import DailyTtlReport from "../Reporting/DailyReport/DailyTtlReport";
import MainCatedetails from "../Reporting/CategoryDetails/MainCatedetails";
import MainSalesPerson from "../Reporting/SalesByPerson/MainSalesPerson";

import CheckIDVerifyMain from "../Reporting/CheckIDVerify/CheckIDVerifyMain";
import InstantActvity from "../Reporting/InstantPo/InstantActvity";
import TopSallerReport from "../Reporting/TopSaller/TopSallerReport";
import EmployeeWorking from "../Reporting/EmployeeWorkingHours/EmployeeWorking";
import MainSiftSummary from "../Reporting/SiftSummary/MainSiftSummary";
import PaymentMethodReport from "../Reporting/PaymentMehodDetail/PaymentMethodReport";
import MainItem from "../Reporting/ItemType/MainItem";

import MainTaxesReport from "../Reporting/Taxes/MainTaxesReport";
import CurrentInventoryValue from "../Reporting/CurrentInventoryValue/CurrentInventoryValue";

// import MainTaxesReport from "../Reporting/Taxes/MainTaxesReport";

import MainTaxReporting from "../Reporting/Taxes/MainTaxReporting";
import MainAddEmployee from "../StoreSetting/AddEmployee/MainAddEmployee";
import ReceiptMainpage from "../StoreSetting/Receipt/ReceiptMainpage";
import MainItemSales from "../Reporting/ItemSales/MainItemSales";
import NewItemCreatedBetweenList from "../Reporting/NewItemCreatedBetween/NewItemCreatedBetweenList";
import NewItemCreatedBetweenMain from "../Reporting/NewItemCreatedBetween/NewItemCreatedBetweenMain";
import { useEffect } from "react";
import Permission from "../StoreSetting/AddEmployee/Permission";
import OrderSummaryDetails from "../Reporting/SalesByPerson/MainOrderSumaaryDetails/OrderSummaryDetails";
import VendorListMain  from "../Reporting/VendorList/VendorListMain";
import VendorSalesReportMain from "../Reporting/VendorSalesReport/VendorSalesReportMain";
import OrderRefundReportMain from "../Reporting/OrderRefundReport/OrderRefundReportMain";
import ReorderInventoryMain from "../Reporting/ReorderInventory/ReorderInventoryMain";
import EditVendors from "../Vendors/EditVendors";
import SingleVendorsDetail from "../Vendors/SingleVendorsDetail";
import AddProducts from "../Products/AddProducts"
import MainLoayalty from "../LoyaltyProgram/MainLoayalty";
import EditCoupon from "../Coupons/EditCoupon";
//  import OrderSummeryPage from "../Reporting/orderSummeryPage/orderSummery";


// import MainEmployee from "../Reporting/EmployeeWorkingHours/MainEmployee";

// import MainInvDuplicates from '../InventoryDuplicates/MainInvDuplicates';

const LeftSide = ({ visible }) => {

  // useEffect(() => {
    
  //   console.log("hello")
  //     return () => {
       
  //     }
  //   }, )


  return (
    <>
      <div className="w-full">
        <div className="">
          {visible === "dashboard" && <DashboardMain />}
          {visible === "order" && <MainOrder />}
          {visible === "category" && <MainCategory />}
          {visible === "purchase-data" && <MainPurchase />}
          {visible === "attributes" && <MainAttributes />}
          {visible === "products" && <MainProducts />}

          {visible === "coupons" && <MainCoupon />}
          {visible === "coupons-edit-cop" && <EditCoupon />}
          {visible === "vendors" && <MainVendors />}
          {visible === "timesheet" && <MainTimesheet />}
          {visible === "import-data" && <MainImportData />}
          {visible === "loyalty-program" && <MainLoayalty />}
          {visible === "store-setting" && <MainStoreOption />}
          {visible === "store-setting" && <MainStoreOption />}
          {visible === "category-edit-cat" && <EditCategory />}
          {visible === "product-edit-cat" && <ProductEdit />}

          {visible === "toptraders" && <TopTenders />}
          {visible === "productedit" && <ProductEdit />}
          {visible === "product-add" && <AddProducts />}

          {visible === "info" && <Info />}
          {visible === "setup" && <Setup />}
          {visible === "Alters" && <MainStoreAlters />}
          {visible === "options" && <MainStoreOption />}
          {visible === "taxes" && <MainTaxes />}
          {visible === "inventory" && <MainInventory />}
          {visible === "register" && <MainResigtersetting />}
          {visible === "system-access" && <MainSyastemAccess />}
          {visible === "daily-total-report" && <DailyTtlReport />}
          {visible === "Details-category" && <MainCatedetails />}
          {visible === "report-sales-person" && <MainSalesPerson />}
          {visible === "id-verification" && <CheckIDVerifyMain />}
          {/* {visible === "credit-debit-sales" && < />} */}
          {visible === "instant-activity" && <InstantActvity />}
          {visible === "overall-top" && <TopSallerReport />}
          {visible === "employee-working-hours" && <EmployeeWorking />}
          {visible === "shift-summary" && <MainSiftSummary />}
          {visible === "payment-method-details" && <PaymentMethodReport />}
          {visible === "order-type" && <MainItem />}

          {visible === "taxes-report" && <MainTaxesReport />}
          {visible === "current-inventory-value" && <CurrentInventoryValue />}
          {visible === "addemployee" && <MainAddEmployee />}
          {visible === "receipt" && <ReceiptMainpage />}
          {visible === "item-sales" && <MainItemSales /> }
          {visible === "item-create-between" && <NewItemCreatedBetweenMain /> }
          {visible === "permission" && <Permission />}
          {visible === "order-summary" && <OrderSummaryDetails />}
          {visible === "vendors-list" && <VendorListMain />}
          {visible === "edit-vendor" && <EditVendors />}
          {visible === "vendor-details" && <SingleVendorsDetail />}

          
          
          {/* {visible === "order-summary" && <OrderSummeryPage />} */}
          

          
          {visible === "recorder-inventory" && <ReorderInventoryMain />}
          
          {visible === "vendors-sales-reports" && <VendorSalesReportMain />}
          {visible === "order-refund-report" && <OrderRefundReportMain />}
         


        </div>
      </div>
    </>
  );
};

export default LeftSide;
