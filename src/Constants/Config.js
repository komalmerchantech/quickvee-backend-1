
// All api calls are initialized in this component for this application
//remove unwanted and credentials of other app

module.exports = Object.freeze({
  BASE_URL: 'https://sandbox.quickvee.com/',




  // Categories API calls
  ADD_CATOGRY: "CategoryReactapi/addnewcolln",
  UPDATE_CATOGRY: "CategoryReactapi/updateCategory",
  LIST_ALL_CATEGORIES: "CategoryReactapi/category_list",
  DELETE_SINGLE_CATEGORIE: "CategoryReactapi/delete_category",
  PRODUCT_LIST_BY_CATEGORY: "CategoryReactapi/product_list_by_category",
  CATEGORIE_STATUS: "CategoryReactapi/categoryapi_status",
  CATEGORIE_BANNER_REMOVE: "CategoryReactapi/delete_banner_image",
  EDIT_CATOGRY_DATA: "CategoryReactapi/category_data",



  // Defaults API Calls 
  LIST_ALL_Defaults: "DefaultReactapi/Default_list",
  ADD_DEFAULTS: "DefaultReactapi/AddDefaultMenu",
  EDIT_DEFAULTS: "DefaultReactapi/updateDefaultMenu",
  DEFAULTDATA: "DefaultReactapi/DefaultData_list",
  DELETE_SINGLE_DEFAULTS: "DefaultReactapi/deleteMenu",
  DELETE_MULTI_DEFAULTS: "DefaultReactapi/deleteSelectedDefaults",


  //Attributes API Calls
  LIST_ALL_ATTRIBUTES: "Varientsapi/varients_list",
  ADD_ATTRIBUTE: "Varientsapi/add_varient",

  //Importdata API Calls
  IMPORT_DATA: "Import_data_api/import",

  //Loyalty Program
  LOYALTY_PROGRAM_LIST: "LoyaltyProgramReactAPI/loyalty_program_list",

  // Order API Calls (Offline and Online)
  LIST_ALL_IN_STORE_ORDER: "api/orderoffline",
  LIST_ALL_ONLINE_STORE_ORDER: 'api/newOrder',


  //Storesettings API Calls

  EMPLOYEE_LIST: "Store_setting_api/employee_list",
  ADDEDIT_EMPLOYEE: "Store_setting_api/addEdit_employee",
  DELETE_EMPLOYEE: "Store_setting_api/delete_employee",


  // EMPLOYEE_LIST:"App/employee_list",

  EMPLOYEE_DATA: "Store_setting_api/getEmployeeByEmpid",
  PERMISSIONS_LIST: "Store_setting_api/permission_list",
  UPDATE_PERMISSION: "Store_setting_api/update_Employee_permission",


  // Store Setting - RegisterSettings api
  GET_REGISTER_SETTINGS_DATA: "Profile_setup/inventory_register_setting",
  UPDATE_REGISTER_SETTINGS: "Profile_setup/register_setting",

  // Store Setting options api
  GET_STORE_OPTIONS_DATA: "Store_setting_api/get_store_options_data",

  // Update Store Setting options api
  UPDATE_STORE_OPTIONS_DATA: "Store_setting_api/update_store_options_data",


  //Coupon API Calls
  COUPON_LIST: "Couponapi/get_coupon_details",
  COUPON_STATUS_UPDATE: "Couponapi/show_online",
  COUPON_DELETE: "Couponapi/delete_coupon",
  COUPON_TITLE_CHECK: "Couponapi/check_coupon_title",
  COUPON_DETAILS_ID_CHECK: "Couponapi/get_edit_coupon_details",

  // System Access API Calls Listing and Update
  LIST_ALL_SYSTEM_ACCESS: "api/Settings_api/system_access",
  UPDATE_SYSTEM_ACCESS: "api/Settings_api/update_system_access",
  END_DAY_ACTUAL_AMT: "api/Settings_api/day_end_actual_amt",


  //Inventory
  LIST_INVENTORY: 'api/Settings_api/inventory_list',
  UPDATE_INVENTORY: 'api/Settings_api/update_inventory_info',


  // get Store Setting alerts list api
  GET_STORE_ALERTS_DATA: "Store_setting_api/store_alerts_list",

  // get Store Setting alerts list api
  UPDATE_STORE_ALERTS_DATA: "Store_setting_api/store_alerts_update",

  // Get Store Setting Receipt List and Update API
  GET_STORE_RECEIPT_DATA: "Store_setting_api/get_receipt_list",
  UPDATE_RECEIPT_INFO_DATA: "Store_setting_api/update_receipt_info_list",



  // Purchase API Calls 
  LIST_ALL_PARCHASE: "Purchase_ordersReactApi/purchase_order_list",


  // Taxes API Calls 
  ADD_TAXES: "Taxesapi/add_Tax",
  UPDATE_TAXES: "Taxesapi/update_Tax",
  LIST_ALL_TAXES: "Taxesapi/Taxes_list",
  DELETE_SINGLE_TAXE: "Taxesapi/delete_tax",
  TAXE_CATEGORY_LIST: "Taxesapi/Taxes_category_list",

  // All Reports API
  CHECKID_VARIFICATION_REPORT_LIST: "ReportingReactapi/checkID_varification_report_list",



  // for daily Report 
  LIST_DAILY_REPORT: "ReportingReactapi/daily_total_report",

  NEW_ITEM_CREATED_BETWEEN_LIST: "ReportingReactapi/new_item_created_between_list",

  TOP_SALLER_REPORT: "ReportingReactapi/top_seller_10",
  INSTANT_ACTIVITY_REPORT: "ReportingReactapi/instant_po_activity_report",


  //Employee List
  LIST_ALL_EMPLOYEE: "ReportingReactapi/employee_list",


  //INVENTORY_EXPORT
  INVENTORY_EXPORT: "ExportInventory_api/exportCSV",
  LIST_ALL_MERCHANTS: "ExportInventory_api/merchants_list",


  //INVENTORY_EXPORT
  INVENTORY_DUPLICATE: "Inventory_duplicate_api/duplicate_inventory",
  SETTINGS_DUPLICATE: "Inventory_duplicate_api/duplicate_setting",




  LIST_PAYMENT_METHOD_REPORT: "ReportingReactapi/credit_card_sales_report",

  // });

  // for item sales report
  GET_ITEMWISE_SALE_LIST: "ReportingReactapi/get_itemwise_sale_list",

  //Order Type

  LIST_ALL_ORDER_TYPE: "ReportingReactapi/order_type",





  LIST_TAXES_REPORT: "ReportingReactapi/taxes_report",

  LIST_CURRENT_INVENTORY_REPORT: "ReportingReactapi/inventory_report",




  //Super Admin - Permission
  LIST_ALL_PERMISSION: "api/Create_permission_api/permission_list",
  ADD_UPDATE_PERMISSION: "api/Create_permission_api/save_sub_permission",
  DELETE_SINGLE_PERMISSION: "api/Create_permission_api/deleteperm",

  // Store Order List API
  GET_STORE_ORDER_DATA: "Store_order_api/get_store_order_data",

  // Export Order Count Data
  EXPORT_ORDER_COUNT_DATA: "Store_order_api/export_order_count_data",

  // CATEGORY DUPLICATE
  LIST_ALL_CATEGORIES_MECHANT_ID: "Category_duplicate_api/get_category",
  CATEGORY_INVENTORY_DUPLICATE: "Category_duplicate_api/category_inventory",

  // PRODUCT DUPLICATE
  LIST_ALL_PRODUCTS: "Product_Duplicate_api/get_product",
  PRODUCT_INVENTORY_DUPLICATE: "Product_Duplicate_api/product_inventory_duplicate",

  // REPORT_BY_SALES_PERSON
  REPORT_BY_SALES_PERSON: "ReportingReactapi/report_by_sales_person",

  // GET_ORDER_SUMMERY_DETAILS:'Orders/order_details',

  // -------------------------
  // ---------------------
  ADD_MERCHAN_EMPLOYEE:'UserController/add_admin',
      GET_MERCHAN_STATE:'UserController/add',
      GET_ADMIN_DATA:'UserController/get_user',// get merchant admin record
      ADMIN_CHECK_USER:'UserController/check_user',// check email pending
      CHECK_ADMIN_EMAIL:'UserController/check_user_type',//check admin email
      ADMIN_GET_CUSTOMER:'UserController/get_customer',// get customer data
      // GET_EDIT_CUSTOMER:'UserController/edit_customer',
      // GET_EDIT_CUSTOMER:'UserController/edit_customer',
      GET_MANAGER_RECORD:'UserController/maneger_view',// manager view
      GET_ADMIN_RECORD:'UserController/admin_view',// admin view data
      GET_MANAGER_MERCHANT:'UserController/get_manager_merchant',// get manager merchant
      GET_ADMIN_MERCHANT:'UserController/get_merchant',// give admin merchant
      GET_EDIT_ADMIN:'UserController/edit_admin',// edit admin
      UPDATE_ADMIN_RECORD:'UserController/update_admin',//update admin
      GET_EDIT_CUSTOMER:'UserController/edit',// adit customer
      GET_UPDATE_CUSTOMER:'UserController/update',// update customer
      GET_VERIFIED_MERCHANT:'UserController/getUnverifiedMerchant',//get verified and unverified merchant
      GET_ADD_ADMIN:'UserController/insert_admin',//add admin
      GET_UPDATE_MERCHANT:'UserController/merchant_update',




  // vendor Report List API
  VENDORS_REPORT_LIST: "vendor_report_api/vendor_list",
  EDIT_VENDOR_DATA:"Vendor_api/edit_vendor",
  UPDATE_VENDOR_DATA:"Vendor_api/update_vendor",
  ADD_VENDOR_DATA:"Vendor_api/add_vendor",

  // Vendors Sales List API
  VENDORS_SALES_REPORT: "vendor_report_api/vendors_sales_report",

  // Vendors List for sales report API
  VENDORS_LIST: "vendor_report_api/get_vendor_list",


  // Order Refund Report
  ORDER_REFUND_REPORT: "vendor_report_api/refund_report",

      // Vendors API calls
      LIST_ALL_VENDORS:"Vendor_api/vendor_list",


      // vendors status update

      STATUS_UPD_VENDORS:"Vendor_api/onlineAvail",

 // GET_ORDER_SUMMERY_DETAILS

    GET_ORDER_SUMMARY_DETAILS:"Orders/order_details",
  
  // NewsLetter List API
  NEWS_LETTER_LIIST: "vendor_report_api/newsletter",

  GET_REORDER_INVENTORY_LIST: "ReportingReactapi/get_reorder_inventory_list",

});
