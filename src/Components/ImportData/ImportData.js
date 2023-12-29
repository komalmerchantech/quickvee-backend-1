import React from 'react';
import { BsDot } from "react-icons/bs";

const ImportData = () => {
  return (
    <>
      <div className='mx-4 my-9'>
        <div className='grid grid-cols-1 gap-4'>
          <div className='box-content h-[100px] p-4 border-4 border-white bg-white rounded-xl opacity-100 mt-9 flex justify-between mx-8 my-9' style={{ boxShadow: '0px 3px 6px #0000001F' }}>
            <div className='col-span-8 mt-4'>
             
              <div className="text-sm font-semibold  text-[#818181] flex ">
              <BsDot className="text-black text-[22px] mr-1" />
              Download and check sample CSV file for proper file format and
              fields.
            </div>

            <div className="text-sm font-semibold  text-[#818181] flex">
              <BsDot className="text-black text-[22px] mr-1" />
              <span>Please enter variant names which are created for the store. (Also
              they are case sensitive).</span>
            </div>
              </div>
           
            <div className='col-span-4'>
            <button
              className="px-4 py-2 border-[#0A64F9] text-blue text-[#0A64F9] border-2 rounded-md opacity-100 mt-3"
              onClick={() => {
                // Handle the download functionality here
                window.location.href = "https://sandbox.quickvee.com/upload/SampleCSV/SampleProductsCSVnew.csv";
              }}
            >
              Sample CSV Download
            </button>
            </div>
          </div>
        </div>
        </div>
      
    </>
  );
};

export default ImportData;
