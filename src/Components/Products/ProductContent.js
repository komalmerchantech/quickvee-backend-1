import React from 'react'
import { BsDot } from 'react-icons/bs';

const ProductContent = () => {
  return (
    <div>
         <div className="mx-2 my-8">
      <div
        className="box-content h-[50x] w-70 p-4 border-4 border-white bg-white rounded-xl opacity-100 my-9 mx-8"
        style={{ boxShadow: "0px 3px 6px #0000001F" }}
      >
        <div className="text-sm font-semibold  my-2 text-[#818181] flex">
        <BsDot  className="text-black text-sm mr-1"/>After you've made changes to your menu, select the option "Request Approval" to get admin approval to update your website.
        </div>

       
      </div>
    </div>
      
    </div>
  )
}

export default ProductContent
