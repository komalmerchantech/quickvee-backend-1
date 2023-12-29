import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";

import attributesReducer from "../features/Attributes/attributesSlice";

import addEmployeeReducer from "../features/StoreSettings/AddEmployee/AddEmployeeSlice";

import inStoreOrderReducer from "../features/Orders/inStoreOrderSlice";
import onlineStoreOrderReducer from "../features/Orders/onlineStoreOrderSlice";

import settingstoreoptionReducer from "../features/StoreSettingOption/StoreSettingOptionSlice";

import taxesReducer from "../features/Taxes/taxesSlice"



const store = configureStore({
  reducer: {
    categories: categoriesReducer,

    attributes: attributesReducer,

    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,

    employeelistData:addEmployeeReducer,

    settingstoreoption: settingstoreoptionReducer,

    taxes: taxesReducer

  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;