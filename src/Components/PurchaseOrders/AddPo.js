import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AutoPo from "./AutoPo";

const AddPo = () => {
  const [selectedVendor, setSelectedVendor] = useState("");
  const [issueDate, setIssueDate] = useState(null);
  const [stockDate, setStockDate] = useState(null);
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleIssueDateChange = (date) => {
    setIssueDate(date);
  };

  const handleStockDateChange = (date) => {
    setStockDate(date);
  };

  const handleReferenceChange = (event) => {
    setReference(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Replace this with your actual list of vendors
  const vendors = ["Vendor 1", "Vendor 2", "Vendor 3"];

  return (
    <>
    <div className="mx-2 my-2">
      <div
        className="box-content w-70 p-4 border-4 border-white bg-white rounded-xl opacity-100 my-9 mx-8"
        style={{ boxShadow: "0px 3px 6px #0000001F" }}
      >
        <div className="flex justify-between gap-2 mx-6 my-2">
          <div className="text-[18px] Admin_std leading-0 text-black admin_medium font-semibold opacity-100">
            Create Purchase Order
          </div>
          <div>
            <div className="text-[18px] Admin_std leading-0 text-blue-500 admin_medium font-semibold opacity-100">
              {/* <Link to="/productedit"> */}
              PO00001
              <button className="text-[18px] text-blue-500 ml-1 focus:outline-none">
                +
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="mt-2 bg-[#000] border-b-2 w-full mb-4"></div>

        <div className="flex flex-wrap mx-6 my-9">
          <div className="flex-grow flex-shrink-0 flex-basis-full md:flex-basis-1/3 px-4 mb-4">
            <label
              htmlFor="vendor"
              className="text-[14px] text-[#818181] Admin_std opacity-100 mb-4 leading-3"
            >
              Vendor
            </label>
            <select
              id="vendor"
              name="vendor"
              value={selectedVendor}
              onChange={handleVendorChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              wrapperClassName="w-full"
            >
              <option value="" disabled hidden>
                Select a vendor
              </option>
              {vendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-grow flex-shrink-0 flex-basis-full md:flex-basis-1/3 px-4 mb-4">
            <label
              htmlFor="issueDate"
              className="text-[14px] text-[#818181] Admin_std opacity-100 mb-4 leading-3"
            >
              Issued Date
            </label>
            <DatePicker
              id="issueDate"
              selected={issueDate}
              onChange={handleIssueDateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              wrapperClassName="w-full"
            />
          </div>

          <div className="flex-grow flex-shrink-0 flex-basis-full md:flex-basis-1/3 px-4 mb-4">
            <label
              htmlFor="stockDate"
              className="text-[14px] text-[#818181] Admin_std opacity-100 mb-4 leading-3"
            >
              Stock Due
            </label>
            <DatePicker
              id="stockDate"
              selected={stockDate}
              onChange={handleStockDateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              wrapperClassName="w-full"
            />
          </div>
        </div>
        <div className="flex flex-wrap mx-6 my-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label
              htmlFor="reference"
              className="block text-gray-600 text-sm font-semibold mb-1"
            >
              Reference
            </label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={reference}
              onChange={handleReferenceChange}
              className="w-full bg-white text-gray-600 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-semibold mb-1"
            >
              Vendor Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full bg-white text-gray-600 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>
    </div>

    <AutoPo />

    </>
  );
};

export default AddPo;
