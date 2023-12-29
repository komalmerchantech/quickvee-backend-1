import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SalesBar from './SalesBar';
import Mainbarharts from '../../Mainbarcharts';
import TenderTable from './TenderTable';

const TopTenders = () => {



  return ( <>
    <div className="mx-4 py-7 h-[100] my-9">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div
            className="gap-2 py-4 cursor-pointer bg-gray rounded-2xl opacity bg-white mx-8"
            style={{ boxShadow: "0px 3px 6px #0000001F" }}
          >
            <div className="flex items-center gap-2 py-4 cursor-pointer">
              <div className="flex items-center gap-2">
                <div>
                  <Link
                    to="/toptraders"
                    className="py-2 mx-6 text-[18px] admin_medium"
                  >
                    Top Tenders by Sales Count
                  </Link>
                </div>
              </div>
         
            </div>
            <SalesBar />
          </div>
          <div
            className="gap-2 py-4 cursor-pointer bg-gray rounded-2xl opacity bg-white mx-8"
            style={{ boxShadow: "0px 3px 6px #0000001F" }}
          >
            <div className='mt-4'>
              <Link
                to="/toptraders"
                className="py-8 mx-6 text-[18px] admin_medium"
              >
                Top Tenders by Sales Amount
              </Link>
            </div>
            <div className='mt-2'>
           <Mainbarharts />
           </div>
          </div>
        </div>
      </div>
    </div>


    <TenderTable />

    </>
  );
};

export default TopTenders;
