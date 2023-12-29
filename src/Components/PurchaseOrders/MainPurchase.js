import React, { useState } from "react";

import PurchaseTable from "./PurchaseTable";

import { AiOutlineSearch } from "react-icons/ai";
import AddPo from "./AddPo";

const MainPurchase = () => {
  const [visible, seVisible] = useState("PurchaseTable");
  const [searchId, setSearchId] = useState(""); // State to track search ID

  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };
  return (
    <>
      <div className="q-category-main-page">
        <div className="q-category-top-detail-section">
          <div className="search-field-container">
            <div className="search-box">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search Purchase Order"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                  <AiOutlineSearch className="search-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {visible === "PurchaseTable" && <PurchaseTable seVisible={seVisible} />}
        {visible === "AddPo" && <AddPo seVisible={seVisible} />}
      </div>
    </>
  );
};

export default MainPurchase;
