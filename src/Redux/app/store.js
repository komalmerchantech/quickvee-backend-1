import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";

import attributesReducer from "../features/Attributes/attributesSlice";

import addEmployeeReducer from "../features/StoreSettings/AddEmployee/AddEmployeeSlice";

import inStoreOrderReducer from "../features/Orders/inStoreOrderSlice";
import onlineStoreOrderReducer from "../features/Orders/onlineStoreOrderSlice";



import settingstoreoptionReducer from "../features/StoreSettingOption/StoreSettingOptionSlice";

import systemAccessListingReducer from "../features/SystemAccess/systemAccessSlice";



import couponListReducer from "../features/Coupon/couponSlice";


import inventoryListingReducer from "../features/Inventory/InventorySlice";


import taxesReducer from "../features/Taxes/taxesSlice"

import settingstorealtersReducer from "../features/SettingStoreAlters/SettingStoreAltersSlice"

import SettingReceiptReducer from "../features/StoreSettings/SettingsReceipt/SettingsReceiptSlice";
import PurchaseOrderReducer from "../features/PurchaseOrder/purchaseOrderSlice"
import CheckIDVerifyListReducer from "../features/Reports/CheckIDVerify/CheckIDVerifySlice";
import DailyReportList from "../features/DailyReport/dailyreportSlice";
import EmployeeListReducer from "../features/EmployeeList/EmployeeListSlice";

import PaymentMethodDetailReducer from "../features/PaymentMethodReport/PaymentMethodSlice";

import TopsallerReducer from "../features/TopSaller/topsallerSlice";
import instantactivitySlice from "../features/InstantActivity/instantactivitySlice";

import RegisterSettingReducer from "../features/StoreSettings/RegisterSettings/RegisterSettingsSlice";

import NewItemCreatedBtnListReducer from "../features/Reports/NewItemCreatedBetweenSlice/NewItemCreatedBetweenSlice";
import ReorderInventoryListReducer from "../features/Reports/ReorderInventory/ReorderInventorySlice";


import OrderTypeReducer from "../features/OrderType/OrderTypeSlice";

import TaxesreportSliceReducer from "../features/TaxesReport/taxesreportSlice";
import DefaultsSliceReducer from "../features/Defaults/defaultsSlice";



const store = configureStore({
  reducer: {
    categories: categoriesReducer,

    attributes: attributesReducer,
    purchase:PurchaseOrderReducer,

    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,

    employeelistData:addEmployeeReducer,


    couponList:couponListReducer,
    settingStoreOption:settingstoreoptionReducer,

    taxes: taxesReducer,

    systemAccessList:systemAccessListingReducer,

    inventoryDataList:inventoryListingReducer,

    settingstoreoption: settingstoreoptionReducer,
    settingstorealters: settingstorealtersReducer,



    SettingReceiptList: SettingReceiptReducer,
    CheckIDVerifyList:CheckIDVerifyListReducer,
    dailyreport:DailyReportList,

   //reducer for payment method  report
   paymentDetailReport:PaymentMethodDetailReducer,


    NewItemCreatedBtnList:NewItemCreatedBtnListReducer,
    ReorderInventoryList:ReorderInventoryListReducer,


    topsaller:TopsallerReducer,
    instantactivity:instantactivitySlice,

    RegisterSettingsData: RegisterSettingReducer,
   


   //Employee List Data
    employeeDataList :EmployeeListReducer,

    //Order Type
    orderTypeList:OrderTypeReducer,

    taxesreport:TaxesreportSliceReducer,

    defaults: DefaultsSliceReducer,


  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;