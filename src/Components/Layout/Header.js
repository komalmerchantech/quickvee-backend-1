// import * as React from "react";
import { useState, useEffect } from "react";
import Quick from "../../Assests/Dashboard/quickveeLG.png"
import {
  BiMenu,
  BiChevronDown,
 
} from "react-icons/bi";

import DownlIcon from '../../Assests/Dashboard/download.svg';
import OnlineData from '../../Assests/Dashboard/online.svg';
import SynkData from '../../Assests/Dashboard/sync.svg';
import DownIcon from '../../Assests/Dashboard/Down.svg'



export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 left-0 p-0 right-0 z-50 bg-white transition-all duration-300 h-18 shadow-md border-b-4 border-black ${
          isSticky ? "" : ""
        }`}
      >
        <div className="flex items-center px-4 mx-2">
          <BiMenu
            className="text-black text-[30px]"
            onClick={(e) => {
              setIsMenuOpen(!isMenuOpen);
            }}
          />
          <img src={Quick} alt="Logo" className="ml-6" />

          <div className="relative">
      {/* Button to toggle dropdown */}
      <div
        className="flex items-center ml-6 px-3 py-1 text-black lg:text-[20px] admin_medium cursor-pointer sm:text-xs md:text-sm"
        onClick={handleDropdownToggle}
      >
        Vape Store
        <img src={DownIcon} alt="" className="w-8 h-10 ml-2" />
      </div>

      {/* Dropdown content */}
      {showDropdown && (
        <div className="absolute mt-2 bg-white border rounded shadow-lg">
          {/* Your dropdown content goes here */}
          <div className="p-4">
            {/* Dropdown items */}
            {/* <div>Category 1</div>
            <div>Category 2</div>
            <div>Category 3</div> */}
            {/* Add more items as needed */}
          </div>
        </div>
      )}
    </div>
    <div className="flex items-center lg:text-[20px] text-black ml-auto sm:text-xs md:text-sm">
  {/* Download App section */}
  <div className="ml-12 flex items-center">
    <img src={DownlIcon} alt="icon" className="ml-2" />
    <p className="cursor-pointer ml-2  admin_medium">Download App</p>
  </div>

  {/* Online Store and Sync Data section */}
  <div className="ml-12 flex items-center">
    <img src={OnlineData} alt="icon" className="ml-2" />
    <p className="cursor-pointer ml-2 admin_medium">Online Store</p>
    </div>
    <div className="mx-12 flex items-center">
    <img src={SynkData} alt="icon" className="ml-2" />
    <p className="cursor-pointer ml-2 admin_medium">Sync Data</p>
  </div>

  {/* Vertical line separator */}
  <div className="border-t-3 border-b-2 border-black bg-black mb-16"></div>
</div>

        </div>
      </div>
    </>
  );
}
