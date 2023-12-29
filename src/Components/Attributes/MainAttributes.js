
import React, { useState } from "react";
import AtrDataList from "./AtrDataList";


const MainCategory = () => {
  const [visible, seVisible] = useState("AtrDataList");
  return (
    <>
      <div className="q-attributes-main-page">
        <div className="q-attributes-top-detail-section">
          <li> The added Attributes cannot be deleted.</li>
        </div>
        {visible === "AtrDataList" && <AtrDataList seVisible={seVisible} />}
      
      </div>
    </>
  );
};

export default MainCategory;
