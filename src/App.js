import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Layout } from "./Components/Layout/Index";

import DashboardMain from "./Components/Dashboard/DashboardMain";
import MainOrder from "./Components/Orders/MainOrder";
import MainCategory from "./Components/Category/MainCategory";
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
import MainStoreSetting from "./Components/StoreSetting/MainStoreSetting";
import MainReport from "./Components/ReportSetting/MainReport";
import Info from "./Components/StoreSetting/SubSetting/Info";
import "./Styles/CategoryPage.css";
import "./Styles/AttributesPage.css"; 
import "./Styles/PurchasePage.css";
import "./Styles/TableOrderPage.css";
import "./Styles/MainInStore.css";
import "./Styles/MainOrderPage.css";
import "./Styles/CouponDiscount.css"
import Setup from "./Components/StoreSetting/SubSetting/Setup";
import Alters from "./Components/StoreSetting/SubSetting/Alters";
import AddEmployee from "./Components/StoreSetting/SubSetting/AddEmployee";
import Receipt from "./Components/StoreSetting/SubSetting/Receipt";

import Resigter from "./Components/StoreSetting/SubSetting/Resigter";
import Inventory from "./Components/StoreSetting/SubSetting/Inventory";
import QuickAdd from "./Components/StoreSetting/SubSetting/QuickAdd";
import Options from "./Components/StoreSetting/SubSetting/Options";
import SystemAccess from "./Components/StoreSetting/SubSetting/SystemAccess";





function App() {
  return (
 
       <Routes>
        <Route exact path="/" element={<Layout />}>
          {/* <Route exact path="/" element={<DashboardMain />} /> */}
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/order" element={<MainOrder />} />
          <Route path="/category" element={<MainCategory />} />
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
          <Route path ="/store-setting" element ={<MainStoreSetting />} />
          <Route path="/store-settings/info" element={<Info />} />
          <Route path ="/report" element ={<MainReport />} />

          <Route path="/store-settings/setup"  element={<Setup/>} />
          <Route path="/store-settings/option"  element={<Options />} />

          <Route path="/store-settings/alters"  element={<Alters />} />

          <Route path="/store-settings/add-employee"  element={<AddEmployee />} />

          <Route path="/store-settings/receipt"  element={<Receipt />} />

          <Route path="/store-settings/inventory"  element={<Inventory/>} />

          <Route path="/store-settings/register"  element={<Resigter/>} />

          <Route path="/store-settings/quick-add"  element={<QuickAdd/>} />
          <Route path="/store-settings/system-access"  element={<SystemAccess/>} />

        
        </Route>
      </Routes>
  
  );
}
export default App;
