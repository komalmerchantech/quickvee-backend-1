
import React, { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';


const MainOnline = () => {
  const [searchId, setSearchId] = useState(""); // State to track search ID

  const handleFilter = (filterType) => {
    console.log('Selected filter:', filterType);
   
  };

  const handleSearch = () => {
    console.log("Search ID:", searchId);
   
  };
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event, filterType) => {
    // Clear selected filter for other options
    document.getElementById('employeeFilter').selectedIndex = 0;
    document.getElementById('transactionFilter').selectedIndex = 0;
    document.getElementById('orderStatusFilter').selectedIndex = 0;

    // Set the selected filter for the current option
    setSelectedFilter(filterType);

    // Add any additional logic you need based on the selected filter
  };


  return (
    <>
      <div className="bg-white p-4 mb-3 rounded-md">
        <div className="flex border border-[#E1E1E1] rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full px-4 py-2 border-none focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="text-black px-4 py-2 focus:outline-none text-2xl"
          >
            <AiOutlineSearch className="h- w-8  text-[#231F20]" />
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md">
      <div className="mb-4">
        <h3 className="text-[20px] font-normal opacity-100 text-black ml-4 admin_medium">Filter By</h3>
      </div>

      

      <div className="flex flex-col sm:flex-row">
    

        <div className="flex-1 mb-2 sm:mb-0 sm:mr-2">
          <label className="block text-[16px] text-[#818181] Admin_std mb-4" htmlFor="transactionFilter">
            Transaction 
          </label>
          <select
            id="transactionFilter"
            value={selectedFilter === 'transaction' ? 'allTransactions' : ''}
            onChange={(e) => handleFilterChange(e, 'transaction')}
            className="w-full bg-white text-[#000000] text-[18px] Admin_std px-4 py-2 border border-gray-300 focus:outline-none rounded"
          >
            <option value="" disabled hidden>Select an option</option>
            <option value="allTransactions">All Transactions</option>
            {/* Add other options as needed */}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-[16px] text-[#818181] Admin_std mb-4" htmlFor="orderStatusFilter">
            Order Status
          </label>
          <select
            id="orderStatusFilter"
            value={selectedFilter === 'orderStatus' ? 'orderStatus' : ''}
            onChange={(e) => handleFilterChange(e, 'orderStatus')}
            className="w-full bg-white text-[#000000] text-[18px] Admin_std px-4 py-2 border border-gray-300 focus:outline-none rounded"
          >
            <option value="" disabled hidden>Select an option</option>
            <option value="orderStatus">Order Status</option>
            {/* Add other options as needed */}
          </select>
        </div>
        <div className="flex-1 mb-2 sm:mb-0 sm:mr-2">
         
         </div>
      </div>
    </div>
      <div>
        
      </div>
    </>
  );
};

export default MainOnline;
