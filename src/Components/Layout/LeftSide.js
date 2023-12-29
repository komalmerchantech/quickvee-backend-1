import React from 'react'
import DashboardMain from '../Dashboard/DashboardMain'
import MainOrder from './../Orders/MainOrder';
//import MainProduct from '../Category/MainCategory';
import MainPurchase from '../PurchaseOrders/MainPurchase';
import MainAttributes from '../Attributes/MainAttributes';
import MainCategory from '../Category/MainCategory';
import MainCoupon from '../Coupons/MainCoupon';

import MainVendors from '../Vendors/MainVendors';
import MainTimesheet from '../Timesheet/MainTimesheet';
import MainImportData from '../ImportData/MainImportData';
import MainProducts from '../Products/MainProducts';
// import MainStoreSetting from '../StoreSetting/MainStoreSetting';
import MainStoreOption from '../StoreSetting/StoreOption/MainStoreOption';


const LeftSide = ({visible}) => {
  return (
  <>
  <div className='w-full'>
  <div className=''>
   
    { visible ==="dashboard" &&  <DashboardMain />}
    { visible ==="order" &&  <MainOrder />}
    { visible ==="category" &&  <MainCategory />}
    { visible ==="purchase-data" && <MainPurchase />}
    { visible ==="attributes" &&  <MainAttributes />}
     { visible ==="products" && <MainProducts />}

    { visible === "coupons" && <MainCoupon />}
    { visible ==="vendors" && <MainVendors />}
    { visible ==="timesheet" && <MainTimesheet />}
    { visible ==="import-data" && <MainImportData />}
    {visible === "store-setting" && <MainStoreOption />}


  </div>
  </div>


  </>
  )
}

export default LeftSide